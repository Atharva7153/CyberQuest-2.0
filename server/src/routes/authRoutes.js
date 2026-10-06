import { Router } from 'express';
import { loginTeam, getCurrentTeam } from '../controllers/authController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', loginTeam);
router.get('/me', protectTeamRoute, getCurrentTeam);

export default router;
