import { Router } from 'express';
import { loginTeam, getCurrentTeam, getTeamRosterPublic } from '../controllers/authController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';
import { rateLimitLogin } from '../middleware/rateLimitMiddleware.js';

const router = Router();

router.get('/team-roster/:teamId', getTeamRosterPublic);
router.post('/login', rateLimitLogin, loginTeam);
router.get('/me', protectTeamRoute, getCurrentTeam);

export default router;
