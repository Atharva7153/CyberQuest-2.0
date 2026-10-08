import { Router } from 'express';
import {
  getChallengeMarket,
  getChallengeById,
  getChallengeSession,
  acquireChallenge,
  submitChallengeSession,
  abandonChallengeSession,
} from '../controllers/challengeController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';
import {
  rateLimitPurchase,
  rateLimitSubmission,
} from '../middleware/rateLimitMiddleware.js';

const router = Router();

router.get('/', getChallengeMarket);
router.post('/acquire', protectTeamRoute, rateLimitPurchase, acquireChallenge);
router.post('/session/submit', protectTeamRoute, rateLimitSubmission, submitChallengeSession);
router.post('/session/abandon', protectTeamRoute, abandonChallengeSession);
router.get('/:challengeId/session', protectTeamRoute, getChallengeSession);
router.get('/:challengeId', getChallengeById);
router.post('/:challengeId/acquire', protectTeamRoute, rateLimitPurchase, acquireChallenge);
router.post('/:challengeId/submit', protectTeamRoute, rateLimitSubmission, submitChallengeSession);
router.post('/:challengeId/abandon', protectTeamRoute, abandonChallengeSession);

export default router;
