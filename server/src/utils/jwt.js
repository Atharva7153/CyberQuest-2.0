import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signTeamToken = (team, operative = null) => {
  return jwt.sign(
    {
      sub: team._id?.toString(),
      teamId: team.teamId,
      teamName: team.teamName,
      memberId: operative?.memberId || 'OP-01',
      memberName: operative?.name || operative?.memberName || null,
      memberRole: operative?.role || 'OPERATIVE',
      tokenScope: 'TEAM_OPERATIVE',
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};

export const verifyTeamToken = (token) => {
  const decoded = jwt.verify(token, env.jwtSecret);
  if (!decoded?.teamId || decoded?.isAdminOperator || decoded?.tokenScope === 'ADMIN_OPERATOR') {
    throw new Error('Token is not a valid Team Operative credential.');
  }
  return decoded;
};

export const signAdminToken = (operator) => {
  return jwt.sign(
    {
      sub: operator.operatorId,
      operatorId: operator.operatorId,
      name: operator.name,
      role: operator.role || 'ADMIN',
      clearance: operator.clearance || 'OMEGA',
      isAdminOperator: true,
      tokenScope: 'ADMIN_OPERATOR',
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};

export const verifyAdminToken = (token) => {
  const decoded = jwt.verify(token, env.jwtSecret);
  if (
    (!decoded?.isAdminOperator && decoded?.role !== 'ADMIN' && decoded?.role !== 'VOLUNTEER') ||
    decoded?.tokenScope === 'TEAM_OPERATIVE'
  ) {
    throw new Error('Token does not grant Admin/Volunteer clearance.');
  }
  return decoded;
};
