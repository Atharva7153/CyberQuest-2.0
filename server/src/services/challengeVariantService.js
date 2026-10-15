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
    topic: 'CIPHER LOGIC',
    question:
      'In a positional cipher, letters are shifted forward by their 1-indexed position in the word (1st letter +1, 2nd +2, 3rd +3, etc.). How is CYBER encoded?',
    options: ['DAEIW', 'DAEIV', 'EBEIX', 'DZEIW'],
    answer: 'A',
    hintNote: 'C(+1)=D, Y(+2)=A (wraps past Z), B(+3)=E, E(+4)=I, R(+5)=W.',
  },
  {
    topic: 'SPATIAL DISPLACEMENT',
    question:
      'An operative travels 12 km North, turns Right and travels 9 km East, then turns Right again and travels 24 km South. How far in a straight line is the operative from the origin point?',
    options: ['13 km', '15 km', '17 km', '21 km'],
    answer: 'B',
    hintNote: 'Net Y displacement is 12 - 24 = -12 km. Net X is 9 km. Use Pythagoras: √(9² + 12²) = 15 km.',
  },
  {
    topic: 'SYSTEM RELIABILITY',
    question:
      'A security perimeter has two independent firewalls. Firewall 1 fails with probability 0.10, and Firewall 2 fails with probability 0.20. What is the probability that AT LEAST ONE firewall successfully blocks an intrusion?',
    options: ['80%', '90%', '98%', '72%'],
    answer: 'C',
    hintNote: 'Compute probability that both fail (0.10 × 0.20 = 0.02) and subtract from 1.',
  },
  {
    topic: 'SET DEDUCTION',
    question:
      'In a team of 50 engineers: 30 know Python, 25 know C++, and 10 know neither language. How many engineers know BOTH Python and C++?',
    options: ['10', '20', '25', '15'],
    answer: 'D',
    hintNote: 'Total knowing at least one is 50 - 10 = 40. |A ∩ B| = 30 + 25 - 40 = 15.',
  },
  {
    topic: 'CODING-DECODING',
    question:
      'In a cipher, CLOUD is written as DKNTC (+1, -1, +1, -1, +1). If PIXEL is shifted +2 on every letter, what is the code?',
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
      'What is the acute angle between the hour hand and minute hand of an analog clock at exactly 3:20?',
    options: ['15°', '20°', '25°', '30°'],
    answer: 'B',
    hintNote: 'Hour hand is at 3×30° + 20×0.5° = 100°. Minute hand is at 20×6° = 120°. Difference = 20°.',
  },
  {
    topic: 'PROBABILITY',
    question:
      'A standard 6-sided die is rolled once. What is the probability of rolling a prime number?',
    options: ['1/3', '1/2', '2/3', '1/6'],
    answer: 'B',
    hintNote: 'Identify which numbers among {1, 2, 3, 4, 5, 6} are prime: {2, 3, 5} -> 3/6 = 1/2.',
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
    hintNote: 'East -> 90° CW = South -> 180° CCW = North.',
  },
  {
    topic: 'BLOOD RELATIONS',
    question:
      'Pointing to a photograph, Aria says, "He is the only son of my mother’s father." How is the man in the photograph related to Aria?',
    options: ['Brother', 'Maternal Uncle', 'Father', 'Cousin'],
    answer: 'B',
    hintNote: 'Mother\'s father is maternal grandfather; his only son is Aria\'s maternal uncle.',
  },
  {
    topic: 'BINARY LOGIC',
    question: 'If A = 1 and B = 0, what is the output of the boolean expression: (A AND B) OR (NOT B)?',
    options: ['0', '1', 'Undefined', 'Depends on A'],
    answer: 'B',
    hintNote: '(1 AND 0) = 0. (NOT 0) = 1. 0 OR 1 = 1.',
  },
  {
    topic: 'ANALOGY',
    question: 'COMPILER : SOURCE CODE :: DNS : ?',
    options: ['IP PACKET', 'DOMAIN NAME', 'MAC ADDRESS', 'ENCRYPTION KEY'],
    answer: 'B',
    hintNote: 'A compiler translates source code into machine code; DNS translates domain names into IP addresses.',
  },
  {
    topic: 'ODD ONE OUT',
    question:
      'Which of the following is a symmetric block cipher rather than a cryptographic hash function?',
    options: ['MD5', 'SHA-256', 'AES-256', 'BLAKE3'],
    answer: 'C',
    hintNote: 'MD5, SHA-256, and BLAKE3 are one-way hash digests; AES-256 is a reversible symmetric encryption cipher.',
  },
  {
    topic: 'CALENDAR & MODULAR',
    question:
      'If today is Monday, what day of the week will it be after 4¹⁵ days?',
    options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    answer: 'C',
    hintNote: '4¹ ≡ 4, 4² ≡ 2, 4³ ≡ 1 (mod 7). Since 15 is divisible by 3, 4¹⁵ ≡ 1 (mod 7). Monday + 1 day = Tuesday.',
  },
];

// ============================================================================
// 2. STATEMENT POOLS FOR GK TRUE OR FALSE (6 STATEMENTS PER ATTEMPT)
// ============================================================================
export const GK_TECH_SCIENCE_POOL = [
  {
    topic: 'WEB PROTOCOLS',
    statement: 'HTTP Status Code 404 indicates an unhandled server-side crash or internal exception.',
    answer: 'F',
  },
  {
    topic: 'ROUTING PROTOCOLS',
    statement: 'BGP (Border Gateway Protocol) establishes its peering sessions over UDP port 53.',
    answer: 'F',
  },
  {
    topic: 'OPERATING SYSTEMS',
    statement: 'In a multi-threaded process, each thread is allocated its own private, isolated heap memory space.',
    answer: 'F',
  },
  {
    topic: 'NETWORKING',
    statement: 'An IPv4 address uses 64 bits, while an IPv6 address uses 256 bits.',
    answer: 'F',
  },
  {
    topic: 'OPERATING SYSTEMS',
    statement: 'RAM (Random Access Memory) retains all stored data permanently when host power is turned off.',
    answer: 'F',
  },
  {
    topic: 'ALGORITHMS',
    statement: 'Binary search can execute correctly in O(log N) time on any unsorted linked list.',
    answer: 'F',
  },
  {
    topic: 'WEB PROTOCOLS',
    statement: 'In HTTP/1.1 pipelining, transport Head-of-Line (HoL) blocking is completely eliminated.',
    answer: 'F',
  },
  {
    topic: 'ELECTRONICS',
    statement: 'A standard diode conducts electric current equally well in both forward and reverse bias directions.',
    answer: 'F',
  },
  {
    topic: 'DATABASES',
    statement: 'In a relational database, a Primary Key column allows duplicate NULL entries.',
    answer: 'F',
  },
  {
    topic: 'COMPUTER ARCHITECTURE',
    statement: 'Modern superscalar CPUs utilize branch prediction and speculative execution to reduce instruction pipeline stalls.',
    answer: 'T',
  },
  {
    topic: 'HARDWARE IDENTIFICATION',
    statement: 'A standard Ethernet MAC address consists of 48 bits, formatted as 6 hexadecimal octets.',
    answer: 'T',
  },
  {
    topic: 'CRYPTOGRAPHY',
    statement: 'TLS 1.3 eliminates support for static RSA key exchanges and weak ciphers in favor of ephemeral Diffie-Hellman (ECDHE).',
    answer: 'T',
  },
  {
    topic: 'PHYSICS',
    statement: 'Electrical resistance is measured in Ohms (Ω), following Ohm\'s Law V = I × R.',
    answer: 'T',
  },
  {
    topic: 'INTERRUPT HANDLING',
    statement: 'An interrupt request (IRQ) causes the CPU to pause execution of the current thread and invoke an Interrupt Service Routine (ISR).',
    answer: 'T',
  },
  {
    topic: 'NETWORKING',
    statement: 'The default well-known port for standard unencrypted HTTP web traffic is Port 80.',
    answer: 'T',
  },
  {
    topic: 'CRYPTOGRAPHY',
    statement: 'Elliptic Curve Cryptography (ECC) achieves equivalent cryptographic security to RSA with significantly smaller key bit sizes.',
    answer: 'T',
  },
  {
    topic: 'DISTRIBUTED SYSTEMS',
    statement: 'In distributed consensus protocols like Raft and Paxos, a leader node must obtain an absolute majority quorum before committing an entry.',
    answer: 'T',
  },
  {
    topic: 'TRANSPORT LAYER',
    statement: 'TCP uses a sliding window mechanism to implement end-to-end flow control based on receiver buffer capacity.',
    answer: 'T',
  },
];

export const GK_WORLD_CYBER_POOL = [
  {
    topic: 'DATA STRUCTURES',
    statement: 'A Red-Black balanced binary search tree provides guaranteed O(1) constant-time key lookups in the worst case.',
    answer: 'F',
  },
  {
    topic: 'DNS INFRASTRUCTURE',
    statement: 'Internet DNS Root Nameservers are authoritative for directly serving IP addresses of second-level domain names like google.com.',
    answer: 'F',
  },
  {
    topic: 'CRYPTOGRAPHY',
    statement: 'In asymmetric (public-key) encryption, the exact same key is used for both encryption and decryption.',
    answer: 'F',
  },
  {
    topic: 'ALGORITHMS',
    statement: 'The worst-case time complexity of standard Bubble Sort on an array of N elements is O(log N).',
    answer: 'F',
  },
  {
    topic: 'NETWORK PROTOCOLS',
    statement: 'UDP guarantees packet delivery order and automatic retransmission of lost datagrams.',
    answer: 'F',
  },
  {
    topic: 'DATA STRUCTURES',
    statement: 'A Stack data structure operates on a First-In, First-Out (FIFO) access pattern.',
    answer: 'F',
  },
  {
    topic: 'NUMBER SYSTEMS',
    statement: 'In base-16 hexadecimal notation, the letter E represents the decimal value 15.',
    answer: 'F',
  },
  {
    topic: 'SYSTEM SECURITY',
    statement: 'Address Space Layout Randomization (ASLR) encrypts the executable binary on disk so it cannot be disassembled.',
    answer: 'F',
  },
  {
    topic: 'DIGITAL SIGNATURES',
    statement: 'To create a digital signature, the sender encrypts the document hash using the recipient\'s public key.',
    answer: 'F',
  },
  {
    topic: 'CYBERSECURITY',
    statement: 'HTTPS encrypts communication between a web client and a server using TLS/SSL.',
    answer: 'T',
  },
  {
    topic: 'LINK LAYER',
    statement: 'ARP (Address Resolution Protocol) resolves a known IPv4 address into its corresponding Layer 2 physical MAC address on a local broadcast domain.',
    answer: 'T',
  },
  {
    topic: 'TECH HISTORY',
    statement: 'The Linux kernel was originally created by Linus Torvalds in 1991.',
    answer: 'T',
  },
  {
    topic: 'OPERATING SYSTEMS',
    statement: 'Copy-On-Write (COW) allows the Linux fork() system call to create a new child process without immediately copying parent physical memory pages.',
    answer: 'T',
  },
  {
    topic: 'CYBERSECURITY',
    statement: 'Phishing is a social-engineering attack designed to deceive users into revealing credentials or sensitive information.',
    answer: 'T',
  },
  {
    topic: 'VERSION CONTROL',
    statement: 'Git is a distributed version control system originally created for Linux kernel development.',
    answer: 'T',
  },
  {
    topic: 'WEB SECURITY',
    statement: 'Cross-Site Request Forgery (CSRF) exploits the browser automatically attaching stored session cookies to ambient cross-origin requests.',
    answer: 'T',
  },
  {
    topic: 'NETWORKING',
    statement: 'DNS (Domain Name System) translates human-readable domain names into numerical IP addresses.',
    answer: 'T',
  },
  {
    topic: 'CYBERSECURITY',
    statement: 'Two-Factor Authentication (2FA) requires two distinct categories of authentication factors before granting access.',
    answer: 'T',
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
      'HINT 01 // Think of classic encryption methods named after historical figures or block/stream algorithms.',
      'HINT 02 // Look for a common two-letter consonant blend (PH) in the middle of the word.',
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
      'HINT 01 // Real-time web apps often use a persistent protocol named after this endpoint.',
      'HINT 02 // Contains a hard "CK" consonant pair in the middle of the 6-letter word.',
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
      'HINT 02 // Notice that the vowel E appears twice in this 6-letter word.',
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
      'HINT 01 // Routers and firewalls inspect and forward this fundamental unit of network traffic.',
      'HINT 02 // Contains the "CK" consonant pair and rhymes with JACKET.',
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
      'HINT 01 // Operates at Layer 3 (Network Layer) to determine the optimal path for traffic across subnets.',
      'HINT 02 // Built from a 5-letter root word meaning a path or course, plus an "-ER" suffix.',
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
      'HINT 01 // Explains why background services like sshd, httpd, and crond end with a specific letter.',
      'HINT 02 // Uses an archaic Greek/Latin spelling with an "AE" vowel pair near the start.',
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
          hint: 'Swap the vowel in the starting word to form a word meaning a piece or fraction.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Breathe rapidly after exertion',
          hint: 'Change one consonant to form a verb meaning to gasp for air.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Unit of liquid measure',
          hint: 'Change the vowel to match the vowel of the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['PART', 'PANT', 'PINT'],
      expectedWords: ['PORT', 'PART', 'PANT', 'PINT', 'PING'],
      expectedAnswer: 'WEND:PORT-PART-PANT-PINT-PING',
      acceptedAnswers: ['WEND:PORT-PART-PANT-PINT-PING', 'PORT-PART-PANT-PINT-PING', 'PART-PANT-PINT'],
      hints: [
        'HINT 01 // Keep the first letter unchanged across all steps; start by changing the vowel in the first step.',
        'HINT 02 // The third intermediate word is a common imperial measurement for liquids.',
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
          hint: 'Modify one interior consonant to form a word for a power cable.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Printed circuit board or access pass',
          hint: 'Swap the vowel to match the vowel in the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Protected hospital wing or city district',
          hint: 'Update the first letter to match the beginning of the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['CORD', 'CARD', 'WARD'],
      expectedWords: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM'],
      expectedAnswer: 'WEND:COLD-CORD-CARD-WARD-WARM',
      acceptedAnswers: ['WEND:COLD-CORD-CARD-WARD-WARM', 'COLD-CORD-CARD-WARD-WARM', 'CORD-CARD-WARD'],
      hints: [
        'HINT 01 // Keep the final letter fixed until the very last transition into the target word.',
        'HINT 02 // Step 2 is a 4-letter noun used for both hardware expansion boards and ID badges.',
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
          hint: 'Replace the second vowel with a consonant found at the end of the target word.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Loop of material that drives pulleys or gears',
          hint: 'Change the remaining vowel to match the vowel in the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Chime or acoustic alarm ringer',
          hint: 'Change the final letter so the word ends with a double consonant.',
          length: 4,
        },
      ],
      solutionSteps: ['BOLT', 'BELT', 'BELL'],
      expectedWords: ['BOOT', 'BOLT', 'BELT', 'BELL', 'CELL'],
      expectedAnswer: 'WEND:BOOT-BOLT-BELT-BELL-CELL',
      acceptedAnswers: ['WEND:BOOT-BOLT-BELT-BELL-CELL', 'BOOT-BOLT-BELT-BELL-CELL', 'BOLT-BELT-BELL'],
      hints: [
        'HINT 01 // Keep the starting letter unchanged for the first three steps while transforming the last three letters.',
        'HINT 02 // Step 3 is an acoustic signaling device that rhymes with the final target word.',
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
      expectedWords: ['FAIL', 'FALL', 'PALL', 'PALS', 'PASS'],
      expectedAnswer: 'WEND:FAIL-FALL-PALL-PALS-PASS',
      acceptedAnswers: ['WEND:FAIL-FALL-PALL-PALS-PASS', 'FAIL-FALL-PALL-PALS-PASS', 'FALL-PALL-PALS'],
      hints: [
        'HINT 01 // First create a double-consonant ending in Step 1 before changing the initial letter in Step 2.',
        'HINT 02 // Step 3 is a plural noun for friends that is one letter away from the target word.',
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
          hint: 'Change the first letter to form a word meaning a scarcity or deficiency.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Security mechanism opened with a key or cipher',
          hint: 'Change the vowel to match the vowel sound of the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Direct your eyes to observe or inspect',
          hint: 'Change the third letter to create a double-vowel word that rhymes with the target.',
          length: 4,
        },
      ],
      solutionSteps: ['LACK', 'LOCK', 'LOOK'],
      expectedWords: ['HACK', 'LACK', 'LOCK', 'LOOK', 'BOOK'],
      expectedAnswer: 'WEND:HACK-LACK-LOCK-LOOK-BOOK',
      acceptedAnswers: ['WEND:HACK-LACK-LOCK-LOOK-BOOK', 'HACK-LACK-LOCK-LOOK-BOOK', 'LACK-LOCK-LOOK'],
      hints: [
        'HINT 01 // Keep the final letter fixed across the entire ladder while shifting the vowel and middle consonant.',
        'HINT 02 // Step 2 is a physical or digital security mechanism that rhymes with ROCK.',
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
          hint: 'Change the first letter to form an adjective meaning grave or critical.',
          length: 4,
        },
        {
          clue: 'Step 2 — Change 1 letter: Have the courage to challenge',
          hint: 'Change the first vowel to match the first vowel of the target word.',
          length: 4,
        },
        {
          clue: 'Step 3 — Change 1 letter: Calendar day or timestamp',
          hint: 'Change the third letter so the word rhymes with the target word.',
          length: 4,
        },
      ],
      solutionSteps: ['DIRE', 'DARE', 'DATE'],
      expectedWords: ['WIRE', 'DIRE', 'DARE', 'DATE', 'GATE'],
      expectedAnswer: 'WEND:WIRE-DIRE-DARE-DATE-GATE',
      acceptedAnswers: ['WEND:WIRE-DIRE-DARE-DATE-GATE', 'WIRE-DIRE-DARE-DATE-GATE', 'DIRE-DARE-DATE'],
      hints: [
        'HINT 01 // Keep the silent final vowel fixed throughout the entire ladder.',
        'HINT 02 // Step 3 is a 4-letter calendar term that rhymes with the target word.',
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
  const rawBlocked = Array.isArray(baseConfig.blocked)
    ? baseConfig.blocked
    : Array.isArray(baseConfig.blockedCells)
    ? baseConfig.blockedCells
    : [];
  if (mode === 0) {
    return {
      variantId: 'ZIP-V1',
      gameConfig: {
        ...baseConfig,
        blocked: rawBlocked,
        blockedCells: rawBlocked,
        variantId: 'ZIP-V1',
      },
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
  const blocked = rawBlocked.map((b) => {
    const pos = transformCoord(Number(b.r), Number(b.c), rows, cols, mode);
    return { r: pos.r, c: pos.c };
  });
  const variantId = `ZIP-V${mode + 1}`;
  return {
    variantId,
    gameConfig: {
      ...baseConfig,
      waypoints,
      solutionPath,
      blocked,
      blockedCells: blocked,
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

  // 1. APTITUDE (4 randomized questions drawn from 16-question pool, or topic-specific challenge questions)
  if (gameType === 'aptitude') {
    const hasCustomPool =
      Array.isArray(baseGameConfig.questionPool) && baseGameConfig.questionPool.length >= 4;
    const isPoolChallenge =
      hasCustomPool || challengeId === 'CHG-LOG-15' || challengeId === 'CHG-PUZ-16';

    if (!isPoolChallenge && Array.isArray(baseGameConfig.questions) && baseGameConfig.questions.length > 0) {
      return {
        variantId: `${challengeId}-DEFAULT`,
        gameConfig: {
          ...baseGameConfig,
        },
        solutionConfig: {
          ...baseSolutionConfig,
        },
      };
    }

    const customPool = hasCustomPool
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

  // 2. GK TRUE OR FALSE (6 randomized statements drawn from 18-statement pool, or topic-specific statements)
  if (gameType === 'gkTrueFalse') {
    const hasCustomPool =
      Array.isArray(baseGameConfig.questionPool) && baseGameConfig.questionPool.length >= 6;
    const isPoolChallenge =
      hasCustomPool || challengeId === 'CHG-KNW-17' || challengeId === 'CHG-KNW-18';

    if (!isPoolChallenge && Array.isArray(baseGameConfig.questions) && baseGameConfig.questions.length > 0) {
      const baseExpected = Array.isArray(baseSolutionConfig.expectedAnswers)
        ? baseSolutionConfig.expectedAnswers
        : Array.isArray(baseGameConfig.answerKey)
          ? baseGameConfig.answerKey
          : [];
      const paired = baseGameConfig.questions.map((q, idx) => ({
        topic: q.topic || 'GENERAL KNOWLEDGE',
        statement: q.statement || q.question,
        answer: String(baseExpected[idx] || q.answer || 'T').trim().toUpperCase() === 'F' ? 'F' : 'T',
      }));
      const shuffledPairs = shuffleWithRng(paired, rng);
      const questions = shuffledPairs.map((item, idx) => ({
        id: `Q${idx + 1}`,
        topic: item.topic,
        statement: item.statement,
      }));
      const answerKey = shuffledPairs.map((item) => item.answer);
      const expectedAnswer = `GKTF:${answerKey.join('-')}`;
      const variantId = `${challengeId}-${Math.floor(rng() * 900 + 100)}`;

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
        },
      };
    }

    const customPool = hasCustomPool
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
          `HINT 02 // Watch out for reversed definitions or absolute claims ("always", "never", "only") in topics: ${selected
            .slice(3, 6)
            .map((s) => s.topic)
            .join(', ')}.`,
        ],
      },
    };
  }

  // 3. WORD GUESS (Multi-round challenges preserve rounds; single-word challenges draw from pool)
  if (gameType === 'wordGuess') {
    if (Array.isArray(baseGameConfig.rounds) && baseGameConfig.rounds.length > 0) {
      const rounds = baseGameConfig.rounds.map((r, idx) => {
        const rawTiles = Array.isArray(r.scrambledLetters)
          ? r.scrambledLetters
          : typeof r.scrambled === 'string' && r.scrambled.trim()
            ? r.scrambled.trim().split(/\s+/)
            : String(r.word || '')
                .trim()
                .toUpperCase()
                .split('');
        return {
          ...r,
          id: r.id || `R${idx + 1}`,
          wordLength: Number(r.wordLength) || String(r.word || '').trim().length || 6,
          scrambledLetters: shuffleWithRng(
            rawTiles.map((ch) => String(ch).trim().toUpperCase()).filter(Boolean),
            rng
          ),
        };
      });
      return {
        variantId: `${challengeId}-ROUNDS`,
        gameConfig: {
          ...baseGameConfig,
          variantId: `${challengeId}-ROUNDS`,
          rounds,
        },
        solutionConfig: {
          ...baseSolutionConfig,
        },
      };
    }

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

  // 4. WEND / WORD LADDER (Assigned from verified ladder variants when defined for challengeId)
  if (gameType === 'wend') {
    const pool = WEND_VARIANTS_BY_CHALLENGE[challengeId];
    if (!pool || pool.length === 0) {
      return {
        variantId: `${challengeId}-DEFAULT`,
        gameConfig: {
          ...baseGameConfig,
        },
        solutionConfig: {
          ...baseSolutionConfig,
        },
      };
    }
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
          'HINT 01 // Group adjacent flashing tiles into visual shapes (2×2 blocks, diagonals, or L-corners) instead of memorizing individual coordinates.',
          'HINT 02 // Scan the outer border vs. inner core during the initial flash, and save your RE-FLASH pulses for the final, highest-density stage.',
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
