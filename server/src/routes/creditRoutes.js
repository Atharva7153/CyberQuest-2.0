import { Router } from 'express';
import { getCreditHistory, postCreditTransaction } from '../controllers/creditController.js';
import { protectTeamRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/history', protectTeamRoute, getCreditHistory);
router.post('/transaction', protectTeamRoute, postCreditTransaction);

export default router;
