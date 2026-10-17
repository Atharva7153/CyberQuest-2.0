import { CreditService } from '../services/creditService.js';
import { executeTeamAction } from '../services/teamService.js';
import { socketEmitters } from '../socket/index.js';

export const getCreditHistory = async (req, res, next) => {
  try {
    const transactions = await CreditService.getTeamTransactions(req.team.teamId);
    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      teamId: req.team.teamId,
      balance: req.team.credits,
      creditsConfig: CreditService.getConfig(),
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const postCreditTransaction = async (req, res, next) => {
  try {
    const { type, payload } = req.body || {};
    const result = await executeTeamAction(req.team.teamId, type, payload || req.body);

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
      creditsConfig: result.creditsConfig,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      balanceAfter: result.team.credits,
      transaction: result.transaction,
      transactions: result.transactions,
      team: result.team,
    });
  } catch (error) {
    next(error);
  }
};
