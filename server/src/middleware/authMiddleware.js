import { verifyTeamToken, verifyAdminToken } from '../utils/jwt.js';
import { Team } from '../models/Team.js';

export const protectTeamRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        code: 'UNAUTHORIZED_TERMINAL',
        message: 'Authentication token required to access NEXUS Portal.',
      });
    }

    const token = authHeader.slice(7).trim();
    const decoded = verifyTeamToken(token);

    const team = await Team.findOne({ teamId: decoded.teamId });
    if (!team) {
      return res.status(401).json({
        status: 'error',
        code: 'TEAM_NOT_FOUND',
        message: 'Authenticated team no longer exists in NEXUS Core.',
      });
    }

    req.team = team;
    req.auth = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_OR_EXPIRED_TOKEN',
      message: 'Session expired or invalid credentials. Please log in again.',
    });
  }
};

export const protectAdminRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        code: 'ADMIN_UNAUTHORIZED',
        message: 'Admin or Volunteer authentication token required.',
      });
    }

    const token = authHeader.slice(7).trim();
    const decoded = verifyAdminToken(token);
    req.adminOperator = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      code: 'ADMIN_INVALID_TOKEN',
      message: 'Invalid or expired Admin/Volunteer session token.',
    });
  }
};

