import mongoose from 'mongoose';
import { Ability } from '../models/Ability.js';
import { CreditService } from './creditService.js';
import { CREDIT_TRANSACTION_TYPES } from '../config/creditsConfig.js';
import { logger } from '../utils/logger.js';

/**
 * PHASE 10 — CONFIGURABLE ABILITY DEFINITIONS
 * Based on the supplied NEXUS portal reference:
 * - Code Breaker
 * - Signal Mapper
 * - System Analyst
 * - Exploit Hunter
 *
 * IMPORTANT: Event documentation states ability mechanics are configurable/TBD.
 * These definitions do NOT hardcode final gameplay rules; they expose
 * extensible `effectType` and `effectConfig` properties.
 */
export const DEFAULT_ABILITY_CATALOG = [
  {
    abilityId: 'ABL-01',
    name: 'Code Breaker',
    code: 'CB-01',
    description:
      'Restricted NEXUS module registered for cryptographic & structural session analysis. Effect parameters are server-configurable via effectConfig.',
    cost: 150,
    enabled: true,
    effectType: 'CONFIGURABLE_DECRYPTION_MODULE',
    effectConfig: {
      classification: 'RESTRICTED // MODULE-01',
      scope: 'SESSION',
      cooldownSeconds: 30,
      maxActivationsPerSession: null,
      mechanicState: 'CONFIGURABLE_TBD',
      telemetryChannel: 'NEXUS_CRYPTO_BUS',
      parameters: {
        mode: 'STRUCTURAL_TRACE',
        intensity: 'STANDARD',
      },
    },
  },
  {
    abilityId: 'ABL-02',
    name: 'Signal Mapper',
    code: 'SM-02',
    description:
      'Restricted NEXUS module registered for sector & market telemetry mapping. Effect parameters are server-configurable via effectConfig.',
    cost: 120,
    enabled: true,
    effectType: 'CONFIGURABLE_SIGNAL_MODULE',
    effectConfig: {
      classification: 'RESTRICTED // MODULE-02',
      scope: 'MARKET',
      cooldownSeconds: 30,
      maxActivationsPerSession: null,
      mechanicState: 'CONFIGURABLE_TBD',
      telemetryChannel: 'NEXUS_SIGNAL_GRID',
      parameters: {
        mode: 'SECTOR_SWEEP',
        range: 'GLOBAL',
      },
    },
  },
  {
    abilityId: 'ABL-03',
    name: 'System Analyst',
    code: 'SA-03',
    description:
      'Restricted NEXUS module registered for system diagnostic and risk posture telemetry. Effect parameters are server-configurable via effectConfig.',
    cost: 100,
    enabled: true,
    effectType: 'CONFIGURABLE_ANALYST_MODULE',
    effectConfig: {
      classification: 'RESTRICTED // MODULE-03',
      scope: 'SYSTEM',
      cooldownSeconds: 25,
      maxActivationsPerSession: null,
      mechanicState: 'CONFIGURABLE_TBD',
      telemetryChannel: 'NEXUS_DIAGNOSTIC_CORE',
      parameters: {
        mode: 'SYSTEM_AUDIT',
        clearance: 'LEVEL_2',
      },
    },
  },
  {
    abilityId: 'ABL-04',
    name: 'Exploit Hunter',
    code: 'EH-04',
    description:
      'Restricted NEXUS module registered for high-priority execution vector scanning. Effect parameters are server-configurable via effectConfig.',
    cost: 200,
    enabled: true,
    effectType: 'CONFIGURABLE_EXPLOIT_MODULE',
    effectConfig: {
      classification: 'RESTRICTED // MODULE-04',
      scope: 'SESSION',
      cooldownSeconds: 40,
      maxActivationsPerSession: null,
      mechanicState: 'CONFIGURABLE_TBD',
      telemetryChannel: 'NEXUS_VECTOR_SCANNER',
      parameters: {
        mode: 'VECTOR_PROBE',
        priority: 'HIGH',
      },
    },
  },
];

/**
 * Extensible Effect Handler Registry
 * Allows future event configurations to plug in custom server-side handlers by `effectType`
 * without altering the core portal, team model, or credit ledger.
 */
const effectHandlerRegistry = new Map();

const defaultConfigurableEffectHandler = async ({ ability, team, payload = {} }) => {
  const now = new Date();
  const effectConfig = ability.effectConfig || {};
  const cooldownSeconds = Number(
    effectConfig.cooldownSeconds ?? ability.cooldownSeconds ?? 25
  );

  return {
    executed: true,
    effectType: ability.effectType || 'CONFIGURABLE_MODULE',
    effectConfig,
    scope: effectConfig.scope || 'SYSTEM',
    cooldownSeconds,
    activatedAt: now.toISOString(),
    targetChallengeId:
      payload?.challengeId ||
      team?.currentChallenge?.challengeId ||
      team?.activeAttempt?.challengeId ||
      null,
    directiveNote:
      'RESTRICTED MODULE ACTIVATED // Configurable effect hook executed on NEXUS Core.',
  };
};

let abilitiesSeeded = false;
let abilitiesSeedPromise = null;
let cachedAbilitiesCatalog = null;
let cachedAbilitiesCatalogExpiresAt = 0;

export const ensureDefaultAbilitiesSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;
  if (abilitiesSeeded) return;
  if (abilitiesSeedPromise) return abilitiesSeedPromise;

  abilitiesSeedPromise = (async () => {
    try {
      for (const def of DEFAULT_ABILITY_CATALOG) {
        await Ability.findOneAndUpdate(
          { abilityId: def.abilityId },
          {
            $setOnInsert: {
              abilityId: def.abilityId,
              name: def.name,
              code: def.code,
              description: def.description,
              cost: def.cost,
              enabled: def.enabled,
              effectType: def.effectType,
              effectConfig: def.effectConfig,
            },
          },
          { upsert: true, new: true }
        );
      }
      abilitiesSeeded = true;
    } catch (err) {
      logger.warn('SEED', `Ability catalog seed warning: ${err.message}`);
    } finally {
      abilitiesSeedPromise = null;
    }
  })();

  return abilitiesSeedPromise;
};

export class AbilityService {
  static invalidateCatalogCache() {
    cachedAbilitiesCatalog = null;
    cachedAbilitiesCatalogExpiresAt = 0;
  }

  /**
   * Register a custom server-side effect handler for a specific `effectType`.
   */
  static registerEffectHandler(effectType, handlerFn) {
    if (!effectType || typeof handlerFn !== 'function') return;
    effectHandlerRegistry.set(String(effectType).trim().toUpperCase(), handlerFn);
  }

  /**
   * List all configurable ability definitions from MongoDB (or fallback catalog).
   */
  static async listAbilities() {
    if (mongoose.connection.readyState !== 1) {
      return DEFAULT_ABILITY_CATALOG;
    }

    if (cachedAbilitiesCatalog && Date.now() < cachedAbilitiesCatalogExpiresAt) {
      return cachedAbilitiesCatalog;
    }

    await ensureDefaultAbilitiesSeeded();
    const docs = await Ability.find({}).sort({ abilityId: 1 }).lean();
    const resolved = docs.length > 0 ? docs : DEFAULT_ABILITY_CATALOG;
    cachedAbilitiesCatalog = resolved;
    cachedAbilitiesCatalogExpiresAt = Date.now() + 3000;
    return resolved;
  }

  /**
   * Build initial team ability slots from the configurable catalog.
   */
  static buildInitialTeamAbilitySlots(catalog = DEFAULT_ABILITY_CATALOG) {
    return (catalog || DEFAULT_ABILITY_CATALOG).map((def) => ({
      abilityId: def.abilityId,
      name: def.name,
      code: def.code || 'MOD-00',
      description: def.description,
      cost: Number(def.cost ?? 100),
      enabled: def.enabled !== false,
      effectType: def.effectType || 'CONFIGURABLE_MODULE',
      effectConfig: def.effectConfig || {},
      chargePercent: 100,
      status: def.enabled === false ? 'DISABLED' : 'AVAILABLE',
      cooldownSeconds: Number(def.effectConfig?.cooldownSeconds ?? 25),
      cooldownExpiresAt: null,
      activationsCount: 0,
      lastUsedAt: null,
      lastActivationPayload: null,
    }));
  }

  /**
   * Synchronize a team's embedded ability slots with the configurable catalog
   * and transition any expired COOLDOWN / ACTIVE states back to AVAILABLE.
   */
  static reconcileTeamAbilitiesState(team, catalog = DEFAULT_ABILITY_CATALOG) {
    if (!team) return false;
    let mutated = false;
    const now = new Date();
    const catalogMap = new Map(
      (catalog || DEFAULT_ABILITY_CATALOG).map((item) => [item.abilityId, item])
    );

    if (!Array.isArray(team.abilities) || team.abilities.length === 0) {
      team.abilities = AbilityService.buildInitialTeamAbilitySlots(catalog);
      return true;
    }

    for (const slot of team.abilities) {
      const def = catalogMap.get(slot.abilityId);
      if (def) {
        if (!slot.effectType || slot.effectType === 'CONFIGURABLE_MODULE') {
          slot.effectType = def.effectType;
          mutated = true;
        }
        if (!slot.effectConfig || Object.keys(slot.effectConfig).length === 0) {
          slot.effectConfig = def.effectConfig;
          mutated = true;
        }
        if (slot.enabled === undefined) {
          slot.enabled = def.enabled !== false;
          mutated = true;
        }
        if (!slot.cooldownSeconds) {
          slot.cooldownSeconds = Number(def.effectConfig?.cooldownSeconds ?? 25);
          mutated = true;
        }
        // Keep System Analyst aligned with the 100 CR configurable definition if legacy 250 CR was seeded
        if (slot.abilityId === 'ABL-03' && slot.cost === 250 && (slot.activationsCount || 0) === 0) {
          slot.cost = def.cost;
          slot.description = def.description;
          mutated = true;
        }
      }

      // Normalize legacy 'READY' status to 'AVAILABLE'
      if (slot.status === 'READY') {
        slot.status = slot.enabled === false ? 'DISABLED' : 'AVAILABLE';
        mutated = true;
      }

      if (slot.enabled === false && slot.status !== 'DISABLED') {
        slot.status = 'DISABLED';
        mutated = true;
      }

      // Check if cooldown has expired on the server
      if (
        (slot.status === 'COOLDOWN' || slot.status === 'ACTIVE') &&
        slot.cooldownExpiresAt &&
        now >= new Date(slot.cooldownExpiresAt)
      ) {
        slot.status = slot.enabled === false ? 'DISABLED' : 'AVAILABLE';
        slot.cooldownExpiresAt = null;
        slot.chargePercent = 100;
        mutated = true;
      }
    }

    return mutated;
  }

  /**
   * Server-authoritative Ability Activation.
   * - Validates ability existence, enabled flag, cooldown, and Resistance Credits
   * - Deducts cost via CreditService
   * - Invokes extensible effect handler registered for `ability.effectType`
   * - Updates ability slot status & active session telemetry
   */
  static async activateAbilityForTeam({ teamDoc, abilityId, payload = {} }) {
    if (!teamDoc) {
      const err = new Error('Team context is required to activate an ability.');
      err.statusCode = 400;
      throw err;
    }

    const normalizedAbilityId = String(abilityId || 'ABL-03')
      .trim()
      .toUpperCase();
    const lockKey = `${teamDoc.teamId}:${normalizedAbilityId}`;

    if (AbilityService._abilityLocks.has(lockKey)) {
      const err = new Error(
        `Simultaneous ability activation blocked: [${normalizedAbilityId}] is already being activated for your squad.`
      );
      err.statusCode = 409;
      err.code = 'ABILITY_ACTIVATION_IN_FLIGHT';
      throw err;
    }

    AbilityService._abilityLocks.add(lockKey);

    try {
      const catalog = await AbilityService.listAbilities();
      AbilityService.reconcileTeamAbilitiesState(teamDoc, catalog);

      const abilitySlot = (teamDoc.abilities || []).find(
        (a) => String(a.abilityId).toUpperCase() === normalizedAbilityId
      );

      if (!abilitySlot) {
        const err = new Error(`Ability module [${normalizedAbilityId}] is not registered.`);
        err.statusCode = 404;
        err.code = 'ABILITY_NOT_FOUND';
        throw err;
      }

      if (abilitySlot.enabled === false || abilitySlot.status === 'DISABLED') {
        const err = new Error(
          `Ability module [${abilitySlot.name}] is currently disabled by NEXUS Core.`
        );
        err.statusCode = 403;
        err.code = 'ABILITY_DISABLED';
        throw err;
      }

      const now = new Date();
      if (
        abilitySlot.cooldownExpiresAt &&
        now < new Date(abilitySlot.cooldownExpiresAt)
      ) {
        const remainingCooldownSec = Math.ceil(
          (new Date(abilitySlot.cooldownExpiresAt).getTime() - now.getTime()) / 1000
        );
        const err = new Error(
          `${abilitySlot.name} is recharging (${remainingCooldownSec}s cooldown remaining).`
        );
        err.statusCode = 409;
        err.code = 'ABILITY_ON_COOLDOWN';
        throw err;
      }

      const cost = Math.max(0, Number(abilitySlot.cost ?? 100));
      const relatedChallenge = teamDoc.currentChallenge
        ? {
            challengeId: teamDoc.currentChallenge.challengeId,
            title: teamDoc.currentChallenge.title,
            category: teamDoc.currentChallenge.category,
          }
        : null;

      // 1. Deduct Resistance Credits server-side (throws 400 INSUFFICIENT_CREDITS if balance < cost)
      const creditResult = await CreditService.recordTransaction({
        teamDoc,
        type: CREDIT_TRANSACTION_TYPES.ABILITY,
        amount: cost,
        relatedChallenge,
        relatedAbility: {
          abilityId: abilitySlot.abilityId,
          name: abilitySlot.name,
          code: abilitySlot.code,
          effectType: abilitySlot.effectType,
        },
        summary: `ABILITY ACTIVATED: ${abilitySlot.name.toUpperCase()} [${abilitySlot.code}] (-${cost} CR)`,
        autoSaveTeam: false,
      });

      // 2. Dispatch extensible effect handler
      const handlerKey = String(abilitySlot.effectType || '').toUpperCase();
      const handler =
        effectHandlerRegistry.get(handlerKey) || defaultConfigurableEffectHandler;
      const effectOutcome = await handler({
        ability: abilitySlot,
        team: teamDoc,
        payload,
      });

      const cooldownSeconds = Number(
        effectOutcome?.cooldownSeconds ??
          abilitySlot.effectConfig?.cooldownSeconds ??
          abilitySlot.cooldownSeconds ??
          25
      );
      const cooldownExpiresAt =
        cooldownSeconds > 0 ? new Date(now.getTime() + cooldownSeconds * 1000) : null;

      // 3. Update ability slot state
      abilitySlot.status = 'ACTIVE';
      abilitySlot.lastUsedAt = now;
      abilitySlot.cooldownSeconds = cooldownSeconds;
      abilitySlot.cooldownExpiresAt = cooldownExpiresAt;
      abilitySlot.activationsCount = Number(abilitySlot.activationsCount || 0) + 1;
      abilitySlot.chargePercent = Math.max(20, (abilitySlot.chargePercent || 100) - 20);
      abilitySlot.lastActivationPayload = effectOutcome;

      teamDoc.stats.abilitiesUsed = Number(teamDoc.stats.abilitiesUsed || 0) + 1;

      // 4. Attach activation record to activeAttempt if a session is in progress
      if (teamDoc.activeAttempt) {
        const existingActive = Array.isArray(teamDoc.activeAttempt.activeAbilities)
          ? teamDoc.activeAttempt.activeAbilities
          : [];
        teamDoc.activeAttempt.activeAbilities = [
          ...existingActive,
          {
            abilityId: abilitySlot.abilityId,
            name: abilitySlot.name,
            code: abilitySlot.code,
            cost,
            effectType: abilitySlot.effectType,
            effectConfig: abilitySlot.effectConfig,
            activatedAt: now.toISOString(),
          },
        ];
      }

      const abilityActivation = {
        activationId: `ACT-${Date.now().toString().slice(-6)}`,
        abilityId: abilitySlot.abilityId,
        name: abilitySlot.name,
        code: abilitySlot.code,
        cost,
        status: abilitySlot.status,
        enabled: abilitySlot.enabled,
        effectType: abilitySlot.effectType,
        effectConfig: abilitySlot.effectConfig,
        cooldownSeconds,
        cooldownExpiresAt: cooldownExpiresAt ? cooldownExpiresAt.toISOString() : null,
        activationsCount: abilitySlot.activationsCount,
        effectOutcome,
        relatedChallenge,
        timestamp: now.toISOString(),
      };

      return {
        creditResult,
        abilityActivation,
        abilitySlot,
      };
    } finally {
      AbilityService._abilityLocks.delete(lockKey);
    }
  }
}

AbilityService._abilityLocks = new Set();

export default AbilityService;
