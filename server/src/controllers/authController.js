import {
  authenticateTeam,
  executeTeamAction,
  CHALLENGE_CATALOG,
} from '../services/teamService.js';
import { socketEmitters } from '../socket/index.js';

export const loginTeam = async (req, res, next) => {
  try {
    const { teamId, password } = req.body || {};
    const { token, team } = await authenticateTeam(teamId, password);

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      token,
      team,
      catalog: CHALLENGE_CATALOG,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentTeam = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: req.team.toPublicJSON(),
      catalog: CHALLENGE_CATALOG,
    });
  } catch (error) {
    next(error);
  }
};

export const postTeamAction = async (req, res, next) => {
  try {
    const { actionType, payload } = req.body || {};
    const result = await executeTeamAction(req.team.teamId, actionType, payload);

    // Broadcast updated authoritative state to all members in team:<teamId>
    socketEmitters.emitTeamStateUpdate(req.team.teamId, {
      teamId: req.team.teamId,
      team: result.team,
      event: result.event,
      catalog: result.catalog,
    });

    res.status(200).json({
      status: 'ok',
      service: 'cyber-quest-server',
      team: result.team,
      event: result.event,
      catalog: result.catalog,
    });
  } catch (error) {
    next(error);
  }
};
