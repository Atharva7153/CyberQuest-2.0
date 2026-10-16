import mongoose from 'mongoose';
import { NexusCoreConfig, NEXUS_CORE_STATES } from '../models/NexusCoreConfig.js';
import { CreditService } from './creditService.js';
import { CREDIT_TRANSACTION_TYPES } from '../config/creditsConfig.js';
import { logger } from '../utils/logger.js';

export const DEFAULT_NEXUS_CORE_DEFINITION = {
  coreId: 'NEXUS-CORE-PRIME',
  title: 'THE NEXUS CORE',
  designation: 'CLASSROOM QR CODE HUNT // FINAL OBJECTIVE',
  classification: 'PHYSICAL SEARCH // 50 QR CODES',
  description:
    '50 QR codes are hidden across the classroom. Scan the QR codes to find the secret answer, then enter the answer below to solve the NEXUS Core!',
  enabled: true,
  globalOverrideState: null,
  unlockConfig: {
    requiredConvergencePercent: 100,
    minChallengesCompleted: 3,
    entryCost: 0,
    completionReward: 1500,
  },
  gameType: 'qrAnswerOnly',
  gameConfig: {
    sector: 'SECTOR-00 // CLASSROOM QR HUNT',
    artworkKey: 'CORE_BRIDGE',
    secondaryArtworkKey: 'MONOLITH_GATE',
    clearanceCode: 'QR-HUNT-50',
    prompt:
      '50 QR codes have been placed around the classroom. Scan them to find the secret answer and type it directly into the box below — no code required.',
    telemetryNodes: [],
    inputPlaceholder: 'TYPE THE QR CODE ANSWER HERE...',
  },
  solutionConfig: {
    expectedAnswer: 'NEXUS-OMEGA',
    acceptedAnswers: [
      'NEXUS-OMEGA',
      'NEXUS_OMEGA',
      'NEXUS OMEGA',
      'OMEGA',
      'NEXUS{NEXUS-OMEGA}',
      'NEXUS{OMEGA}',
    ],
  },
  winner: null,
  completedTeams: [],
};

let nexusCoreSeeded = false;
let nexusCoreSeedPromise = null;
let cachedPublicCoreDoc = null;
let cachedPublicCoreExpiresAt = 0;

export const ensureNexusCoreSeeded = async () => {
  if (mongoose.connection.readyState !== 1) {
    return DEFAULT_NEXUS_CORE_DEFINITION;
  }
  if (nexusCoreSeeded) return;
  if (nexusCoreSeedPromise) return nexusCoreSeedPromise;

  nexusCoreSeedPromise = (async () => {
    try {
      let doc = await NexusCoreConfig.findOne({ coreId: 'NEXUS-CORE-PRIME' });
      if (!doc) {
        doc = await NexusCoreConfig.create(DEFAULT_NEXUS_CORE_DEFINITION);
        logger.info('SEED', 'Seeded configurable NEXUS Core objective [NEXUS-CORE-PRIME]');
      } else if (
        Array.isArray(doc.gameConfig?.telemetryNodes) &&
        doc.gameConfig.telemetryNodes.length > 0
      ) {
        doc.designation = DEFAULT_NEXUS_CORE_DEFINITION.designation;
        doc.classification = DEFAULT_NEXUS_CORE_DEFINITION.classification;
        doc.description = DEFAULT_NEXUS_CORE_DEFINITION.description;
        doc.gameType = DEFAULT_NEXUS_CORE_DEFINITION.gameType;
        doc.gameConfig = {
          ...(doc.gameConfig || {}),
          ...DEFAULT_NEXUS_CORE_DEFINITION.gameConfig,
          telemetryNodes: [],
        };
        doc.markModified('gameConfig');
        await doc.save();
      }
      nexusCoreSeeded = true;
      return doc;
    } catch (err) {
      logger.warn('SEED', `NexusCore seed warning: ${err.message}`);
      return DEFAULT_NEXUS_CORE_DEFINITION;
    } finally {
      nexusCoreSeedPromise = null;
    }
  })();

  return nexusCoreSeedPromise;
};

export class NexusCoreService {
  static invalidateCoreCache() {
    cachedPublicCoreDoc = null;
    cachedPublicCoreExpiresAt = 0;
  }

  static async getCoreConfigDoc({ includeSolution = false } = {}) {
    await ensureNexusCoreSeeded();
    if (!includeSolution && cachedPublicCoreDoc && Date.now() < cachedPublicCoreExpiresAt) {
      return cachedPublicCoreDoc;
    }
    if (mongoose.connection.readyState === 1) {
      const q = NexusCoreConfig.findOne({ coreId: 'NEXUS-CORE-PRIME' });
      if (includeSolution) q.select('+solutionConfig');
      const doc = await q;
      if (doc) {
        if (!includeSolution) {
          cachedPublicCoreDoc = doc;
          cachedPublicCoreExpiresAt = Date.now() + 2000;
        }
        return doc;
      }
    }
    return {
      ...DEFAULT_NEXUS_CORE_DEFINITION,
      toPublicJSON() {
        const { solutionConfig, ...rest } = this;
        return rest;
      },
    };
  }

  /**
   * Determine authoritative Core state (LOCKED | AVAILABLE | ACTIVE | COMPLETED) for a team
   */
  static computeAuthoritativeState(team, coreDoc) {
    const teamCoreState = team?.nexusCore?.state;
    if (teamCoreState === NEXUS_CORE_STATES.COMPLETED) {
      return NEXUS_CORE_STATES.COMPLETED;
    }
    if (teamCoreState === NEXUS_CORE_STATES.ACTIVE) {
      return NEXUS_CORE_STATES.ACTIVE;
    }
    if (coreDoc?.globalOverrideState && Object.values(NEXUS_CORE_STATES).includes(coreDoc.globalOverrideState)) {
      return coreDoc.globalOverrideState;
    }
    if (teamCoreState === NEXUS_CORE_STATES.AVAILABLE) {
      return NEXUS_CORE_STATES.AVAILABLE;
    }

    const reqConvergence = Number(coreDoc?.unlockConfig?.requiredConvergencePercent ?? 100);
    const minSolved = Number(coreDoc?.unlockConfig?.minChallengesCompleted ?? 3);
    const currentConvergence = Number(team?.stats?.coreProgressPercent ?? 0);
    const currentSolved = Math.max(
      Number(team?.stats?.totalSolved ?? 0),
      (team?.completedChallenges || []).length
    );

    if (currentConvergence >= reqConvergence || currentSolved >= minSolved) {
      return NEXUS_CORE_STATES.AVAILABLE;
    }

    return NEXUS_CORE_STATES.LOCKED;
  }

  /**
   * Build the full public NEXUS Core telemetry payload for a team
   */
  static async getNexusCoreStatusForTeam(team) {
    const coreDoc = await this.getCoreConfigDoc({ includeSolution: false });
    const publicCore =
      typeof coreDoc.toPublicJSON === 'function' ? coreDoc.toPublicJSON() : coreDoc;
    const state = this.computeAuthoritativeState(team, publicCore);

    const currentConvergence =
      state === NEXUS_CORE_STATES.LOCKED
        ? Number(team?.stats?.coreProgressPercent ?? 25)
        : 100;
    const currentSolved = Math.max(
      Number(team?.stats?.totalSolved ?? 0),
      (team?.completedChallenges || []).length
    );

    return {
      coreId: publicCore.coreId,
      title: publicCore.title,
      designation: publicCore.designation,
      classification: publicCore.classification,
      description: publicCore.description,
      enabled: publicCore.enabled !== false,
      state,
      unlockConfig: publicCore.unlockConfig || DEFAULT_NEXUS_CORE_DEFINITION.unlockConfig,
      gameType: publicCore.gameType || 'systemProblem',
      gameConfig: publicCore.gameConfig || DEFAULT_NEXUS_CORE_DEFINITION.gameConfig,
      convergencePercent: Math.min(100, Math.max(0, currentConvergence)),
      challengesSolved: currentSolved,
      teamCoreRecord: team?.nexusCore || {
        state,
        unlockedAt: null,
        activatedAt: null,
        completedAt: null,
        attemptsCount: 0,
        completionRank: null,
        proclamationCode: null,
      },
      winner: publicCore.winner || null,
      completedTeams: publicCore.completedTeams || [],
      updatedAt: publicCore.updatedAt || new Date().toISOString(),
    };
  }

  /**
   * Check if a team's progress has newly unlocked the NEXUS Core (LOCKED -> AVAILABLE).
   */
  static async reconcileCoreAvailabilityForTeam(teamDoc) {
    if (!teamDoc) return { newlyAvailable: false, nexusCore: null };

    const coreDoc = await this.getCoreConfigDoc({ includeSolution: false });
    const previousState = teamDoc.nexusCore?.state || NEXUS_CORE_STATES.LOCKED;
    const computedState = this.computeAuthoritativeState(teamDoc, coreDoc);

    let newlyAvailable = false;
    if (
      previousState === NEXUS_CORE_STATES.LOCKED &&
      computedState === NEXUS_CORE_STATES.AVAILABLE
    ) {
      teamDoc.nexusCore = {
        ...(teamDoc.nexusCore?.toObject ? teamDoc.nexusCore.toObject() : teamDoc.nexusCore || {}),
        state: NEXUS_CORE_STATES.AVAILABLE,
        unlockedAt: new Date(),
      };
      teamDoc.status = 'CORE_UNLOCKED';
      if (teamDoc.stats) {
        teamDoc.stats.coreProgressPercent = 100;
      }
      if (typeof teamDoc.markModified === 'function') {
        teamDoc.markModified('nexusCore');
        teamDoc.markModified('stats');
      }
      await teamDoc.save();
      newlyAvailable = true;
    }

    const nexusCore = await this.getNexusCoreStatusForTeam(teamDoc);
    return { newlyAvailable, nexusCore };
  }

  /**
   * Authoritatively unlock the NEXUS Core for a team (LOCKED -> AVAILABLE)
   * and trigger the Socket.IO Core availability broadcast.
   */
  static async unlockCoreForTeam(teamDoc) {
    if (!teamDoc) {
      const err = new Error('Authenticated team is required.');
      err.statusCode = 404;
      throw err;
    }

    teamDoc.nexusCore = {
      ...(teamDoc.nexusCore?.toObject ? teamDoc.nexusCore.toObject() : teamDoc.nexusCore || {}),
      state: NEXUS_CORE_STATES.AVAILABLE,
      unlockedAt: new Date(),
    };
    teamDoc.status = 'CORE_UNLOCKED';
    if (teamDoc.stats) {
      teamDoc.stats.coreProgressPercent = 100;
      teamDoc.stats.lastActionAt = new Date();
    }

    if (typeof teamDoc.markModified === 'function') {
      teamDoc.markModified('nexusCore');
      teamDoc.markModified('stats');
    }

    await teamDoc.save();
    const nexusCore = await this.getNexusCoreStatusForTeam(teamDoc);

    return {
      newlyAvailable: true,
      nexusCore,
    };
  }

  /**
   * Authoritatively transition NEXUS Core from AVAILABLE -> ACTIVE for a team.
   */
  static async activateCoreForTeam(teamDoc) {
    if (!teamDoc) {
      const err = new Error('Authenticated team is required.');
      err.statusCode = 404;
      throw err;
    }

    const coreDoc = await this.getCoreConfigDoc({ includeSolution: false });
    const currentState = this.computeAuthoritativeState(teamDoc, coreDoc);

    if (currentState === NEXUS_CORE_STATES.LOCKED) {
      const err = new Error(
        'NEXUS Core is currently LOCKED. Reach 100% Core Convergence or unlock the Core threshold first.'
      );
      err.statusCode = 409;
      err.code = 'CORE_LOCKED';
      throw err;
    }

    if (currentState === NEXUS_CORE_STATES.COMPLETED) {
      const err = new Error('NEXUS Core objective has already been COMPLETED by your squad.');
      err.statusCode = 409;
      err.code = 'CORE_ALREADY_COMPLETED';
      throw err;
    }

    teamDoc.nexusCore = {
      ...(teamDoc.nexusCore?.toObject ? teamDoc.nexusCore.toObject() : teamDoc.nexusCore || {}),
      state: NEXUS_CORE_STATES.ACTIVE,
      unlockedAt: teamDoc.nexusCore?.unlockedAt || new Date(),
      activatedAt: new Date(),
    };

    if (typeof teamDoc.markModified === 'function') {
      teamDoc.markModified('nexusCore');
    }

    await teamDoc.save();
    const nexusCore = await this.getNexusCoreStatusForTeam(teamDoc);

    return {
      nexusCore,
    };
  }

  /**
   * Authoritatively evaluate a team's submission for the configurable NEXUS Core objective.
   * On success:
   * - Transitions state to COMPLETED
   * - Awards completionReward credits
   * - Records Winner & completedTeams infrastructure
   */
  static async submitCoreObjectiveForTeam({ teamDoc, submission, simulateFailure = false }) {
    const coreDoc = await this.getCoreConfigDoc({ includeSolution: true });
    const currentState = this.computeAuthoritativeState(teamDoc, coreDoc);

    if (currentState === NEXUS_CORE_STATES.LOCKED) {
      const err = new Error('NEXUS Core is LOCKED and cannot accept override submissions.');
      err.statusCode = 409;
      err.code = 'CORE_LOCKED';
      throw err;
    }

    if (currentState === NEXUS_CORE_STATES.COMPLETED) {
      const err = new Error('NEXUS Core has already been COMPLETED by your team.');
      err.statusCode = 409;
      err.code = 'CORE_ALREADY_COMPLETED';
      throw err;
    }

    const rawCandidate =
      typeof submission === 'object' && submission !== null
        ? String(
            submission.answer ??
              submission.solution ??
              submission.word ??
              submission.code ??
              ''
          ).trim()
        : String(submission ?? '').trim();

    const normalizedCandidate = rawCandidate.toUpperCase();
    const cleanCandidate = normalizedCandidate.replace(/[-_\s]/g, '');
    const solutionCfg =
      coreDoc.solutionConfig || DEFAULT_NEXUS_CORE_DEFINITION.solutionConfig;
    const acceptedList = (
      solutionCfg.acceptedAnswers || [solutionCfg.expectedAnswer || 'NEXUS-OMEGA']
    ).map((a) => String(a).trim().toUpperCase());

    const passed =
      !simulateFailure &&
      (acceptedList.includes(normalizedCandidate) ||
        acceptedList.some((a) => {
          const cleanA = a.replace(/[-_\s]/g, '');
          return (
            cleanA === cleanCandidate ||
            `NEXUS{${cleanA}}` === cleanCandidate ||
            `FLAG{${cleanA}}` === cleanCandidate
          );
        }));
    const attemptsCount = Number(teamDoc.nexusCore?.attemptsCount || 0) + 1;

    if (!passed) {
      teamDoc.nexusCore = {
        ...(teamDoc.nexusCore?.toObject ? teamDoc.nexusCore.toObject() : teamDoc.nexusCore || {}),
        state: NEXUS_CORE_STATES.ACTIVE,
        attemptsCount,
      };
      if (typeof teamDoc.markModified === 'function') {
        teamDoc.markModified('nexusCore');
      }
      await teamDoc.save();

      const nexusCore = await this.getNexusCoreStatusForTeam(teamDoc);
      return {
        passed: false,
        creditResult: null,
        nexusCore,
        coreEvaluation: {
          status: 'FAILED',
          passed: false,
          coreId: coreDoc.coreId,
          title: coreDoc.title,
          creditsDelta: 0,
          balanceAfter: teamDoc.credits,
          message:
            'INCORRECT ANSWER // That answer does not match the NEXUS Core solution. Keep scanning the classroom QR codes and try again.',
          timestamp: new Date().toISOString(),
        },
      };
    }

    // PASSED -> Complete NEXUS Core Objective & Record Winner Infrastructure
    const rewardAmount = Number(
      coreDoc.unlockConfig?.completionReward ??
        DEFAULT_NEXUS_CORE_DEFINITION.unlockConfig.completionReward
    );

    const creditResult = await CreditService.recordTransaction({
      teamDoc,
      type: CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD,
      amount: rewardAmount,
      relatedChallenge: {
        challengeId: coreDoc.coreId || 'NEXUS-CORE-PRIME',
        title: coreDoc.title || 'THE NEXUS CORE',
        category: 'TECHNICAL',
      },
      summary: `NEXUS CORE SOLVED: ${coreDoc.title} (+${rewardAmount} CR)`,
      autoSaveTeam: false,
    });

    const completedAt = new Date();
    const proclamationCode = `NX-CORE-${teamDoc.teamId}-${completedAt
      .getTime()
      .toString(36)
      .toUpperCase()}`;

    // Record team in completedTeams for bonus points tracking (do NOT declare event winner)
    let completionRank = 1;
    const isFirstWinner = false;

    if (typeof coreDoc.save === 'function') {
      const existingCompleted = Array.isArray(coreDoc.completedTeams)
        ? coreDoc.completedTeams
        : [];
      const alreadyListed = existingCompleted.find((t) => t.teamId === teamDoc.teamId);

      if (!alreadyListed) {
        completionRank = existingCompleted.length + 1;
        const completedEntry = {
          rank: completionRank,
          teamId: teamDoc.teamId,
          teamName: teamDoc.teamName,
          members: (teamDoc.members || []).map((m) => ({
            memberId: m.memberId,
            name: m.name,
            role: m.role,
          })),
          completedAt,
          finalCredits: teamDoc.credits,
          rewardAwarded: rewardAmount,
          totalSolved: Number(teamDoc.stats?.totalSolved || 0) + 1,
          riskProfile: teamDoc.stats?.riskProfile || 'BALANCED',
          proclamationCode,
        };

        coreDoc.completedTeams.push(completedEntry);
        coreDoc.winner = null;
        coreDoc.markModified('completedTeams');
        coreDoc.markModified('winner');
        await coreDoc.save();
        this.invalidateCoreCache();
      } else {
        completionRank = alreadyListed.rank || 1;
      }
    }

    teamDoc.nexusCore = {
      ...(teamDoc.nexusCore?.toObject ? teamDoc.nexusCore.toObject() : teamDoc.nexusCore || {}),
      state: NEXUS_CORE_STATES.COMPLETED,
      unlockedAt: teamDoc.nexusCore?.unlockedAt || completedAt,
      activatedAt: teamDoc.nexusCore?.activatedAt || completedAt,
      completedAt,
      attemptsCount,
      completionRank,
      proclamationCode,
    };

    if (teamDoc.stats) {
      teamDoc.stats.totalSolved = Number(teamDoc.stats.totalSolved || 0) + 1;
      teamDoc.stats.coreProgressPercent = 100;
      teamDoc.stats.lastActionAt = completedAt;
    }

    if (typeof teamDoc.markModified === 'function') {
      teamDoc.markModified('nexusCore');
      teamDoc.markModified('stats');
    }

    await teamDoc.save();
    this.invalidateCoreCache();
    const nexusCore = await this.getNexusCoreStatusForTeam(teamDoc);

    return {
      passed: true,
      isFirstWinner,
      creditResult,
      nexusCore,
      coreEvaluation: {
        status: 'COMPLETED',
        passed: true,
        coreId: coreDoc.coreId,
        title: coreDoc.title,
        completionRank,
        proclamationCode,
        creditsDelta: rewardAmount,
        balanceAfter: teamDoc.credits,
        winner: null,
        message: `NEXUS CORE SOLVED // +${rewardAmount} CR AWARDED TO SQUAD [${teamDoc.teamName}]!`,
        timestamp: completedAt.toISOString(),
      },
    };
  }

  /**
   * Update configurable NEXUS Core parameters without hardcoding rules.
   */
  static async updateCoreConfig(updates = {}) {
    const coreDoc = await this.getCoreConfigDoc({ includeSolution: true });
    if (typeof coreDoc.save !== 'function') {
      return coreDoc;
    }

    if (updates.title !== undefined) coreDoc.title = String(updates.title);
    if (updates.designation !== undefined) coreDoc.designation = String(updates.designation);
    if (updates.description !== undefined) coreDoc.description = String(updates.description);
    if (updates.gameType !== undefined) coreDoc.gameType = String(updates.gameType);
    if (updates.globalOverrideState !== undefined) {
      coreDoc.globalOverrideState = updates.globalOverrideState;
    }
    if (updates.unlockConfig && typeof updates.unlockConfig === 'object') {
      coreDoc.unlockConfig = {
        ...(coreDoc.unlockConfig?.toObject
          ? coreDoc.unlockConfig.toObject()
          : coreDoc.unlockConfig || {}),
        ...updates.unlockConfig,
      };
      coreDoc.markModified('unlockConfig');
    }
    if (updates.gameConfig && typeof updates.gameConfig === 'object') {
      coreDoc.gameConfig = {
        ...(coreDoc.gameConfig || {}),
        ...updates.gameConfig,
      };
      coreDoc.markModified('gameConfig');
    }
    if (updates.solutionConfig && typeof updates.solutionConfig === 'object') {
      coreDoc.solutionConfig = {
        ...(coreDoc.solutionConfig || {}),
        ...updates.solutionConfig,
      };
      coreDoc.markModified('solutionConfig');
    }

    await coreDoc.save();
    this.invalidateCoreCache();
    return coreDoc.toPublicJSON();
  }

  /**
   * Reset global NEXUS Core winner & completedTeams for demo/testing resets.
   */
  static async resetNexusCoreDemoState() {
    this.invalidateCoreCache();
    if (mongoose.connection.readyState !== 1) return;
    await NexusCoreConfig.findOneAndUpdate(
      { coreId: 'NEXUS-CORE-PRIME' },
      {
        $set: {
          globalOverrideState: null,
          winner: null,
          completedTeams: [],
        },
      }
    ).catch(() => {});
  }
}
