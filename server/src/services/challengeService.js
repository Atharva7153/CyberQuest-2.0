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
import { AuditService, AUDIT_ACTION_TYPES } from './auditService.js';
import { CREDIT_TRANSACTION_TYPES, creditsConfig } from '../config/creditsConfig.js';
import { evaluateGameSubmissionServer } from '../games/GameRegistry.js';
import { assignVariantForTeamAttempt } from './challengeVariantService.js';
import { logger } from '../utils/logger.js';

export const DEFAULT_CHALLENGE_CATALOG = [
  {
    challengeId: 'CHG-PUZ-05',
    title: 'WORD GUESS',
    category: 'PUZZLES',
    description:
      'Unscramble the letter tiles using the clues to spell both 6-letter words.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 750,
    penalty: 100,
    timeLimit: 150, // 2.5 minutes
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // CRYPT_SPIRE',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-PUZ-05',
      rounds: [
        {
          id: 'R1',
          word: 'CIPHER',
          scrambled: 'H P E C I R',
          clue: 'Cryptographic algorithm used for encoding and decoding classified payloads (6 letters).',
          category: 'CRYPTOGRAPHY',
        },
        {
          id: 'R2',
          word: 'SOCKET',
          scrambled: 'K T C E O S',
          clue: 'Bidirectional network communication endpoint binding an IP address and port (6 letters).',
          category: 'NETWORKING',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:CIPHER-SOCKET',
      acceptedAnswers: [
        'WORDGUESS:CIPHER-SOCKET',
        'CIPHER-SOCKET',
        'CIPHER',
        'PAYLOAD',
        'NEXUS{PAYLOAD}',
      ],
      hints: [
        'HINT 01 // Round 1 is a 6-letter cryptography term for an algorithm that transforms plaintext into secret text.',
        'HINT 02 // Round 2 is a 6-letter networking term for the software endpoint created when an IP address and port are bound.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-04',
    title: 'SUDOKU (6×6)',
    category: 'LOGIC',
    description:
      'Fill the 6×6 Sudoku grid so every row, column, and 2×3 block has numbers 1 to 6.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 700,
    penalty: 100,
    timeLimit: 180, // 3 minutes
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-01 // LOGIC GRID',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-LOG-04',
      size: 6,
      boxRows: 2,
      boxCols: 3,
      initialGrid: [
        [1, 0, 3, 0, 5, 6],
        [0, 5, 6, 1, 0, 3],
        [2, 3, 0, 5, 6, 0],
        [5, 0, 1, 0, 3, 4],
        [0, 1, 2, 3, 0, 5],
        [3, 4, 0, 6, 1, 0],
      ],
      solutionGrid: [
        [1, 2, 3, 4, 5, 6],
        [4, 5, 6, 1, 2, 3],
        [2, 3, 4, 5, 6, 1],
        [5, 6, 1, 2, 3, 4],
        [6, 1, 2, 3, 4, 5],
        [3, 4, 5, 6, 1, 2],
      ],
    },
    solutionConfig: {
      expectedAnswer: 'SUDOKU:6X6:SOLVED',
      acceptedAnswers: [
        'SUDOKU:6X6:SOLVED',
        '123456-456123-234561-561234-612345-345612',
        '2',
        'RELAY-2',
      ],
      hints: [
        'HINT 01 // Start with rows that already have four given numbers — only two digits from 1 to 6 are missing in each row.',
        'HINT 02 // Cross-check each empty cell against its 2×3 box and column to eliminate one of the two remaining candidates.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-07',
    title: '4×4 TIC-TAC-TOE',
    category: 'PUZZLES',
    description:
      'Beat the AI by getting 4 X marks in a row horizontally, vertically, or diagonally.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 70,
    timeLimit: 120, // 2 minutes
    gameType: 'xo4x4',
    gameConfig: {
      sector: 'SECTOR-06 // VAULT',
      artworkKey: 'MONOLITH_GATE',
      secondaryArtworkKey: 'PUZZLES',
      maxHints: 2,
      clearanceCode: 'NX-PUZ-07',
      aiSkill: 'TACTICAL',
      subtitle: 'Align 4 X marks in any row, column, or diagonal before the AI.',
    },
    solutionConfig: {
      expectedAnswer: 'XO4X4:WIN',
      acceptedAnswers: ['XO4X4:WIN', 'C3', 'C-3'],
      hints: [
        'HINT 01 // Claim two of the four center squares early to create intersecting lines.',
        'HINT 02 // Build an open 3-in-a-row fork across a row and diagonal simultaneously.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-FOR-02',
    title: 'PATCHES (5×5)',
    category: 'OBSERVATION',
    description:
      'Divide the 5×5 grid into rectangles so each rectangle matches the number inside it.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 250,
    reward: 500,
    penalty: 75,
    timeLimit: 180, // 3 minutes
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-02 // ARCHIVE',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'CORRIDOR',
      maxHints: 2,
      clearanceCode: 'NX-OBS-02',
      rows: 5,
      cols: 5,
      clues: [
        { id: 'P1', r: 0, c: 0, area: 4 },
        { id: 'P2', r: 0, c: 3, area: 6 },
        { id: 'P3', r: 2, c: 1, area: 6 },
        { id: 'P4', r: 3, c: 3, area: 3 },
        { id: 'P5', r: 2, c: 4, area: 3 },
        { id: 'P6', r: 4, c: 1, area: 3 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 1, c2: 1, area: 4, clueId: 'P1' },
        { r1: 0, c1: 2, r2: 1, c2: 4, area: 6, clueId: 'P2' },
        { r1: 2, c1: 0, r2: 3, c2: 2, area: 6, clueId: 'P3' },
        { r1: 2, c1: 3, r2: 4, c2: 3, area: 3, clueId: 'P4' },
        { r1: 2, c1: 4, r2: 4, c2: 4, area: 3, clueId: 'P5' },
        { r1: 4, c1: 0, r2: 4, c2: 2, area: 3, clueId: 'P6' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:5X5:SOLVED',
      acceptedAnswers: ['PATCHES:5X5:SOLVED', 'NODE-04', 'NODE04', '04'],
      hints: [
        'HINT 01 // A clue of 4 in a corner can be a 2×2 square or a 1×4 strip — check how the adjacent 6 clue constrains the top rows.',
        'HINT 02 // Clues of 3 must be 1×3 or 3×1 bars; use the bottom and right board edges to lock their orientation first.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-NET-01',
    title: 'ZIP (PATH PUZZLE)',
    category: 'TECHNICAL',
    description:
      'Connect numbers 1 to 6 in order with a single line that visits every square on the board.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 950,
    penalty: 150,
    timeLimit: 180, // 3 minutes
    gameType: 'zip',
    gameConfig: {
      sector: 'SECTOR-04 // RELAY',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'MONOLITH_GATE',
      maxHints: 2,
      clearanceCode: 'NX-TECH-01',
      rows: 5,
      cols: 5,
      blocked: [],
      waypoints: [
        { num: 1, r: 0, c: 0 },
        { num: 2, r: 0, c: 4 },
        { num: 3, r: 1, c: 1 },
        { num: 4, r: 2, c: 3 },
        { num: 5, r: 3, c: 0 },
        { num: 6, r: 4, c: 4 },
      ],
      solutionPath: [
        { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 },
        { r: 1, c: 4 }, { r: 1, c: 3 }, { r: 1, c: 2 }, { r: 1, c: 1 }, { r: 1, c: 0 },
        { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
        { r: 3, c: 4 }, { r: 3, c: 3 }, { r: 3, c: 2 }, { r: 3, c: 1 }, { r: 3, c: 0 },
        { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'ZIP:5X5:SOLVED',
      acceptedAnswers: ['ZIP:5X5:SOLVED', 'FIREWALL', 'NEXUS{FIREWALL}'],
      hints: [
        'HINT 01 // Do not leave dead-end corner cells behind — every cell along the outer border must be visited on your way between waypoints.',
        'HINT 02 // Notice that each row contains one waypoint; sweeping full rows before dropping to the next row prevents self-intersections.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-06',
    title: 'CONNECT 4',
    category: 'LOGIC',
    description:
      'Drop Red discs into the 7×6 board and connect 4 in a row before the AI.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 420,
    penalty: 60,
    timeLimit: 120, // 2 minutes
    gameType: 'connect4',
    gameConfig: {
      sector: 'SECTOR-01 // BULKHEAD',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-LOG-06',
      rows: 6,
      cols: 7,
      aiSkill: 'STRATEGIC',
      subtitle: 'Drop Red discs into columns 1–7 to connect 4 horizontally, vertically, or diagonally.',
    },
    solutionConfig: {
      expectedAnswer: 'CONNECT4:WIN',
      acceptedAnswers: ['CONNECT4:WIN', 'XO4X4:WIN', 'COL-4', '4', 'COLUMN 4'],
      hints: [
        'HINT 01 // Control the center column early to maximize horizontal and diagonal threats.',
        'HINT 02 // Build two simultaneous 3-disc threats so the AI cannot block both.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-09',
    title: 'WEND (WORD LADDER)',
    category: 'KNOWLEDGE',
    description:
      'Turn PORT into PING by changing one letter at a time using the clues.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 620,
    penalty: 85,
    timeLimit: 150, // 2.5 minutes
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-07 // CODEX',
      artworkKey: 'CREDITS_SPIRE',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-KNW-09',
      startWord: 'PORT',
      endWord: 'PING',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Component, piece, or disk partition',
          hint: 'Change the vowel in PORT to form a word for a piece or component.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Breathe rapidly after exertion',
          hint: 'Change the third letter to form a word for gasping or breathing hard.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Unit of liquid measure',
          hint: 'Change the vowel to form a liquid volume unit that is one letter away from PING.',
          length: 4,
        },
      ],
      solutionSteps: ['PART', 'PANT', 'PINT'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:PORT-PART-PANT-PINT-PING',
      acceptedAnswers: [
        'WEND:PORT-PART-PANT-PINT-PING',
        'PORT-PART-PANT-PINT-PING',
        'PART-PANT-PINT',
        '1600',
        '1,600',
      ],
      hints: [
        'HINT 01 // Keep the starting letter P fixed throughout the entire ladder; begin by changing the vowel in PORT.',
        'HINT 02 // Step 3 is a 4-letter unit of liquid volume that shares P-I-N with the target word PING.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-08',
    title: 'PATCHES (6×6)',
    category: 'OBSERVATION',
    description:
      'Divide the 6×6 grid into rectangles so each rectangle matches the number inside it.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 550,
    reward: 1050,
    penalty: 180,
    timeLimit: 240, // 4 minutes
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-03 // OPTICS',
      artworkKey: 'CORRIDOR',
      secondaryArtworkKey: 'OBSERVATION',
      maxHints: 2,
      clearanceCode: 'NX-OBS-08',
      rows: 6,
      cols: 6,
      clues: [
        { id: 'P1', r: 0, c: 1, area: 6 },
        { id: 'P2', r: 1, c: 4, area: 9 },
        { id: 'P3', r: 2, c: 1, area: 6 },
        { id: 'P4', r: 4, c: 3, area: 6 },
        { id: 'P5', r: 4, c: 5, area: 3 },
        { id: 'P6', r: 5, c: 1, area: 6 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 1, c2: 2, area: 6, clueId: 'P1' },
        { r1: 0, c1: 3, r2: 2, c2: 5, area: 9, clueId: 'P2' },
        { r1: 2, c1: 0, r2: 3, c2: 2, area: 6, clueId: 'P3' },
        { r1: 3, c1: 3, r2: 5, c2: 4, area: 6, clueId: 'P4' },
        { r1: 3, c1: 5, r2: 5, c2: 5, area: 3, clueId: 'P5' },
        { r1: 4, c1: 0, r2: 5, c2: 2, area: 6, clueId: 'P6' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:6X6:SOLVED',
      acceptedAnswers: ['PATCHES:6X6:SOLVED', '42'],
      hints: [
        'HINT 01 // A clue of 9 on a 6×6 grid can only be factored as a 3×3 square because 1×9 exceeds the board dimensions.',
        'HINT 02 // Once the 3×3 block is placed, partition the remaining 3-column corridors into rectangles matching the 6 and 3 clues.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-ZDY-03',
    title: 'SUDOKU (9×9)',
    category: 'KNOWLEDGE',
    description:
      'Solve the 9×9 Sudoku grid so every row, column, and 3×3 block has numbers 1 to 9.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1350,
    penalty: 250,
    timeLimit: 300, // 5 minutes
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-09 // HYPERVISOR',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-KNW-03',
      size: 9,
      boxRows: 3,
      boxCols: 3,
      initialGrid: [
        [5, 3, 0, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 0, 4, 2, 3],
        [4, 2, 6, 8, 0, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 0, 5, 6],
        [9, 6, 0, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 0],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
      solutionGrid: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
    },
    solutionConfig: {
      expectedAnswer: 'SUDOKU:9X9:SOLVED',
      acceptedAnswers: ['SUDOKU:9X9:SOLVED', 'RING 0', 'RING0', '0'],
      hints: [
        'HINT 01 // Every incomplete row on this board is missing only a single digit from 1 to 9 — scan row by row.',
        'HINT 02 // Double-check each placed digit against its 3×3 subgrid and column to confirm no duplicates exist.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-10',
    title: 'ZIP (LEVEL 2)',
    category: 'TECHNICAL',
    description:
      'Connect numbers 1 to 6 in order while visiting every square on the 5×5 grid.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 600,
    reward: 1150,
    penalty: 200,
    timeLimit: 180, // 3 minutes
    gameType: 'zip',
    gameConfig: {
      sector: 'SECTOR-00 // CORE_BRIDGE',
      artworkKey: 'CORE_BRIDGE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-TEC-10',
      rows: 5,
      cols: 5,
      blocked: [],
      waypoints: [
        { num: 1, r: 0, c: 0 },
        { num: 2, r: 4, c: 0 },
        { num: 3, r: 1, c: 1 },
        { num: 4, r: 3, c: 2 },
        { num: 5, r: 0, c: 3 },
        { num: 6, r: 4, c: 4 },
      ],
      solutionPath: [
        { r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 },
        { r: 4, c: 1 }, { r: 3, c: 1 }, { r: 2, c: 1 }, { r: 1, c: 1 }, { r: 0, c: 1 },
        { r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }, { r: 3, c: 2 }, { r: 4, c: 2 },
        { r: 4, c: 3 }, { r: 3, c: 3 }, { r: 2, c: 3 }, { r: 1, c: 3 }, { r: 0, c: 3 },
        { r: 0, c: 4 }, { r: 1, c: 4 }, { r: 2, c: 4 }, { r: 3, c: 4 }, { r: 4, c: 4 },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'ZIP:5X5:SOLVED',
      acceptedAnswers: ['ZIP:5X5:SOLVED', '6'],
      hints: [
        'HINT 01 // Observe that waypoints 1 and 2 sit at the top and bottom of the first column — complete that edge before moving inward.',
        'HINT 02 // Each column contains one waypoint; traversing full columns avoids trapping unvisited squares.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-11',
    title: 'PATCHES (LEVEL 2)',
    category: 'TECHNICAL',
    description:
      'Split the 5×5 grid into rectangles matching each numbered area clue.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 400,
    reward: 800,
    penalty: 120,
    timeLimit: 180, // 3 minutes
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-08 // REGISTER',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-TEC-11',
      rows: 5,
      cols: 5,
      clues: [
        { id: 'P1', r: 0, c: 2, area: 5 },
        { id: 'P2', r: 1, c: 1, area: 4 },
        { id: 'P3', r: 2, c: 3, area: 6 },
        { id: 'P4', r: 3, c: 0, area: 4 },
        { id: 'P5', r: 4, c: 3, area: 6 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 0, c2: 4, area: 5, clueId: 'P1' },
        { r1: 1, c1: 0, r2: 2, c2: 1, area: 4, clueId: 'P2' },
        { r1: 1, c1: 2, r2: 2, c2: 4, area: 6, clueId: 'P3' },
        { r1: 3, c1: 0, r2: 4, c2: 1, area: 4, clueId: 'P4' },
        { r1: 3, c1: 2, r2: 4, c2: 4, area: 6, clueId: 'P5' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:5X5:SOLVED',
      acceptedAnswers: ['PATCHES:5X5:SOLVED', '12', '0B1100'],
      hints: [
        'HINT 01 // A clue of 5 on a 5×5 board must be a full 1×5 row or 5×1 column — check which orientation avoids overlapping other clues.',
        'HINT 02 // Pair up the remaining 4 and 6 clues into symmetric 2-row horizontal bands.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-12',
    title: 'WEND (LEVEL 2)',
    category: 'TECHNICAL',
    description:
      'Turn FAIL into PASS one letter at a time using the step clues.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 800,
    reward: 1600,
    penalty: 300,
    timeLimit: 180, // 3 minutes
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-00 // RAFT_CORE',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'CORE_BRIDGE',
      maxHints: 2,
      clearanceCode: 'NX-TEC-12',
      startWord: 'FAIL',
      endWord: 'PASS',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Drop downward under gravity',
          hint: 'Change the third letter of FAIL to form a word meaning to drop downward.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Dark covering or cloak',
          hint: 'Change the starting letter to match the first letter of PASS.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Trusted friends or comrades',
          hint: 'Change the last letter to S to form a plural noun for close friends.',
          length: 4,
        },
      ],
      solutionSteps: ['FALL', 'PALL', 'PALS'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:FAIL-FALL-PALL-PALS-PASS',
      acceptedAnswers: [
        'WEND:FAIL-FALL-PALL-PALS-PASS',
        'FAIL-FALL-PALL-PALS-PASS',
        'FALL-PALL-PALS',
        '3',
        '3 NODES',
      ],
      hints: [
        'HINT 01 // First turn FAIL into a word ending with double-L, then change the first letter to P.',
        'HINT 02 // Step 3 is a 4-letter plural noun meaning friends, which is one letter away from PASS.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-13',
    title: 'N-QUEENS (5×5)',
    category: 'LOGIC',
    description:
      'Place 5 Queens on the 5×5 board so no two Queens share the same row, column, or diagonal.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 320,
    reward: 680,
    penalty: 90,
    timeLimit: 180, // 3 minutes
    gameType: 'queens',
    gameConfig: {
      sector: 'SECTOR-01 // CROWN MATRIX',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-LOG-13',
      size: 5,
      givenQueens: [{ r: 0, c: 1 }],
    },
    solutionConfig: {
      expectedAnswer: 'QUEENS:0,1;1,3;2,0;3,2;4,4',
      acceptedAnswers: [
        'QUEENS:0,1;1,3;2,0;3,2;4,4',
        'QUEENS:0,1;1,4;2,2;3,0;4,3',
      ],
      hints: [
        'HINT 01 // Place exactly one Queen in each row; check which columns in Row 2 are not attacked by the locked Queen in Row 1.',
        'HINT 02 // Stepping Queens by a knight-move offset (2 columns over, 1 row down) avoids immediate diagonal conflicts.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-14',
    title: 'N-QUEENS (6×6)',
    category: 'LOGIC',
    description:
      'Place 6 Queens on the 6×6 board so no two Queens share the same row, column, or diagonal.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 520,
    reward: 1050,
    penalty: 160,
    timeLimit: 240, // 4 minutes
    gameType: 'queens',
    gameConfig: {
      sector: 'SECTOR-01 // SOVEREIGN GRID',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-LOG-14',
      size: 6,
      givenQueens: [{ r: 0, c: 1 }],
    },
    solutionConfig: {
      expectedAnswer: 'QUEENS:0,1;1,3;2,5;3,0;4,2;5,4',
      acceptedAnswers: ['QUEENS:0,1;1,3;2,5;3,0;4,2;5,4'],
      hints: [
        'HINT 01 // On a 6×6 board, none of the four corner squares are used when a knight-step pattern starts from Row 1 Col B.',
        'HINT 02 // Group the board into the top 3 rows and bottom 3 rows, shifting Queens by 2 columns between consecutive rows in each half.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-15',
    title: 'APTITUDE: QUANT & SERIES',
    category: 'LOGIC',
    description:
      'Solve 4 rapid-fire quantitative aptitude problems covering number series, time & work, and ratios.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 650,
    penalty: 85,
    timeLimit: 150, // 2.5 minutes
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // QUANT ENGINE',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-LOG-15',
      roundTitle: 'APTITUDE // QUANTITATIVE & NUMERICAL',
      answerKey: ['C', 'B', 'A', 'C'],
      questions: [
        {
          id: 'Q1',
          topic: 'NUMBER SERIES',
          question: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
          options: ['95', '125', '127', '131'],
        },
        {
          id: 'Q2',
          topic: 'TIME & WORK',
          question:
            'Node A processes a batch in 12 minutes and Node B processes the same batch in 6 minutes. Working together, how long will they take?',
          options: ['3 minutes', '4 minutes', '4.5 minutes', '5 minutes'],
        },
        {
          id: 'Q3',
          topic: 'PERCENTAGE CHANGE',
          question:
            'A server increases its clock speed by 25% and then reduces it by 20%. What is the net percentage change?',
          options: ['0% (No change)', '+5% increase', '-5% decrease', '+2% increase'],
        },
        {
          id: 'Q4',
          topic: 'SPEED & DISTANCE',
          question:
            'A signal drone covers 120 meters in 6 seconds. What is its speed in km/h?',
          options: ['54 km/h', '60 km/h', '72 km/h', '80 km/h'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['C', 'B', 'A', 'C'],
      expectedAnswer: 'APTITUDE:C-B-A-C',
      acceptedAnswers: ['APTITUDE:C-B-A-C', 'C-B-A-C'],
      hints: [
        'HINT 01 // For Q1, check how the gap between consecutive numbers grows each step. For Q2, add the two per-minute rates (1/A + 1/B).',
        'HINT 02 // For Q3, multiply the two percentage multipliers together. For Q4, convert meters per second to km/h by multiplying by 3.6.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-16',
    title: 'APTITUDE: LOGIC & DEDUCTION',
    category: 'PUZZLES',
    description:
      'Solve 4 logical reasoning, coding-decoding, and probability aptitude problems.',
    difficulty: 'HIGH',
    risk: 'BALANCED',
    cost: 420,
    reward: 880,
    penalty: 120,
    timeLimit: 150, // 2.5 minutes
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-05 // DEDUCTION CORE',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'MONOLITH_GATE',
      maxHints: 2,
      clearanceCode: 'NX-PUZ-16',
      roundTitle: 'APTITUDE // LOGICAL DEDUCTION',
      answerKey: ['B', 'A', 'C', 'C'],
      questions: [
        {
          id: 'Q1',
          topic: 'CODING-DECODING',
          question:
            'If NEXUS is coded as OFYVT (each letter shifted +1 forward), how is LOGIC coded?',
          options: ['MPHJF', 'MPHJD', 'LPHJD', 'NQIKE'],
        },
        {
          id: 'Q2',
          topic: 'DIRECTION SENSE',
          question:
            'An operative walks 8 km North, turns Right and walks 6 km. How far is the operative in a straight line from the starting point?',
          options: ['10 km', '12 km', '14 km', '7 km'],
        },
        {
          id: 'Q3',
          topic: 'PROBABILITY',
          question:
            'Two fair coins are tossed simultaneously. What is the probability of getting at least one Head?',
          options: ['1/4', '1/2', '3/4', '2/3'],
        },
        {
          id: 'Q4',
          topic: 'ODD ONE OUT',
          question:
            'Which number does NOT belong in the group: 16, 25, 36, 48, 64, 81?',
          options: ['25', '36', '48', '64'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['B', 'A', 'C', 'C'],
      expectedAnswer: 'APTITUDE:B-A-C-C',
      acceptedAnswers: ['APTITUDE:B-A-C-C', 'B-A-C-C'],
      hints: [
        'HINT 01 // For Q1, pay close attention to the first and last letters when shifting forward by +1. For Q2, form a right triangle and use a² + b² = c².',
        'HINT 02 // For Q3, only one of the four coin-toss outcomes has zero Heads. For Q4, test which numbers are exact squares of whole numbers.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-17',
    title: 'GK: TECH & SCIENCE (6 T/F)',
    category: 'KNOWLEDGE',
    description:
      '1 Round of 6 rapid-fire True or False statements on Technology, Space & Science.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 240,
    reward: 500,
    penalty: 70,
    timeLimit: 90, // 1.5 minutes
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // VERITAS',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-KNW-17',
      roundTitle: 'ROUND 01 // 6× TRUE OR FALSE (TECH & SCIENCE)',
      answerKey: ['F', 'T', 'T', 'T', 'F', 'T'],
      questions: [
        {
          id: 'Q1',
          topic: 'WEB PROTOCOLS',
          statement:
            'HTTP Status Code 404 means the server crashed due to an internal error.',
        },
        {
          id: 'Q2',
          topic: 'ASTROPHYSICS',
          statement:
            'Sunlight takes approximately 8 minutes and 20 seconds to travel from the Sun to Earth.',
        },
        {
          id: 'Q3',
          topic: 'CHEMISTRY',
          statement: 'Diamond and Graphite are both pure allotropes of the element Carbon.',
        },
        {
          id: 'Q4',
          topic: 'NETWORKING',
          statement:
            'An IPv4 address uses 32 bits, while an IPv6 address uses 128 bits.',
        },
        {
          id: 'Q5',
          topic: 'PHYSICS',
          statement: 'Sound waves travel faster through air than they do through solid steel.',
        },
        {
          id: 'Q6',
          topic: 'COMPUTING',
          statement: 'One Byte consists of exactly 8 bits.',
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['F', 'T', 'T', 'T', 'F', 'T'],
      expectedAnswer: 'GKTF:F-T-T-T-F-T',
      acceptedAnswers: ['GKTF:F-T-T-T-F-T', 'F-T-T-T-F-T'],
      hints: [
        'HINT 01 // Distinguish 4xx client status codes from 5xx server error codes, and recall how medium density affects the speed of sound.',
        'HINT 02 // Exactly 4 of the 6 statements in this round are TRUE and 2 are FALSE.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-18',
    title: 'GK: WORLD & CYBER (6 T/F)',
    category: 'KNOWLEDGE',
    description:
      '1 Round of 6 rapid-fire True or False statements on World Facts, Computing & Cyber.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 340,
    reward: 720,
    penalty: 95,
    timeLimit: 90, // 1.5 minutes
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // GLOBAL ARCHIVE',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-KNW-18',
      roundTitle: 'ROUND 01 // 6× TRUE OR FALSE (WORLD & CYBER)',
      answerKey: ['T', 'T', 'F', 'T', 'T', 'F'],
      questions: [
        {
          id: 'Q1',
          topic: 'CYBERSECURITY',
          statement:
            'HTTPS encrypts communication between a browser and a website using TLS/SSL.',
        },
        {
          id: 'Q2',
          topic: 'WORLD GEOGRAPHY',
          statement: 'Australia is both a country and a continent.',
        },
        {
          id: 'Q3',
          topic: 'DATA STRUCTURES',
          statement: 'A Stack data structure operates on a First-In, First-Out (FIFO) principle.',
        },
        {
          id: 'Q4',
          topic: 'TECH HISTORY',
          statement: 'The Linux kernel was originally created by Linus Torvalds in 1991.',
        },
        {
          id: 'Q5',
          topic: 'HUMAN BIOLOGY',
          statement: 'The femur (thigh bone) is the longest and strongest bone in the human body.',
        },
        {
          id: 'Q6',
          topic: 'NUMBER SYSTEMS',
          statement: 'The binary representation of the decimal number 10 is 1100.',
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'T', 'F', 'T', 'T', 'F'],
      expectedAnswer: 'GKTF:T-T-F-T-T-F',
      acceptedAnswers: ['GKTF:T-T-F-T-T-F', 'T-T-F-T-T-F'],
      hints: [
        'HINT 01 // Compare Stack vs Queue ordering principles, and sum the 4-bit binary place values (8, 4, 2, 1) to check the binary statement.',
        'HINT 02 // Exactly 4 of the 6 statements in this round are TRUE and 2 are FALSE.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-19',
    title: 'MEMORY MATRIX (4×4)',
    category: 'OBSERVATION',
    description:
      'Observe the flashing signal nodes on the 4×4 matrix and reconstruct all 3 progressive recall patterns from memory.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 750,
    penalty: 100,
    timeLimit: 120, // 2 minutes
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // VISUAL_CORE',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'CYBER_CONSTRUCT',
      maxHints: 2,
      clearanceCode: 'NX-OBS-19',
      size: 4,
      maxReflashes: 2,
      rounds: [
        {
          id: 'R1',
          label: 'STAGE 01',
          count: 5,
          flashMs: 2200,
          targets: [1, 4, 6, 11, 13],
        },
        {
          id: 'R2',
          label: 'STAGE 02',
          count: 6,
          flashMs: 2200,
          targets: [0, 3, 5, 10, 12, 15],
        },
        {
          id: 'R3',
          label: 'STAGE 03',
          count: 7,
          flashMs: 2200,
          targets: [1, 2, 4, 7, 9, 13, 14],
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'MEMORY_MATRIX:1,4,6,11,13|0,3,5,10,12,15|1,2,4,7,9,13,14',
      acceptedAnswers: ['MEMORY_MATRIX:1,4,6,11,13|0,3,5,10,12,15|1,2,4,7,9,13,14'],
      hints: [
        'HINT 01 // Memorize the pattern by grouping illuminated tiles into rows or geometric shapes (corners, diagonals, or L-blocks) during the 2.2-second flash.',
        'HINT 02 // You have 2 RE-FLASH pulses available if you need to view the current stage pattern again.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-20',
    title: 'MEMORY MATRIX (5×5)',
    category: 'OBSERVATION',
    description:
      'High-density 5×5 spatial recall test: memorize and reconstruct 6, 7, and 8 flashing neural nodes across 3 consecutive stages.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 650,
    reward: 1400,
    penalty: 200,
    timeLimit: 150, // 2.5 minutes
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // NEURAL_LATTICE',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'FINAL_THRESHOLD',
      maxHints: 2,
      clearanceCode: 'NX-OBS-20',
      size: 5,
      maxReflashes: 2,
      rounds: [
        {
          id: 'R1',
          label: 'STAGE 01',
          count: 6,
          flashMs: 2400,
          targets: [1, 3, 7, 12, 17, 21],
        },
        {
          id: 'R2',
          label: 'STAGE 02',
          count: 7,
          flashMs: 2400,
          targets: [0, 4, 6, 12, 18, 20, 24],
        },
        {
          id: 'R3',
          label: 'STAGE 03',
          count: 8,
          flashMs: 2400,
          targets: [2, 5, 9, 11, 13, 15, 19, 22],
        },
      ],
    },
    solutionConfig: {
      expectedAnswer:
        'MEMORY_MATRIX:1,3,7,12,17,21|0,4,6,12,18,20,24|2,5,9,11,13,15,19,22',
      acceptedAnswers: [
        'MEMORY_MATRIX:1,3,7,12,17,21|0,4,6,12,18,20,24|2,5,9,11,13,15,19,22',
      ],
      hints: [
        'HINT 01 // Split the 5×5 grid mentally into a 3×3 inner core and an outer border ring to track node positions faster.',
        'HINT 02 // Each completed stage locks permanently — focus on one stage at a time and use RE-FLASH if a pattern slips.',
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

let challengesSeeded = false;
let challengesSeedPromise = null;
let cachedPublicCatalog = null;
let cachedPublicCatalogExpiresAt = 0;

export const ensureDefaultChallengesSeeded = async () => {
  if (mongoose.connection.readyState !== 1) return;
  if (challengesSeeded) return;
  if (challengesSeedPromise) return challengesSeedPromise;

  challengesSeedPromise = (async () => {
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
      challengesSeeded = true;
    } catch (err) {
      logger.warn('SEED', `Challenge catalog seed check warning: ${err.message}`);
    } finally {
      challengesSeedPromise = null;
    }
  })();

  return challengesSeedPromise;
};

export class ChallengeService {
  static invalidateCatalogCache() {
    cachedPublicCatalog = null;
    cachedPublicCatalogExpiresAt = 0;
  }

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

    const isUnfiltered = Object.keys(query).length === 1;
    if (isUnfiltered && cachedPublicCatalog && Date.now() < cachedPublicCatalogExpiresAt) {
      return cachedPublicCatalog;
    }

    if (mongoose.connection.readyState === 1) {
      const docs = await Challenge.find(query).sort({ cost: 1, challengeId: 1 }).lean();
      if (docs.length > 0 || !isUnfiltered) {
        const sanitized = docs.map((d) => sanitizePublicChallenge(d));
        if (isUnfiltered) {
          cachedPublicCatalog = sanitized;
          cachedPublicCatalogExpiresAt = Date.now() + 3000;
        }
        return sanitized;
      }
    }

    const fallbackList = DEFAULT_CHALLENGE_CATALOG.filter((c) => {
      if (!c.enabled) return false;
      if (query.category && c.category !== query.category) return false;
      if (query.difficulty && c.difficulty !== query.difficulty) return false;
      if (query.risk && c.risk !== query.risk) return false;
      return true;
    }).map((c) => sanitizePublicChallenge(c));

    if (isUnfiltered) {
      cachedPublicCatalog = fallbackList;
      cachedPublicCatalogExpiresAt = Date.now() + 3000;
    }
    return fallbackList;
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
  static async acquireChallengeForTeam({
    teamDoc,
    teamId,
    challengeId,
    isReattemptRequested,
    buyOnly = false,
    operative = null,
  }) {
    const resolvedTeamId = String(teamDoc?.teamId || teamId || '')
      .trim()
      .toUpperCase();
    const acqLockKey = resolvedTeamId || 'UNKNOWN_TEAM';

    if (ChallengeService._acquisitionLocks.has(acqLockKey)) {
      const err = new Error(
        'Simultaneous challenge purchase blocked: another squad member is currently acquiring a module.'
      );
      err.statusCode = 409;
      err.code = 'SIMULTANEOUS_PURCHASE_BLOCKED';
      throw err;
    }

    ChallengeService._acquisitionLocks.add(acqLockKey);

    try {
      const team =
        teamDoc ||
        (await Team.findOne({
          teamId: resolvedTeamId,
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

      if (!Array.isArray(team.purchasedChallenges)) {
        team.purchasedChallenges = [];
      }
      if (!Array.isArray(team.activeAttempts)) {
        team.activeAttempts = [];
      }

      // Ensure legacy activeAttempt is reflected in activeAttempts
      if (
        team.activeAttempt &&
        team.activeAttempt.status === 'IN_PROGRESS' &&
        team.activeAttempt.challengeId &&
        !team.activeAttempts.some(
          (a) =>
            String(a.challengeId).toUpperCase() ===
            String(team.activeAttempt.challengeId).toUpperCase()
        )
      ) {
        team.activeAttempts.unshift(
          typeof team.activeAttempt.toObject === 'function'
            ? team.activeAttempt.toObject()
            : { ...team.activeAttempt }
        );
      }

      const existingPurchasedEntry = team.purchasedChallenges.find(
        (c) => String(c.challengeId).toUpperCase() === challenge.challengeId
      );
      const existingActiveIndex = team.activeAttempts.findIndex(
        (a) =>
          a.status === 'IN_PROGRESS' &&
          String(a.challengeId).toUpperCase() === challenge.challengeId
      );
      const isCurrentlyActive = existingActiveIndex !== -1;
      const alreadyPurchased = Boolean(existingPurchasedEntry || isCurrentlyActive);

      const resolvedMemberId = String(operative?.memberId || '').trim() || null;
      const resolvedMemberName = String(operative?.memberName || operative?.name || '').trim() || null;

      // If buyOnly was requested on a challenge already owned by the team, block duplicate purchase
      if (buyOnly && alreadyPurchased) {
        const err = new Error(
          `Challenge [${challenge.title}] is already purchased by your team and ready to solve.`
        );
        err.statusCode = 409;
        err.code = 'CHALLENGE_ALREADY_PURCHASED';
        throw err;
      }

      // If starting/opening a challenge that is already in activeAttempts, return it directly (updating operative if needed)
      if (!buyOnly && isCurrentlyActive) {
        const matchedAttempt = team.activeAttempts[existingActiveIndex];
        if (resolvedMemberId && !matchedAttempt.assignedMemberId) {
          matchedAttempt.assignedMemberId = resolvedMemberId;
          matchedAttempt.assignedMemberName = resolvedMemberName;
          team.markModified('activeAttempts');
          await team.save();
        }
        return {
          team,
          challenge,
          creditResult: null,
          activeAttempt: matchedAttempt,
        };
      }

      const wasFailed = (team.failedChallenges || []).some(
        (c) => c.challengeId === challenge.challengeId
      );

      let priorAttemptsCount = wasFailed ? 1 : 0;
      if (mongoose.connection.readyState === 1) {
        const dbPriorCount = await ChallengeAttempt.countDocuments({
          teamId: team.teamId,
          challengeId: challenge.challengeId,
        }).catch(() => 0);
        priorAttemptsCount = Math.max(priorAttemptsCount, dbPriorCount);
      }

      const attemptNumber = alreadyPurchased
        ? Number(existingPurchasedEntry?.attemptNumber || priorAttemptsCount || 1)
        : priorAttemptsCount + 1;
      const isReattempt = Boolean(priorAttemptsCount > 0 || wasFailed || isReattemptRequested);

      const normalizedRisk = normalizeRiskTier(challenge.risk);
      const now = new Date();
      const timeLimitSeconds = Number(challenge.timeLimit) || 1200;

      let effectiveCost = Number(existingPurchasedEntry?.cost ?? challenge.cost ?? 0);
      let creditResult = null;

      // Only deduct team credits if this challenge is not already purchased by the team
      if (!alreadyPurchased) {
        effectiveCost = isReattempt
          ? creditsConfig.calculateReattemptCost(challenge.cost, Math.max(1, priorAttemptsCount))
          : Number(challenge.cost || 0);
        const txType = isReattempt
          ? CREDIT_TRANSACTION_TYPES.REATTEMPT
          : CREDIT_TRANSACTION_TYPES.CHALLENGE_PURCHASE;

        creditResult = await CreditService.recordTransaction({
          teamDoc: team,
          type: txType,
          amount: effectiveCost,
          relatedChallenge: {
            challengeId: challenge.challengeId,
            title: challenge.title,
            category: challenge.category,
          },
          summary: isReattempt
            ? `REATTEMPT #${attemptNumber} PURCHASED: ${challenge.title} (-${effectiveCost} CR)`
            : buyOnly
              ? `CHALLENGE PURCHASED (SAVED FOR LATER): ${challenge.title} (-${effectiveCost} CR)`
              : `CHALLENGE ACQUIRED: ${challenge.title} (-${effectiveCost} CR)`,
          autoSaveTeam: false,
        });

        if (isReattempt) {
          team.stats.reattemptsCount = Number(team.stats.reattemptsCount || 0) + 1;
        }

        applyTeamRiskTelemetry(team, {
          risk: normalizedRisk,
          attemptIncrement: 1,
          creditsLost: effectiveCost,
          setActiveRiskProfile: !buyOnly,
        });

        // Add to team's shared purchasedChallenges pool
        team.purchasedChallenges.unshift({
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
          attemptNumber,
          purchasedByMemberId: resolvedMemberId,
          purchasedByMemberName: resolvedMemberName,
          timestamp: now,
        });
        team.markModified('purchasedChallenges');

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.PURCHASE,
          actorType: 'TEAM',
          actorId: team.teamId,
          teamId: team.teamId,
          challengeId: challenge.challengeId,
          attemptNumber,
          creditsDelta: -effectiveCost,
          balanceAfter: team.credits,
          summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} purchased ${
            isReattempt ? `reattempt #${attemptNumber}` : 'challenge'
          } [${challenge.challengeId}] ${challenge.title} for ${effectiveCost} CR${
            buyOnly ? ' (saved for later)' : ''
          }`,
          metadata: {
            baseCost: challenge.cost,
            effectiveCost,
            isReattempt,
            attemptNumber,
            buyOnly,
            risk: normalizedRisk,
            memberId: resolvedMemberId,
            memberName: resolvedMemberName,
          },
        });
      }

      // If buyOnly is true, save team without starting/overwriting activeAttempt
      if (buyOnly) {
        await team.save();
        return {
          team,
          challenge,
          creditResult,
          activeAttempt: team.activeAttempt,
        };
      }

      const expiresAt = new Date(now.getTime() + timeLimitSeconds * 1000);
      const attemptId = `ATT-${Date.now().toString().slice(-5)}-${Math.random()
        .toString(36)
        .slice(2, 5)
        .toUpperCase()}`;

      // Method B: Assign a per-team randomized variant / question pool draw
      const fullChallengeForVariant =
        (await ChallengeService.getChallengeById(challenge.challengeId, {
          includeSolution: true,
        })) || challenge;
      const assignedVariant = assignVariantForTeamAttempt(fullChallengeForVariant, {
        teamId: team.teamId,
        attemptNumber,
      });

      const sessionGameConfig = assignedVariant.gameConfig || challenge.gameConfig || {};
      const sessionSolutionConfig =
        assignedVariant.solutionConfig || fullChallengeForVariant?.solutionConfig || {};
      const sessionDescription =
        sessionGameConfig.variantDescription || challenge.description;

      team.currentChallenge = {
        challengeId: challenge.challengeId,
        title: challenge.title,
        category: challenge.category,
        description: sessionDescription,
        difficulty: challenge.difficulty,
        risk: normalizedRisk,
        cost: effectiveCost,
        reward: challenge.reward,
        penalty: challenge.penalty || 100,
        timeLimit: timeLimitSeconds,
        gameType: challenge.gameType,
        gameConfig: sessionGameConfig,
        enabled: challenge.enabled,
        available: challenge.available,
        timestamp: now,
      };

      const maxHints = Number(
        sessionSolutionConfig?.hints?.length || sessionGameConfig?.maxHints || 2
      );

      const newAttemptObj = {
        attemptId,
        attemptNumber,
        variantId: assignedVariant.variantId || 'DEFAULT',
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
        gameConfig: sessionGameConfig,
        solutionConfig: sessionSolutionConfig,
        maxHints,
        hintsUnlocked: 0,
        unlockedHints: [],
        extraTimeMinutes: 0,
        activeAbilities: [],
        isReattempt,
        assignedMemberId: resolvedMemberId,
        assignedMemberName: resolvedMemberName,
        startedAt: now,
        expiresAt,
        status: 'IN_PROGRESS',
      };

      team.activeAttempt = newAttemptObj;

      // Keep other teammates' concurrent attempts in activeAttempts while adding/replacing this challenge
      team.activeAttempts = (team.activeAttempts || []).filter(
        (a) => String(a.challengeId).toUpperCase() !== challenge.challengeId
      );
      team.activeAttempts.unshift(newAttemptObj);
      team.markModified('activeAttempts');

      await team.save();

      if (mongoose.connection.readyState === 1) {
        await ChallengeAttempt.create({
          attemptId,
          attemptNumber,
          teamId: team.teamId,
          challengeId: challenge.challengeId,
          title: challenge.title,
          category: challenge.category,
          difficulty: challenge.difficulty,
          risk: normalizedRisk,
          gameType: challenge.gameType,
          gameConfig: sessionGameConfig,
          costPaid: effectiveCost,
          potentialReward: challenge.reward,
          penaltyOnFail: challenge.penalty || 100,
          rewardPenaltyDelta: 0,
          timeLimit: timeLimitSeconds,
          hintsUnlocked: 0,
          unlockedHints: [],
          extraTimeMinutes: 0,
          isReattempt,
          assignedMemberId: resolvedMemberId,
          assignedMemberName: resolvedMemberName,
          startedAt: now,
          expiresAt,
          result: 'IN_PROGRESS',
          status: 'IN_PROGRESS',
          timestamp: now,
        }).catch((err) => {
          logger.warn('SESSION', `ChallengeAttempt record warning: ${err.message}`);
        });
      }

      await AuditService.record({
        action: AUDIT_ACTION_TYPES.START,
        actorType: 'TEAM',
        actorId: team.teamId,
        teamId: team.teamId,
        challengeId: challenge.challengeId,
        attemptId,
        attemptNumber,
        creditsDelta: 0,
        balanceAfter: team.credits,
        summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} started session [${attemptId}] (Attempt #${attemptNumber}, Variant: ${assignedVariant.variantId || 'DEFAULT'}) on [${challenge.challengeId}]`,
        metadata: {
          startedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          timeLimit: timeLimitSeconds,
          variantId: assignedVariant.variantId || 'DEFAULT',
          memberId: resolvedMemberId,
          memberName: resolvedMemberName,
        },
      });

      return {
        team,
        challenge: {
          ...challenge,
          description: sessionDescription,
          gameConfig: sessionGameConfig,
        },
        creditResult,
        activeAttempt: newAttemptObj,
      };
    } finally {
      ChallengeService._acquisitionLocks.delete(acqLockKey);
    }
  }

  /**
   * Helper to resolve a specific active attempt from team.activeAttempts or team.activeAttempt
   */
  static findTargetActiveAttempt(team, requestedChallengeId = null) {
    if (!team) return null;
    const normalizedId = String(requestedChallengeId || '').trim().toUpperCase();
    if (normalizedId && Array.isArray(team.activeAttempts)) {
      const match = team.activeAttempts.find(
        (a) => String(a.challengeId || '').toUpperCase() === normalizedId
      );
      if (match) return match;
    }
    if (
      normalizedId &&
      team.activeAttempt &&
      String(team.activeAttempt.challengeId || '').toUpperCase() === normalizedId
    ) {
      return team.activeAttempt;
    }
    return team.activeAttempt || team.activeAttempts?.[0] || null;
  }

  /**
   * Server-controlled validation before charging credits for a Hint:
   * - Requires an active challenge session
   * - Ensures locked hint strings are NEVER exposed before purchase
   * - Prevents charging credits if all available hints are already unlocked
   */
  static async validateHintPurchaseEligibility(team, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    const activeId = targetAttempt?.challengeId || team?.currentChallenge?.challengeId;
    if (!activeId || !targetAttempt) {
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
    const hintsPool =
      (Array.isArray(targetAttempt.solutionConfig?.hints) &&
      targetAttempt.solutionConfig.hints.length > 0
        ? targetAttempt.solutionConfig.hints
        : fullChallenge?.solutionConfig?.hints) || [
        `HINT 01 // Verify the target syntax and constraints in ${targetAttempt.title || activeId}.`,
        `HINT 02 // Cross-check the sector reference telemetry in the module header.`,
      ];

    const currentUnlockedCount = Array.isArray(targetAttempt.unlockedHints)
      ? targetAttempt.unlockedHints.length
      : Number(targetAttempt.hintsUnlocked || 0);

    if (currentUnlockedCount >= hintsPool.length) {
      const err = new Error(
        `All ${hintsPool.length} intelligence hints for ${targetAttempt.title || activeId} have already been decrypted.`
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
  static validateExtraTimeEligibility(team, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    if (!targetAttempt) {
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
  static async unlockNextHintForTeam(team, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    const activeId = targetAttempt?.challengeId || team.currentChallenge?.challengeId;
    if (!activeId || !targetAttempt) return null;

    const fullChallenge = await ChallengeService.getChallengeById(activeId, {
      includeSolution: true,
    });
    const hintsPool =
      (Array.isArray(targetAttempt.solutionConfig?.hints) &&
      targetAttempt.solutionConfig.hints.length > 0
        ? targetAttempt.solutionConfig.hints
        : fullChallenge?.solutionConfig?.hints) || [
        `HINT 01 // Verify the target syntax and constraints in ${targetAttempt.title || activeId}.`,
        `HINT 02 // Cross-check the sector reference telemetry in the module header.`,
      ];

    const existingHints = Array.isArray(targetAttempt?.unlockedHints)
      ? targetAttempt.unlockedHints
      : [];
    const currentCount = existingHints.length;
    const nextHint =
      hintsPool[Math.min(currentCount, hintsPool.length - 1)] ||
      `HINT // All available intelligence layers decrypted for ${activeId}.`;

    targetAttempt.maxHints = hintsPool.length;
    if (!existingHints.includes(nextHint)) {
      targetAttempt.unlockedHints = [...existingHints, nextHint];
    }
    targetAttempt.hintsUnlocked = targetAttempt.unlockedHints.length;

    if (
      team.activeAttempt &&
      String(team.activeAttempt.challengeId).toUpperCase() === String(activeId).toUpperCase()
    ) {
      team.activeAttempt.maxHints = targetAttempt.maxHints;
      team.activeAttempt.unlockedHints = targetAttempt.unlockedHints;
      team.activeAttempt.hintsUnlocked = targetAttempt.hintsUnlocked;
      team.markModified('activeAttempt');
    }
    team.markModified('activeAttempts');

    if (mongoose.connection.readyState === 1 && targetAttempt?.attemptId) {
      await ChallengeAttempt.findOneAndUpdate(
        { attemptId: targetAttempt.attemptId },
        {
          $set: {
            hintsUnlocked: targetAttempt.hintsUnlocked,
            unlockedHints: targetAttempt.unlockedHints,
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
  static async extendSessionTimerForTeam(team, extraMinutes = 5, requestedChallengeId = null) {
    const targetAttempt = ChallengeService.findTargetActiveAttempt(team, requestedChallengeId);
    if (!targetAttempt) return null;

    const addMs = Number(extraMinutes || 5) * 60 * 1000;
    const now = new Date();
    const currentExpires = targetAttempt.expiresAt
      ? new Date(targetAttempt.expiresAt)
      : new Date(now.getTime() + Number(targetAttempt.timeLimit || 1200) * 1000);

    const baseTime = currentExpires > now ? currentExpires : now;
    const nextExpiresAt = new Date(baseTime.getTime() + addMs);

    targetAttempt.extraTimeMinutes =
      Number(targetAttempt.extraTimeMinutes || 0) + Number(extraMinutes || 5);
    targetAttempt.timeLimit =
      Number(targetAttempt.timeLimit || 1200) + Number(extraMinutes || 5) * 60;
    targetAttempt.expiresAt = nextExpiresAt;

    if (
      team.activeAttempt &&
      String(team.activeAttempt.challengeId).toUpperCase() ===
        String(targetAttempt.challengeId).toUpperCase()
    ) {
      team.activeAttempt.extraTimeMinutes = targetAttempt.extraTimeMinutes;
      team.activeAttempt.timeLimit = targetAttempt.timeLimit;
      team.activeAttempt.expiresAt = nextExpiresAt;
      team.markModified('activeAttempt');
    }
    if (
      team.currentChallenge &&
      String(team.currentChallenge.challengeId).toUpperCase() ===
        String(targetAttempt.challengeId).toUpperCase()
    ) {
      team.currentChallenge.timeLimit = targetAttempt.timeLimit;
      team.markModified('currentChallenge');
    }
    team.markModified('activeAttempts');

    if (mongoose.connection.readyState === 1 && targetAttempt.attemptId) {
      await ChallengeAttempt.findOneAndUpdate(
        { attemptId: targetAttempt.attemptId },
        {
          $set: {
            extraTimeMinutes: targetAttempt.extraTimeMinutes,
            timeLimit: targetAttempt.timeLimit,
            expiresAt: nextExpiresAt,
          },
        }
      ).catch(() => {});
    }

    return {
      startedAt: targetAttempt.startedAt,
      expiresAt: nextExpiresAt,
      timeLimit: targetAttempt.timeLimit,
      extraTimeMinutes: targetAttempt.extraTimeMinutes,
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
    operative = null,
  }) {
    const resolvedTeamId = String(teamDoc?.teamId || teamId || '')
      .trim()
      .toUpperCase();
    const lockChallengeSuffix = String(challengeId || attemptId || 'ACTIVE')
      .trim()
      .toUpperCase();
    const teamLockKey = `${resolvedTeamId}:${lockChallengeSuffix}:SUBMIT`;

    if (ChallengeService._submissionLocks.has(teamLockKey)) {
      const err = new Error(
        'Duplicate submission blocked: NEXUS Core is currently evaluating this session.'
      );
      err.statusCode = 409;
      err.code = 'DUPLICATE_SUBMISSION_IN_FLIGHT';
      throw err;
    }

    ChallengeService._submissionLocks.add(teamLockKey);

    try {
      const team =
        teamDoc ||
        (await Team.findOne({
          teamId: resolvedTeamId,
        }));

      if (!team) {
        const err = new Error('Team not found.');
        err.statusCode = 404;
        throw err;
      }

      // Resolve the specific active attempt from activeAttempts or activeAttempt
      const requestedIdUpper = String(challengeId || '').trim().toUpperCase();
      const requestedAttemptId = String(attemptId || '').trim();

      let matchedAttemptDoc = null;
      if (Array.isArray(team.activeAttempts) && team.activeAttempts.length > 0) {
        if (requestedAttemptId) {
          matchedAttemptDoc = team.activeAttempts.find(
            (a) => String(a.attemptId || '').trim() === requestedAttemptId
          );
        }
        if (!matchedAttemptDoc && requestedIdUpper) {
          matchedAttemptDoc = team.activeAttempts.find(
            (a) => String(a.challengeId || '').toUpperCase() === requestedIdUpper
          );
        }
      }
      if (!matchedAttemptDoc && team.activeAttempt) {
        if (
          !requestedIdUpper ||
          String(team.activeAttempt.challengeId || '').toUpperCase() === requestedIdUpper
        ) {
          matchedAttemptDoc = team.activeAttempt;
        }
      }
      if (!matchedAttemptDoc && Array.isArray(team.activeAttempts) && team.activeAttempts.length > 0) {
        matchedAttemptDoc = team.activeAttempts[0];
      }

      // Prevent duplicate submission if no active session exists
      if (!matchedAttemptDoc && !team.activeAttempt && !team.currentChallenge) {
        const err = new Error(
          'Duplicate or stale submission blocked: no active challenge session is in progress.'
        );
        err.statusCode = 409;
        err.code = 'DUPLICATE_SUBMISSION_BLOCKED';
        throw err;
      }

      const activeAttemptSnapshot = matchedAttemptDoc
        ? typeof matchedAttemptDoc.toObject === 'function'
          ? matchedAttemptDoc.toObject()
          : { ...matchedAttemptDoc }
        : null;

      const resolvedAttemptId =
        activeAttemptSnapshot?.attemptId || attemptId || `ATT-${Date.now().toString().slice(-5)}`;
      const targetChallengeId =
        activeAttemptSnapshot?.challengeId ||
        challengeId ||
        team.currentChallenge?.challengeId ||
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

      // Merge per-team assigned variant gameConfig & solutionConfig so validation checks the team's exact question pool draw
      const attemptGameConfig =
        activeAttemptSnapshot?.gameConfig && Object.keys(activeAttemptSnapshot.gameConfig).length > 0
          ? { ...(fullChallenge.gameConfig || {}), ...activeAttemptSnapshot.gameConfig }
          : fullChallenge.gameConfig || {};

      const attemptSolutionConfig =
        activeAttemptSnapshot?.solutionConfig &&
        Object.keys(activeAttemptSnapshot.solutionConfig).length > 0
          ? { ...(fullChallenge.solutionConfig || {}), ...activeAttemptSnapshot.solutionConfig }
          : { ...(fullChallenge.solutionConfig || {}) };

      if (
        Array.isArray(attemptGameConfig.answerKey) &&
        attemptGameConfig.answerKey.length > 0 &&
        (!Array.isArray(attemptSolutionConfig.expectedAnswers) ||
          attemptSolutionConfig.expectedAnswers.length === 0)
      ) {
        attemptSolutionConfig.expectedAnswers = attemptGameConfig.answerKey;
      }

      const effectiveChallenge = {
        ...fullChallenge,
        gameConfig: attemptGameConfig,
        solutionConfig: attemptSolutionConfig,
      };
      const assignedVariantId =
        activeAttemptSnapshot?.variantId || attemptGameConfig?.variantId || 'DEFAULT';

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
      const solveDurationSeconds = Math.max(
        0,
        Math.round((now.getTime() - startedAt.getTime()) / 1000)
      );

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

      const hasStructuredGamePayload =
        typeof submission === 'object' &&
        submission !== null &&
        Boolean(
          submission.grid ||
            submission.board ||
            submission.words ||
            submission.steps ||
            submission.patches ||
            submission.path ||
            submission.queens ||
            submission.answers ||
            submission.rounds
        );

      const isAdminForceSuccess = outcomeOverride === 'SUCCESS';
      if (
        !rawAnswer &&
        !hasStructuredGamePayload &&
        !simulateFailure &&
        !isTimeout &&
        !isAbandoned &&
        !isAdminForceSuccess
      ) {
        const err = new Error('Submission payload cannot be empty.');
        err.statusCode = 400;
        err.code = 'EMPTY_SUBMISSION';
        throw err;
      }

      const attemptNumber = Math.max(1, Number(activeAttemptSnapshot?.attemptNumber || 1));
      const costPaid = Number(activeAttemptSnapshot?.costPaid ?? fullChallenge.cost ?? 0);
      const resolvedMemberId =
        String(operative?.memberId || activeAttemptSnapshot?.assignedMemberId || '').trim() || null;
      const resolvedMemberName =
        String(
          operative?.memberName ||
            operative?.name ||
            activeAttemptSnapshot?.assignedMemberName ||
            ''
        ).trim() || null;

      const normalizedSubmitted = rawAnswer.toUpperCase().replace(/\s+/g, ' ').trim();
      const expected = String(effectiveChallenge.solutionConfig?.expectedAnswer || '')
        .toUpperCase()
        .trim();
      const acceptedList = (effectiveChallenge.solutionConfig?.acceptedAnswers || [expected]).map(
        (a) => String(a).toUpperCase().trim()
      );

      // Server-authoritative correctness check via GameRegistry + accepted answer tokens
      const isExplicitFail =
        !isAdminForceSuccess &&
        (Boolean(simulateFailure) ||
          normalizedSubmitted.includes('FAIL:') ||
          normalizedSubmitted === 'FAIL' ||
          isTimeout ||
          isAbandoned);

      const gameRegistryEvaluation = !isExplicitFail
        ? evaluateGameSubmissionServer(submission, effectiveChallenge)
        : { valid: false };

      const isAnswerMatch =
        isAdminForceSuccess ||
        (!isExplicitFail &&
          (Boolean(gameRegistryEvaluation?.valid) ||
            acceptedList.includes(normalizedSubmitted) ||
            (expected && normalizedSubmitted === expected) ||
            (expected && normalizedSubmitted === `NEXUS{${expected}}`) ||
            normalizedSubmitted === 'NEXUS{CORE_SYNCHRONIZED_2026}'));

      const passed = Boolean(isAnswerMatch);
      const relatedChallenge = {
        challengeId: fullChallenge.challengeId,
        title: fullChallenge.title,
        category: fullChallenge.category,
      };

      await AuditService.record({
        action: AUDIT_ACTION_TYPES.SUBMISSION,
        actorType: 'TEAM',
        actorId: team.teamId,
        teamId: team.teamId,
        challengeId: fullChallenge.challengeId,
        attemptId: resolvedAttemptId,
        attemptNumber,
        creditsDelta: 0,
        balanceAfter: team.credits,
        summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} submitted solution for [${fullChallenge.challengeId}] ${fullChallenge.title} (Attempt #${attemptNumber}, ${solveDurationSeconds}s)`,
        metadata: {
          attemptId: resolvedAttemptId,
          attemptNumber,
          variantId: assignedVariantId,
          title: fullChallenge.title,
          difficulty: fullChallenge.difficulty,
          gameType: fullChallenge.gameType,
          solveDurationSeconds,
          timeLimit,
          cost: costPaid,
          isTimeout,
          isAbandoned,
          memberId: resolvedMemberId,
          memberName: resolvedMemberName,
        },
      });

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
          summary: `CHALLENGE SOLVED${resolvedMemberName ? ` (${resolvedMemberName})` : ''}: ${fullChallenge.title} (+${reward} CR)`,
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
          cost: costPaid,
          reward,
          penalty: fullChallenge.penalty,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          timeLimit: fullChallenge.timeLimit,
          gameType: fullChallenge.gameType,
          attemptNumber,
          solvedByMemberId: resolvedMemberId,
          solvedByMemberName: resolvedMemberName,
          timestamp: now,
        });

        // Remove from failedChallenges if it was previously failed and now solved
        team.failedChallenges = (team.failedChallenges || []).filter(
          (f) => f.challengeId !== fullChallenge.challengeId
        );

        evaluationResult = {
          attemptId: resolvedAttemptId,
          attemptNumber,
          passed: true,
          result: 'SUCCESS',
          status: 'SUCCESS',
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          gameType: fullChallenge.gameType,
          cost: costPaid,
          submittedAnswer: rawAnswer || '[ADMIN_ADJUDICATED_PASS]',
          creditsDelta: reward,
          rewardGranted: reward,
          penaltyApplied: 0,
          balanceAfter: team.credits,
          coreProgressDelta: progressDelta,
          coreProgressAfter: nextProgress,
          solvedByMemberId: resolvedMemberId,
          solvedByMemberName: resolvedMemberName,
          startedAt: startedAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          submittedAt: now.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
          solveDurationSeconds,
          message: `VERIFIED BY NEXUS CORE // Solution accepted for ${fullChallenge.title}. +${reward} CR credited to squad ledger.`,
          timestamp: now.toISOString(),
        };

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.SUCCESS,
          actorType: 'TEAM',
          actorId: team.teamId,
          teamId: team.teamId,
          challengeId: fullChallenge.challengeId,
          attemptId: resolvedAttemptId,
          attemptNumber,
          creditsDelta: reward,
          balanceAfter: team.credits,
          summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} succeeded on [${fullChallenge.challengeId}] ${fullChallenge.title} in ${solveDurationSeconds}s (Attempt #${attemptNumber}, +${reward} CR)`,
          metadata: {
            cost: costPaid,
            reward,
            attemptNumber,
            variantId: assignedVariantId,
            title: fullChallenge.title,
            difficulty: fullChallenge.difficulty,
            gameType: fullChallenge.gameType,
            solveDurationSeconds,
            timeLimit,
            memberId: resolvedMemberId,
            memberName: resolvedMemberName,
          },
        });
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
            cost: costPaid,
            reward: fullChallenge.reward,
            penalty,
            difficulty: fullChallenge.difficulty,
            risk: normalizedRisk,
            timeLimit: fullChallenge.timeLimit,
            gameType: fullChallenge.gameType,
            attemptNumber,
            timestamp: now,
          });
        }

        const validatorReasonDetail =
          canonicalFailStatus === 'FAILED' && gameRegistryEvaluation?.reason
            ? `${gameRegistryEvaluation.reason} `
            : '';

        const statusMessage =
          canonicalFailStatus === 'TIMEOUT'
            ? `SESSION TIMEOUT // Server timer expired for ${fullChallenge.title}. -${penalty} CR penalty applied.`
            : canonicalFailStatus === 'ABANDONED'
              ? `SESSION ABANDONED // Operative aborted active session for ${fullChallenge.title}. -${penalty} CR penalty applied.`
              : `VERIFICATION FAILED // ${validatorReasonDetail}Submitted payload rejected for ${fullChallenge.title}. -${penalty} CR penalty applied.`;

        evaluationResult = {
          attemptId: resolvedAttemptId,
          attemptNumber,
          passed: false,
          result: canonicalFailStatus,
          status: canonicalFailStatus,
          challengeId: fullChallenge.challengeId,
          title: fullChallenge.title,
          category: fullChallenge.category,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          gameType: fullChallenge.gameType,
          cost: costPaid,
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
          submittedAt: now.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
          solveDurationSeconds,
          reason: gameRegistryEvaluation?.reason || null,
          message: statusMessage,
          timestamp: now.toISOString(),
        };

        await AuditService.record({
          action: AUDIT_ACTION_TYPES.FAILURE,
          actorType: 'TEAM',
          actorId: team.teamId,
          teamId: team.teamId,
          challengeId: fullChallenge.challengeId,
          attemptId: resolvedAttemptId,
          attemptNumber,
          creditsDelta: -penalty,
          balanceAfter: team.credits,
          summary: `${team.teamId}${resolvedMemberName ? ` (${resolvedMemberName})` : ''} failed [${fullChallenge.challengeId}] ${fullChallenge.title} with [${canonicalFailStatus}] (Attempt #${attemptNumber}, -${penalty} CR)`,
          metadata: {
            cost: costPaid,
            penalty,
            status: canonicalFailStatus,
            attemptNumber,
            variantId: assignedVariantId,
            title: fullChallenge.title,
            difficulty: fullChallenge.difficulty,
            gameType: fullChallenge.gameType,
            solveDurationSeconds,
            timeLimit,
            reason: gameRegistryEvaluation?.reason || null,
            memberId: resolvedMemberId,
            memberName: resolvedMemberName,
          },
        });
      }

      if (Array.isArray(team.purchasedChallenges)) {
        team.purchasedChallenges = team.purchasedChallenges.filter(
          (c) => String(c.challengeId).toUpperCase() !== fullChallenge.challengeId
        );
        team.markModified('purchasedChallenges');
      }

      if (Array.isArray(team.activeAttempts)) {
        team.activeAttempts = team.activeAttempts.filter(
          (a) => String(a.challengeId).toUpperCase() !== fullChallenge.challengeId
        );
        team.markModified('activeAttempts');
      }

      // Sync primary activeAttempt / currentChallenge to next remaining active attempt (if any)
      const nextRemainingAttempt = team.activeAttempts?.[0] || null;
      if (nextRemainingAttempt) {
        team.activeAttempt = nextRemainingAttempt;
        team.currentChallenge = {
          challengeId: nextRemainingAttempt.challengeId,
          title: nextRemainingAttempt.title,
          category: nextRemainingAttempt.category,
          difficulty: nextRemainingAttempt.difficulty,
          risk: nextRemainingAttempt.risk,
          cost: nextRemainingAttempt.costPaid,
          reward: nextRemainingAttempt.potentialReward,
          penalty: nextRemainingAttempt.penaltyOnFail,
          timeLimit: nextRemainingAttempt.timeLimit,
          gameType: nextRemainingAttempt.gameType,
          gameConfig: nextRemainingAttempt.gameConfig || {},
          timestamp: nextRemainingAttempt.startedAt || now,
        };
      } else {
        team.currentChallenge = null;
        team.activeAttempt = null;
      }
      await team.save();

      // Always record the attempt server-side in MongoDB (upsert ensures seed attempts are also saved)
      if (mongoose.connection.readyState === 1 && resolvedAttemptId) {
        await ChallengeAttempt.findOneAndUpdate(
          { attemptId: resolvedAttemptId },
          {
            $set: {
              attemptId: resolvedAttemptId,
              attemptNumber,
              teamId: team.teamId,
              challengeId: fullChallenge.challengeId,
              title: fullChallenge.title,
              category: fullChallenge.category,
              difficulty: fullChallenge.difficulty,
              risk: fullChallenge.risk,
              gameType: fullChallenge.gameType,
              gameConfig: activeAttemptSnapshot?.gameConfig || fullChallenge.gameConfig || {},
              costPaid,
              potentialReward: fullChallenge.reward,
              penaltyOnFail: fullChallenge.penalty || 100,
              rewardPenaltyDelta: evaluationResult.creditsDelta,
              timeLimit,
              hintsUnlocked: activeAttemptSnapshot?.hintsUnlocked || 0,
              unlockedHints: activeAttemptSnapshot?.unlockedHints || [],
              extraTimeMinutes: activeAttemptSnapshot?.extraTimeMinutes || 0,
              isReattempt: Boolean(activeAttemptSnapshot?.isReattempt),
              assignedMemberId: resolvedMemberId,
              assignedMemberName: resolvedMemberName,
              startedAt,
              expiresAt,
              submittedAt: now,
              completedAt: now,
              result: evaluationResult.status,
              status: evaluationResult.status,
              submission: submission ?? { outcome: evaluationResult.status },
              submittedPayload: submission ?? { outcome: evaluationResult.status },
              evaluationResult,
              timestamp: now,
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
      ChallengeService._submissionLocks.delete(teamLockKey);
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

ChallengeService._acquisitionLocks = new Set();
ChallengeService._submissionLocks = new Set();

export { SUPPORTED_GAME_TYPES };
export default ChallengeService;

