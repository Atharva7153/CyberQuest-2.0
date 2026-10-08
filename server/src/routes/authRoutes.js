import { Router } from 'express';
import { loginTeam, getCurrentTeam } from '../controllers/authController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';
import { rateLimitLogin } from '../middleware/rateLimitMiddleware.js';

const router = Router();

router.post('/login', rateLimitLogin, loginTeam);
router.get('/me', protectTeamRoute, getCurrentTeam);

export default router;
