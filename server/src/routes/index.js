import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import teamRoutes from './teamRoutes.js';
import creditRoutes from './creditRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import displayRoutes from './displayRoutes.js';
import adminRoutes from './adminRoutes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/team', teamRoutes);
apiRouter.use('/credits', creditRoutes);
apiRouter.use('/challenges', challengeRoutes);
apiRouter.use('/display', displayRoutes);
apiRouter.use('/admin', adminRoutes);

export default apiRouter;
