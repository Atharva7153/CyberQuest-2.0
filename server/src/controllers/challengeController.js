import {
  CHALLENGE_CATEGORIES,
  CHALLENGE_DIFFICULTIES,
  CHALLENGE_RISKS,
  SUPPORTED_GAME_TYPES,
} from '../models/Challenge.js';
import { ChallengeService } from '../services/challengeService.js';
import { executeTeamAction } from '../services/teamService.js';
import { socketEmitters } from '../socket/index.js';

export const getChallengeMarket = async (req, res, next) => {
  try {
    const { category, difficulty, risk } = req.query || {};
    const challenges = await ChallengeService.listChallenges({
      category,
      difficulty,
      risk,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      categories: CHALLENGE_CATEGORIES,
      difficulties: CHALLENGE_DIFFICULTIES,
      risks: CHALLENGE_RISKS,
      gameTypes: SUPPORTED_GAME_TYPES,
      challenges,
    });
  } catch (error) {
    next(error);
  }
};

export const getChallengeById = async (req, res, next) => {
  try {
    const challenge = await ChallengeService.getChallengeById(req.params.challengeId);
    if (!challenge) {
      const err = new Error(`Challenge [${req.params.challengeId}] not found.`);
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      challenge,
    });
  } catch (error) {
    next(error);
  }
};

export const acquireChallenge = async (req, res, next) => {
  try {
    const challengeId = req.params.challengeId || req.body?.challengeId;
    const isReattempt = Boolean(req.body?.isReattempt);

    const result = await executeTeamAction(req.team.teamId, 'ACQUIRE_CHALLENGE', {
      challengeId,
      isReattempt,
    });

    socketEmitters.emitCreditsUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      balanceBefore: result.event.balanceBefore,
      balanceAfter: result.team.credits,
      delta: result.event.creditsDelta,
      transaction: result.transaction,
      transactions: result.transactions,
    });

    socketEmitters.emitTeamStateUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      team: result.team,
      transaction: result.transaction,
      transactions: result.transactions,
      event: result.event,
      catalog: result.catalog,
      creditsConfig: result.creditsConfig,
    });

    socketEmitters.emitChallengeUpdate(
      {
        teamId: req.team.teamId,
        challenge: result.team.currentChallenge,
        activeAttempt: result.team.activeAttempt,
        timestamp: new Date().toISOString(),
      },
      req.team.teamId
    );

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      activeAttempt: result.team.activeAttempt,
      currentChallenge: result.team.currentChallenge,
      transaction: result.transaction,
      transactions: result.transactions,
      event: result.event,
      catalog: result.catalog,
      creditsConfig: result.creditsConfig,
    });
  } catch (error) {
    next(error);
  }
};

export const submitChallengeSession = async (req, res, next) => {
  try {
    const { challengeId, submission, answer, solution, simulateFailure } = req.body || {};

    const result = await executeTeamAction(req.team.teamId, 'SUBMIT_CHALLENGE', {
      challengeId: req.params.challengeId || challengeId,
      submission: submission ?? answer ?? solution,
      simulateFailure: Boolean(simulateFailure),
    });

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
      evaluationResult: result.evaluationResult,
      transactions: result.transactions,
      event: result.event,
      catalog: result.catalog,
      creditsConfig: result.creditsConfig,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      evaluationResult: result.evaluationResult,
      transaction: result.transaction,
      transactions: result.transactions,
      event: result.event,
      catalog: result.catalog,
      creditsConfig: result.creditsConfig,
    });
  } catch (error) {
    next(error);
  }
};
