import { logger } from '../utils/logger.js';

/**
 * Phase 15 Canonical Rate Limit Policies
 * Protects: login, purchase, submission, hint, extra time, ability
 */
export const RATE_LIMIT_POLICIES = Object.freeze({
  LOGIN: {
    category: 'LOGIN',
    windowMs: 60 * 1000,
    maxRequests: 150,
    message: 'Too many authentication attempts. Please wait before trying again.',
  },
  PURCHASE: {
    category: 'PURCHASE',
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: 'Challenge purchase rate limit exceeded. Wait before acquiring another module.',
  },
  SUBMISSION: {
    category: 'SUBMISSION',
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: 'Solution submission rate limit exceeded. Wait before transmitting another payload.',
  },
  HINT: {
    category: 'HINT',
    windowMs: 60 * 1000,
    maxRequests: 20,
    message: 'Hint decryption rate limit exceeded. Wait before requesting another hint.',
  },
  EXTRA_TIME: {
    category: 'EXTRA_TIME',
    windowMs: 60 * 1000,
    maxRequests: 20,
    message: 'Extra time allocation rate limit exceeded. Wait before extending the timer again.',
  },
  ABILITY: {
    category: 'ABILITY',
    windowMs: 60 * 1000,
    maxRequests: 25,
    message: 'Ability activation rate limit exceeded. Wait before invoking another NEXUS ability.',
  },
});

// Map key -> { timestamps: number[] }
const rateBuckets = new Map();

export const resetRateLimitBuckets = () => {
  rateBuckets.clear();
};

/**
 * Resolve which canonical rate-limit policy applies to a dynamic team/credit action
 */
export const resolveActionRateLimitPolicy = (actionType = '', payload = {}) => {
  const normalized = String(actionType || '')
    .trim()
    .toUpperCase();
  const itemType = String(payload?.itemType || '')
    .trim()
    .toUpperCase();

  if (
    normalized === 'ACQUIRE_CHALLENGE' ||
    normalized === 'PURCHASE_CHALLENGE' ||
    normalized === 'REATTEMPT_CHALLENGE' ||
    normalized === 'CHALLENGE_PURCHASE' ||
    normalized === 'REATTEMPT'
  ) {
    return RATE_LIMIT_POLICIES.PURCHASE;
  }

  if (
    normalized === 'SUBMIT_CHALLENGE' ||
    normalized === 'SUBMIT_NEXUS_CORE' ||
    normalized === 'CHALLENGE_REWARD' ||
    normalized === 'FAILURE_PENALTY'
  ) {
    return RATE_LIMIT_POLICIES.SUBMISSION;
  }

  if (
    normalized === 'PURCHASE_EXTRA_TIME' ||
    normalized === 'EXTRA_TIME' ||
    (normalized === 'SPEND_CREDITS' && itemType === 'EXTRA_TIME')
  ) {
    return RATE_LIMIT_POLICIES.EXTRA_TIME;
  }

  if (
    normalized === 'PURCHASE_HINT' ||
    normalized === 'HINT' ||
    normalized === 'SPEND_CREDITS'
  ) {
    return RATE_LIMIT_POLICIES.HINT;
  }

  if (
    normalized === 'USE_ABILITY' ||
    normalized === 'ACTIVATE_ABILITY' ||
    normalized === 'ABILITY'
  ) {
    return RATE_LIMIT_POLICIES.ABILITY;
  }

  return null;
};

/**
 * Core sliding-window rate limiter check
 */
export const evaluateRateLimit = (policy, subjectKey) => {
  if (!policy) {
    return { allowed: true, remaining: 999, retryAfterSeconds: 0 };
  }

  const now = Date.now();
  const bucketKey = `${policy.category}:${subjectKey}`;
  const windowStart = now - policy.windowMs;

  const existing = rateBuckets.get(bucketKey) || [];
  const activeTimestamps = existing.filter((ts) => ts > windowStart);

  if (activeTimestamps.length >= policy.maxRequests) {
    const oldest = activeTimestamps[0] || now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + policy.windowMs - now) / 1000));
    rateBuckets.set(bucketKey, activeTimestamps);
    return {
      allowed: false,
      category: policy.category,
      limit: policy.maxRequests,
      remaining: 0,
      retryAfterSeconds,
      message: policy.message,
    };
  }

  activeTimestamps.push(now);
  rateBuckets.set(bucketKey, activeTimestamps);

  return {
    allowed: true,
    category: policy.category,
    limit: policy.maxRequests,
    remaining: Math.max(0, policy.maxRequests - activeTimestamps.length),
    retryAfterSeconds: 0,
  };
};

/**
 * Build Express middleware for a fixed rate-limit policy
 */
export const createRateLimitMiddleware = (policy) => {
  return (req, res, next) => {
    const subjectKey =
      req.team?.teamId ||
      req.admin?.operatorId ||
      req.body?.teamId ||
      req.body?.operatorId ||
      req.ip ||
      'ANON';

    const check = evaluateRateLimit(policy, String(subjectKey).toUpperCase());

    res.setHeader('X-RateLimit-Category', policy.category);
    res.setHeader('X-RateLimit-Limit', String(policy.maxRequests));
    res.setHeader('X-RateLimit-Remaining', String(check.remaining));

    if (!check.allowed) {
      res.setHeader('Retry-After', String(check.retryAfterSeconds));
      logger.warn(
        'RATE_LIMIT',
        `Blocked [${policy.category}] for [${subjectKey}] (Retry after ${check.retryAfterSeconds}s)`
      );
      return res.status(429).json({
        status: 'error',
        code: 'RATE_LIMIT_EXCEEDED',
        category: policy.category,
        retryAfterSeconds: check.retryAfterSeconds,
        message: check.message,
      });
    }

    return next();
  };
};

/**
 * Dynamic Express middleware for /api/team/action and /api/credits/transaction
 * Automatically protects purchase, submission, hint, extra time, and ability actions
 */
export const rateLimitDynamicAction = (req, res, next) => {
  const actionType = req.body?.actionType || req.body?.type || '';
  const payload = req.body?.payload || req.body || {};
  const policy = resolveActionRateLimitPolicy(actionType, payload);

  if (!policy) {
    return next();
  }

  return createRateLimitMiddleware(policy)(req, res, next);
};

/**
 * Socket.IO Rate Limit Enforcer for team:action and credits:transaction
 */
export const enforceSocketActionRateLimit = ({ socketId, teamId, actionType, payload }) => {
  const policy = resolveActionRateLimitPolicy(actionType, payload);
  if (!policy) return;

  const subjectKey = String(teamId || socketId || 'SOCKET-ANON').toUpperCase();
  const check = evaluateRateLimit(policy, subjectKey);

  if (!check.allowed) {
    const err = new Error(check.message);
    err.statusCode = 429;
    err.code = 'RATE_LIMIT_EXCEEDED';
    err.category = policy.category;
    err.retryAfterSeconds = check.retryAfterSeconds;
    throw err;
  }
};

export const rateLimitLogin = createRateLimitMiddleware(RATE_LIMIT_POLICIES.LOGIN);
export const rateLimitPurchase = createRateLimitMiddleware(RATE_LIMIT_POLICIES.PURCHASE);
export const rateLimitSubmission = createRateLimitMiddleware(RATE_LIMIT_POLICIES.SUBMISSION);
export const rateLimitHint = createRateLimitMiddleware(RATE_LIMIT_POLICIES.HINT);
export const rateLimitExtraTime = createRateLimitMiddleware(RATE_LIMIT_POLICIES.EXTRA_TIME);
export const rateLimitAbility = createRateLimitMiddleware(RATE_LIMIT_POLICIES.ABILITY);
