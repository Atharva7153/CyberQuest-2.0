import { Router } from 'express';
import {
  getCurrentTeam,
  getTeamProgress,
  getTeamHistory,
  getTeamNexusCore,
  postTeamAction,
} from '../controllers/authController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';
import { rateLimitDynamicAction } from '../middleware/rateLimitMiddleware.js';

const router = Router();

router.get('/state', protectTeamRoute, getCurrentTeam);
router.get('/progress', protectTeamRoute, getTeamProgress);
router.get('/history', protectTeamRoute, getTeamHistory);
router.get('/core', protectTeamRoute, getTeamNexusCore);
router.post('/action', protectTeamRoute, rateLimitDynamicAction, postTeamAction);

export default router;
