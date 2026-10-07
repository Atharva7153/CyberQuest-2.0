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

const router = Router();

router.get('/', getChallengeMarket);
router.post('/acquire', protectTeamRoute, acquireChallenge);
router.post('/session/submit', protectTeamRoute, submitChallengeSession);
router.post('/session/abandon', protectTeamRoute, abandonChallengeSession);
router.get('/:challengeId/session', protectTeamRoute, getChallengeSession);
router.get('/:challengeId', getChallengeById);
router.post('/:challengeId/acquire', protectTeamRoute, acquireChallenge);
router.post('/:challengeId/submit', protectTeamRoute, submitChallengeSession);
router.post('/:challengeId/abandon', protectTeamRoute, abandonChallengeSession);

export default router;
