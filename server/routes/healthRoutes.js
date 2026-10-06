import { Router } from 'express';
import { getHealthStatus, postDiagnosticPing } from '../controllers/healthController.js';

const router = Router();

router.get('/', getHealthStatus);
router.post('/ping', postDiagnosticPing);

export default router;
