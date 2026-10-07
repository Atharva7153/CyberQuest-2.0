import {
  authenticateTeam,
  getTeamStateById,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from '../services/teamService.js';
import { CreditService } from '../services/creditService.js';
import { ChallengeService } from '../services/challengeService.js';
import { socketEmitters } from '../socket/index.js';

export const loginTeam = async (req, res, next) => {
  try {
    const { teamId, password } = req.body || {};
    const { token, team, transactions, catalog, attempts, timer, creditsConfig, serverTime } =
      await authenticateTeam(teamId, password);

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      token,
      team,
      transactions,
      attempts: attempts || [],
      timer,
      serverTime: serverTime || new Date().toISOString(),
      creditsConfig,
      catalog: catalog || CHALLENGE_CATALOG,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentTeam = async (req, res, next) => {
  try {
    const [team, transactions, catalog, attempts] = await Promise.all([
      getTeamStateById(req.team.teamId),
      CreditService.getTeamTransactions(req.team.teamId),
      ChallengeService.listChallenges(),
      ChallengeService.getAttemptsForTeam(req.team.teamId),
    ]);
    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team,
      transactions,
      attempts: attempts || [],
      timer: ChallengeService.computeSessionTimerTelemetry(team?.activeAttempt),
      serverTime: new Date().toISOString(),
      creditsConfig: CreditService.getConfig(),
      catalog,
    });
  } catch (error) {
    next(error);
  }
};

export const postTeamAction = async (req, res, next) => {
  try {
    const { actionType, payload } = req.body || {};
    const result = await executeTeamAction(req.team.teamId, actionType, payload);

    // Broadcast credits:update and team:state:update to team:<teamId>
    socketEmitters.emitCreditsUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      balanceBefore: result.event.balanceBefore,
      balanceAfter: result.team.credits,
      delta: result.event.creditsDelta,
      transaction: result.transaction,
      transactions: result.transactions,
    });

    if (result.evaluationResult) {
      socketEmitters.emitSubmissionResult(req.team.teamId, result.evaluationResult);
    }

    socketEmitters.emitTeamStateUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      team: result.team,
      transaction: result.transaction,
      evaluationResult: result.evaluationResult || null,
      attempts: result.attempts || [],
      timer: result.timer,
      serverTime: result.serverTime,
      transactions: result.transactions,
      event: result.event,
      catalog: result.catalog,
      creditsConfig: result.creditsConfig,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      transaction: result.transaction,
      evaluationResult: result.evaluationResult || null,
      attempts: result.attempts || [],
      timer: result.timer,
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
