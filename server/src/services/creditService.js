import { Team } from '../models/Team.js';
import { CreditTransaction } from '../models/CreditTransaction.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { logger } from '../utils/logger.js';

const DEBIT_TYPES = new Set([
  CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE,
  CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY,
  CREDIT_TRANSACTION_TYPES.EXTRA_TIME,
  CREDIT_TRANSACTION_TYPES.HINT,
  CREDIT_TRANSACTION_TYPES.ABILITY,
  CREDIT_TRANSACTION_TYPES.REATTEMPT,
]);

export class CreditService {
  static TYPES = CREDIT_TRANSACTION_TYPES;

  /**
   * Executes an authoritative Resistance Credit transaction on a Team document
   * and persists a CreditTransaction record in MongoDB.
   */
  static async recordTransaction({
    teamDoc,
    teamId,
    type,
    amount,
    relatedChallenge = null,
    relatedAbility = null,
    summary = '',
    autoSaveTeam = true,
  }) {
    if (!Object.values(CREDIT_TRANSACTION_TYPES).includes(type)) {
      const err = new Error(`Invalid credit transaction type: ${type}`);
      err.statusCode = 400;
      err.code = 'INVALID_TRANSACTION_TYPE';
      throw err;
    }

    const team =
      teamDoc ||
      (await Team.findOne({
        teamId: String(teamId || '')
          .trim()
          .toUpperCase(),
      }));

    if (!team) {
      const err = new Error(`Team [${teamId}] not found.`);
      err.statusCode = 404;
      err.code = 'TEAM_NOT_FOUND';
      throw err;
    }

    const rawMagnitude = Math.abs(Number(amount || 0));
    if (Number.isNaN(rawMagnitude) || rawMagnitude < 0) {
      const err = new Error('Transaction amount must be a non-negative number.');
      err.statusCode = 400;
      err.code = 'INVALID_TRANSACTION_AMOUNT';
      throw err;
    }

    const isDebit = DEBIT_TYPES.has(type);
    const balanceBefore = Number(team.credits || 0);

    // Enforce strict balance check on voluntary spends (penalties clamp at 0)
    if (
      isDebit &&
      rawMagnitude > 0 &&
      type !== CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY &&
      balanceBefore < rawMagnitude
    ) {
      const err = new Error(
        `Insufficient Resistance Credits (${balanceBefore} CR available, ${rawMagnitude} CR required for ${type}).`
      );
      err.statusCode = 400;
      err.code = 'INSUFFICIENT_CREDITS';
      throw err;
    }

    const signedAmount = isDebit
      ? -Math.min(
          type === CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY ? balanceBefore : rawMagnitude,
          rawMagnitude
        )
      : rawMagnitude;

    const balanceAfter = Math.max(0, balanceBefore + signedAmount);
    team.credits = balanceAfter;

    // Update team credit statistics
    if (signedAmount > 0) {
      team.stats.creditsEarned = Number(team.stats.creditsEarned || 0) + signedAmount;
    } else if (type === CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY) {
      team.stats.penaltiesIncurred =
        Number(team.stats.penaltiesIncurred || 0) + Math.abs(signedAmount);
      team.stats.creditsSpent = Number(team.stats.creditsSpent || 0) + Math.abs(signedAmount);
    } else {
      team.stats.creditsSpent = Number(team.stats.creditsSpent || 0) + Math.abs(signedAmount);
    }

    const now = new Date();
    const resolvedSummary =
      summary ||
      `${type.replace(/_/g, ' ')} (${signedAmount >= 0 ? `+${signedAmount}` : signedAmount} CR)`;

    // Create persistent CreditTransaction document in MongoDB
    const txDoc = await CreditTransaction.create({
      teamId: team.teamId,
      type,
      amount: signedAmount,
      balanceAfter,
      relatedChallenge,
      relatedAbility,
      summary: resolvedSummary,
      timestamp: now,
    });

    // Mirror into team.stats.recentActivity for immediate dashboard snapshot
    const activityEntry = {
      eventId: txDoc._id.toString(),
      type,
      summary: resolvedSummary,
      creditsDelta: signedAmount,
      balanceAfter,
      relatedChallenge,
      relatedAbility,
      timestamp: now,
    };

    team.stats.recentActivity = [
      activityEntry,
      ...(team.stats.recentActivity || []).slice(0, 24),
    ];
    team.stats.lastActionAt = now;

    if (autoSaveTeam) {
      await team.save();
    }

    logger.info(
      'CREDITS',
      `[${team.teamId}] ${type} | Delta: ${
        signedAmount >= 0 ? `+${signedAmount}` : signedAmount
      } CR | Balance: ${balanceBefore} -> ${balanceAfter} CR`
    );

    return {
      transaction: txDoc.toObject(),
      balanceBefore,
      balanceAfter,
      delta: signedAmount,
      team,
    };
  }

  /**
   * Returns recorded credit transactions for a team ordered newest-first.
   */
  static async getTeamTransactions(rawTeamId, limit = 40) {
    const normalizedTeamId = String(rawTeamId || '')
      .trim()
      .toUpperCase();
    return CreditTransaction.find({ teamId: normalizedTeamId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
  }

  static getConfig() {
    return {
      startingCredits: creditsConfig.getStartingCredits(),
      hintCost: creditsConfig.getHintCost(),
      extraTimeCost: creditsConfig.getExtraTimeCost(),
      extraTimeMinutes: creditsConfig.getExtraTimeMinutes(),
      reattemptMultiplier: creditsConfig.getReattemptMultiplier(),
    };
  }
}

export default CreditService;
