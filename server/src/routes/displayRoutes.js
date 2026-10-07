import { Router } from 'express';
import { DisplayService } from '../services/displayService.js';

const router = Router();

/**
 * GET /api/display
 * Public sanitized telemetry snapshot for the Live Event Projector Mode (/display).
 * Strictly excludes private submissions, challenge answers, and private team data.
 */
router.get('/', async (req, res, next) => {
  try {
    const snapshot = await DisplayService.getProjectorDisplaySnapshot();
    res.status(200).json(snapshot);
  } catch (err) {
    next(err);
  }
});

export default router;
