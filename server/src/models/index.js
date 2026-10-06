import { Team } from './Team.js';
import { CreditTransaction } from './CreditTransaction.js';
import { Challenge } from './Challenge.js';
import { ChallengeAttempt } from './ChallengeAttempt.js';

export const PLANNED_COLLECTIONS = Object.freeze({
  TEAMS: 'teams',
  PLAYERS: 'players',
  CHALLENGES: 'challenges',
  CHALLENGE_ATTEMPTS: 'challengeAttempts',
  TEAM_EVENTS: 'teamEvents',
});

export { Team, CreditTransaction, Challenge, ChallengeAttempt };
export default PLANNED_COLLECTIONS;
