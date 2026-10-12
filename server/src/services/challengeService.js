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
          hint: 'Change the second vowel so the word ends with a double consonant.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Dark covering or cloak',
          hint: 'Change the starting letter to match the first letter of the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Trusted friends or comrades',
          hint: 'Make the word plural by changing the final letter.',
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
        'HINT 01 // First create a double-consonant ending in Step 1 before changing the initial letter in Step 2.',
        'HINT 02 // Step 3 is a plural noun for close friends that is one letter away from the target word.',
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
        'HINT 01 // On a 6×6 board, avoid placing Queens in the four extreme corners when starting near the top-left.',
        'HINT 02 // Group the board into the top 3 rows and bottom 3 rows, shifting Queens by a knight-like step between consecutive rows.',
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
        'HINT 02 // For Q3, list all four coin-toss outcomes and count how many include at least one Head. For Q4, test which numbers are exact squares.',
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
        'HINT 01 // Distinguish 4xx client status codes from 5xx server error codes when evaluating Web Protocols.',
        'HINT 02 // Consider how medium density (gas vs. solid metal) affects mechanical wave propagation speed.',
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
        'HINT 01 // Compare Stack (LIFO) vs Queue (FIFO) ordering principles carefully.',
        'HINT 02 // Sum the 4-bit binary place values (8, 4, 2, 1) to verify the binary conversion statement.',
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

  // ─────────────────────────────────────────────────────────────────
  // WORD GUESS — 6 additional variants (total 7)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-PUZ-WG-01',
    title: 'WORD GUESS // ALPHA BREACH',
    category: 'PUZZLES',
    description: 'Unscramble two 6-letter cyber terms from the scrambled tiles.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 420,
    penalty: 60,
    timeLimit: 150,
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // ALPHA_BREACH',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-WG-01',
      rounds: [
        {
          id: 'R1',
          word: 'PACKET',
          scrambled: 'T C E K P A',
          clue: 'A unit of data transmitted over a network (6 letters).',
          category: 'NETWORKING',
        },
        {
          id: 'R2',
          word: 'KERNEL',
          scrambled: 'L E K N R E',
          clue: 'The core component of an operating system (6 letters).',
          category: 'OPERATING SYSTEMS',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:PACKET-KERNEL',
      acceptedAnswers: ['WORDGUESS:PACKET-KERNEL', 'PACKET-KERNEL', 'PACKET', 'KERNEL'],
      hints: [
        'HINT 01 // Round 1: Think of the fundamental unit of network traffic inspected by firewalls and routers.',
        'HINT 02 // Round 2: The innermost layer of an operating system that bridges software and hardware.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-WG-02',
    title: 'WORD GUESS // BUFFER OVERRIDE',
    category: 'PUZZLES',
    description: 'Unscramble two 6-letter security and system terms.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 720,
    penalty: 100,
    timeLimit: 150,
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // BUFFER_OVERRIDE',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'PUZZLES',
      maxHints: 2,
      clearanceCode: 'NX-WG-02',
      rounds: [
        {
          id: 'R1',
          word: 'BINARY',
          scrambled: 'R B A Y N I',
          clue: 'Base-2 number system used by computers (6 letters).',
          category: 'COMPUTING',
        },
        {
          id: 'R2',
          word: 'TROJAN',
          scrambled: 'J N O R A T',
          clue: 'Malware disguised as legitimate software — named after a Greek myth (6 letters).',
          category: 'CYBERSECURITY',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:BINARY-TROJAN',
      acceptedAnswers: ['WORDGUESS:BINARY-TROJAN', 'BINARY-TROJAN', 'BINARY', 'TROJAN'],
      hints: [
        'HINT 01 // Round 1: Represents values using only two symbols (0 and 1).',
        'HINT 02 // Round 2: Named after the ancient siege story involving a hollow wooden horse.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-WG-03',
    title: 'WORD GUESS // SIGNAL BREACH',
    category: 'PUZZLES',
    description: 'Decode two 6-letter encryption and network terms from scrambled tiles.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 1050,
    penalty: 160,
    timeLimit: 150,
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // SIGNAL_BREACH',
      artworkKey: 'CREDITS_SPIRE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-WG-03',
      rounds: [
        {
          id: 'R1',
          word: 'BOTNET',
          scrambled: 'T E N B O T',
          clue: 'A network of compromised machines controlled by an attacker (6 letters).',
          category: 'CYBERSECURITY',
        },
        {
          id: 'R2',
          word: 'VECTOR',
          scrambled: 'R O T C V E',
          clue: 'The direction or method an attacker uses to gain unauthorized access (6 letters).',
          category: 'SECURITY',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:BOTNET-VECTOR',
      acceptedAnswers: ['WORDGUESS:BOTNET-VECTOR', 'BOTNET-VECTOR', 'BOTNET', 'VECTOR'],
      hints: [
        'HINT 01 // Round 1: A compound word combining automated "robot" agents with a "network".',
        'HINT 02 // Round 2: Also a mathematical term for a quantity that has both magnitude and direction.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-WG-04',
    title: 'WORD GUESS // DELTA DECODE',
    category: 'PUZZLES',
    description: 'Unscramble two 6-letter hardware and algorithm terms.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 650,
    penalty: 90,
    timeLimit: 150,
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // DELTA_DECODE',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-WG-04',
      rounds: [
        {
          id: 'R1',
          word: 'ROUTER',
          scrambled: 'U R O T E R',
          clue: 'Network device that forwards data packets between computer networks (6 letters).',
          category: 'NETWORKING',
        },
        {
          id: 'R2',
          word: 'STRUCT',
          scrambled: 'T U R S C T',
          clue: 'A composite data type that groups related fields (6 letters).',
          category: 'PROGRAMMING',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:ROUTER-STRUCT',
      acceptedAnswers: ['WORDGUESS:ROUTER-STRUCT', 'ROUTER-STRUCT', 'ROUTER', 'STRUCT'],
      hints: [
        'HINT 01 // Round 1: The Layer-3 networking device that directs traffic between your local network and the internet.',
        'HINT 02 // Round 2: A shortened 6-letter programming keyword derived from the word "structure".',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-WG-05',
    title: 'WORD GUESS // CIPHER STORM',
    category: 'PUZZLES',
    description: 'Unscramble two 6-letter cloud and database terms.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 450,
    penalty: 65,
    timeLimit: 150,
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // CIPHER_STORM',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'PUZZLES',
      maxHints: 2,
      clearanceCode: 'NX-WG-05',
      rounds: [
        {
          id: 'R1',
          word: 'SERVER',
          scrambled: 'R V E S E R',
          clue: 'A machine or program that provides services to other computers over a network (6 letters).',
          category: 'NETWORKING',
        },
        {
          id: 'R2',
          word: 'SCHEMA',
          scrambled: 'A E S H M C',
          clue: 'The structured blueprint defining the organization of a database (6 letters).',
          category: 'DATABASES',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:SERVER-SCHEMA',
      acceptedAnswers: ['WORDGUESS:SERVER-SCHEMA', 'SERVER-SCHEMA', 'SERVER', 'SCHEMA'],
      hints: [
        'HINT 01 // Round 1: The counterpart to a "client" in standard network architecture.',
        'HINT 02 // Round 2: Defines tables, fields, and relationships in a formal database blueprint.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-WG-06',
    title: 'WORD GUESS // NEXUS UNLOCK',
    category: 'PUZZLES',
    description: 'Unscramble two 6-letter OS and cybersecurity terms.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1400,
    penalty: 250,
    timeLimit: 150,
    gameType: 'wordGuess',
    gameConfig: {
      sector: 'SECTOR-05 // NEXUS_UNLOCK',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-WG-06',
      rounds: [
        {
          id: 'R1',
          word: 'DAEMON',
          scrambled: 'N O E D A M',
          clue: 'A background process in Unix/Linux systems that runs without user interaction (6 letters).',
          category: 'UNIX SYSTEMS',
        },
        {
          id: 'R2',
          word: 'INJECT',
          scrambled: 'J C T N I E',
          clue: 'To insert malicious code or data into a running process or query (6 letters).',
          category: 'CYBERSECURITY',
        },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'WORDGUESS:DAEMON-INJECT',
      acceptedAnswers: ['WORDGUESS:DAEMON-INJECT', 'DAEMON-INJECT', 'DAEMON', 'INJECT'],
      hints: [
        'HINT 01 // Round 1: Unix background services like sshd and httpd take their trailing "d" from this classical word.',
        'HINT 02 // Round 2: The root verb behind one of the most notorious SQL web vulnerabilities.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // SUDOKU — 4 additional variants (total 6)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-LOG-SU-01',
    title: 'SUDOKU (6×6) VARIANT B',
    category: 'LOGIC',
    description: 'Fill the 6×6 Sudoku grid so every row, column, and 2×3 block has numbers 1 to 6.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 700,
    penalty: 100,
    timeLimit: 180,
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-01 // GRID_BETA',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-SU-01',
      size: 6,
      boxRows: 2,
      boxCols: 3,
      initialGrid: [
        [0, 6, 2, 4, 1, 0],
        [4, 0, 1, 6, 0, 2],
        [6, 1, 0, 5, 2, 3],
        [2, 3, 5, 0, 6, 4],
        [5, 2, 6, 3, 0, 1],
        [0, 4, 3, 2, 5, 6],
      ],
      solutionGrid: [
        [3, 6, 2, 4, 1, 5],
        [4, 5, 1, 6, 3, 2],
        [6, 1, 4, 5, 2, 3],
        [2, 3, 5, 1, 6, 4],
        [5, 2, 6, 3, 4, 1],
        [1, 4, 3, 2, 5, 6],
      ],
    },
    solutionConfig: {
      expectedAnswer: 'SUDOKU:6X6:SOLVED',
      acceptedAnswers: ['SUDOKU:6X6:SOLVED', '362415-451632-614523-235164-526341-143256'],
      hints: [
        'HINT 01 // Start with rows and 2×3 blocks that already have five given numbers — only one digit from 1 to 6 is missing.',
        'HINT 02 // Cross-reference each empty cell by elimination using its row, column, and 2×3 block.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-SU-02',
    title: 'SUDOKU (6×6) VARIANT C',
    category: 'LOGIC',
    description: 'Fill the 6×6 Sudoku grid — each row, column, and 2×3 block must contain 1–6.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 480,
    reward: 960,
    penalty: 150,
    timeLimit: 180,
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-01 // GRID_GAMMA',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-SU-02',
      size: 6,
      boxRows: 2,
      boxCols: 3,
      initialGrid: [
        [0, 1, 0, 5, 0, 4],
        [5, 0, 4, 0, 1, 0],
        [1, 3, 0, 2, 0, 6],
        [0, 4, 6, 0, 3, 5],
        [4, 0, 1, 3, 0, 2],
        [3, 5, 0, 4, 6, 0],
      ],
      solutionGrid: [
        [6, 1, 3, 5, 2, 4],
        [5, 2, 4, 6, 1, 3],
        [1, 3, 5, 2, 4, 6],
        [2, 4, 6, 1, 3, 5],
        [4, 6, 1, 3, 5, 2],
        [3, 5, 2, 4, 6, 1],
      ],
    },
    solutionConfig: {
      expectedAnswer: 'SUDOKU:6X6:SOLVED',
      acceptedAnswers: ['SUDOKU:6X6:SOLVED', '613524-524613-135246-246135-461352-352461'],
      hints: [
        'HINT 01 // Note that alternate cells in each row are already filled — use exclusion on the missing pairs.',
        'HINT 02 // Each 2×3 box has at most 2 blanks; list the missing digits per box and eliminate using column constraints.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-SU-03',
    title: 'SUDOKU (9×9) VARIANT B',
    category: 'KNOWLEDGE',
    description: 'Solve the harder 9×9 Sudoku — every row, column, and 3×3 block must have 1 to 9.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1400,
    penalty: 250,
    timeLimit: 360,
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-09 // HYPERVISOR_B',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-SU-03',
      size: 9,
      boxRows: 3,
      boxCols: 3,
      initialGrid: [
        [0, 2, 0, 6, 0, 8, 0, 0, 0],
        [5, 8, 0, 0, 0, 9, 7, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
        [3, 7, 0, 0, 0, 0, 5, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 8, 0, 0, 0, 0, 1, 3],
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 9, 8, 0, 0, 0, 3, 6],
        [0, 0, 0, 3, 0, 6, 0, 9, 0],
      ],
      solutionGrid: [
        [1, 2, 3, 6, 7, 8, 9, 4, 5],
        [5, 8, 4, 2, 3, 9, 7, 6, 1],
        [9, 6, 7, 1, 4, 5, 3, 2, 8],
        [3, 7, 2, 4, 6, 1, 5, 8, 9],
        [6, 9, 1, 5, 8, 3, 2, 7, 4],
        [4, 5, 8, 7, 9, 2, 6, 1, 3],
        [8, 3, 6, 9, 2, 4, 1, 5, 7],
        [2, 1, 9, 8, 5, 7, 4, 3, 6],
        [7, 4, 5, 3, 1, 6, 8, 9, 2],
      ],
    },
    solutionConfig: {
      expectedAnswer: 'SUDOKU:9X9:SOLVED',
      acceptedAnswers: ['SUDOKU:9X9:SOLVED'],
      hints: [
        'HINT 01 // Focus on digits that appear most frequently across the board (like 6, 8, and 9) to place their remaining instances.',
        'HINT 02 // Use cross-hatching inside the outer 3×3 boxes before tackling the sparser center box.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-SU-04',
    title: 'SUDOKU (6×6) VARIANT D — EASY',
    category: 'LOGIC',
    description: 'Beginner 6×6 Sudoku — fill every row, column, and 2×3 block with 1 to 6.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 400,
    penalty: 60,
    timeLimit: 150,
    gameType: 'sudoku',
    gameConfig: {
      sector: 'SECTOR-01 // GRID_DELTA',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-SU-04',
      size: 6,
      boxRows: 2,
      boxCols: 3,
      initialGrid: [
        [2, 0, 4, 1, 6, 0],
        [1, 6, 0, 2, 0, 4],
        [3, 0, 1, 6, 5, 2],
        [6, 5, 2, 0, 4, 1],
        [5, 2, 0, 4, 1, 6],
        [0, 1, 6, 5, 2, 0],
      ],
      solutionGrid: [
        [2, 3, 4, 1, 6, 5],
        [1, 6, 5, 2, 3, 4],
        [3, 4, 1, 6, 5, 2],
        [6, 5, 2, 3, 4, 1],
        [5, 2, 3, 4, 1, 6],
        [4, 1, 6, 5, 2, 3],
      ],
    },
    solutionConfig: {
      expectedAnswer: 'SUDOKU:6X6:SOLVED',
      acceptedAnswers: ['SUDOKU:6X6:SOLVED', '234165-165234-341652-652341-523416-416523'],
      hints: [
        'HINT 01 // Start with rows 3, 4, and 5 — each is missing only a single digit from 1 to 6.',
        'HINT 02 // Verify each 2×3 box by checking which numbers from 1 to 6 are still absent.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // XO4x4 — 3 additional variants (total 4)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-PUZ-XO-01',
    title: '4×4 TIC-TAC-TOE — OMEGA',
    category: 'PUZZLES',
    description: 'Get 4 X marks in a row on the 4×4 board before the AI — higher AI skill.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 620,
    penalty: 90,
    timeLimit: 120,
    gameType: 'xo4x4',
    gameConfig: {
      sector: 'SECTOR-06 // OMEGA_GRID',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-XO-01',
      aiSkill: 'CALCULATED',
      subtitle: 'Align 4 X marks in any row, column, or diagonal before the AI on a 4×4 board.',
    },
    solutionConfig: {
      expectedAnswer: 'XO4X4:WIN',
      acceptedAnswers: ['XO4X4:WIN'],
      hints: [
        'HINT 01 // Build a fork by threatening two 4-in-a-row lines simultaneously so the AI can only block one.',
        'HINT 02 // Claim corners and center cells in the first 3 moves to maximize diagonal threat coverage.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-XO-02',
    title: '4×4 TIC-TAC-TOE — BLITZ',
    category: 'PUZZLES',
    description: 'Defeat the tactical AI on the 4×4 board — ultra-short time window.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 1000,
    penalty: 160,
    timeLimit: 90,
    gameType: 'xo4x4',
    gameConfig: {
      sector: 'SECTOR-06 // BLITZ_VAULT',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'PUZZLES',
      maxHints: 2,
      clearanceCode: 'NX-XO-02',
      aiSkill: 'TACTICAL',
      subtitle: 'Beat the AI in under 90 seconds — build a 4-in-a-row before it does.',
    },
    solutionConfig: {
      expectedAnswer: 'XO4X4:WIN',
      acceptedAnswers: ['XO4X4:WIN'],
      hints: [
        'HINT 01 // Control interior intersection cells first — each interior cell participates in a row, column, and diagonal.',
        'HINT 02 // Force the AI onto the defensive by creating 3-in-a-row threats before it can link its own marks.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-XO-03',
    title: '4×4 TIC-TAC-TOE — RECON',
    category: 'LOGIC',
    description: 'Outsmart the AI in the 4×4 grid — observation-focused variant.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 650,
    reward: 1300,
    penalty: 220,
    timeLimit: 90,
    gameType: 'xo4x4',
    gameConfig: {
      sector: 'SECTOR-06 // RECON_ARRAY',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-XO-03',
      aiSkill: 'TACTICAL',
      subtitle: 'Plan 2 moves ahead and connect 4 before the AI blocks every line.',
    },
    solutionConfig: {
      expectedAnswer: 'XO4X4:WIN',
      acceptedAnswers: ['XO4X4:WIN'],
      hints: [
        'HINT 01 // Aim for a double-threat fork where a single X placement completes two separate 3-in-a-row lines.',
        'HINT 02 // Combine a main-diagonal threat with a horizontal row threat to overload the AI defense.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // CONNECT 4 — 4 additional variants (total 5)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-LOG-C4-01',
    title: 'CONNECT 4 — TACTICAL MODE',
    category: 'LOGIC',
    description: 'Drop Red discs into the 7×6 board — AI plays with a stronger strategy.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 640,
    penalty: 90,
    timeLimit: 120,
    gameType: 'connect4',
    gameConfig: {
      sector: 'SECTOR-01 // BULKHEAD_T2',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-C4-01',
      rows: 6,
      cols: 7,
      aiSkill: 'STRATEGIC',
      subtitle: 'Beat the Strategic AI — drop discs in columns 1–7 to connect 4.',
    },
    solutionConfig: {
      expectedAnswer: 'CONNECT4:WIN',
      acceptedAnswers: ['CONNECT4:WIN'],
      hints: [
        'HINT 01 // Securing the middle column gives you reach into both left and right horizontal/diagonal lines.',
        'HINT 02 // Set up a "7-trap" (a horizontal line intersecting a diagonal) so you have two winning cells.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-C4-02',
    title: 'CONNECT 4 — SPEED STRIKE',
    category: 'LOGIC',
    description: 'Connect 4 in a row within 90 seconds against a reactive AI.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 1050,
    penalty: 160,
    timeLimit: 90,
    gameType: 'connect4',
    gameConfig: {
      sector: 'SECTOR-01 // SPEED_BULKHEAD',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-C4-02',
      rows: 6,
      cols: 7,
      aiSkill: 'STRATEGIC',
      subtitle: 'Speed round — connect 4 fast before the timer expires.',
    },
    solutionConfig: {
      expectedAnswer: 'CONNECT4:WIN',
      acceptedAnswers: ['CONNECT4:WIN'],
      hints: [
        'HINT 01 // Create an open-ended 3-in-a-row on the bottom rows where both ends are playable.',
        'HINT 02 // If the AI stacks vertically in the center, use its discs as support to build an elevated diagonal.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-C4-03',
    title: 'CONNECT 4 — BEGINNER LINK',
    category: 'LOGIC',
    description: 'A beginner-friendly Connect 4 match — defeat the AI on easy difficulty.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 180,
    reward: 380,
    penalty: 55,
    timeLimit: 120,
    gameType: 'connect4',
    gameConfig: {
      sector: 'SECTOR-01 // NOVICE_BULKHEAD',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-C4-03',
      rows: 6,
      cols: 7,
      aiSkill: 'NOVICE',
      subtitle: 'Training round — connect 4 discs in any direction.',
    },
    solutionConfig: {
      expectedAnswer: 'CONNECT4:WIN',
      acceptedAnswers: ['CONNECT4:WIN'],
      hints: [
        'HINT 01 // Start near the center of the board so your discs can connect in all directions.',
        'HINT 02 // Watch the AI\'s vertical stacks and block any column that reaches 3 discs.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-C4-04',
    title: 'CONNECT 4 — EXTREME GRID',
    category: 'LOGIC',
    description: 'Connect 4 on a 7×6 board against a near-perfect AI engine.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1400,
    penalty: 250,
    timeLimit: 150,
    gameType: 'connect4',
    gameConfig: {
      sector: 'SECTOR-01 // APEX_CITADEL',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-C4-04',
      rows: 6,
      cols: 7,
      aiSkill: 'TACTICAL',
      subtitle: 'Maximum difficulty — the AI evaluates 6 moves ahead.',
    },
    solutionConfig: {
      expectedAnswer: 'CONNECT4:WIN',
      acceptedAnswers: ['CONNECT4:WIN'],
      hints: [
        'HINT 01 // The most reliable win against a tactical AI is a double-threat fork on two stacked rows in the same column.',
        'HINT 02 // Never play directly beneath your own winning square if it lets the AI claim that square immediately.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // WEND (WORD LADDER) — 5 additional variants (total 7)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-KNW-WD-01',
    title: 'WEND // BOOT to ROOT',
    category: 'KNOWLEDGE',
    description: 'Transform BOOT into ROOT one letter at a time using the 3 step clues.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 65,
    timeLimit: 150,
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-07 // BOOT_CODEX',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-WD-01',
      startWord: 'BOOT',
      endWord: 'ROOT',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: A water vessel or small ship',
          hint: 'Change the second vowel to form a common watercraft.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: An outer garment worn for warmth or a layer of paint',
          hint: 'Change the starting consonant to form an article of outerwear.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: A dark aquatic bird with a white forehead shield',
          hint: 'Change the second vowel back so the word rhymes with the final target.',
          length: 4,
        },
      ],
      solutionSteps: ['BOAT', 'COAT', 'COOT'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:BOOT-BOAT-COAT-COOT-ROOT',
      acceptedAnswers: ['WEND:BOOT-BOAT-COAT-COOT-ROOT', 'BOOT-BOAT-COAT-COOT-ROOT', 'BOAT-COAT-COOT'],
      hints: [
        'HINT 01 // Keep the first and last letters fixed in Step 1 by changing only the third letter.',
        'HINT 02 // Step 2 is a 4-letter outer garment that rhymes with Step 1.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-WD-02',
    title: 'WEND // HACK to CODE',
    category: 'TECHNICAL',
    description: 'Transform HACK into CODE one letter at a time across 4 intermediate steps.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 550,
    reward: 1100,
    penalty: 180,
    timeLimit: 180,
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-07 // HACK_CODEX',
      artworkKey: 'CORE_BRIDGE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-WD-02',
      startWord: 'HACK',
      endWord: 'CODE',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Listen closely or pay attention (literary)',
          hint: 'Change the third letter to form an old-fashioned verb meaning "listen!".',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: A fast, long-eared mammal similar to a rabbit',
          hint: 'Change the last letter to match the silent final vowel of the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Close attention, caution, or concern',
          hint: 'Change the first letter to match the starting letter of the target word.',
          length: 4,
        },
        {
          clue: 'Step 4 — Change 1 letter: Central processing unit or innermost part of a system',
          hint: 'Change the first vowel to match the first vowel of the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['HARK', 'HARE', 'CARE', 'CORE'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:HACK-HARK-HARE-CARE-CORE-CODE',
      acceptedAnswers: ['WEND:HACK-HARK-HARE-CARE-CORE-CODE', 'HACK-HARK-HARE-CARE-CORE-CODE', 'HARK-HARE-CARE-CORE'],
      hints: [
        'HINT 01 // Lock in the final letter E by Step 2 and the initial letter C by Step 3.',
        'HINT 02 // Step 4 is a computing term for a processor unit that is one letter away from CODE.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-WD-03',
    title: 'WEND // LINK to NODE',
    category: 'KNOWLEDGE',
    description: 'Transform LINK into NODE in 3 intermediate steps — networking-themed word ladder.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 640,
    penalty: 90,
    timeLimit: 150,
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-07 // LINK_CODEX',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-WD-03',
      startWord: 'LINK',
      endWord: 'NODE',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: A continuous wire, connection, or row of text',
          hint: 'Change the last letter to match the final letter of the target word.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Solitary, single, or isolated',
          hint: 'Change the first vowel to match the first vowel of the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Zero, not any, or null quantity',
          hint: 'Change the first letter to match the starting letter of the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['LINE', 'LONE', 'NONE'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:LINK-LINE-LONE-NONE-NODE',
      acceptedAnswers: ['WEND:LINK-LINE-LONE-NONE-NODE', 'LINK-LINE-LONE-NONE-NODE', 'LINE-LONE-NONE'],
      hints: [
        'HINT 01 // Transform the letters from right to left: first lock the ending E, then the vowel O, then the starting N.',
        'HINT 02 // Step 3 is a 4-letter word meaning "not any" that begins and ends with the same consonant/vowel pattern as the target.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-WD-04',
    title: 'WEND // BYTE to DATA',
    category: 'TECHNICAL',
    description: 'Turn BYTE into DATA across 3 intermediate steps.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 750,
    reward: 1500,
    penalty: 270,
    timeLimit: 180,
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-07 // BYTE_CODEX',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'CORE_BRIDGE',
      maxHints: 2,
      clearanceCode: 'NX-WD-04',
      startWord: 'BYTE',
      endWord: 'DATA',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Grip or cut with teeth; a small morsel',
          hint: 'Change the second letter to a standard vowel while keeping the pronunciation identical.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Restrain or lessen in intensity (as in "with ___d breath")',
          hint: 'Change the first vowel to match the first vowel of the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Calendar timestamp or day of the month',
          hint: 'Change the first letter to match the starting letter of the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['BITE', 'BATE', 'DATE'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:BYTE-BITE-BATE-DATE-DATA',
      acceptedAnswers: ['WEND:BYTE-BITE-BATE-DATE-DATA', 'BYTE-BITE-BATE-DATE-DATA', 'BITE-BATE-DATE'],
      hints: [
        'HINT 01 // Step 1 is a homophone of the starting word that replaces Y with a standard vowel.',
        'HINT 02 // Step 3 is a 4-letter calendar term that shares its first three letters with the target word.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-WD-05',
    title: 'WEND // FIND to FLAG',
    category: 'KNOWLEDGE',
    description: 'Transform FIND into FLAG across 5 intermediate steps — CTF-themed word ladder.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 320,
    reward: 680,
    penalty: 95,
    timeLimit: 150,
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-07 // CTF_CODEX',
      artworkKey: 'CREDITS_SPIRE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-WD-05',
      startWord: 'FIND',
      endWord: 'FLAG',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Ward off or defend against an attack',
          hint: 'Change the vowel in the starting word to form a verb meaning to defend.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Supply power, nutrition, or a live data stream',
          hint: 'Change the third letter to create a double vowel in the middle.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Units of length equal to 12 inches',
          hint: 'Keep the double vowel and change the final letter to a consonant.',
          length: 4,
        },
        {
          clue: 'Step 4 — Change 1 letter: A notable achievement or display of skill',
          hint: 'Change the second vowel so the middle letters match the vowel of the target word.',
          length: 4,
        },
        {
          clue: 'Step 5 — Change 1 letter: Smooth and level with no elevation',
          hint: 'Change the second letter to match the second letter of the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['FEND', 'FEED', 'FEET', 'FEAT', 'FLAT'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:FIND-FEND-FEED-FEET-FEAT-FLAT-FLAG',
      acceptedAnswers: [
        'WEND:FIND-FEND-FEED-FEET-FEAT-FLAT-FLAG',
        'FIND-FEND-FEED-FEET-FEAT-FLAT-FLAG',
        'FEND-FEED-FEET-FEAT-FLAT',
      ],
      hints: [
        'HINT 01 // Keep the starting letter F fixed across every single step in the ladder.',
        'HINT 02 // Transition through a double-E pair in the middle steps before shifting to the "-AT" ending.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // PATCHES — 4 additional variants (total 7)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-OBS-PT-01',
    title: 'PATCHES — SECTOR ECHO (5×5)',
    category: 'OBSERVATION',
    description: 'Divide the 5×5 grid into exact-area rectangles matching each clue number.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 720,
    penalty: 100,
    timeLimit: 180,
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-02 // ECHO_ARCHIVE',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-PT-01',
      rows: 5,
      cols: 5,
      clues: [
        { id: 'P1', r: 0, c: 0, area: 5 },
        { id: 'P2', r: 1, c: 2, area: 4 },
        { id: 'P3', r: 1, c: 4, area: 4 },
        { id: 'P4', r: 3, c: 1, area: 8 },
        { id: 'P5', r: 4, c: 3, area: 4 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 0, c2: 4, area: 5, clueId: 'P1' },
        { r1: 1, c1: 2, r2: 2, c2: 3, area: 4, clueId: 'P2' },
        { r1: 1, c1: 4, r2: 4, c2: 4, area: 4, clueId: 'P3' },
        { r1: 1, c1: 0, r2: 4, c2: 1, area: 8, clueId: 'P4' },
        { r1: 3, c1: 2, r2: 4, c2: 3, area: 4, clueId: 'P5' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:5X5:SOLVED',
      acceptedAnswers: ['PATCHES:5X5:SOLVED'],
      hints: [
        'HINT 01 // Check whether the 5 clue in the top-left corner can go vertically or if row 1 clues force it horizontally.',
        'HINT 02 // An area of 8 in a 4-row space must form a 4×2 rectangle.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-PT-02',
    title: 'PATCHES — SECTOR FOXTROT (5×5)',
    category: 'OBSERVATION',
    description: 'Arrange area-labeled rectangles in the 5×5 grid — all areas must match exactly.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 550,
    reward: 1100,
    penalty: 175,
    timeLimit: 210,
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-02 // FOXTROT_ARCHIVE',
      artworkKey: 'CORRIDOR',
      secondaryArtworkKey: 'OBSERVATION',
      maxHints: 2,
      clearanceCode: 'NX-PT-02',
      rows: 5,
      cols: 5,
      clues: [
        { id: 'P1', r: 0, c: 1, area: 4 },
        { id: 'P2', r: 0, c: 3, area: 6 },
        { id: 'P3', r: 2, c: 0, area: 4 },
        { id: 'P4', r: 2, c: 3, area: 6 },
        { id: 'P5', r: 4, c: 0, area: 5 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 1, c2: 1, area: 4, clueId: 'P1' },
        { r1: 0, c1: 2, r2: 1, c2: 4, area: 6, clueId: 'P2' },
        { r1: 2, c1: 0, r2: 3, c2: 1, area: 4, clueId: 'P3' },
        { r1: 2, c1: 2, r2: 3, c2: 4, area: 6, clueId: 'P4' },
        { r1: 4, c1: 0, r2: 4, c2: 4, area: 5, clueId: 'P5' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:5X5:SOLVED',
      acceptedAnswers: ['PATCHES:5X5:SOLVED'],
      hints: [
        'HINT 01 // Start with the clue of 5 — only a full 5-cell edge strip can satisfy it without colliding with other clues.',
        'HINT 02 // Notice how each 4 + 6 pair totals 10 cells, which equals a 2-row band across a 5-column grid.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-PT-03',
    title: 'PATCHES — SECTOR GRID-7 (6×6)',
    category: 'OBSERVATION',
    description: 'Advanced 6×6 patches puzzle — partition into exact rectangles.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1450,
    penalty: 250,
    timeLimit: 270,
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-03 // GRID7_OPTICS',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-PT-03',
      rows: 6,
      cols: 6,
      clues: [
        { id: 'P1', r: 0, c: 0, area: 4 },
        { id: 'P2', r: 0, c: 3, area: 8 },
        { id: 'P3', r: 2, c: 0, area: 6 },
        { id: 'P4', r: 2, c: 4, area: 6 },
        { id: 'P5', r: 4, c: 0, area: 6 },
        { id: 'P6', r: 4, c: 4, area: 6 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 1, c2: 1, area: 4, clueId: 'P1' },
        { r1: 0, c1: 2, r2: 1, c2: 5, area: 8, clueId: 'P2' },
        { r1: 2, c1: 0, r2: 3, c2: 2, area: 6, clueId: 'P3' },
        { r1: 2, c1: 3, r2: 3, c2: 5, area: 6, clueId: 'P4' },
        { r1: 4, c1: 0, r2: 5, c2: 2, area: 6, clueId: 'P5' },
        { r1: 4, c1: 3, r2: 5, c2: 5, area: 6, clueId: 'P6' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:6X6:SOLVED',
      acceptedAnswers: ['PATCHES:6X6:SOLVED'],
      hints: [
        'HINT 01 // A clue of 8 on a 6×6 grid cannot be 1×8, so it must be a 2×4 or 4×2 rectangle.',
        'HINT 02 // Check how each horizontal pair of clues sums to 12 cells (two full rows of 6 columns).',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-PT-04',
    title: 'PATCHES — EASY 4×4',
    category: 'OBSERVATION',
    description: 'Beginner patches puzzle on a 4×4 grid — simpler areas to partition.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 400,
    penalty: 60,
    timeLimit: 120,
    gameType: 'patches',
    gameConfig: {
      sector: 'SECTOR-02 // EASY_ARCHIVE',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'CORRIDOR',
      maxHints: 2,
      clearanceCode: 'NX-PT-04',
      rows: 4,
      cols: 4,
      clues: [
        { id: 'P1', r: 0, c: 0, area: 4 },
        { id: 'P2', r: 0, c: 2, area: 4 },
        { id: 'P3', r: 2, c: 0, area: 8 },
      ],
      solutionPatches: [
        { r1: 0, c1: 0, r2: 1, c2: 1, area: 4, clueId: 'P1' },
        { r1: 0, c1: 2, r2: 1, c2: 3, area: 4, clueId: 'P2' },
        { r1: 2, c1: 0, r2: 3, c2: 3, area: 8, clueId: 'P3' },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'PATCHES:4X4:SOLVED',
      acceptedAnswers: ['PATCHES:4X4:SOLVED', 'PATCHES:SOLVED'],
      hints: [
        'HINT 01 // An area of 8 on a 4×4 grid must span half the board as a 2×4 or 4×2 rectangle.',
        'HINT 02 // Because the two 4-clues sit in the top row, the 8-clue must occupy the lower half of the board.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // ZIP (PATH PUZZLE) — 4 additional variants (total 6)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-TEC-ZP-01',
    title: 'ZIP — LEVEL ALPHA (4×4)',
    category: 'TECHNICAL',
    description: 'Smaller 4×4 ZIP path puzzle — connect waypoints 1 to 5 visiting all cells.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 450,
    penalty: 65,
    timeLimit: 120,
    gameType: 'zip',
    gameConfig: {
      sector: 'SECTOR-04 // RELAY_ALPHA',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'OBSERVATION',
      maxHints: 2,
      clearanceCode: 'NX-ZP-01',
      rows: 4,
      cols: 4,
      blocked: [],
      blockedCells: [],
      waypoints: [
        { num: 1, r: 0, c: 0 },
        { num: 2, r: 0, c: 3 },
        { num: 3, r: 2, c: 1 },
        { num: 4, r: 2, c: 2 },
        { num: 5, r: 3, c: 0 },
      ],
      solutionPath: [
        { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 },
        { r: 1, c: 3 }, { r: 1, c: 2 }, { r: 1, c: 1 }, { r: 1, c: 0 },
        { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
        { r: 3, c: 3 }, { r: 3, c: 2 }, { r: 3, c: 1 }, { r: 3, c: 0 },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'ZIP:4X4:SOLVED',
      acceptedAnswers: ['ZIP:4X4:SOLVED', 'ZIP:SOLVED'],
      hints: [
        'HINT 01 // Avoid isolating corner cells early; trace along full edges before folding inward.',
        'HINT 02 // Adjacent middle waypoints should be crossed consecutively as your path weaves across rows.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-ZP-02',
    title: 'ZIP — LEVEL BETA (5×5)',
    category: 'TECHNICAL',
    description: 'New 5×5 ZIP layout — different waypoint placement from previous levels.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 400,
    reward: 820,
    penalty: 120,
    timeLimit: 180,
    gameType: 'zip',
    gameConfig: {
      sector: 'SECTOR-04 // RELAY_BETA',
      artworkKey: 'CORE_BRIDGE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-ZP-02',
      rows: 5,
      cols: 5,
      blocked: [],
      blockedCells: [],
      waypoints: [
        { num: 1, r: 0, c: 2 },
        { num: 2, r: 2, c: 0 },
        { num: 3, r: 0, c: 4 },
        { num: 4, r: 2, c: 4 },
        { num: 5, r: 4, c: 1 },
        { num: 6, r: 4, c: 4 },
      ],
      solutionPath: [
        { r: 0, c: 2 }, { r: 0, c: 1 }, { r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 },
        { r: 2, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 0, c: 3 },
        { r: 0, c: 4 }, { r: 1, c: 4 }, { r: 2, c: 4 }, { r: 2, c: 3 }, { r: 2, c: 2 },
        { r: 3, c: 2 }, { r: 3, c: 1 }, { r: 3, c: 0 }, { r: 4, c: 0 }, { r: 4, c: 1 },
        { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 4, c: 4 },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'ZIP:5X5:SOLVED',
      acceptedAnswers: ['ZIP:5X5:SOLVED', 'ZIP:SOLVED'],
      hints: [
        'HINT 01 // When starting mid-edge, clear one corner pocket completely before crossing to the opposite side.',
        'HINT 02 // Don\'t leave single-cell dead ends along the borders — loop through interior cells on your way between edge waypoints.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-ZP-03',
    title: 'ZIP — LEVEL GAMMA (5×5) BLOCKED',
    category: 'TECHNICAL',
    description: 'Blocked-cell ZIP variant — some cells are walls; navigate around them.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 580,
    reward: 1150,
    penalty: 190,
    timeLimit: 210,
    gameType: 'zip',
    gameConfig: {
      sector: 'SECTOR-04 // RELAY_GAMMA',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-ZP-03',
      rows: 5,
      cols: 5,
      blocked: [{ r: 1, c: 2 }, { r: 3, c: 1 }],
      blockedCells: [{ r: 1, c: 2 }, { r: 3, c: 1 }],
      waypoints: [
        { num: 1, r: 0, c: 0 },
        { num: 2, r: 0, c: 4 },
        { num: 3, r: 2, c: 2 },
        { num: 4, r: 4, c: 0 },
        { num: 5, r: 4, c: 4 },
      ],
      solutionPath: [
        { r: 0, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 0, c: 1 }, { r: 0, c: 2 },
        { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 1, c: 4 }, { r: 1, c: 3 }, { r: 2, c: 3 },
        { r: 2, c: 4 }, { r: 3, c: 4 }, { r: 3, c: 3 }, { r: 3, c: 2 }, { r: 2, c: 2 },
        { r: 2, c: 1 }, { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 }, { r: 4, c: 1 },
        { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'ZIP:5X5:SOLVED',
      acceptedAnswers: ['ZIP:5X5:SOLVED', 'ZIP:SOLVED'],
      hints: [
        'HINT 01 // Cells adjacent to blocked walls have fewer exits — visit narrow pockets before moving on.',
        'HINT 02 // Dip into the pockets beside the blocked cells early rather than trying to return to them later.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-TEC-ZP-04',
    title: 'ZIP — LEVEL DELTA (6×6)',
    category: 'TECHNICAL',
    description: 'Larger 6×6 ZIP challenge — connect all 7 waypoints visiting every cell.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 800,
    reward: 1600,
    penalty: 290,
    timeLimit: 240,
    gameType: 'zip',
    gameConfig: {
      sector: 'SECTOR-04 // RELAY_DELTA',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'CORE_BRIDGE',
      maxHints: 2,
      clearanceCode: 'NX-ZP-04',
      rows: 6,
      cols: 6,
      blocked: [],
      blockedCells: [],
      waypoints: [
        { num: 1, r: 0, c: 0 },
        { num: 2, r: 0, c: 5 },
        { num: 3, r: 1, c: 1 },
        { num: 4, r: 2, c: 4 },
        { num: 5, r: 3, c: 3 },
        { num: 6, r: 4, c: 0 },
        { num: 7, r: 5, c: 0 },
      ],
      solutionPath: [
        { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 0, c: 5 },
        { r: 1, c: 5 }, { r: 1, c: 4 }, { r: 1, c: 3 }, { r: 1, c: 2 }, { r: 1, c: 1 }, { r: 1, c: 0 },
        { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
        { r: 3, c: 5 }, { r: 3, c: 4 }, { r: 3, c: 3 }, { r: 3, c: 2 }, { r: 3, c: 1 }, { r: 3, c: 0 },
        { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 },
        { r: 5, c: 5 }, { r: 5, c: 4 }, { r: 5, c: 3 }, { r: 5, c: 2 }, { r: 5, c: 1 }, { r: 5, c: 0 },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'ZIP:6X6:SOLVED',
      acceptedAnswers: ['ZIP:6X6:SOLVED', 'ZIP:SOLVED'],
      hints: [
        'HINT 01 // On an even-sized grid, a path starting and ending on the same edge must traverse an even number of rows.',
        'HINT 02 // Keep each row intact before dropping to the next so you don\'t trap unvisited cells behind your trail.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // N-QUEENS — 4 additional variants (total 6)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-LOG-QN-01',
    title: 'N-QUEENS (4×4) — INTRO',
    category: 'LOGIC',
    description: 'Place 4 Queens on the 4×4 board with none attacking each other.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 420,
    penalty: 60,
    timeLimit: 120,
    gameType: 'queens',
    gameConfig: {
      sector: 'SECTOR-01 // CROWN_ALPHA',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-QN-01',
      size: 4,
      givenQueens: [],
    },
    solutionConfig: {
      expectedAnswer: 'QUEENS:0,1;1,3;2,0;3,2',
      acceptedAnswers: ['QUEENS:0,1;1,3;2,0;3,2', 'QUEENS:0,2;1,0;2,3;3,1'],
      hints: [
        'HINT 01 // On a 4×4 board there are exactly 2 solutions — try placing queens offset by 2 columns per row.',
        'HINT 02 // No two queens can share a row, column, or diagonal; start by excluding columns attacked from row 0.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-QN-02',
    title: 'N-QUEENS (7×7)',
    category: 'LOGIC',
    description: 'Place 7 Queens on the 7×7 board so none share any row, column, or diagonal.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 600,
    reward: 1200,
    penalty: 200,
    timeLimit: 300,
    gameType: 'queens',
    gameConfig: {
      sector: 'SECTOR-01 // CROWN_OMEGA',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-QN-02',
      size: 7,
      givenQueens: [{ r: 0, c: 3 }],
    },
    solutionConfig: {
      expectedAnswer: 'QUEENS:0,3;1,6;2,2;3,0;4,5;5,1;6,4',
      acceptedAnswers: ['QUEENS:0,3;1,6;2,2;3,0;4,5;5,1;6,4'],
      hints: [
        'HINT 01 // With Queen at (0,3) given, columns 2, 3, and 4 are immediately attacked in Row 1.',
        'HINT 02 // Try placing Queens using a consistent knight-like column step (modulo 7) to avoid diagonal collisions.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-QN-03',
    title: 'N-QUEENS (8×8) — CLASSIC',
    category: 'LOGIC',
    description: 'The classic chess puzzle — place 8 Queens on an 8×8 board with no conflicts.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 900,
    reward: 1800,
    penalty: 350,
    timeLimit: 420,
    gameType: 'queens',
    gameConfig: {
      sector: 'SECTOR-01 // GRAND_CITADEL',
      artworkKey: 'RING_CITADEL',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-QN-03',
      size: 8,
      givenQueens: [{ r: 0, c: 0 }],
    },
    solutionConfig: {
      expectedAnswer: 'QUEENS:0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3',
      acceptedAnswers: [
        'QUEENS:0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3',
        'QUEENS:0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4',
      ],
      hints: [
        'HINT 01 // With a Queen locked at the top-left corner (0,0), the entire main diagonal (r = c) is off-limits.',
        'HINT 02 // Place the Row 1 Queen near the middle columns so it leaves outer columns open for lower rows.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-QN-04',
    title: 'N-QUEENS (5×5) VARIANT B',
    category: 'LOGIC',
    description: 'Place 5 Queens on the 5×5 board — different locked queen position.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 320,
    reward: 680,
    penalty: 90,
    timeLimit: 180,
    gameType: 'queens',
    gameConfig: {
      sector: 'SECTOR-01 // CROWN_BETA',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RISK_STAIRS',
      maxHints: 2,
      clearanceCode: 'NX-QN-04',
      size: 5,
      givenQueens: [{ r: 0, c: 2 }],
    },
    solutionConfig: {
      expectedAnswer: 'QUEENS:0,2;1,4;2,1;3,3;4,0',
      acceptedAnswers: ['QUEENS:0,2;1,4;2,1;3,3;4,0', 'QUEENS:0,2;1,0;2,3;3,1;4,4'],
      hints: [
        'HINT 01 // With Queen at (0,2), columns 1, 2, and 3 are attacked in Row 1 — only the two edge columns remain open.',
        'HINT 02 // Once you pick an edge column for Row 1, step by 2 columns (wrapping around) for each subsequent row.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // APTITUDE — 6 additional variants (total 8)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-LOG-AP-01',
    title: 'APTITUDE: DATA & PROBABILITY',
    category: 'LOGIC',
    description: 'Solve 4 problems covering data interpretation, probability and permutations.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 1050,
    penalty: 160,
    timeLimit: 150,
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // DATA_ENGINE',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-AP-01',
      roundTitle: 'APTITUDE // DATA & PROBABILITY',
      answerKey: ['B', 'C', 'A', 'D'],
      questions: [
        {
          id: 'Q1',
          topic: 'PERMUTATIONS',
          question: 'In how many ways can 4 different colored wires be arranged in a row?',
          options: ['12', '24', '16', '48'],
        },
        {
          id: 'Q2',
          topic: 'PROBABILITY',
          question: 'A bag has 5 red and 3 blue nodes. What is the probability of picking a red node?',
          options: ['3/8', '3/5', '5/8', '5/3'],
        },
        {
          id: 'Q3',
          topic: 'RATIO & PROPORTION',
          question: 'If Team A solved 15 challenges and Team B solved 10, what is the ratio of A to B?',
          options: ['3:2', '2:3', '5:3', '15:5'],
        },
        {
          id: 'Q4',
          topic: 'NUMBER THEORY',
          question: 'What is the Least Common Multiple (LCM) of 12 and 18?',
          options: ['24', '54', '48', '36'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['B', 'C', 'A', 'D'],
      expectedAnswer: 'APTITUDE:B-C-A-D',
      acceptedAnswers: ['APTITUDE:B-C-A-D', 'B-C-A-D'],
      hints: [
        'HINT 01 // Q1: Arranging n distinct items in a line uses n factorial (n!). Q2: Divide favorable outcomes by total nodes in the bag.',
        'HINT 02 // Q3: Divide both numbers by their greatest common divisor. Q4: Find the smallest positive number divisible by both 12 and 18.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-AP-02',
    title: 'APTITUDE: PROFIT & LOSS',
    category: 'LOGIC',
    description: 'Solve 4 problems on profit/loss, discounts, marked price and cost price.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 650,
    penalty: 85,
    timeLimit: 150,
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // PROFIT_ENGINE',
      artworkKey: 'CREDITS_SPIRE',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-AP-02',
      roundTitle: 'APTITUDE // PROFIT & LOSS',
      answerKey: ['C', 'A', 'B', 'D'],
      questions: [
        {
          id: 'Q1',
          topic: 'PROFIT & LOSS',
          question: 'A server costs ₹1200 and is sold for ₹1500. What is the profit percentage?',
          options: ['20%', '22%', '25%', '30%'],
        },
        {
          id: 'Q2',
          topic: 'DISCOUNT',
          question: 'An item marked ₹800 has a 10% discount. What is the selling price?',
          options: ['₹720', '₹740', '₹760', '₹700'],
        },
        {
          id: 'Q3',
          topic: 'LOSS PERCENTAGE',
          question: 'Bought at ₹500, sold at ₹450. What is the loss percentage?',
          options: ['8%', '10%', '5%', '12%'],
        },
        {
          id: 'Q4',
          topic: 'SUCCESSIVE DISCOUNT',
          question: 'Two successive discounts of 10% and 20% on ₹1000. Final price?',
          options: ['₹700', '₹750', '₹780', '₹720'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['C', 'A', 'B', 'D'],
      expectedAnswer: 'APTITUDE:C-A-B-D',
      acceptedAnswers: ['APTITUDE:C-A-B-D', 'C-A-B-D'],
      hints: [
        'HINT 01 // Profit and loss percentages are always calculated relative to the original cost price, not the selling price.',
        'HINT 02 // For Q4, successive discounts do not simply add — apply the second percentage discount to the already-discounted price.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-AP-03',
    title: 'APTITUDE: CLOCKS & CALENDARS',
    category: 'PUZZLES',
    description: 'Solve 4 problems on clock angles, day calculations and leap years.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 1050,
    penalty: 160,
    timeLimit: 150,
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // CHRONO_ENGINE',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-AP-03',
      roundTitle: 'APTITUDE // CLOCKS & CALENDARS',
      answerKey: ['B', 'C', 'A', 'B'],
      questions: [
        {
          id: 'Q1',
          topic: 'CLOCK ANGLES',
          question: 'What is the angle between the minute and hour hand at 3:00?',
          options: ['60°', '90°', '120°', '45°'],
        },
        {
          id: 'Q2',
          topic: 'CLOCK ANGLES',
          question: 'What angle does the minute hand sweep in 20 minutes?',
          options: ['60°', '90°', '120°', '150°'],
        },
        {
          id: 'Q3',
          topic: 'CALENDARS',
          question: 'January 1, 2024 is a Monday. What day is January 1, 2025?',
          options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
        {
          id: 'Q4',
          topic: 'LEAP YEAR',
          question: 'How many leap years are there between 2000 and 2024 (inclusive)?',
          options: ['5', '7', '6', '4'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['B', 'C', 'A', 'B'],
      expectedAnswer: 'APTITUDE:B-C-A-B',
      acceptedAnswers: ['APTITUDE:B-C-A-B', 'B-C-A-B'],
      hints: [
        'HINT 01 // A full clock face is 360° across 12 hours (30° per hour mark) and 60 minutes (6° per minute).',
        'HINT 02 // Remember that 2024 is a leap year (366 days = 52 weeks + 2 odd days), and don\'t forget to include both endpoints in Q4.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-AP-04',
    title: 'APTITUDE: SIMPLE & COMPOUND INTEREST',
    category: 'LOGIC',
    description: 'Solve 4 financial aptitude problems on SI, CI and time-value calculations.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 320,
    reward: 680,
    penalty: 95,
    timeLimit: 150,
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // FINANCE_ENGINE',
      artworkKey: 'LOGIC',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-AP-04',
      roundTitle: 'APTITUDE // SIMPLE & COMPOUND INTEREST',
      answerKey: ['A', 'D', 'B', 'C'],
      questions: [
        {
          id: 'Q1',
          topic: 'SIMPLE INTEREST',
          question: 'Principal = ₹5000, Rate = 6% per year, Time = 3 years. What is the SI?',
          options: ['₹900', '₹1000', '₹950', '₹850'],
        },
        {
          id: 'Q2',
          topic: 'COMPOUND INTEREST',
          question: 'Principal = ₹1000, Rate = 10% per year, Time = 2 years (compounded annually). What is the CI?',
          options: ['₹200', '₹205', '₹220', '₹210'],
        },
        {
          id: 'Q3',
          topic: 'DOUBLING TIME',
          question: 'At 8% simple interest per year, in how many years will ₹500 double?',
          options: ['10', '12.5', '15', '20'],
        },
        {
          id: 'Q4',
          topic: 'DIFFERENCE SI & CI',
          question: 'For ₹1000 at 10% for 2 years, what is the difference between CI and SI?',
          options: ['₹5', '₹20', '₹10', '₹15'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['A', 'D', 'B', 'C'],
      expectedAnswer: 'APTITUDE:A-D-B-C',
      acceptedAnswers: ['APTITUDE:A-D-B-C', 'A-D-B-C'],
      hints: [
        'HINT 01 // Q1: Simple Interest = (P × R × T) / 100. Q2: In year 2 of Compound Interest, you also earn interest on year 1\'s interest.',
        'HINT 02 // Q3: To double under Simple Interest, total interest must equal 100% of Principal. Q4: Compare your Q2 compound interest to 2 years of simple interest.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-LOG-AP-05',
    title: 'APTITUDE: TRAIN & BOAT PROBLEMS',
    category: 'LOGIC',
    description: '4 classic aptitude problems on trains, streams and relative speed.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 1050,
    penalty: 160,
    timeLimit: 150,
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // MOTION_ENGINE',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-AP-05',
      roundTitle: 'APTITUDE // TRAINS & RELATIVE SPEED',
      answerKey: ['C', 'B', 'D', 'A'],
      questions: [
        {
          id: 'Q1',
          topic: 'TRAINS — CROSSING',
          question: 'A 200-meter train travels at 72 km/h. How long to cross a 400-meter platform?',
          options: ['20 s', '25 s', '30 s', '35 s'],
        },
        {
          id: 'Q2',
          topic: 'RELATIVE SPEED',
          question: 'Two trains, 250 m each, approach each other at 60 and 90 km/h. Time to cross?',
          options: ['8 s', '12 s', '10 s', '15 s'],
        },
        {
          id: 'Q3',
          topic: 'BOATS & STREAMS',
          question: 'A boat\'s speed in still water is 12 km/h; stream speed is 4 km/h. Speed downstream?',
          options: ['8 km/h', '12 km/h', '14 km/h', '16 km/h'],
        },
        {
          id: 'Q4',
          topic: 'AVERAGE SPEED',
          question: 'Travels 120 km at 60 km/h, then 120 km at 40 km/h. What is the average speed?',
          options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['C', 'B', 'D', 'A'],
      expectedAnswer: 'APTITUDE:C-B-D-A',
      acceptedAnswers: ['APTITUDE:C-B-D-A', 'C-B-D-A'],
      hints: [
        'HINT 01 // Convert km/h to m/s by multiplying by 5/18. Remember total crossing distance includes the length of both objects.',
        'HINT 02 // Downstream adds the current speed; for equal distances at two speeds, use Total Distance ÷ Total Time (not the simple average).',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-PUZ-AP-06',
    title: 'APTITUDE: BINARY & HEX',
    category: 'PUZZLES',
    description: '4 binary/hex conversion and bitwise aptitude problems.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1400,
    penalty: 250,
    timeLimit: 150,
    gameType: 'aptitude',
    gameConfig: {
      sector: 'SECTOR-02 // BINARY_ENGINE',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-AP-06',
      roundTitle: 'APTITUDE // BINARY & HEXADECIMAL',
      answerKey: ['D', 'B', 'C', 'A'],
      questions: [
        {
          id: 'Q1',
          topic: 'BINARY TO DECIMAL',
          question: 'Convert binary 11011 to decimal.',
          options: ['23', '25', '26', '27'],
        },
        {
          id: 'Q2',
          topic: 'HEX TO DECIMAL',
          question: 'What is hexadecimal 1F in decimal?',
          options: ['30', '31', '32', '29'],
        },
        {
          id: 'Q3',
          topic: 'BITWISE AND',
          question: 'What is 0b1010 AND 0b1100 in decimal?',
          options: ['6', '10', '8', '12'],
        },
        {
          id: 'Q4',
          topic: 'LEFT SHIFT',
          question: 'What is 5 << 2 in decimal? (Left shift by 2 bits)',
          options: ['20', '15', '10', '25'],
        },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['D', 'B', 'C', 'A'],
      expectedAnswer: 'APTITUDE:D-B-C-A',
      acceptedAnswers: ['APTITUDE:D-B-C-A', 'D-B-C-A'],
      hints: [
        'HINT 01 // Q1: Sum the powers of 2 (16, 8, 4, 2, 1) where a 1 bit appears. Q2: In base-16, the digit F represents 15.',
        'HINT 02 // Q3: Bitwise AND keeps a 1 only where BOTH inputs have a 1 bit. Q4: Left-shifting by k bits multiplies an integer by 2^k.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // GK TRUE/FALSE — 6 additional variants (total 8)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-KNW-GK-01',
    title: 'GK: CYBERSECURITY (6 T/F)',
    category: 'KNOWLEDGE',
    description: '6 True or False statements focused on cybersecurity fundamentals.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 320,
    reward: 680,
    penalty: 95,
    timeLimit: 90,
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // CYBER_VERITAS',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-GK-01',
      roundTitle: 'ROUND 01 // CYBERSECURITY T/F',
      answerKey: ['T', 'F', 'T', 'F', 'T', 'T'],
      questions: [
        { id: 'Q1', topic: 'ENCRYPTION', statement: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm.' },
        { id: 'Q2', topic: 'HASHING', statement: 'SHA-256 is an encryption algorithm that can be reversed (decrypted).' },
        { id: 'Q3', topic: 'NETWORKING', statement: 'A VPN (Virtual Private Network) encrypts internet traffic to protect privacy.' },
        { id: 'Q4', topic: 'MALWARE', statement: 'A worm requires a host file to spread, unlike a virus which is self-replicating.' },
        { id: 'Q5', topic: 'PORTS', statement: 'Port 443 is the default port for HTTPS traffic.' },
        { id: 'Q6', topic: 'AUTH', statement: 'Two-Factor Authentication (2FA) adds an extra layer of security beyond a password.' },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'F', 'T', 'F', 'T', 'T'],
      expectedAnswer: 'GKTF:T-F-T-F-T-T',
      acceptedAnswers: ['GKTF:T-F-T-F-T-T', 'T-F-T-F-T-T'],
      hints: [
        'HINT 01 // Distinguish between cryptographic hashing (one-way digest) and encryption (reversible with a key).',
        'HINT 02 // Check how standalone network propagation differs between worms and file-infecting viruses.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-GK-02',
    title: 'GK: OPERATING SYSTEMS (6 T/F)',
    category: 'KNOWLEDGE',
    description: '6 True or False statements on OS concepts and Linux.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 65,
    timeLimit: 90,
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // OS_VERITAS',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-GK-02',
      roundTitle: 'ROUND 01 // OPERATING SYSTEMS T/F',
      answerKey: ['T', 'T', 'F', 'T', 'F', 'T'],
      questions: [
        { id: 'Q1', topic: 'LINUX', statement: 'The "ls" command in Linux lists the contents of a directory.' },
        { id: 'Q2', topic: 'PROCESSES', statement: 'PID stands for Process IDentifier in Unix/Linux systems.' },
        { id: 'Q3', topic: 'MEMORY', statement: 'RAM (Random Access Memory) retains data even after power is turned off.' },
        { id: 'Q4', topic: 'FILE SYSTEMS', statement: 'ext4 is a commonly used file system for Linux operating systems.' },
        { id: 'Q5', topic: 'SCHEDULING', statement: 'Round-Robin scheduling always gives priority to the shortest job first.' },
        { id: 'Q6', topic: 'PROCESSES', statement: 'A zombie process is one that has finished execution but still has an entry in the process table.' },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'T', 'F', 'T', 'F', 'T'],
      expectedAnswer: 'GKTF:T-T-F-T-F-T',
      acceptedAnswers: ['GKTF:T-T-F-T-F-T', 'T-T-F-T-F-T'],
      hints: [
        'HINT 01 // Consider whether system main memory is volatile or non-volatile when power is removed.',
        'HINT 02 // Compare time-sliced CPU scheduling against Shortest Job First (SJF) scheduling.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-GK-03',
    title: 'GK: PROGRAMMING CONCEPTS (6 T/F)',
    category: 'KNOWLEDGE',
    description: '6 True or False statements covering programming and algorithms.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 340,
    reward: 720,
    penalty: 100,
    timeLimit: 90,
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // CODE_VERITAS',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-GK-03',
      roundTitle: 'ROUND 01 // PROGRAMMING CONCEPTS T/F',
      answerKey: ['T', 'F', 'T', 'T', 'F', 'T'],
      questions: [
        { id: 'Q1', topic: 'OOP', statement: 'In Object-Oriented Programming, encapsulation hides internal implementation details.' },
        { id: 'Q2', topic: 'BIG-O', statement: 'O(n²) is more efficient than O(n log n) for large inputs.' },
        { id: 'Q3', topic: 'RECURSION', statement: 'A recursive function must have a base case to prevent infinite loops.' },
        { id: 'Q4', topic: 'DATA STRUCTURES', statement: 'A balanced binary search tree has O(log n) time complexity for search operations.' },
        { id: 'Q5', topic: 'PYTHON', statement: 'In Python, list indices start at 1 (i.e., list[1] gives the first element).' },
        { id: 'Q6', topic: 'GIT', statement: 'git commit saves staged changes to the local repository history.' },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'F', 'T', 'T', 'F', 'T'],
      expectedAnswer: 'GKTF:T-F-T-T-F-T',
      acceptedAnswers: ['GKTF:T-F-T-T-F-T', 'T-F-T-T-F-T'],
      hints: [
        'HINT 01 // Compare quadratic growth against log-linear growth as input size n becomes very large.',
        'HINT 02 // Verify how sequence indexing starts in Python and C-family languages.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-GK-04',
    title: 'GK: INTERNET & WEB (6 T/F)',
    category: 'KNOWLEDGE',
    description: '6 True or False statements on internet protocols and web technology.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 65,
    timeLimit: 90,
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // WEB_VERITAS',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-GK-04',
      roundTitle: 'ROUND 01 // INTERNET & WEB T/F',
      answerKey: ['T', 'T', 'F', 'T', 'F', 'T'],
      questions: [
        { id: 'Q1', topic: 'DNS', statement: 'DNS (Domain Name System) translates domain names into IP addresses.' },
        { id: 'Q2', topic: 'HTTP', statement: 'HTTP is a stateless protocol — each request is independent by default.' },
        { id: 'Q3', topic: 'TCP vs UDP', statement: 'UDP guarantees delivery and order of packets, unlike TCP.' },
        { id: 'Q4', topic: 'COOKIES', statement: 'Browser cookies can be used to maintain session state across HTTP requests.' },
        { id: 'Q5', topic: 'HTML', statement: 'CSS (Cascading Style Sheets) is used to define the structure and content of web pages.' },
        { id: 'Q6', topic: 'REST', statement: 'REST APIs commonly use HTTP methods like GET, POST, PUT, and DELETE.' },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'T', 'F', 'T', 'F', 'T'],
      expectedAnswer: 'GKTF:T-T-F-T-F-T',
      acceptedAnswers: ['GKTF:T-T-F-T-F-T', 'T-T-F-T-F-T'],
      hints: [
        'HINT 01 // Recall which transport protocol uses a 3-way handshake and acknowledgments vs. connectionless datagrams.',
        'HINT 02 // Distinguish the role of HTML (document structure) from CSS (visual presentation).',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-GK-05',
    title: 'GK: DATABASE & SQL (6 T/F)',
    category: 'KNOWLEDGE',
    description: '6 True or False statements on databases, SQL and NoSQL.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 480,
    reward: 1000,
    penalty: 155,
    timeLimit: 90,
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // DB_VERITAS',
      artworkKey: 'TECHNICAL',
      secondaryArtworkKey: 'KNOWLEDGE',
      maxHints: 2,
      clearanceCode: 'NX-GK-05',
      roundTitle: 'ROUND 01 // DATABASE & SQL T/F',
      answerKey: ['T', 'F', 'T', 'T', 'T', 'F'],
      questions: [
        { id: 'Q1', topic: 'SQL', statement: 'A PRIMARY KEY in SQL must be unique and cannot be NULL.' },
        { id: 'Q2', topic: 'JOINS', statement: 'A LEFT JOIN returns only the rows that have matching values in both tables.' },
        { id: 'Q3', topic: 'NOSQL', statement: 'MongoDB stores data in BSON (Binary JSON) format.' },
        { id: 'Q4', topic: 'TRANSACTIONS', statement: 'ACID stands for Atomicity, Consistency, Isolation, Durability.' },
        { id: 'Q5', topic: 'INDEXING', statement: 'Database indexes speed up SELECT queries but can slow down INSERT/UPDATE operations.' },
        { id: 'Q6', topic: 'NORMALIZATION', statement: 'Denormalization is used to eliminate data redundancy in databases.' },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'F', 'T', 'T', 'T', 'F'],
      expectedAnswer: 'GKTF:T-F-T-T-T-F',
      acceptedAnswers: ['GKTF:T-F-T-T-T-F', 'T-F-T-T-T-F'],
      hints: [
        'HINT 01 // Compare INNER JOIN vs. LEFT OUTER JOIN behavior when the right table has no matching row.',
        'HINT 02 // Check the difference between database normalization and denormalization regarding redundancy.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-KNW-GK-06',
    title: 'GK: SCIENCE & MATH (6 T/F)',
    category: 'KNOWLEDGE',
    description: '6 True or False statements on mathematics and science fundamentals.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 65,
    timeLimit: 90,
    gameType: 'gkTrueFalse',
    gameConfig: {
      sector: 'SECTOR-07 // SCIENCE_VERITAS',
      artworkKey: 'KNOWLEDGE',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-GK-06',
      roundTitle: 'ROUND 01 // SCIENCE & MATH T/F',
      answerKey: ['T', 'T', 'T', 'F', 'T', 'F'],
      questions: [
        { id: 'Q1', topic: 'MATH', statement: 'Pi (π) is an irrational number — it cannot be expressed as a simple fraction.' },
        { id: 'Q2', topic: 'PHYSICS', statement: 'E = mc² is Einstein\'s mass-energy equivalence formula.' },
        { id: 'Q3', topic: 'CHEMISTRY', statement: 'The atomic number of an element equals the number of protons in its nucleus.' },
        { id: 'Q4', topic: 'BIOLOGY', statement: 'DNA stands for Deoxyribonucleic Acid and is made of 3 strands in a triple helix.' },
        { id: 'Q5', topic: 'MATH', statement: 'The sum of angles in any triangle is always 180 degrees.' },
        { id: 'Q6', topic: 'ASTRONOMY', statement: 'The Moon is the second-closest star to Earth after the Sun.' },
      ],
    },
    solutionConfig: {
      expectedAnswers: ['T', 'T', 'T', 'F', 'T', 'F'],
      expectedAnswer: 'GKTF:T-T-T-F-T-F',
      acceptedAnswers: ['GKTF:T-T-T-F-T-F', 'T-T-T-F-T-F'],
      hints: [
        'HINT 01 // Check the structural geometry of DNA as discovered by Watson, Crick, and Franklin.',
        'HINT 02 // Distinguish between a natural planetary satellite and a self-luminous star in Q6.',
      ],
    },
    enabled: true,
    available: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // MEMORY MATRIX — 5 additional variants (total 7)
  // ─────────────────────────────────────────────────────────────────
  {
    challengeId: 'CHG-OBS-MM-01',
    title: 'MEMORY MATRIX (4×4) — DELTA',
    category: 'OBSERVATION',
    description: 'Memorize and reconstruct 3 progressive spatial recall patterns on a 4×4 grid.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 65,
    timeLimit: 120,
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // VISUAL_DELTA',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'CORRIDOR',
      maxHints: 2,
      clearanceCode: 'NX-MM-01',
      size: 4,
      maxReflashes: 2,
      rounds: [
        { id: 'R1', label: 'STAGE 01', count: 4, flashMs: 2000, targets: [0, 5, 10, 15] },
        { id: 'R2', label: 'STAGE 02', count: 5, flashMs: 2000, targets: [1, 4, 6, 9, 14] },
        { id: 'R3', label: 'STAGE 03', count: 6, flashMs: 2000, targets: [2, 3, 7, 8, 11, 13] },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'MEMORY_MATRIX:0,5,10,15|1,4,6,9,14|2,3,7,8,11,13',
      acceptedAnswers: ['MEMORY_MATRIX:0,5,10,15|1,4,6,9,14|2,3,7,8,11,13'],
      hints: [
        'HINT 01 // Look for diagonal symmetry during the initial flash rather than memorizing individual cell numbers.',
        'HINT 02 // Group lit cells by row counts (e.g., how many appear in the top two rows vs. bottom two rows).',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-MM-02',
    title: 'MEMORY MATRIX (4×4) — ECHO',
    category: 'OBSERVATION',
    description: 'New 4×4 spatial memory challenge — different node patterns across 3 stages.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 740,
    penalty: 100,
    timeLimit: 120,
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // VISUAL_ECHO',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'TECHNICAL',
      maxHints: 2,
      clearanceCode: 'NX-MM-02',
      size: 4,
      maxReflashes: 2,
      rounds: [
        { id: 'R1', label: 'STAGE 01', count: 5, flashMs: 2200, targets: [0, 2, 7, 9, 14] },
        { id: 'R2', label: 'STAGE 02', count: 6, flashMs: 2200, targets: [1, 3, 4, 11, 12, 15] },
        { id: 'R3', label: 'STAGE 03', count: 7, flashMs: 2200, targets: [0, 3, 5, 6, 10, 13, 15] },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'MEMORY_MATRIX:0,2,7,9,14|1,3,4,11,12,15|0,3,5,6,10,13,15',
      acceptedAnswers: ['MEMORY_MATRIX:0,2,7,9,14|1,3,4,11,12,15|0,3,5,6,10,13,15'],
      hints: [
        'HINT 01 // Anchor your recall on the 4 corner cells first, then note which interior cells are active.',
        'HINT 02 // You have 2 RE-FLASH pulses per stage — use them if you cannot recall the full pattern.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-MM-03',
    title: 'MEMORY MATRIX (5×5) — FOXTROT',
    category: 'OBSERVATION',
    description: 'New 5×5 variant with different stage patterns — 3 progressive stages.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 600,
    reward: 1250,
    penalty: 195,
    timeLimit: 150,
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // NEURAL_FOXTROT',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'RING_CITADEL',
      maxHints: 2,
      clearanceCode: 'NX-MM-03',
      size: 5,
      maxReflashes: 2,
      rounds: [
        { id: 'R1', label: 'STAGE 01', count: 6, flashMs: 2400, targets: [0, 2, 4, 10, 14, 24] },
        { id: 'R2', label: 'STAGE 02', count: 7, flashMs: 2400, targets: [1, 5, 9, 11, 13, 15, 23] },
        { id: 'R3', label: 'STAGE 03', count: 8, flashMs: 2400, targets: [0, 6, 8, 12, 16, 18, 20, 24] },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'MEMORY_MATRIX:0,2,4,10,14,24|1,5,9,11,13,15,23|0,6,8,12,16,18,20,24',
      acceptedAnswers: ['MEMORY_MATRIX:0,2,4,10,14,24|1,5,9,11,13,15,23|0,6,8,12,16,18,20,24'],
      hints: [
        'HINT 01 // Many stages on the 5×5 grid exhibit left-right mirror symmetry around the middle column.',
        'HINT 02 // Track the outer perimeter cells separately from the inner 3×3 core during the flash.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-MM-04',
    title: 'MEMORY MATRIX (3×3) — BEGINNER',
    category: 'OBSERVATION',
    description: 'Easiest memory matrix — small 3×3 grid, 2 stages, shorter flash window.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 150,
    reward: 320,
    penalty: 45,
    timeLimit: 90,
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // VISUAL_PRIMER',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-MM-04',
      size: 3,
      maxReflashes: 2,
      rounds: [
        { id: 'R1', label: 'STAGE 01', count: 3, flashMs: 1800, targets: [0, 4, 8] },
        { id: 'R2', label: 'STAGE 02', count: 4, flashMs: 1800, targets: [1, 3, 5, 7] },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'MEMORY_MATRIX:0,4,8|1,3,5,7',
      acceptedAnswers: ['MEMORY_MATRIX:0,4,8|1,3,5,7'],
      hints: [
        'HINT 01 // On a 3×3 grid, notice whether the lit cells lie on the corners, edges, or center.',
        'HINT 02 // Each stage forms a clean, symmetric geometric figure across the 9 cells.',
      ],
    },
    enabled: true,
    available: true,
  },
  {
    challengeId: 'CHG-OBS-MM-05',
    title: 'MEMORY MATRIX (5×5) — GAMMA EXTREME',
    category: 'OBSERVATION',
    description: 'Expert-level 5×5 memory matrix — 4 stages with increasing node counts.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 900,
    reward: 1900,
    penalty: 350,
    timeLimit: 180,
    gameType: 'memoryMatrix',
    gameConfig: {
      sector: 'SECTOR-03 // NEURAL_APEX',
      artworkKey: 'OBSERVATION',
      secondaryArtworkKey: 'FINAL_THRESHOLD',
      maxHints: 2,
      clearanceCode: 'NX-MM-05',
      size: 5,
      maxReflashes: 1,
      rounds: [
        { id: 'R1', label: 'STAGE 01', count: 7, flashMs: 2000, targets: [0, 2, 4, 12, 20, 22, 24] },
        { id: 'R2', label: 'STAGE 02', count: 8, flashMs: 2000, targets: [1, 3, 5, 9, 10, 14, 21, 23] },
        { id: 'R3', label: 'STAGE 03', count: 9, flashMs: 2000, targets: [0, 4, 6, 8, 12, 16, 18, 20, 24] },
        { id: 'R4', label: 'STAGE 04', count: 10, flashMs: 2000, targets: [1, 2, 3, 5, 9, 11, 13, 15, 19, 22] },
      ],
    },
    solutionConfig: {
      expectedAnswer: 'MEMORY_MATRIX:0,2,4,12,20,22,24|1,3,5,9,10,14,21,23|0,4,6,8,12,16,18,20,24|1,2,3,5,9,11,13,15,19,22',
      acceptedAnswers: ['MEMORY_MATRIX:0,2,4,12,20,22,24|1,3,5,9,10,14,21,23|0,4,6,8,12,16,18,20,24|1,2,3,5,9,11,13,15,19,22'],
      hints: [
        'HINT 01 // Every stage in this matrix is symmetric — memorize the left half and mirror it to the right half.',
        'HINT 02 // Only 1 RE-FLASH is available per stage at this difficulty — save it for Stages 3 and 4.',
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
        const matchesAttemptId =
          !requestedAttemptId ||
          String(team.activeAttempt.attemptId || '').trim() === requestedAttemptId;
        const matchesChallengeId =
          !requestedIdUpper ||
          String(team.activeAttempt.challengeId || '').toUpperCase() === requestedIdUpper;
        if (matchesAttemptId && matchesChallengeId) {
          matchedAttemptDoc = team.activeAttempt;
        }
      }
      if (
        !matchedAttemptDoc &&
        !requestedAttemptId &&
        !requestedIdUpper &&
        Array.isArray(team.activeAttempts) &&
        team.activeAttempts.length > 0
      ) {
        matchedAttemptDoc = team.activeAttempts[0];
      }

      // Prevent duplicate or stale submission/timeout if the requested attempt is no longer active
      if (!matchedAttemptDoc) {
        const err = new Error(
          'Duplicate or stale submission blocked: no active challenge session matches this request.'
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
      const solveDurationSeconds = Math.max(
        0,
        Math.round((now.getTime() - startedAt.getTime()) / 1000)
      );

      // Only treat as TIMEOUT when explicitly invoked by the timeout handler/watchdog,
      // never when an operative's actual solution submission arrives at the wire.
      const isTimeout = outcomeOverride === 'TIMEOUT';
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

