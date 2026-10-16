import {
  CHALLENGE_CATEGORIES,
  CHALLENGE_DIFFICULTIES,
  CHALLENGE_RISKS,
  SUPPORTED_GAME_TYPES,
} from '../models/Challenge.js';
import { ChallengeService } from '../services/challengeService.js';
import {
  executeTeamAction,
  getTeamStateById,
} from '../services/teamService.js';
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
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getChallengeSession = async (req, res, next) => {
  try {
    const requestedChallengeId = String(req.params.challengeId || '')
      .trim()
      .toUpperCase();

    const [team, challenge, attempts] = await Promise.all([
      getTeamStateById(req.team.teamId),
      ChallengeService.getChallengeById(requestedChallengeId),
      ChallengeService.getAttemptsForTeam(req.team.teamId),
    ]);

    if (!challenge) {
      const err = new Error(`Challenge [${requestedChallengeId}] not found.`);
      err.statusCode = 404;
      throw err;
    }

    const matchedAttempt =
      (team?.activeAttempts || []).find(
        (a) => String(a.challengeId || '').toUpperCase() === requestedChallengeId
      ) ||
      (team?.activeAttempt &&
      String(team.activeAttempt.challengeId || '').toUpperCase() === requestedChallengeId
        ? team.activeAttempt
        : null);

    const timer = ChallengeService.computeSessionTimerTelemetry(
      matchedAttempt || team?.activeAttempt
    );

    const effectiveChallenge =
      matchedAttempt?.gameConfig && Object.keys(matchedAttempt.gameConfig).length > 0
        ? {
            ...challenge,
            description: matchedAttempt.gameConfig.variantDescription || challenge.description,
            gameConfig: {
              ...(challenge.gameConfig || {}),
              ...matchedAttempt.gameConfig,
            },
          }
        : challenge;

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      challenge: effectiveChallenge,
      team,
      activeAttempt: matchedAttempt || team?.activeAttempt || null,
      isMatchingActiveSession: Boolean(matchedAttempt),
      timer,
      attempts: attempts || [],
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const acquireChallenge = async (req, res, next) => {
  try {
    const challengeId = req.params.challengeId || req.body?.challengeId;
    const isReattempt = Boolean(req.body?.isReattempt);
    const operative = req.auth?.memberId
      ? {
          memberId: req.auth.memberId,
          memberName: req.auth.memberName || 'PLAYER 1',
          role: req.auth.memberRole || 'OPERATIVE',
        }
      : null;

    const result = await executeTeamAction(
      req.team.teamId,
      'ACQUIRE_CHALLENGE',
      {
        challengeId,
        isReattempt,
      },
      { operative }
    );

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
      attempts: result.attempts || [],
      timer: result.timer,
      serverTime: result.serverTime,
      transactions: result.transactions,
      event: result.event,
      creditsConfig: result.creditsConfig,
    });

    socketEmitters.emitChallengeUpdate(
      {
        teamId: req.team.teamId,
        challenge: result.team.currentChallenge,
        activeAttempt: result.team.activeAttempt,
        activeAttempts: result.team.activeAttempts || [],
        timer: result.timer,
        timestamp: new Date().toISOString(),
      },
      req.team.teamId
    );

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      activeAttempt: result.team.activeAttempt,
      activeAttempts: result.team.activeAttempts || [],
      currentChallenge: result.team.currentChallenge,
      attempts: result.attempts || [],
      timer: result.timer,
      serverTime: result.serverTime,
      transaction: result.transaction,
      transactions: result.transactions,
      event: result.event,
      creditsConfig: result.creditsConfig,
    });
  } catch (error) {
    next(error);
  }
};

export const submitChallengeSession = async (req, res, next) => {
  try {
    const {
      challengeId,
      attemptId,
      submission,
      answer,
      solution,
      simulateFailure,
    } = req.body || {};
    const operative = req.auth?.memberId
      ? {
          memberId: req.auth.memberId,
          memberName: req.auth.memberName || 'PLAYER 1',
          role: req.auth.memberRole || 'OPERATIVE',
        }
      : null;

    const result = await executeTeamAction(
      req.team.teamId,
      'SUBMIT_CHALLENGE',
      {
        challengeId: req.params.challengeId || challengeId,
        attemptId,
        submission: submission ?? answer ?? solution,
        simulateFailure: Boolean(simulateFailure),
      },
      { operative }
    );

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
      attempts: result.attempts || [],
      timer: result.timer,
      serverTime: result.serverTime,
      transactions: result.transactions,
      event: result.event,
      creditsConfig: result.creditsConfig,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      evaluationResult: result.evaluationResult,
      attempts: result.attempts || [],
      timer: result.timer,
      serverTime: result.serverTime,
      transaction: result.transaction,
      transactions: result.transactions,
      event: result.event,
      creditsConfig: result.creditsConfig,
    });
  } catch (error) {
    next(error);
  }
};

export const abandonChallengeSession = async (req, res, next) => {
  try {
    const { challengeId, attemptId } = req.body || {};
    const operative = req.auth?.memberId
      ? {
          memberId: req.auth.memberId,
          memberName: req.auth.memberName || 'PLAYER 1',
          role: req.auth.memberRole || 'OPERATIVE',
        }
      : null;

    const result = await executeTeamAction(
      req.team.teamId,
      'ABANDON_CHALLENGE',
      {
        challengeId: req.params.challengeId || challengeId,
        attemptId,
      },
      { operative }
    );

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
      evaluationResult: result.evaluationResult,
      attempts: result.attempts || [],
      timer: result.timer,
      serverTime: result.serverTime,
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
