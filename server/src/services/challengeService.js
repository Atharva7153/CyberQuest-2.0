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
import { logger } from '../utils/logger.js';

export const DEFAULT_CHALLENGE_CATALOG = [
  {
    challengeId: 'CHG-PUZ-05',
    title: 'CIPHER MONOLITH',
    category: 'PUZZLES',
    description:
      'Transform the starting word into the target word by changing exactly 1 letter per step.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 350,
    reward: 750,
    penalty: 100,
    timeLimit: 1200, // 20 minutes
    gameType: 'wend',
    gameConfig: {
      sector: 'SECTOR-05 // CRYPT_SPIRE',
      artworkKey: 'PUZZLES',
      secondaryArtworkKey: 'CREDITS_SPIRE',
      maxHints: 2,
      clearanceCode: 'NX-PUZ-05',
      startWord: 'CODE',
      endWord: 'GATE',
      targetWord: 'GATE',
      wordLength: 4,
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Operating state or configuration (M _ _ E)',
          hint: 'Replace C with M -> MODE',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Constructed or built (M _ D E)',
          hint: 'Replace O with A -> MADE',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Pair, partner, or chess victory (M A _ E)',
          hint: 'Replace D with T -> MATE',
          length: 4,
        },
      ],
      solutionSteps: ['MODE', 'MADE', 'MATE'],
    },
    solutionConfig: {
      expectedAnswer: 'WEND:CODE-MODE-MADE-MATE-GATE',
      acceptedAnswers: [
        'WEND:CODE-MODE-MADE-MATE-GATE',
        'CODE-MODE-MADE-MATE-GATE',
        'MODE-MADE-MATE',
        'PAYLOAD',
        'NEXUS{PAYLOAD}',
      ],
      hints: [
        'HINT 01 // Step 1 is MODE (change C to M) and Step 2 is MADE (change O to A).',
        'HINT 02 // Step 3 is MATE (change D to T), which becomes GATE.',
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
      'Complete the 6×6 Sudoku grid so every row, column, and 2×3 block contains digits 1 through 6.',
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
        'HINT 01 // Every row, column, and 2×3 box must contain digits 1 to 6 exactly once.',
        'HINT 02 // Row 1 completes as [1, 2, 3, 4, 5, 6] and Row 2 as [4, 5, 6, 1, 2, 3].',
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
      'Defeat the NEXUS AI by aligning 4 X marks in a row horizontally, vertically, or diagonally on the 4×4 grid.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 220,
    reward: 460,
    penalty: 70,
    timeLimit: 900, // 15 minutes
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
    title: 'FORENSIC TRACE',
    category: 'OBSERVATION',
    description:
      'Divide the 5×5 grid into non-overlapping rectangular patches so each patch contains one number equal to its cell area.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 250,
    reward: 500,
    penalty: 75,
    timeLimit: 900, // 15 minutes
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
        'HINT 01 // Top-left 4 is a 2×2 square (rows 1-2, cols 1-2); top-right 6 is a 2×3 rectangle (rows 1-2, cols 3-5).',
        'HINT 02 // Bottom-left 3 is a 1×3 horizontal bar across row 5, cols 1-3.',
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
      'Draw a single continuous path from 1 to 6 in order that visits every cell on the 5×5 grid exactly once.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 500,
    reward: 950,
    penalty: 150,
    timeLimit: 1500, // 25 minutes
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
        'HINT 01 // Move right across Row 1 from 1 to 2, then step down and move left across Row 2 through 3.',
        'HINT 02 // Continue weaving back and forth across each row down to 6 at bottom-right.',
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
      'Outmaneuver the autonomous NEXUS AI in a 4×4 Tic-Tac-Toe tactical showdown.',
    difficulty: 'LOW',
    risk: 'SAFE',
    cost: 200,
    reward: 420,
    penalty: 60,
    timeLimit: 900, // 15 minutes
    gameType: 'xo4x4',
    gameConfig: {
      sector: 'SECTOR-01 // BULKHEAD',
      artworkKey: 'RISK_STAIRS',
      secondaryArtworkKey: 'LOGIC',
      maxHints: 2,
      clearanceCode: 'NX-LOG-06',
      aiSkill: 'STRATEGIC',
      subtitle: 'Connect 4 X marks horizontally, vertically, or diagonally on the 4×4 board.',
    },
    solutionConfig: {
      expectedAnswer: 'XO4X4:WIN',
      acceptedAnswers: ['XO4X4:WIN', 'COL-4', '4', 'COLUMN 4'],
      hints: [
        'HINT 01 // Occupy interior intersections first to maximize offensive lines.',
        'HINT 02 // Block any AI 3-in-a-row threat immediately while setting up a double threat.',
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
      'Bridge PORT to PING by transforming one letter at a time using the step clues.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 300,
    reward: 620,
    penalty: 85,
    timeLimit: 1200, // 20 minutes
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
          clue: 'Step 1 — Change 1 letter: Component, piece, or disk partition (P _ R T)',
          hint: 'Replace O with A -> PART',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Breathe rapidly after exertion (P A _ T)',
          hint: 'Replace R with N -> PANT',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Unit of liquid measure (P _ N T)',
          hint: 'Replace A with I -> PINT',
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
        'HINT 01 // Step 1 is PART and Step 2 is PANT.',
        'HINT 02 // Step 3 is PINT, which changes T to G to reach PING.',
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
      'Partition the 6×6 surveillance grid into rectangular patches matching each numbered area clue.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 550,
    reward: 1050,
    penalty: 180,
    timeLimit: 1500, // 25 minutes
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
        'HINT 01 // The 9 clue in the top-right forms a 3×3 square covering rows 1-3, cols 4-6.',
        'HINT 02 // The left three columns split cleanly into three 2×3 rectangles of area 6.',
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
      'Solve the 9×9 Sudoku matrix so every row, column, and 3×3 block contains digits 1 through 9.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 700,
    reward: 1350,
    penalty: 250,
    timeLimit: 1800, // 30 minutes
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
        'HINT 01 // Check which single digit from 1 to 9 is missing in each nearly-complete row.',
        'HINT 02 // Row 1 Col 3 is 4; Row 4 Col 6 is 1; Center cell (Row 5 Col 5) is 5.',
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
      'Connect waypoints 1 through 6 in order while visiting every cell on the 5×5 core grid.',
    difficulty: 'HIGH',
    risk: 'AGGRESSIVE',
    cost: 600,
    reward: 1150,
    penalty: 200,
    timeLimit: 1500, // 25 minutes
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
        'HINT 01 // Go straight down Column 1 from 1 to 2, then straight up Column 2 through 3.',
        'HINT 02 // Continue weaving vertically column-by-column to 6 at bottom-right.',
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
      'Divide the 5×5 sentinel matrix into rectangular patches so each patch matches its numbered area clue.',
    difficulty: 'MODERATE',
    risk: 'BALANCED',
    cost: 400,
    reward: 800,
    penalty: 120,
    timeLimit: 1200, // 20 minutes
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
        'HINT 01 // The 5 clue at the top spans the entire first row (1×5).',
        'HINT 02 // Below row 1, the left side splits into two 2×2 squares (4) and the right side into two 2×3 rectangles (6).',
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
      'Transform FAIL into PASS one letter at a time to clear the reactor consensus deadlock.',
    difficulty: 'EXTREME',
    risk: 'AGGRESSIVE',
    cost: 800,
    reward: 1600,
    penalty: 300,
    timeLimit: 1800, // 30 minutes
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
          clue: 'Step 1 — Change 1 letter: Drop downward under gravity (F A _ L)',
          hint: 'Replace I with L -> FALL',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Tall or dark-featured covering/cloak (P A L L)',
          hint: 'Replace F with P -> PALL',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Trusted friends or comrades (P A L _)',
          hint: 'Replace second L with S -> PALS',
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
        'HINT 01 // Step 1 is FALL (I -> L) and Step 2 is PALL (F -> P).',
        'HINT 02 // Step 3 is PALS (second L -> S), which becomes PASS.',
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
  static async acquireChallengeForTeam({ teamDoc, teamId, challengeId, isReattemptRequested }) {
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

      // Prevent duplicate purchase if this challenge is already actively in progress
      if (
        team.activeAttempt &&
        team.activeAttempt.status === 'IN_PROGRESS' &&
        String(team.activeAttempt.challengeId).toUpperCase() === challenge.challengeId
      ) {
        const err = new Error(
          `Challenge [${challenge.title}] is already active in progress for your squad.`
        );
        err.statusCode = 409;
        err.code = 'CHALLENGE_ALREADY_ACTIVE';
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

    let priorAttemptsCount = wasFailed ? 1 : 0;
    if (mongoose.connection.readyState === 1) {
      const dbPriorCount = await ChallengeAttempt.countDocuments({
        teamId: team.teamId,
        challengeId: challenge.challengeId,
      }).catch(() => 0);
      priorAttemptsCount = Math.max(priorAttemptsCount, dbPriorCount);
    }

    const attemptNumber = priorAttemptsCount + 1;
    const isReattempt = Boolean(priorAttemptsCount > 0 || wasFailed || isReattemptRequested);

    // Server calculates increased reattempt cost — never accept price from client
    const effectiveCost = isReattempt
      ? creditsConfig.calculateReattemptCost(challenge.cost, Math.max(1, priorAttemptsCount))
      : Number(challenge.cost || 0);
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
        ? `REATTEMPT #${attemptNumber} ACQUIRED: ${challenge.title} (-${effectiveCost} CR)`
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
      attemptNumber,
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
        attemptNumber,
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
        rewardPenaltyDelta: 0,
        timeLimit: timeLimitSeconds,
        hintsUnlocked: 0,
        unlockedHints: [],
        extraTimeMinutes: 0,
        isReattempt,
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
      action: AUDIT_ACTION_TYPES.PURCHASE,
      actorType: 'TEAM',
      actorId: team.teamId,
      teamId: team.teamId,
      challengeId: challenge.challengeId,
      attemptId,
      attemptNumber,
      creditsDelta: -effectiveCost,
      balanceAfter: team.credits,
      summary: `${team.teamId} purchased ${
        isReattempt ? `reattempt #${attemptNumber}` : 'challenge'
      } [${challenge.challengeId}] ${challenge.title} for ${effectiveCost} CR`,
      metadata: {
        baseCost: challenge.cost,
        effectiveCost,
        isReattempt,
        attemptNumber,
        risk: normalizedRisk,
      },
    });

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
      summary: `${team.teamId} started session [${attemptId}] (Attempt #${attemptNumber}) on [${challenge.challengeId}]`,
      metadata: {
        startedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        timeLimit: timeLimitSeconds,
      },
    });

      return {
        team,
        challenge,
        creditResult,
        activeAttempt: team.activeAttempt,
      };
    } finally {
      ChallengeService._acquisitionLocks.delete(acqLockKey);
    }
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
    const resolvedTeamId = String(teamDoc?.teamId || teamId || '')
      .trim()
      .toUpperCase();
    const teamLockKey = `${resolvedTeamId}:SUBMIT`;

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

      const hasStructuredGamePayload =
        typeof submission === 'object' &&
        submission !== null &&
        Boolean(
          submission.grid ||
            submission.board ||
            submission.words ||
            submission.steps ||
            submission.patches ||
            submission.path
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

      const normalizedSubmitted = rawAnswer.toUpperCase().replace(/\s+/g, ' ').trim();
      const expected = String(fullChallenge.solutionConfig?.expectedAnswer || '')
        .toUpperCase()
        .trim();
      const acceptedList = (fullChallenge.solutionConfig?.acceptedAnswers || [expected]).map((a) =>
        String(a).toUpperCase().trim()
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
        ? evaluateGameSubmissionServer(submission, fullChallenge)
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
        summary: `${team.teamId} submitted solution for [${fullChallenge.challengeId}] ${fullChallenge.title} (Attempt #${attemptNumber})`,
        metadata: {
          attemptId: resolvedAttemptId,
          attemptNumber,
          cost: costPaid,
          isTimeout,
          isAbandoned,
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
          cost: costPaid,
          reward,
          penalty: fullChallenge.penalty,
          difficulty: fullChallenge.difficulty,
          risk: normalizedRisk,
          timeLimit: fullChallenge.timeLimit,
          gameType: fullChallenge.gameType,
          attemptNumber,
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
          startedAt: startedAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          submittedAt: now.toISOString(),
          completedAt: now.toISOString(),
          timeLimit,
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
          summary: `${team.teamId} succeeded on [${fullChallenge.challengeId}] ${fullChallenge.title} (Attempt #${attemptNumber}, +${reward} CR)`,
          metadata: {
            cost: costPaid,
            reward,
            attemptNumber,
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

        const statusMessage =
          canonicalFailStatus === 'TIMEOUT'
            ? `SESSION TIMEOUT // Server timer expired for ${fullChallenge.title}. -${penalty} CR penalty applied.`
            : canonicalFailStatus === 'ABANDONED'
              ? `SESSION ABANDONED // Operative aborted active session for ${fullChallenge.title}. -${penalty} CR penalty applied.`
              : `VERIFICATION FAILED // Submitted payload rejected for ${fullChallenge.title}. -${penalty} CR penalty applied.`;

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
          summary: `${team.teamId} failed [${fullChallenge.challengeId}] ${fullChallenge.title} with [${canonicalFailStatus}] (Attempt #${attemptNumber}, -${penalty} CR)`,
          metadata: {
            cost: costPaid,
            penalty,
            status: canonicalFailStatus,
            attemptNumber,
          },
        });
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

