import { Router } from 'express';
import { protectAdminRoute } from '../middleware/authMiddleware.js';
import { rateLimitLogin } from '../middleware/rateLimitMiddleware.js';
import {
  loginAdminOperator,
  getAdminOperatorsHint,
  getAdminControlState,
  getAdminAuditLogs,
  executeAdminTeamAction,
  upsertAdminChallenge,
  patchAdminChallenge,
  executeAdminEventControl,
  updateAdminSettings,
} from '../controllers/adminController.js';

const adminRouter = Router();

// Public Admin/Volunteer Authentication (protected by rateLimitLogin) & Demo Operator Hint
adminRouter.post('/login', rateLimitLogin, loginAdminOperator);
adminRouter.get('/operators', getAdminOperatorsHint);

// Protected Admin/Volunteer Control Endpoints
adminRouter.get('/state', protectAdminRoute, getAdminControlState);
adminRouter.get('/audit', protectAdminRoute, getAdminAuditLogs);
adminRouter.post('/teams/action', protectAdminRoute, executeAdminTeamAction);
adminRouter.post('/challenges', protectAdminRoute, upsertAdminChallenge);
adminRouter.patch('/challenges/:challengeId', protectAdminRoute, patchAdminChallenge);
adminRouter.post('/events/control', protectAdminRoute, executeAdminEventControl);
adminRouter.post('/settings', protectAdminRoute, updateAdminSettings);

export default adminRouter;
