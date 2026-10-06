import { Router } from 'express';
import { getCurrentTeam, postTeamAction } from '../controllers/authController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/state', protectTeamRoute, getCurrentTeam);
router.post('/action', protectTeamRoute, postTeamAction);

export default router;
