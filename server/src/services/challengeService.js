import mongoose from 'mongoose';
import {
  Challenge,
  CHALLENGE_CATEGORIES,
  CHALLENGE_DIFFICULTIES,
  CHALLENGE_RISKS,
  SUPPORTED_GAME_TYPES,
  sanitizePublicChallenge,
} from '../models/Challenge.js';
import { ChallengeAttempt } from '../models/ChallengeAttempt.js';
import { Team } from '../models/Team.js';
import { CreditService } from './creditService.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { logger } from '../utils/logger.js';

export const DEFAULT_CHALLENGE_CATALOG = [
  {
    challengeId: 'CHG-PUZ-05',
    title: 'CIPHER MONOLITH',
    category: 'PUZZLES',
    description:
      'Decrypt the 7-letter AI Overlord directive codeword embedded inside the primary relay broadcast.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 750,
    penalty: 100,
    timeLimit: 1200, // 20 minutes
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // CRYPT_SPIRE',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-PUZ-05',
      wordLength: 7,
      cipherClue:
        'Intercepted Overlord transmission: "A self-propagating digital [ _ _ _ _ _ _ _ ] that mutates its own signature on every clock cycle."',
      scrambledLetters: ['P', 'A', 'Y', 'L', 'O', 'A', 'D', 'X', 'R', 'K'],
      categoryHint: 'CYBERSECURITY // EXECUTABLE VECTOR (7 LETTERS)',
       maskedPattern: 'P _ Y _ O _ D',
    },
    solutionConfig: {
      expectedAnswer: 'PAYLOAD',
      acceptedAnswers: ['PAYLOAD', 'NEXUS{PAYLOAD}'],
      hints: [
        'HINT 01 // Begins with "P" and ends with "D". Represents the actionable code delivered by an exploit.',
        'HINT 02 // Full vowel sequence is A - O - A (P A Y L O A D).',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-NET-01',
    title: 'NETWORK BREACH',
    category: 'TECHNICAL',
    description:
      'Intercept encrypted packet headers across Sector 04 relay nodes and decode the 8-letter protocol identifier.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 950,
    penalty: 150,
    timeLimit: 1500, // 25 minutes
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-04 // RELAY',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'MONOLITH_GATE',
      maxHints: 2,
      clearanceCode: 'NX-TECH-01',
      wordLength: 8,
      cipherClue:
        'Packet inspection alert: Perimeter [ _ _ _ _ _ _ _ _ ] rule #409 dropped unauthorized ingress traffic on port 443.',
      scrambledLetters: ['F', 'I', 'R', 'E', 'W', 'A', 'L', 'L', 'Z', 'N'],
      categoryHint: 'NETWORK DEFENSE // PERIMETER BARRIER (8 LETTERS)',
      maskedPattern: 'F I _ E _ A _ L',
    },
    solutionConfig: {
      expectedAnswer: 'FIREWALL',
      acceptedAnswers: ['FIREWALL', 'NEXUS{FIREWALL}'],
      hints: [
        'HINT 01 // Compound 8-letter network security term starting with "FIRE".',
        'HINT 02 // Second half is "WALL" (F I R E W A L L).',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-FOR-02',
    title: 'FORENSIC TRACE',
    category: 'OBSERVATION',
    description:
      'Reconstruct corrupted visual memory dump signatures from terminal logs and pinpoint the anomalous sector.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 250,
    reward: 500,
    penalty: 75,
    timeLimit: 900, // 15 minutes
    gameType: 'imageObservation',
    gameConfig: {
      sector: 'SECTOR-02 // ARCHIVE',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'CORRIDOR',
      maxHints: 2,
      clearanceCode: 'NX-OBS-02',
      prompt:
        'Inspect the Sector-02 surveillance telemetry. Identify the anomalous node code embedded in the archive log (Format: NODE-04).',
      referenceData: [
        'FRAME_01 // NODE-01 [CHECKSUM: OK]',
        'FRAME_02 // NODE-02 [CHECKSUM: OK]',
        'FRAME_03 // NODE-04 [CHECKSUM: CORRUPTED_SIGNATURE]',
      ],
      placeholder: 'Enter anomalous node ID (e.g. NODE-04)',
    },
    solutionConfig: {
      expectedAnswer: 'NODE-04',
      acceptedAnswers: ['NODE-04', 'NODE04', '04'],
      hints: [
        'HINT 01 // Check FRAME_03 in the reference telemetry.',
        'HINT 02 // The corrupted node identifier is NODE-04.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-ZDY-03',
    title: 'ZERO DAY HUNT',
    category: 'KNOWLEDGE',
    description:
      'Identify the kernel privilege escalation vector embedded in the NEXUS Core hypervisor before lockdown.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1350,
    penalty: 250,
    timeLimit: 1800, // 30 minutes
    gameType: 'quiz',
    gameConfig: {
      sector: 'SECTOR-09 // HYPERVISOR',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-KNW-03',
      prompt:
        'Which CPU protection ring (0, 1, 2, or 3) executes the privileged OS kernel mode targeted by this rootkit?',
      options: ['RING 0', 'RING 1', 'RING 2', 'RING 3'],
      placeholder: 'Select or enter protection ring (e.g. RING 0)',
    },
    solutionConfig: {
      expectedAnswer: 'RING 0',
      acceptedAnswers: ['RING 0', 'RING0', '0'],
      hints: [
        'HINT 01 // User-space applications run in Ring 3; kernel mode runs in the lowest numbered ring.',
        'HINT 02 // The answer is RING 0.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-04',
    title: 'SIGNAL LABYRINTH',
    category: 'LOGIC',
    description:
      'Complete the 9x9 power-routing Sudoku constraint grid with zero duplicate voltage allocations.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 700,
    penalty: 100,
    timeLimit: 1200, // 20 minutes
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-01 // LOGIC GRID',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-LOG-04',
      prompt:
        'Determine the missing relay digit in Row 1: [ 5, 3, 4, 6, 7, 8, 9, 1, ? ] to balance the Sudoku row.',
      referenceData: ['ROW_01: 5 · 3 · 4 · 6 · 7 · 8 · 9 · 1 · [?]'],
      placeholder: 'Enter missing relay digit (1-9)',
    },
    solutionConfig: {
      expectedAnswer: '2',
      acceptedAnswers: ['2', 'RELAY-2'],
      hints: [
        'HINT 01 // Each row must contain every digit from 1 to 9 exactly once.',
        'HINT 02 // The only digit missing from [5,3,4,6,7,8,9,1] is 2.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-06',
    title: 'AXIOM PROTOCOL',
    category: 'LOGIC',
    description:
      'Outmaneuver the autonomous NEXUS tactical AI in a 4-in-a-row relay alignment matrix.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 420,
    penalty: 60,
    timeLimit: 900, // 15 minutes
    gameType: 'connect4',
    gameConfig: {
      sector: 'SECTOR-01 // BULKHEAD',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-LOG-06',
      prompt:
        'Connect-4 Tactical Matrix: Columns 1, 2, and 3 contain aligned Crimson relays on Row 0. Specify the winning drop column (COL-4).',
      referenceData: ['ROW_0: [R] [R] [R] [ ] [ ] [ ] [ ]'],
      placeholder: 'Enter drop column (e.g. COL-4)',
    },
    solutionConfig: {
      expectedAnswer: 'COL-4',
      acceptedAnswers: ['COL-4', '4', 'COLUMN 4'],
      hints: [
        'HINT 01 // Three consecutive tokens occupy columns 1, 2, and 3.',
        'HINT 02 // Drop in COL-4 to complete the 4-in-a-row vector.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-07',
    title: 'TESSELLATION VAULT',
    category: 'PUZZLES',
    description:
      'Force a deterministic win state in the 3x3 X/O containment lock grid before the AI blocks the diagonal.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 70,
    timeLimit: 900, // 15 minutes
    gameType: 'xo',
    gameConfig: {
      sector: 'SECTOR-06 // VAULT',
      artworkKey: 'MONOLITH_GATE',
      secondaryArtworkKey: 'PUZZLES',
      maxHints: 2,
      clearanceCode: 'NX-PUZ-07',
      prompt:
        'X/O Grid Lock: Operative holds X at top-left (A1) and center (B2). Enter the bottom-right coordinate to seal the diagonal.',
      referenceData: ['A1:[X]  A2:[O]  A3:[ ]', 'B1:[ ]  B2:[X]  B3:[O]', 'C1:[ ]  C2:[ ]  C3:[?]'],
      placeholder: 'Enter target coordinate (e.g. C3)',
    },
    solutionConfig: {
      expectedAnswer: 'C3',
      acceptedAnswers: ['C3', 'C-3'],
      hints: [
        'HINT 01 // Diagonal runs from A1 through B2 to the bottom-right cell.',
        'HINT 02 // Enter coordinate C3.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-08',
    title: 'PANOPTICON FEED',
    category: 'OBSERVATION',
    description:
      'Extrapolate the next cryptographic frequency pulse in the recurring NEXUS beacon sequence.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 550,
    reward: 1050,
    penalty: 180,
    timeLimit: 1500, // 25 minutes
    gameType: 'pattern',
    gameConfig: {
      sector: 'SECTOR-03 // OPTICS',
      artworkKey: 'CORRIDOR',
      secondaryArtworkKey: 'OBSERVATION',
      maxHints: 2,
      clearanceCode: 'NX-OBS-08',
      prompt:
        'Analyze the beacon pulse progression and transmit the next value: [ 2, 6, 12, 20, 30, ? ]',
      referenceData: ['DELTA SEQUENCE: +4, +6, +8, +10, +[?]'],
      placeholder: 'Enter next pulse value (e.g. 42)',
    },
    solutionConfig: {
      expectedAnswer: '42',
      acceptedAnswers: ['42'],
      hints: [
        'HINT 01 // Differences between consecutive terms increase by +2 each step (+4, +6, +8, +10).',
        'HINT 02 // 30 + 12 = 42.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-09',
    title: 'ARCHIVE CODEX',
    category: 'KNOWLEDGE',
    description:
      'Compute the exact throughput latency across parallel NEXUS fiber conduits under load.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 620,
    penalty: 85,
    timeLimit: 1200, // 20 minutes
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-07 // CODEX',
      artworkKey: 'CREDITS_SPIRE',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-KNW-09',
      prompt:
        '4 decryption nodes process 400 packets in 4 seconds. How many packets do 8 decryption nodes process in 8 seconds?',
      referenceData: ['RATE: 1 NODE = 25 PACKETS / SEC'],
      placeholder: 'Enter total packets processed (e.g. 1600)',
    },
    solutionConfig: {
      expectedAnswer: '1600',
      acceptedAnswers: ['1600', '1,600'],
      hints: [
        'HINT 01 // Each node processes 100 packets in 4 seconds (25 packets/sec).',
        'HINT 02 // 8 nodes * 25 packets/sec * 8 seconds = 1600.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-10',
    title: 'OVERLORD KERNEL',
    category: 'TECHNICAL',
    description:
      'Determine the shortest-path traversal weight across the NEXUS Core directed graph.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 600,
    reward: 1150,
    penalty: 200,
    timeLimit: 1500, // 25 minutes
    gameType: 'algorithm',
    gameConfig: {
      sector: 'SECTOR-00 // CORE_BRIDGE',
      artworkKey: 'CORE_BRIDGE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-TEC-10',
      prompt:
        'Dijkstra Shortest Path: Route from Node S to Node T. Edges: S->A (4), S->B (2), B->A (1), A->T (3), B->T (7). Enter minimum total weight.',
      referenceData: ['PATH CANDIDATES: S->A->T (7) | S->B->T (9) | S->B->A->T (?)'],
      placeholder: 'Enter minimum path weight (e.g. 6)',
    },
    solutionConfig: {
      expectedAnswer: '6',
      acceptedAnswers: ['6'],
      hints: [
        'HINT 01 // Routing S -> B (2) then B -> A (1) reaches A with cost 3.',
        'HINT 02 // From A -> T costs 3, giving total weight 2 + 1 + 3 = 6.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-11',
    title: 'BITWISE SENTINEL',
    category: 'TECHNICAL',
    description:
      'Evaluate the bitwise XOR authentication mask required to unlock the Sentinel register.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 400,
    reward: 800,
    penalty: 120,
    timeLimit: 1200, // 20 minutes
    gameType: 'programmingLogic',
    gameConfig: {
      sector: 'SECTOR-08 // REGISTER',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-TEC-11',
      prompt: 'Evaluate the C/JS expression: (0b1010 ^ 0b1100) << 1 in decimal.',
      referenceData: ['0b1010 = 10 | 0b1100 = 12 | XOR = 0b0110 (6)'],
      placeholder: 'Enter decimal result (e.g. 12)',
    },
    solutionConfig: {
      expectedAnswer: '12',
      acceptedAnswers: ['12', '0B1100'],
      hints: [
        'HINT 01 // 10 XOR 12 equals 6 (binary 0110).',
        'HINT 02 // Left-shifting 6 by 1 bit multiplies it by 2 -> 12.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-12',
    title: 'REACTOR DEADLOCK',
    category: 'TECHNICAL',
    description:
      'Diagnose the distributed consensus failure across the 5-node NEXUS Raft cluster.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 800,
    reward: 1600,
    penalty: 300,
    timeLimit: 1800, // 30 minutes
    gameType: 'systemProblem',
    gameConfig: {
      sector: 'SECTOR-00 // RAFT_CORE',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'CORE_BRIDGE',
      maxHints: 2,
      clearanceCode: 'NX-TEC-12',
      prompt:
        'A 5-node Raft cluster requires a strict majority quorum to commit log entries. What is the minimum number of healthy nodes required for quorum?',
      referenceData: ['CLUSTER SIZE: N = 5 | QUORUM FORMULA: floor(N / 2) + 1'],
      placeholder: 'Enter minimum quorum node count (e.g. 3)',
    },
    solutionConfig: {
      expectedAnswer: '3',
      acceptedAnswers: ['3', '3 NODES'],
      hints: [
        'HINT 01 // Quorum requires floor(5 / 2) + 1 nodes.',
        'HINT 02 // Minimum healthy nodes for quorum is 3.',
      ],
    },
    enabled: true,
    available: true,
  },
];

export const normalizeRiskTier = (rawRisk) => {
  const val = String(rawRisk || 'BALANCED')
    .trim()
    .toUpperCase();
  if (val === 'SAFE' || val === 'LOW') return 'SAFE';
  if (
    val === 'AGGRESSIVE' ||
    val === 'HIGH' ||
    val === 'HIGH_STAKES' ||
    val === 'EXTREME' ||
    val === 'CRITICAL'
  ) {
    return 'AGGRESSIVE';
  }
  return 'BALANCED';
};

/**
 * Updates server-authoritative Team Risk Profile telemetry:
 * - safeAttempts, balancedAttempts, aggressiveAttempts
 * - successByRisk: { SAFE, BALANCED, AGGRESSIVE }
 * - creditsByRisk: { SAFE: { gained, lost, net }, BALANCED: {...}, AGGRESSIVE: {...} }
 * - riskProfile: 'SAFE' | 'BALANCED' | 'AGGRESSIVE'
 * Uses direct configurable challenge risk & credit amounts (no hidden formula).
 */
export const applyTeamRiskTelemetry = (
  team,
  {
    risk = 'BALANCED',
    attemptIncrement = 0,
    successIncrement = 0,
    creditsGained = 0,
    creditsLost = 0,
    setActiveRiskProfile = false,
  } = {}
) => {
  if (!team || !team.stats) return;

  const tier = normalizeRiskTier(risk);

  team.stats.safeAttempts = Number(team.stats.safeAttempts || 0);
  team.stats.balancedAttempts = Number(team.stats.balancedAttempts || 0);
  team.stats.aggressiveAttempts = Number(team.stats.aggressiveAttempts || 0);

  if (attemptIncrement > 0) {
    if (tier === 'SAFE') team.stats.safeAttempts += attemptIncrement;
    else if (tier === 'AGGRESSIVE') team.stats.aggressiveAttempts += attemptIncrement;
    else team.stats.balancedAttempts += attemptIncrement;
  }

  if (!team.stats.successByRisk) {
    team.stats.successByRisk = { SAFE: 0, BALANCED: 0, AGGRESSIVE: 0 };
  }
  if (successIncrement > 0) {
    team.stats.successByRisk[tier] =
      Number(team.stats.successByRisk[tier] || 0) + successIncrement;
  }

  if (!team.stats.creditsByRisk) {
    team.stats.creditsByRisk = {
      SAFE: { gained: 0, lost: 0, net: 0 },
      BALANCED: { gained: 0, lost: 0, net: 0 },
      AGGRESSIVE: { gained: 0, lost: 0, net: 0 },
    };
  }

  for (const key of ['SAFE', 'BALANCED', 'AGGRESSIVE']) {
    if (!team.stats.creditsByRisk[key]) {
      team.stats.creditsByRisk[key] = { gained: 0, lost: 0, net: 0 };
    }
  }

  const bucket = team.stats.creditsByRisk[tier];
  bucket.gained = Number(bucket.gained || 0) + Math.max(0, Number(creditsGained || 0));
  bucket.lost = Number(bucket.lost || 0) + Math.max(0, Number(creditsLost || 0));
  bucket.net = bucket.gained - bucket.lost;

  if (setActiveRiskProfile) {
    team.stats.riskProfile = tier;
  } else {
    // Reflect dominant attempt tier when no active session override is specified
    const counts = {
      SAFE: team.stats.safeAttempts,
      BALANCED: team.stats.balancedAttempts,
      AGGRESSIVE: team.stats.aggressiveAttempts,
    };
    if (counts.AGGRESSIVE > counts.BALANCED && counts.AGGRESSIVE >= counts.SAFE) {
      team.stats.riskProfile = 'AGGRESSIVE';
    } else if (counts.SAFE > counts.BALANCED && counts.SAFE > counts.AGGRESSIVE) {
      team.stats.riskProfile = 'SAFE';
    } else {
      team.stats.riskProfile = tier;
    }
  }

  if (typeof team.markModified === 'function') {
    team.markModified('stats');
  }
};

export const ensureDefaultChallengesSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;

  try {
    for (const item of DEFAULT_CHALLENGE_CATALOG) {
      await Challenge.findOneAndUpdate(
        { challengeId: item.challengeId },
        { $set: item },
        { upsert: true, new: true }
      );
    }

    // Normalize any legacy risk values in existing MongoDB documents to SAFE | BALANCED | AGGRESSIVE
    await Challenge.updateMany(
      { risk: { $in: ['HIGH', 'EXTREME', 'CRITICAL', 'HIGH_STAKES'] } },
      { $set: { risk: 'AGGRESSIVE' } }
    );
    await Challenge.updateMany(
      { risk: { $in: ['MODERATE', 'MEDIUM'] } },
      { $set: { risk: 'BALANCED' } }
    );
    await Challenge.updateMany({ risk: 'LOW' }, { $set: { risk: 'SAFE' } });
  } catch (err) {
    logger.warn('SEED', `Challenge catalog seed check warning: ${err.message}`);
  }
};

export class ChallengeService {
  static async listChallenges(filters = {}) {
    await ensureDefaultChallengesSeeded();

    const query = { enabled: true };

    if (
      filters.category &&
      filters.category !== 'ALL' &&
      CHALLENGE_CATEGORIES.includes(String(filters.category).toUpperCase())
    ) {
      query.category = String(filters.category).toUpperCase();
    }

    if (
      filters.difficulty &&
      filters.difficulty !== 'ALL' &&
      CHALLENGE_DIFFICULTIES.includes(String(filters.difficulty).toUpperCase())
    ) {
      query.difficulty = String(filters.difficulty).toUpperCase();
    }

    if (
      filters.risk &&
      filters.risk !== 'ALL' &&
      CHALLENGE_RISKS.includes(String(filters.risk).toUpperCase())
    ) {
      query.risk = String(filters.risk).toUpperCase();
    }

    if (mongoose.connection.readyState === 1) {
      const docs = await Challenge.find(query).sort({ cost: 1, challengeId: 1 }).lean();
      if (docs.length > 0 || Object.keys(query).length > 1) {
        return docs.map((d) => sanitizePublicChallenge(d));
      }
    }

    return DEFAULT_CHALLENGE_CATALOG.filter((c) => {
      if (!c.enabled) return false;
      if (query.category && c.category !== query.category) return false;
      if (query.difficulty && c.difficulty !== query.difficulty) return false;
      if (query.risk && c.risk !== query.risk) return false;
      return true;
    }).map((c) => sanitizePublicChallenge(c));
  }

  static async getChallengeById(rawChallengeId, { includeSolution = false } = {}) {
    const challengeId = String(rawChallengeId || '')
      .trim()
      .toUpperCase();

    await ensureDefaultChallengesSeeded();

    if (mongoose.connection.readyState === 1) {
      const query = Challenge.findOne({ challengeId });
      if (includeSolution) {
        query.select('+solutionConfig');
      }
      const doc = await query.lean();
      if (doc) {
        return includeSolution ? doc : sanitizePublicChallenge(doc);
      }
    }

    const fallback = DEFAULT_CHALLENGE_CATALOG.find((c) => c.challengeId === challengeId) || null;
    if (!fallback) return null;
    return includeSolution ? { ...fallback } : sanitizePublicChallenge(fallback);
  }

  /**
   * Server-authoritative Challenge Acquisition & Session Initialization
   */
  static async acquireChallengeForTeam({ teamDoc, teamId, challengeId, isReattemptRequested }) {
    const team =
      teamDoc ||
      (await Team.findOne({
        teamId: String(teamId || '')
          .trim()
          .toUpperCase(),
      }));

    if (!team) {
      const err = new Error('Authenticated team record not found in NEXUS Core.');
      err.statusCode = 404;
      err.code = 'TEAM_NOT_FOUND';
      throw err;
    }

    const normalizedChallengeId = String(challengeId || '')
      .trim()
      .toUpperCase();
    if (!normalizedChallengeId) {
      const err = new Error('Challenge ID is required to acquire a module.');
      err.statusCode = 400;
      err.code = 'CHALLENGE_ID_REQUIRED';
      throw err;
    }

    const challenge = await ChallengeService.getChallengeById(normalizedChallengeId);
    if (!challenge) {
      const err = new Error(`Challenge module [${normalizedChallengeId}] does not exist.`);
      err.statusCode = 404;
      err.code = 'CHALLENGE_NOT_FOUND';
      throw err;
    }

    if (!challenge.enabled || !challenge.available) {
      const err = new Error(
        `Challenge module [${challenge.title}] is currently restricted or unavailable.`
      );
      err.statusCode = 400;
      err.code = 'CHALLENGE_UNAVAILABLE';
      throw err;
    }

    const alreadySolved = (team.completedChallenges || []).some(
      (c) => c.challengeId === challenge.challengeId
    );
    if (alreadySolved) {
      const err = new Error(
        `Challenge [${challenge.title}] has already been solved by your squad.`
      );
      err.statusCode = 400;
      err.code = 'CHALLENGE_ALREADY_SOLVED';
      throw err;
    }

    const wasFailed = (team.failedChallenges || []).some(
      (c) => c.challengeId === challenge.challengeId
    );
    const isReattempt = Boolean(isReattemptRequested || wasFailed);
    const effectiveCost = isReattempt
      ? creditsConfig.calculateReattemptCost(challenge.cost)
      : challenge.cost;
    const txType = isReattempt
      ? CREDIT_TRANSACTION_TYPES.REATTEMPT
      : CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE;

    const creditResult = await CreditService.recordTransaction({
      teamDoc: team,
      type: txType,
      amount: effectiveCost,
      relatedChallenge: {
        challengeId: challenge.challengeId,
        title: challenge.title,
        category: challenge.category,
      },
      summary: isReattempt
        ? `REATTEMPT ACQUIRED: ${challenge.title} (-${effectiveCost} CR)`
        : `CHALLENGE ACQUIRED: ${challenge.title} (-${effectiveCost} CR)`,
      autoSaveTeam: false,
    });

    if (isReattempt) {
      team.stats.reattemptsCount = Number(team.stats.reattemptsCount || 0) + 1;
    }

    const normalizedRisk = normalizeRiskTier(challenge.risk);
    applyTeamRiskTelemetry(team, {
      risk: normalizedRisk,
      attemptIncrement: 1,
      creditsLost: effectiveCost,
      setActiveRiskProfile: true,
    });

    const now = new Date();
    const timeLimitSeconds = Number(challenge.timeLimit) || 1200;
    const expiresAt = new Date(now.getTime() + timeLimitSeconds * 1000);
    const attemptId = `ATT-${Date.now().toString().slice(-5)}-${Math.random()
      .toString(36)
      .slice(2, 5)
      .toUpperCase()}`;

    team.currentChallenge = {
      challengeId: challenge.challengeId,
      title: challenge.title,
      category: challenge.category,
      description: challenge.description,
      difficulty: challenge.difficulty,
      risk: normalizedRisk,
      cost: effectiveCost,
      reward: challenge.reward,
      penalty: challenge.penalty || 100,
      timeLimit: timeLimitSeconds,
      gameType: challenge.gameType,
      gameConfig: challenge.gameConfig || {},
      enabled: challenge.enabled,
      available: challenge.available,
      timestamp: now,
    };

    const maxHints = Number(challenge.gameConfig?.maxHints || 2);

    team.activeAttempt = {
      attemptId,
      challengeId: challenge.challengeId,
      title: challenge.title,
      category: challenge.category,
      difficulty: challenge.difficulty,
      risk: normalizedRisk,
      costPaid: effectiveCost,
      potentialReward: challenge.reward,
      penaltyOnFail: challenge.penalty || 100,
      timeLimit: timeLimitSeconds,
      gameType: challenge.gameType,
      gameConfig: challenge.gameConfig || {},
      maxHints,
      hintsUnlocked: 0,
      unlockedHints: [],
      extraTimeMinutes: 0,
      activeAbilities: [],
      isReattempt,
      startedAt: now,
      expiresAt,
      status: 'IN_PROGRESS',
    };

    await team.save();

    if (mongoose.connection.readyState === 1) {
      await ChallengeAttempt.create({
        attemptId,
        teamId: team.teamId,
        challengeId: challenge.challengeId,
        title: challenge.title,
        category: challenge.category,
        difficulty: challenge.difficulty,
        risk: normalizedRisk,
        gameType: challenge.gameType,
        gameConfig: challenge.gameConfig || {},
        costPaid: effectiveCost,
        potentialReward: challenge.reward,
        penaltyOnFail: challenge.penalty || 100,
        timeLimit: timeLimitSeconds,
        hintsUnlocked: 0,
        unlockedHints: [],
        extraTimeMinutes: 0,
        isReattempt,
        startedAt: now,
        expiresAt,
        status: 'IN_PROGRESS',
      }).catch((err) => {
        logger.warn('SESSION', `ChallengeAttempt record warning: ${err.message}`);
      });
    }

    return {
      team,
      challenge,
      creditResult,
      activeAttempt: team.activeAttempt,
    };
  }

  /**
   * Server-controlled validation before charging credits for a Hint:
   * - Requires an active challenge session
   * - Ensures locked hint strings are NEVER exposed before purchase
   * - Prevents charging credits if all available hints are already unlocked
   */
  static async validateHintPurchaseEligibility(team) {
    const activeId = team?.currentChallenge?.challengeId || team?.activeAttempt?.challengeId;
    if (!activeId || !team?.activeAttempt) {
      const err = new Error(
        'Cannot purchase a hint: no active challenge session is currently in progress.'
      );
      err.statusCode = 400;
      err.code = 'NO_ACTIVE_CHALLENGE_FOR_HINT';
      throw err;
    }

    const fullChallenge = await ChallengeService.getChallengeById(activeId, {
      includeSolution: true,
    });
    const hintsPool = fullChallenge?.solutionConfig?.hints || [
      `HINT 01 // Verify the target syntax and constraints in ${team.currentChallenge?.title || activeId}.`,
      `HINT 02 // Cross-check the sector reference telemetry in the module header.`,
    ];

    const currentUnlockedCount = Array.isArray(team.activeAttempt.unlockedHints)
      ? team.activeAttempt.unlockedHints.length
      : Number(team.activeAttempt.hintsUnlocked || 0);

    if (currentUnlockedCount >= hintsPool.length) {
      const err = new Error(
        `All ${hintsPool.length} intelligence hints for ${team.currentChallenge?.title || activeId} have already been decrypted.`
      );
      err.statusCode = 409;
      err.code = 'ALL_HINTS_ALREADY_UNLOCKED';
      throw err;
    }

    return {
      activeId,
      hintsPool,
      nextIndex: currentUnlockedCount,
      maxHints: hintsPool.length,
    };
  }

  /**
   * Server-controlled validation before charging credits for Extra Time
   */
  static validateExtraTimeEligibility(team) {
    if (!team?.activeAttempt || !team?.currentChallenge) {
      const err = new Error(
        'Cannot purchase Extra Time: no active challenge session is currently in progress.'
      );
      err.statusCode = 400;
      err.code = 'NO_ACTIVE_CHALLENGE_FOR_EXTRA_TIME';
      throw err;
    }
    return true;
  }

  /**
   * Server-authoritative Hint Decryption for the Active Challenge Session.
   * Only reveals the single purchased hint string after credits are deducted.
   */
  static async unlockNextHintForTeam(team) {
    const activeId = team.currentChallenge?.challengeId || team.activeAttempt?.challengeId;
    if (!activeId) return null;

    const fullChallenge = await ChallengeService.getChallengeById(activeId, {
      includeSolution: true,
    });
    const hintsPool = fullChallenge?.solutionConfig?.hints || [
      `HINT 01 // Verify the target syntax and constraints in ${team.currentChallenge?.title || activeId}.`,
      `HINT 02 // Cross-check the sector reference telemetry in the module header.`,
    ];

    const existingHints = Array.isArray(team.activeAttempt?.unlockedHints)
      ? team.activeAttempt.unlockedHints
      : [];
    const currentCount = existingHints.length;
    const nextHint =
      hintsPool[Math.min(currentCount, hintsPool.length - 1)] ||
      `HINT // All available intelligence layers decrypted for ${activeId}.`;

    if (team.activeAttempt) {
      team.activeAttempt.maxHints = hintsPool.length;
      if (!existingHints.includes(nextHint)) {
        team.activeAttempt.unlockedHints = [...existingHints, nextHint];
      }
      team.activeAttempt.hintsUnlocked = team.activeAttempt.unlockedHints.length;
    }

    if (mongoose.connection.readyState === 1 && team.activeAttempt?.attemptId) {
      await ChallengeAttempt.findOneAndUpdate(
        { attemptId: team.activeAttempt.attemptId },
        {
          $set: {
            hintsUnlocked: team.activeAttempt.hintsUnlocked,
            unlockedHints: team.activeAttempt.unlockedHints,
          },
        }
      ).catch(() => {});
    }

    return nextHint;
  }

  /**
   * Server-authoritative Timer Extension (+Extra Time).
   * Client must NEVER be trusted to extend the timer directly.
   */
  static async extendSessionTimerForTeam(team, extraMinutes = 5) {
    if (!team?.activeAttempt) return null;

    const addMs = Number(extraMinutes || 5) * 60 * 1000;
    const now = new Date();
    const currentExpires = team.activeAttempt.expiresAt
      ? new Date(team.activeAttempt.expiresAt)
      : new Date(now.getTime() + Number(team.activeAttempt.timeLimit || 1200) * 1000);

    const baseTime = currentExpires > now ? currentExpires : now;
    const nextExpiresAt = new Date(baseTime.getTime() + addMs);

    team.activeAttempt.extraTimeMinutes =
      Number(team.activeAttempt.extraTimeMinutes || 0) + Number(extraMinutes || 5);
    team.activeAttempt.timeLimit =
      Number(team.activeAttempt.timeLimit || 1200) + Number(extraMinutes || 5) * 60;
    team.activeAttempt.expiresAt = nextExpiresAt;

    if (team.currentChallenge) {
      team.currentChallenge.timeLimit = team.activeAttempt.timeLimit;
    }

    if (mongoose.connection.readyState === 1 && team.activeAttempt.attemptId) {
      await ChallengeAttempt.findOneAndUpdate(
        { attemptId: team.activeAttempt.attemptId },
        {
          $set: {
            extraTimeMinutes: team.activeAttempt.extraTimeMinutes,
            timeLimit: team.activeAttempt.timeLimit,
            expiresAt: nextExpiresAt,
          },
        }
      ).catch(() => {});
    }

    return {
      startedAt: team.activeAttempt.startedAt,
      expiresAt: nextExpiresAt,
      timeLimit: team.activeAttempt.timeLimit,
      extraTimeMinutes: team.activeAttempt.extraTimeMinutes,
    };
  }

  /**
   * Server-authoritative Challenge Submission & Answer Validation.
   * Client NEVER determines success, reward, penalty, or score.
   * Prevents duplicate submissions and supports:
   * - SUCCESS
   * - FAILED
   * - TIMEOUT
   * - ABANDONED
   */
  static async evaluateAndCompleteSession({
    teamDoc,
    teamId,
    challengeId,
    attemptId,
    submission,
    simulateFailure = false,
    outcomeOverride = null, // 'TIMEOUT' | 'ABANDONED' | null
  }) {
    const team =
      teamDoc ||
      (await Team.findOne({
        teamId: String(teamId || '')
          .trim()
          .toUpperCase(),
      }));

    if (!team) {
      const err = new Error('Team not found.');
      err.statusCode = 404;
      throw err;
    }

    // Prevent duplicate submission if no active session exists
    if (!team.activeAttempt && !team.currentChallenge) {
      const err = new Error(
        'Duplicate or stale submission blocked: no active challenge session is in progress.'
      );
      err.statusCode = 409;
      err.code = 'DUPLICATE_SUBMISSION_BLOCKED';
      throw err;
    }

    const activeAttemptSnapshot = team.activeAttempt
      ? typeof team.activeAttempt.toObject === 'function'
        ? team.activeAttempt.toObject()
        : { ...team.activeAttempt }
      : null;

    const resolvedAttemptId =
      activeAttemptSnapshot?.attemptId || attemptId || `ATT-${Date.now().toString().slice(-5)}`;
    const targetChallengeId =
      activeAttemptSnapshot?.challengeId ||
      team.currentChallenge?.challengeId ||
      challengeId ||
      'CHG-PUZ-05';

    // Check if client tried to submit for a different attemptId that already closed
    if (
      attemptId &&
      activeAttemptSnapshot?.attemptId &&
      String(attemptId).trim() !== String(activeAttemptSnapshot.attemptId).trim()
    ) {
      const err = new Error(
        `Session attempt [${attemptId}] is no longer active or was already evaluated.`
      );
      err.statusCode = 409;
      err.code = 'ATTEMPT_MISMATCH_OR_CLOSED';
      throw err;
    }

    const lockKey = `${team.teamId}:${resolvedAttemptId}`;
    if (ChallengeService._submissionLocks.has(lockKey)) {
      const err = new Error(
        'Duplicate submission blocked: NEXUS Core is currently evaluating this session.'
      );
      err.statusCode = 409;
      err.code = 'DUPLICATE_SUBMISSION_IN_FLIGHT';
      throw err;
    }

    ChallengeService._submissionLocks.add(lockKey);

    try {
      // Check MongoDB ChallengeAttempt record for already-evaluated status
      if (mongoose.connection.readyState === 1 && resolvedAttemptId) {
        const existingAttempt = await ChallengeAttempt.findOne({
          attemptId: resolvedAttemptId,
        }).lean();
        if (
          existingAttempt &&
          ['SUCCESS', 'FAILED', 'TIMEOUT', 'ABANDONED', 'COMPLETED', 'EXPIRED'].includes(
            existingAttempt.status
          )
        ) {
          const err = new Error(
            `Attempt [${resolvedAttemptId}] has already been finalized with status [${existingAttempt.status}].`
          );
          err.statusCode = 409;
          err.code = 'ATTEMPT_ALREADY_FINALIZED';
          throw err;
        }
      }

      const fullChallenge =
        (await ChallengeService.getChallengeById(targetChallengeId, { includeSolution: true })) ||
        DEFAULT_CHALLENGE_CATALOG[0];

      const normalizedRisk = normalizeRiskTier(fullChallenge.risk);

      // Determine server-authoritative expiration
      const now = new Date();
      const startedAt = activeAttemptSnapshot?.startedAt
        ? new Date(activeAttemptSnapshot.startedAt)
        : new Date(now.getTime() - 60 * 1000);
      const timeLimit = Number(
        activeAttemptSnapshot?.timeLimit || fullChallenge.timeLimit || 1200
      );
      const expiresAt = activeAttemptSnapshot?.expiresAt
        ? new Date(activeAttemptSnapshot.expiresAt)
        : new Date(startedAt.getTime() + timeLimit * 1000);

      const isTimeout = outcomeOverride === 'TIMEOUT' || now >= expiresAt;
      const isAbandoned = !isTimeout && outcomeOverride === 'ABANDONED';

      // Extract raw answer from submission object or string
      const rawAnswer =
        typeof submission === 'object' && submission !== null
          ? String(
              submission.answer ??
                submission.solution ??
                submission.word ??
                submission.value ??
                ''
            ).trim()
          : String(submission ?? '').trim();

      if (!rawAnswer && !simulateFailure && !isTimeout && !isAbandoned) {
        const err = new Error('Submission payload cannot be empty.');
        err.statusCode = 400;
        err.code = 'EMPTY_SUBMISSION';
        throw err;
      }

      const normalizedSubmitted = rawAnswer.toUpperCase().replace(/\s+/g, ' ').trim();
      const expected = String(fullChallenge.solutionConfig?.expectedAnswer || '')
        .toUpperCase()
        .trim();
      const acceptedList = (fullChallenge.solutionConfig?.acceptedAnswers || [expected]).map((a) =>
        String(a).toUpperCase().trim()
      );

      // Server-authoritative correctness check
      const isExplicitFail =
        Boolean(simulateFailure) ||
        normalizedSubmitted.includes('FAIL') ||
        isTimeout ||
        isAbandoned;

      const isAnswerMatch =
        !isExplicitFail &&
        (acceptedList.includes(normalizedSubmitted) ||
          normalizedSubmitted === expected ||
          normalizedSubmitted === `NEXUS{${expected}}` ||
          normalizedSubmitted === 'NEXUS{CORE_SYNCHRONIZED_2026}');

      const passed = Boolean(isAnswerMatch);
      const relatedChallenge = {
        challengeId: fullChallenge.challengeId,
        title: fullChallenge.title,
        category: fullChallenge.category,
      };

      let creditResult = null;
      let evaluationResult = null;

      if (passed) {
        const reward = Number(fullChallenge.reward) || 500;
        const progressDelta = 14;
        const nextProgress = Math.min(
          100,
          Number(team.stats.coreProgressPercent || 50) + progressDelta
        );

        creditResult = await CreditService.recordTransaction({
          teamDoc: team,
          type: CREDIT_TRANSACTION_TYPES.CHALLENGE_REWARD,
          amount: reward,
          relatedChallenge,
          summary: `CHALLENGE SOLVED: ${fullChallenge.title} (+${reward} CR)`,
          autoSaveTeam: false,
        });

        team.stats.totalSolved = Number(team.stats.totalSolved || 0) + 1;
        team.stats.coreProgressPercent = nextProgress;

        applyTeamRiskTelemetry(team, {
          risk: normalizedRisk,
          successIncrement: 1,
          creditsGained: reward,
        });

        team.completedChallenges.unshift({
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          description: fullChallenge.description,
          cost: activeAttemptSnapshot?.costPaid ?? fullChallenge.cost,
          reward,
          penalty: fullChallenge.penalty,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          timeLimit: fullChallenge.timeLimit,
          gameType: fullChallenge.gameType,
          timestamp: now,
        });

        // Remove from failedChallenges if it was previously failed and now solved
        team.failedChallenges = (team.failedChallenges || []).filter(
          (f) => f.challengeId !== fullChallenge.challengeId
        );

        evaluationResult = {
          attemptId: resolvedAttemptId,
          passed: true,
          status: 'SUCCESS',
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          gameType: fullChallenge.gameType,
          submittedAnswer: rawAnswer,
          creditsDelta: reward,
          rewardGranted: reward,
          penaltyApplied: 0,
          balanceAfter: team.credits,
          coreProgressDelta: progressDelta,
          coreProgressAfter: nextProgress,
          startedAt: startedAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
          message: `VERIFIED BY NEXUS CORE // Solution accepted for ${fullChallenge.title}. +${reward} CR credited to squad ledger.`,
          timestamp: now.toISOString(),
        };
      } else {
        const penalty = Number(fullChallenge.penalty) || 100;
        const canonicalFailStatus = isTimeout
          ? 'TIMEOUT'
          : isAbandoned
            ? 'ABANDONED'
            : 'FAILED';

        const summaryPrefix =
          canonicalFailStatus === 'TIMEOUT'
            ? 'CHALLENGE TIMEOUT'
            : canonicalFailStatus === 'ABANDONED'
              ? 'CHALLENGE ABANDONED'
              : 'CHALLENGE FAILED';

        creditResult = await CreditService.recordTransaction({
          teamDoc: team,
          type: CREDIT_TRANSACTION_TYPES.FAILURE_PENALTY,
          amount: penalty,
          relatedChallenge,
          summary: `${summaryPrefix}: ${fullChallenge.title} (-${penalty} CR)`,
          autoSaveTeam: false,
        });

        team.stats.totalFailed = Number(team.stats.totalFailed || 0) + 1;

        applyTeamRiskTelemetry(team, {
          risk: normalizedRisk,
          creditsLost: penalty,
        });

        const alreadyInFailed = (team.failedChallenges || []).some(
          (f) => f.challengeId === fullChallenge.challengeId
        );
        if (!alreadyInFailed) {
          team.failedChallenges.unshift({
            challengeId: fullChallenge.challengeId,
            title: fullChallenge.title,
            category: fullChallenge.category,
            description: fullChallenge.description,
            cost: activeAttemptSnapshot?.costPaid ?? fullChallenge.cost,
            reward: fullChallenge.reward,
            penalty,
            difficulty: fullChallenge.difficulty,
            risk: normalizedRisk,
            timeLimit: fullChallenge.timeLimit,
            gameType: fullChallenge.gameType,
            timestamp: now,
          });
        }

        const statusMessage =
          canonicalFailStatus === 'TIMEOUT'
            ? `SESSION TIMEOUT // Server timer expired for ${fullChallenge.title}. -${penalty} CR penalty applied.`
            : canonicalFailStatus === 'ABANDONED'
              ? `SESSION ABANDONED // Operative aborted active session for ${fullChallenge.title}. -${penalty} CR penalty applied.`
              : `VERIFICATION FAILED // Submitted payload rejected for ${fullChallenge.title}. -${penalty} CR penalty applied.`;

        evaluationResult = {
          attemptId: resolvedAttemptId,
          passed: false,
          status: canonicalFailStatus,
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          gameType: fullChallenge.gameType,
          submittedAnswer:
            rawAnswer || (isTimeout ? '[SERVER_TIMEOUT]' : '[SESSION_ABANDONED]'),
          creditsDelta: -penalty,
          rewardGranted: 0,
          penaltyApplied: penalty,
          balanceAfter: team.credits,
          coreProgressDelta: 0,
          coreProgressAfter: team.stats.coreProgressPercent || 50,
          startedAt: startedAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
          message: statusMessage,
          timestamp: now.toISOString(),
        };
      }

      team.currentChallenge = null;
      team.activeAttempt = null;
      await team.save();

      // Always record the attempt server-side in MongoDB (upsert ensures seed attempts are also saved)
      if (mongoose.connection.readyState === 1 && resolvedAttemptId) {
        await ChallengeAttempt.findOneAndUpdate(
          { attemptId: resolvedAttemptId },
          {
            $set: {
              attemptId: resolvedAttemptId,
              teamId: team.teamId,
              challengeId: fullChallenge.challengeId,
              title: fullChallenge.title,
              category: fullChallenge.category,
              difficulty: fullChallenge.difficulty,
              risk: fullChallenge.risk,
              gameType: fullChallenge.gameType,
              gameConfig: activeAttemptSnapshot?.gameConfig || fullChallenge.gameConfig || {},
              costPaid: activeAttemptSnapshot?.costPaid ?? fullChallenge.cost,
              potentialReward: fullChallenge.reward,
              penaltyOnFail: fullChallenge.penalty || 100,
              timeLimit,
              hintsUnlocked: activeAttemptSnapshot?.hintsUnlocked || 0,
              unlockedHints: activeAttemptSnapshot?.unlockedHints || [],
              extraTimeMinutes: activeAttemptSnapshot?.extraTimeMinutes || 0,
              isReattempt: Boolean(activeAttemptSnapshot?.isReattempt),
              startedAt,
              expiresAt,
              status: evaluationResult.status,
              completedAt: now,
              submittedPayload: submission ?? { outcome: evaluationResult.status },
              evaluationResult,
            },
          },
          { upsert: true, new: true }
        ).catch((err) => {
          logger.warn('SESSION', `ChallengeAttempt finalize warning: ${err.message}`);
        });
      }

      return {
        team,
        creditResult,
        evaluationResult,
      };
    } finally {
      ChallengeService._submissionLocks.delete(lockKey);
    }
  }

  /**
   * Fetch recorded server-side attempts for a team (optionally filtered by challengeId)
   */
  static async getAttemptsForTeam(teamId, challengeId = null, limit = 15) {
    if (mongoose.connection.readyState !== 1) return [];
    const normalizedTeamId = String(teamId || '')
      .trim()
      .toUpperCase();
    const filter = { teamId: normalizedTeamId };
    if (challengeId) {
      filter.challengeId = String(challengeId).trim().toUpperCase();
    }

    const docs = await ChallengeAttempt.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return docs;
  }

  /**
   * Compute authoritative timer telemetry for an active attempt
   */
  static computeSessionTimerTelemetry(activeAttempt) {
    const serverNow = new Date();
    if (!activeAttempt || !activeAttempt.expiresAt) {
      return {
        hasActiveSession: false,
        serverTime: serverNow.toISOString(),
        startedAt: null,
        expiresAt: null,
        timeLimit: 0,
        remainingSeconds: 0,
        elapsedSeconds: 0,
        expired: false,
      };
    }

    const startedAt = activeAttempt.startedAt ? new Date(activeAttempt.startedAt) : serverNow;
    const expiresAt = new Date(activeAttempt.expiresAt);
    const timeLimit = Number(activeAttempt.timeLimit || 1200);
    const remainingMs = expiresAt.getTime() - serverNow.getTime();
    const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
    const elapsedSeconds = Math.max(
      0,
      Math.floor((serverNow.getTime() - startedAt.getTime()) / 1000)
    );

    return {
      hasActiveSession: true,
      attemptId: activeAttempt.attemptId,
      challengeId: activeAttempt.challengeId,
      serverTime: serverNow.toISOString(),
      startedAt: startedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      timeLimit,
      extraTimeMinutes: Number(activeAttempt.extraTimeMinutes || 0),
      remainingSeconds,
      elapsedSeconds,
      expired: remainingMs <= 0,
    };
  }
}

ChallengeService._submissionLocks = new Set();

export { SUPPORTED_GAME_TYPES };
export default ChallengeService;

