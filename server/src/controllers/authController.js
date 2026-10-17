import {
  authenticateTeam,
  verifyTeamCredentials,
  getPublicTeamRoster,
  getTeamStateById,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from '../services/teamService.js';
import { CreditService } from '../services/creditService.js';
import { ChallengeService } from '../services/challengeService.js';
import { AbilityService } from '../services/abilityService.js';
import {
  normalizeAttemptHistory,
  buildTeamProgressSummary,
  buildCanonicalLiveFeed,
} from '../services/progressHistoryService.js';
import { NexusCoreService } from '../services/nexusCoreService.js';
import { DisplayService, computeGlobalArenaTimer } from '../services/displayService.js';
import { socketEmitters } from '../socket/index.js';

let projectorBroadcastTimer = null;

const scheduleProjectorLeaderboardBroadcast = () => {
  if (projectorBroadcastTimer) return;
  projectorBroadcastTimer = setTimeout(async () => {
    projectorBroadcastTimer = null;
    try {
      const projectorSnapshot = await DisplayService.getProjectorDisplaySnapshot();
      socketEmitters.emitLeaderboardUpdate(projectorSnapshot);
    } catch {
      // Ignore background projector refresh error
    }
  }, 250);
};

export const getTeamRosterPublic = async (req, res, next) => {
  try {
    const { teamId } = req.params || {};
    const roster = await getPublicTeamRoster(teamId);
    if (!roster) {
      return res.status(404).json({
        status: 'error',
        code: 'TEAM_NOT_FOUND',
        message: 'Team not found.',
      });
    }
    res.status(200).json({
      status: 'ok',
      roster,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyTeamLoginStep = async (req, res, next) => {
  try {
    const { teamId, password } = req.body || {};
    const roster = await verifyTeamCredentials(teamId, password);
    res.status(200).json({
      status: 'ok',
      roster,
    });
  } catch (error) {
    next(error);
  }
};

export const loginTeam = async (req, res, next) => {
  try {
    const { teamId, password, memberId, memberName } = req.body || {};
    const {
      token,
      operative,
      team,
      nexusCore,
      transactions,
      catalog,
      abilitiesCatalog,
      attempts,
      attemptHistory,
      progressSummary,
      liveFeed,
      timer,
      globalTimer,
      creditsConfig,
      serverTime,
    } = await authenticateTeam(teamId, password, { memberId, memberName });

    // Broadcast updated roster/presence to any teammates already connected
    socketEmitters.emitTeamStateUpdate(team.teamId, {
      teamId: team.teamId,
      team,
      nexusCore: nexusCore || null,
      transactions,
      attempts: attempts || [],
      attemptHistory: attemptHistory || [],
      progressSummary: progressSummary || null,
      liveFeed: liveFeed || [],
      timer,
      globalTimer: globalTimer || computeGlobalArenaTimer(),
      serverTime: serverTime || new Date().toISOString(),
      creditsConfig,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      token,
      operative,
      team,
      nexusCore: nexusCore || null,
      transactions,
      attempts: attempts || [],
      attemptHistory: attemptHistory || [],
      progressSummary: progressSummary || null,
      liveFeed: liveFeed || [],
      timer,
      globalTimer: globalTimer || computeGlobalArenaTimer(),
      serverTime: serverTime || new Date().toISOString(),
      creditsConfig,
      catalog: catalog || CHALLENGE_CATALOG,
      abilitiesCatalog: abilitiesCatalog || [],
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentTeam = async (req, res, next) => {
  try {
    const [team, transactions, catalog, attempts, abilitiesCatalog] = await Promise.all([
      getTeamStateById(req.team.teamId),
      CreditService.getTeamTransactions(req.team.teamId),
      ChallengeService.listChallenges(),
      ChallengeService.getAttemptsForTeam(req.team.teamId),
      AbilityService.listAbilities(),
    ]);

    const nexusCore = await NexusCoreService.getNexusCoreStatusForTeam(team);
    const resolvedCatalog = catalog || CHALLENGE_CATALOG;
    const attemptHistory = normalizeAttemptHistory(team, attempts, resolvedCatalog);
    const progressSummary = buildTeamProgressSummary(
      team,
      attempts,
      transactions,
      resolvedCatalog
    );
    const liveFeed = buildCanonicalLiveFeed(team, attempts, transactions, resolvedCatalog);

    const operative = req.auth?.memberId
      ? {
          memberId: req.auth.memberId,
          name: req.auth.memberName || 'PLAYER 1',
          memberName: req.auth.memberName || 'PLAYER 1',
          role: req.auth.memberRole || 'OPERATIVE',
        }
      : null;

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      operative,
      team,
      nexusCore,
      transactions,
      attempts: attempts || [],
      attemptHistory,
      progressSummary,
      liveFeed,
      timer: ChallengeService.computeSessionTimerTelemetry(team?.activeAttempt),
      globalTimer: computeGlobalArenaTimer(),
      serverTime: new Date().toISOString(),
      creditsConfig: CreditService.getConfig(),
      catalog: resolvedCatalog,
      abilitiesCatalog: abilitiesCatalog || [],
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamProgress = async (req, res, next) => {
  try {
    const [team, transactions, catalog, attempts, abilitiesCatalog] = await Promise.all([
      getTeamStateById(req.team.teamId),
      CreditService.getTeamTransactions(req.team.teamId),
      ChallengeService.listChallenges(),
      ChallengeService.getAttemptsForTeam(req.team.teamId),
      AbilityService.listAbilities(),
    ]);

    const nexusCore = await NexusCoreService.getNexusCoreStatusForTeam(team);
    const resolvedCatalog = catalog || CHALLENGE_CATALOG;
    const progressSummary = buildTeamProgressSummary(
      team,
      attempts,
      transactions,
      resolvedCatalog
    );
    const liveFeed = buildCanonicalLiveFeed(team, attempts, transactions, resolvedCatalog);

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      teamId: req.team.teamId,
      team,
      nexusCore,
      progressSummary,
      liveFeed,
      abilitiesCatalog: abilitiesCatalog || [],
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamHistory = async (req, res, next) => {
  try {
    const [team, transactions, catalog, attempts] = await Promise.all([
      getTeamStateById(req.team.teamId),
      CreditService.getTeamTransactions(req.team.teamId),
      ChallengeService.listChallenges(),
      ChallengeService.getAttemptsForTeam(req.team.teamId),
    ]);

    const resolvedCatalog = catalog || CHALLENGE_CATALOG;
    const attemptHistory = normalizeAttemptHistory(team, attempts, resolvedCatalog);
    const liveFeed = buildCanonicalLiveFeed(team, attempts, transactions, resolvedCatalog);

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      teamId: req.team.teamId,
      attempts: attempts || [],
      attemptHistory,
      transactions,
      liveFeed,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamNexusCore = async (req, res, next) => {
  try {
    const team = await getTeamStateById(req.team.teamId);
    const nexusCore = await NexusCoreService.getNexusCoreStatusForTeam(team);

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      teamId: req.team.teamId,
      team,
      nexusCore,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const postTeamAction = async (req, res, next) => {
  try {
    const { actionType, payload } = req.body || {};
    const operative = req.auth?.memberId
      ? {
          memberId: req.auth.memberId,
          memberName: req.auth.memberName || 'PLAYER 1',
          role: req.auth.memberRole || 'OPERATIVE',
        }
      : null;
    const result = await executeTeamAction(req.team.teamId, actionType, payload, { operative });

    // Broadcast credits:update to team:<teamId>
    socketEmitters.emitCreditsUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      balanceBefore: result.event.balanceBefore,
      balanceAfter: result.team.credits,
      delta: result.event.creditsDelta,
      transaction: result.transaction,
      transactions: result.transactions,
    });

    // Broadcast canonical Live Feed events (CHALLENGE ACQUIRED, CHALLENGE STARTED, SUBMISSION, SUCCESS, FAILURE, CREDITS UPDATED, ABILITY USED)
    if (result.liveFeedEvents && result.liveFeedEvents.length > 0) {
      socketEmitters.emitFeedEvents(req.team.teamId, result.liveFeedEvents, result.liveFeed);
    }

    // Broadcast NEXUS Core availability when newly unlocked (LOCKED -> AVAILABLE)
    if (result.coreAvailabilityBroadcast && result.nexusCore) {
      socketEmitters.emitCoreAvailable(req.team.teamId, {
        teamName: result.team.teamName,
        nexusCore: result.nexusCore,
        state: result.nexusCore.state || 'AVAILABLE',
        message: 'THE NEXUS CORE IS NOW AVAILABLE // ULTIMATE SYSTEM OBJECTIVE UNLOCKED',
      });
    }

    // Broadcast NEXUS Core completion & Winner proclamation
    if (result.coreCompletedBroadcast && result.nexusCore) {
      socketEmitters.emitCoreCompleted(req.team.teamId, {
        teamName: result.team.teamName,
        nexusCore: result.nexusCore,
        winner: result.nexusCore.winner || null,
        completedTeams: result.nexusCore.completedTeams || [],
        coreEvaluation: result.coreEvaluation || null,
      });
    }

    // Broadcast NEXUS Core state update
    if (result.coreStateChanged && result.nexusCore) {
      socketEmitters.emitCoreStateUpdate(req.team.teamId, {
        nexusCore: result.nexusCore,
        coreEvaluation: result.coreEvaluation || null,
      });
    }

    // Synchronize updated timer across Socket.IO (e.g. EXTRA_TIME modifying expiresAt)
    if (result.timer) {
      socketEmitters.emitTimerUpdate(
        {
          teamId: req.team.teamId,
          timer: result.timer,
          serverTime: result.serverTime,
        },
        req.team.teamId
      );
    }

    // Broadcast ability activation event to team:<teamId>
    if (result.abilityActivation) {
      socketEmitters.emitAbilityEvent(result.abilityActivation, req.team.teamId);
    }

    if (result.evaluationResult) {
      socketEmitters.emitSubmissionResult(req.team.teamId, result.evaluationResult);
    }

    socketEmitters.emitTeamStateUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      team: result.team,
      nexusCore: result.nexusCore || null,
      coreEvaluation: result.coreEvaluation || null,
      transaction: result.transaction,
      evaluationResult: result.evaluationResult || null,
      abilityActivation: result.abilityActivation || null,
      abilitiesCatalog: result.abilitiesCatalog || [],
      attempts: result.attempts || [],
      attemptHistory: result.attemptHistory || [],
      progressSummary: result.progressSummary || null,
      liveFeed: result.liveFeed || [],
      liveFeedEvents: result.liveFeedEvents || [],
      timer: result.timer,
      globalTimer: result.globalTimer || computeGlobalArenaTimer(),
      serverTime: result.serverTime,
      transactions: result.transactions,
      event: result.event,
      creditsConfig: result.creditsConfig,
    });

    // Schedule debounced arena projector snapshot broadcast to /display subscribers (non-blocking)
    scheduleProjectorLeaderboardBroadcast();

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      nexusCore: result.nexusCore || null,
      coreEvaluation: result.coreEvaluation || null,
      transaction: result.transaction,
      evaluationResult: result.evaluationResult || null,
      abilityActivation: result.abilityActivation || null,
      abilitiesCatalog: result.abilitiesCatalog || [],
      attempts: result.attempts || [],
      attemptHistory: result.attemptHistory || [],
      progressSummary: result.progressSummary || null,
      liveFeed: result.liveFeed || [],
      liveFeedEvents: result.liveFeedEvents || [],
      timer: result.timer,
      globalTimer: result.globalTimer || computeGlobalArenaTimer(),
      serverTime: result.serverTime,
      transactions: result.transactions,
      event: result.event,
      catalog: result.catalog,
      creditsConfig: result.creditsConfig,
    });
  } catch (error) {
    next(error);
  }
};

