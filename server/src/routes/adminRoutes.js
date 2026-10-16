import { Router } from 'express';
import { protectAdminRoute, requireAdminOnly } from '../middleware/authMiddleware.js';
import { rateLimitLogin } from '../middleware/rateLimitMiddleware.js';
import {
  loginAdminOperator,
  getAdminOperatorsHint,
  getAdminControlState,
  getAdminAuditLogs,
  registerAdminTeam,
  executeAdminTeamAction,
  upsertAdminChallenge,
  patchAdminChallenge,
  executeAdminEventControl,
  updateAdminSettings,
  controlAdminRecording,
  getAdminRecordingReport,
  createAdminVolunteer,
  deleteAdminVolunteer,
  resetAllTeamPasswords,
} from '../controllers/adminController.js';

const adminRouter = Router();

// Public Admin/Volunteer Authentication (protected by rateLimitLogin) & Demo Operator Hint
adminRouter.post('/login', rateLimitLogin, loginAdminOperator);
adminRouter.get('/operators', getAdminOperatorsHint);

// Read-only state endpoint accessible to both ADMIN and VOLUNTEER roles
adminRouter.get('/state', protectAdminRoute, getAdminControlState);

// Admin-Only Control & Mutation Endpoints (Volunteers blocked by requireAdminOnly)
adminRouter.get('/audit', protectAdminRoute, requireAdminOnly, getAdminAuditLogs);
adminRouter.post('/volunteers', protectAdminRoute, requireAdminOnly, createAdminVolunteer);
adminRouter.delete(
  '/volunteers/:operatorId',
  protectAdminRoute,
  requireAdminOnly,
  deleteAdminVolunteer
);
adminRouter.post('/teams/register', protectAdminRoute, requireAdminOnly, registerAdminTeam);
adminRouter.post('/teams/action', protectAdminRoute, requireAdminOnly, executeAdminTeamAction);
adminRouter.post('/teams/reset-all-passwords', protectAdminRoute, requireAdminOnly, resetAllTeamPasswords);
adminRouter.post('/challenges', protectAdminRoute, requireAdminOnly, upsertAdminChallenge);
adminRouter.patch(
  '/challenges/:challengeId',
  protectAdminRoute,
  requireAdminOnly,
  patchAdminChallenge
);
adminRouter.post('/events/control', protectAdminRoute, requireAdminOnly, executeAdminEventControl);
adminRouter.post('/settings', protectAdminRoute, requireAdminOnly, updateAdminSettings);
adminRouter.post('/recording', protectAdminRoute, requireAdminOnly, controlAdminRecording);
adminRouter.get('/recording', protectAdminRoute, requireAdminOnly, getAdminRecordingReport);
adminRouter.get(
  '/recording/:recordingId',
  protectAdminRoute,
  requireAdminOnly,
  getAdminRecordingReport
);

export default adminRouter;
