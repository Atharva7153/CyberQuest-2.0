import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RECORDINGS_FILE_PATH = path.resolve(__dirname, '../../logs/recordings.json');

let activeRecording = null;
let savedRecordings = [];

// Load persisted recordings from disk if available (helpful on local college server)
const loadPersistedRecordings = () => {
  try {
    if (fs.existsSync(RECORDINGS_FILE_PATH)) {
      const raw = fs.readFileSync(RECORDINGS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.savedRecordings)) {
        savedRecordings = parsed.savedRecordings.slice(0, 20);
      }
      if (parsed.activeRecording && parsed.activeRecording.status === 'RECORDING') {
        activeRecording = parsed.activeRecording;
      }
    }
  } catch (err) {
    logger.warn('RECORDING', `Could not load persisted recordings: ${err.message}`);
  }
};

const persistRecordingsToDisk = () => {
  try {
    const dir = path.dirname(RECORDINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      RECORDINGS_FILE_PATH,
      JSON.stringify(
        {
          activeRecording,
          savedRecordings: savedRecordings.slice(0, 15),
        },
        null,
        2
      ),
      'utf-8'
    );
  } catch (err) {
    logger.warn('RECORDING', `Could not persist recordings to disk: ${err.message}`);
  }
};

loadPersistedRecordings();

/**
 * Evaluate incoming event against previous events in the recording session
 * to detect suspicious gameplay or anomalies.
 */
const evaluateEventForAnomalies = (session, event) => {
  const detected = [];
  const nowMs = new Date(event.timestamp).getTime();
  const teamId = event.teamId;
  const challengeId = event.challengeId;
  const meta = event.metadata || {};

  if (!teamId) return detected;

  // 1. SPEED_SOLVE: Abnormally fast challenge completion
  if (event.action === 'SUCCESS') {
    const solveSec =
      meta.solveDurationSeconds !== undefined && meta.solveDurationSeconds !== null
        ? Number(meta.solveDurationSeconds)
        : null;
    const difficulty = String(meta.difficulty || 'MODERATE').toUpperCase();
    const gameType = String(meta.gameType || '').toLowerCase();
    const timeLimit = Number(meta.timeLimit || 180);

    if (solveSec !== null && solveSec >= 0) {
      if (solveSec <= 12) {
        detected.push({
          anomalyId: `ANM-${Date.now().toString(36).toUpperCase()}-${Math.random()
            .toString(36)
            .slice(2, 5)
            .toUpperCase()}`,
          type: 'SPEED_SOLVE',
          severity: 'CRITICAL',
          teamId,
          memberId: meta.memberId || null,
          memberName: meta.memberName || null,
          challengeId,
          challengeTitle: meta.title || challengeId,
          timestamp: event.timestamp,
          title: `IMPOSSIBLE SOLVE SPEED (${solveSec}s)`,
          detail: `${teamId}${meta.memberName ? ` (${meta.memberName})` : ''} solved [${challengeId}] in just ${solveSec}s (Time limit: ${timeLimit}s). Faster than normal human input speed.`,
          metrics: { solveDurationSeconds: solveSec, timeLimit, difficulty, gameType },
        });
      } else if (
        solveSec <= 25 &&
        (['HIGH', 'EXTREME'].includes(difficulty) ||
          ['sudoku', 'patches', 'zip', 'queens', 'aptitude', 'gktruefalse', 'wend'].includes(
            gameType
          ))
      ) {
        detected.push({
          anomalyId: `ANM-${Date.now().toString(36).toUpperCase()}-${Math.random()
            .toString(36)
            .slice(2, 5)
            .toUpperCase()}`,
          type: 'SPEED_SOLVE',
          severity: 'HIGH',
          teamId,
          memberId: meta.memberId || null,
          memberName: meta.memberName || null,
          challengeId,
          challengeTitle: meta.title || challengeId,
          timestamp: event.timestamp,
          title: `ULTRA-FAST SOLVE (${solveSec}s)`,
          detail: `${teamId}${meta.memberName ? ` (${meta.memberName})` : ''} solved ${difficulty} challenge [${challengeId}] in ${solveSec}s (Limit: ${timeLimit}s).`,
          metrics: { solveDurationSeconds: solveSec, timeLimit, difficulty, gameType },
        });
      }
    }

    // 2. CROSS_TEAM_COLLUSION: Another team solved the exact same challenge within 15 seconds
    const recentOtherTeamSuccess = session.events.find((prev) => {
      if (prev.auditId === event.auditId) return false;
      if (prev.action !== 'SUCCESS' || prev.challengeId !== challengeId || prev.teamId === teamId) {
        return false;
      }
      const diffSec = Math.abs(nowMs - new Date(prev.timestamp).getTime()) / 1000;
      return diffSec <= 15;
    });

    if (recentOtherTeamSuccess) {
      const diffSec = Math.round(
        Math.abs(nowMs - new Date(recentOtherTeamSuccess.timestamp).getTime()) / 1000
      );
      detected.push({
        anomalyId: `ANM-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 5)
          .toUpperCase()}`,
        type: 'CROSS_TEAM_SYNC',
        severity: 'HIGH',
        teamId,
        memberId: meta.memberId || null,
        memberName: meta.memberName || null,
        challengeId,
        challengeTitle: meta.title || challengeId,
        timestamp: event.timestamp,
        title: `NEAR-SIMULTANEOUS SOLVE WITH ${recentOtherTeamSuccess.teamId} (${diffSec}s apart)`,
        detail: `${teamId} and ${recentOtherTeamSuccess.teamId} both completed [${challengeId}] within ${diffSec}s of each other. Check if teams are sitting adjacent or sharing solutions.`,
        metrics: {
          otherTeamId: recentOtherTeamSuccess.teamId,
          deltaSeconds: diffSec,
          variantId: meta.variantId || null,
        },
      });
    }

    // 3. PARALLEL_SPEED_BURST: Same team solved >= 3 challenges within 60 seconds
    const recentTeamSolves = session.events.filter((prev) => {
      if (prev.action !== 'SUCCESS' || prev.teamId !== teamId) return false;
      const ageSec = (nowMs - new Date(prev.timestamp).getTime()) / 1000;
      return ageSec >= 0 && ageSec <= 60;
    });

    if (recentTeamSolves.length >= 3) {
      detected.push({
        anomalyId: `ANM-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 5)
          .toUpperCase()}`,
        type: 'SOLVE_BURST',
        severity: 'HIGH',
        teamId,
        memberId: meta.memberId || null,
        memberName: meta.memberName || null,
        challengeId,
        challengeTitle: meta.title || challengeId,
        timestamp: event.timestamp,
        title: `RAPID MULTI-SOLVE BURST (${recentTeamSolves.length} solves in 60s)`,
        detail: `${teamId} completed ${recentTeamSolves.length} challenges within 60 seconds.`,
        metrics: { solvesInWindow: recentTeamSolves.length },
      });
    }
  }

  // 4. RAPID_FAILURE_SPAM: Brute-force / repeated guessing (>= 3 failures by same team in 90s)
  if (event.action === 'FAILURE') {
    const recentTeamFailures = session.events.filter((prev) => {
      if (prev.action !== 'FAILURE' || prev.teamId !== teamId) return false;
      const ageSec = (nowMs - new Date(prev.timestamp).getTime()) / 1000;
      return ageSec >= 0 && ageSec <= 90;
    });

    if (recentTeamFailures.length >= 3) {
      detected.push({
        anomalyId: `ANM-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 5)
          .toUpperCase()}`,
        type: 'BRUTE_FORCE_GUESSING',
        severity: 'WARNING',
        teamId,
        memberId: meta.memberId || null,
        memberName: meta.memberName || null,
        challengeId,
        challengeTitle: meta.title || challengeId,
        timestamp: event.timestamp,
        title: `RAPID FAILURE SPAM (${recentTeamFailures.length} fails in 90s)`,
        detail: `${teamId}${meta.memberName ? ` (${meta.memberName})` : ''} recorded ${recentTeamFailures.length} failed submissions within 90 seconds (latest on [${challengeId}]). Possible brute-force guessing.`,
        metrics: { failuresInWindow: recentTeamFailures.length, reason: meta.reason || null },
      });
    }
  }

  // 5. LOGIN_CHURN: Excessive logins for the same team (> 5 logins in 120s — possible >4 devices sharing)
  if (event.action === 'LOGIN') {
    const recentTeamLogins = session.events.filter((prev) => {
      if (prev.action !== 'LOGIN' || prev.teamId !== teamId) return false;
      const ageSec = (nowMs - new Date(prev.timestamp).getTime()) / 1000;
      return ageSec >= 0 && ageSec <= 120;
    });

    if (recentTeamLogins.length >= 5) {
      detected.push({
        anomalyId: `ANM-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 5)
          .toUpperCase()}`,
        type: 'EXCESSIVE_DEVICE_LOGINS',
        severity: 'WARNING',
        teamId,
        memberId: meta.memberId || null,
        memberName: meta.memberName || null,
        challengeId: null,
        challengeTitle: null,
        timestamp: event.timestamp,
        title: `HIGH DEVICE LOGIN CHURN (${recentTeamLogins.length} logins in 2m)`,
        detail: `${teamId} authenticated ${recentTeamLogins.length} times within 2 minutes — verify no more than 4 devices/players are sharing credentials.`,
        metrics: { loginsInWindow: recentTeamLogins.length },
      });
    }
  }

  return detected;
};

/**
 * Compile a full structured report for a recording session (live or completed).
 */
export const buildRecordingReport = (session) => {
  if (!session) return null;

  const nowIso = new Date().toISOString();
  const startMs = new Date(session.startedAt).getTime();
  const endMs = session.endedAt ? new Date(session.endedAt).getTime() : Date.now();
  const durationSeconds = Math.max(0, Math.round((endMs - startMs) / 1000));

  const events = Array.isArray(session.events) ? session.events : [];
  const anomalies = Array.isArray(session.anomalies) ? session.anomalies : [];

  const teamStatsMap = new Map();

  let purchasesCount = 0;
  let startsCount = 0;
  let submissionsCount = 0;
  let solvesCount = 0;
  let failuresCount = 0;
  let timeoutsCount = 0;
  let hintsUsedCount = 0;
  let extraTimeCount = 0;
  let loginsCount = 0;
  let totalCreditsAwarded = 0;
  let totalCreditsSpentAndPenalties = 0;

  for (const ev of events) {
    const act = ev.action;
    const meta = ev.metadata || {};
    const delta = Number(ev.creditsDelta || 0);

    if (act === 'PURCHASE') purchasesCount++;
    else if (act === 'START') startsCount++;
    else if (act === 'SUBMISSION') submissionsCount++;
    else if (act === 'SUCCESS') solvesCount++;
    else if (act === 'FAILURE') {
      failuresCount++;
      if (meta.status === 'TIMEOUT') timeoutsCount++;
    } else if (act === 'HINT') hintsUsedCount++;
    else if (act === 'EXTRA_TIME') extraTimeCount++;
    else if (act === 'LOGIN') loginsCount++;

    if (delta > 0) totalCreditsAwarded += delta;
    else if (delta < 0) totalCreditsSpentAndPenalties += Math.abs(delta);

    if (ev.teamId) {
      if (!teamStatsMap.has(ev.teamId)) {
        teamStatsMap.set(ev.teamId, {
          teamId: ev.teamId,
          eventsCount: 0,
          solves: 0,
          failures: 0,
          timeouts: 0,
          purchases: 0,
          hintsUsed: 0,
          logins: 0,
          creditsGained: 0,
          creditsLost: 0,
          netCredits: 0,
          lastBalance: ev.balanceAfter ?? null,
          solveDurations: [],
          fastestSolveSeconds: null,
          avgSolveSeconds: null,
          anomaliesCount: 0,
          criticalAnomalies: 0,
          activeMembers: new Set(),
        });
      }
      const ts = teamStatsMap.get(ev.teamId);
      ts.eventsCount += 1;
      if (ev.balanceAfter !== undefined && ev.balanceAfter !== null) {
        ts.lastBalance = ev.balanceAfter;
      }
      if (meta.memberName) {
        ts.activeMembers.add(meta.memberName);
      }
      if (act === 'SUCCESS') {
        ts.solves += 1;
        if (meta.solveDurationSeconds !== undefined && meta.solveDurationSeconds !== null) {
          const dur = Number(meta.solveDurationSeconds);
          if (dur >= 0) {
            ts.solveDurations.push(dur);
          }
        }
      } else if (act === 'FAILURE') {
        ts.failures += 1;
        if (meta.status === 'TIMEOUT') ts.timeouts += 1;
      } else if (act === 'PURCHASE') {
        ts.purchases += 1;
      } else if (act === 'HINT') {
        ts.hintsUsed += 1;
      } else if (act === 'LOGIN') {
        ts.logins += 1;
      }

      if (delta > 0) ts.creditsGained += delta;
      if (delta < 0) ts.creditsLost += Math.abs(delta);
      ts.netCredits = ts.creditsGained - ts.creditsLost;
    }
  }

  for (const anm of anomalies) {
    if (anm.teamId && teamStatsMap.has(anm.teamId)) {
      const ts = teamStatsMap.get(anm.teamId);
      ts.anomaliesCount += 1;
      if (anm.severity === 'CRITICAL') ts.criticalAnomalies += 1;
    }
  }

  const teamBreakdown = Array.from(teamStatsMap.values()).map((ts) => {
    const fastest =
      ts.solveDurations.length > 0 ? Math.min(...ts.solveDurations) : null;
    const avg =
      ts.solveDurations.length > 0
        ? Math.round(
            ts.solveDurations.reduce((a, b) => a + b, 0) / ts.solveDurations.length
          )
        : null;
    const statusFlag =
      ts.criticalAnomalies > 0
        ? 'CRITICAL'
        : ts.anomaliesCount > 0
          ? 'FLAGGED'
          : 'CLEAN';

    return {
      teamId: ts.teamId,
      eventsCount: ts.eventsCount,
      solves: ts.solves,
      failures: ts.failures,
      timeouts: ts.timeouts,
      purchases: ts.purchases,
      hintsUsed: ts.hintsUsed,
      logins: ts.logins,
      creditsGained: ts.creditsGained,
      creditsLost: ts.creditsLost,
      netCredits: ts.netCredits,
      lastBalance: ts.lastBalance,
      fastestSolveSeconds: fastest,
      avgSolveSeconds: avg,
      anomaliesCount: ts.anomaliesCount,
      criticalAnomalies: ts.criticalAnomalies,
      activeMembers: Array.from(ts.activeMembers),
      statusFlag,
    };
  });

  teamBreakdown.sort((a, b) => {
    if (b.anomaliesCount !== a.anomaliesCount) return b.anomaliesCount - a.anomaliesCount;
    if (b.solves !== a.solves) return b.solves - a.solves;
    return b.eventsCount - a.eventsCount;
  });

  const criticalAnomaliesCount = anomalies.filter((a) => a.severity === 'CRITICAL').length;
  const highAnomaliesCount = anomalies.filter((a) => a.severity === 'HIGH').length;
  const warningAnomaliesCount = anomalies.filter((a) => a.severity === 'WARNING').length;

  return {
    recordingId: session.recordingId,
    label: session.label || 'LIVE GAME RECORDING',
    status: session.status, // 'RECORDING' | 'COMPLETED'
    startedAt: session.startedAt,
    endedAt: session.endedAt || null,
    generatedAt: nowIso,
    startedBy: session.startedBy || 'ADMIN-NEXUS',
    stoppedBy: session.stoppedBy || null,
    durationSeconds,
    summary: {
      totalEvents: events.length,
      activeTeamsCount: teamBreakdown.length,
      purchasesCount,
      startsCount,
      submissionsCount,
      solvesCount,
      failuresCount,
      timeoutsCount,
      hintsUsedCount,
      extraTimeCount,
      loginsCount,
      totalCreditsAwarded,
      totalCreditsSpentAndPenalties,
      anomaliesCount: anomalies.length,
      criticalAnomaliesCount,
      highAnomaliesCount,
      warningAnomaliesCount,
    },
    anomalies: [...anomalies].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
    teamBreakdown,
    events: [...events].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
  };
};

export class RecordingService {
  static startRecording({ operatorId = 'ADMIN-NEXUS', label = '' } = {}) {
    if (activeRecording && activeRecording.status === 'RECORDING') {
      return this.getStatus();
    }

    const now = new Date().toISOString();
    const recordingId = `REC-${Date.now().toString(36).toUpperCase()}`;

    activeRecording = {
      recordingId,
      label: String(label || '').trim() || `Round Audit Recording (${new Date().toLocaleTimeString('en-GB', { hour12: false })})`,
      status: 'RECORDING',
      startedAt: now,
      endedAt: null,
      startedBy: operatorId,
      stoppedBy: null,
      events: [],
      anomalies: [],
    };

    persistRecordingsToDisk();
    logger.info('RECORDING', `Started game recording [${recordingId}] by ${operatorId}`);
    return this.getStatus();
  }

  static stopRecording({ operatorId = 'ADMIN-NEXUS' } = {}) {
    if (!activeRecording) {
      return this.getStatus();
    }

    activeRecording.status = 'COMPLETED';
    activeRecording.endedAt = new Date().toISOString();
    activeRecording.stoppedBy = operatorId;

    const finalized = { ...activeRecording };
    savedRecordings.unshift(finalized);
    if (savedRecordings.length > 15) {
      savedRecordings.length = 15;
    }
    activeRecording = null;

    persistRecordingsToDisk();
    logger.info('RECORDING', `Stopped game recording [${finalized.recordingId}] by ${operatorId}`);

    return {
      ...this.getStatus(),
      lastCompletedReport: buildRecordingReport(finalized),
    };
  }

  static clearRecordings() {
    activeRecording = null;
    savedRecordings = [];
    persistRecordingsToDisk();
    return this.getStatus();
  }

  static captureAuditEvent(auditRecord) {
    if (!activeRecording || activeRecording.status !== 'RECORDING' || !auditRecord) {
      return;
    }

    // Ignore noisy admin state polls, keep all gameplay & admin control events
    activeRecording.events.push(auditRecord);
    if (activeRecording.events.length > 5000) {
      activeRecording.events.shift();
    }

    const newAnomalies = evaluateEventForAnomalies(activeRecording, auditRecord);
    if (newAnomalies.length > 0) {
      activeRecording.anomalies.push(...newAnomalies);
    }

    persistRecordingsToDisk();
  }

  static getStatus() {
    const isRecording = Boolean(activeRecording && activeRecording.status === 'RECORDING');
    const activeReport = isRecording ? buildRecordingReport(activeRecording) : null;
    const latestSavedReport =
      savedRecordings.length > 0 ? buildRecordingReport(savedRecordings[0]) : null;

    return {
      isRecording,
      activeRecording: activeReport,
      latestReport: activeReport || latestSavedReport || null,
      savedRecordings: savedRecordings.map((rec) => {
        const rep = buildRecordingReport(rec);
        return {
          recordingId: rep.recordingId,
          label: rep.label,
          status: rep.status,
          startedAt: rep.startedAt,
          endedAt: rep.endedAt,
          durationSeconds: rep.durationSeconds,
          startedBy: rep.startedBy,
          stoppedBy: rep.stoppedBy,
          summary: rep.summary,
        };
      }),
    };
  }

  static getReportById(recordingId) {
    if (activeRecording && activeRecording.recordingId === recordingId) {
      return buildRecordingReport(activeRecording);
    }
    const found = savedRecordings.find((r) => r.recordingId === recordingId);
    if (found) {
      return buildRecordingReport(found);
    }
    if (activeRecording) return buildRecordingReport(activeRecording);
    if (savedRecordings.length > 0) return buildRecordingReport(savedRecordings[0]);
    return null;
  }
}

export default RecordingService;
