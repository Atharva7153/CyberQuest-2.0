import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signTeamToken = (team) => {
  return jwt.sign(
    {
      sub: team._id?.toString(),
      teamId: team.teamId,
      teamName: team.teamName,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};

export const verifyTeamToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};
