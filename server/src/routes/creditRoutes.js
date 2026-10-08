import { Router } from 'express';
import { getCreditHistory, postCreditTransaction } from '../controllers/creditController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';
import { rateLimitDynamicAction } from '../middleware/rateLimitMiddleware.js';

const router = Router();

router.get('/history', protectTeamRoute, getCreditHistory);
router.post('/transaction', protectTeamRoute, rateLimitDynamicAction, postCreditTransaction);

export default router;
