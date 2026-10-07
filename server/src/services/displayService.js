import { Team } from '../models/Team.js';
import { ChallengeAttempt } from '../models/ChallengeAttempt.js';
import { CreditTransaction } from '../models/CreditTransaction.js';
import { ensureDefaultTeamsSeeded } from './teamService.js';
import { NexusCoreService } from './nexusCoreService.js';
import { CREDIT_TRANSACTION_TYPES } from '../config/creditsConfig.js';
import { LIVE_FEED_EVENT_TYPES } from '../socket/socketEvents.js';

// Arena global marathon timer reference (2h 15m = 8100s window anchored at server boot)
const ARENA_DURATION_SECONDS = 8100;
const ARENA_BOOT_TIMESTAMP_MS = Date.now() - 1238 * 1000;

const CORE_STATE_PRIORITY = {
  LOCKED: 0,
  AVAILABLE: 1,
  ACTIVE: 2,
  COMPLETED: 3,
};

/**
 * Compute server-authoritative Global Arena Timer telemetry
 */
export const computeGlobalArenaTimer = () => {
  const nowMs = Date.now();
  const elapsedSeconds = Math.max(0, Math.floor((nowMs - ARENA_BOOT_TIMESTAMP_MS) / 1000));
  const remainingSeconds = Math.max(
    600,
    ARENA_DURATION_SECONDS - (elapsedSeconds % ARENA_DURATION_SECONDS)
  );
  const expiresAt = new Date(nowMs + remainingSeconds * 1000).toISOString();

  const hrs = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  return {
    totalDurationSeconds: ARENA_DURATION_SECONDS,
    remainingSeconds,
    expiresAt,
    serverTime: new Date(nowMs).toISOString(),
    phase: remainingSeconds <= 900 ? 'CRITICAL_CONVERGENCE' : 'ARENA_LIVE',
    formatted: `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`,
  };
};

/**
 * Sanitize and build public leaderboard rows (TOP TEAMS).
 * Strictly strips private submissions, challenge answers, unlocked hints, and private operative data.
 */
export const buildPublicTopTeams = async (teams = []) => {
  const coreDoc = await NexusCoreService.getCoreConfigDoc({ includeSolution: false });

  const enriched = teams.map((team) => {
    const coreState = NexusCoreService.computeAuthoritativeState(team, coreDoc);
    const totalSolved = Math.max(
      Number(team.stats?.totalSolved || 0),
      (team.completedChallenges || []).length
    );
    const totalFailed = Math.max(
      Number(team.stats?.totalFailed || 0),
      (team.failedChallenges || []).length
    );
    const convergencePercent =
      coreState === 'LOCKED'
        ? Math.min(100, Math.max(0, Number(team.stats?.coreProgressPercent ?? 25)))
        : 100;

    return {
      teamId: team.teamId,
      teamName: team.teamName || team.teamId,
      status: team.status || 'ACTIVE',
      credits: Number(team.credits ?? 0),
      totalSolved,
      totalFailed,
      riskProfile: team.stats?.riskProfile || 'BALANCED',
      coreState,
      completionRank: team.nexusCore?.completionRank || null,
      convergencePercent,
      activeModuleCategory: team.activeAttempt?.category || null,
      activeModuleRisk: team.activeAttempt?.risk || null,
      hasActiveSession: Boolean(team.activeAttempt?.status === 'IN_PROGRESS'),
      lastActionAt: team.stats?.lastActionAt || team.updatedAt || new Date().toISOString(),
    };
  });

  enriched.sort((a, b) => {
    const aCompleted = a.coreState === 'COMPLETED' ? 1 : 0;
    const bCompleted = b.coreState === 'COMPLETED' ? 1 : 0;
    if (aCompleted !== bCompleted) return bCompleted - aCompleted;

    if (a.completionRank && b.completionRank && a.completionRank !== b.completionRank) {
      return a.completionRank - b.completionRank;
    }

    if (b.credits !== a.credits) return b.credits - a.credits;
    if (b.totalSolved !== a.totalSolved) return b.totalSolved - a.totalSolved;
    if (b.convergencePercent !== a.convergencePercent) {
      return b.convergencePercent - a.convergencePercent;
    }
    return String(a.teamId).localeCompare(String(b.teamId));
  });

  return enriched.map((item, idx) => ({
    rank: idx + 1,
    ...item,
  }));
};

/**
 * Build sanitized Recent System Events across the arena.
 * NEVER includes submitted answers, candidate strings, decrypted hint text, or private team data.
 */
export const buildSanitizedRecentSystemEvents = ({
  teams = [],
  attempts = [],
  transactions = [],
  limit = 24,
}) => {
  const teamNameById = new Map();
  for (const t of teams) {
    teamNameById.set(t.teamId, t.teamName || t.teamId);
  }

  const events = [];

  // 1. Derive sanitized lifecycle events from ChallengeAttempts
  for (const att of attempts) {
    const teamId = att.teamId;
    const teamName = teamNameById.get(teamId) || teamId;
    const category = att.category || 'LOGIC';
    const risk = att.risk || 'BALANCED';
    const moduleTitle = att.title || att.challengeId || 'CLASSIFIED MODULE';
    const startedTs = att.startedAt ? new Date(att.startedAt).getTime() : Date.now();

    events.push({
      eventId: `PUB-ACQ-${att.attemptId}`,
      eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_ACQUIRED,
      teamId,
      teamName,
      category,
      risk,
      moduleTitle,
      creditsDelta: -Math.abs(Number(att.costPaid || 0)),
      headline: `${teamName} ACQUIRED ${moduleTitle}`,
      detail: `SECTOR: ${category} // RISK: ${risk} // ENTRY: -${Math.abs(Number(att.costPaid || 0))} CR`,
      timestamp: new Date(startedTs).toISOString(),
    });

    events.push({
      eventId: `PUB-STR-${att.attemptId}`,
      eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_STARTED,
      teamId,
      teamName,
      category,
      risk,
      moduleTitle,
      creditsDelta: 0,
      headline: `${teamName} ENGAGED ${moduleTitle}`,
      detail: `SESSION INITIALIZED // RISK TIER: ${risk}`,
      timestamp: new Date(startedTs + 500).toISOString(),
    });

    if (att.status && att.status !== 'IN_PROGRESS') {
      const completedTs = att.completedAt
        ? new Date(att.completedAt).getTime()
        : startedTs + 60000;
      const isSuccess = att.status === 'SUCCESS' || att.status === 'COMPLETED';

      // Public submission event (strictly no submitted candidate/answer exposed)
      events.push({
        eventId: `PUB-SUB-${att.attemptId}`,
        eventType: LIVE_FEED_EVENT_TYPES.SUBMISSION,
        teamId,
        teamName,
        category,
        risk,
        moduleTitle,
        creditsDelta: 0,
        headline: `${teamName} TRANSMITTED SOLUTION PACKET`,
        detail: `TARGET: ${moduleTitle} // VERIFYING CHECKSUM`,
        timestamp: new Date(completedTs - 500).toISOString(),
      });

      events.push({
        eventId: `PUB-OUT-${att.attemptId}`,
        eventType: isSuccess ? LIVE_FEED_EVENT_TYPES.SUCCESS : LIVE_FEED_EVENT_TYPES.FAILURE,
        teamId,
        teamName,
        category,
        risk,
        moduleTitle,
        creditsDelta: isSuccess
          ? Math.abs(Number(att.potentialReward || 0))
          : -Math.abs(Number(att.penaltyOnFail || 0)),
        headline: isSuccess
          ? `${teamName} CLEARED ${moduleTitle}`
          : `${teamName} CONTAINMENT BREACH ON ${moduleTitle} (${att.status})`,
        detail: isSuccess
          ? `REWARD CREDITED: +${Math.abs(Number(att.potentialReward || 0))} CR`
          : `PENALTY APPLIED: -${Math.abs(Number(att.penaltyOnFail || 0))} CR`,
        timestamp: new Date(completedTs).toISOString(),
      });
    }
  }

  // 2. Derive sanitized credit & ability events from CreditTransactions
  for (const tx of transactions) {
    const teamId = tx.teamId;
    const teamName = teamNameById.get(teamId) || teamId;
    const txId = tx._id ? String(tx._id) : `${teamId}-${tx.type}-${tx.timestamp}`;
    const tsIso = new Date(tx.timestamp || Date.now()).toISOString();
    const amount = Number(tx.amount || 0);

    if (tx.type === CREDIT_TRANSACTION_TYPES.ABILITY) {
      const abilityName = tx.relatedAbility?.name || 'TACTICAL ABILITY';
      events.push({
        eventId: `PUB-ABL-${txId}`,
        eventType: LIVE_FEED_EVENT_TYPES.ABILITY_USED,
        teamId,
        teamName,
        category: 'ABILITY',
        risk: 'BALANCED',
        moduleTitle: abilityName,
        creditsDelta: amount,
        headline: `${teamName} DEPLOYED ${abilityName.toUpperCase()}`,
        detail: `TACTICAL OVERRIDE ACTIVATED (${amount} CR)`,
        timestamp: tsIso,
      });
    } else if (
      tx.type === CREDIT_TRANSACTION_TYPES.HINT ||
      tx.type === CREDIT_TRANSACTION_TYPES.EXTRA_TIME
    ) {
      const isExtra = tx.type === CREDIT_TRANSACTION_TYPES.EXTRA_TIME;
      events.push({
        eventId: `PUB-CRD-${txId}`,
        eventType: LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED,
        teamId,
        teamName,
        category: 'CREDITS',
        risk: 'SAFE',
        moduleTitle: isExtra ? 'TEMPORAL EXTENSION' : 'TACTICAL TELEMETRY',
        creditsDelta: amount,
        headline: isExtra
          ? `${teamName} ALLOCATED EXTRA SESSION TIME`
          : `${teamName} UNLOCKED ENCRYPTED TELEMETRY NODE`,
        detail: `RESISTANCE CREDITS UPDATED (${amount} CR)`,
        timestamp: tsIso,
      });
    }
  }

  // 3. Add NEXUS Core milestone events if any team has unlocked or completed the Core
  for (const t of teams) {
    const teamName = t.teamName || t.teamId;
    if (t.nexusCore?.unlockedAt) {
      events.push({
        eventId: `PUB-CORE-AVL-${t.teamId}`,
        eventType: 'CORE AVAILABLE',
        teamId: t.teamId,
        teamName,
        category: 'NEXUS CORE',
        risk: 'AGGRESSIVE',
        moduleTitle: 'THE NEXUS CORE',
        creditsDelta: 0,
        headline: `NEXUS CORE UNLOCKED FOR SQUAD ${teamName}`,
        detail: 'CONVERGENCE THRESHOLD REACHED // CORE STATUS: AVAILABLE',
        timestamp: new Date(t.nexusCore.unlockedAt).toISOString(),
      });
    }
    if (t.nexusCore?.completedAt) {
      events.push({
        eventId: `PUB-CORE-CMP-${t.teamId}`,
        eventType: 'CORE COMPLETED',
        teamId: t.teamId,
        teamName,
        category: 'NEXUS CORE',
        risk: 'AGGRESSIVE',
        moduleTitle: 'THE NEXUS CORE',
        creditsDelta: 1500,
        headline: `SQUAD ${teamName} OVERTHREW THE NEXUS CORE!`,
        detail: `ULTIMATE SYSTEM OBJECTIVE COMPLETED // PROCLAMATION: ${
          t.nexusCore.proclamationCode || 'SOVEREIGN'
        }`,
        timestamp: new Date(t.nexusCore.completedAt).toISOString(),
      });
    }
  }

  events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Deduplicate by eventId
  const seen = new Set();
  const deduped = [];
  for (const ev of events) {
    if (!seen.has(ev.eventId)) {
      seen.add(ev.eventId);
      deduped.push(ev);
    }
    if (deduped.length >= limit) break;
  }

  return deduped;
};

export class DisplayService {
  /**
   * Build the complete, sanitized public projector display snapshot for /display.
   */
  static async getProjectorDisplaySnapshot() {
    await ensureDefaultTeamsSeeded();

    const [teams, attempts, transactions, coreDoc] = await Promise.all([
      Team.find({})
        .select(
          'teamId teamName credits status completedChallenges failedChallenges activeAttempt stats nexusCore updatedAt'
        )
        .lean(),
      ChallengeAttempt.find({})
        .select(
          'attemptId teamId challengeId title category difficulty risk costPaid potentialReward penaltyOnFail startedAt completedAt status'
        )
        .sort({ startedAt: -1 })
        .limit(40)
        .lean(),
      CreditTransaction.find({})
        .select('teamId type amount balanceAfter relatedChallenge relatedAbility timestamp')
        .sort({ timestamp: -1 })
        .limit(40)
        .lean(),
      NexusCoreService.getCoreConfigDoc({ includeSolution: false }),
    ]);

    const topTeams = await buildPublicTopTeams(teams);
    const recentSystemEvents = buildSanitizedRecentSystemEvents({
      teams,
      attempts,
      transactions,
      limit: 20,
    });

    // Determine aggregate Arena Core status across all teams
    let aggregateCoreState = coreDoc?.globalOverrideState || 'LOCKED';
    for (const row of topTeams) {
      if (
        (CORE_STATE_PRIORITY[row.coreState] || 0) >
        (CORE_STATE_PRIORITY[aggregateCoreState] || 0)
      ) {
        aggregateCoreState = row.coreState;
      }
    }

    const maxConvergencePercent =
      topTeams.length > 0
        ? Math.max(...topTeams.map((t) => Number(t.convergencePercent || 0)))
        : 0;
    const averageConvergencePercent =
      topTeams.length > 0
        ? Math.round(
            topTeams.reduce((acc, t) => acc + Number(t.convergencePercent || 0), 0) /
              topTeams.length
          )
        : 0;

    const publicWinner = coreDoc?.winner
      ? {
          rank: coreDoc.winner.rank || 1,
          teamId: coreDoc.winner.teamId,
          teamName: coreDoc.winner.teamName,
          completedAt: coreDoc.winner.completedAt,
          finalCredits: coreDoc.winner.finalCredits,
          rewardAwarded: coreDoc.winner.rewardAwarded,
          totalSolved: coreDoc.winner.totalSolved,
          proclamationCode: coreDoc.winner.proclamationCode,
        }
      : null;

    const publicCompletedTeams = Array.isArray(coreDoc?.completedTeams)
      ? coreDoc.completedTeams.map((entry) => ({
          rank: entry.rank,
          teamId: entry.teamId,
          teamName: entry.teamName,
          completedAt: entry.completedAt,
          finalCredits: entry.finalCredits,
          proclamationCode: entry.proclamationCode,
        }))
      : [];

    const globalTimer = computeGlobalArenaTimer();

    return {
      status: 'ok',
      service: 'cyber-quest-projector-display',
      system: {
        title: 'CYBER QUEST',
        subtitle: 'NEXUS',
        tagline: 'THE LAST CHANCE // LIVE ARENA PROJECTOR TELEMETRY',
        sector: 'SECTOR-00 // CENTRAL COMMAND DISPLAY',
        serverTime: globalTimer.serverTime,
      },
      globalTimer,
      coreStatus: {
        coreId: coreDoc?.coreId || 'NEXUS-CORE-PRIME',
        title: coreDoc?.title || 'THE NEXUS CORE',
        designation:
          coreDoc?.designation || 'ULTIMATE SYSTEM OBJECTIVE // CENTRAL CONVERGENCE',
        classification:
          coreDoc?.classification || 'DIRECTIVE OMEGA // CORE ARCHITECTURE',
        state: aggregateCoreState,
        maxConvergencePercent,
        averageConvergencePercent,
        unlockedTeamsCount: topTeams.filter((t) => t.coreState !== 'LOCKED').length,
        activeTeamsCount: topTeams.filter((t) => t.coreState === 'ACTIVE').length,
        completedTeamsCount: topTeams.filter((t) => t.coreState === 'COMPLETED').length,
        completionReward: coreDoc?.unlockConfig?.completionReward || 1500,
        winner: publicWinner,
        completedTeams: publicCompletedTeams,
      },
      topTeams,
      recentSystemEvents,
      privacyAttestation: {
        privateSubmissionsExposed: false,
        challengeAnswersExposed: false,
        privateTeamInfoExposed: false,
      },
      timestamp: globalTimer.serverTime,
    };
  }
}
