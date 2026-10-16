/**
 * Auto-reduced Master Catalog (250 Challenges)
 * Balanced difficulty distribution (LOW, MODERATE, HIGH, EXTREME).
 */
export const zipChallenges = [
  {
    "challengeId": "CHG-ZIP-0001",
    "title": "ZIP (5×5) // LABYRINTH #0001",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0001",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0003",
    "title": "ZIP (5×5) // LABYRINTH #0003",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0003",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1>2,1>1,1>1,2>1,3",
      "acceptedAnswers": [
        "2,2>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1>2,1>1,1>1,2>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0005",
    "title": "ZIP (5×5) // LABYRINTH #0005",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0005",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0",
      "acceptedAnswers": [
        "3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0007",
    "title": "ZIP (5×5) // LABYRINTH #0007",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0007",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>1,2>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>1,1>2,1>3,1>4,1>4,0>3,0>2,0>1,0>0,0",
      "acceptedAnswers": [
        "1,3>1,2>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>1,1>2,1>3,1>4,1>4,0>3,0>2,0>1,0>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0009",
    "title": "ZIP (5×5) // LABYRINTH #0009",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0009",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,1>0,0>1,0>2,0>2,1>2,2>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>1,1",
      "acceptedAnswers": [
        "0,2>0,1>0,0>1,0>2,0>2,1>2,2>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0011",
    "title": "ZIP (5×5) // LABYRINTH #0011",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0011",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>1,2>2,2>3,2>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0",
      "acceptedAnswers": [
        "0,2>1,2>2,2>3,2>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0013",
    "title": "ZIP (5×5) // LABYRINTH #0013",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0013",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>3,4>2,4>1,4>1,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>0,2>0,3>0,4",
      "acceptedAnswers": [
        "4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>3,4>2,4>1,4>1,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0015",
    "title": "ZIP (5×5) // LABYRINTH #0015",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0015",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
      "acceptedAnswers": [
        "3,3>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0017",
    "title": "ZIP (5×5) // LABYRINTH #0017",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0017",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>3,2>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1",
      "acceptedAnswers": [
        "4,2>3,2>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0019",
    "title": "ZIP (5×5) // LABYRINTH #0019",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-01 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0019",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0021",
    "title": "ZIP (5×5) // LABYRINTH #0021",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0021",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>1,3>0,3>0,2>1,2>2,2>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "3,3>2,3>1,3>0,3>0,2>1,2>2,2>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0023",
    "title": "ZIP (5×5) // LABYRINTH #0023",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0023",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,3>2,2>2,1>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1",
      "acceptedAnswers": [
        "2,4>2,3>2,2>2,1>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0025",
    "title": "ZIP (5×5) // LABYRINTH #0025",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0025",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,1>2,1>2,2>2,3>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
      "acceptedAnswers": [
        "1,1>2,1>2,2>2,3>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0027",
    "title": "ZIP (5×5) // LABYRINTH #0027",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0027",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1",
      "acceptedAnswers": [
        "3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0029",
    "title": "ZIP (5×5) // LABYRINTH #0029",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0029",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 4
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>3,1>2,1>1,1>1,2>1,3>1,4>2,4>2,3>2,2>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
      "acceptedAnswers": [
        "0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>3,1>2,1>1,1>1,2>1,3>1,4>2,4>2,3>2,2>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0031",
    "title": "ZIP (5×5) // LABYRINTH #0031",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0031",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 2,
          "c": 2
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>2,3>3,3>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>1,2>2,2",
      "acceptedAnswers": [
        "1,3>2,3>3,3>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>1,2>2,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0033",
    "title": "ZIP (5×5) // LABYRINTH #0033",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0033",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,3>1,2>1,1>2,1>3,1>3,2>3,3",
      "acceptedAnswers": [
        "2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,3>1,2>1,1>2,1>3,1>3,2>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0035",
    "title": "ZIP (5×5) // LABYRINTH #0035",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0035",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1>3,2>3,3>2,3>1,3",
      "acceptedAnswers": [
        "2,2>1,2>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1>3,2>3,3>2,3>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0037",
    "title": "ZIP (5×5) // LABYRINTH #0037",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0037",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>2,1>2,2>2,3>3,3>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
      "acceptedAnswers": [
        "4,2>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>2,1>2,2>2,3>3,3>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0039",
    "title": "ZIP (5×5) // LABYRINTH #0039",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-02 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0039",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,3>0,4>1,4>2,4>2,3>2,2>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3",
      "acceptedAnswers": [
        "0,2>0,3>0,4>1,4>2,4>2,3>2,2>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0041",
    "title": "ZIP (5×5) // LABYRINTH #0041",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0041",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,3>2,4>1,4>0,4>0,3>1,3>1,2>1,1>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
      "acceptedAnswers": [
        "2,2>2,3>2,4>1,4>0,4>0,3>1,3>1,2>1,1>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0043",
    "title": "ZIP (5×5) // LABYRINTH #0043",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0043",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 2,
          "c": 2
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>2,3>2,2>1,2>1,3>1,4>0,4>0,3>0,2>0,1>1,1>2,1>3,1>3,2>3,3",
      "acceptedAnswers": [
        "0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>2,3>2,2>1,2>1,3>1,4>0,4>0,3>0,2>0,1>1,1>2,1>3,1>3,2>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0045",
    "title": "ZIP (5×5) // LABYRINTH #0045",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0045",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,3>1,2>1,1>2,1>3,1>3,2>3,3",
      "acceptedAnswers": [
        "2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,3>1,2>1,1>2,1>3,1>3,2>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0047",
    "title": "ZIP (5×5) // LABYRINTH #0047",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0047",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3>2,3>2,2>2,1>3,1>3,2>3,3>3,4>2,4>1,4>0,4>0,3>0,2",
      "acceptedAnswers": [
        "4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3>2,3>2,2>2,1>3,1>3,2>3,3>3,4>2,4>1,4>0,4>0,3>0,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0049",
    "title": "ZIP (5×5) // LABYRINTH #0049",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0049",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>0,2>0,3>0,4",
      "acceptedAnswers": [
        "3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0051",
    "title": "ZIP (5×5) // LABYRINTH #0051",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0051",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
      "acceptedAnswers": [
        "3,3>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0053",
    "title": "ZIP (5×5) // LABYRINTH #0053",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0053",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,3>4,4>3,4>2,4>2,3>2,2>2,1>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>3,2>3,3",
      "acceptedAnswers": [
        "4,2>4,3>4,4>3,4>2,4>2,3>2,2>2,1>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>3,2>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0055",
    "title": "ZIP (5×5) // LABYRINTH #0055",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0055",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>2,2>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3",
      "acceptedAnswers": [
        "3,3>2,3>2,2>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0057",
    "title": "ZIP (5×5) // LABYRINTH #0057",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0057",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0059",
    "title": "ZIP (5×5) // LABYRINTH #0059",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-03 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0059",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2>3,1>2,1>1,1",
      "acceptedAnswers": [
        "2,2>1,2>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2>3,1>2,1>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0061",
    "title": "ZIP (5×5) // LABYRINTH #0061",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0061",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>2,1>2,2>2,3>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4",
      "acceptedAnswers": [
        "2,0>2,1>2,2>2,3>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0063",
    "title": "ZIP (5×5) // LABYRINTH #0063",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0063",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1",
      "acceptedAnswers": [
        "3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0065",
    "title": "ZIP (5×5) // LABYRINTH #0065",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0065",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 3
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3>2,3>2,2>2,1>3,1",
      "acceptedAnswers": [
        "0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3>2,3>2,2>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0067",
    "title": "ZIP (5×5) // LABYRINTH #0067",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0067",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,2>1,3>2,3>3,3",
      "acceptedAnswers": [
        "2,2>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,2>1,3>2,3>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0069",
    "title": "ZIP (5×5) // LABYRINTH #0069",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0069",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1",
      "acceptedAnswers": [
        "3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0071",
    "title": "ZIP (5×5) // LABYRINTH #0071",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0071",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,3>2,2>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "2,4>2,3>2,2>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0073",
    "title": "ZIP (5×5) // LABYRINTH #0073",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0073",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 2,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4",
      "acceptedAnswers": [
        "2,2>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0075",
    "title": "ZIP (5×5) // LABYRINTH #0075",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0075",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1>2,1>3,1>3,2>3,3>3,4>2,4>2,3>2,2>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1>2,1>3,1>3,2>3,3>3,4>2,4>2,3>2,2>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0077",
    "title": "ZIP (5×5) // LABYRINTH #0077",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0077",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 4
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>2,2>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1",
      "acceptedAnswers": [
        "0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>2,2>2,1>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0079",
    "title": "ZIP (5×5) // LABYRINTH #0079",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-04 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0079",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3>2,3>2,2>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4",
      "acceptedAnswers": [
        "3,3>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3>2,3>2,2>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0081",
    "title": "ZIP (5×5) // LABYRINTH #0081",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0081",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>2,3>3,3>3,2>3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>1,2>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0",
      "acceptedAnswers": [
        "1,3>2,3>3,3>3,2>3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>1,2>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0083",
    "title": "ZIP (5×5) // LABYRINTH #0083",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0083",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 0
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>0,1>0,2>0,3>1,3>1,2>1,1>1,0>2,0>2,1>2,2>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "0,0>0,1>0,2>0,3>1,3>1,2>1,1>1,0>2,0>2,1>2,2>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0085",
    "title": "ZIP (5×5) // LABYRINTH #0085",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0085",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1",
      "acceptedAnswers": [
        "2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0087",
    "title": "ZIP (5×5) // LABYRINTH #0087",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0087",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>3,0>4,0>4,1>4,2>3,2>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>2,1>3,1",
      "acceptedAnswers": [
        "2,0>3,0>4,0>4,1>4,2>3,2>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0089",
    "title": "ZIP (5×5) // LABYRINTH #0089",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0089",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,2>1,3>2,3>3,3",
      "acceptedAnswers": [
        "2,2>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,2>1,3>2,3>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0091",
    "title": "ZIP (5×5) // LABYRINTH #0091",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0091",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>4,2>4,1>4,0>3,0>3,1>2,1>1,1>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
      "acceptedAnswers": [
        "2,2>3,2>4,2>4,1>4,0>3,0>3,1>2,1>1,1>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0093",
    "title": "ZIP (5×5) // LABYRINTH #0093",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0093",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>3,0>4,0>4,1>4,2>3,2>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>2,1>3,1",
      "acceptedAnswers": [
        "2,0>3,0>4,0>4,1>4,2>3,2>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0095",
    "title": "ZIP (5×5) // LABYRINTH #0095",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0095",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1",
      "acceptedAnswers": [
        "2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0097",
    "title": "ZIP (5×5) // LABYRINTH #0097",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0097",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>0,2>0,3>0,4",
      "acceptedAnswers": [
        "3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0099",
    "title": "ZIP (5×5) // LABYRINTH #0099",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-05 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0099",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 3
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>1,3>1,2>1,1>2,1>3,1",
      "acceptedAnswers": [
        "2,2>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>1,3>1,2>1,1>2,1>3,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0101",
    "title": "ZIP (5×5) // LABYRINTH #0101",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0101",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0103",
    "title": "ZIP (5×5) // LABYRINTH #0103",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0103",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
      "acceptedAnswers": [
        "3,3>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0105",
    "title": "ZIP (5×5) // LABYRINTH #0105",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0105",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0107",
    "title": "ZIP (5×5) // LABYRINTH #0107",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0107",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 1
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,1>2,1>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,2>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4",
      "acceptedAnswers": [
        "1,1>2,1>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,2>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0109",
    "title": "ZIP (5×5) // LABYRINTH #0109",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0109",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,2>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4",
      "acceptedAnswers": [
        "1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,2>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0111",
    "title": "ZIP (5×5) // LABYRINTH #0111",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0111",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>2,1>3,1>3,2>3,3",
      "acceptedAnswers": [
        "1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>2,1>3,1>3,2>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0113",
    "title": "ZIP (5×5) // LABYRINTH #0113",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0113",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>1,3>0,3>0,2>1,2>2,2>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "3,3>2,3>1,3>0,3>0,2>1,2>2,2>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0115",
    "title": "ZIP (5×5) // LABYRINTH #0115",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0115",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1",
      "acceptedAnswers": [
        "2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0117",
    "title": "ZIP (5×5) // LABYRINTH #0117",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0117",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 2,
          "c": 2
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>3,3>2,3>1,3>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>2,1>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "3,1>3,2>3,3>2,3>1,3>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>2,1>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0119",
    "title": "ZIP (5×5) // LABYRINTH #0119",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-06 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0119",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2>3,1>2,1>1,1",
      "acceptedAnswers": [
        "2,2>1,2>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2>3,1>2,1>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0121",
    "title": "ZIP (5×5) // LABYRINTH #0121",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0121",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>2,3>3,3>3,4>4,4>4,3>4,2>3,2>2,2>1,2>1,3",
      "acceptedAnswers": [
        "2,0>3,0>4,0>4,1>3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>2,3>3,3>3,4>4,4>4,3>4,2>3,2>2,2>1,2>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0123",
    "title": "ZIP (5×5) // LABYRINTH #0123",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0123",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>2,1>2,2>2,3>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1>4,0>3,0>2,0>1,0>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "3,1>2,1>2,2>2,3>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1>4,0>3,0>2,0>1,0>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0125",
    "title": "ZIP (5×5) // LABYRINTH #0125",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 25 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0125",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [],
      "playableCellCount": 25,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>1,0>0,0>0,1>0,2>0,3>1,3>2,3>3,3>3,2>2,2>1,2>1,1>2,1>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "2,0>1,0>0,0>0,1>0,2>0,3>1,3>2,3>3,3>3,2>2,2>1,2>1,1>2,1>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Avoid direct lines between consecutive numbers; trace the outer rim first to protect against creating dead-end pockets."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0127",
    "title": "ZIP (5×5) // LABYRINTH #0127",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0127",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>2,2>2,1>2,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>1,1",
      "acceptedAnswers": [
        "3,3>3,2>2,2>2,1>2,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0129",
    "title": "ZIP (5×5) // LABYRINTH #0129",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0129",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>3,3>3,4>2,4>2,3>1,3>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,0>4,0>4,1>4,2>4,3>4,4",
      "acceptedAnswers": [
        "2,2>3,2>3,3>3,4>2,4>2,3>1,3>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,0>4,0>4,1>4,2>4,3>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0131",
    "title": "ZIP (5×5) // LABYRINTH #0131",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0131",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>1,3>1,2>1,1>2,1>2,2>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,3>2,3>1,3>1,2>1,1>2,1>2,2>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0133",
    "title": "ZIP (5×5) // LABYRINTH #0133",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0133",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 2,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,0>4,0>4,1>4,2>4,3>3,3>2,3>2,2>2,1>2,0>1,0>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,0>4,0>4,1>4,2>4,3>3,3>2,3>2,2>2,1>2,0>1,0>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0135",
    "title": "ZIP (5×5) // LABYRINTH #0135",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0135",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 2
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 1,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>4,2>4,1>4,0>3,0>2,0>2,1>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0",
      "acceptedAnswers": [
        "3,2>4,2>4,1>4,0>3,0>2,0>2,1>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0137",
    "title": "ZIP (5×5) // LABYRINTH #0137",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0137",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>1,2>2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
      "acceptedAnswers": [
        "3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>1,2>2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0139",
    "title": "ZIP (5×5) // LABYRINTH #0139",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-07 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0139",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>4,3>4,2>4,1>3,1>3,2>2,2>2,1>1,1>1,2>1,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0",
      "acceptedAnswers": [
        "3,3>4,3>4,2>4,1>3,1>3,2>2,2>2,1>1,1>1,2>1,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0141",
    "title": "ZIP (5×5) // LABYRINTH #0141",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0141",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 1,
          "c": 3
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>3,0>2,0>1,0>0,0>0,1>1,1>2,1>2,2>1,2>0,2>0,3>1,3>2,3>3,3",
      "acceptedAnswers": [
        "0,4>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,1>3,0>2,0>1,0>0,0>0,1>1,1>2,1>2,2>1,2>0,2>0,3>1,3>2,3>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0143",
    "title": "ZIP (5×5) // LABYRINTH #0143",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0143",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,3>1,2>2,2>2,3>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1",
      "acceptedAnswers": [
        "3,0>3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,3>1,2>2,2>2,3>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0145",
    "title": "ZIP (5×5) // LABYRINTH #0145",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0145",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,2>2,2>3,2>3,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0",
      "acceptedAnswers": [
        "3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,2>2,2>3,2>3,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0147",
    "title": "ZIP (5×5) // LABYRINTH #0147",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0147",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 2
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 1,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>4,2>4,1>4,0>3,0>2,0>2,1>1,1>1,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,2>0,1>0,0>1,0",
      "acceptedAnswers": [
        "3,2>4,2>4,1>4,0>3,0>2,0>2,1>1,1>1,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,2>0,1>0,0>1,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0149",
    "title": "ZIP (5×5) // LABYRINTH #0149",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0149",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>2,1>2,0>1,0>0,0>0,1>0,2>1,2>2,2>2,3>2,4>1,4>0,4>0,3>1,3",
      "acceptedAnswers": [
        "3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>3,1>2,1>2,0>1,0>0,0>0,1>0,2>1,2>2,2>2,3>2,4>1,4>0,4>0,3>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0151",
    "title": "ZIP (5×5) // LABYRINTH #0151",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0151",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>1,1>0,1>0,2>0,3>1,3>2,3>3,3>3,2>3,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "2,2>1,2>1,1>0,1>0,2>0,3>1,3>2,3>3,3>3,2>3,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0153",
    "title": "ZIP (5×5) // LABYRINTH #0153",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0153",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 2,
          "c": 1
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>4,1>4,2>4,3>3,3>3,2>2,2>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4",
      "acceptedAnswers": [
        "3,0>3,1>4,1>4,2>4,3>3,3>3,2>2,2>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0155",
    "title": "ZIP (5×5) // LABYRINTH #0155",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0155",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 2,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>3,3>2,3>1,3>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0157",
    "title": "ZIP (5×5) // LABYRINTH #0157",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0157",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 0
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>3,1>3,0>2,0>1,0>0,0>0,1>1,1>2,1>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>3,3>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "3,2>3,1>3,0>2,0>1,0>0,0>0,1>1,1>2,1>2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>3,3>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0159",
    "title": "ZIP (5×5) // LABYRINTH #0159",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-08 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0159",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 4,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>4,2>4,1>4,0>3,0>3,1>2,1>1,1>1,0>0,0>0,1>0,2>1,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>1,3>0,3",
      "acceptedAnswers": [
        "3,2>4,2>4,1>4,0>3,0>3,1>2,1>1,1>1,0>0,0>0,1>0,2>1,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>1,3>0,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0161",
    "title": "ZIP (5×5) // LABYRINTH #0161",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0161",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,4>4,4>4,3>4,2>3,2>3,1>2,1>1,1>1,2>1,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0",
      "acceptedAnswers": [
        "3,3>3,4>4,4>4,3>4,2>3,2>3,1>2,1>1,1>1,2>1,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0163",
    "title": "ZIP (5×5) // LABYRINTH #0163",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0163",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>1,2>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1>2,1>2,2>2,3>2,4>1,4>0,4",
      "acceptedAnswers": [
        "1,3>1,2>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1>2,1>2,2>2,3>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0165",
    "title": "ZIP (5×5) // LABYRINTH #0165",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0165",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,2",
      "acceptedAnswers": [
        "3,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0167",
    "title": "ZIP (5×5) // LABYRINTH #0167",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0167",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 3,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>4,0>3,0>2,0>2,1>3,1>3,2>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3",
      "acceptedAnswers": [
        "4,1>4,0>3,0>2,0>2,1>3,1>3,2>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0169",
    "title": "ZIP (5×5) // LABYRINTH #0169",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0169",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>2,1>2,2>3,2>3,3>2,3>1,3>1,2>1,1>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>3,0>4,0",
      "acceptedAnswers": [
        "2,0>2,1>2,2>3,2>3,3>2,3>1,3>1,2>1,1>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0171",
    "title": "ZIP (5×5) // LABYRINTH #0171",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0171",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>2,1>2,0>3,0>4,0",
      "acceptedAnswers": [
        "3,3>3,2>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>2,1>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0173",
    "title": "ZIP (5×5) // LABYRINTH #0173",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0173",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>2,4>2,3>2,2>1,2>1,1>2,1>3,1>3,2>3,3>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,4",
      "acceptedAnswers": [
        "3,4>2,4>2,3>2,2>1,2>1,1>2,1>3,1>3,2>3,3>4,3>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0175",
    "title": "ZIP (5×5) // LABYRINTH #0175",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0175",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>2,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>3,4>4,4>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0",
      "acceptedAnswers": [
        "3,2>2,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>3,4>4,4>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0177",
    "title": "ZIP (5×5) // LABYRINTH #0177",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0177",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 4
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 1
        },
        {
          "num": 6,
          "r": 3,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,4>2,4>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>3,3>3,2",
      "acceptedAnswers": [
        "1,4>2,4>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>3,3>3,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0179",
    "title": "ZIP (5×5) // LABYRINTH #0179",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-09 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0179",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>3,3>2,3>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4",
      "acceptedAnswers": [
        "3,2>3,3>2,3>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0181",
    "title": "ZIP (5×5) // LABYRINTH #0181",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0181",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 3
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 3
        },
        {
          "num": 7,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>2,2>2,1",
      "acceptedAnswers": [
        "3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>2,2>2,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0183",
    "title": "ZIP (5×5) // LABYRINTH #0183",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0183",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 3
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>2,1>2,2>2,3>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1",
      "acceptedAnswers": [
        "3,0>3,1>2,1>2,2>2,3>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>3,2>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0185",
    "title": "ZIP (5×5) // LABYRINTH #0185",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0185",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 1,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,2>1,1>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0",
      "acceptedAnswers": [
        "1,2>1,1>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0187",
    "title": "ZIP (5×5) // LABYRINTH #0187",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0187",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>4,0>4,1>3,1>2,1>2,0>1,0>0,0>0,1>0,2>1,2>2,2>2,3>1,3>0,3>0,4>1,4>2,4>3,4>3,3>3,2>4,2>4,3",
      "acceptedAnswers": [
        "3,0>4,0>4,1>3,1>2,1>2,0>1,0>0,0>0,1>0,2>1,2>2,2>2,3>1,3>0,3>0,4>1,4>2,4>3,4>3,3>3,2>4,2>4,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0189",
    "title": "ZIP (5×5) // LABYRINTH #0189",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0189",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>4,3>4,2>4,1>4,0>3,0>3,1>2,1>1,1>1,2>2,2>3,2>3,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
      "acceptedAnswers": [
        "4,4>4,3>4,2>4,1>4,0>3,0>3,1>2,1>1,1>1,2>2,2>3,2>3,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0191",
    "title": "ZIP (5×5) // LABYRINTH #0191",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0191",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 2
        },
        {
          "num": 7,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>3,1>4,1>4,0>3,0>2,0>1,0>1,1>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>1,3>1,2>2,2>2,1",
      "acceptedAnswers": [
        "3,2>3,1>4,1>4,0>3,0>2,0>1,0>1,1>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>1,3>1,2>2,2>2,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0193",
    "title": "ZIP (5×5) // LABYRINTH #0193",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0193",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,3>0,4>1,4>1,3>2,3>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
      "acceptedAnswers": [
        "0,2>0,3>0,4>1,4>1,3>2,3>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0195",
    "title": "ZIP (5×5) // LABYRINTH #0195",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0195",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,2>0,1>0,0>1,0>1,1>2,1>3,1>3,0>4,0>4,1>4,2>3,2>3,3>2,3>2,2>1,2",
      "acceptedAnswers": [
        "4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,2>0,1>0,0>1,0>1,1>2,1>3,1>3,0>4,0>4,1>4,2>3,2>3,3>2,3>2,2>1,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0197",
    "title": "ZIP (5×5) // LABYRINTH #0197",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0197",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>3,2>3,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "3,0>3,1>3,2>3,3>2,3>2,2>2,1>2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0199",
    "title": "ZIP (5×5) // LABYRINTH #0199",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-10 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0199",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 0
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>0,1>0,2>0,3>1,3>1,2>1,1>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4",
      "acceptedAnswers": [
        "0,0>0,1>0,2>0,3>1,3>1,2>1,1>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0201",
    "title": "ZIP (5×5) // LABYRINTH #0201",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0201",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>3,1>2,1>1,1>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "3,3>3,2>3,1>2,1>1,1>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0203",
    "title": "ZIP (5×5) // LABYRINTH #0203",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0203",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>4,2>4,1>3,1>2,1>1,1>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0",
      "acceptedAnswers": [
        "3,2>4,2>4,1>3,1>2,1>1,1>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0205",
    "title": "ZIP (5×5) // LABYRINTH #0205",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0205",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>2,3>2,2>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "3,3>2,3>2,2>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0207",
    "title": "ZIP (5×5) // LABYRINTH #0207",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0207",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,3>2,2>3,2>3,1>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "2,3>2,2>3,2>3,1>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0209",
    "title": "ZIP (5×5) // LABYRINTH #0209",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0209",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "3,0>3,1>3,2>3,3>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0211",
    "title": "ZIP (5×5) // LABYRINTH #0211",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0211",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1>0,0>1,0>1,1>2,1>2,0>3,0>3,1>4,1>4,2>3,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2",
      "acceptedAnswers": [
        "0,1>0,0>1,0>1,1>2,1>2,0>3,0>3,1>4,1>4,2>3,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0213",
    "title": "ZIP (5×5) // LABYRINTH #0213",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0213",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>2,0>1,0>1,1>0,1>0,2>1,2>1,3>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "2,2>2,1>2,0>1,0>1,1>0,1>0,2>1,2>1,3>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0215",
    "title": "ZIP (5×5) // LABYRINTH #0215",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0215",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>3,3>2,3>2,2>1,2>1,1>2,1>3,1>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4",
      "acceptedAnswers": [
        "4,3>3,3>2,3>2,2>1,2>1,1>2,1>3,1>3,2>4,2>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0217",
    "title": "ZIP (5×5) // LABYRINTH #0217",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0217",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 4
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,4>0,4>0,3>1,3>2,3>2,4>3,4>3,3>3,2>3,1>2,1>1,1>1,2>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3",
      "acceptedAnswers": [
        "1,4>0,4>0,3>1,3>2,3>2,4>3,4>3,3>3,2>3,1>2,1>1,1>1,2>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0219",
    "title": "ZIP (5×5) // LABYRINTH #0219",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-11 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0219",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4",
      "acceptedAnswers": [
        "0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>3,2>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0221",
    "title": "ZIP (5×5) // LABYRINTH #0221",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0221",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>3,1>3,0>2,0>1,0>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
      "acceptedAnswers": [
        "2,2>3,2>3,1>3,0>2,0>1,0>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0223",
    "title": "ZIP (5×5) // LABYRINTH #0223",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0223",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>2,2>2,3>3,3>3,4>2,4>1,4>1,3>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,0>4,0>4,1>4,2>4,3",
      "acceptedAnswers": [
        "3,2>2,2>2,3>3,3>3,4>2,4>1,4>1,3>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,0>4,0>4,1>4,2>4,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0225",
    "title": "ZIP (5×5) // LABYRINTH #0225",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0225",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,3>4,4>3,4>3,3>3,2>3,1>4,1>4,0>3,0>2,0>1,0>1,1>2,1>2,2>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "4,2>4,3>4,4>3,4>3,3>3,2>3,1>4,1>4,0>3,0>2,0>1,0>1,1>2,1>2,2>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0227",
    "title": "ZIP (5×5) // LABYRINTH #0227",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0227",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 1
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>3,3>2,3>1,3>1,2>2,2>3,2>3,1>4,1>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4",
      "acceptedAnswers": [
        "4,3>3,3>2,3>1,3>1,2>2,2>3,2>3,1>4,1>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0229",
    "title": "ZIP (5×5) // LABYRINTH #0229",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0229",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 3,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 0
        },
        {
          "num": 6,
          "r": 2,
          "c": 3
        },
        {
          "num": 7,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>4,0>3,0>3,1>3,2>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3>2,3>2,2>2,1",
      "acceptedAnswers": [
        "4,1>4,0>3,0>3,1>3,2>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3>2,3>2,2>2,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0231",
    "title": "ZIP (5×5) // LABYRINTH #0231",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0231",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>4,2>3,2>2,2>2,3>3,3>3,4>2,4>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1",
      "acceptedAnswers": [
        "4,3>4,2>3,2>2,2>2,3>3,3>3,4>2,4>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>3,1>2,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0233",
    "title": "ZIP (5×5) // LABYRINTH #0233",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0233",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 4,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 4
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>3,1>3,2>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0",
      "acceptedAnswers": [
        "4,1>3,1>3,2>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0235",
    "title": "ZIP (5×5) // LABYRINTH #0235",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0235",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 2,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 2
        },
        {
          "num": 5,
          "r": 2,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>3,2>2,2>1,2>1,1>2,1>3,1>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>1,3",
      "acceptedAnswers": [
        "4,2>3,2>2,2>1,2>1,1>2,1>3,1>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>1,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0237",
    "title": "ZIP (5×5) // LABYRINTH #0237",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0237",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 4,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>3,2>3,3>2,3>1,3>1,2>2,2>2,1>3,1>4,1>4,0>3,0>2,0>1,0>1,1>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4",
      "acceptedAnswers": [
        "4,2>3,2>3,3>2,3>1,3>1,2>2,2>2,1>3,1>4,1>4,0>3,0>2,0>1,0>1,1>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0239",
    "title": "ZIP (5×5) // LABYRINTH #0239",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-12 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0239",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>3,1>4,1>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0",
      "acceptedAnswers": [
        "2,2>2,1>3,1>4,1>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0241",
    "title": "ZIP (5×5) // LABYRINTH #0241",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0241",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 0
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,0>4,1>4,2>3,2>3,3>4,3>4,4>3,4>2,4>2,3>2,2>2,1>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
      "acceptedAnswers": [
        "4,0>4,1>4,2>3,2>3,3>4,3>4,4>3,4>2,4>2,3>2,2>2,1>1,1>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0243",
    "title": "ZIP (5×5) // LABYRINTH #0243",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0243",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 3,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 1,
          "c": 2
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>4,2>4,3>3,3>2,3>2,2>3,2>3,1>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4",
      "acceptedAnswers": [
        "4,1>4,2>4,3>3,3>2,3>2,2>3,2>3,1>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0245",
    "title": "ZIP (5×5) // LABYRINTH #0245",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0245",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,1>4,0>3,0>3,1>2,1>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1",
      "acceptedAnswers": [
        "4,2>4,1>4,0>3,0>3,1>2,1>2,2>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0247",
    "title": "ZIP (5×5) // LABYRINTH #0247",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0247",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,0>3,0>3,1>3,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
      "acceptedAnswers": [
        "4,0>3,0>3,1>3,2>2,2>2,3>3,3>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0249",
    "title": "ZIP (5×5) // LABYRINTH #0249",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0249",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>2,0>1,0>0,0>0,1>0,2>1,2>1,3>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
      "acceptedAnswers": [
        "2,2>2,1>2,0>1,0>0,0>0,1>0,2>1,2>1,3>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0251",
    "title": "ZIP (5×5) // LABYRINTH #0251",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0251",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 0
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 2
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,2>2,3>1,3>0,3>0,4>1,4>2,4>3,4>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3",
      "acceptedAnswers": [
        "1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,2>2,3>1,3>0,3>0,4>1,4>2,4>3,4>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0253",
    "title": "ZIP (5×5) // LABYRINTH #0253",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0253",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,3>1,3>1,4>2,4>2,3>3,3>3,2>3,1>2,1>2,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4",
      "acceptedAnswers": [
        "0,2>0,3>1,3>1,4>2,4>2,3>3,3>3,2>3,1>2,1>2,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0255",
    "title": "ZIP (5×5) // LABYRINTH #0255",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0255",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 0,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>3,2>2,2>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "3,0>3,1>3,2>2,2>2,3>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0257",
    "title": "ZIP (5×5) // LABYRINTH #0257",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0257",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>3,3>3,4>4,4>4,3>4,2>4,1>3,1>2,1>1,1>1,2>1,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0",
      "acceptedAnswers": [
        "3,2>3,3>3,4>4,4>4,3>4,2>4,1>3,1>2,1>1,1>1,2>1,3>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0259",
    "title": "ZIP (5×5) // LABYRINTH #0259",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-13 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0259",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 3,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>3,1>3,2>2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "1,4>0,4>0,3>1,3>1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,0>3,0>3,1>3,2>2,2>2,3>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0261",
    "title": "ZIP (5×5) // LABYRINTH #0261",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0261",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
      "acceptedAnswers": [
        "2,4>2,3>2,2>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0263",
    "title": "ZIP (5×5) // LABYRINTH #0263",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0263",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 3
        },
        {
          "num": 7,
          "r": 3,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,0>1,1>0,1>0,2>1,2>2,2>2,1>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2",
      "acceptedAnswers": [
        "1,0>1,1>0,1>0,2>1,2>2,2>2,1>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>2,3>3,3>3,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0265",
    "title": "ZIP (5×5) // LABYRINTH #0265",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0265",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 1
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1>0,0>1,0>2,0>3,0>3,1>2,1>2,2>3,2>3,3>2,3>1,3>1,2>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "0,1>0,0>1,0>2,0>3,0>3,1>2,1>2,2>3,2>3,3>2,3>1,3>1,2>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0267",
    "title": "ZIP (5×5) // LABYRINTH #0267",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0267",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 0,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 2
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>2,4>1,4>0,4>0,3>0,2>0,1>1,1>1,0>2,0>2,1>2,2>1,2>1,3>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3",
      "acceptedAnswers": [
        "3,4>2,4>1,4>0,4>0,3>0,2>0,1>1,1>1,0>2,0>2,1>2,2>1,2>1,3>2,3>3,3>3,2>3,1>3,0>4,0>4,1>4,2>4,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0269",
    "title": "ZIP (5×5) // LABYRINTH #0269",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0269",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,3>4,4>3,4>3,3>3,2>3,1>2,1>1,1>1,2>2,2>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0",
      "acceptedAnswers": [
        "4,2>4,3>4,4>3,4>3,3>3,2>3,1>2,1>1,1>1,2>2,2>2,3>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0271",
    "title": "ZIP (5×5) // LABYRINTH #0271",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0271",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>4,2>3,2>2,2>2,3>1,3>1,2>1,1>2,1>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4",
      "acceptedAnswers": [
        "4,3>4,2>3,2>2,2>2,3>1,3>1,2>1,1>2,1>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0273",
    "title": "ZIP (5×5) // LABYRINTH #0273",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0273",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>4,3>4,2>4,1>4,0>3,0>2,0>2,1>1,1>1,2>2,2>3,2>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "4,4>4,3>4,2>4,1>4,0>3,0>2,0>2,1>1,1>1,2>2,2>3,2>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0275",
    "title": "ZIP (5×5) // LABYRINTH #0275",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0275",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,0>3,0>3,1>2,1>1,1>1,2>1,3>2,3>3,3>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
      "acceptedAnswers": [
        "4,0>3,0>3,1>2,1>1,1>1,2>1,3>2,3>3,3>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0277",
    "title": "ZIP (5×5) // LABYRINTH #0277",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0277",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>3,2>3,3>2,3>2,2>2,1>2,0>1,0>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
      "acceptedAnswers": [
        "3,0>3,1>3,2>3,3>2,3>2,2>2,1>2,0>1,0>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>4,2>4,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0279",
    "title": "ZIP (5×5) // LABYRINTH #0279",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-14 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0279",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,3>4,4>3,4>2,4>2,3>1,3>1,2>1,1>2,1>2,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
      "acceptedAnswers": [
        "4,2>4,3>4,4>3,4>2,4>2,3>1,3>1,2>1,1>2,1>2,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0281",
    "title": "ZIP (5×5) // LABYRINTH #0281",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0281",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>1,2>2,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1",
      "acceptedAnswers": [
        "4,3>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>1,2>2,2>3,2>3,1>4,1>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0283",
    "title": "ZIP (5×5) // LABYRINTH #0283",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0283",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>3,2>2,2>2,3>3,3>3,4>2,4>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4",
      "acceptedAnswers": [
        "3,1>3,2>2,2>2,3>3,3>3,4>2,4>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0285",
    "title": "ZIP (5×5) // LABYRINTH #0285",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0285",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 2
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>4,2>4,3>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>3,1>4,1>4,0",
      "acceptedAnswers": [
        "2,2>3,2>4,2>4,3>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>3,1>4,1>4,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0287",
    "title": "ZIP (5×5) // LABYRINTH #0287",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0287",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 3
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>3,1>2,1>1,1>1,2>2,2>3,2>4,2>4,3>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0",
      "acceptedAnswers": [
        "4,1>3,1>2,1>1,1>1,2>2,2>3,2>4,2>4,3>3,3>3,4>2,4>2,3>1,3>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0289",
    "title": "ZIP (5×5) // LABYRINTH #0289",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0289",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 4,
          "c": 3
        },
        {
          "num": 6,
          "r": 2,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,3>2,3>2,2>1,2",
      "acceptedAnswers": [
        "4,1>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>4,4>4,3>4,2>3,2>3,3>2,3>2,2>1,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0291",
    "title": "ZIP (5×5) // LABYRINTH #0291",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0291",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 2,
          "c": 2
        },
        {
          "num": 7,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>3,1>3,2>2,2>2,3>3,3",
      "acceptedAnswers": [
        "4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>3,1>3,2>2,2>2,3>3,3",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0293",
    "title": "ZIP (5×5) // LABYRINTH #0293",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0293",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 0
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 2
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>4,2>4,1>4,0>3,0>3,1>3,2>2,2>2,3>3,3>3,4>2,4>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1",
      "acceptedAnswers": [
        "4,3>4,2>4,1>4,0>3,0>3,1>3,2>2,2>2,3>3,3>3,4>2,4>1,4>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0295",
    "title": "ZIP (5×5) // LABYRINTH #0295",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0295",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 4
        },
        {
          "num": 2,
          "r": 0,
          "c": 1
        },
        {
          "num": 3,
          "r": 3,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 3
        },
        {
          "num": 6,
          "r": 2,
          "c": 1
        },
        {
          "num": 7,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 4
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,4>1,3>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>2,3>3,3>3,2>3,1>2,1>2,2>1,2",
      "acceptedAnswers": [
        "1,4>1,3>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>2,3>3,3>3,2>3,1>2,1>2,2>1,2",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0297",
    "title": "ZIP (5×5) // LABYRINTH #0297",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0297",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,3>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1>2,1>2,2>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "2,4>2,3>3,3>3,4>4,4>4,3>4,2>4,1>4,0>3,0>2,0>1,0>1,1>2,1>2,2>1,2>1,3>1,4>0,4>0,3>0,2>0,1>0,0",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0299",
    "title": "ZIP (5×5) // LABYRINTH #0299",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 7 sequentially while visiting all 23 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-15 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0299",
      "rows": 5,
      "cols": 5,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 1
        },
        {
          "num": 2,
          "r": 3,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 3
        },
        {
          "num": 7,
          "r": 0,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 23,
      "solutionPath": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,1>4,0>3,0>3,1>3,2>2,2>2,1>2,0>1,0>1,1>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1",
      "acceptedAnswers": [
        "4,1>4,0>3,0>3,1>3,2>2,2>2,1>2,0>1,0>1,1>1,2>1,3>2,3>3,3>4,3>4,4>3,4>2,4>1,4>0,4>0,3>0,2>0,1",
        "ZIP:5X5:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0301",
    "title": "ZIP (6×6) // LABYRINTH #0301",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0301",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 2
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 5
        },
        {
          "num": 9,
          "r": 5,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>3,1>3,0>4,0>4,1>4,2>3,2>3,3>4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2",
      "acceptedAnswers": [
        "2,2>1,2>0,2>0,1>0,0>1,0>1,1>2,1>3,1>3,0>4,0>4,1>4,2>3,2>3,3>4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0303",
    "title": "ZIP (6×6) // LABYRINTH #0303",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0303",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 4
        },
        {
          "num": 2,
          "r": 3,
          "c": 5
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        },
        {
          "num": 8,
          "r": 5,
          "c": 3
        },
        {
          "num": 9,
          "r": 5,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4>1,4>1,5>2,5>3,5>3,4>3,3>3,2>3,1>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0",
      "acceptedAnswers": [
        "0,4>1,4>1,5>2,5>3,5>3,4>3,3>3,2>3,1>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>4,1>4,2>4,3>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0305",
    "title": "ZIP (6×6) // LABYRINTH #0305",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0305",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>2,2>3,2>3,1>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>2,2>3,2>3,1>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0307",
    "title": "ZIP (6×6) // LABYRINTH #0307",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0307",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 4,
          "c": 4
        },
        {
          "num": 9,
          "r": 2,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>3,3>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>3,4>3,5>2,5",
      "acceptedAnswers": [
        "2,2>1,2>0,2>0,3>0,4>1,4>1,3>2,3>3,3>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>3,4>3,5>2,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0309",
    "title": "ZIP (6×6) // LABYRINTH #0309",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0309",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 1
        },
        {
          "num": 6,
          "r": 5,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 4
        },
        {
          "num": 8,
          "r": 2,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,0>0,0>0,1>0,2>1,2>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>3,1>3,2>2,2>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4",
      "acceptedAnswers": [
        "1,0>0,0>0,1>0,2>1,2>1,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>3,1>3,2>2,2>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0311",
    "title": "ZIP (6×6) // LABYRINTH #0311",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0311",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 5
        },
        {
          "num": 2,
          "r": 1,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 5
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 5,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>0,1>1,1>1,0>2,0>3,0>3,1>3,2>2,2>2,3>2,4>3,4>3,5>4,5>4,4>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5",
      "acceptedAnswers": [
        "2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>0,1>1,1>1,0>2,0>3,0>3,1>3,2>2,2>2,3>2,4>3,4>3,5>4,5>4,4>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0313",
    "title": "ZIP (6×6) // LABYRINTH #0313",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0313",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 5
        },
        {
          "num": 2,
          "r": 0,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 1
        },
        {
          "num": 5,
          "r": 4,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,5>1,5>0,5>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,2>4,2>4,3>3,3>2,3>1,3>1,4>2,4>3,4>3,5>4,5>4,4>5,4>5,3>5,2>5,1>5,0>4,0",
      "acceptedAnswers": [
        "2,5>1,5>0,5>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,2>4,2>4,3>3,3>2,3>1,3>1,4>2,4>3,4>3,5>4,5>4,4>5,4>5,3>5,2>5,1>5,0>4,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0315",
    "title": "ZIP (6×6) // LABYRINTH #0315",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0315",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 1
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,1>2,1>2,0>3,0>3,1>3,2>2,2>2,3>1,3>1,2>0,2>0,3>0,4>1,4>2,4>3,4>3,3>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "1,1>2,1>2,0>3,0>3,1>3,2>2,2>2,3>1,3>1,2>0,2>0,3>0,4>1,4>2,4>3,4>3,3>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0317",
    "title": "ZIP (6×6) // LABYRINTH #0317",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0317",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 3
        },
        {
          "num": 9,
          "r": 5,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0",
      "acceptedAnswers": [
        "2,2>3,2>3,1>3,0>4,0>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0319",
    "title": "ZIP (6×6) // LABYRINTH #0319",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-16 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0319",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 5
        },
        {
          "num": 6,
          "r": 5,
          "c": 4
        },
        {
          "num": 7,
          "r": 5,
          "c": 0
        },
        {
          "num": 8,
          "r": 2,
          "c": 1
        },
        {
          "num": 9,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1>0,2>1,2>2,2>2,3>3,3>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>3,0>2,0>2,1>1,1>1,0>0,0",
      "acceptedAnswers": [
        "0,1>0,2>1,2>2,2>2,3>3,3>3,2>4,2>4,3>4,4>3,4>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>3,0>2,0>2,1>1,1>1,0>0,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0321",
    "title": "ZIP (6×6) // LABYRINTH #0321",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0321",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 5,
          "c": 1
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 5,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,1>1,1>1,2>1,3>2,3>2,2>3,2>4,2>4,1>3,1>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>4,3>3,3>3,4>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4",
      "acceptedAnswers": [
        "0,2>0,1>1,1>1,2>1,3>2,3>2,2>3,2>4,2>4,1>3,1>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>4,3>3,3>3,4>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0323",
    "title": "ZIP (6×6) // LABYRINTH #0323",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0323",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 5
        },
        {
          "num": 2,
          "r": 1,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 3
        },
        {
          "num": 6,
          "r": 3,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 3
        },
        {
          "num": 9,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,5>3,5>3,4>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3>2,3>2,2>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,3>4,2>3,2>3,1",
      "acceptedAnswers": [
        "2,5>3,5>3,4>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3>2,3>2,2>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,3>4,2>3,2>3,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0325",
    "title": "ZIP (6×6) // LABYRINTH #0325",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0325",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 5
        },
        {
          "num": 2,
          "r": 4,
          "c": 3
        },
        {
          "num": 3,
          "r": 5,
          "c": 0
        },
        {
          "num": 4,
          "r": 2,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 1
        },
        {
          "num": 8,
          "r": 0,
          "c": 5
        },
        {
          "num": 9,
          "r": 3,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,5>5,5>5,4>4,4>4,3>5,3>5,2>5,1>5,0>4,0>3,0>3,1>2,1>2,2>3,2>3,3>3,4>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5",
      "acceptedAnswers": [
        "4,5>5,5>5,4>4,4>4,3>5,3>5,2>5,1>5,0>4,0>3,0>3,1>2,1>2,2>3,2>3,3>3,4>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0327",
    "title": "ZIP (6×6) // LABYRINTH #0327",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0327",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 5
        },
        {
          "num": 2,
          "r": 3,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 5
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 3,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        },
        {
          "num": 8,
          "r": 1,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,5>5,5>5,4>4,4>3,4>3,3>2,3>1,3>1,4>2,4>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>2,1>1,1>1,2>2,2>3,2>4,2",
      "acceptedAnswers": [
        "4,5>5,5>5,4>4,4>3,4>3,3>2,3>1,3>1,4>2,4>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>2,1>1,1>1,2>2,2>3,2>4,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0329",
    "title": "ZIP (6×6) // LABYRINTH #0329",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0329",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 0
        },
        {
          "num": 3,
          "r": 5,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 5,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,2>3,2>2,2>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4",
      "acceptedAnswers": [
        "4,2>3,2>2,2>2,1>2,0>3,0>4,0>5,0>5,1>5,2>5,3>4,3>4,4>3,4>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0331",
    "title": "ZIP (6×6) // LABYRINTH #0331",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0331",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 2,
          "c": 5
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 5,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 4
        },
        {
          "num": 8,
          "r": 0,
          "c": 3
        },
        {
          "num": 9,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>4,4>4,5>3,5>2,5>2,4>2,3>2,2>2,1>3,1>3,2>4,2>4,3>5,3>5,2>5,1>5,0>4,0>3,0>2,0>1,0>1,1>1,2>1,3>1,4>1,5>0,5>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "3,4>4,4>4,5>3,5>2,5>2,4>2,3>2,2>2,1>3,1>3,2>4,2>4,3>5,3>5,2>5,1>5,0>4,0>3,0>2,0>1,0>1,1>1,2>1,3>1,4>1,5>0,5>0,4>0,3>0,2>0,1>0,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0333",
    "title": "ZIP (6×6) // LABYRINTH #0333",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0333",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 5
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 5,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,3>4,3>3,3>3,2>3,1>2,1>2,2>1,2>1,3>2,3>2,4>3,4>4,4>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2",
      "acceptedAnswers": [
        "5,3>4,3>3,3>3,2>3,1>2,1>2,2>1,2>1,3>2,3>2,4>3,4>4,4>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0335",
    "title": "ZIP (6×6) // LABYRINTH #0335",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0335",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>2,1>2,2>1,2>1,1>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>4,4>4,3>4,2>4,1>3,1>2,1>2,2>1,2>1,1>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0337",
    "title": "ZIP (6×6) // LABYRINTH #0337",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0337",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 1
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 3,
          "c": 5
        },
        {
          "num": 4,
          "r": 5,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        },
        {
          "num": 8,
          "r": 0,
          "c": 4
        },
        {
          "num": 9,
          "r": 2,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,1>2,1>2,2>1,2>1,3>2,3>2,4>3,4>3,5>4,5>4,4>5,4>5,3>4,3>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>1,1>0,1>0,2>0,3>0,4>1,4>1,5>2,5",
      "acceptedAnswers": [
        "3,1>2,1>2,2>1,2>1,3>2,3>2,4>3,4>3,5>4,5>4,4>5,4>5,3>4,3>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>1,1>0,1>0,2>0,3>0,4>1,4>1,5>2,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0339",
    "title": "ZIP (6×6) // LABYRINTH #0339",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-17 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0339",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 5,
          "c": 3
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 1,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 5
        },
        {
          "num": 9,
          "r": 3,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>2,0>3,0>3,1>3,2>4,2>5,2>5,3>4,3>3,3>2,3>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>4,4>3,4",
      "acceptedAnswers": [
        "2,2>2,1>2,0>3,0>3,1>3,2>4,2>5,2>5,3>4,3>3,3>2,3>2,4>1,4>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>4,4>3,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (5,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0341",
    "title": "ZIP (6×6) // LABYRINTH #0341",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0341",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 2
        },
        {
          "num": 5,
          "r": 4,
          "c": 1
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 5,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>3,5>2,5>1,5>1,4>0,4>0,3>0,2>1,2>1,3>2,3>2,2>3,2>3,3>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5",
      "acceptedAnswers": [
        "3,4>3,5>2,5>1,5>1,4>0,4>0,3>0,2>1,2>1,3>2,3>2,2>3,2>3,3>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0343",
    "title": "ZIP (6×6) // LABYRINTH #0343",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0343",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 2,
          "c": 2
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 5,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>4,3>3,3>3,2>4,2>5,2>5,1>5,0>4,0>3,0>3,1>2,1>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3>2,3>2,4>2,5>3,5>4,5>5,5>5,4",
      "acceptedAnswers": [
        "4,4>4,3>3,3>3,2>4,2>5,2>5,1>5,0>4,0>3,0>3,1>2,1>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3>2,3>2,4>2,5>3,5>4,5>5,5>5,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0345",
    "title": "ZIP (6×6) // LABYRINTH #0345",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0345",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 2,
          "c": 2
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>2,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>3,2>4,2>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "0,4>1,4>2,4>3,4>4,4>4,3>3,3>2,3>2,2>1,2>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>3,2>4,2>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0347",
    "title": "ZIP (6×6) // LABYRINTH #0347",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0347",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 2
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>3,0>3,1>3,2>2,2>2,1>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,5>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "2,0>3,0>3,1>3,2>2,2>2,1>1,1>0,1>0,2>1,2>1,3>0,3>0,4>1,4>2,4>2,3>3,3>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,5>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0349",
    "title": "ZIP (6×6) // LABYRINTH #0349",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0349",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 5,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 1
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 5
        },
        {
          "num": 8,
          "r": 4,
          "c": 5
        },
        {
          "num": 9,
          "r": 5,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>4,4>4,3>4,2>5,2>5,1>4,1>3,1>3,2>2,2>2,3>2,4>1,4>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3",
      "acceptedAnswers": [
        "3,4>4,4>4,3>4,2>5,2>5,1>4,1>3,1>3,2>2,2>2,3>2,4>1,4>1,3>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0351",
    "title": "ZIP (6×6) // LABYRINTH #0351",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0351",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 4
        },
        {
          "num": 3,
          "r": 4,
          "c": 1
        },
        {
          "num": 4,
          "r": 5,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 5
        },
        {
          "num": 6,
          "r": 0,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 0
        },
        {
          "num": 8,
          "r": 3,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,2>1,3>2,3>3,3>3,4>4,4>4,3>4,2>4,1>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>2,1>2,2>3,2>3,1>3,0>4,0",
      "acceptedAnswers": [
        "1,2>1,3>2,3>3,3>3,4>4,4>4,3>4,2>4,1>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>2,1>2,2>3,2>3,1>3,0>4,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0353",
    "title": "ZIP (6×6) // LABYRINTH #0353",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0353",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 1
        },
        {
          "num": 2,
          "r": 5,
          "c": 0
        },
        {
          "num": 3,
          "r": 5,
          "c": 4
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 2,
          "c": 5
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 1
        },
        {
          "num": 8,
          "r": 1,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,1>3,1>4,1>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,3>3,3>2,3>2,4>3,4>3,5>2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>3,2>4,2",
      "acceptedAnswers": [
        "2,1>3,1>4,1>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,3>3,3>2,3>2,4>3,4>3,5>2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>3,2>4,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0355",
    "title": "ZIP (6×6) // LABYRINTH #0355",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0355",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 5
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 5,
          "c": 1
        },
        {
          "num": 7,
          "r": 5,
          "c": 5
        },
        {
          "num": 8,
          "r": 3,
          "c": 3
        },
        {
          "num": 9,
          "r": 2,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,3>1,3>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>2,1>2,0>3,0>3,1>3,2>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>4,3>3,3>3,4>3,5>2,5",
      "acceptedAnswers": [
        "2,4>2,3>1,3>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>2,1>2,0>3,0>3,1>3,2>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>4,3>3,3>3,4>3,5>2,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0357",
    "title": "ZIP (6×6) // LABYRINTH #0357",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0357",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 1
        },
        {
          "num": 2,
          "r": 1,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 2
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        },
        {
          "num": 8,
          "r": 2,
          "c": 4
        },
        {
          "num": 9,
          "r": 4,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,1>2,1>2,2>1,2>1,3>2,3>3,3>3,4>4,4>5,4>5,3>4,3>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>2,4>2,5>3,5>4,5",
      "acceptedAnswers": [
        "1,1>2,1>2,2>1,2>1,3>2,3>3,3>3,4>4,4>5,4>5,3>4,3>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>2,4>2,5>3,5>4,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0359",
    "title": "ZIP (6×6) // LABYRINTH #0359",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-18 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0359",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 2
        },
        {
          "num": 3,
          "r": 0,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 3
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>3,0>3,1>3,2>2,2>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>3,3>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "2,0>3,0>3,1>3,2>2,2>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>3,4>3,3>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0361",
    "title": "ZIP (6×6) // LABYRINTH #0361",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0361",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 1
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 5
        },
        {
          "num": 5,
          "r": 4,
          "c": 5
        },
        {
          "num": 6,
          "r": 5,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        },
        {
          "num": 8,
          "r": 3,
          "c": 4
        },
        {
          "num": 9,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,1>1,1>1,0>0,0>0,1>0,2>1,2>2,2>2,3>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1",
      "acceptedAnswers": [
        "2,1>1,1>1,0>0,0>0,1>0,2>1,2>2,2>2,3>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>4,2>4,3>4,4>3,4>3,3>3,2>3,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0363",
    "title": "ZIP (6×6) // LABYRINTH #0363",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0363",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 2
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        },
        {
          "num": 8,
          "r": 2,
          "c": 4
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>2,1>3,1>3,0>4,0>5,0>5,1>4,1>4,2>5,2>5,3>4,3>4,4>4,5>3,5>3,4>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>2,5>1,5>0,5",
      "acceptedAnswers": [
        "2,0>2,1>3,1>3,0>4,0>5,0>5,1>4,1>4,2>5,2>5,3>4,3>4,4>4,5>3,5>3,4>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0365",
    "title": "ZIP (6×6) // LABYRINTH #0365",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0365",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 5,
          "c": 5
        },
        {
          "num": 3,
          "r": 5,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        },
        {
          "num": 8,
          "r": 4,
          "c": 2
        },
        {
          "num": 9,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>3,4>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>3,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3>2,3>3,3>4,3>4,2>3,2>2,2>1,2",
      "acceptedAnswers": [
        "2,4>3,4>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>3,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3>2,3>3,3>4,3>4,2>3,2>2,2>1,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0367",
    "title": "ZIP (6×6) // LABYRINTH #0367",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0367",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 5
        },
        {
          "num": 5,
          "r": 3,
          "c": 5
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 1,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,3>3,2>3,1>2,1>1,1>0,1>0,2>1,2>1,3>0,3>0,4>0,5>1,5>1,4>2,4>2,5>3,5>4,5>5,5>5,4>4,4>4,3>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0",
      "acceptedAnswers": [
        "3,3>3,2>3,1>2,1>1,1>0,1>0,2>1,2>1,3>0,3>0,4>0,5>1,5>1,4>2,4>2,5>3,5>4,5>5,5>5,4>4,4>4,3>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0369",
    "title": "ZIP (6×6) // LABYRINTH #0369",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0369",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 2
        },
        {
          "num": 2,
          "r": 5,
          "c": 0
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 4
        },
        {
          "num": 5,
          "r": 5,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 5
        },
        {
          "num": 7,
          "r": 0,
          "c": 3
        },
        {
          "num": 8,
          "r": 1,
          "c": 0
        },
        {
          "num": 9,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>2,1>2,2>2,3>2,4>3,4>3,3>4,3>4,4>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3",
      "acceptedAnswers": [
        "5,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>2,1>2,2>2,3>2,4>3,4>3,3>4,3>4,4>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>1,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0371",
    "title": "ZIP (6×6) // LABYRINTH #0371",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0371",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 5
        },
        {
          "num": 2,
          "r": 1,
          "c": 2
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 3,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,5>0,4>0,3>1,3>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0",
      "acceptedAnswers": [
        "0,5>0,4>0,3>1,3>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,2>4,2>4,3>4,4>3,4>3,3>2,3>2,4>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0373",
    "title": "ZIP (6×6) // LABYRINTH #0373",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0373",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 5,
          "c": 0
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 2
        },
        {
          "num": 6,
          "r": 5,
          "c": 4
        },
        {
          "num": 7,
          "r": 2,
          "c": 5
        },
        {
          "num": 8,
          "r": 0,
          "c": 3
        },
        {
          "num": 9,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>5,3>5,2>5,1>5,0>4,0>3,0>3,1>2,1>1,1>1,2>1,3>1,4>2,4>2,3>2,2>3,2>3,3>3,4>4,4>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0",
      "acceptedAnswers": [
        "4,3>5,3>5,2>5,1>5,0>4,0>3,0>3,1>2,1>1,1>1,2>1,3>1,4>2,4>2,3>2,2>3,2>3,3>3,4>4,4>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0375",
    "title": "ZIP (6×6) // LABYRINTH #0375",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0375",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 1
        },
        {
          "num": 3,
          "r": 3,
          "c": 0
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 0,
          "c": 5
        },
        {
          "num": 7,
          "r": 4,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,3>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0",
      "acceptedAnswers": [
        "2,3>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>2,4>1,4>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0377",
    "title": "ZIP (6×6) // LABYRINTH #0377",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0377",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 5,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 3
        },
        {
          "num": 8,
          "r": 1,
          "c": 5
        },
        {
          "num": 9,
          "r": 4,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,3>5,4>4,4>3,4>2,4>2,3>2,2>3,2>3,3>4,3>4,2>5,2>5,1>5,0>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>1,4>0,4>0,5>1,5>2,5>3,5>4,5",
      "acceptedAnswers": [
        "5,3>5,4>4,4>3,4>2,4>2,3>2,2>3,2>3,3>4,3>4,2>5,2>5,1>5,0>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>1,4>0,4>0,5>1,5>2,5>3,5>4,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0379",
    "title": "ZIP (6×6) // LABYRINTH #0379",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-19 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0379",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 5
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>3,3>3,4>3,5>2,5>1,5>1,4>2,4>2,3>2,2>3,2>4,2>4,1>3,1>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>4,4",
      "acceptedAnswers": [
        "4,3>3,3>3,4>3,5>2,5>1,5>1,4>2,4>2,3>2,2>3,2>4,2>4,1>3,1>2,1>1,1>1,2>1,3>0,3>0,2>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>4,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0381",
    "title": "ZIP (6×6) // LABYRINTH #0381",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0381",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 5,
          "c": 5
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        },
        {
          "num": 8,
          "r": 5,
          "c": 3
        },
        {
          "num": 9,
          "r": 5,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>1,2>2,2>3,2>3,3>3,4>4,4>5,4>5,5>4,5>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>3,1>4,1>4,2>4,3>5,3>5,2>5,1>5,0",
      "acceptedAnswers": [
        "1,3>1,2>2,2>3,2>3,3>3,4>4,4>5,4>5,5>4,5>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>3,1>4,1>4,2>4,3>5,3>5,2>5,1>5,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0383",
    "title": "ZIP (6×6) // LABYRINTH #0383",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0383",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 1
        },
        {
          "num": 2,
          "r": 5,
          "c": 0
        },
        {
          "num": 3,
          "r": 4,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 5
        },
        {
          "num": 5,
          "r": 2,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 3
        },
        {
          "num": 8,
          "r": 2,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 5,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,1>2,0>3,0>4,0>5,0>5,1>4,1>4,2>4,3>5,3>5,4>5,5>4,5>4,4>3,4>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>2,5>1,5>0,5>0,4",
      "acceptedAnswers": [
        "2,1>2,0>3,0>4,0>5,0>5,1>4,1>4,2>4,3>5,3>5,4>5,5>4,5>4,4>3,4>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>2,4>2,5>1,5>0,5>0,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0385",
    "title": "ZIP (6×6) // LABYRINTH #0385",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0385",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 4
        },
        {
          "num": 2,
          "r": 3,
          "c": 2
        },
        {
          "num": 3,
          "r": 2,
          "c": 5
        },
        {
          "num": 4,
          "r": 0,
          "c": 3
        },
        {
          "num": 5,
          "r": 1,
          "c": 0
        },
        {
          "num": 6,
          "r": 5,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 4
        },
        {
          "num": 8,
          "r": 4,
          "c": 3
        },
        {
          "num": 9,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,4>1,3>1,2>2,2>3,2>3,3>3,4>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>4,3>4,2>4,1>3,1",
      "acceptedAnswers": [
        "1,4>1,3>1,2>2,2>3,2>3,3>3,4>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>4,3>4,2>4,1>3,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0387",
    "title": "ZIP (6×6) // LABYRINTH #0387",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0387",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 1,
          "c": 5
        },
        {
          "num": 3,
          "r": 2,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        },
        {
          "num": 8,
          "r": 5,
          "c": 3
        },
        {
          "num": 9,
          "r": 4,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>0,3>0,4>0,5>1,5>2,5>2,4>2,3>2,2>1,2>0,2>0,1>1,1>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5",
      "acceptedAnswers": [
        "1,3>0,3>0,4>0,5>1,5>2,5>2,4>2,3>2,2>1,2>0,2>0,1>1,1>1,0>2,0>3,0>3,1>3,2>3,3>3,4>4,4>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0389",
    "title": "ZIP (6×6) // LABYRINTH #0389",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0389",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 5
        },
        {
          "num": 2,
          "r": 1,
          "c": 5
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 1,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 3,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>2,0>2,1>1,1>1,2>1,3>2,3>3,3>3,4>4,4>5,4>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>3,2",
      "acceptedAnswers": [
        "5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>2,0>2,1>1,1>1,2>1,3>2,3>3,3>3,4>4,4>5,4>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>3,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0391",
    "title": "ZIP (6×6) // LABYRINTH #0391",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0391",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 5,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 5
        },
        {
          "num": 8,
          "r": 0,
          "c": 4
        },
        {
          "num": 9,
          "r": 2,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>1,2>1,1>0,1>0,0>1,0>2,0>3,0>3,1>2,1>2,2>2,3>3,3>3,2>4,2>4,1>5,1>5,2>5,3>4,3>4,4>5,4>5,5>4,5>3,5>3,4>2,4>1,4>0,4>0,5>1,5>2,5",
      "acceptedAnswers": [
        "1,3>1,2>1,1>0,1>0,0>1,0>2,0>3,0>3,1>2,1>2,2>2,3>3,3>3,2>4,2>4,1>5,1>5,2>5,3>4,3>4,4>5,4>5,5>4,5>3,5>3,4>2,4>1,4>0,4>0,5>1,5>2,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0393",
    "title": "ZIP (6×6) // LABYRINTH #0393",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0393",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 0,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 1
        },
        {
          "num": 6,
          "r": 5,
          "c": 1
        },
        {
          "num": 7,
          "r": 5,
          "c": 5
        },
        {
          "num": 8,
          "r": 2,
          "c": 4
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>2,3>3,3>3,4>4,4>4,3>4,2>4,1>3,1>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>2,4>1,4>0,4>0,5",
      "acceptedAnswers": [
        "2,2>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>2,3>3,3>3,4>4,4>4,3>4,2>4,1>3,1>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>2,4>1,4>0,4>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0395",
    "title": "ZIP (6×6) // LABYRINTH #0395",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0395",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 2
        },
        {
          "num": 2,
          "r": 5,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 2,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 5
        },
        {
          "num": 7,
          "r": 0,
          "c": 5
        },
        {
          "num": 8,
          "r": 1,
          "c": 2
        },
        {
          "num": 9,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>1,1>2,1>2,2>2,3>2,4>3,4>4,4>4,3>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>1,3>1,2>0,2>0,1>0,0",
      "acceptedAnswers": [
        "5,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>1,1>2,1>2,2>2,3>2,4>3,4>4,4>4,3>5,3>5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>1,3>1,2>0,2>0,1>0,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0397",
    "title": "ZIP (6×6) // LABYRINTH #0397",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0397",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 2
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 5,
          "c": 5
        },
        {
          "num": 6,
          "r": 4,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        },
        {
          "num": 8,
          "r": 3,
          "c": 3
        },
        {
          "num": 9,
          "r": 1,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>0,1>1,1>2,1>2,2>1,2>0,2>0,3>0,4>0,5>1,5>2,5>2,4>3,4>4,4>4,5>5,5>5,4>5,3>4,3>4,2>5,2>5,1>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,4",
      "acceptedAnswers": [
        "0,0>0,1>1,1>2,1>2,2>1,2>0,2>0,3>0,4>0,5>1,5>2,5>2,4>3,4>4,4>4,5>5,5>5,4>5,3>4,3>4,2>5,2>5,1>4,1>4,0>3,0>3,1>3,2>3,3>2,3>1,3>1,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0399",
    "title": "ZIP (6×6) // LABYRINTH #0399",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-20 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0399",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 2,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 5
        },
        {
          "num": 5,
          "r": 4,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 2
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        },
        {
          "num": 8,
          "r": 4,
          "c": 2
        },
        {
          "num": 9,
          "r": 5,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,1>1,0>0,0>0,1>0,2>1,2>1,3>2,3>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>4,4>3,4>3,3>3,2>2,2>2,1>2,0>3,0>4,0>4,1>5,1>5,2>4,2>4,3>5,3>5,4",
      "acceptedAnswers": [
        "1,1>1,0>0,0>0,1>0,2>1,2>1,3>2,3>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>4,4>3,4>3,3>3,2>2,2>2,1>2,0>3,0>4,0>4,1>5,1>5,2>4,2>4,3>5,3>5,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0401",
    "title": "ZIP (6×6) // LABYRINTH #0401",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0401",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 5
        },
        {
          "num": 2,
          "r": 4,
          "c": 5
        },
        {
          "num": 3,
          "r": 5,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 0
        },
        {
          "num": 5,
          "r": 1,
          "c": 2
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 3
        },
        {
          "num": 8,
          "r": 2,
          "c": 1
        },
        {
          "num": 9,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,5>3,5>3,4>4,4>4,5>5,5>5,4>5,3>5,2>4,2>4,1>4,0>3,0>3,1>3,2>2,2>1,2>1,3>2,3>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>2,1>2,0>1,0>0,0",
      "acceptedAnswers": [
        "2,5>3,5>3,4>4,4>4,5>5,5>5,4>5,3>5,2>4,2>4,1>4,0>3,0>3,1>3,2>2,2>1,2>1,3>2,3>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>2,1>2,0>1,0>0,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0403",
    "title": "ZIP (6×6) // LABYRINTH #0403",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0403",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 5,
          "c": 1
        },
        {
          "num": 4,
          "r": 5,
          "c": 5
        },
        {
          "num": 5,
          "r": 1,
          "c": 5
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 1,
          "c": 1
        },
        {
          "num": 8,
          "r": 2,
          "c": 4
        },
        {
          "num": 9,
          "r": 4,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>3,0>3,1>3,2>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>2,3>2,4>3,4>4,4>4,3",
      "acceptedAnswers": [
        "2,0>3,0>3,1>3,2>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>0,0>1,0>1,1>1,2>2,2>2,3>2,4>3,4>4,4>4,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0405",
    "title": "ZIP (6×6) // LABYRINTH #0405",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0405",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 2,
          "c": 5
        },
        {
          "num": 5,
          "r": 5,
          "c": 4
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        },
        {
          "num": 8,
          "r": 5,
          "c": 0
        },
        {
          "num": 9,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,2>2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>4,4>3,4>2,4>1,4>1,3>2,3>3,3>4,3>5,3>5,2>5,1>5,0>4,0>3,0>3,1",
      "acceptedAnswers": [
        "1,2>2,2>2,1>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>4,4>3,4>2,4>1,4>1,3>2,3>3,3>4,3>5,3>5,2>5,1>5,0>4,0>3,0>3,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0407",
    "title": "ZIP (6×6) // LABYRINTH #0407",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0407",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 5
        },
        {
          "num": 3,
          "r": 3,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 1
        },
        {
          "num": 8,
          "r": 0,
          "c": 5
        },
        {
          "num": 9,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,3>2,4>2,5>3,5>4,5>5,5>5,4>4,4>3,4>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>2,1>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3",
      "acceptedAnswers": [
        "2,3>2,4>2,5>3,5>4,5>5,5>5,4>4,4>3,4>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>2,1>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0409",
    "title": "ZIP (6×6) // LABYRINTH #0409",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0409",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 5
        },
        {
          "num": 4,
          "r": 3,
          "c": 4
        },
        {
          "num": 5,
          "r": 5,
          "c": 4
        },
        {
          "num": 6,
          "r": 5,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        },
        {
          "num": 8,
          "r": 1,
          "c": 2
        },
        {
          "num": 9,
          "r": 0,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,3>3,3>3,2>2,2>2,3>1,3>0,3>0,4>0,5>1,5>1,4>2,4>3,4>3,5>4,5>4,4>5,4>5,3>5,2>5,1>5,0>4,0>4,1>3,1>3,0>2,0>1,0>1,1>1,2>0,2>0,1>0,0",
      "acceptedAnswers": [
        "4,3>3,3>3,2>2,2>2,3>1,3>0,3>0,4>0,5>1,5>1,4>2,4>3,4>3,5>4,5>4,4>5,4>5,3>5,2>5,1>5,0>4,0>4,1>3,1>3,0>2,0>1,0>1,1>1,2>0,2>0,1>0,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0411",
    "title": "ZIP (6×6) // LABYRINTH #0411",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0411",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 2
        },
        {
          "num": 2,
          "r": 3,
          "c": 4
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 5
        },
        {
          "num": 7,
          "r": 5,
          "c": 4
        },
        {
          "num": 8,
          "r": 5,
          "c": 0
        },
        {
          "num": 9,
          "r": 3,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,2>4,2>4,3>4,4>3,4>2,4>2,3>2,2>2,1>2,0>1,0>1,1>1,2>0,2>0,3>1,3>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>3,0>3,1",
      "acceptedAnswers": [
        "3,2>4,2>4,3>4,4>3,4>2,4>2,3>2,2>2,1>2,0>1,0>1,1>1,2>0,2>0,3>1,3>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>3,0>3,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0413",
    "title": "ZIP (6×6) // LABYRINTH #0413",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0413",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 5,
          "c": 5
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 5,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        },
        {
          "num": 8,
          "r": 1,
          "c": 5
        },
        {
          "num": 9,
          "r": 2,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>3,4>3,5>4,5>5,5>5,4>5,3>4,3>3,3>3,2>2,2>1,2>1,1>2,1>3,1>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3>2,3",
      "acceptedAnswers": [
        "2,4>3,4>3,5>4,5>5,5>5,4>5,3>4,3>3,3>3,2>2,2>1,2>1,1>2,1>3,1>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2>0,3>0,4>0,5>1,5>1,4>1,3>2,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0415",
    "title": "ZIP (6×6) // LABYRINTH #0415",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0415",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 0
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 5
        },
        {
          "num": 7,
          "r": 5,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 1
        },
        {
          "num": 9,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>3,1>3,0>2,0",
      "acceptedAnswers": [
        "1,2>0,2>0,1>0,0>1,0>1,1>2,1>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>3,1>3,0>2,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0417",
    "title": "ZIP (6×6) // LABYRINTH #0417",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0417",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 5,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        },
        {
          "num": 8,
          "r": 2,
          "c": 4
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,3>1,3>2,3>2,2>3,2>3,3>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,5>3,5>3,4>2,4>1,4>1,5>0,5",
      "acceptedAnswers": [
        "0,2>0,3>1,3>2,3>2,2>3,2>3,3>4,3>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>5,4>4,4>4,5>3,5>3,4>2,4>1,4>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0419",
    "title": "ZIP (6×6) // LABYRINTH #0419",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-21 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0419",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 2,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 5
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 3,
          "c": 1
        },
        {
          "num": 8,
          "r": 5,
          "c": 1
        },
        {
          "num": 9,
          "r": 5,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>3,2>4,2>4,3>4,4>4,5>3,5>2,5>2,4>2,3>1,3>1,4>1,5>0,5>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,0>4,0>5,0>5,1>5,2>5,3>5,4",
      "acceptedAnswers": [
        "2,2>3,2>4,2>4,3>4,4>4,5>3,5>2,5>2,4>2,3>1,3>1,4>1,5>0,5>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>3,1>3,0>4,0>5,0>5,1>5,2>5,3>5,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0421",
    "title": "ZIP (6×6) // LABYRINTH #0421",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0421",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 1
        },
        {
          "num": 2,
          "r": 0,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 5
        },
        {
          "num": 4,
          "r": 5,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 2
        },
        {
          "num": 7,
          "r": 5,
          "c": 0
        },
        {
          "num": 8,
          "r": 1,
          "c": 0
        },
        {
          "num": 9,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,1>1,1>1,2>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>4,4>4,3>3,3>3,4>2,4>2,3>2,2>3,2>3,1>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
      "acceptedAnswers": [
        "2,1>1,1>1,2>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4>4,4>4,3>3,3>3,4>2,4>2,3>2,2>3,2>3,1>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0423",
    "title": "ZIP (6×6) // LABYRINTH #0423",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0423",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 5
        },
        {
          "num": 3,
          "r": 1,
          "c": 1
        },
        {
          "num": 4,
          "r": 4,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        },
        {
          "num": 8,
          "r": 5,
          "c": 3
        },
        {
          "num": 9,
          "r": 5,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 2
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2>0,3>0,4>0,5>1,5>1,4>1,3>1,2>1,1>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>3,3>2,3>2,4>2,5>3,5>3,4>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0",
      "acceptedAnswers": [
        "0,2>0,3>0,4>0,5>1,5>1,4>1,3>1,2>1,1>2,1>2,0>3,0>4,0>4,1>3,1>3,2>4,2>4,3>3,3>2,3>2,4>2,5>3,5>3,4>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0425",
    "title": "ZIP (6×6) // LABYRINTH #0425",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 32 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0425",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 3
        },
        {
          "num": 2,
          "r": 5,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 5
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 2,
          "c": 1
        },
        {
          "num": 7,
          "r": 5,
          "c": 0
        },
        {
          "num": 8,
          "r": 1,
          "c": 0
        },
        {
          "num": 9,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 32,
      "solutionPath": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,3>2,2>3,2>4,2>5,2>5,3>5,4>5,5>4,5>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>1,3>1,2>1,1>2,1>3,1>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
      "acceptedAnswers": [
        "2,3>2,2>3,2>4,2>5,2>5,3>5,4>5,5>4,5>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>1,3>1,2>1,1>2,1>3,1>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>0,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (4,4) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0427",
    "title": "ZIP (6×6) // LABYRINTH #0427",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0427",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 5
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 0,
          "c": 5
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 3
        },
        {
          "num": 7,
          "r": 5,
          "c": 4
        },
        {
          "num": 8,
          "r": 5,
          "c": 0
        },
        {
          "num": 9,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,5>3,5>3,4>3,3>2,3>2,4>1,4>1,5>0,5>0,4>0,3>0,2>1,2>2,2>2,1>2,0>3,0>3,1>4,1>4,2>4,3>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0",
      "acceptedAnswers": [
        "2,5>3,5>3,4>3,3>2,3>2,4>1,4>1,5>0,5>0,4>0,3>0,2>1,2>2,2>2,1>2,0>3,0>3,1>4,1>4,2>4,3>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0429",
    "title": "ZIP (6×6) // LABYRINTH #0429",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0429",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 4
        },
        {
          "num": 2,
          "r": 4,
          "c": 1
        },
        {
          "num": 3,
          "r": 3,
          "c": 0
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 2,
          "c": 5
        },
        {
          "num": 7,
          "r": 0,
          "c": 3
        },
        {
          "num": 8,
          "r": 1,
          "c": 0
        },
        {
          "num": 9,
          "r": 2,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,4>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>2,1>1,1>1,2>1,3>1,4>2,4>3,4>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
      "acceptedAnswers": [
        "5,4>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>2,1>1,1>1,2>1,3>1,4>2,4>3,4>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>0,0>1,0>2,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0431",
    "title": "ZIP (6×6) // LABYRINTH #0431",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0431",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 1
        },
        {
          "num": 2,
          "r": 2,
          "c": 0
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 3
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 5
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 3,
          "c": 1
        },
        {
          "num": 9,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,1>4,1>4,0>3,0>2,0>1,0>1,1>0,1>0,2>1,2>1,3>2,3>3,3>3,4>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>4,4>4,3>5,3>5,2>4,2>3,2>3,1>2,1",
      "acceptedAnswers": [
        "5,1>4,1>4,0>3,0>2,0>1,0>1,1>0,1>0,2>1,2>1,3>2,3>3,3>3,4>2,4>1,4>0,4>0,5>1,5>2,5>3,5>4,5>4,4>4,3>5,3>5,2>4,2>3,2>3,1>2,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0433",
    "title": "ZIP (6×6) // LABYRINTH #0433",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0433",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 5,
          "c": 4
        },
        {
          "num": 4,
          "r": 2,
          "c": 5
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        },
        {
          "num": 8,
          "r": 1,
          "c": 2
        },
        {
          "num": 9,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,2>5,3>4,3>3,3>2,3>2,4>3,4>4,4>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>3,1>4,1>4,2>3,2>2,2>1,2>1,3",
      "acceptedAnswers": [
        "5,2>5,3>4,3>3,3>2,3>2,4>3,4>4,4>5,4>5,5>4,5>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>3,1>4,1>4,2>3,2>2,2>1,2>1,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0435",
    "title": "ZIP (6×6) // LABYRINTH #0435",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0435",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 2
        },
        {
          "num": 2,
          "r": 1,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 2
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 5
        },
        {
          "num": 7,
          "r": 5,
          "c": 3
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,2>1,2>0,2>0,1>1,1>2,1>3,1>3,2>4,2>4,3>3,3>3,4>2,4>2,3>1,3>0,3>0,4>1,4>1,5>2,5>3,5>4,5>4,4>5,4>5,3>5,2>5,1>5,0>4,0>3,0",
      "acceptedAnswers": [
        "2,2>1,2>0,2>0,1>1,1>2,1>3,1>3,2>4,2>4,3>3,3>3,4>2,4>2,3>1,3>0,3>0,4>1,4>1,5>2,5>3,5>4,5>4,4>5,4>5,3>5,2>5,1>5,0>4,0>3,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0437",
    "title": "ZIP (6×6) // LABYRINTH #0437",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0437",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 0,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 2
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 5,
          "c": 1
        },
        {
          "num": 6,
          "r": 4,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 5
        },
        {
          "num": 8,
          "r": 2,
          "c": 2
        },
        {
          "num": 9,
          "r": 3,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>0,1>1,1>2,1>3,1>4,1>4,0>5,0>5,1>5,2>4,2>4,3>4,4>5,4>5,5>4,5>3,5>3,4>3,3>2,3>2,2>3,2",
      "acceptedAnswers": [
        "2,4>2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>0,1>1,1>2,1>3,1>4,1>4,0>5,0>5,1>5,2>4,2>4,3>4,4>5,4>5,5>4,5>3,5>3,4>3,3>2,3>2,2>3,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0439",
    "title": "ZIP (6×6) // LABYRINTH #0439",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-22 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0439",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 0
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 2,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 2
        },
        {
          "num": 5,
          "r": 4,
          "c": 0
        },
        {
          "num": 6,
          "r": 5,
          "c": 3
        },
        {
          "num": 7,
          "r": 4,
          "c": 4
        },
        {
          "num": 8,
          "r": 1,
          "c": 5
        },
        {
          "num": 9,
          "r": 0,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,0>1,0>1,1>0,1>0,2>1,2>1,3>1,4>2,4>2,3>3,3>4,3>4,2>4,1>3,1>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>3,4>3,5>2,5>1,5>0,5",
      "acceptedAnswers": [
        "2,0>1,0>1,1>0,1>0,2>1,2>1,3>1,4>2,4>2,3>3,3>4,3>4,2>4,1>3,1>3,0>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>4,4>3,4>3,5>2,5>1,5>0,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0441",
    "title": "ZIP (6×6) // LABYRINTH #0441",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0441",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 5
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 1
        },
        {
          "num": 8,
          "r": 3,
          "c": 3
        },
        {
          "num": 9,
          "r": 2,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,5>5,4>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>2,2>3,2>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>4,3>3,3>2,3",
      "acceptedAnswers": [
        "5,5>5,4>4,4>3,4>2,4>1,4>0,4>0,3>1,3>1,2>2,2>3,2>4,2>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3>4,3>3,3>2,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0443",
    "title": "ZIP (6×6) // LABYRINTH #0443",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0443",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 5
        },
        {
          "num": 2,
          "r": 0,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 0
        },
        {
          "num": 4,
          "r": 3,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 5,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 5
        },
        {
          "num": 9,
          "r": 3,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 0
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,5>1,5>1,4>0,4>0,3>0,2>1,2>1,1>1,0>2,0>2,1>3,1>3,2>3,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5",
      "acceptedAnswers": [
        "2,5>1,5>1,4>0,4>0,3>0,2>1,2>1,1>1,0>2,0>2,1>3,1>3,2>3,3>2,3>2,4>3,4>4,4>4,3>4,2>4,1>4,0>5,0>5,1>5,2>5,3>5,4>5,5>4,5>3,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0445",
    "title": "ZIP (6×6) // LABYRINTH #0445",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0445",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 5,
          "c": 1
        },
        {
          "num": 4,
          "r": 3,
          "c": 1
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 5
        },
        {
          "num": 8,
          "r": 2,
          "c": 2
        },
        {
          "num": 9,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,3>5,4>4,4>4,3>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,5>2,5>3,5>3,4>2,4>2,3>2,2>1,2",
      "acceptedAnswers": [
        "5,3>5,4>4,4>4,3>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>3,1>2,1>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,5>2,5>3,5>3,4>2,4>2,3>2,2>1,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0447",
    "title": "ZIP (6×6) // LABYRINTH #0447",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0447",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 2,
          "c": 4
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 5,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 5
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 2,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 5,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "2,4>2,3>3,3>3,2>3,1>4,1>5,1>5,2>5,3>5,4>5,5>4,5>4,4>3,4>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>1,1>1,2>2,2>2,1>2,0>3,0>4,0>5,0",
      "acceptedAnswers": [
        "2,4>2,3>3,3>3,2>3,1>4,1>5,1>5,2>5,3>5,4>5,5>4,5>4,4>3,4>3,5>2,5>1,5>1,4>0,4>0,3>0,2>0,1>1,1>1,2>2,2>2,1>2,0>3,0>4,0>5,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0449",
    "title": "ZIP (6×6) // LABYRINTH #0449",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0449",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 5
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 0
        },
        {
          "num": 4,
          "r": 0,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 4
        },
        {
          "num": 7,
          "r": 0,
          "c": 4
        },
        {
          "num": 8,
          "r": 3,
          "c": 5
        },
        {
          "num": 9,
          "r": 4,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,5>5,4>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>2,2>3,2>3,3>2,3>2,4>1,4>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5",
      "acceptedAnswers": [
        "5,5>5,4>5,3>5,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>1,1>1,2>2,2>3,2>3,3>2,3>2,4>1,4>1,3>0,3>0,4>0,5>1,5>2,5>3,5>4,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0451",
    "title": "ZIP (6×6) // LABYRINTH #0451",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0451",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 5
        },
        {
          "num": 5,
          "r": 0,
          "c": 2
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 5,
          "c": 1
        },
        {
          "num": 8,
          "r": 2,
          "c": 2
        },
        {
          "num": 9,
          "r": 1,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>2,3>3,3>3,2>4,2>5,2>5,3>4,3>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>2,1>2,2>1,2",
      "acceptedAnswers": [
        "1,3>2,3>3,3>3,2>4,2>5,2>5,3>4,3>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>2,1>2,2>1,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0453",
    "title": "ZIP (6×6) // LABYRINTH #0453",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0453",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 4
        },
        {
          "num": 2,
          "r": 2,
          "c": 5
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 3,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 4,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 3
        },
        {
          "num": 8,
          "r": 1,
          "c": 4
        },
        {
          "num": 9,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,4>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>1,2>2,2>3,2>3,1>2,1>2,0>3,0>4,0>5,0>5,1>4,1>4,2>5,2>5,3>4,3>3,3>3,4>2,4>1,4>1,3",
      "acceptedAnswers": [
        "5,4>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>1,2>2,2>3,2>3,1>2,1>2,0>3,0>4,0>5,0>5,1>4,1>4,2>5,2>5,3>4,3>3,3>3,4>2,4>1,4>1,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0455",
    "title": "ZIP (6×6) // LABYRINTH #0455",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0455",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 5
        },
        {
          "num": 2,
          "r": 3,
          "c": 3
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,5>4,5>4,4>4,3>3,3>3,4>2,4>2,3>1,3>1,4>1,5>0,5>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>2,2>3,2>4,2>5,2>5,1>5,0>4,0>4,1",
      "acceptedAnswers": [
        "5,5>4,5>4,4>4,3>3,3>3,4>2,4>2,3>1,3>1,4>1,5>0,5>0,4>0,3>0,2>1,2>1,1>0,1>0,0>1,0>2,0>2,1>2,2>3,2>4,2>5,2>5,1>5,0>4,0>4,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0457",
    "title": "ZIP (6×6) // LABYRINTH #0457",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0457",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 3
        },
        {
          "num": 2,
          "r": 3,
          "c": 5
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        },
        {
          "num": 8,
          "r": 4,
          "c": 2
        },
        {
          "num": 9,
          "r": 4,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,3>4,3>3,3>3,4>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,2>1,3>1,4>2,4>2,3>2,2>3,2>3,1>2,1>2,0>3,0>4,0>5,0>5,1>5,2>4,2>4,1",
      "acceptedAnswers": [
        "5,3>4,3>3,3>3,4>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,2>1,3>1,4>2,4>2,3>2,2>3,2>3,1>2,1>2,0>3,0>4,0>5,0>5,1>5,2>4,2>4,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0459",
    "title": "ZIP (6×6) // LABYRINTH #0459",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-23 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0459",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 2
        },
        {
          "num": 2,
          "r": 4,
          "c": 5
        },
        {
          "num": 3,
          "r": 3,
          "c": 2
        },
        {
          "num": 4,
          "r": 5,
          "c": 0
        },
        {
          "num": 5,
          "r": 2,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 2
        },
        {
          "num": 7,
          "r": 0,
          "c": 5
        },
        {
          "num": 8,
          "r": 2,
          "c": 3
        },
        {
          "num": 9,
          "r": 2,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,2>5,3>4,3>4,4>4,5>3,5>3,4>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>2,1>1,1>0,1>0,2>1,2>1,3>0,3>0,4>0,5>1,5>1,4>2,4>2,3>2,2",
      "acceptedAnswers": [
        "5,2>5,3>4,3>4,4>4,5>3,5>3,4>3,3>3,2>4,2>4,1>5,1>5,0>4,0>3,0>2,0>2,1>1,1>0,1>0,2>1,2>1,3>0,3>0,4>0,5>1,5>1,4>2,4>2,3>2,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0461",
    "title": "ZIP (6×6) // LABYRINTH #0461",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0461",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 2
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 5,
          "c": 0
        },
        {
          "num": 4,
          "r": 3,
          "c": 2
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 5,
          "c": 4
        },
        {
          "num": 7,
          "r": 2,
          "c": 5
        },
        {
          "num": 8,
          "r": 0,
          "c": 3
        },
        {
          "num": 9,
          "r": 1,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,2>0,2>0,1>1,1>2,1>3,1>3,0>4,0>5,0>5,1>4,1>4,2>3,2>2,2>2,3>2,4>3,4>3,3>4,3>5,3>5,4>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>1,3",
      "acceptedAnswers": [
        "1,2>0,2>0,1>1,1>2,1>3,1>3,0>4,0>5,0>5,1>4,1>4,2>3,2>2,2>2,3>2,4>3,4>3,3>4,3>5,3>5,4>4,4>4,5>3,5>2,5>1,5>0,5>0,4>0,3>1,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0463",
    "title": "ZIP (6×6) // LABYRINTH #0463",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0463",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 0
        },
        {
          "num": 2,
          "r": 2,
          "c": 1
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 3
        },
        {
          "num": 6,
          "r": 3,
          "c": 4
        },
        {
          "num": 7,
          "r": 5,
          "c": 4
        },
        {
          "num": 8,
          "r": 2,
          "c": 5
        },
        {
          "num": 9,
          "r": 1,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,0>4,0>3,0>2,0>2,1>3,1>3,2>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>5,3>5,4>5,5>4,5>3,5>2,5>1,5",
      "acceptedAnswers": [
        "5,0>4,0>3,0>2,0>2,1>3,1>3,2>3,3>2,3>2,2>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>2,4>3,4>4,4>4,3>5,3>5,4>5,5>4,5>3,5>2,5>1,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0465",
    "title": "ZIP (6×6) // LABYRINTH #0465",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0465",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 4
        },
        {
          "num": 2,
          "r": 2,
          "c": 5
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 1,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 0
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 5,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,4>4,4>3,4>3,5>2,5>1,5>1,4>2,4>2,3>3,3>3,2>4,2>4,1>3,1>2,1>2,2>1,2>1,3>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3",
      "acceptedAnswers": [
        "5,4>4,4>3,4>3,5>2,5>1,5>1,4>2,4>2,3>3,3>3,2>4,2>4,1>3,1>2,1>2,2>1,2>1,3>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>5,0>5,1>5,2>5,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0467",
    "title": "ZIP (6×6) // LABYRINTH #0467",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0467",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 3
        },
        {
          "num": 2,
          "r": 4,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 5,
          "c": 1
        },
        {
          "num": 5,
          "r": 2,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 2
        },
        {
          "num": 7,
          "r": 2,
          "c": 4
        },
        {
          "num": 8,
          "r": 0,
          "c": 4
        },
        {
          "num": 9,
          "r": 0,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,3>5,4>5,5>4,5>4,4>3,4>3,3>3,2>3,1>4,1>4,2>5,2>5,1>5,0>4,0>3,0>2,0>2,1>1,1>0,1>0,2>1,2>2,2>2,3>2,4>2,5>1,5>0,5>0,4>0,3",
      "acceptedAnswers": [
        "5,3>5,4>5,5>4,5>4,4>3,4>3,3>3,2>3,1>4,1>4,2>5,2>5,1>5,0>4,0>3,0>2,0>2,1>1,1>0,1>0,2>1,2>2,2>2,3>2,4>2,5>1,5>0,5>0,4>0,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0469",
    "title": "ZIP (6×6) // LABYRINTH #0469",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0469",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 3,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 0,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 4
        },
        {
          "num": 7,
          "r": 4,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 5,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>2,0>2,1>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1",
      "acceptedAnswers": [
        "3,0>2,0>2,1>2,2>3,2>4,2>4,3>4,4>3,4>3,3>2,3>1,3>1,2>1,1>1,0>0,0>0,1>0,2>0,3>0,4>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0471",
    "title": "ZIP (6×6) // LABYRINTH #0471",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0471",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 0
        },
        {
          "num": 2,
          "r": 1,
          "c": 0
        },
        {
          "num": 3,
          "r": 1,
          "c": 2
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 3,
          "c": 4
        },
        {
          "num": 6,
          "r": 5,
          "c": 4
        },
        {
          "num": 7,
          "r": 3,
          "c": 2
        },
        {
          "num": 8,
          "r": 5,
          "c": 0
        },
        {
          "num": 9,
          "r": 4,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 5,
          "c": 2
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,0>3,1>2,1>2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>1,5>2,5>3,5>3,4>4,4>4,5>5,5>5,4>5,3>4,3>3,3>3,2>4,2>4,1>5,1>5,0>4,0",
      "acceptedAnswers": [
        "3,0>3,1>2,1>2,0>1,0>0,0>0,1>1,1>1,2>1,3>0,3>0,4>1,4>1,5>2,5>3,5>3,4>4,4>4,5>5,5>5,4>5,3>4,3>3,3>3,2>4,2>4,1>5,1>5,0>4,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0473",
    "title": "ZIP (6×6) // LABYRINTH #0473",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0473",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 4
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 2,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 2
        },
        {
          "num": 6,
          "r": 4,
          "c": 5
        },
        {
          "num": 7,
          "r": 5,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 1
        },
        {
          "num": 9,
          "r": 4,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>2,1>2,0>3,0>3,1>3,2>3,3>4,3>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>4,2",
      "acceptedAnswers": [
        "3,4>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>0,2>0,1>1,1>2,1>2,0>3,0>3,1>3,2>3,3>4,3>4,4>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>4,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0475",
    "title": "ZIP (6×6) // LABYRINTH #0475",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0475",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 1
        },
        {
          "num": 2,
          "r": 3,
          "c": 1
        },
        {
          "num": 3,
          "r": 4,
          "c": 4
        },
        {
          "num": 4,
          "r": 2,
          "c": 4
        },
        {
          "num": 5,
          "r": 0,
          "c": 4
        },
        {
          "num": 6,
          "r": 3,
          "c": 3
        },
        {
          "num": 7,
          "r": 0,
          "c": 2
        },
        {
          "num": 8,
          "r": 2,
          "c": 0
        },
        {
          "num": 9,
          "r": 2,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,1>5,0>4,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>1,3>2,3>3,3>3,2>2,2>1,2>0,2>0,1>0,0>1,0>2,0>2,1",
      "acceptedAnswers": [
        "5,1>5,0>4,0>3,0>3,1>4,1>4,2>4,3>4,4>3,4>3,5>2,5>2,4>1,4>1,5>0,5>0,4>0,3>1,3>2,3>3,3>3,2>2,2>1,2>0,2>0,1>0,0>1,0>2,0>2,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,2) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0477",
    "title": "ZIP (6×6) // LABYRINTH #0477",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0477",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 0
        },
        {
          "num": 2,
          "r": 0,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 3
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 4
        },
        {
          "num": 6,
          "r": 5,
          "c": 5
        },
        {
          "num": 7,
          "r": 4,
          "c": 2
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 3,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0>1,0>1,1>0,1>0,2>1,2>2,2>3,2>3,3>2,3>1,3>0,3>0,4>0,5>1,5>1,4>2,4>3,4>3,5>4,5>5,5>5,4>4,4>4,3>4,2>5,2>5,1>4,1>4,0>3,0",
      "acceptedAnswers": [
        "0,0>1,0>1,1>0,1>0,2>1,2>2,2>3,2>3,3>2,3>1,3>0,3>0,4>0,5>1,5>1,4>2,4>3,4>3,5>4,5>5,5>5,4>4,4>4,3>4,2>5,2>5,1>4,1>4,0>3,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (3,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0479",
    "title": "ZIP (6×6) // LABYRINTH #0479",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-24 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0479",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 5
        },
        {
          "num": 2,
          "r": 3,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 4
        },
        {
          "num": 5,
          "r": 1,
          "c": 2
        },
        {
          "num": 6,
          "r": 3,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 1
        },
        {
          "num": 8,
          "r": 5,
          "c": 4
        },
        {
          "num": 9,
          "r": 5,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,5>4,4>4,3>3,3>3,2>2,2>2,3>2,4>3,4>3,5>2,5>1,5>1,4>0,4>0,3>1,3>1,2>1,1>2,1>3,1>3,0>4,0>5,0>5,1>4,1>4,2>5,2>5,3>5,4>5,5",
      "acceptedAnswers": [
        "4,5>4,4>4,3>3,3>3,2>2,2>2,3>2,4>3,4>3,5>2,5>1,5>1,4>0,4>0,3>1,3>1,2>1,1>2,1>3,1>3,0>4,0>5,0>5,1>4,1>4,2>5,2>5,3>5,4>5,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0481",
    "title": "ZIP (6×6) // LABYRINTH #0481",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0481",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 4
        },
        {
          "num": 2,
          "r": 2,
          "c": 5
        },
        {
          "num": 3,
          "r": 0,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 0
        },
        {
          "num": 5,
          "r": 4,
          "c": 1
        },
        {
          "num": 6,
          "r": 1,
          "c": 2
        },
        {
          "num": 7,
          "r": 3,
          "c": 4
        },
        {
          "num": 8,
          "r": 5,
          "c": 2
        },
        {
          "num": 9,
          "r": 5,
          "c": 1
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>3,1>3,2>2,2>1,2>1,3>1,4>2,4>3,4>4,4>4,3>5,3>5,2>5,1",
      "acceptedAnswers": [
        "5,4>5,5>4,5>3,5>2,5>1,5>0,5>0,4>0,3>0,2>0,1>1,1>1,0>2,0>3,0>4,0>4,1>3,1>3,2>2,2>1,2>1,3>1,4>2,4>3,4>4,4>4,3>5,3>5,2>5,1",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0483",
    "title": "ZIP (6×6) // LABYRINTH #0483",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0483",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 5
        },
        {
          "num": 2,
          "r": 3,
          "c": 4
        },
        {
          "num": 3,
          "r": 5,
          "c": 4
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 1
        },
        {
          "num": 7,
          "r": 3,
          "c": 2
        },
        {
          "num": 8,
          "r": 0,
          "c": 3
        },
        {
          "num": 9,
          "r": 0,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 5,
          "c": 2
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,5>1,5>1,4>2,4>3,4>4,4>4,5>5,5>5,4>5,3>4,3>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1>3,2>2,2>1,2>1,3>0,3>0,2",
      "acceptedAnswers": [
        "0,5>1,5>1,4>2,4>3,4>4,4>4,5>5,5>5,4>5,3>4,3>4,2>4,1>5,1>5,0>4,0>3,0>2,0>1,0>0,0>0,1>1,1>2,1>3,1>3,2>2,2>1,2>1,3>0,3>0,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0485",
    "title": "ZIP (6×6) // LABYRINTH #0485",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0485",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 5
        },
        {
          "num": 2,
          "r": 4,
          "c": 2
        },
        {
          "num": 3,
          "r": 2,
          "c": 4
        },
        {
          "num": 4,
          "r": 0,
          "c": 4
        },
        {
          "num": 5,
          "r": 2,
          "c": 2
        },
        {
          "num": 6,
          "r": 0,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 0
        },
        {
          "num": 8,
          "r": 3,
          "c": 1
        },
        {
          "num": 9,
          "r": 3,
          "c": 2
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,5>5,4>5,3>5,2>4,2>4,3>3,3>3,4>2,4>2,5>1,5>1,4>0,4>0,3>0,2>1,2>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>3,2",
      "acceptedAnswers": [
        "5,5>5,4>5,3>5,2>4,2>4,3>3,3>3,4>2,4>2,5>1,5>1,4>0,4>0,3>0,2>1,2>2,2>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0>5,1>4,1>3,1>3,2",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0487",
    "title": "ZIP (6×6) // LABYRINTH #0487",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0487",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 3,
          "c": 4
        },
        {
          "num": 2,
          "r": 3,
          "c": 2
        },
        {
          "num": 3,
          "r": 2,
          "c": 1
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 2,
          "c": 5
        },
        {
          "num": 6,
          "r": 5,
          "c": 4
        },
        {
          "num": 7,
          "r": 5,
          "c": 0
        },
        {
          "num": 8,
          "r": 4,
          "c": 3
        },
        {
          "num": 9,
          "r": 4,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "3,4>2,4>2,3>2,2>3,2>3,1>3,0>2,0>2,1>1,1>0,1>0,2>1,2>1,3>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>4,2>4,3>4,4",
      "acceptedAnswers": [
        "3,4>2,4>2,3>2,2>3,2>3,1>3,0>2,0>2,1>1,1>0,1>0,2>1,2>1,3>1,4>1,5>2,5>3,5>4,5>5,5>5,4>5,3>5,2>5,1>5,0>4,0>4,1>4,2>4,3>4,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0489",
    "title": "ZIP (6×6) // LABYRINTH #0489",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0489",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 4
        },
        {
          "num": 3,
          "r": 3,
          "c": 1
        },
        {
          "num": 4,
          "r": 2,
          "c": 0
        },
        {
          "num": 5,
          "r": 0,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 3
        },
        {
          "num": 7,
          "r": 1,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 5
        },
        {
          "num": 9,
          "r": 5,
          "c": 4
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,3>4,3>3,3>3,4>2,4>2,3>2,2>3,2>3,1>4,1>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4",
      "acceptedAnswers": [
        "5,3>4,3>3,3>3,4>2,4>2,3>2,2>3,2>3,1>4,1>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>0,3>1,3>1,4>0,4>0,5>1,5>2,5>3,5>4,5>5,5>5,4",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,3) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0491",
    "title": "ZIP (6×6) // LABYRINTH #0491",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0491",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 5
        },
        {
          "num": 2,
          "r": 4,
          "c": 3
        },
        {
          "num": 3,
          "r": 2,
          "c": 3
        },
        {
          "num": 4,
          "r": 4,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 0
        },
        {
          "num": 6,
          "r": 1,
          "c": 0
        },
        {
          "num": 7,
          "r": 1,
          "c": 2
        },
        {
          "num": 8,
          "r": 1,
          "c": 4
        },
        {
          "num": 9,
          "r": 1,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,5>5,5>5,4>4,4>4,3>3,3>3,4>2,4>2,3>2,2>3,2>3,1>4,1>5,1>5,0>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>1,5",
      "acceptedAnswers": [
        "4,5>5,5>5,4>4,4>4,3>3,3>3,4>2,4>2,3>2,2>3,2>3,1>4,1>5,1>5,0>4,0>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>1,3>0,3>0,4>1,4>1,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0493",
    "title": "ZIP (6×6) // LABYRINTH #0493",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0493",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 1,
          "c": 3
        },
        {
          "num": 2,
          "r": 2,
          "c": 2
        },
        {
          "num": 3,
          "r": 0,
          "c": 4
        },
        {
          "num": 4,
          "r": 3,
          "c": 5
        },
        {
          "num": 5,
          "r": 5,
          "c": 3
        },
        {
          "num": 6,
          "r": 3,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 0
        },
        {
          "num": 8,
          "r": 4,
          "c": 0
        },
        {
          "num": 9,
          "r": 5,
          "c": 0
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "1,3>2,3>3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,5>2,5>3,5>3,4>4,4>5,4>5,3>5,2>5,1>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0",
      "acceptedAnswers": [
        "1,3>2,3>3,3>3,2>2,2>1,2>0,2>0,3>0,4>1,4>1,5>2,5>3,5>3,4>4,4>5,4>5,3>5,2>5,1>4,1>3,1>2,1>1,1>0,1>0,0>1,0>2,0>3,0>4,0>5,0",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,6) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0495",
    "title": "ZIP (6×6) // LABYRINTH #0495",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0495",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 5,
          "c": 0
        },
        {
          "num": 2,
          "r": 5,
          "c": 2
        },
        {
          "num": 3,
          "r": 3,
          "c": 4
        },
        {
          "num": 4,
          "r": 1,
          "c": 2
        },
        {
          "num": 5,
          "r": 1,
          "c": 0
        },
        {
          "num": 6,
          "r": 0,
          "c": 3
        },
        {
          "num": 7,
          "r": 2,
          "c": 5
        },
        {
          "num": 8,
          "r": 5,
          "c": 4
        },
        {
          "num": 9,
          "r": 5,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 5,
          "c": 3
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "5,0>4,0>4,1>5,1>5,2>4,2>4,3>3,3>3,4>2,4>2,3>2,2>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,4>1,5>2,5>3,5>4,5>4,4>5,4>5,5",
      "acceptedAnswers": [
        "5,0>4,0>4,1>5,1>5,2>4,2>4,3>3,3>3,4>2,4>2,3>2,2>1,2>1,1>2,1>2,0>1,0>0,0>0,1>0,2>0,3>1,3>1,4>1,5>2,5>3,5>4,5>4,4>5,4>5,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0497",
    "title": "ZIP (6×6) // LABYRINTH #0497",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0497",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 0,
          "c": 5
        },
        {
          "num": 2,
          "r": 2,
          "c": 3
        },
        {
          "num": 3,
          "r": 4,
          "c": 5
        },
        {
          "num": 4,
          "r": 4,
          "c": 3
        },
        {
          "num": 5,
          "r": 4,
          "c": 1
        },
        {
          "num": 6,
          "r": 2,
          "c": 1
        },
        {
          "num": 7,
          "r": 0,
          "c": 1
        },
        {
          "num": 8,
          "r": 3,
          "c": 2
        },
        {
          "num": 9,
          "r": 3,
          "c": 3
        }
      ],
      "blockedCells": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 5,
          "c": 0
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 3,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,5>0,4>0,3>1,3>2,3>2,4>3,4>3,5>4,5>5,5>5,4>4,4>4,3>5,3>5,2>5,1>4,1>3,1>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>2,2>3,2>3,3",
      "acceptedAnswers": [
        "0,5>0,4>0,3>1,3>2,3>2,4>3,4>3,5>4,5>5,5>5,4>4,4>4,3>5,3>5,2>5,1>4,1>3,1>3,0>2,0>2,1>1,1>1,0>0,0>0,1>0,2>1,2>2,2>3,2>3,3",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (2,5) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-ZIP-0499",
    "title": "ZIP (6×6) // LABYRINTH #0499",
    "category": "LOGIC",
    "description": "Connect waypoints 1 to 9 sequentially while visiting all 30 playable cells exactly once without crossing blocked firewalls.",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 170,
    "gameType": "zip",
    "gameConfig": {
      "sector": "SECTOR-25 // NEURAL_TRACER",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "CIRCUIT",
      "maxHints": 2,
      "clearanceCode": "NX-ZIP-0499",
      "rows": 6,
      "cols": 6,
      "waypoints": [
        {
          "num": 1,
          "r": 4,
          "c": 4
        },
        {
          "num": 2,
          "r": 1,
          "c": 5
        },
        {
          "num": 3,
          "r": 1,
          "c": 3
        },
        {
          "num": 4,
          "r": 1,
          "c": 1
        },
        {
          "num": 5,
          "r": 3,
          "c": 3
        },
        {
          "num": 6,
          "r": 4,
          "c": 0
        },
        {
          "num": 7,
          "r": 4,
          "c": 2
        },
        {
          "num": 8,
          "r": 5,
          "c": 5
        },
        {
          "num": 9,
          "r": 4,
          "c": 5
        }
      ],
      "blockedCells": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 5
        }
      ],
      "playableCellCount": 30,
      "solutionPath": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 2,
          "c": 5
        },
        {
          "r": 1,
          "c": 5
        },
        {
          "r": 0,
          "c": 5
        },
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 5,
          "c": 0
        },
        {
          "r": 5,
          "c": 1
        },
        {
          "r": 5,
          "c": 2
        },
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 5,
          "c": 3
        },
        {
          "r": 5,
          "c": 4
        },
        {
          "r": 5,
          "c": 5
        },
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "4,4>3,4>2,4>2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>1,2>1,1>2,1>2,2>2,3>3,3>3,2>3,1>4,1>4,0>5,0>5,1>5,2>4,2>4,3>5,3>5,4>5,5>4,5",
      "acceptedAnswers": [
        "4,4>3,4>2,4>2,5>1,5>0,5>0,4>1,4>1,3>0,3>0,2>1,2>1,1>2,1>2,2>2,3>3,3>3,2>3,1>4,1>4,0>5,0>5,1>5,2>4,2>4,3>5,3>5,4>5,5>4,5",
        "ZIP:6X6:COMPLETE"
      ],
      "hints": [
        "HINT 01 // Examine cells with only two open orthogonal neighbors; the path is strictly forced through them without alternative turns.",
        "HINT 02 // Use the obstacle at (1,1) as a boundary guide; loop around it to avoid isolating corner cells."
      ]
    },
    "enabled": true,
    "available": true
  }
];
