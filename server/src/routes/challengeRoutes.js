import { Router } from 'express';
import {
  getChallengeMarket,
  getChallengeById,
  acquireChallenge,
  submitChallengeSession,
} from '../controllers/challengeController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getChallengeMarket);
router.post('/acquire', protectTeamRoute, acquireChallenge);
router.post('/session/submit', protectTeamRoute, submitChallengeSession);
router.get('/:challengeId', getChallengeById);
router.post('/:challengeId/acquire', protectTeamRoute, acquireChallenge);
router.post('/:challengeId/submit', protectTeamRoute, submitChallengeSession);

export default router;
