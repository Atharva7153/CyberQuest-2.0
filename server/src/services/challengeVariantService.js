/**
 * CHALLENGE VARIANT & QUESTION POOL ENGINE (Method B — 500+ Player Anti-Collusion)
 *
 * Ensures that when teams acquire/start a challenge in a crowded college hall:
 * 1. Aptitude & GK True/False challenges draw a randomized subset of questions
 *    from a large question pool (16–18 questions per challenge) in randomized order.
 * 2. Word Guess & Word Ladder (Wend) challenges assign one of multiple distinct
 *    verified word/ladder variants per team attempt.
 * 3. Board puzzles (Sudoku, Patches, Zip, N-Queens) apply valid board permutations /
 *    geometric transforms / starting positions per team attempt.
 */

// Helper: deterministic + entropy seed shuffle (Fisher-Yates)
const createSeededRng = (seedStr = '') => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffleWithRng = (arr, rng) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// ============================================================================
// 1. QUESTION POOLS FOR APTITUDE (QUANT & LOGIC)
// ============================================================================
export const QUANT_APTITUDE_POOL = [
  {
    topic: 'NUMBER SERIES',
    question: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
    options: ['95', '125', '127', '131'],
    answer: 'C',
    hintNote: 'Check how the difference between consecutive terms doubles each step (+4, +8, +16, +32...).',
  },
  {
    topic: 'TIME & WORK',
    question:
      'Node A processes a batch in 12 minutes and Node B processes the same batch in 6 minutes. Working together, how long will they take?',
    options: ['3 minutes', '4 minutes', '4.5 minutes', '5 minutes'],
    answer: 'B',
    hintNote: 'Add the per-minute work rates (1/A + 1/B) and take the reciprocal.',
  },
  {
    topic: 'PERCENTAGE CHANGE',
    question:
      'A server increases its clock speed by 25% and then reduces it by 20%. What is the net percentage change?',
    options: ['0% (No change)', '+5% increase', '-5% decrease', '+2% increase'],
    answer: 'A',
    hintNote: 'Multiply the two scale factors (1.25 × 0.80) to find the net multiplier.',
  },
  {
    topic: 'SPEED & DISTANCE',
    question: 'A signal drone covers 120 meters in 6 seconds. What is its speed in km/h?',
    options: ['54 km/h', '60 km/h', '72 km/h', '80 km/h'],
    answer: 'C',
    hintNote: 'First find speed in m/s (distance ÷ time), then multiply by 3.6 to convert to km/h.',
  },
  {
    topic: 'NUMBER SERIES',
    question: 'Find the missing number in the sequence: 2, 6, 12, 20, 30, ?',
    options: ['38', '40', '42', '44'],
    answer: 'C',
    hintNote: 'Look at the consecutive differences (+4, +6, +8, +10...) or n × (n + 1).',
  },
  {
    topic: 'RATIOS & PROPORTION',
    question:
      'Bandwidth is split between 3 servers in the ratio 2 : 3 : 5. If the total bandwidth is 200 Mbps, what is the largest server allocation?',
    options: ['60 Mbps', '80 Mbps', '100 Mbps', '120 Mbps'],
    answer: 'C',
    hintNote: 'Sum the ratio parts (2 + 3 + 5 = 10) and multiply one part by the largest share.',
  },
  {
    topic: 'AVERAGES',
    question:
      'The average latency of 4 network packets is 18 ms. When a 5th packet arrives, the average becomes 20 ms. What is the latency of the 5th packet?',
    options: ['22 ms', '26 ms', '28 ms', '30 ms'],
    answer: 'C',
    hintNote: 'Compare the new total sum (5 × 20) against the previous total sum (4 × 18).',
  },
  {
    topic: 'PIPES & BUFFERS',
    question:
      'Stream A fills a data buffer in 10 seconds, while Consumer B drains the full buffer in 15 seconds. If both run together, how long to fill the empty buffer?',
    options: ['20 seconds', '25 seconds', '30 seconds', '35 seconds'],
    answer: 'C',
    hintNote: 'Subtract the drain rate from the fill rate (1/10 - 1/15) to get the net fill rate per second.',
  },
  {
    topic: 'PROFIT & COST',
    question:
      'A hardware module bought for 400 CR is sold for 500 CR. What is the profit percentage?',
    options: ['20%', '25%', '30%', '15%'],
    answer: 'B',
    hintNote: 'Profit percentage is always calculated relative to the original cost: (Profit ÷ Cost) × 100.',
  },
  {
    topic: 'TRAIN & BRIDGE',
    question:
      'A 150-meter metro train moving at 54 km/h crosses a 150-meter platform. How many seconds does it take to clear the platform completely?',
    options: ['10 seconds', '15 seconds', '20 seconds', '25 seconds'],
    answer: 'C',
    hintNote: 'Convert 54 km/h to m/s (÷ 3.6) and divide the total length (train + platform) by speed.',
  },
  {
    topic: 'SIMPLE INTEREST',
    question:
      'At what annual simple interest rate will 500 CR grow to 650 CR in 3 years?',
    options: ['8%', '10%', '12%', '15%'],
    answer: 'B',
    hintNote: 'Use Simple Interest = (Principal × Rate × Time) / 100 where Interest = 650 - 500.',
  },
  {
    topic: 'EXPONENTS & LOGS',
    question: 'If 2^(x + 1) = 64, what is the value of x?',
    options: ['4', '5', '6', '7'],
    answer: 'B',
    hintNote: 'Express 64 as a power of 2 and equate the exponents.',
  },
  {
    topic: 'WORK EFFICIENCY',
    question:
      'If 8 worker threads can compile a project in 15 seconds, how many worker threads are needed to compile it in 10 seconds?',
    options: ['10 threads', '12 threads', '14 threads', '16 threads'],
    answer: 'B',
    hintNote: 'Total thread-seconds of work remains constant: Threads₁ × Time₁ = Threads₂ × Time₂.',
  },
  {
    topic: 'NUMBER SERIES',
    question: 'Find the next number in the geometric-shift series: 5, 11, 23, 47, ?',
    options: ['91', '93', '95', '97'],
    answer: 'C',
    hintNote: 'Each term is formed by doubling the previous term and adding 1.',
  },
  {
    topic: 'PERMUTATIONS',
    question:
      'How many distinct 3-digit PIN codes can be formed using the digits 1, 2, 3, 4 if no digit can be repeated?',
    options: ['12', '18', '24', '64'],
    answer: 'C',
    hintNote: 'Multiply the number of choices for the 1st, 2nd, and 3rd positions (4 × 3 × 2).',
  },
  {
    topic: 'MIXTURE & STORAGE',
    question:
      'A 60 GB drive is 40% full. How many more gigabytes of data must be added so the drive becomes 75% full?',
    options: ['18 GB', '21 GB', '24 GB', '27 GB'],
    answer: 'B',
    hintNote: 'Calculate 35% (75% - 40%) of the 60 GB total capacity.',
  },
];

export const LOGIC_APTITUDE_POOL = [
  {
    topic: 'CODING-DECODING',
    question:
      'If NEXUS is coded as OFYVT (each letter shifted +1 forward), how is LOGIC coded?',
    options: ['MPHJF', 'MPHJD', 'LPHJD', 'NQIKE'],
    answer: 'B',
    hintNote: 'Shift each letter of LOGIC forward by +1 in the alphabet, paying special attention to the last letter.',
  },
  {
    topic: 'DIRECTION SENSE',
    question:
      'An operative walks 8 km North, turns Right and walks 6 km. How far is the operative in a straight line from the starting point?',
    options: ['10 km', '12 km', '14 km', '7 km'],
    answer: 'A',
    hintNote: 'North and East form a right-angled triangle; apply the Pythagorean theorem a² + b² = c².',
  },
  {
    topic: 'PROBABILITY',
    question:
      'Two fair coins are tossed simultaneously. What is the probability of getting at least one Head?',
    options: ['1/4', '1/2', '3/4', '2/3'],
    answer: 'C',
    hintNote: 'List all 4 outcomes (HH, HT, TH, TT) and count how many contain at least one H.',
  },
  {
    topic: 'ODD ONE OUT',
    question: 'Which number does NOT belong in the group: 16, 25, 36, 48, 64, 81?',
    options: ['25', '36', '48', '64'],
    answer: 'C',
    hintNote: 'Check which numbers are perfect squares of integers.',
  },
  {
    topic: 'CODING-DECODING',
    question:
      'In a cipher, CLOUD is written as DKNTC (+1, -1, +1, -1, +1). Wait — if PIXEL is shifted +2 on every letter, what is the code?',
    options: ['RKZGN', 'RKYGN', 'QJZFM', 'RKZGM'],
    answer: 'A',
    hintNote: 'Advance each letter of P-I-X-E-L forward by 2 positions in the alphabet.',
  },
  {
    topic: 'SYLLOGISM',
    question:
      'All Routers are Switches. Some Switches are Firewalls. Which conclusion definitely follows?',
    options: [
      'All Routers are Firewalls',
      'Some Switches are Routers',
      'No Router is a Firewall',
      'All Firewalls are Switches',
    ],
    answer: 'B',
    hintNote: 'If all A are inside B, then part of B is guaranteed to be A.',
  },
  {
    topic: 'ORDER & RANKING',
    question:
      'In a leaderboard of 30 teams, Team Alpha ranks 12th from the top. What is Team Alpha’s rank from the bottom?',
    options: ['18th', '19th', '20th', '17th'],
    answer: 'B',
    hintNote: 'Rank from bottom = (Total Teams - Rank from top) + 1.',
  },
  {
    topic: 'CLOCK GEOMETRY',
    question:
      'What is the angle between the hour hand and the minute hand of a clock at exactly 3:00?',
    options: ['60°', '75°', '90°', '120°'],
    answer: 'C',
    hintNote: 'A full 12-hour dial is 360°, so each hour mark represents 30°.',
  },
  {
    topic: 'PROBABILITY',
    question:
      'A standard 6-sided die is rolled once. What is the probability of rolling a prime number?',
    options: ['1/3', '1/2', '2/3', '1/6'],
    answer: 'B',
    hintNote: 'Identify which numbers among {1, 2, 3, 4, 5, 6} are prime (remember 1 is not prime).',
  },
  {
    topic: 'LETTER SERIES',
    question: 'Find the next letter pair in the pattern: AZ, BY, CX, DW, ?',
    options: ['EV', 'EU', 'FV', 'EW'],
    answer: 'A',
    hintNote: 'The first letter steps forward from A while the second letter steps backward from Z.',
  },
  {
    topic: 'DIRECTION SENSE',
    question:
      'Facing East, a rover turns 90° clockwise, then 180° counter-clockwise. Which direction is it facing now?',
    options: ['North', 'South', 'West', 'East'],
    answer: 'A',
    hintNote: 'Track each 90° turn step-by-step starting from East.',
  },
  {
    topic: 'BLOOD RELATIONS',
    question:
      'Pointing to a photograph, Aria says, "He is the only son of my mother’s father." How is the man in the photograph related to Aria?',
    options: ['Brother', 'Maternal Uncle', 'Father', 'Cousin'],
    answer: 'B',
    hintNote: 'Break down "mother’s father" first, then identify his only son relative to Aria’s mother.',
  },
  {
    topic: 'BINARY LOGIC',
    question: 'If A = 1 and B = 0, what is the output of the boolean expression: (A AND B) OR (NOT B)?',
    options: ['0', '1', 'Undefined', 'Depends on A'],
    answer: 'B',
    hintNote: 'Evaluate (A AND B) first, then evaluate (NOT B), and combine them with OR.',
  },
  {
    topic: 'ANALOGY',
    question: 'COMPILER : SOURCE CODE :: DNS : ?',
    options: ['IP PACKET', 'DOMAIN NAME', 'MAC ADDRESS', 'ENCRYPTION KEY'],
    answer: 'B',
    hintNote: 'A compiler translates source code into machine code; what does DNS translate into an IP address?',
  },
  {
    topic: 'ODD ONE OUT',
    question: 'Which protocol does NOT belong with the others: TCP, UDP, HTTP, MONITOR?',
    options: ['TCP', 'UDP', 'HTTP', 'MONITOR'],
    answer: 'D',
    hintNote: 'Three of the options are network communication protocols, while one is a hardware display.',
  },
  {
    topic: 'CALENDAR LOGIC',
    question: 'If the 1st of a month falls on a Monday, what day of the week will the 22nd of the same month be?',
    options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    answer: 'B',
    hintNote: 'Adding multiples of 7 days (+7, +14, +21) always lands on the exact same day of the week.',
  },
];

// ============================================================================
// 2. STATEMENT POOLS FOR GK TRUE OR FALSE (6 STATEMENTS PER ATTEMPT)
// ============================================================================
export const GK_TECH_SCIENCE_POOL = [
  {
    topic: 'WEB PROTOCOLS',
    statement: 'HTTP Status Code 404 means the server crashed due to an internal error.',
    answer: 'F',
  },
  {
    topic: 'ASTROPHYSICS',
    statement: 'Sunlight takes approximately 8 minutes and 20 seconds to travel from the Sun to Earth.',
    answer: 'T',
  },
  {
    topic: 'CHEMISTRY',
    statement: 'Diamond and Graphite are both pure allotropes of the element Carbon.',
    answer: 'T',
  },
  {
    topic: 'NETWORKING',
    statement: 'An IPv4 address uses 32 bits, while an IPv6 address uses 128 bits.',
    answer: 'T',
  },
  {
    topic: 'PHYSICS',
    statement: 'Sound waves travel faster through air than they do through solid steel.',
    answer: 'F',
  },
  {
    topic: 'COMPUTING',
    statement: 'One Byte consists of exactly 8 bits.',
    answer: 'T',
  },
  {
    topic: 'OPERATING SYSTEMS',
    statement: 'RAM (Random Access Memory) retains all stored data permanently even when power is turned off.',
    answer: 'F',
  },
  {
    topic: 'SPACE SCIENCE',
    statement: 'Venus is the hottest planet in our Solar System due to its dense carbon dioxide atmosphere.',
    answer: 'T',
  },
  {
    topic: 'COMPUTER SCIENCE',
    statement: 'Binary search requires the input array or list to be sorted beforehand.',
    answer: 'T',
  },
  {
    topic: 'PHYSICS',
    statement: 'Electrical resistance is measured in Ohms (Ω).',
    answer: 'T',
  },
  {
    topic: 'CHEMISTRY',
    statement: 'Nitrogen makes up roughly 78% of Earth’s atmosphere by volume.',
    answer: 'T',
  },
  {
    topic: 'WEB DEVELOPMENT',
    statement: 'HTML is a relational database management system used to run SQL queries.',
    answer: 'F',
  },
  {
    topic: 'NETWORKING',
    statement: 'The default port for standard unencrypted HTTP traffic is Port 80.',
    answer: 'T',
  },
  {
    topic: 'ELECTRONICS',
    statement: 'A diode allows electric current to flow easily in one direction while blocking the opposite direction.',
    answer: 'T',
  },
  {
    topic: 'ASTRONOMY',
    statement: 'A light-year is a unit of time equal to 365.25 Earth days.',
    answer: 'F',
  },
  {
    topic: 'BIOLOGY',
    statement: 'Mitochondria generate most of the chemical energy (ATP) needed to power a eukaryotic cell.',
    answer: 'T',
  },
  {
    topic: 'THERMODYNAMICS',
    statement: 'Pure water boils at 100°C at standard sea-level atmospheric pressure.',
    answer: 'T',
  },
  {
    topic: 'DATABASES',
    statement: 'In a relational database, a Primary Key column is allowed to contain duplicate NULL values.',
    answer: 'F',
  },
];

export const GK_WORLD_CYBER_POOL = [
  {
    topic: 'CYBERSECURITY',
    statement: 'HTTPS encrypts communication between a browser and a website using TLS/SSL.',
    answer: 'T',
  },
  {
    topic: 'WORLD GEOGRAPHY',
    statement: 'Australia is both a sovereign country and a continent.',
    answer: 'T',
  },
  {
    topic: 'DATA STRUCTURES',
    statement: 'A Stack data structure operates on a First-In, First-Out (FIFO) principle.',
    answer: 'F',
  },
  {
    topic: 'TECH HISTORY',
    statement: 'The Linux kernel was originally created by Linus Torvalds in 1991.',
    answer: 'T',
  },
  {
    topic: 'HUMAN BIOLOGY',
    statement: 'The femur (thigh bone) is the longest and strongest bone in the human body.',
    answer: 'T',
  },
  {
    topic: 'NUMBER SYSTEMS',
    statement: 'The binary representation of the decimal number 10 is 1100.',
    answer: 'F',
  },
  {
    topic: 'CYBERSECURITY',
    statement: 'Phishing is a social-engineering attack that tricks users into revealing sensitive credentials.',
    answer: 'T',
  },
  {
    topic: 'VERSION CONTROL',
    statement: 'Git is a distributed version control system originally created for Linux kernel development.',
    answer: 'T',
  },
  {
    topic: 'CRYPTOGRAPHY',
    statement: 'In asymmetric (public-key) encryption, the exact same key is used for both encryption and decryption.',
    answer: 'F',
  },
  {
    topic: 'WORLD GEOGRAPHY',
    statement: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
    answer: 'T',
  },
  {
    topic: 'NETWORKING',
    statement: 'DNS (Domain Name System) translates human-readable domain names into IP addresses.',
    answer: 'T',
  },
  {
    topic: 'ALGORITHMS',
    statement: 'The worst-case time complexity of Bubble Sort on N elements is O(log N).',
    answer: 'F',
  },
  {
    topic: 'CYBERSECURITY',
    statement: 'Two-Factor Authentication (2FA) requires two independent forms of verification before granting access.',
    answer: 'T',
  },
  {
    topic: 'COMPUTER ARCHITECTURE',
    statement: 'CPU L1 Cache is faster to access than main system RAM.',
    answer: 'T',
  },
  {
    topic: 'NUMBER SYSTEMS',
    statement: 'In hexadecimal notation, the letter F represents the decimal value 15.',
    answer: 'T',
  },
  {
    topic: 'TECH HISTORY',
    statement: 'The World Wide Web was invented by Tim Berners-Lee at CERN.',
    answer: 'T',
  },
  {
    topic: 'OPERATING SYSTEMS',
    statement: 'A deadlock occurs when two or more processes are permanently blocked waiting for resources held by each other.',
    answer: 'T',
  },
  {
    topic: 'NETWORK PROTOCOLS',
    statement: 'UDP guarantees packet delivery order and automatic retransmission of lost packets.',
    answer: 'F',
  },
];

// ============================================================================
// 3. WORD GUESS VARIANT POOL (CHG-PUZ-05)
// ============================================================================
export const WORD_GUESS_VARIANTS = [
  {
    variantId: 'WG-CIPHER',
    word: 'CIPHER',
    wordLength: 6,
    categoryHint: 'CRYPTOGRAPHY · 6 LETTERS',
    cipherClue:
      'Cryptographic algorithm used for encoding and decoding classified payloads (6 letters).',
    scrambledLetters: ['C', 'I', 'P', 'H', 'E', 'R', 'X', 'T', 'K'],
    hints: [
      'HINT 01 // A 6-letter cryptography term for an algorithm that transforms plaintext into secret text.',
      'HINT 02 // Starts with C and ends with R (e.g., Caesar or Block ______).',
    ],
  },
  {
    variantId: 'WG-SOCKET',
    word: 'SOCKET',
    wordLength: 6,
    categoryHint: 'NETWORKING · 6 LETTERS',
    cipherClue:
      'Bidirectional network communication endpoint binding an IP address and port number (6 letters).',
    scrambledLetters: ['S', 'O', 'C', 'K', 'E', 'T', 'N', 'R', 'L'],
    hints: [
      'HINT 01 // A 6-letter networking term for the software endpoint created when an IP and port are bound.',
      'HINT 02 // Starts with S and ends with T (think Web______ or TCP ______).',
    ],
  },
  {
    variantId: 'WG-KERNEL',
    word: 'KERNEL',
    wordLength: 6,
    categoryHint: 'OPERATING SYSTEMS · 6 LETTERS',
    cipherClue:
      'Core operating system program that has complete control over hardware and memory resources (6 letters).',
    scrambledLetters: ['K', 'E', 'R', 'N', 'E', 'L', 'S', 'P', 'M'],
    hints: [
      'HINT 01 // Linux is technically this core part of the operating system that bridges software and hardware.',
      'HINT 02 // A 6-letter word starting with K and ending with L.',
    ],
  },
  {
    variantId: 'WG-PACKET',
    word: 'PACKET',
    wordLength: 6,
    categoryHint: 'NETWORKING · 6 LETTERS',
    cipherClue:
      'Formatted unit of data carried across a network containing a header and payload (6 letters).',
    scrambledLetters: ['P', 'A', 'C', 'K', 'E', 'T', 'D', 'B', 'W'],
    hints: [
      'HINT 01 // Routers inspect and forward this fundamental 6-letter unit of network traffic.',
      'HINT 02 // Starts with P and ends with T (e.g., ______ switching or ______ loss).',
    ],
  },
  {
    variantId: 'WG-ROUTER',
    word: 'ROUTER',
    wordLength: 6,
    categoryHint: 'INFRASTRUCTURE · 6 LETTERS',
    cipherClue:
      'Networking device that forwards data packets between different computer networks (6 letters).',
    scrambledLetters: ['R', 'O', 'U', 'T', 'E', 'R', 'G', 'S', 'N'],
    hints: [
      'HINT 01 // Operates at Layer 3 (Network Layer) to determine the best path for traffic across subnets.',
      'HINT 02 // A 6-letter word that both starts and ends with the letter R.',
    ],
  },
  {
    variantId: 'WG-DAEMON',
    word: 'DAEMON',
    wordLength: 6,
    categoryHint: 'SYSTEMS · 6 LETTERS',
    cipherClue:
      'Background computer process in Unix/Linux that runs unattended without direct user control (6 letters).',
    scrambledLetters: ['D', 'A', 'E', 'M', 'O', 'N', 'S', 'H', 'C'],
    hints: [
      'HINT 01 // Explain why services like sshd, httpd, and crond end with the letter "d".',
      'HINT 02 // A 6-letter system process term starting with D and ending with N.',
    ],
  },
];

// ============================================================================
// 4. WEND (WORD LADDER) VARIANT POOLS
// ============================================================================
export const WEND_VARIANTS_BY_CHALLENGE = {
  'CHG-KNW-09': [
    {
      variantId: 'WEND-PORT-PING',
      startWord: 'PORT',
      endWord: 'PING',
      wordLength: 4,
      variantDescription: 'Turn PORT into PING by changing one letter at a time using the clues.',
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
      expectedWords: ['PORT', 'PART', 'PANT', 'PINT', 'PING'],
      expectedAnswer: 'WEND:PORT-PART-PANT-PINT-PING',
      acceptedAnswers: ['WEND:PORT-PART-PANT-PINT-PING', 'PORT-PART-PANT-PINT-PING', 'PART-PANT-PINT'],
      hints: [
        'HINT 01 // Keep the starting letter P fixed throughout the entire ladder; begin by changing the vowel in PORT.',
        'HINT 02 // Step 3 is a 4-letter unit of liquid volume that shares P-I-N with the target word PING.',
      ],
    },
    {
      variantId: 'WEND-COLD-WARM',
      startWord: 'COLD',
      endWord: 'WARM',
      wordLength: 4,
      variantDescription: 'Turn COLD into WARM by changing one letter at a time using the clues.',
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: A thick insulated cable or rope',
          hint: 'Change the third letter of COLD to R.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Printed circuit board or access pass',
          hint: 'Change the vowel in CORD to A.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Protected hospital wing or city district',
          hint: 'Change the first letter of CARD to match the starting letter of WARM.',
          length: 4,
        },
      ],
      solutionSteps: ['CORD', 'CARD', 'WARD'],
      expectedWords: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM'],
      expectedAnswer: 'WEND:COLD-CORD-CARD-WARD-WARM',
      acceptedAnswers: ['WEND:COLD-CORD-CARD-WARD-WARM', 'COLD-CORD-CARD-WARD-WARM', 'CORD-CARD-WARD'],
      hints: [
        'HINT 01 // Keep the ending letter D fixed for the first three steps while transforming C-O-L into W-A-R.',
        'HINT 02 // Step 2 is a 4-letter word for a hardware expansion board or ID pass.',
      ],
    },
    {
      variantId: 'WEND-BOOT-CELL',
      startWord: 'BOOT',
      endWord: 'CELL',
      wordLength: 4,
      variantDescription: 'Turn BOOT into CELL by changing one letter at a time using the clues.',
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Flash of lightning or metal fastener',
          hint: 'Change the third letter of BOOT to L.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Loop of material that drives pulleys or gears',
          hint: 'Change the vowel in BOLT to E.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Chime or acoustic alarm ringer',
          hint: 'Change the last letter of BELT to L.',
          length: 4,
        },
      ],
      solutionSteps: ['BOLT', 'BELT', 'BELL'],
      expectedWords: ['BOOT', 'BOLT', 'BELT', 'BELL', 'CELL'],
      expectedAnswer: 'WEND:BOOT-BOLT-BELT-BELL-CELL',
      acceptedAnswers: ['WEND:BOOT-BOLT-BELT-BELL-CELL', 'BOOT-BOLT-BELT-BELL-CELL', 'BOLT-BELT-BELL'],
      hints: [
        'HINT 01 // Keep the starting letter B for the first three steps while turning O-O-T into E-L-L.',
        'HINT 02 // Step 3 is a 4-letter word ending in double-L that rings.',
      ],
    },
  ],
  'CHG-TEC-12': [
    {
      variantId: 'WEND-FAIL-PASS',
      startWord: 'FAIL',
      endWord: 'PASS',
      wordLength: 4,
      variantDescription: 'Turn FAIL into PASS one letter at a time using the step clues.',
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
      expectedWords: ['FAIL', 'FALL', 'PALL', 'PALS', 'PASS'],
      expectedAnswer: 'WEND:FAIL-FALL-PALL-PALS-PASS',
      acceptedAnswers: ['WEND:FAIL-FALL-PALL-PALS-PASS', 'FAIL-FALL-PALL-PALS-PASS', 'FALL-PALL-PALS'],
      hints: [
        'HINT 01 // First turn FAIL into a word ending with double-L, then change the first letter to P.',
        'HINT 02 // Step 3 is a 4-letter plural noun meaning friends, which is one letter away from PASS.',
      ],
    },
    {
      variantId: 'WEND-HACK-BOOK',
      startWord: 'HACK',
      endWord: 'BOOK',
      wordLength: 4,
      variantDescription: 'Turn HACK into BOOK one letter at a time using the step clues.',
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Shortage or absence of something needed',
          hint: 'Change the first letter of HACK to L.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Security mechanism opened with a key or cipher',
          hint: 'Change the vowel in LACK to O.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Direct your eyes to observe or inspect',
          hint: 'Change the third letter of LOCK to O.',
          length: 4,
        },
      ],
      solutionSteps: ['LACK', 'LOCK', 'LOOK'],
      expectedWords: ['HACK', 'LACK', 'LOCK', 'LOOK', 'BOOK'],
      expectedAnswer: 'WEND:HACK-LACK-LOCK-LOOK-BOOK',
      acceptedAnswers: ['WEND:HACK-LACK-LOCK-LOOK-BOOK', 'HACK-LACK-LOCK-LOOK-BOOK', 'LACK-LOCK-LOOK'],
      hints: [
        'HINT 01 // Keep the final letter K fixed across the entire ladder; start by changing H to L.',
        'HINT 02 // Step 2 is a 4-letter security fastener that rhymes with ROCK.',
      ],
    },
    {
      variantId: 'WEND-WIRE-GATE',
      startWord: 'WIRE',
      endWord: 'GATE',
      wordLength: 4,
      variantDescription: 'Turn WIRE into GATE one letter at a time using the step clues.',
      steps: [
        {
          clue: 'Step 1 — Change 1 letter: Extremely urgent or serious',
          hint: 'Change the first letter of WIRE to D.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Have the courage to challenge',
          hint: 'Change the first vowel to A.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Calendar day or timestamp',
          hint: 'Change the third letter to T so it rhymes with GATE.',
          length: 4,
        },
      ],
      solutionSteps: ['DIRE', 'DARE', 'DATE'],
      expectedWords: ['WIRE', 'DIRE', 'DARE', 'DATE', 'GATE'],
      expectedAnswer: 'WEND:WIRE-DIRE-DARE-DATE-GATE',
      acceptedAnswers: ['WEND:WIRE-DIRE-DARE-DATE-GATE', 'WIRE-DIRE-DARE-DATE-GATE', 'DIRE-DARE-DATE'],
      hints: [
        'HINT 01 // Keep the final letter E fixed throughout the entire ladder; change W to D in Step 1.',
        'HINT 02 // Step 3 is a 4-letter calendar term that is one letter away from GATE.',
      ],
    },
  ],
};

// ============================================================================
// 5. N-QUEENS VARIANT POOLS (Verified Solvable Given Queens)
// ============================================================================
export const QUEENS_VARIANTS_BY_CHALLENGE = {
  'CHG-LOG-13': [
    { variantId: 'Q5-V1', size: 5, givenQueens: [{ r: 0, c: 1 }] },
    { variantId: 'Q5-V2', size: 5, givenQueens: [{ r: 0, c: 2 }] },
    { variantId: 'Q5-V3', size: 5, givenQueens: [{ r: 0, c: 3 }] },
    { variantId: 'Q5-V4', size: 5, givenQueens: [{ r: 2, c: 0 }] },
  ],
  'CHG-LOG-14': [
    { variantId: 'Q6-V1', size: 6, givenQueens: [{ r: 0, c: 1 }] },
    { variantId: 'Q6-V2', size: 6, givenQueens: [{ r: 0, c: 4 }] },
    { variantId: 'Q6-V3', size: 6, givenQueens: [{ r: 1, c: 0 }] },
    { variantId: 'Q6-V4', size: 6, givenQueens: [{ r: 1, c: 5 }] },
  ],
};

// ============================================================================
// 6. GEOMETRIC BOARD TRANSFORMS FOR PATCHES, ZIP & SUDOKU
// ============================================================================
const transformCoord = (r, c, rows, cols, mode) => {
  if (mode === 1) {
    // Horizontal flip
    return { r, c: cols - 1 - c };
  }
  if (mode === 2) {
    // Vertical flip
    return { r: rows - 1 - r, c };
  }
  if (mode === 3) {
    // 180-degree rotation
    return { r: rows - 1 - r, c: cols - 1 - c };
  }
  return { r, c };
};

const buildPatchesVariant = (baseConfig, baseSolution, variantIndex) => {
  const mode = variantIndex % 4;
  if (mode === 0) {
    return {
      variantId: 'PATCH-V1',
      gameConfig: { ...baseConfig, variantId: 'PATCH-V1' },
      solutionConfig: { ...baseSolution },
    };
  }
  const rows = Number(baseConfig.rows) || 5;
  const cols = Number(baseConfig.cols) || 5;
  const clues = (baseConfig.clues || []).map((cl) => {
    const pos = transformCoord(Number(cl.r), Number(cl.c), rows, cols, mode);
    return { ...cl, r: pos.r, c: pos.c };
  });
  const solutionPatches = (baseConfig.solutionPatches || []).map((sp) => {
    const p1 = transformCoord(Number(sp.r1), Number(sp.c1), rows, cols, mode);
    const p2 = transformCoord(Number(sp.r2), Number(sp.c2), rows, cols, mode);
    return {
      ...sp,
      r1: Math.min(p1.r, p2.r),
      c1: Math.min(p1.c, p2.c),
      r2: Math.max(p1.r, p2.r),
      c2: Math.max(p1.c, p2.c),
    };
  });
  const variantId = `PATCH-V${mode + 1}`;
  return {
    variantId,
    gameConfig: {
      ...baseConfig,
      clues,
      solutionPatches,
      variantId,
    },
    solutionConfig: { ...baseSolution },
  };
};

const buildZipVariant = (baseConfig, baseSolution, variantIndex) => {
  const mode = variantIndex % 4;
  if (mode === 0) {
    return {
      variantId: 'ZIP-V1',
      gameConfig: { ...baseConfig, variantId: 'ZIP-V1' },
      solutionConfig: { ...baseSolution },
    };
  }
  const rows = Number(baseConfig.rows) || 5;
  const cols = Number(baseConfig.cols) || 5;
  const waypoints = (baseConfig.waypoints || []).map((wp) => {
    const pos = transformCoord(Number(wp.r), Number(wp.c), rows, cols, mode);
    return { ...wp, r: pos.r, c: pos.c };
  });
  const solutionPath = (baseConfig.solutionPath || []).map((pt) => {
    return transformCoord(Number(pt.r), Number(pt.c), rows, cols, mode);
  });
  const variantId = `ZIP-V${mode + 1}`;
  return {
    variantId,
    gameConfig: {
      ...baseConfig,
      waypoints,
      solutionPath,
      variantId,
    },
    solutionConfig: { ...baseSolution },
  };
};

const buildSudokuVariant = (baseConfig, baseSolution, variantIndex) => {
  const mode = variantIndex % 4;
  const size = Number(baseConfig.size) || 6;
  const initialGrid = baseConfig.initialGrid || [];
  const solutionGrid = baseConfig.solutionGrid || [];

  if (mode === 0 || initialGrid.length !== size) {
    return {
      variantId: 'SUDOKU-V1',
      gameConfig: { ...baseConfig, variantId: 'SUDOKU-V1' },
      solutionConfig: { ...baseSolution },
    };
  }

  // Apply valid Sudoku symmetry (horizontal mirror, vertical mirror, or 180° rotation)
  // plus digit relabeling so adjacent teams cannot copy numbers
  const shift = mode; // shift digits 1..size by mode
  const mapDigit = (val) => {
    const n = Number(val || 0);
    if (n <= 0 || n > size) return 0;
    return ((n - 1 + shift) % size) + 1;
  };

  const transformGrid = (grid) => {
    if (!Array.isArray(grid) || grid.length !== size) return grid;
    const out = Array.from({ length: size }, () => Array(size).fill(0));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const pos = transformCoord(r, c, size, size, mode);
        out[pos.r][pos.c] = mapDigit(grid[r][c]);
      }
    }
    return out;
  };

  const variantId = `SUDOKU-V${mode + 1}`;
  return {
    variantId,
    gameConfig: {
      ...baseConfig,
      initialGrid: transformGrid(initialGrid),
      solutionGrid: transformGrid(solutionGrid),
      variantId,
    },
    solutionConfig: { ...baseSolution },
  };
};

// ============================================================================
// MAIN ENTRY: ASSIGN RANDOMIZED VARIANT / QUESTION SUBSET PER TEAM ATTEMPT
// ============================================================================
export const assignVariantForTeamAttempt = (
  challenge,
  { teamId = 'TEAM', attemptNumber = 1 } = {}
) => {
  const baseGameConfig = challenge?.gameConfig ? { ...challenge.gameConfig } : {};
  const baseSolutionConfig = challenge?.solutionConfig ? { ...challenge.solutionConfig } : {};
  const challengeId = String(challenge?.challengeId || '').trim().toUpperCase();
  const gameType = String(challenge?.gameType || '').trim();

  // Seed combines teamId, challengeId, attemptNumber, and high-resolution time salt
  // so different teams and re-attempts receive randomized draws
  const seedKey = `${teamId}:${challengeId}:ATT-${attemptNumber}:${Date.now()}-${Math.random()}`;
  const rng = createSeededRng(seedKey);

  // Deterministic index offset across teams + attempts for fixed-list variants
  let teamHash = 0;
  for (let i = 0; i < teamId.length; i++) {
    teamHash = (teamHash * 31 + teamId.charCodeAt(i)) >>> 0;
  }
  const variantIdx = (teamHash + Math.max(0, Number(attemptNumber || 1) - 1)) >>> 0;

  // 1. APTITUDE (4 randomized questions drawn from 16-question pool)
  if (gameType === 'aptitude') {
    const customPool =
      Array.isArray(baseGameConfig.questionPool) && baseGameConfig.questionPool.length >= 4
        ? baseGameConfig.questionPool
        : challengeId === 'CHG-PUZ-16'
          ? LOGIC_APTITUDE_POOL
          : QUANT_APTITUDE_POOL;

    const countToDraw = Math.min(4, customPool.length);
    const selected = shuffleWithRng(customPool, rng).slice(0, countToDraw);

    const questions = selected.map((item, idx) => ({
      id: `Q${idx + 1}`,
      topic: item.topic || 'APTITUDE',
      question: item.question,
      options: item.options,
    }));
    const answerKey = selected.map((item) => String(item.answer || 'A').trim().toUpperCase());
    const expectedAnswer = `APTITUDE:${answerKey.join('-')}`;

    const hint1Notes = selected
      .slice(0, 2)
      .map((item, idx) => `Q${idx + 1}: ${item.hintNote || 'Check the mathematical relationship.'}`)
      .join(' ');
    const hint2Notes = selected
      .slice(2, 4)
      .map((item, idx) => `Q${idx + 3}: ${item.hintNote || 'Eliminate impossible options first.'}`)
      .join(' ');

    const variantId = `APT-POOL-${Math.floor(rng() * 900 + 100)}`;

    return {
      variantId,
      gameConfig: {
        ...baseGameConfig,
        variantId,
        questions,
        answerKey,
      },
      solutionConfig: {
        ...baseSolutionConfig,
        expectedAnswers: answerKey,
        expectedAnswer,
        acceptedAnswers: [expectedAnswer, answerKey.join('-')],
        hints: [
          `HINT 01 // ${hint1Notes}`,
          `HINT 02 // ${hint2Notes}`,
        ],
      },
    };
  }

  // 2. GK TRUE OR FALSE (6 randomized statements drawn from 18-statement pool)
  if (gameType === 'gkTrueFalse') {
    const customPool =
      Array.isArray(baseGameConfig.questionPool) && baseGameConfig.questionPool.length >= 6
        ? baseGameConfig.questionPool
        : challengeId === 'CHG-KNW-18'
          ? GK_WORLD_CYBER_POOL
          : GK_TECH_SCIENCE_POOL;

    const countToDraw = Math.min(6, customPool.length);
    const selected = shuffleWithRng(customPool, rng).slice(0, countToDraw);

    const questions = selected.map((item, idx) => ({
      id: `Q${idx + 1}`,
      topic: item.topic || 'GENERAL KNOWLEDGE',
      statement: item.statement,
    }));
    const answerKey = selected.map((item) =>
      String(item.answer || 'T').trim().toUpperCase() === 'T' ? 'T' : 'F'
    );
    const trueCount = answerKey.filter((a) => a === 'T').length;
    const falseCount = answerKey.length - trueCount;
    const expectedAnswer = `GKTF:${answerKey.join('-')}`;
    const variantId = `GKTF-POOL-${Math.floor(rng() * 900 + 100)}`;

    return {
      variantId,
      gameConfig: {
        ...baseGameConfig,
        variantId,
        questions,
        answerKey,
      },
      solutionConfig: {
        ...baseSolutionConfig,
        expectedAnswers: answerKey,
        expectedAnswer,
        acceptedAnswers: [expectedAnswer, answerKey.join('-')],
        hints: [
          `HINT 01 // Verify the core technical definitions in topics: ${selected
            .slice(0, 3)
            .map((s) => s.topic)
            .join(', ')}.`,
          `HINT 02 // In your squad's assigned 6-statement set, exactly ${trueCount} statements are TRUE and ${falseCount} are FALSE.`,
        ],
      },
    };
  }

  // 3. WORD GUESS (Assigned from pool of 6 codeword variants)
  if (gameType === 'wordGuess') {
    const picked = WORD_GUESS_VARIANTS[variantIdx % WORD_GUESS_VARIANTS.length];
    const scrambled = shuffleWithRng(picked.scrambledLetters, rng);
    return {
      variantId: picked.variantId,
      gameConfig: {
        ...baseGameConfig,
        variantId: picked.variantId,
        wordLength: picked.wordLength,
        categoryHint: picked.categoryHint,
        cipherClue: picked.cipherClue,
        scrambledLetters: scrambled,
        variantDescription: picked.cipherClue,
      },
      solutionConfig: {
        ...baseSolutionConfig,
        expectedAnswer: picked.word,
        acceptedAnswers: [
          picked.word,
          `WORDGUESS:${picked.word}`,
          `NEXUS{${picked.word}}`,
        ],
        hints: picked.hints,
      },
    };
  }

  // 4. WEND / WORD LADDER (Assigned from verified ladder variants)
  if (gameType === 'wend') {
    const pool = WEND_VARIANTS_BY_CHALLENGE[challengeId] || WEND_VARIANTS_BY_CHALLENGE['CHG-KNW-09'];
    const picked = pool[variantIdx % pool.length];
    return {
      variantId: picked.variantId,
      gameConfig: {
        ...baseGameConfig,
        variantId: picked.variantId,
        startWord: picked.startWord,
        endWord: picked.endWord,
        targetWord: picked.endWord,
        wordLength: picked.wordLength,
        steps: picked.steps,
        solutionSteps: picked.solutionSteps,
        variantDescription: picked.variantDescription,
      },
      solutionConfig: {
        ...baseSolutionConfig,
        expectedWords: picked.expectedWords,
        expectedAnswer: picked.expectedAnswer,
        acceptedAnswers: picked.acceptedAnswers,
        hints: picked.hints,
      },
    };
  }

  // 5. N-QUEENS (Assigned from verified starting Queen positions)
  if (gameType === 'queens') {
    const pool = QUEENS_VARIANTS_BY_CHALLENGE[challengeId];
    if (pool && pool.length > 0) {
      const picked = pool[variantIdx % pool.length];
      return {
        variantId: picked.variantId,
        gameConfig: {
          ...baseGameConfig,
          variantId: picked.variantId,
          size: picked.size,
          givenQueens: picked.givenQueens,
        },
        solutionConfig: {
          ...baseSolutionConfig,
        },
      };
    }
  }

  // 6. PATCHES (4 geometric symmetry variants)
  if (gameType === 'patches') {
    return buildPatchesVariant(baseGameConfig, baseSolutionConfig, variantIdx);
  }

  // 7. ZIP (4 geometric symmetry variants)
  if (gameType === 'zip') {
    return buildZipVariant(baseGameConfig, baseSolutionConfig, variantIdx);
  }

  // 8. SUDOKU (4 symmetry + digit permutation variants)
  if (gameType === 'sudoku') {
    return buildSudokuVariant(baseGameConfig, baseSolutionConfig, variantIdx);
  }

  // 9. MEMORY MATRIX (Randomized flashing node patterns per team attempt)
  if (gameType === 'memoryMatrix') {
    const size = Number(baseGameConfig.size) || 4;
    const totalCells = size * size;
    const baseRounds = Array.isArray(baseGameConfig.rounds) && baseGameConfig.rounds.length > 0
      ? baseGameConfig.rounds
      : [
          { id: 'R1', label: 'STAGE 01', count: size === 5 ? 6 : 5, flashMs: size === 5 ? 2400 : 2200 },
          { id: 'R2', label: 'STAGE 02', count: size === 5 ? 7 : 6, flashMs: size === 5 ? 2400 : 2200 },
          { id: 'R3', label: 'STAGE 03', count: size === 5 ? 8 : 7, flashMs: size === 5 ? 2400 : 2200 },
        ];

    const allIndices = Array.from({ length: totalCells }, (_, idx) => idx);
    const generatedRounds = baseRounds.map((roundSpec, idx) => {
      const targetCount = Math.min(
        totalCells - 2,
        Math.max(3, Number(roundSpec.count || roundSpec.targets?.length || 5 + idx))
      );
      const targets = shuffleWithRng(allIndices, rng)
        .slice(0, targetCount)
        .sort((a, b) => a - b);
      return {
        id: roundSpec.id || `R${idx + 1}`,
        label: roundSpec.label || `STAGE 0${idx + 1}`,
        count: targetCount,
        flashMs: Number(roundSpec.flashMs) || (size === 5 ? 2400 : 2200),
        targets,
      };
    });

    const expectedAnswer = `MEMORY_MATRIX:${generatedRounds
      .map((r) => r.targets.join(','))
      .join('|')}`;
    const variantId = `MM-${size}X${size}-${Math.floor(rng() * 900 + 100)}`;

    const r1TopHalfCount = generatedRounds[0].targets.filter(
      (idx) => Math.floor(idx / size) < Math.ceil(size / 2)
    ).length;
    const r3CornerCount = generatedRounds[generatedRounds.length - 1].targets.filter((idx) => {
      const r = Math.floor(idx / size);
      const c = idx % size;
      return (r === 0 || r === size - 1) && (c === 0 || c === size - 1);
    }).length;

    return {
      variantId,
      gameConfig: {
        ...baseGameConfig,
        variantId,
        size,
        rounds: generatedRounds,
      },
      solutionConfig: {
        ...baseSolutionConfig,
        expectedAnswer,
        acceptedAnswers: [expectedAnswer],
        hints: [
          `HINT 01 // Group flashing tiles into row pairs or L-shapes during the flash window. In Stage 01, ${r1TopHalfCount} target nodes are in the top half of the grid.`,
          `HINT 02 // Use the RE-FLASH pulse if you miss a tile. In the final stage, ${r3CornerCount} of the target nodes are located on the 4 extreme corners of the matrix.`,
        ],
      },
    };
  }

  return {
    variantId: 'DEFAULT',
    gameConfig: baseGameConfig,
    solutionConfig: baseSolutionConfig,
  };
};

export default {
  assignVariantForTeamAttempt,
};
