import { LIVE_FEED_EVENT_TYPES } from '../socket/socketEvents.js';
import { CREDIT_TRANSACTION_TYPES } from '../config/creditsConfig.js';
import { normalizeRiskTier } from './challengeService.js';

const CANONICAL_CATEGORIES = ['LOGIC', 'PUZZLES', 'OBSERVATION', 'KNOWLEDGE', 'TECHNICAL'];

/**
 * Normalize raw attempt + fallback completed/failed team records into a unified,
 * chronological attempt history list containing:
 * - challenge (challengeId, title, attemptId, isReattempt, gameType)
 * - category
 * - risk
 * - cost
 * - result (SUCCESS, FAILED, TIMEOUT, ABANDONED, IN_PROGRESS)
 * - rewardOrPenalty (signed number, e.g. +400 or -100, and formatted label)
 * - timestamp
 */
export const normalizeAttemptHistory = (team, attempts = [], catalog = []) => {
  const catalogById = new Map((catalog || []).map((c) => [c.challengeId, c]));
  const seenAttemptIds = new Set();
  const seenCompletedChallengeIds = new Set();
  const unified = [];

  for (const att of attempts || []) {
    if (!att) continue;
    const rawObj = typeof att.toObject === 'function' ? att.toObject() : att;
    const challengeDef = catalogById.get(rawObj.challengeId) || {};
    const status = String(rawObj.status || 'IN_PROGRESS').toUpperCase();
    const normalizedResult =
      status === 'COMPLETED'
        ? 'SUCCESS'
        : status === 'EXPIRED'
          ? 'TIMEOUT'
          : status;

    const rewardVal = Number(rawObj.potentialReward ?? challengeDef.reward ?? 0);
    const penaltyVal = Number(rawObj.penaltyOnFail ?? challengeDef.penalty ?? 0);
    const costVal = Number(rawObj.costPaid ?? challengeDef.cost ?? 0);

    let rewardPenaltyDelta = 0;
    let rewardPenaltyType = 'PENDING';
    if (normalizedResult === 'SUCCESS') {
      rewardPenaltyDelta = rewardVal;
      rewardPenaltyType = 'REWARD';
      seenCompletedChallengeIds.add(rawObj.challengeId);
    } else if (
      normalizedResult === 'FAILED' ||
      normalizedResult === 'TIMEOUT' ||
      normalizedResult === 'ABANDONED'
    ) {
      rewardPenaltyDelta = -Math.abs(penaltyVal);
      rewardPenaltyType = 'PENALTY';
    }

    const timestamp =
      rawObj.completedAt || rawObj.startedAt || rawObj.createdAt || new Date().toISOString();

    if (rawObj.attemptId) {
      seenAttemptIds.add(rawObj.attemptId);
    }

    unified.push({
      attemptId: rawObj.attemptId || `ATT-${rawObj.challengeId}`,
      challengeId: rawObj.challengeId,
      title: rawObj.title || challengeDef.title || rawObj.challengeId,
      category: String(rawObj.category || challengeDef.category || 'LOGIC').toUpperCase(),
      difficulty: String(rawObj.difficulty || challengeDef.difficulty || 'MODERATE').toUpperCase(),
      risk: normalizeRiskTier(rawObj.risk || challengeDef.risk || 'BALANCED'),
      gameType: rawObj.gameType || challengeDef.gameType || 'wordGuess',
      cost: costVal,
      result: normalizedResult,
      reward: rewardVal,
      penalty: penaltyVal,
      rewardPenaltyDelta,
      rewardPenaltyType,
      hintsUnlocked: Number(rawObj.hintsUnlocked || rawObj.unlockedHints?.length || 0),
      extraTimeMinutes: Number(rawObj.extraTimeMinutes || 0),
      isReattempt: Boolean(rawObj.isReattempt),
      startedAt: rawObj.startedAt || timestamp,
      completedAt: rawObj.completedAt || null,
      timestamp,
    });
  }

  // Ensure any completedChallenges on team that aren't in ChallengeAttempt collection are also included
  for (const comp of team?.completedChallenges || []) {
    if (!comp?.challengeId || seenCompletedChallengeIds.has(comp.challengeId)) continue;
    const challengeDef = catalogById.get(comp.challengeId) || {};
    const rewardVal = Number(comp.reward ?? challengeDef.reward ?? 400);
    const penaltyVal = Number(comp.penalty ?? challengeDef.penalty ?? 50);
    const costVal = Number(comp.cost ?? challengeDef.cost ?? 150);
    const ts = comp.timestamp || new Date().toISOString();

    unified.push({
      attemptId: `ATT-${comp.challengeId}`,
      challengeId: comp.challengeId,
      title: comp.title || challengeDef.title || comp.challengeId,
      category: String(comp.category || challengeDef.category || 'LOGIC').toUpperCase(),
      difficulty: String(comp.difficulty || challengeDef.difficulty || 'LOW').toUpperCase(),
      risk: normalizeRiskTier(comp.risk || challengeDef.risk || 'SAFE'),
      gameType: comp.gameType || challengeDef.gameType || 'wordGuess',
      cost: costVal,
      result: 'SUCCESS',
      reward: rewardVal,
      penalty: penaltyVal,
      rewardPenaltyDelta: rewardVal,
      rewardPenaltyType: 'REWARD',
      hintsUnlocked: 0,
      extraTimeMinutes: 0,
      isReattempt: false,
      startedAt: ts,
      completedAt: ts,
      timestamp: ts,
    });
  }

  // Sort newest first
  unified.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return unified;
};

/**
 * Compute authoritative Phase 11 Progress telemetry for a team:
 * - challengesAttempted
 * - completed
 * - failed
 * - creditsEarned
 * - creditsSpent
 * - hints
 * - extraTime
 * - abilities
 * - riskProfile
 */
export const buildTeamProgressSummary = (team, attempts = [], transactions = [], catalog = []) => {
  const normalizedHistory = normalizeAttemptHistory(team, attempts, catalog);
  const stats = team?.stats || {};

  const completedCount = Math.max(
    Number(stats.totalSolved || 0),
    (team?.completedChallenges || []).length,
    normalizedHistory.filter((a) => a.result === 'SUCCESS').length
  );

  const failedCount = Math.max(
    Number(stats.totalFailed || 0),
    (team?.failedChallenges || []).length,
    normalizedHistory.filter(
      (a) => a.result === 'FAILED' || a.result === 'TIMEOUT' || a.result === 'ABANDONED'
    ).length
  );

  const inProgressCount = team?.activeAttempt ? 1 : 0;

  const riskAttemptsSum =
    Number(stats.safeAttempts || 0) +
    Number(stats.balancedAttempts || 0) +
    Number(stats.aggressiveAttempts || 0);

  const challengesAttempted = Math.max(
    normalizedHistory.length,
    completedCount + failedCount + inProgressCount,
    riskAttemptsSum
  );

  const creditsEarned = Number(stats.creditsEarned ?? team?.credits ?? 0);
  const creditsSpent = Number(stats.creditsSpent ?? 0);
  const hintsUsed = Number(stats.hintsPurchased ?? 0);
  const extraTimeUsed = Number(stats.extraTimePurchased ?? 0);
  const abilitiesUsed = Number(stats.abilitiesUsed ?? 0);
  const riskProfile = normalizeRiskTier(
    team?.currentChallenge?.risk || stats.riskProfile || 'BALANCED'
  );

  const categoryBreakdown = CANONICAL_CATEGORIES.map((category) => {
    const totalInCatalog = Math.max(
      1,
      (catalog || []).filter((c) => String(c.category).toUpperCase() === category).length
    );
    const attemptedInCategory = normalizedHistory.filter((a) => a.category === category).length;
    const completedInCategory = normalizedHistory.filter(
      (a) => a.category === category && a.result === 'SUCCESS'
    ).length;
    const failedInCategory = normalizedHistory.filter(
      (a) =>
        a.category === category &&
        (a.result === 'FAILED' || a.result === 'TIMEOUT' || a.result === 'ABANDONED')
    ).length;

    return {
      category,
      totalInCatalog,
      attempted: attemptedInCategory,
      completed: completedInCategory,
      failed: failedInCategory,
      completionPercent: Math.min(100, Math.round((completedInCategory / totalInCatalog) * 100)),
    };
  });

  return {
    challengesAttempted,
    completed: completedCount,
    failed: failedCount,
    inProgress: inProgressCount,
    creditsEarned,
    creditsSpent,
    netCredits: creditsEarned - creditsSpent,
    currentBalance: Number(team?.credits ?? 0),
    hints: hintsUsed,
    extraTime: extraTimeUsed,
    extraTimeMinutesTotal: extraTimeUsed * 5,
    abilities: abilitiesUsed,
    riskProfile,
    safeAttempts: Number(stats.safeAttempts ?? 0),
    balancedAttempts: Number(stats.balancedAttempts ?? 0),
    aggressiveAttempts: Number(stats.aggressiveAttempts ?? 0),
    successByRisk: stats.successByRisk || { SAFE: 0, BALANCED: 0, AGGRESSIVE: 0 },
    creditsByRisk: stats.creditsByRisk || {
      SAFE: { gained: 0, lost: 0, net: 0 },
      BALANCED: { gained: 0, lost: 0, net: 0 },
      AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
    },
    coreProgressPercent: Number(stats.coreProgressPercent ?? 25),
    categoryBreakdown,
  };
};

/**
 * Reconstruct canonical Phase 11 Live Feed events from attempts and credit transactions.
 * Canonical eventTypes:
 * - CHALLENGE ACQUIRED
 * - CHALLENGE STARTED
 * - SUBMISSION
 * - SUCCESS
 * - FAILURE
 * - CREDITS UPDATED
 * - ABILITY USED
 */
export const buildCanonicalLiveFeed = (team, attempts = [], transactions = [], catalog = []) => {
  const feed = [];
  const normalizedHistory = normalizeAttemptHistory(team, attempts, catalog);

  // 1. Derive CHALLENGE ACQUIRED, CHALLENGE STARTED, SUBMISSION, SUCCESS, FAILURE from attempts
  for (const att of normalizedHistory) {
    const startTs = new Date(att.startedAt || att.timestamp).getTime();
    const acquireIso = new Date(Math.max(0, startTs - 1000)).toISOString();
    const startIso = new Date(startTs).toISOString();

    feed.push({
      feedId: `FEED-ACQ-${att.attemptId}`,
      teamId: team?.teamId,
      eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_ACQUIRED,
      title: `${att.isReattempt ? 'REATTEMPT ACQUIRED' : 'CHALLENGE ACQUIRED'}: ${att.title}`,
      summary: `Module [${att.challengeId}] (${att.category} // ${att.risk}) unlocked for ${att.cost} CR.`,
      challengeId: att.challengeId,
      challengeTitle: att.title,
      category: att.category,
      risk: att.risk,
      creditsDelta: -Math.abs(att.cost),
      timestamp: acquireIso,
    });

    feed.push({
      feedId: `FEED-START-${att.attemptId}`,
      teamId: team?.teamId,
      eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_STARTED,
      title: `CHALLENGE STARTED: ${att.title}`,
      summary: `Server session [${att.attemptId}] initialized on engine [${att.gameType}].`,
      challengeId: att.challengeId,
      challengeTitle: att.title,
      category: att.category,
      risk: att.risk,
      creditsDelta: 0,
      timestamp: startIso,
    });

    if (att.result !== 'IN_PROGRESS') {
      const endTs = new Date(att.completedAt || att.timestamp).getTime();
      const subIso = new Date(Math.max(startTs + 500, endTs - 500)).toISOString();
      const resultIso = new Date(Math.max(startTs + 1000, endTs)).toISOString();

      feed.push({
        feedId: `FEED-SUB-${att.attemptId}`,
        teamId: team?.teamId,
        eventType: LIVE_FEED_EVENT_TYPES.SUBMISSION,
        title: `SUBMISSION RECEIVED: ${att.title}`,
        summary: `Attempt [${att.attemptId}] payload transmitted to NEXUS Core evaluator.`,
        challengeId: att.challengeId,
        challengeTitle: att.title,
        category: att.category,
        risk: att.risk,
        creditsDelta: 0,
        timestamp: subIso,
      });

      const isSuccess = att.result === 'SUCCESS';
      feed.push({
        feedId: `FEED-RES-${att.attemptId}`,
        teamId: team?.teamId,
        eventType: isSuccess ? LIVE_FEED_EVENT_TYPES.SUCCESS : LIVE_FEED_EVENT_TYPES.FAILURE,
        resultStatus: att.result,
        title: isSuccess
          ? `SUCCESS: ${att.title} (+${att.reward} CR)`
          : `FAILURE [${att.result}]: ${att.title} (-${att.penalty} CR)`,
        summary: isSuccess
          ? `Module [${att.challengeId}] solved! Awarded +${att.reward} Resistance Credits.`
          : `Module [${att.challengeId}] ended with ${att.result}. Penalty -${att.penalty} CR applied.`,
        challengeId: att.challengeId,
        challengeTitle: att.title,
        category: att.category,
        risk: att.risk,
        creditsDelta: att.rewardPenaltyDelta,
        timestamp: resultIso,
      });
    }
  }

  // 2. Derive CREDITS UPDATED and ABILITY USED from CreditTransactions
  for (const tx of transactions || []) {
    const rawTx = typeof tx.toObject === 'function' ? tx.toObject() : tx;
    const txId = rawTx._id?.toString() || `${rawTx.type}-${rawTx.timestamp}`;
    const tsIso = new Date(rawTx.timestamp || Date.now()).toISOString();
    const amount = Number(rawTx.amount || 0);

    if (rawTx.type === CREDIT_TRANSACTION_TYPES.ABILITY) {
      const abilityName = rawTx.relatedAbility?.name || 'NEXUS Module';
      const abilityId = rawTx.relatedAbility?.abilityId || 'ABL-03';
      feed.push({
        feedId: `FEED-ABL-${txId}`,
        teamId: team?.teamId,
        eventType: LIVE_FEED_EVENT_TYPES.ABILITY_USED,
        title: `ABILITY USED: ${abilityName.toUpperCase()}`,
        summary: rawTx.summary || `Activated restricted module [${abilityId}] (${amount} CR).`,
        abilityId,
        abilityName,
        creditsDelta: amount,
        balanceAfter: rawTx.balanceAfter,
        timestamp: tsIso,
      });
    }

    feed.push({
      feedId: `FEED-CR-${txId}`,
      teamId: team?.teamId,
      eventType: LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED,
      transactionType: rawTx.type,
      title: `CREDITS UPDATED: ${amount >= 0 ? `+${amount}` : amount} CR (${rawTx.type})`,
      summary:
        rawTx.summary ||
        `Ledger transaction [${rawTx.type}] processed. Balance: ${rawTx.balanceAfter} CR.`,
      challengeId: rawTx.relatedChallenge?.challengeId || null,
      challengeTitle: rawTx.relatedChallenge?.title || null,
      category: rawTx.relatedChallenge?.category || null,
      abilityId: rawTx.relatedAbility?.abilityId || null,
      abilityName: rawTx.relatedAbility?.name || null,
      creditsDelta: amount,
      balanceAfter: rawTx.balanceAfter,
      timestamp: tsIso,
    });
  }

  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return feed.slice(0, 80);
};

/**
 * Build real-time Socket.IO Live Feed event entries for an individual action execution.
 */
export const buildActionLiveFeedEvents = ({
  teamId,
  actionType,
  team,
  creditResult,
  evaluationResult,
  abilityActivation,
}) => {
  const nowMs = Date.now();
  const events = [];
  const tx = creditResult?.transaction;

  if (
    actionType === 'ACQUIRE_CHALLENGE' ||
    actionType === 'PURCHASE_CHALLENGE' ||
    actionType === 'REATTEMPT_CHALLENGE' ||
    actionType === CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE ||
    actionType === CREDIT_TRANSACTION_TYPES.REATTEMPT
  ) {
    const active = team?.activeAttempt;
    if (active) {
      events.push({
        feedId: `LIVE-ACQ-${active.attemptId}-${nowMs}`,
        teamId,
        eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_ACQUIRED,
        title: `${active.isReattempt ? 'REATTEMPT ACQUIRED' : 'CHALLENGE ACQUIRED'}: ${active.title}`,
        summary: `Module [${active.challengeId}] (${active.category} // ${active.risk}) acquired for ${active.costPaid} CR.`,
        challengeId: active.challengeId,
        challengeTitle: active.title,
        category: active.category,
        risk: active.risk,
        creditsDelta: -Math.abs(active.costPaid || 0),
        balanceAfter: team?.credits,
        timestamp: new Date(nowMs).toISOString(),
      });

      events.push({
        feedId: `LIVE-START-${active.attemptId}-${nowMs + 1}`,
        teamId,
        eventType: LIVE_FEED_EVENT_TYPES.CHALLENGE_STARTED,
        title: `CHALLENGE STARTED: ${active.title}`,
        summary: `Authoritative session [${active.attemptId}] armed (${Math.round((active.timeLimit || 1200) / 60)}m limit).`,
        challengeId: active.challengeId,
        challengeTitle: active.title,
        category: active.category,
        risk: active.risk,
        creditsDelta: 0,
        balanceAfter: team?.credits,
        timestamp: new Date(nowMs + 1).toISOString(),
      });
    }
  }

  if (evaluationResult) {
    events.push({
      feedId: `LIVE-SUB-${evaluationResult.attemptId || nowMs}`,
      teamId,
      eventType: LIVE_FEED_EVENT_TYPES.SUBMISSION,
      title: `SUBMISSION: ${evaluationResult.title}`,
      summary: `Attempt [${evaluationResult.attemptId}] evaluated by NEXUS Core (${evaluationResult.status}).`,
      challengeId: evaluationResult.challengeId,
      challengeTitle: evaluationResult.title,
      category: evaluationResult.category,
      risk: evaluationResult.risk,
      creditsDelta: 0,
      balanceAfter: team?.credits,
      timestamp: new Date(nowMs).toISOString(),
    });

    const isSuccess = evaluationResult.passed || evaluationResult.status === 'SUCCESS';
    events.push({
      feedId: `LIVE-RES-${evaluationResult.attemptId || nowMs + 1}`,
      teamId,
      eventType: isSuccess ? LIVE_FEED_EVENT_TYPES.SUCCESS : LIVE_FEED_EVENT_TYPES.FAILURE,
      resultStatus: evaluationResult.status,
      title: isSuccess
        ? `SUCCESS: ${evaluationResult.title} (+${evaluationResult.creditsDelta} CR)`
        : `FAILURE [${evaluationResult.status}]: ${evaluationResult.title} (${evaluationResult.creditsDelta} CR)`,
      summary: evaluationResult.message,
      challengeId: evaluationResult.challengeId,
      challengeTitle: evaluationResult.title,
      category: evaluationResult.category,
      risk: evaluationResult.risk,
      creditsDelta: evaluationResult.creditsDelta,
      balanceAfter: team?.credits,
      timestamp: new Date(nowMs + 1).toISOString(),
    });
  }

  if (abilityActivation) {
    events.push({
      feedId: `LIVE-ABL-${abilityActivation.activationId || nowMs}`,
      teamId,
      eventType: LIVE_FEED_EVENT_TYPES.ABILITY_USED,
      title: `ABILITY USED: ${String(abilityActivation.name || abilityActivation.abilityId).toUpperCase()}`,
      summary:
        abilityActivation.effectResult?.summary ||
        `Restricted NEXUS module [${abilityActivation.abilityId}] activated (-${abilityActivation.cost} CR).`,
      abilityId: abilityActivation.abilityId,
      abilityName: abilityActivation.name,
      creditsDelta: -Math.abs(abilityActivation.cost || 0),
      balanceAfter: team?.credits,
      timestamp: new Date(nowMs).toISOString(),
    });
  }

  if (tx) {
    const amount = Number(tx.amount || creditResult?.delta || 0);
    events.push({
      feedId: `LIVE-CR-${tx._id?.toString() || nowMs + 2}`,
      teamId,
      eventType: LIVE_FEED_EVENT_TYPES.CREDITS_UPDATED,
      transactionType: tx.type,
      title: `CREDITS UPDATED: ${amount >= 0 ? `+${amount}` : amount} CR (${tx.type})`,
      summary: tx.summary || `Resistance Credits updated to ${team?.credits} CR.`,
      challengeId: tx.relatedChallenge?.challengeId || null,
      challengeTitle: tx.relatedChallenge?.title || null,
      category: tx.relatedChallenge?.category || null,
      abilityId: tx.relatedAbility?.abilityId || null,
      abilityName: tx.relatedAbility?.name || null,
      creditsDelta: amount,
      balanceAfter: team?.credits,
      timestamp: new Date(nowMs + 2).toISOString(),
    });
  }

  return events;
};
