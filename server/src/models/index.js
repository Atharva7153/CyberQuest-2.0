/**
 * NEXUS / Cyber Quest — Database Model Registry (Phase 2 Infrastructure)
 *
 * No collections are prematurely instantiated in Phase 2.
 * This module defines the canonical collection architecture reserved for upcoming phases:
 * - teams
 * - players
 * - challenges
 * - challengeAttempts
 * - teamEvents
 */

export const PLANNED_COLLECTIONS = Object.freeze({
  TEAMS: 'teams',
  PLAYERS: 'players',
  CHALLENGES: 'challenges',
  CHALLENGE_ATTEMPTS: 'challengeAttempts',
  TEAM_EVENTS: 'teamEvents',
});

export default PLANNED_COLLECTIONS;
