import { Router } from 'express';
import { getHealthStatus, postDiagnosticPing, getPingPong } from '../controllers/healthController.js';

const router = Router();

router.get('/', getHealthStatus);
router.get('/ping', getPingPong);
router.post('/ping', postDiagnosticPing);

export default router;
