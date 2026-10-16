/**
 * Queens (N-Queens & Region Star Battle) Master Catalog (150 Challenges)
 * Generated with verified unique solutions & authentic constraint elimination mechanics.
 */
export const queensChallenges = [
  {
    "challengeId": "CHG-QUN-0001",
    "title": "QUEENS (5×5) // STAR BATTLE #0001",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0001",
      "size": 5,
      "regions": [
        [
          3,
          1,
          1,
          0,
          0
        ],
        [
          3,
          1,
          1,
          0,
          0
        ],
        [
          3,
          3,
          4,
          2,
          0
        ],
        [
          3,
          3,
          4,
          0,
          0
        ],
        [
          3,
          4,
          4,
          4,
          0
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0002",
    "title": "QUEENS (5×5) // STAR BATTLE #0002",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0002",
      "size": 5,
      "regions": [
        [
          2,
          0,
          0,
          0,
          4
        ],
        [
          2,
          2,
          0,
          1,
          4
        ],
        [
          2,
          2,
          2,
          4,
          4
        ],
        [
          2,
          2,
          3,
          4,
          4
        ],
        [
          2,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 4
        },
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,2;4,4",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,2;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0003",
    "title": "QUEENS (5×5) // STAR BATTLE #0003",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0003",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          2,
          0
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          4,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0004",
    "title": "QUEENS (5×5) // STAR BATTLE #0004",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0004",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          3,
          3,
          2,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0005",
    "title": "QUEENS (5×5) // STAR BATTLE #0005",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0005",
      "size": 5,
      "regions": [
        [
          1,
          1,
          2,
          0,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2
        ],
        [
          4,
          4,
          2,
          2,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,4;4,1",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,4;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0006",
    "title": "QUEENS (5×5) // STAR BATTLE #0006",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0006",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          4,
          2,
          2
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0007",
    "title": "QUEENS (5×5) // STAR BATTLE #0007",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0007",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          2,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,4;4,1",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,4;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0008",
    "title": "QUEENS (5×5) // STAR BATTLE #0008",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0008",
      "size": 5,
      "regions": [
        [
          3,
          0,
          1,
          1,
          1
        ],
        [
          3,
          3,
          1,
          1,
          1
        ],
        [
          2,
          3,
          3,
          1,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,2;4,4",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,2;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0009",
    "title": "QUEENS (5×5) // STAR BATTLE #0009",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0009",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          3
        ],
        [
          4,
          4,
          2,
          2,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,4;4,1",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,4;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0010",
    "title": "QUEENS (5×5) // STAR BATTLE #0010",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0010",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          0,
          0,
          0,
          1
        ],
        [
          3,
          3,
          2,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0011",
    "title": "QUEENS (5×5) // STAR BATTLE #0011",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0011",
      "size": 5,
      "regions": [
        [
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          3,
          4,
          4,
          4,
          1
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0012",
    "title": "QUEENS (5×5) // STAR BATTLE #0012",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0012",
      "size": 5,
      "regions": [
        [
          0,
          0,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0013",
    "title": "QUEENS (5×5) // STAR BATTLE #0013",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0013",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          1,
          0,
          0,
          0
        ],
        [
          3,
          2,
          2,
          2,
          0
        ],
        [
          3,
          4,
          4,
          0,
          0
        ],
        [
          4,
          4,
          4,
          4,
          0
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0014",
    "title": "QUEENS (5×5) // STAR BATTLE #0014",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0014",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          4,
          1
        ],
        [
          3,
          2,
          2,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0015",
    "title": "QUEENS (5×5) // STAR BATTLE #0015",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0015",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          1,
          3,
          2,
          2
        ],
        [
          4,
          1,
          3,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,4;3,2;4,0",
      "acceptedAnswers": [
        "0,3;1,1;2,4;3,2;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0016",
    "title": "QUEENS (5×5) // STAR BATTLE #0016",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0016",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0017",
    "title": "QUEENS (5×5) // STAR BATTLE #0017",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0017",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          1,
          4,
          2,
          2
        ],
        [
          3,
          4,
          4,
          4,
          2
        ],
        [
          4,
          4,
          4,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0018",
    "title": "QUEENS (5×5) // STAR BATTLE #0018",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0018",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          4,
          4,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0019",
    "title": "QUEENS (5×5) // STAR BATTLE #0019",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-01 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0019",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0020",
    "title": "QUEENS (5×5) // STAR BATTLE #0020",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0020",
      "size": 5,
      "regions": [
        [
          4,
          4,
          0,
          0,
          0
        ],
        [
          4,
          1,
          0,
          0,
          0
        ],
        [
          4,
          4,
          4,
          0,
          2
        ],
        [
          4,
          4,
          3,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,4;3,2;4,0",
      "acceptedAnswers": [
        "0,3;1,1;2,4;3,2;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0021",
    "title": "QUEENS (5×5) // STAR BATTLE #0021",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0021",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          2
        ],
        [
          0,
          2,
          2,
          1,
          2
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0022",
    "title": "QUEENS (5×5) // STAR BATTLE #0022",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0022",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          2,
          1,
          3,
          3
        ],
        [
          0,
          2,
          3,
          3,
          3
        ],
        [
          0,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0023",
    "title": "QUEENS (5×5) // STAR BATTLE #0023",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0023",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          4,
          4,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0024",
    "title": "QUEENS (5×5) // STAR BATTLE #0024",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0024",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          4,
          1,
          2,
          2,
          2
        ],
        [
          4,
          4,
          3,
          2,
          2
        ],
        [
          4,
          4,
          2,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,4;3,2;4,0",
      "acceptedAnswers": [
        "0,3;1,1;2,4;3,2;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0025",
    "title": "QUEENS (5×5) // STAR BATTLE #0025",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0025",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          4,
          1,
          0,
          0,
          2
        ],
        [
          4,
          3,
          3,
          0,
          0
        ],
        [
          4,
          4,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,4;3,2;4,0",
      "acceptedAnswers": [
        "0,3;1,1;2,4;3,2;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0026",
    "title": "QUEENS (5×5) // STAR BATTLE #0026",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0026",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          3,
          1,
          4,
          2,
          0
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0027",
    "title": "QUEENS (5×5) // STAR BATTLE #0027",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0027",
      "size": 5,
      "regions": [
        [
          0,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0028",
    "title": "QUEENS (5×5) // STAR BATTLE #0028",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0028",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          4,
          4,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,1;3,4;4,2",
      "acceptedAnswers": [
        "0,0;1,3;2,1;3,4;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0029",
    "title": "QUEENS (5×5) // STAR BATTLE #0029",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0029",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          4,
          2,
          0,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,4;4,1",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,4;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0030",
    "title": "QUEENS (5×5) // STAR BATTLE #0030",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0030",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          3,
          4,
          4
        ],
        [
          2,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,2;4,4",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,2;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0031",
    "title": "QUEENS (5×5) // STAR BATTLE #0031",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0031",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          3,
          1,
          1
        ],
        [
          2,
          2,
          3,
          1,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,2;4,4",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,2;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0032",
    "title": "QUEENS (5×5) // STAR BATTLE #0032",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0032",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          4,
          4,
          2,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0033",
    "title": "QUEENS (5×5) // STAR BATTLE #0033",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0033",
      "size": 5,
      "regions": [
        [
          3,
          0,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0034",
    "title": "QUEENS (5×5) // STAR BATTLE #0034",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0034",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          0,
          0,
          0,
          1
        ],
        [
          3,
          3,
          2,
          2,
          3
        ],
        [
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          3,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0035",
    "title": "QUEENS (5×5) // STAR BATTLE #0035",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0035",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          1,
          4,
          4,
          2
        ],
        [
          3,
          4,
          4,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0036",
    "title": "QUEENS (5×5) // STAR BATTLE #0036",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0036",
      "size": 5,
      "regions": [
        [
          3,
          0,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0037",
    "title": "QUEENS (5×5) // STAR BATTLE #0037",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0037",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          1,
          0
        ],
        [
          2,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          3,
          3,
          3
        ],
        [
          0,
          0,
          3,
          3,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,2;4,4",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,2;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0038",
    "title": "QUEENS (5×5) // STAR BATTLE #0038",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0038",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          4,
          4,
          2,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0039",
    "title": "QUEENS (5×5) // STAR BATTLE #0039",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-02 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0039",
      "size": 5,
      "regions": [
        [
          1,
          1,
          2,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          3
        ],
        [
          1,
          4,
          2,
          2,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,4;4,1",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,4;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0040",
    "title": "QUEENS (5×5) // STAR BATTLE #0040",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0040",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          3
        ],
        [
          4,
          4,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,4;4,1",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,4;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0041",
    "title": "QUEENS (5×5) // STAR BATTLE #0041",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0041",
      "size": 5,
      "regions": [
        [
          1,
          1,
          4,
          0,
          0
        ],
        [
          1,
          1,
          4,
          4,
          0
        ],
        [
          4,
          4,
          4,
          2,
          2
        ],
        [
          3,
          4,
          4,
          4,
          2
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0042",
    "title": "QUEENS (5×5) // STAR BATTLE #0042",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0042",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          2,
          0
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          2,
          2
        ],
        [
          3,
          4,
          4,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0043",
    "title": "QUEENS (5×5) // STAR BATTLE #0043",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0043",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          2
        ],
        [
          0,
          1,
          1,
          1,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0044",
    "title": "QUEENS (5×5) // STAR BATTLE #0044",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0044",
      "size": 5,
      "regions": [
        [
          0,
          1,
          1,
          1,
          2
        ],
        [
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          1,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0045",
    "title": "QUEENS (5×5) // STAR BATTLE #0045",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0045",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0046",
    "title": "QUEENS (5×5) // STAR BATTLE #0046",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0046",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          1,
          2,
          2,
          0
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0047",
    "title": "QUEENS (5×5) // STAR BATTLE #0047",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0047",
      "size": 5,
      "regions": [
        [
          2,
          1,
          1,
          1,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          4,
          1,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0048",
    "title": "QUEENS (5×5) // STAR BATTLE #0048",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0048",
      "size": 5,
      "regions": [
        [
          2,
          2,
          0,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          2,
          2,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0049",
    "title": "QUEENS (5×5) // STAR BATTLE #0049",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0049",
      "size": 5,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0
        ],
        [
          2,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          3,
          3
        ],
        [
          4,
          2,
          0,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0050",
    "title": "QUEENS (5×5) // STAR BATTLE #0050",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0050",
      "size": 5,
      "regions": [
        [
          0,
          1,
          1,
          2,
          2
        ],
        [
          3,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0051",
    "title": "QUEENS (5×5) // STAR BATTLE #0051",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0051",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          1,
          2,
          2
        ],
        [
          3,
          3,
          1,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0052",
    "title": "QUEENS (5×5) // STAR BATTLE #0052",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0052",
      "size": 5,
      "regions": [
        [
          3,
          0,
          0,
          0,
          0
        ],
        [
          3,
          1,
          0,
          0,
          0
        ],
        [
          3,
          3,
          4,
          2,
          0
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0053",
    "title": "QUEENS (5×5) // STAR BATTLE #0053",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0053",
      "size": 5,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1,
          2
        ],
        [
          1,
          1,
          4,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0054",
    "title": "QUEENS (5×5) // STAR BATTLE #0054",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0054",
      "size": 5,
      "regions": [
        [
          0,
          0,
          2,
          2,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0055",
    "title": "QUEENS (5×5) // STAR BATTLE #0055",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0055",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          3,
          1,
          2,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0056",
    "title": "QUEENS (5×5) // STAR BATTLE #0056",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0056",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          4,
          1
        ],
        [
          3,
          0,
          2,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0057",
    "title": "QUEENS (5×5) // STAR BATTLE #0057",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0057",
      "size": 5,
      "regions": [
        [
          2,
          2,
          0,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          2,
          2,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0058",
    "title": "QUEENS (5×5) // STAR BATTLE #0058",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0058",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          3,
          3,
          2,
          0,
          1
        ],
        [
          3,
          3,
          3,
          4,
          1
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0059",
    "title": "QUEENS (5×5) // STAR BATTLE #0059",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-03 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0059",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          4,
          4
        ],
        [
          3,
          2,
          4,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0060",
    "title": "QUEENS (5×5) // STAR BATTLE #0060",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0060",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0061",
    "title": "QUEENS (5×5) // STAR BATTLE #0061",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0061",
      "size": 5,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          0
        ],
        [
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0062",
    "title": "QUEENS (5×5) // STAR BATTLE #0062",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0062",
      "size": 5,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          1,
          3,
          0
        ],
        [
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0063",
    "title": "QUEENS (5×5) // STAR BATTLE #0063",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0063",
      "size": 5,
      "regions": [
        [
          3,
          2,
          2,
          0,
          0
        ],
        [
          3,
          1,
          2,
          2,
          0
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0064",
    "title": "QUEENS (5×5) // STAR BATTLE #0064",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0064",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          2,
          1
        ],
        [
          0,
          0,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0065",
    "title": "QUEENS (5×5) // STAR BATTLE #0065",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0065",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          2,
          2
        ],
        [
          0,
          0,
          2,
          2,
          1
        ],
        [
          0,
          2,
          2,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0066",
    "title": "QUEENS (5×5) // STAR BATTLE #0066",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0066",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          2
        ],
        [
          1,
          3,
          0,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0067",
    "title": "QUEENS (5×5) // STAR BATTLE #0067",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0067",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          0
        ],
        [
          1,
          3,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0068",
    "title": "QUEENS (5×5) // STAR BATTLE #0068",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0068",
      "size": 5,
      "regions": [
        [
          0,
          0,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0069",
    "title": "QUEENS (5×5) // STAR BATTLE #0069",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0069",
      "size": 5,
      "regions": [
        [
          3,
          2,
          2,
          2,
          0
        ],
        [
          3,
          1,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0070",
    "title": "QUEENS (5×5) // STAR BATTLE #0070",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0070",
      "size": 5,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          3,
          0
        ],
        [
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          4,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0071",
    "title": "QUEENS (5×5) // STAR BATTLE #0071",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0071",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          4,
          4,
          4,
          3,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0072",
    "title": "QUEENS (5×5) // STAR BATTLE #0072",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0072",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          0,
          2,
          2,
          2
        ],
        [
          0,
          3,
          3,
          2,
          2
        ],
        [
          0,
          3,
          3,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0073",
    "title": "QUEENS (5×5) // STAR BATTLE #0073",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0073",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          4,
          2
        ],
        [
          0,
          0,
          1,
          4,
          2
        ],
        [
          0,
          0,
          4,
          4,
          2
        ],
        [
          0,
          3,
          4,
          4,
          4
        ],
        [
          0,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0074",
    "title": "QUEENS (5×5) // STAR BATTLE #0074",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0074",
      "size": 5,
      "regions": [
        [
          1,
          1,
          2,
          2,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2
        ],
        [
          3,
          4,
          4,
          2,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0075",
    "title": "QUEENS (5×5) // STAR BATTLE #0075",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0075",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          3,
          2,
          2,
          2
        ],
        [
          4,
          3,
          4,
          4,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0076",
    "title": "QUEENS (5×5) // STAR BATTLE #0076",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0076",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          2
        ],
        [
          0,
          0,
          1,
          1,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          3,
          3,
          4,
          2
        ],
        [
          0,
          3,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0077",
    "title": "QUEENS (5×5) // STAR BATTLE #0077",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0077",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0078",
    "title": "QUEENS (5×5) // STAR BATTLE #0078",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0078",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          2,
          2
        ],
        [
          0,
          3,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0079",
    "title": "QUEENS (5×5) // STAR BATTLE #0079",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-04 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0079",
      "size": 5,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0
        ],
        [
          2,
          2,
          1,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0080",
    "title": "QUEENS (5×5) // STAR BATTLE #0080",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0080",
      "size": 5,
      "regions": [
        [
          2,
          2,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1
        ],
        [
          4,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0081",
    "title": "QUEENS (5×5) // STAR BATTLE #0081",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0081",
      "size": 5,
      "regions": [
        [
          1,
          2,
          2,
          2,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          4,
          4,
          2,
          2
        ],
        [
          4,
          4,
          4,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0082",
    "title": "QUEENS (5×5) // STAR BATTLE #0082",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0082",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          2,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          3,
          4,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0083",
    "title": "QUEENS (5×5) // STAR BATTLE #0083",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0083",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          4,
          1,
          0,
          0
        ],
        [
          4,
          4,
          4,
          3,
          0
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0084",
    "title": "QUEENS (5×5) // STAR BATTLE #0084",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0084",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0
        ],
        [
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          2,
          4,
          2,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0085",
    "title": "QUEENS (5×5) // STAR BATTLE #0085",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0085",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          3,
          0,
          2,
          1,
          1
        ],
        [
          3,
          3,
          2,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0086",
    "title": "QUEENS (5×5) // STAR BATTLE #0086",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0086",
      "size": 5,
      "regions": [
        [
          1,
          1,
          2,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          4,
          2,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 2,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0087",
    "title": "QUEENS (5×5) // STAR BATTLE #0087",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0087",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          2,
          2,
          1
        ],
        [
          0,
          2,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0088",
    "title": "QUEENS (5×5) // STAR BATTLE #0088",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0088",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          2,
          2,
          1
        ],
        [
          0,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0089",
    "title": "QUEENS (5×5) // STAR BATTLE #0089",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0089",
      "size": 5,
      "regions": [
        [
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0090",
    "title": "QUEENS (5×5) // STAR BATTLE #0090",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0090",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          0,
          2,
          0,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          2,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0091",
    "title": "QUEENS (5×5) // STAR BATTLE #0091",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0091",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          1,
          1
        ],
        [
          3,
          3,
          3,
          4,
          1
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0092",
    "title": "QUEENS (5×5) // STAR BATTLE #0092",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0092",
      "size": 5,
      "regions": [
        [
          4,
          0,
          0,
          0,
          0
        ],
        [
          4,
          4,
          0,
          0,
          1
        ],
        [
          4,
          2,
          4,
          4,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0093",
    "title": "QUEENS (5×5) // STAR BATTLE #0093",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0093",
      "size": 5,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          3,
          0
        ],
        [
          2,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0094",
    "title": "QUEENS (5×5) // STAR BATTLE #0094",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0094",
      "size": 5,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          2,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0095",
    "title": "QUEENS (5×5) // STAR BATTLE #0095",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0095",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0096",
    "title": "QUEENS (5×5) // STAR BATTLE #0096",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0096",
      "size": 5,
      "regions": [
        [
          1,
          1,
          2,
          2,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0097",
    "title": "QUEENS (5×5) // STAR BATTLE #0097",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0097",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          2,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2
        ],
        [
          0,
          0,
          4,
          2,
          2
        ],
        [
          0,
          3,
          4,
          4,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0098",
    "title": "QUEENS (5×5) // STAR BATTLE #0098",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0098",
      "size": 5,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1,
          2
        ],
        [
          1,
          3,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0099",
    "title": "QUEENS (5×5) // STAR BATTLE #0099",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-05 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0099",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0100",
    "title": "QUEENS (5×5) // STAR BATTLE #0100",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0100",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          2
        ],
        [
          0,
          3,
          4,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0101",
    "title": "QUEENS (5×5) // STAR BATTLE #0101",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0101",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0
        ],
        [
          2,
          4,
          1,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,3;4,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,3;4,1",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0102",
    "title": "QUEENS (5×5) // STAR BATTLE #0102",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0102",
      "size": 5,
      "regions": [
        [
          2,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0103",
    "title": "QUEENS (5×5) // STAR BATTLE #0103",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0103",
      "size": 5,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0
        ],
        [
          3,
          1,
          1,
          2,
          0
        ],
        [
          3,
          3,
          2,
          2,
          0
        ],
        [
          3,
          3,
          4,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0104",
    "title": "QUEENS (5×5) // STAR BATTLE #0104",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0104",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          1,
          1,
          1,
          1
        ],
        [
          4,
          4,
          4,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0105",
    "title": "QUEENS (5×5) // STAR BATTLE #0105",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0105",
      "size": 5,
      "regions": [
        [
          0,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0106",
    "title": "QUEENS (5×5) // STAR BATTLE #0106",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0106",
      "size": 5,
      "regions": [
        [
          2,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          2,
          2,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0107",
    "title": "QUEENS (5×5) // STAR BATTLE #0107",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0107",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          1,
          1,
          1,
          2
        ],
        [
          0,
          3,
          1,
          4,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0108",
    "title": "QUEENS (5×5) // STAR BATTLE #0108",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0108",
      "size": 5,
      "regions": [
        [
          0,
          1,
          1,
          2,
          2
        ],
        [
          2,
          2,
          1,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          2
        ],
        [
          2,
          3,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          4,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,1;4,3",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,1;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0109",
    "title": "QUEENS (5×5) // STAR BATTLE #0109",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0109",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0
        ],
        [
          3,
          3,
          0,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,3;3,0;4,2",
      "acceptedAnswers": [
        "0,4;1,1;2,3;3,0;4,2",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0110",
    "title": "QUEENS (5×5) // STAR BATTLE #0110",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0110",
      "size": 5,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1
        ],
        [
          3,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          4,
          1
        ],
        [
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0111",
    "title": "QUEENS (5×5) // STAR BATTLE #0111",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0111",
      "size": 5,
      "regions": [
        [
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,3;3,1;4,4",
      "acceptedAnswers": [
        "0,2;1,0;2,3;3,1;4,4",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0112",
    "title": "QUEENS (5×5) // STAR BATTLE #0112",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0112",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          2,
          2,
          1
        ],
        [
          3,
          2,
          2,
          2,
          4
        ],
        [
          3,
          3,
          2,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0113",
    "title": "QUEENS (5×5) // STAR BATTLE #0113",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0113",
      "size": 5,
      "regions": [
        [
          3,
          0,
          3,
          3,
          1
        ],
        [
          3,
          3,
          3,
          1,
          1
        ],
        [
          3,
          3,
          2,
          4,
          1
        ],
        [
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,3",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,3",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0114",
    "title": "QUEENS (5×5) // STAR BATTLE #0114",
    "category": "LOGIC",
    "description": "Place exactly 5 Queens on the 5×5 board so that no two Queens share a row, column, diagonal, or colored region (2 given).",
    "difficulty": "LOW",
    "risk": "SAFE",
    "cost": 60,
    "reward": 85,
    "penalty": 30,
    "timeLimit": 60,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0114",
      "size": 5,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,3;4,0",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,3;4,0",
        "QUEENS:5X5:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0115",
    "title": "QUEENS (6×6) // STAR BATTLE #0115",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0115",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          4
        ],
        [
          2,
          2,
          1,
          1,
          4,
          4
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0116",
    "title": "QUEENS (6×6) // STAR BATTLE #0116",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0116",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          0,
          0,
          0
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0117",
    "title": "QUEENS (6×6) // STAR BATTLE #0117",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0117",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          3,
          3
        ],
        [
          2,
          2,
          2,
          2,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0118",
    "title": "QUEENS (6×6) // STAR BATTLE #0118",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0118",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          5,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0119",
    "title": "QUEENS (6×6) // STAR BATTLE #0119",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-06 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0119",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0,
          3
        ],
        [
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          5,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0120",
    "title": "QUEENS (6×6) // STAR BATTLE #0120",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0120",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          3
        ],
        [
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          1,
          1,
          3,
          3,
          3
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          5,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0121",
    "title": "QUEENS (6×6) // STAR BATTLE #0121",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0121",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          4
        ],
        [
          1,
          1,
          5,
          2,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0122",
    "title": "QUEENS (6×6) // STAR BATTLE #0122",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0122",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          5,
          5,
          0,
          0,
          0
        ],
        [
          5,
          5,
          5,
          5,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0123",
    "title": "QUEENS (6×6) // STAR BATTLE #0123",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0123",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          2,
          5,
          5,
          1,
          1
        ],
        [
          4,
          5,
          5,
          5,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          1
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0124",
    "title": "QUEENS (6×6) // STAR BATTLE #0124",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0124",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2,
          0
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          5,
          5,
          5,
          4
        ],
        [
          3,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0125",
    "title": "QUEENS (6×6) // STAR BATTLE #0125",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0125",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          2
        ],
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          3,
          5,
          2,
          2,
          2
        ],
        [
          1,
          5,
          5,
          5,
          2,
          4
        ],
        [
          1,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0126",
    "title": "QUEENS (6×6) // STAR BATTLE #0126",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0126",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          0,
          0,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0127",
    "title": "QUEENS (6×6) // STAR BATTLE #0127",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0127",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          4,
          4,
          4,
          0,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3
        ],
        [
          4,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0128",
    "title": "QUEENS (6×6) // STAR BATTLE #0128",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0128",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0129",
    "title": "QUEENS (6×6) // STAR BATTLE #0129",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0129",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          2,
          0,
          5,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0130",
    "title": "QUEENS (6×6) // STAR BATTLE #0130",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0130",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          4,
          2,
          1,
          1,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0131",
    "title": "QUEENS (6×6) // STAR BATTLE #0131",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0131",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          5,
          1,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0132",
    "title": "QUEENS (6×6) // STAR BATTLE #0132",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0132",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          3,
          0
        ],
        [
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0133",
    "title": "QUEENS (6×6) // STAR BATTLE #0133",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0133",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          2,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          5,
          3,
          3,
          1
        ],
        [
          4,
          4,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0134",
    "title": "QUEENS (6×6) // STAR BATTLE #0134",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0134",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          0,
          1,
          0,
          0,
          0
        ],
        [
          2,
          3,
          3,
          3,
          0,
          3
        ],
        [
          5,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          3,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0135",
    "title": "QUEENS (6×6) // STAR BATTLE #0135",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0135",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          5,
          2,
          4
        ],
        [
          1,
          3,
          5,
          5,
          4,
          4
        ],
        [
          1,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0136",
    "title": "QUEENS (6×6) // STAR BATTLE #0136",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0136",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          3,
          3,
          1
        ],
        [
          3,
          3,
          3,
          3,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0137",
    "title": "QUEENS (6×6) // STAR BATTLE #0137",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0137",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          3
        ],
        [
          4,
          4,
          1,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3
        ],
        [
          4,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0138",
    "title": "QUEENS (6×6) // STAR BATTLE #0138",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0138",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          0,
          2,
          0
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0139",
    "title": "QUEENS (6×6) // STAR BATTLE #0139",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-07 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0139",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          4,
          4
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0140",
    "title": "QUEENS (6×6) // STAR BATTLE #0140",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0140",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          0,
          3
        ],
        [
          2,
          2,
          2,
          4,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0141",
    "title": "QUEENS (6×6) // STAR BATTLE #0141",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0141",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          3,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          4
        ],
        [
          1,
          3,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0142",
    "title": "QUEENS (6×6) // STAR BATTLE #0142",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0142",
      "size": 6,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          2,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0143",
    "title": "QUEENS (6×6) // STAR BATTLE #0143",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0143",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2,
          4
        ],
        [
          1,
          2,
          2,
          2,
          2,
          4
        ],
        [
          3,
          3,
          2,
          2,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0144",
    "title": "QUEENS (6×6) // STAR BATTLE #0144",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0144",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0145",
    "title": "QUEENS (6×6) // STAR BATTLE #0145",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0145",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          4,
          2,
          2,
          3,
          1,
          1
        ],
        [
          4,
          4,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0146",
    "title": "QUEENS (6×6) // STAR BATTLE #0146",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0146",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          0,
          2,
          0
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0147",
    "title": "QUEENS (6×6) // STAR BATTLE #0147",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0147",
      "size": 6,
      "regions": [
        [
          1,
          3,
          0,
          0,
          0,
          2
        ],
        [
          1,
          3,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          2,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0148",
    "title": "QUEENS (6×6) // STAR BATTLE #0148",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0148",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          0,
          3,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0149",
    "title": "QUEENS (6×6) // STAR BATTLE #0149",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0149",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0150",
    "title": "QUEENS (6×6) // STAR BATTLE #0150",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0150",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          4
        ],
        [
          1,
          3,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0151",
    "title": "QUEENS (6×6) // STAR BATTLE #0151",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0151",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0152",
    "title": "QUEENS (6×6) // STAR BATTLE #0152",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0152",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          3
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          5,
          5,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0153",
    "title": "QUEENS (6×6) // STAR BATTLE #0153",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0153",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          3,
          1,
          1,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0154",
    "title": "QUEENS (6×6) // STAR BATTLE #0154",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0154",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          0,
          0,
          0
        ],
        [
          3,
          3,
          3,
          3,
          2,
          0
        ],
        [
          3,
          3,
          5,
          5,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0155",
    "title": "QUEENS (6×6) // STAR BATTLE #0155",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0155",
      "size": 6,
      "regions": [
        [
          4,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          2,
          1,
          1,
          1
        ],
        [
          4,
          2,
          2,
          2,
          3,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3,
          5
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0156",
    "title": "QUEENS (6×6) // STAR BATTLE #0156",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0156",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          1,
          0,
          1
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0157",
    "title": "QUEENS (6×6) // STAR BATTLE #0157",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0157",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          0,
          0,
          1,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0158",
    "title": "QUEENS (6×6) // STAR BATTLE #0158",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0158",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          4,
          2,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0159",
    "title": "QUEENS (6×6) // STAR BATTLE #0159",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-08 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0159",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0160",
    "title": "QUEENS (6×6) // STAR BATTLE #0160",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0160",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          2,
          0,
          3
        ],
        [
          2,
          2,
          1,
          2,
          2,
          3
        ],
        [
          2,
          2,
          2,
          2,
          2,
          3
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          2,
          2,
          2,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0161",
    "title": "QUEENS (6×6) // STAR BATTLE #0161",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0161",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          4,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          0,
          0,
          1,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          1
        ],
        [
          4,
          4,
          4,
          5,
          5,
          1
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0162",
    "title": "QUEENS (6×6) // STAR BATTLE #0162",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0162",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          5,
          1,
          1,
          1,
          1
        ],
        [
          2,
          5,
          5,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0163",
    "title": "QUEENS (6×6) // STAR BATTLE #0163",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0163",
      "size": 6,
      "regions": [
        [
          1,
          2,
          2,
          0,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ],
        [
          3,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0164",
    "title": "QUEENS (6×6) // STAR BATTLE #0164",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0164",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          0,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2
        ],
        [
          5,
          3,
          2,
          2,
          2,
          2
        ],
        [
          5,
          5,
          5,
          5,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0165",
    "title": "QUEENS (6×6) // STAR BATTLE #0165",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0165",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          4
        ],
        [
          1,
          1,
          5,
          2,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0166",
    "title": "QUEENS (6×6) // STAR BATTLE #0166",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0166",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          3
        ],
        [
          2,
          2,
          1,
          4,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0167",
    "title": "QUEENS (6×6) // STAR BATTLE #0167",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0167",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          4,
          4
        ],
        [
          2,
          2,
          1,
          4,
          4,
          4
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0168",
    "title": "QUEENS (6×6) // STAR BATTLE #0168",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0168",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          4,
          2,
          5,
          3,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          3,
          1
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0169",
    "title": "QUEENS (6×6) // STAR BATTLE #0169",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0169",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          2,
          4
        ],
        [
          1,
          3,
          1,
          4,
          4,
          4
        ],
        [
          1,
          3,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0170",
    "title": "QUEENS (6×6) // STAR BATTLE #0170",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0170",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          2,
          2
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0171",
    "title": "QUEENS (6×6) // STAR BATTLE #0171",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0171",
      "size": 6,
      "regions": [
        [
          4,
          4,
          0,
          0,
          1,
          1
        ],
        [
          4,
          4,
          2,
          2,
          1,
          1
        ],
        [
          4,
          2,
          2,
          2,
          3,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0172",
    "title": "QUEENS (6×6) // STAR BATTLE #0172",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0172",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          3,
          2,
          4,
          4
        ],
        [
          3,
          3,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0173",
    "title": "QUEENS (6×6) // STAR BATTLE #0173",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0173",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          1,
          1,
          1,
          1,
          3
        ],
        [
          5,
          5,
          5,
          4,
          1,
          5
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0174",
    "title": "QUEENS (6×6) // STAR BATTLE #0174",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0174",
      "size": 6,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          5,
          3
        ],
        [
          2,
          2,
          5,
          5,
          5,
          3
        ],
        [
          5,
          5,
          5,
          4,
          5,
          5
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0175",
    "title": "QUEENS (6×6) // STAR BATTLE #0175",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0175",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          4,
          4
        ],
        [
          1,
          1,
          1,
          1,
          2,
          4
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0176",
    "title": "QUEENS (6×6) // STAR BATTLE #0176",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0176",
      "size": 6,
      "regions": [
        [
          1,
          1,
          2,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          5,
          5,
          5,
          2,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          2,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0177",
    "title": "QUEENS (6×6) // STAR BATTLE #0177",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0177",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          4,
          2,
          3,
          3,
          3,
          1
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0178",
    "title": "QUEENS (6×6) // STAR BATTLE #0178",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0178",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          2,
          0,
          3
        ],
        [
          2,
          2,
          1,
          2,
          2,
          3
        ],
        [
          2,
          2,
          2,
          2,
          2,
          3
        ],
        [
          2,
          5,
          2,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0179",
    "title": "QUEENS (6×6) // STAR BATTLE #0179",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-09 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0179",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          5,
          2,
          4
        ],
        [
          3,
          3,
          5,
          5,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0180",
    "title": "QUEENS (6×6) // STAR BATTLE #0180",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0180",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          1
        ],
        [
          4,
          2,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          5,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0181",
    "title": "QUEENS (6×6) // STAR BATTLE #0181",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0181",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          4,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          4
        ],
        [
          2,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0182",
    "title": "QUEENS (6×6) // STAR BATTLE #0182",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0182",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          4,
          2,
          0,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0183",
    "title": "QUEENS (6×6) // STAR BATTLE #0183",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0183",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          0,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0184",
    "title": "QUEENS (6×6) // STAR BATTLE #0184",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0184",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          2
        ],
        [
          1,
          3,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0185",
    "title": "QUEENS (6×6) // STAR BATTLE #0185",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0185",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          1
        ],
        [
          4,
          4,
          3,
          3,
          3,
          1
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0186",
    "title": "QUEENS (6×6) // STAR BATTLE #0186",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0186",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          3
        ],
        [
          1,
          1,
          1,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0187",
    "title": "QUEENS (6×6) // STAR BATTLE #0187",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0187",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          4,
          4,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          4
        ],
        [
          2,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0188",
    "title": "QUEENS (6×6) // STAR BATTLE #0188",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0188",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0189",
    "title": "QUEENS (6×6) // STAR BATTLE #0189",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0189",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0190",
    "title": "QUEENS (6×6) // STAR BATTLE #0190",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0190",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          1
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          2,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0191",
    "title": "QUEENS (6×6) // STAR BATTLE #0191",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0191",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          3,
          2,
          4,
          4
        ],
        [
          3,
          3,
          5,
          2,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0192",
    "title": "QUEENS (6×6) // STAR BATTLE #0192",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0192",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0193",
    "title": "QUEENS (6×6) // STAR BATTLE #0193",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0193",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          4,
          0
        ],
        [
          2,
          2,
          2,
          4,
          4,
          3
        ],
        [
          2,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0194",
    "title": "QUEENS (6×6) // STAR BATTLE #0194",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0194",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          1,
          5,
          1,
          1
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0195",
    "title": "QUEENS (6×6) // STAR BATTLE #0195",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0195",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          0,
          2,
          0
        ],
        [
          3,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ],
        [
          3,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0196",
    "title": "QUEENS (6×6) // STAR BATTLE #0196",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0196",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          4,
          4,
          1,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0197",
    "title": "QUEENS (6×6) // STAR BATTLE #0197",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0197",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          4,
          4,
          4
        ],
        [
          1,
          3,
          4,
          4,
          4,
          4
        ],
        [
          1,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0198",
    "title": "QUEENS (6×6) // STAR BATTLE #0198",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0198",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          1,
          3,
          5,
          5,
          4,
          4
        ],
        [
          1,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0199",
    "title": "QUEENS (6×6) // STAR BATTLE #0199",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-10 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0199",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          1
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0200",
    "title": "QUEENS (6×6) // STAR BATTLE #0200",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0200",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          3
        ],
        [
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0201",
    "title": "QUEENS (6×6) // STAR BATTLE #0201",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0201",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          3,
          5,
          5,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0202",
    "title": "QUEENS (6×6) // STAR BATTLE #0202",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0202",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0203",
    "title": "QUEENS (6×6) // STAR BATTLE #0203",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0203",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          1
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0204",
    "title": "QUEENS (6×6) // STAR BATTLE #0204",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0204",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          3,
          4,
          4,
          2,
          2
        ],
        [
          1,
          4,
          4,
          4,
          4,
          4
        ],
        [
          1,
          4,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0205",
    "title": "QUEENS (6×6) // STAR BATTLE #0205",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0205",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          4,
          2,
          1,
          1,
          1,
          1
        ],
        [
          4,
          4,
          1,
          1,
          3,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0206",
    "title": "QUEENS (6×6) // STAR BATTLE #0206",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0206",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          1,
          0
        ],
        [
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0207",
    "title": "QUEENS (6×6) // STAR BATTLE #0207",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0207",
      "size": 6,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          3,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0208",
    "title": "QUEENS (6×6) // STAR BATTLE #0208",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0208",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4
        ],
        [
          3,
          3,
          5,
          2,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0209",
    "title": "QUEENS (6×6) // STAR BATTLE #0209",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0209",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          3,
          3,
          3
        ],
        [
          1,
          1,
          1,
          3,
          3,
          3
        ],
        [
          1,
          1,
          4,
          4,
          3,
          3
        ],
        [
          1,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0210",
    "title": "QUEENS (6×6) // STAR BATTLE #0210",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0210",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          1,
          0,
          3
        ],
        [
          2,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0211",
    "title": "QUEENS (6×6) // STAR BATTLE #0211",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0211",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          3
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          3,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0212",
    "title": "QUEENS (6×6) // STAR BATTLE #0212",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0212",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0213",
    "title": "QUEENS (6×6) // STAR BATTLE #0213",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0213",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          0,
          0,
          0,
          2,
          2,
          4
        ],
        [
          0,
          3,
          3,
          3,
          4,
          4
        ],
        [
          0,
          3,
          3,
          4,
          4,
          4
        ],
        [
          0,
          3,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0214",
    "title": "QUEENS (6×6) // STAR BATTLE #0214",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0214",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          3,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          5,
          5,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0215",
    "title": "QUEENS (6×6) // STAR BATTLE #0215",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0215",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          3,
          3
        ],
        [
          0,
          2,
          0,
          3,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          2,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0216",
    "title": "QUEENS (6×6) // STAR BATTLE #0216",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0216",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          4,
          4,
          0,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0217",
    "title": "QUEENS (6×6) // STAR BATTLE #0217",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0217",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          0
        ],
        [
          1,
          3,
          5,
          5,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0218",
    "title": "QUEENS (6×6) // STAR BATTLE #0218",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0218",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          5,
          1,
          0,
          0,
          3
        ],
        [
          5,
          5,
          5,
          5,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          5,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0219",
    "title": "QUEENS (6×6) // STAR BATTLE #0219",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-11 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0219",
      "size": 6,
      "regions": [
        [
          1,
          1,
          3,
          0,
          2,
          2
        ],
        [
          1,
          1,
          3,
          3,
          2,
          2
        ],
        [
          1,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0220",
    "title": "QUEENS (6×6) // STAR BATTLE #0220",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0220",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          4
        ],
        [
          2,
          2,
          2,
          4,
          4,
          4
        ],
        [
          2,
          2,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0221",
    "title": "QUEENS (6×6) // STAR BATTLE #0221",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0221",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          5,
          1,
          0,
          3,
          3
        ],
        [
          5,
          5,
          5,
          3,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0222",
    "title": "QUEENS (6×6) // STAR BATTLE #0222",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0222",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          2,
          2,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0223",
    "title": "QUEENS (6×6) // STAR BATTLE #0223",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0223",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          3,
          0,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          5,
          3,
          2,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0224",
    "title": "QUEENS (6×6) // STAR BATTLE #0224",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0224",
      "size": 6,
      "regions": [
        [
          1,
          2,
          2,
          0,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          5,
          2,
          2,
          2
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0225",
    "title": "QUEENS (6×6) // STAR BATTLE #0225",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0225",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          0,
          0,
          3,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0226",
    "title": "QUEENS (6×6) // STAR BATTLE #0226",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0226",
      "size": 6,
      "regions": [
        [
          1,
          3,
          3,
          0,
          2,
          2
        ],
        [
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          5,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0227",
    "title": "QUEENS (6×6) // STAR BATTLE #0227",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0227",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          1
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0228",
    "title": "QUEENS (6×6) // STAR BATTLE #0228",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0228",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          0,
          3
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          2,
          5,
          2,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0229",
    "title": "QUEENS (6×6) // STAR BATTLE #0229",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0229",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          2,
          0
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0230",
    "title": "QUEENS (6×6) // STAR BATTLE #0230",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0230",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          1,
          1,
          1,
          1,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0231",
    "title": "QUEENS (6×6) // STAR BATTLE #0231",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0231",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          1,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0232",
    "title": "QUEENS (6×6) // STAR BATTLE #0232",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0232",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0233",
    "title": "QUEENS (6×6) // STAR BATTLE #0233",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0233",
      "size": 6,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          3
        ],
        [
          5,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0234",
    "title": "QUEENS (6×6) // STAR BATTLE #0234",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0234",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          2,
          2,
          3,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0235",
    "title": "QUEENS (6×6) // STAR BATTLE #0235",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0235",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          2
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2,
          4
        ],
        [
          3,
          3,
          5,
          2,
          2,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0236",
    "title": "QUEENS (6×6) // STAR BATTLE #0236",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0236",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          0,
          1,
          1
        ],
        [
          4,
          2,
          2,
          0,
          3,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          1
        ],
        [
          4,
          4,
          4,
          5,
          5,
          1
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0237",
    "title": "QUEENS (6×6) // STAR BATTLE #0237",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0237",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          4,
          2,
          2,
          5,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0238",
    "title": "QUEENS (6×6) // STAR BATTLE #0238",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0238",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          3
        ],
        [
          2,
          1,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          1,
          4,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0239",
    "title": "QUEENS (6×6) // STAR BATTLE #0239",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-12 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0239",
      "size": 6,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          0,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0240",
    "title": "QUEENS (6×6) // STAR BATTLE #0240",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0240",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          0,
          0,
          1,
          1,
          1
        ],
        [
          4,
          2,
          4,
          1,
          1,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0241",
    "title": "QUEENS (6×6) // STAR BATTLE #0241",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0241",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          3
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          2,
          2,
          2,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0242",
    "title": "QUEENS (6×6) // STAR BATTLE #0242",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0242",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          2,
          0,
          3
        ],
        [
          2,
          2,
          2,
          2,
          2,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0243",
    "title": "QUEENS (6×6) // STAR BATTLE #0243",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0243",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          3,
          0,
          0
        ],
        [
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          4,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0244",
    "title": "QUEENS (6×6) // STAR BATTLE #0244",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0244",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          2,
          5,
          3,
          3
        ],
        [
          2,
          2,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0245",
    "title": "QUEENS (6×6) // STAR BATTLE #0245",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0245",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          5,
          5,
          5,
          4
        ],
        [
          3,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0246",
    "title": "QUEENS (6×6) // STAR BATTLE #0246",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0246",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          5,
          0,
          2,
          2
        ],
        [
          5,
          3,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0247",
    "title": "QUEENS (6×6) // STAR BATTLE #0247",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0247",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          0,
          3,
          3,
          1
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0248",
    "title": "QUEENS (6×6) // STAR BATTLE #0248",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0248",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          1
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3
        ],
        [
          5,
          5,
          5,
          4,
          5,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0249",
    "title": "QUEENS (6×6) // STAR BATTLE #0249",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0249",
      "size": 6,
      "regions": [
        [
          1,
          3,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          5,
          2,
          2,
          4
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0250",
    "title": "QUEENS (6×6) // STAR BATTLE #0250",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0250",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          4,
          0,
          0
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0251",
    "title": "QUEENS (6×6) // STAR BATTLE #0251",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0251",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          4,
          4,
          4,
          3,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          3
        ],
        [
          2,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0252",
    "title": "QUEENS (6×6) // STAR BATTLE #0252",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0252",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          5,
          2,
          4
        ],
        [
          1,
          3,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0253",
    "title": "QUEENS (6×6) // STAR BATTLE #0253",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0253",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          0,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          4,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0254",
    "title": "QUEENS (6×6) // STAR BATTLE #0254",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0254",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          5,
          1,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0255",
    "title": "QUEENS (6×6) // STAR BATTLE #0255",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0255",
      "size": 6,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          3
        ],
        [
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          5,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0256",
    "title": "QUEENS (6×6) // STAR BATTLE #0256",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0256",
      "size": 6,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0257",
    "title": "QUEENS (6×6) // STAR BATTLE #0257",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0257",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          5,
          3,
          0,
          0,
          2,
          4
        ],
        [
          5,
          5,
          5,
          0,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0258",
    "title": "QUEENS (6×6) // STAR BATTLE #0258",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0258",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          2,
          2,
          2,
          4
        ],
        [
          5,
          5,
          5,
          2,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0259",
    "title": "QUEENS (6×6) // STAR BATTLE #0259",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-13 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0259",
      "size": 6,
      "regions": [
        [
          2,
          2,
          0,
          3,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0260",
    "title": "QUEENS (6×6) // STAR BATTLE #0260",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0260",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          1
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0261",
    "title": "QUEENS (6×6) // STAR BATTLE #0261",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0261",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          0,
          1,
          1,
          1
        ],
        [
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0262",
    "title": "QUEENS (6×6) // STAR BATTLE #0262",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0262",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          0,
          2,
          2
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          4,
          4,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          5,
          5,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0263",
    "title": "QUEENS (6×6) // STAR BATTLE #0263",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0263",
      "size": 6,
      "regions": [
        [
          2,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          0,
          3
        ],
        [
          2,
          2,
          1,
          4,
          3,
          3
        ],
        [
          2,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3
        ],
        [
          4,
          5,
          4,
          4,
          4,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0264",
    "title": "QUEENS (6×6) // STAR BATTLE #0264",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0264",
      "size": 6,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          2,
          0
        ],
        [
          1,
          3,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          0,
          0,
          0,
          4
        ],
        [
          1,
          5,
          5,
          0,
          0,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0265",
    "title": "QUEENS (6×6) // STAR BATTLE #0265",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0265",
      "size": 6,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          4,
          0,
          0
        ],
        [
          2,
          2,
          4,
          4,
          4,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          4
        ],
        [
          2,
          5,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0266",
    "title": "QUEENS (6×6) // STAR BATTLE #0266",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0266",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          2,
          4,
          4,
          3,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0267",
    "title": "QUEENS (6×6) // STAR BATTLE #0267",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0267",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          2
        ],
        [
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          2,
          4
        ],
        [
          3,
          5,
          5,
          5,
          5,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0268",
    "title": "QUEENS (6×6) // STAR BATTLE #0268",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0268",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          5,
          5,
          5,
          1,
          1
        ],
        [
          2,
          2,
          5,
          5,
          5,
          1
        ],
        [
          4,
          5,
          5,
          5,
          3,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0269",
    "title": "QUEENS (6×6) // STAR BATTLE #0269",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0269",
      "size": 6,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          3,
          3,
          3
        ],
        [
          2,
          2,
          0,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,5;2,1;3,4;4,0;5,3",
      "acceptedAnswers": [
        "0,2;1,5;2,1;3,4;4,0;5,3",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0270",
    "title": "QUEENS (6×6) // STAR BATTLE #0270",
    "category": "LOGIC",
    "description": "Place exactly 6 Queens on the 6×6 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "MODERATE",
    "risk": "BALANCED",
    "cost": 140,
    "reward": 260,
    "penalty": 80,
    "timeLimit": 85,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0270",
      "size": 6,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          1,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          4,
          4,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1",
        "QUEENS:6X6:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0271",
    "title": "QUEENS (7×7) // STAR BATTLE #0271",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0271",
      "size": 7,
      "regions": [
        [
          0,
          1,
          1,
          1,
          4,
          4,
          4
        ],
        [
          1,
          1,
          1,
          1,
          1,
          4,
          4
        ],
        [
          5,
          1,
          1,
          1,
          4,
          4,
          2
        ],
        [
          5,
          5,
          3,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0272",
    "title": "QUEENS (7×7) // STAR BATTLE #0272",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0272",
      "size": 7,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          3,
          3,
          1,
          4,
          4
        ],
        [
          5,
          5,
          3,
          6,
          6,
          4,
          4
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0273",
    "title": "QUEENS (7×7) // STAR BATTLE #0273",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0273",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          3,
          2,
          2,
          1,
          1
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          1
        ],
        [
          4,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
      "acceptedAnswers": [
        "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0274",
    "title": "QUEENS (7×7) // STAR BATTLE #0274",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0274",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          2,
          2,
          2
        ],
        [
          0,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          4,
          1,
          1,
          2,
          2,
          3
        ],
        [
          4,
          4,
          4,
          4,
          2,
          2,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          6,
          6
        ],
        [
          4,
          4,
          5,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0275",
    "title": "QUEENS (7×7) // STAR BATTLE #0275",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0275",
      "size": 7,
      "regions": [
        [
          3,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          3,
          0,
          2,
          2,
          4,
          1
        ],
        [
          3,
          3,
          2,
          2,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          5,
          5,
          4,
          4,
          4,
          6
        ],
        [
          3,
          5,
          5,
          5,
          4,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
      "acceptedAnswers": [
        "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0276",
    "title": "QUEENS (7×7) // STAR BATTLE #0276",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0276",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          2,
          2,
          1,
          1
        ],
        [
          0,
          0,
          2,
          2,
          2,
          1,
          1
        ],
        [
          4,
          0,
          3,
          2,
          2,
          2,
          1
        ],
        [
          4,
          3,
          3,
          3,
          2,
          2,
          1
        ],
        [
          4,
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
      "acceptedAnswers": [
        "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0277",
    "title": "QUEENS (7×7) // STAR BATTLE #0277",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0277",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          4,
          4,
          4
        ],
        [
          3,
          6,
          2,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          4,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0278",
    "title": "QUEENS (7×7) // STAR BATTLE #0278",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0278",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          2
        ],
        [
          0,
          0,
          0,
          1,
          1,
          1,
          2
        ],
        [
          0,
          0,
          0,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4,
          2,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4,
          4,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4,
          5,
          5
        ],
        [
          6,
          4,
          4,
          4,
          4,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0279",
    "title": "QUEENS (7×7) // STAR BATTLE #0279",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-14 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0279",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          3,
          3
        ],
        [
          0,
          5,
          1,
          1,
          1,
          5,
          3
        ],
        [
          5,
          5,
          5,
          5,
          2,
          5,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5,
          3
        ],
        [
          5,
          4,
          5,
          5,
          5,
          5,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0280",
    "title": "QUEENS (7×7) // STAR BATTLE #0280",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0280",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          3,
          0,
          0
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          0
        ],
        [
          4,
          4,
          4,
          4,
          5,
          5,
          5
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,3;2,0;3,4;4,1;5,5;6,2",
      "acceptedAnswers": [
        "0,6;1,3;2,0;3,4;4,1;5,5;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0281",
    "title": "QUEENS (7×7) // STAR BATTLE #0281",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0281",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          0,
          0,
          2,
          0
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          0
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          4
        ],
        [
          6,
          3,
          3,
          5,
          3,
          3,
          3
        ],
        [
          6,
          3,
          3,
          3,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
      "acceptedAnswers": [
        "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0282",
    "title": "QUEENS (7×7) // STAR BATTLE #0282",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0282",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          3,
          3,
          2
        ],
        [
          1,
          1,
          1,
          3,
          3,
          3,
          2
        ],
        [
          1,
          1,
          1,
          3,
          3,
          3,
          3
        ],
        [
          1,
          1,
          4,
          3,
          3,
          3,
          3
        ],
        [
          5,
          1,
          4,
          3,
          3,
          3,
          3
        ],
        [
          5,
          4,
          4,
          4,
          3,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
      "acceptedAnswers": [
        "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0283",
    "title": "QUEENS (7×7) // STAR BATTLE #0283",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0283",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1,
          3
        ],
        [
          0,
          0,
          1,
          1,
          1,
          1,
          3
        ],
        [
          2,
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          5,
          5,
          5,
          1,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          6,
          3
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0284",
    "title": "QUEENS (7×7) // STAR BATTLE #0284",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0284",
      "size": 7,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          6,
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          6,
          4,
          6,
          6,
          5,
          3,
          5
        ],
        [
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
      "acceptedAnswers": [
        "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0285",
    "title": "QUEENS (7×7) // STAR BATTLE #0285",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0285",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          3,
          3
        ],
        [
          0,
          2,
          3,
          3,
          1,
          3,
          3
        ],
        [
          4,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3,
          5
        ],
        [
          4,
          4,
          4,
          4,
          5,
          5,
          5
        ],
        [
          4,
          4,
          4,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
      "acceptedAnswers": [
        "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0286",
    "title": "QUEENS (7×7) // STAR BATTLE #0286",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0286",
      "size": 7,
      "regions": [
        [
          3,
          3,
          0,
          0,
          1,
          1,
          1
        ],
        [
          3,
          3,
          3,
          0,
          1,
          1,
          1
        ],
        [
          3,
          3,
          3,
          2,
          2,
          1,
          1
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4,
          1
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          5,
          3,
          4,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,4;3,1;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,3;1,6;2,4;3,1;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0287",
    "title": "QUEENS (7×7) // STAR BATTLE #0287",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0287",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0,
          4
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0,
          4
        ],
        [
          1,
          3,
          3,
          0,
          2,
          4,
          4
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          4,
          4,
          4,
          6
        ],
        [
          3,
          3,
          3,
          4,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2;6,6",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0288",
    "title": "QUEENS (7×7) // STAR BATTLE #0288",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0288",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          3,
          3
        ],
        [
          0,
          0,
          0,
          3,
          1,
          3,
          3
        ],
        [
          0,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          4,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          5
        ],
        [
          3,
          3,
          6,
          6,
          6,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
      "acceptedAnswers": [
        "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0289",
    "title": "QUEENS (7×7) // STAR BATTLE #0289",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0289",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          3,
          0,
          0
        ],
        [
          1,
          1,
          0,
          3,
          3,
          2,
          5
        ],
        [
          1,
          3,
          3,
          3,
          3,
          3,
          5
        ],
        [
          4,
          4,
          3,
          3,
          3,
          5,
          5
        ],
        [
          3,
          3,
          3,
          3,
          3,
          5,
          5
        ],
        [
          3,
          3,
          3,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,5;3,3;4,1;5,6;6,4",
      "acceptedAnswers": [
        "0,2;1,0;2,5;3,3;4,1;5,6;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0290",
    "title": "QUEENS (7×7) // STAR BATTLE #0290",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0290",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          3,
          3
        ],
        [
          1,
          1,
          0,
          0,
          0,
          3,
          3
        ],
        [
          1,
          2,
          2,
          0,
          3,
          3,
          3
        ],
        [
          1,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          6,
          4,
          6,
          3,
          3,
          3,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,5;4,1;5,6;6,4",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,5;4,1;5,6;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0291",
    "title": "QUEENS (7×7) // STAR BATTLE #0291",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0291",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          2,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2,
          2
        ],
        [
          1,
          3,
          2,
          2,
          4,
          2,
          2
        ],
        [
          1,
          1,
          6,
          4,
          4,
          4,
          2
        ],
        [
          1,
          6,
          6,
          6,
          4,
          4,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,5;3,1;4,4;5,6;6,3",
      "acceptedAnswers": [
        "0,2;1,0;2,5;3,1;4,4;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0292",
    "title": "QUEENS (7×7) // STAR BATTLE #0292",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0292",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          2,
          4
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2,
          4
        ],
        [
          1,
          3,
          2,
          2,
          2,
          2,
          4
        ],
        [
          3,
          3,
          5,
          5,
          2,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5,
          6
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2;6,6",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0293",
    "title": "QUEENS (7×7) // STAR BATTLE #0293",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0293",
      "size": 7,
      "regions": [
        [
          2,
          2,
          3,
          3,
          0,
          0,
          0
        ],
        [
          2,
          2,
          3,
          3,
          3,
          4,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          3,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          5,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          6,
          6,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0294",
    "title": "QUEENS (7×7) // STAR BATTLE #0294",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0294",
      "size": 7,
      "regions": [
        [
          2,
          2,
          3,
          3,
          0,
          1,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          1,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3,
          1
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          2,
          6,
          3,
          3,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          6,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0295",
    "title": "QUEENS (7×7) // STAR BATTLE #0295",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0295",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          3
        ],
        [
          0,
          2,
          0,
          0,
          1,
          3,
          3
        ],
        [
          2,
          2,
          2,
          0,
          0,
          3,
          3
        ],
        [
          2,
          2,
          4,
          0,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          6,
          3,
          5
        ],
        [
          4,
          4,
          4,
          6,
          6,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          6,
          6,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
      "acceptedAnswers": [
        "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0296",
    "title": "QUEENS (7×7) // STAR BATTLE #0296",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0296",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          5,
          1,
          1,
          1
        ],
        [
          3,
          3,
          5,
          5,
          5,
          1,
          4
        ],
        [
          3,
          3,
          5,
          5,
          5,
          6,
          6
        ],
        [
          3,
          5,
          5,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0297",
    "title": "QUEENS (7×7) // STAR BATTLE #0297",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0297",
      "size": 7,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          1,
          1,
          1,
          1,
          2,
          3,
          3
        ],
        [
          1,
          1,
          1,
          2,
          2,
          3,
          3
        ],
        [
          1,
          1,
          1,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          1,
          3,
          3,
          3,
          3
        ],
        [
          6,
          6,
          6,
          5,
          3,
          6,
          6
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0298",
    "title": "QUEENS (7×7) // STAR BATTLE #0298",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0298",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          4,
          1,
          1,
          2,
          2,
          3,
          0
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          6,
          3,
          3
        ],
        [
          4,
          4,
          5,
          6,
          6,
          6,
          6
        ],
        [
          4,
          4,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
      "acceptedAnswers": [
        "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0299",
    "title": "QUEENS (7×7) // STAR BATTLE #0299",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-15 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0299",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          3,
          2,
          2,
          5,
          1,
          1,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0300",
    "title": "QUEENS (7×7) // STAR BATTLE #0300",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0300",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          1,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          4
        ],
        [
          3,
          3,
          3,
          6,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          4,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,5;3,1;4,4;5,6;6,3",
      "acceptedAnswers": [
        "0,2;1,0;2,5;3,1;4,4;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0301",
    "title": "QUEENS (7×7) // STAR BATTLE #0301",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0301",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          1,
          1,
          3,
          5,
          2,
          2,
          2
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          4
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
      "acceptedAnswers": [
        "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0302",
    "title": "QUEENS (7×7) // STAR BATTLE #0302",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0302",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          0
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          0
        ],
        [
          3,
          2,
          2,
          2,
          2,
          4,
          0
        ],
        [
          3,
          3,
          2,
          2,
          5,
          4,
          4
        ],
        [
          3,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0303",
    "title": "QUEENS (7×7) // STAR BATTLE #0303",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0303",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          2,
          2,
          1
        ],
        [
          0,
          0,
          0,
          2,
          2,
          1,
          1
        ],
        [
          0,
          2,
          2,
          2,
          2,
          2,
          1
        ],
        [
          3,
          5,
          2,
          2,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          6,
          6
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
      "acceptedAnswers": [
        "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0304",
    "title": "QUEENS (7×7) // STAR BATTLE #0304",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0304",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          1,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          0
        ],
        [
          3,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          3,
          6,
          2,
          4,
          4,
          1,
          1
        ],
        [
          6,
          6,
          6,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0305",
    "title": "QUEENS (7×7) // STAR BATTLE #0305",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0305",
      "size": 7,
      "regions": [
        [
          3,
          3,
          0,
          0,
          1,
          1,
          1
        ],
        [
          3,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          2,
          2,
          1,
          1
        ],
        [
          3,
          3,
          3,
          2,
          4,
          4,
          1
        ],
        [
          3,
          3,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,4;3,1;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,3;1,6;2,4;3,1;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0306",
    "title": "QUEENS (7×7) // STAR BATTLE #0306",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0306",
      "size": 7,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          2,
          2,
          0,
          4,
          4
        ],
        [
          2,
          2,
          2,
          3,
          4,
          4,
          4
        ],
        [
          5,
          2,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          6,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0307",
    "title": "QUEENS (7×7) // STAR BATTLE #0307",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0307",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          2
        ],
        [
          0,
          1,
          0,
          0,
          3,
          2,
          2
        ],
        [
          5,
          4,
          4,
          3,
          3,
          2,
          2
        ],
        [
          5,
          4,
          4,
          3,
          3,
          3,
          2
        ],
        [
          5,
          4,
          4,
          3,
          3,
          6,
          6
        ],
        [
          5,
          5,
          4,
          3,
          6,
          6,
          6
        ],
        [
          5,
          5,
          4,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
      "acceptedAnswers": [
        "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0308",
    "title": "QUEENS (7×7) // STAR BATTLE #0308",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0308",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          1,
          4,
          4,
          5,
          5
        ],
        [
          3,
          3,
          4,
          4,
          5,
          5,
          5
        ],
        [
          6,
          4,
          4,
          4,
          5,
          5,
          5
        ],
        [
          6,
          6,
          4,
          4,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0309",
    "title": "QUEENS (7×7) // STAR BATTLE #0309",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0309",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          0,
          0,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2,
          5
        ],
        [
          2,
          2,
          2,
          2,
          2,
          3,
          5
        ],
        [
          4,
          4,
          4,
          2,
          5,
          5,
          5
        ],
        [
          4,
          4,
          4,
          2,
          6,
          5,
          5
        ],
        [
          4,
          6,
          6,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,2;3,5;4,1;5,6;6,4",
      "acceptedAnswers": [
        "0,3;1,0;2,2;3,5;4,1;5,6;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0310",
    "title": "QUEENS (7×7) // STAR BATTLE #0310",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0310",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          4,
          4,
          1,
          1,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4,
          1,
          1
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4,
          1
        ],
        [
          6,
          3,
          4,
          4,
          4,
          5,
          5
        ],
        [
          6,
          6,
          4,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0311",
    "title": "QUEENS (7×7) // STAR BATTLE #0311",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0311",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1,
          2
        ],
        [
          0,
          0,
          0,
          0,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          5,
          5,
          2
        ],
        [
          3,
          3,
          3,
          4,
          5,
          5,
          5
        ],
        [
          6,
          3,
          3,
          3,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0312",
    "title": "QUEENS (7×7) // STAR BATTLE #0312",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0312",
      "size": 7,
      "regions": [
        [
          0,
          0,
          3,
          1,
          1,
          1,
          1
        ],
        [
          0,
          3,
          3,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          3
        ],
        [
          5,
          5,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          3,
          3,
          6,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0313",
    "title": "QUEENS (7×7) // STAR BATTLE #0313",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0313",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          2,
          2
        ],
        [
          0,
          0,
          0,
          0,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          5,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          5,
          5,
          2
        ],
        [
          3,
          3,
          3,
          4,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0314",
    "title": "QUEENS (7×7) // STAR BATTLE #0314",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0314",
      "size": 7,
      "regions": [
        [
          2,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          1,
          4
        ],
        [
          2,
          2,
          5,
          6,
          6,
          4,
          4
        ],
        [
          2,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,0;3,3;4,6;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,0;3,3;4,6;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0315",
    "title": "QUEENS (7×7) // STAR BATTLE #0315",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0315",
      "size": 7,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          5,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          5,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          5,
          5,
          3,
          1,
          6,
          1,
          2
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0316",
    "title": "QUEENS (7×7) // STAR BATTLE #0316",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0316",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          3,
          3,
          1,
          1,
          1
        ],
        [
          5,
          5,
          6,
          3,
          3,
          4,
          1
        ],
        [
          5,
          5,
          6,
          6,
          6,
          4,
          6
        ],
        [
          5,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0317",
    "title": "QUEENS (7×7) // STAR BATTLE #0317",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0317",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          3
        ],
        [
          0,
          0,
          0,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          0,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0318",
    "title": "QUEENS (7×7) // STAR BATTLE #0318",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0318",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          2
        ],
        [
          0,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          5,
          5,
          3,
          6,
          6,
          4,
          2
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          2
        ],
        [
          5,
          6,
          6,
          6,
          6,
          6,
          2
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0319",
    "title": "QUEENS (7×7) // STAR BATTLE #0319",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-16 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0319",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          0,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          3,
          3,
          2,
          2
        ],
        [
          1,
          1,
          3,
          3,
          3,
          3,
          2
        ],
        [
          1,
          1,
          4,
          3,
          3,
          6,
          6
        ],
        [
          5,
          1,
          4,
          6,
          6,
          6,
          6
        ],
        [
          1,
          1,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
      "acceptedAnswers": [
        "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0320",
    "title": "QUEENS (7×7) // STAR BATTLE #0320",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0320",
      "size": 7,
      "regions": [
        [
          3,
          3,
          0,
          2,
          2,
          2,
          1
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2,
          1
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          5,
          2,
          2,
          2,
          2
        ],
        [
          3,
          5,
          5,
          5,
          4,
          4,
          2
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
      "acceptedAnswers": [
        "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0321",
    "title": "QUEENS (7×7) // STAR BATTLE #0321",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0321",
      "size": 7,
      "regions": [
        [
          2,
          2,
          0,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          3,
          5,
          2,
          2,
          2,
          2,
          1
        ],
        [
          5,
          5,
          5,
          2,
          4,
          4,
          6
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
      "acceptedAnswers": [
        "0,2;1,6;2,3;3,0;4,4;5,1;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0322",
    "title": "QUEENS (7×7) // STAR BATTLE #0322",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0322",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          3,
          3,
          3
        ],
        [
          0,
          0,
          1,
          4,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          6,
          3
        ],
        [
          4,
          4,
          4,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0323",
    "title": "QUEENS (7×7) // STAR BATTLE #0323",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0323",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          2,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          3,
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          5,
          4,
          4,
          0
        ],
        [
          6,
          6,
          6,
          5,
          6,
          4,
          0
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          0
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0324",
    "title": "QUEENS (7×7) // STAR BATTLE #0324",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0324",
      "size": 7,
      "regions": [
        [
          3,
          0,
          3,
          2,
          2,
          1,
          1
        ],
        [
          3,
          3,
          3,
          2,
          2,
          1,
          1
        ],
        [
          4,
          3,
          3,
          2,
          2,
          2,
          1
        ],
        [
          4,
          4,
          3,
          3,
          2,
          2,
          1
        ],
        [
          4,
          4,
          4,
          3,
          5,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          5,
          5,
          5
        ],
        [
          4,
          6,
          6,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
      "acceptedAnswers": [
        "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0325",
    "title": "QUEENS (7×7) // STAR BATTLE #0325",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0325",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          2,
          3,
          3
        ],
        [
          0,
          0,
          1,
          1,
          2,
          3,
          3
        ],
        [
          0,
          5,
          5,
          5,
          2,
          3,
          3
        ],
        [
          0,
          5,
          5,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          6,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0326",
    "title": "QUEENS (7×7) // STAR BATTLE #0326",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0326",
      "size": 7,
      "regions": [
        [
          3,
          3,
          1,
          1,
          1,
          1,
          0
        ],
        [
          3,
          3,
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          4,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          5,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
      "acceptedAnswers": [
        "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0327",
    "title": "QUEENS (7×7) // STAR BATTLE #0327",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0327",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          5,
          5,
          3,
          3,
          3
        ],
        [
          2,
          2,
          5,
          5,
          4,
          6,
          3
        ],
        [
          2,
          5,
          5,
          5,
          6,
          6,
          6
        ],
        [
          2,
          2,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0328",
    "title": "QUEENS (7×7) // STAR BATTLE #0328",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0328",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          3,
          3,
          3
        ],
        [
          1,
          1,
          1,
          3,
          3,
          2,
          2
        ],
        [
          1,
          5,
          3,
          3,
          3,
          2,
          2
        ],
        [
          5,
          5,
          4,
          3,
          3,
          3,
          2
        ],
        [
          5,
          5,
          4,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          4,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          3,
          3,
          3,
          6,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
      "acceptedAnswers": [
        "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0329",
    "title": "QUEENS (7×7) // STAR BATTLE #0329",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0329",
      "size": 7,
      "regions": [
        [
          3,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          3,
          3,
          0,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          1,
          2,
          2
        ],
        [
          6,
          3,
          4,
          4,
          4,
          2,
          2
        ],
        [
          6,
          6,
          6,
          4,
          4,
          5,
          2
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0330",
    "title": "QUEENS (7×7) // STAR BATTLE #0330",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0330",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          3,
          0,
          0,
          1,
          1,
          1,
          4
        ],
        [
          3,
          3,
          2,
          2,
          1,
          1,
          4
        ],
        [
          3,
          3,
          2,
          1,
          1,
          4,
          4
        ],
        [
          3,
          3,
          3,
          5,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          5,
          4,
          4,
          4
        ],
        [
          3,
          3,
          5,
          5,
          6,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0331",
    "title": "QUEENS (7×7) // STAR BATTLE #0331",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0331",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          0,
          3,
          0,
          1
        ],
        [
          2,
          3,
          3,
          3,
          3,
          3,
          4
        ],
        [
          5,
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          6,
          3,
          3,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          3,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0332",
    "title": "QUEENS (7×7) // STAR BATTLE #0332",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0332",
      "size": 7,
      "regions": [
        [
          3,
          0,
          0,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          0,
          0,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          4,
          4,
          5,
          2
        ],
        [
          3,
          3,
          4,
          4,
          4,
          5,
          5
        ],
        [
          6,
          3,
          4,
          4,
          4,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
      "acceptedAnswers": [
        "0,2;1,4;2,6;3,1;4,3;5,5;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0333",
    "title": "QUEENS (7×7) // STAR BATTLE #0333",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0333",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1,
          1,
          2
        ],
        [
          0,
          0,
          3,
          1,
          1,
          4,
          2
        ],
        [
          0,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          0,
          0,
          3,
          4,
          4,
          4,
          4
        ],
        [
          0,
          5,
          6,
          6,
          6,
          6,
          6
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0334",
    "title": "QUEENS (7×7) // STAR BATTLE #0334",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0334",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          2,
          0,
          0,
          3
        ],
        [
          1,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          2,
          2,
          5,
          3
        ],
        [
          4,
          6,
          4,
          4,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,0;2,3;3,6;4,2;5,5;6,1",
      "acceptedAnswers": [
        "0,4;1,0;2,3;3,6;4,2;5,5;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0335",
    "title": "QUEENS (7×7) // STAR BATTLE #0335",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0335",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          2,
          2,
          0
        ],
        [
          1,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          6,
          2,
          2,
          2
        ],
        [
          5,
          3,
          6,
          6,
          4,
          2,
          2
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ],
        [
          5,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
      "acceptedAnswers": [
        "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0336",
    "title": "QUEENS (7×7) // STAR BATTLE #0336",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0336",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          2,
          2,
          2
        ],
        [
          0,
          0,
          0,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          1,
          4,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4,
          2
        ],
        [
          5,
          5,
          3,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0337",
    "title": "QUEENS (7×7) // STAR BATTLE #0337",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0337",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          0,
          0,
          3
        ],
        [
          1,
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          5,
          5,
          3
        ],
        [
          4,
          4,
          4,
          4,
          5,
          5,
          5
        ],
        [
          4,
          6,
          4,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,0;2,3;3,6;4,2;5,5;6,1",
      "acceptedAnswers": [
        "0,4;1,0;2,3;3,6;4,2;5,5;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0338",
    "title": "QUEENS (7×7) // STAR BATTLE #0338",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0338",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          0
        ],
        [
          3,
          2,
          2,
          5,
          1,
          4,
          4
        ],
        [
          3,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0339",
    "title": "QUEENS (7×7) // STAR BATTLE #0339",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-17 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0339",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          2,
          1,
          1
        ],
        [
          5,
          0,
          0,
          2,
          2,
          1,
          1
        ],
        [
          5,
          5,
          2,
          2,
          2,
          2,
          1
        ],
        [
          5,
          3,
          2,
          2,
          2,
          2,
          1
        ],
        [
          5,
          5,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          6,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,4;3,1;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,3;1,6;2,4;3,1;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0340",
    "title": "QUEENS (7×7) // STAR BATTLE #0340",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0340",
      "size": 7,
      "regions": [
        [
          3,
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          3,
          2,
          2,
          2,
          1,
          0,
          0
        ],
        [
          3,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          3,
          6,
          6,
          6,
          4,
          4,
          0
        ],
        [
          6,
          6,
          6,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          5,
          5,
          5,
          4,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0341",
    "title": "QUEENS (7×7) // STAR BATTLE #0341",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0341",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          3,
          3
        ],
        [
          1,
          1,
          1,
          2,
          3,
          3,
          3
        ],
        [
          1,
          1,
          4,
          4,
          3,
          3,
          3
        ],
        [
          1,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          3
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,0;2,3;3,6;4,2;5,5;6,1",
      "acceptedAnswers": [
        "0,4;1,0;2,3;3,6;4,2;5,5;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0342",
    "title": "QUEENS (7×7) // STAR BATTLE #0342",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0342",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          4,
          4,
          2,
          2,
          0
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4,
          0
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4,
          6
        ],
        [
          5,
          5,
          5,
          5,
          4,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,0;2,4;3,1;4,5;5,2;6,6",
      "acceptedAnswers": [
        "0,3;1,0;2,4;3,1;4,5;5,2;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0343",
    "title": "QUEENS (7×7) // STAR BATTLE #0343",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0343",
      "size": 7,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          0,
          0,
          0,
          0,
          2
        ],
        [
          1,
          1,
          0,
          0,
          2,
          2,
          2
        ],
        [
          6,
          5,
          3,
          5,
          5,
          2,
          4
        ],
        [
          6,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          6,
          5,
          5,
          5,
          5,
          5,
          4
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
      "acceptedAnswers": [
        "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0344",
    "title": "QUEENS (7×7) // STAR BATTLE #0344",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0344",
      "size": 7,
      "regions": [
        [
          1,
          3,
          0,
          0,
          3,
          3,
          3
        ],
        [
          1,
          3,
          3,
          3,
          3,
          3,
          5
        ],
        [
          3,
          3,
          3,
          3,
          3,
          2,
          5
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          5
        ],
        [
          3,
          3,
          3,
          3,
          4,
          5,
          5
        ],
        [
          3,
          3,
          3,
          3,
          5,
          5,
          5
        ],
        [
          3,
          3,
          3,
          6,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,5;3,1;4,4;5,6;6,3",
      "acceptedAnswers": [
        "0,2;1,0;2,5;3,1;4,4;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0345",
    "title": "QUEENS (7×7) // STAR BATTLE #0345",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0345",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          4,
          4,
          4
        ],
        [
          0,
          0,
          0,
          0,
          1,
          4,
          4
        ],
        [
          2,
          5,
          3,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          3,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          5,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          3,
          6,
          4
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,0;3,3;4,6;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,0;3,3;4,6;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0346",
    "title": "QUEENS (7×7) // STAR BATTLE #0346",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0346",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          2,
          2,
          2,
          0
        ],
        [
          1,
          1,
          2,
          2,
          2,
          2,
          0
        ],
        [
          4,
          2,
          2,
          2,
          2,
          2,
          2
        ],
        [
          4,
          4,
          5,
          2,
          5,
          3,
          5
        ],
        [
          4,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          5
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
      "acceptedAnswers": [
        "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0347",
    "title": "QUEENS (7×7) // STAR BATTLE #0347",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0347",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          2,
          2,
          2
        ],
        [
          0,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          4,
          4,
          1,
          2,
          2,
          2,
          3
        ],
        [
          4,
          4,
          4,
          5,
          2,
          2,
          2
        ],
        [
          4,
          4,
          5,
          5,
          5,
          6,
          6
        ],
        [
          4,
          4,
          4,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0348",
    "title": "QUEENS (7×7) // STAR BATTLE #0348",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0348",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          2,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          3,
          3,
          1,
          4,
          4
        ],
        [
          2,
          5,
          5,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,0;3,3;4,6;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,0;3,3;4,6;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0349",
    "title": "QUEENS (7×7) // STAR BATTLE #0349",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0349",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          2,
          1,
          1,
          1
        ],
        [
          0,
          0,
          2,
          2,
          1,
          1,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2,
          4,
          4
        ],
        [
          3,
          3,
          2,
          2,
          2,
          4,
          4
        ],
        [
          3,
          2,
          2,
          2,
          2,
          4,
          4
        ],
        [
          3,
          2,
          2,
          5,
          2,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          2,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
      "acceptedAnswers": [
        "0,1;1,4;2,2;3,0;4,6;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0350",
    "title": "QUEENS (7×7) // STAR BATTLE #0350",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0350",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          0,
          2,
          2,
          2
        ],
        [
          4,
          4,
          4,
          3,
          3,
          2,
          2
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3,
          2
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          5,
          4,
          4,
          6,
          6,
          6,
          6
        ],
        [
          4,
          4,
          4,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
      "acceptedAnswers": [
        "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0351",
    "title": "QUEENS (7×7) // STAR BATTLE #0351",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0351",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          2,
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          3,
          6
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0352",
    "title": "QUEENS (7×7) // STAR BATTLE #0352",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0352",
      "size": 7,
      "regions": [
        [
          2,
          2,
          1,
          1,
          1,
          1,
          0
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          1
        ],
        [
          4,
          4,
          4,
          4,
          3,
          5,
          5
        ],
        [
          6,
          6,
          6,
          3,
          3,
          3,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 2,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,3;2,0;3,4;4,1;5,5;6,2",
      "acceptedAnswers": [
        "0,6;1,3;2,0;3,4;4,1;5,5;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (3,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0353",
    "title": "QUEENS (7×7) // STAR BATTLE #0353",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0353",
      "size": 7,
      "regions": [
        [
          4,
          4,
          2,
          2,
          0,
          0,
          0
        ],
        [
          4,
          1,
          2,
          2,
          2,
          0,
          0
        ],
        [
          4,
          4,
          2,
          2,
          2,
          3,
          0
        ],
        [
          4,
          4,
          5,
          2,
          3,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          6,
          3,
          6
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
      "acceptedAnswers": [
        "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0354",
    "title": "QUEENS (7×7) // STAR BATTLE #0354",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0354",
      "size": 7,
      "regions": [
        [
          3,
          1,
          1,
          1,
          1,
          1,
          0
        ],
        [
          3,
          3,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          5,
          1,
          1,
          1
        ],
        [
          3,
          3,
          5,
          5,
          5,
          4,
          1
        ],
        [
          6,
          6,
          6,
          5,
          5,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,3;6,1",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0355",
    "title": "QUEENS (7×7) // STAR BATTLE #0355",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0355",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          2,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          4,
          4,
          1
        ],
        [
          5,
          2,
          3,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          3,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,1;3,3;4,5;5,0;6,4",
      "acceptedAnswers": [
        "0,2;1,6;2,1;3,3;4,5;5,0;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0356",
    "title": "QUEENS (7×7) // STAR BATTLE #0356",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0356",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          2,
          0
        ],
        [
          3,
          3,
          3,
          6,
          4,
          4,
          4
        ],
        [
          3,
          3,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          3,
          6,
          6,
          6,
          6,
          6
        ],
        [
          5,
          3,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
      "acceptedAnswers": [
        "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0357",
    "title": "QUEENS (7×7) // STAR BATTLE #0357",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0357",
      "size": 7,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          1,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          3,
          5,
          3,
          3,
          6,
          4,
          4
        ],
        [
          3,
          3,
          3,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0358",
    "title": "QUEENS (7×7) // STAR BATTLE #0358",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0358",
      "size": 7,
      "regions": [
        [
          2,
          2,
          1,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          0,
          0,
          0,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          3,
          6,
          6
        ],
        [
          5,
          5,
          5,
          4,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0359",
    "title": "QUEENS (7×7) // STAR BATTLE #0359",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-18 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0359",
      "size": 7,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          2,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          4,
          0,
          3,
          3
        ],
        [
          2,
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          2,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4,
          4,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0360",
    "title": "QUEENS (7×7) // STAR BATTLE #0360",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0360",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          3,
          5
        ],
        [
          4,
          4,
          4,
          2,
          5,
          5,
          5
        ],
        [
          6,
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
      "acceptedAnswers": [
        "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0361",
    "title": "QUEENS (7×7) // STAR BATTLE #0361",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0361",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0,
          3
        ],
        [
          1,
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          1,
          1,
          1,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          5,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
      "acceptedAnswers": [
        "0,4;1,2;2,0;3,5;4,3;5,1;6,6",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0362",
    "title": "QUEENS (7×7) // STAR BATTLE #0362",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0362",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          4,
          3,
          4,
          4,
          4
        ],
        [
          5,
          4,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          6,
          4,
          4,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
      "acceptedAnswers": [
        "0,4;1,6;2,1;3,3;4,5;5,0;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0363",
    "title": "QUEENS (7×7) // STAR BATTLE #0363",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0363",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          5,
          5,
          1,
          1,
          1,
          1,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0364",
    "title": "QUEENS (7×7) // STAR BATTLE #0364",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0364",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          2
        ],
        [
          1,
          1,
          0,
          0,
          0,
          3,
          2
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3,
          2
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          5,
          4,
          4,
          3,
          3,
          6,
          6
        ],
        [
          5,
          4,
          3,
          3,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
      "acceptedAnswers": [
        "0,3;1,1;2,6;3,4;4,2;5,0;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0365",
    "title": "QUEENS (7×7) // STAR BATTLE #0365",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0365",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          0,
          0,
          0
        ],
        [
          1,
          1,
          5,
          5,
          6,
          3,
          0
        ],
        [
          4,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
      "acceptedAnswers": [
        "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0366",
    "title": "QUEENS (7×7) // STAR BATTLE #0366",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0366",
      "size": 7,
      "regions": [
        [
          0,
          2,
          2,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3,
          3
        ],
        [
          2,
          2,
          4,
          2,
          3,
          3,
          3
        ],
        [
          2,
          2,
          6,
          6,
          3,
          3,
          5
        ],
        [
          2,
          6,
          6,
          6,
          6,
          3,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
      "acceptedAnswers": [
        "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0367",
    "title": "QUEENS (7×7) // STAR BATTLE #0367",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0367",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          5,
          1,
          1
        ],
        [
          2,
          2,
          2,
          5,
          5,
          3,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
      "acceptedAnswers": [
        "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0368",
    "title": "QUEENS (7×7) // STAR BATTLE #0368",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0368",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          0,
          1,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          2,
          1,
          1,
          3,
          3
        ],
        [
          2,
          2,
          5,
          1,
          4,
          3,
          3
        ],
        [
          2,
          5,
          5,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0369",
    "title": "QUEENS (7×7) // STAR BATTLE #0369",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0369",
      "size": 7,
      "regions": [
        [
          0,
          0,
          4,
          1,
          1,
          1,
          3
        ],
        [
          0,
          2,
          4,
          4,
          1,
          1,
          3
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          6,
          6,
          3,
          5
        ],
        [
          4,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
      "acceptedAnswers": [
        "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0370",
    "title": "QUEENS (7×7) // STAR BATTLE #0370",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0370",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          4,
          1,
          1,
          1,
          0,
          2,
          0
        ],
        [
          4,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          4,
          3,
          1,
          4,
          4,
          2,
          4
        ],
        [
          4,
          4,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          4,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          6,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
      "acceptedAnswers": [
        "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0371",
    "title": "QUEENS (7×7) // STAR BATTLE #0371",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0371",
      "size": 7,
      "regions": [
        [
          0,
          0,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          1
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          4,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          4,
          4,
          3,
          3,
          3,
          5,
          2
        ],
        [
          4,
          4,
          4,
          6,
          6,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 1,
          "c": 6
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
      "acceptedAnswers": [
        "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (2,7) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0372",
    "title": "QUEENS (7×7) // STAR BATTLE #0372",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0372",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          2,
          2,
          2
        ],
        [
          0,
          0,
          1,
          2,
          2,
          2,
          2
        ],
        [
          0,
          4,
          2,
          2,
          2,
          2,
          3
        ],
        [
          4,
          4,
          4,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          2,
          6,
          3
        ],
        [
          4,
          4,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
      "acceptedAnswers": [
        "0,0;1,2;2,4;3,6;4,1;5,3;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0373",
    "title": "QUEENS (7×7) // STAR BATTLE #0373",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0373",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          3,
          3,
          0
        ],
        [
          4,
          1,
          1,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          6,
          6,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          6,
          6,
          3
        ],
        [
          4,
          5,
          5,
          6,
          6,
          6,
          3
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
      "acceptedAnswers": [
        "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0374",
    "title": "QUEENS (7×7) // STAR BATTLE #0374",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0374",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          3,
          0,
          2,
          1,
          1
        ],
        [
          3,
          3,
          3,
          3,
          2,
          1,
          1
        ],
        [
          4,
          3,
          3,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 3
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
      "acceptedAnswers": [
        "0,1;1,6;2,4;3,2;4,0;5,5;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,4) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0375",
    "title": "QUEENS (7×7) // STAR BATTLE #0375",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0375",
      "size": 7,
      "regions": [
        [
          2,
          2,
          0,
          3,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          4,
          4
        ],
        [
          2,
          2,
          2,
          2,
          4,
          4,
          4
        ],
        [
          5,
          2,
          2,
          2,
          6,
          4,
          4
        ],
        [
          5,
          2,
          2,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 6,
          "c": 4
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,1;3,3;4,5;5,0;6,4",
      "acceptedAnswers": [
        "0,2;1,6;2,1;3,3;4,5;5,0;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (7,5) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0376",
    "title": "QUEENS (7×7) // STAR BATTLE #0376",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0376",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          3,
          3,
          0
        ],
        [
          4,
          1,
          1,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          1,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          6,
          6,
          3,
          3
        ],
        [
          4,
          4,
          4,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 5
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
      "acceptedAnswers": [
        "0,6;1,1;2,3;3,5;4,0;5,2;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,6) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0377",
    "title": "QUEENS (7×7) // STAR BATTLE #0377",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0377",
      "size": 7,
      "regions": [
        [
          2,
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          6,
          6,
          3,
          3,
          0
        ],
        [
          2,
          6,
          6,
          6,
          3,
          3,
          3
        ],
        [
          2,
          4,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,3;2,0;3,4;4,1;5,5;6,2",
      "acceptedAnswers": [
        "0,6;1,3;2,0;3,4;4,1;5,5;6,2",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0378",
    "title": "QUEENS (7×7) // STAR BATTLE #0378",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0378",
      "size": 7,
      "regions": [
        [
          2,
          0,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          2,
          2,
          5,
          6,
          6,
          6,
          3
        ],
        [
          2,
          2,
          2,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
      "acceptedAnswers": [
        "0,1;1,3;2,0;3,6;4,4;5,2;6,5",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0379",
    "title": "QUEENS (7×7) // STAR BATTLE #0379",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-19 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0379",
      "size": 7,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          3,
          4,
          4,
          2,
          4
        ],
        [
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          6,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          6,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
      "acceptedAnswers": [
        "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0380",
    "title": "QUEENS (7×7) // STAR BATTLE #0380",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0380",
      "size": 7,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          5,
          1,
          2,
          2,
          2,
          2,
          2
        ],
        [
          5,
          5,
          2,
          2,
          2,
          2,
          2
        ],
        [
          5,
          5,
          3,
          5,
          2,
          2,
          4
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          6,
          5,
          5,
          5,
          5,
          4,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 3,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
      "acceptedAnswers": [
        "0,4;1,1;2,5;3,2;4,6;5,3;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (4,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0381",
    "title": "QUEENS (7×7) // STAR BATTLE #0381",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0381",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          3,
          3
        ],
        [
          0,
          0,
          0,
          0,
          3,
          3,
          1
        ],
        [
          4,
          0,
          2,
          0,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 1
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
      "acceptedAnswers": [
        "0,3;1,6;2,2;3,5;4,1;5,4;6,0",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,2) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0382",
    "title": "QUEENS (7×7) // STAR BATTLE #0382",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0382",
      "size": 7,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1,
          2
        ],
        [
          0,
          3,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          2,
          2
        ],
        [
          5,
          5,
          3,
          3,
          1,
          4,
          2
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": [
        {
          "r": 0,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
      "acceptedAnswers": [
        "0,0;1,3;2,6;3,2;4,5;5,1;6,4",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (1,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0383",
    "title": "QUEENS (7×7) // STAR BATTLE #0383",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0383",
      "size": 7,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          3
        ],
        [
          0,
          2,
          1,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          4,
          4,
          1,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          3,
          3,
          3,
          5
        ],
        [
          4,
          4,
          4,
          6,
          3,
          5,
          5
        ]
      ],
      "givenQueens": [
        {
          "r": 4,
          "c": 2
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
      "acceptedAnswers": [
        "0,0;1,4;2,1;3,5;4,2;5,6;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (5,3) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0384",
    "title": "QUEENS (7×7) // STAR BATTLE #0384",
    "category": "LOGIC",
    "description": "Place exactly 7 Queens on the 7×7 board so that no two Queens share a row, column, diagonal, or colored region (1 given).",
    "difficulty": "HIGH",
    "risk": "AGGRESSIVE",
    "cost": 300,
    "reward": 750,
    "penalty": 200,
    "timeLimit": 120,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0384",
      "size": 7,
      "regions": [
        [
          3,
          1,
          1,
          2,
          2,
          0,
          0
        ],
        [
          3,
          1,
          1,
          2,
          2,
          2,
          0
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          5,
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          5,
          5,
          3,
          6,
          4,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          6,
          6,
          4
        ]
      ],
      "givenQueens": [
        {
          "r": 5,
          "c": 0
        }
      ]
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
      "acceptedAnswers": [
        "0,6;1,2;2,5;3,1;4,4;5,0;6,3",
        "QUEENS:7X7:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Given queen at (6,1) eliminates its entire row, column, and diagonals; mark affected squares in neighboring regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0385",
    "title": "QUEENS (8×8) // STAR BATTLE #0385",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0385",
      "size": 8,
      "regions": [
        [
          3,
          0,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          7,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          7,
          7,
          7,
          2,
          2
        ],
        [
          3,
          3,
          7,
          7,
          7,
          7,
          7,
          5
        ],
        [
          7,
          7,
          7,
          7,
          7,
          6,
          7,
          7
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,6;3,0;4,2;5,7;6,5;7,3",
      "acceptedAnswers": [
        "0,1;1,4;2,6;3,0;4,2;5,7;6,5;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0386",
    "title": "QUEENS (8×8) // STAR BATTLE #0386",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0386",
      "size": 8,
      "regions": [
        [
          3,
          1,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          3,
          1,
          2,
          2,
          2,
          2,
          2,
          0
        ],
        [
          3,
          3,
          3,
          2,
          2,
          2,
          2,
          5
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          5,
          5
        ],
        [
          4,
          3,
          3,
          3,
          2,
          2,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          2,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
      "acceptedAnswers": [
        "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0387",
    "title": "QUEENS (8×8) // STAR BATTLE #0387",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0387",
      "size": 8,
      "regions": [
        [
          2,
          2,
          1,
          1,
          1,
          1,
          0,
          5
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1,
          5
        ],
        [
          2,
          2,
          2,
          2,
          1,
          4,
          4,
          5
        ],
        [
          3,
          2,
          2,
          4,
          4,
          4,
          4,
          5
        ],
        [
          6,
          6,
          6,
          4,
          4,
          4,
          5,
          5
        ],
        [
          6,
          6,
          6,
          4,
          4,
          4,
          5,
          5
        ],
        [
          6,
          6,
          6,
          7,
          7,
          4,
          5,
          5
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0388",
    "title": "QUEENS (8×8) // STAR BATTLE #0388",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0388",
      "size": 8,
      "regions": [
        [
          2,
          2,
          2,
          1,
          1,
          1,
          0,
          1
        ],
        [
          2,
          2,
          2,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          1,
          1
        ],
        [
          3,
          2,
          2,
          2,
          1,
          4,
          5,
          5
        ],
        [
          3,
          6,
          6,
          6,
          4,
          4,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          7,
          4,
          5,
          5
        ],
        [
          6,
          6,
          6,
          7,
          7,
          7,
          5,
          5
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0389",
    "title": "QUEENS (8×8) // STAR BATTLE #0389",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0389",
      "size": 8,
      "regions": [
        [
          2,
          2,
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          2,
          2,
          4,
          4,
          3,
          3
        ],
        [
          6,
          4,
          4,
          4,
          4,
          4,
          4,
          3
        ],
        [
          6,
          6,
          6,
          5,
          4,
          4,
          3,
          3
        ],
        [
          6,
          6,
          6,
          7,
          4,
          7,
          7,
          3
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0390",
    "title": "QUEENS (8×8) // STAR BATTLE #0390",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0390",
      "size": 8,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          1,
          1,
          6,
          4,
          1,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          7,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          7,
          7,
          5,
          5
        ],
        [
          6,
          6,
          6,
          7,
          7,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,5;2,0;3,6;4,3;5,7;6,2;7,4",
      "acceptedAnswers": [
        "0,1;1,5;2,0;3,6;4,3;5,7;6,2;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0391",
    "title": "QUEENS (8×8) // STAR BATTLE #0391",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0391",
      "size": 8,
      "regions": [
        [
          3,
          3,
          3,
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          1,
          3,
          0,
          0,
          0,
          2,
          2
        ],
        [
          3,
          3,
          3,
          0,
          0,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          0,
          5,
          2,
          5
        ],
        [
          3,
          3,
          3,
          4,
          5,
          5,
          5,
          5
        ],
        [
          3,
          3,
          3,
          3,
          6,
          5,
          5,
          5
        ],
        [
          3,
          3,
          7,
          7,
          6,
          6,
          5,
          5
        ],
        [
          3,
          7,
          7,
          7,
          7,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,1;2,6;3,0;4,3;5,7;6,4;7,2",
      "acceptedAnswers": [
        "0,5;1,1;2,6;3,0;4,3;5,7;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0392",
    "title": "QUEENS (8×8) // STAR BATTLE #0392",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0392",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          4,
          2,
          0,
          3,
          0,
          0,
          0,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3,
          0,
          0,
          1
        ],
        [
          4,
          4,
          4,
          3,
          3,
          0,
          5,
          5
        ],
        [
          4,
          4,
          4,
          3,
          6,
          6,
          5,
          5
        ],
        [
          4,
          7,
          7,
          6,
          6,
          6,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,7;2,1;3,3;4,0;5,6;6,4;7,2",
      "acceptedAnswers": [
        "0,5;1,7;2,1;3,3;4,0;5,6;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0393",
    "title": "QUEENS (8×8) // STAR BATTLE #0393",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0393",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          3,
          5,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          3,
          5,
          5,
          1,
          6,
          0,
          2,
          2
        ],
        [
          3,
          5,
          5,
          6,
          6,
          6,
          2,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          7,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,3;2,6;3,0;4,7;5,1;6,4;7,2",
      "acceptedAnswers": [
        "0,5;1,3;2,6;3,0;4,7;5,1;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0394",
    "title": "QUEENS (8×8) // STAR BATTLE #0394",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0394",
      "size": 8,
      "regions": [
        [
          3,
          1,
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          3,
          1,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          1,
          4,
          4,
          4,
          2,
          4
        ],
        [
          3,
          5,
          5,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          4,
          4
        ],
        [
          5,
          5,
          7,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,3;2,6;3,0;4,7;5,1;6,4;7,2",
      "acceptedAnswers": [
        "0,5;1,3;2,6;3,0;4,7;5,1;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0395",
    "title": "QUEENS (8×8) // STAR BATTLE #0395",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0395",
      "size": 8,
      "regions": [
        [
          0,
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          5,
          5,
          2,
          2,
          2,
          3,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          5,
          7,
          6,
          6,
          6,
          4,
          4
        ],
        [
          7,
          7,
          7,
          7,
          6,
          6,
          4,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,6;2,3;3,5;4,7;5,1;6,4;7,2",
      "acceptedAnswers": [
        "0,0;1,6;2,3;3,5;4,7;5,1;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0396",
    "title": "QUEENS (8×8) // STAR BATTLE #0396",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0396",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          2,
          3,
          3,
          0
        ],
        [
          1,
          1,
          1,
          3,
          2,
          3,
          3,
          3
        ],
        [
          4,
          1,
          3,
          3,
          2,
          3,
          3,
          3
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          3,
          3,
          3,
          5,
          5,
          5
        ],
        [
          4,
          4,
          3,
          5,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          5,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
      "acceptedAnswers": [
        "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0397",
    "title": "QUEENS (8×8) // STAR BATTLE #0397",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0397",
      "size": 8,
      "regions": [
        [
          0,
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          0,
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          4,
          4,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        [
          4,
          4,
          4,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          5,
          5,
          3,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          3,
          3
        ],
        [
          4,
          4,
          5,
          5,
          5,
          6,
          6,
          6
        ],
        [
          4,
          4,
          7,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,6;2,4;3,7;4,1;5,3;6,5;7,2",
      "acceptedAnswers": [
        "0,0;1,6;2,4;3,7;4,1;5,3;6,5;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0398",
    "title": "QUEENS (8×8) // STAR BATTLE #0398",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0398",
      "size": 8,
      "regions": [
        [
          2,
          2,
          2,
          0,
          1,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          1
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          2,
          5,
          5,
          5,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          3,
          6,
          6,
          6
        ],
        [
          5,
          5,
          5,
          5,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          7,
          7,
          7,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,3;1,7;2,0;3,4;4,6;5,1;6,5;7,2",
      "acceptedAnswers": [
        "0,3;1,7;2,0;3,4;4,6;5,1;6,5;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0399",
    "title": "QUEENS (8×8) // STAR BATTLE #0399",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-20 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0399",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          1,
          1,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          5,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          2,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          7,
          6,
          6,
          6,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,3;2,6;3,0;4,7;5,1;6,4;7,2",
      "acceptedAnswers": [
        "0,5;1,3;2,6;3,0;4,7;5,1;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0400",
    "title": "QUEENS (8×8) // STAR BATTLE #0400",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0400",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          1
        ],
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          5
        ],
        [
          2,
          0,
          0,
          1,
          5,
          1,
          5,
          5
        ],
        [
          0,
          0,
          6,
          5,
          5,
          5,
          3,
          5
        ],
        [
          6,
          6,
          6,
          4,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          7,
          7,
          5,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,5;2,0;3,6;4,3;5,7;6,2;7,4",
      "acceptedAnswers": [
        "0,1;1,5;2,0;3,6;4,3;5,7;6,2;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0401",
    "title": "QUEENS (8×8) // STAR BATTLE #0401",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0401",
      "size": 8,
      "regions": [
        [
          0,
          3,
          3,
          3,
          3,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          1,
          4,
          2
        ],
        [
          6,
          6,
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          7,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          7,
          7,
          7,
          4,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0402",
    "title": "QUEENS (8×8) // STAR BATTLE #0402",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0402",
      "size": 8,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          2,
          2,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          2,
          2,
          2,
          2
        ],
        [
          1,
          2,
          3,
          2,
          2,
          2,
          2,
          2
        ],
        [
          4,
          2,
          2,
          2,
          2,
          2,
          2,
          6
        ],
        [
          7,
          7,
          7,
          5,
          2,
          2,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          6,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,5;3,2;4,0;5,3;6,7;7,4",
      "acceptedAnswers": [
        "0,6;1,1;2,5;3,2;4,0;5,3;6,7;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0403",
    "title": "QUEENS (8×8) // STAR BATTLE #0403",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0403",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          2,
          2
        ],
        [
          1,
          1,
          1,
          1,
          0,
          2,
          2,
          2
        ],
        [
          1,
          1,
          1,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          6,
          2,
          2
        ],
        [
          5,
          3,
          3,
          3,
          3,
          6,
          4,
          4
        ],
        [
          5,
          5,
          3,
          3,
          6,
          6,
          6,
          6
        ],
        [
          5,
          5,
          3,
          6,
          6,
          6,
          6,
          6
        ],
        [
          7,
          7,
          6,
          6,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,7;3,3;4,6;5,0;6,5;7,1",
      "acceptedAnswers": [
        "0,4;1,2;2,7;3,3;4,6;5,0;6,5;7,1",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0404",
    "title": "QUEENS (8×8) // STAR BATTLE #0404",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0404",
      "size": 8,
      "regions": [
        [
          1,
          1,
          3,
          3,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          3,
          3,
          0,
          0,
          0,
          0
        ],
        [
          3,
          3,
          3,
          3,
          2,
          2,
          0,
          0
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          5,
          5
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3,
          5,
          5
        ],
        [
          4,
          4,
          6,
          6,
          3,
          5,
          5,
          5
        ],
        [
          4,
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          4,
          6,
          6,
          6,
          6,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
      "acceptedAnswers": [
        "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0405",
    "title": "QUEENS (8×8) // STAR BATTLE #0405",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0405",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          3,
          1,
          1,
          1
        ],
        [
          4,
          0,
          0,
          2,
          3,
          3,
          3,
          1
        ],
        [
          4,
          0,
          0,
          0,
          0,
          3,
          3,
          3
        ],
        [
          4,
          4,
          0,
          0,
          3,
          3,
          3,
          3
        ],
        [
          4,
          0,
          0,
          0,
          0,
          5,
          3,
          3
        ],
        [
          4,
          6,
          0,
          0,
          7,
          7,
          7,
          7
        ],
        [
          4,
          0,
          0,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,7;2,3;3,6;4,0;5,5;6,1;7,4",
      "acceptedAnswers": [
        "0,2;1,7;2,3;3,6;4,0;5,5;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0406",
    "title": "QUEENS (8×8) // STAR BATTLE #0406",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0406",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          3,
          3,
          3,
          1,
          1
        ],
        [
          0,
          0,
          0,
          3,
          3,
          3,
          1,
          3
        ],
        [
          0,
          0,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          0,
          5,
          5,
          3,
          3,
          3,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          5,
          3,
          3,
          4
        ],
        [
          6,
          5,
          5,
          5,
          5,
          5,
          5,
          4
        ],
        [
          6,
          6,
          7,
          7,
          5,
          5,
          5,
          4
        ],
        [
          6,
          7,
          7,
          7,
          7,
          5,
          5,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,2;3,5;4,7;5,4;6,0;7,3",
      "acceptedAnswers": [
        "0,1;1,6;2,2;3,5;4,7;5,4;6,0;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0407",
    "title": "QUEENS (8×8) // STAR BATTLE #0407",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0407",
      "size": 8,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          0,
          6,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          6,
          6,
          6,
          1,
          1,
          1,
          2,
          2
        ],
        [
          6,
          6,
          3,
          5,
          5,
          4,
          2,
          2
        ],
        [
          6,
          6,
          5,
          5,
          5,
          4,
          4,
          2
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          4,
          2
        ],
        [
          6,
          6,
          6,
          5,
          7,
          7,
          7,
          7
        ],
        [
          6,
          6,
          6,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0408",
    "title": "QUEENS (8×8) // STAR BATTLE #0408",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0408",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          4,
          4
        ],
        [
          3,
          3,
          2,
          1,
          1,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          1,
          4,
          4,
          4,
          4
        ],
        [
          3,
          3,
          4,
          4,
          4,
          4,
          4,
          4
        ],
        [
          3,
          6,
          4,
          4,
          4,
          4,
          4,
          5
        ],
        [
          6,
          6,
          6,
          4,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          7,
          7,
          4,
          4,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0409",
    "title": "QUEENS (8×8) // STAR BATTLE #0409",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0409",
      "size": 8,
      "regions": [
        [
          1,
          2,
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2,
          2,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2,
          4,
          4,
          3
        ],
        [
          2,
          2,
          2,
          5,
          4,
          4,
          4,
          4
        ],
        [
          2,
          2,
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          5,
          5,
          7,
          7,
          7,
          4
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0410",
    "title": "QUEENS (8×8) // STAR BATTLE #0410",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0410",
      "size": 8,
      "regions": [
        [
          2,
          2,
          4,
          4,
          3,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          4,
          3,
          3,
          3,
          0
        ],
        [
          2,
          2,
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          2,
          4,
          4,
          4,
          3,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          5,
          6,
          6,
          6
        ],
        [
          4,
          4,
          4,
          7,
          6,
          6,
          6,
          6
        ],
        [
          4,
          4,
          7,
          7,
          7,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,2;2,0;3,5;4,1;5,4;6,6;7,3",
      "acceptedAnswers": [
        "0,7;1,2;2,0;3,5;4,1;5,4;6,6;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0411",
    "title": "QUEENS (8×8) // STAR BATTLE #0411",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0411",
      "size": 8,
      "regions": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          1,
          1,
          1,
          1,
          2,
          2,
          2
        ],
        [
          3,
          3,
          1,
          1,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          1,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          4,
          6,
          6,
          2,
          6,
          5
        ],
        [
          3,
          3,
          6,
          6,
          6,
          6,
          6,
          5
        ],
        [
          3,
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,6;3,0;4,2;5,7;6,5;7,3",
      "acceptedAnswers": [
        "0,1;1,4;2,6;3,0;4,2;5,7;6,5;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0412",
    "title": "QUEENS (8×8) // STAR BATTLE #0412",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0412",
      "size": 8,
      "regions": [
        [
          2,
          0,
          0,
          2,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          2,
          2,
          1,
          1,
          1,
          3
        ],
        [
          2,
          2,
          2,
          2,
          1,
          3,
          3,
          3
        ],
        [
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          3
        ],
        [
          4,
          2,
          2,
          3,
          6,
          5,
          5,
          3
        ],
        [
          4,
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,4;2,1;3,7;4,0;5,6;6,3;7,5",
      "acceptedAnswers": [
        "0,2;1,4;2,1;3,7;4,0;5,6;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0413",
    "title": "QUEENS (8×8) // STAR BATTLE #0413",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0413",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          3,
          2,
          2,
          7,
          1,
          0,
          0,
          0
        ],
        [
          3,
          7,
          7,
          7,
          7,
          4,
          0,
          0
        ],
        [
          3,
          7,
          7,
          7,
          7,
          4,
          4,
          4
        ],
        [
          3,
          7,
          7,
          7,
          7,
          7,
          7,
          5
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0414",
    "title": "QUEENS (8×8) // STAR BATTLE #0414",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0414",
      "size": 8,
      "regions": [
        [
          1,
          0,
          0,
          0,
          0,
          2,
          2,
          2
        ],
        [
          1,
          0,
          0,
          0,
          0,
          2,
          2,
          2
        ],
        [
          5,
          5,
          0,
          0,
          0,
          2,
          2,
          2
        ],
        [
          5,
          5,
          6,
          6,
          3,
          2,
          2,
          2
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          2,
          4
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          6,
          6
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          6,
          6
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          7,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,6;3,4;4,7;5,1;6,3;7,5",
      "acceptedAnswers": [
        "0,2;1,0;2,6;3,4;4,7;5,1;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0415",
    "title": "QUEENS (8×8) // STAR BATTLE #0415",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0415",
      "size": 8,
      "regions": [
        [
          3,
          2,
          2,
          2,
          1,
          0,
          0,
          0
        ],
        [
          3,
          3,
          2,
          2,
          1,
          1,
          0,
          0
        ],
        [
          3,
          3,
          2,
          2,
          2,
          2,
          2,
          0
        ],
        [
          3,
          3,
          3,
          2,
          2,
          4,
          4,
          4
        ],
        [
          3,
          3,
          6,
          6,
          4,
          4,
          4,
          4
        ],
        [
          3,
          6,
          6,
          6,
          6,
          4,
          4,
          5
        ],
        [
          6,
          6,
          6,
          6,
          7,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          7,
          7,
          7,
          4,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
      "acceptedAnswers": [
        "0,6;1,4;2,2;3,0;4,5;5,7;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0416",
    "title": "QUEENS (8×8) // STAR BATTLE #0416",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0416",
      "size": 8,
      "regions": [
        [
          2,
          2,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          3,
          5,
          0,
          5,
          1
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          7,
          7,
          6,
          5,
          5,
          5
        ],
        [
          4,
          7,
          7,
          7,
          7,
          5,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,7;2,1;3,3;4,0;5,6;6,4;7,2",
      "acceptedAnswers": [
        "0,5;1,7;2,1;3,3;4,0;5,6;6,4;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0417",
    "title": "QUEENS (8×8) // STAR BATTLE #0417",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0417",
      "size": 8,
      "regions": [
        [
          3,
          0,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          3,
          3,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          3,
          3,
          3,
          2,
          0,
          4,
          4,
          1
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          5,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          6,
          6,
          4,
          4,
          4
        ],
        [
          5,
          5,
          7,
          6,
          6,
          6,
          6,
          4
        ],
        [
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,7;2,3;3,0;4,6;5,1;6,5;7,2",
      "acceptedAnswers": [
        "0,4;1,7;2,3;3,0;4,6;5,1;6,5;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0418",
    "title": "QUEENS (8×8) // STAR BATTLE #0418",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0418",
      "size": 8,
      "regions": [
        [
          2,
          2,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          3,
          3,
          0,
          0
        ],
        [
          2,
          4,
          4,
          5,
          3,
          3,
          3,
          0
        ],
        [
          4,
          4,
          4,
          5,
          5,
          3,
          3,
          5
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          4,
          4,
          5,
          5,
          5,
          5,
          6,
          6
        ],
        [
          4,
          4,
          7,
          7,
          5,
          5,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,2;2,0;3,5;4,1;5,4;6,6;7,3",
      "acceptedAnswers": [
        "0,7;1,2;2,0;3,5;4,1;5,4;6,6;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0419",
    "title": "QUEENS (8×8) // STAR BATTLE #0419",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-21 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0419",
      "size": 8,
      "regions": [
        [
          0,
          3,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2
        ],
        [
          3,
          3,
          4,
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          7,
          3,
          7,
          7,
          5,
          3
        ],
        [
          7,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3",
      "acceptedAnswers": [
        "0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0420",
    "title": "QUEENS (8×8) // STAR BATTLE #0420",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0420",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          2,
          0,
          0,
          0,
          0,
          1,
          1,
          1
        ],
        [
          2,
          2,
          2,
          0,
          4,
          4,
          4,
          3
        ],
        [
          2,
          2,
          2,
          4,
          4,
          4,
          4,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          6,
          5,
          5,
          5,
          5,
          5,
          4,
          4
        ],
        [
          6,
          5,
          5,
          5,
          7,
          5,
          5,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,1;3,7;4,5;5,3;6,0;7,4",
      "acceptedAnswers": [
        "0,2;1,6;2,1;3,7;4,5;5,3;6,0;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0421",
    "title": "QUEENS (8×8) // STAR BATTLE #0421",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0421",
      "size": 8,
      "regions": [
        [
          0,
          4,
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          4,
          4,
          4,
          1,
          1,
          1,
          5,
          2
        ],
        [
          4,
          4,
          4,
          4,
          1,
          5,
          5,
          2
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3,
          5,
          5
        ],
        [
          4,
          4,
          4,
          4,
          4,
          5,
          5,
          5
        ],
        [
          4,
          4,
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          4,
          4,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          4,
          7,
          5,
          5,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3",
      "acceptedAnswers": [
        "0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0422",
    "title": "QUEENS (8×8) // STAR BATTLE #0422",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0422",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0,
          2
        ],
        [
          1,
          1,
          3,
          3,
          3,
          3,
          3,
          2
        ],
        [
          1,
          3,
          3,
          3,
          3,
          3,
          3,
          2
        ],
        [
          1,
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          3,
          3,
          4,
          3,
          3,
          3,
          3,
          5
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          5,
          5
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          5,
          5
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,0;2,7;3,5;4,2;5,6;6,1;7,3",
      "acceptedAnswers": [
        "0,4;1,0;2,7;3,5;4,2;5,6;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0423",
    "title": "QUEENS (8×8) // STAR BATTLE #0423",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0423",
      "size": 8,
      "regions": [
        [
          2,
          2,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          1,
          2,
          2,
          2,
          2,
          2,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ],
        [
          2,
          2,
          3,
          2,
          2,
          2,
          2,
          2
        ],
        [
          4,
          6,
          6,
          6,
          2,
          2,
          2,
          2
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
      "acceptedAnswers": [
        "0,7;1,1;2,4;3,2;4,0;5,6;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0424",
    "title": "QUEENS (8×8) // STAR BATTLE #0424",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0424",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          2,
          5,
          4,
          4,
          4,
          3
        ],
        [
          6,
          5,
          5,
          5,
          5,
          4,
          3,
          3
        ],
        [
          6,
          5,
          5,
          5,
          5,
          4,
          4,
          3
        ],
        [
          6,
          5,
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          5,
          5,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          7,
          7,
          4,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0425",
    "title": "QUEENS (8×8) // STAR BATTLE #0425",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0425",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          2
        ],
        [
          0,
          3,
          3,
          3,
          1,
          1,
          4,
          2
        ],
        [
          0,
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          0,
          0,
          6,
          3,
          7,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          7,
          7,
          4,
          4
        ],
        [
          6,
          6,
          6,
          7,
          7,
          7,
          7,
          7
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0426",
    "title": "QUEENS (8×8) // STAR BATTLE #0426",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0426",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          2,
          2,
          1
        ],
        [
          0,
          0,
          0,
          0,
          2,
          2,
          2,
          1
        ],
        [
          0,
          0,
          0,
          5,
          2,
          2,
          2,
          2
        ],
        [
          3,
          0,
          4,
          5,
          2,
          2,
          2,
          2
        ],
        [
          4,
          4,
          4,
          5,
          5,
          2,
          6,
          6
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5,
          6,
          6
        ],
        [
          4,
          4,
          7,
          7,
          5,
          6,
          6,
          6
        ],
        [
          4,
          7,
          7,
          7,
          7,
          7,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,7;2,5;3,0;4,2;5,4;6,6;7,3",
      "acceptedAnswers": [
        "0,1;1,7;2,5;3,0;4,2;5,4;6,6;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0427",
    "title": "QUEENS (8×8) // STAR BATTLE #0427",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0427",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          2,
          2,
          2
        ],
        [
          3,
          1,
          4,
          4,
          2,
          2,
          2,
          2
        ],
        [
          4,
          4,
          4,
          4,
          5,
          2,
          2,
          2
        ],
        [
          4,
          4,
          4,
          5,
          5,
          5,
          7,
          2
        ],
        [
          4,
          4,
          7,
          7,
          5,
          7,
          7,
          6
        ],
        [
          4,
          4,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,1;2,6;3,0;4,2;5,4;6,7;7,3",
      "acceptedAnswers": [
        "0,5;1,1;2,6;3,0;4,2;5,4;6,7;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0428",
    "title": "QUEENS (8×8) // STAR BATTLE #0428",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0428",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2
        ],
        [
          0,
          1,
          0,
          0,
          0,
          2,
          2,
          2
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ],
        [
          3,
          7,
          7,
          5,
          5,
          2,
          4,
          2
        ],
        [
          7,
          7,
          7,
          5,
          5,
          5,
          4,
          2
        ],
        [
          7,
          7,
          7,
          7,
          5,
          5,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,1;2,5;3,0;4,6;5,3;6,7;7,2",
      "acceptedAnswers": [
        "0,4;1,1;2,5;3,0;4,6;5,3;6,7;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0429",
    "title": "QUEENS (8×8) // STAR BATTLE #0429",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0429",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          0,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3,
          1,
          1
        ],
        [
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          4
        ],
        [
          2,
          2,
          2,
          7,
          3,
          3,
          3,
          4
        ],
        [
          2,
          6,
          7,
          7,
          5,
          3,
          4,
          4
        ],
        [
          6,
          6,
          6,
          7,
          5,
          5,
          4,
          4
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          4
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,6;2,2;3,5;4,7;5,4;6,0;7,3",
      "acceptedAnswers": [
        "0,1;1,6;2,2;3,5;4,7;5,4;6,0;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0430",
    "title": "QUEENS (8×8) // STAR BATTLE #0430",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0430",
      "size": 8,
      "regions": [
        [
          0,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          4,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          4,
          4,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          4,
          4,
          4,
          1,
          1,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          1,
          3,
          3,
          3
        ],
        [
          6,
          6,
          4,
          4,
          1,
          3,
          5,
          3
        ],
        [
          6,
          6,
          6,
          1,
          1,
          1,
          1,
          1
        ],
        [
          6,
          6,
          6,
          7,
          1,
          1,
          1,
          1
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3",
      "acceptedAnswers": [
        "0,0;1,4;2,7;3,5;4,2;5,6;6,1;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0431",
    "title": "QUEENS (8×8) // STAR BATTLE #0431",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0431",
      "size": 8,
      "regions": [
        [
          4,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          4,
          4,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          4,
          4,
          4,
          3,
          0,
          4,
          4,
          2
        ],
        [
          4,
          4,
          4,
          3,
          4,
          4,
          4,
          4
        ],
        [
          5,
          4,
          4,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          5,
          7,
          4,
          4,
          4,
          4,
          4
        ],
        [
          5,
          7,
          7,
          7,
          4,
          6,
          7,
          7
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,2;2,7;3,3;4,6;5,0;6,5;7,1",
      "acceptedAnswers": [
        "0,4;1,2;2,7;3,3;4,6;5,0;6,5;7,1",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0432",
    "title": "QUEENS (8×8) // STAR BATTLE #0432",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0432",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          0,
          0,
          0,
          0
        ],
        [
          1,
          3,
          3,
          2,
          2,
          0,
          0,
          4
        ],
        [
          3,
          3,
          3,
          3,
          2,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          3,
          6,
          6,
          4,
          4
        ],
        [
          3,
          3,
          5,
          6,
          6,
          6,
          6,
          4
        ],
        [
          3,
          3,
          7,
          7,
          7,
          6,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,0;2,4;3,1;4,7;5,2;6,6;7,3",
      "acceptedAnswers": [
        "0,5;1,0;2,4;3,1;4,7;5,2;6,6;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0433",
    "title": "QUEENS (8×8) // STAR BATTLE #0433",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0433",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          2,
          2,
          0,
          0,
          3
        ],
        [
          1,
          1,
          1,
          5,
          2,
          0,
          3,
          3
        ],
        [
          4,
          5,
          5,
          5,
          5,
          3,
          3,
          3
        ],
        [
          6,
          5,
          5,
          5,
          5,
          3,
          3,
          3
        ],
        [
          6,
          6,
          5,
          5,
          5,
          3,
          3,
          3
        ],
        [
          6,
          6,
          6,
          6,
          6,
          3,
          7,
          3
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,2;2,4;3,7;4,0;5,3;6,1;7,6",
      "acceptedAnswers": [
        "0,5;1,2;2,4;3,7;4,0;5,3;6,1;7,6",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0434",
    "title": "QUEENS (8×8) // STAR BATTLE #0434",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0434",
      "size": 8,
      "regions": [
        [
          2,
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          1,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          1,
          1,
          0,
          0
        ],
        [
          2,
          2,
          1,
          1,
          1,
          3,
          3,
          0
        ],
        [
          2,
          4,
          5,
          5,
          5,
          5,
          6,
          0
        ],
        [
          5,
          5,
          5,
          5,
          5,
          5,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          5,
          7,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,7;1,2;2,0;3,5;4,1;5,4;6,6;7,3",
      "acceptedAnswers": [
        "0,7;1,2;2,0;3,5;4,1;5,4;6,6;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0435",
    "title": "QUEENS (8×8) // STAR BATTLE #0435",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0435",
      "size": 8,
      "regions": [
        [
          1,
          2,
          2,
          2,
          0,
          0,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2,
          0,
          3,
          3
        ],
        [
          2,
          2,
          2,
          5,
          5,
          4,
          4,
          3
        ],
        [
          2,
          2,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          7,
          7,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0436",
    "title": "QUEENS (8×8) // STAR BATTLE #0436",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0436",
      "size": 8,
      "regions": [
        [
          2,
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          2,
          2,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          2,
          0,
          0,
          0,
          1,
          1
        ],
        [
          2,
          2,
          3,
          6,
          6,
          5,
          5,
          4
        ],
        [
          2,
          6,
          6,
          6,
          6,
          5,
          5,
          4
        ],
        [
          7,
          6,
          6,
          6,
          5,
          5,
          5,
          5
        ],
        [
          7,
          7,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          7,
          7,
          7,
          6,
          6,
          6,
          6,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,6;2,0;3,2;4,7;5,5;6,3;7,1",
      "acceptedAnswers": [
        "0,4;1,6;2,0;3,2;4,7;5,5;6,3;7,1",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0437",
    "title": "QUEENS (8×8) // STAR BATTLE #0437",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0437",
      "size": 8,
      "regions": [
        [
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0
        ],
        [
          1,
          1,
          1,
          1,
          1,
          1,
          3,
          3
        ],
        [
          2,
          5,
          1,
          1,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          4,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          5,
          4,
          4,
          3,
          3
        ],
        [
          5,
          5,
          5,
          6,
          7,
          7,
          7,
          3
        ],
        [
          5,
          5,
          5,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,2;2,0;3,7;4,4;5,1;6,3;7,6",
      "acceptedAnswers": [
        "0,5;1,2;2,0;3,7;4,4;5,1;6,3;7,6",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0438",
    "title": "QUEENS (8×8) // STAR BATTLE #0438",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0438",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          3
        ],
        [
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          3
        ],
        [
          0,
          2,
          4,
          1,
          1,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          3,
          3,
          3
        ],
        [
          4,
          4,
          4,
          4,
          4,
          4,
          3,
          3
        ],
        [
          5,
          4,
          4,
          4,
          4,
          4,
          7,
          3
        ],
        [
          5,
          6,
          6,
          6,
          4,
          7,
          7,
          7
        ],
        [
          5,
          5,
          6,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,6;2,1;3,7;4,4;5,0;6,3;7,5",
      "acceptedAnswers": [
        "0,2;1,6;2,1;3,7;4,4;5,0;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0439",
    "title": "QUEENS (8×8) // STAR BATTLE #0439",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-22 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0439",
      "size": 8,
      "regions": [
        [
          0,
          3,
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          1,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          2
        ],
        [
          6,
          6,
          3,
          3,
          5,
          5,
          4,
          2
        ],
        [
          6,
          6,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          5,
          5,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          7,
          5,
          5,
          5
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0440",
    "title": "QUEENS (8×8) // STAR BATTLE #0440",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0440",
      "size": 8,
      "regions": [
        [
          2,
          2,
          2,
          2,
          2,
          0,
          0,
          0
        ],
        [
          1,
          2,
          2,
          2,
          2,
          2,
          0,
          0
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          0,
          3
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          3
        ],
        [
          2,
          2,
          2,
          2,
          2,
          4,
          3,
          3
        ],
        [
          2,
          2,
          2,
          5,
          2,
          4,
          3,
          3
        ],
        [
          6,
          6,
          5,
          5,
          7,
          7,
          7,
          7
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,6;1,0;2,2;3,7;4,5;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0441",
    "title": "QUEENS (8×8) // STAR BATTLE #0441",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0441",
      "size": 8,
      "regions": [
        [
          0,
          3,
          3,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          3,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3,
          3,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          3,
          3,
          1,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          5,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          3,
          5,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          3,
          5,
          7,
          4,
          4,
          4
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0442",
    "title": "QUEENS (8×8) // STAR BATTLE #0442",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0442",
      "size": 8,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          3,
          3,
          3
        ],
        [
          1,
          1,
          0,
          0,
          0,
          3,
          3,
          3
        ],
        [
          1,
          1,
          0,
          0,
          3,
          3,
          2,
          4
        ],
        [
          1,
          1,
          1,
          3,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          6,
          6,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          6,
          6,
          6,
          6,
          4,
          4
        ],
        [
          5,
          6,
          6,
          6,
          6,
          6,
          7,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,6;3,4;4,7;5,1;6,3;7,5",
      "acceptedAnswers": [
        "0,2;1,0;2,6;3,4;4,7;5,1;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0443",
    "title": "QUEENS (8×8) // STAR BATTLE #0443",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0443",
      "size": 8,
      "regions": [
        [
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          1,
          1,
          3,
          2,
          2,
          2,
          0,
          0
        ],
        [
          1,
          3,
          3,
          3,
          2,
          2,
          2,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        [
          4,
          3,
          3,
          3,
          3,
          3,
          6,
          6
        ],
        [
          3,
          3,
          3,
          5,
          3,
          3,
          6,
          6
        ],
        [
          3,
          3,
          3,
          7,
          7,
          6,
          6,
          6
        ],
        [
          3,
          7,
          7,
          7,
          7,
          7,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,6;1,1;2,5;3,2;4,0;5,3;6,7;7,4",
      "acceptedAnswers": [
        "0,6;1,1;2,5;3,2;4,0;5,3;6,7;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0444",
    "title": "QUEENS (8×8) // STAR BATTLE #0444",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0444",
      "size": 8,
      "regions": [
        [
          4,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          4,
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          4,
          4,
          0,
          2,
          2,
          3,
          3,
          3
        ],
        [
          4,
          4,
          0,
          2,
          7,
          3,
          3,
          3
        ],
        [
          4,
          4,
          7,
          7,
          7,
          7,
          3,
          3
        ],
        [
          4,
          4,
          7,
          7,
          7,
          5,
          3,
          3
        ],
        [
          4,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ],
        [
          4,
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,7;2,3;3,6;4,0;5,5;6,1;7,4",
      "acceptedAnswers": [
        "0,2;1,7;2,3;3,6;4,0;5,5;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0445",
    "title": "QUEENS (8×8) // STAR BATTLE #0445",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0445",
      "size": 8,
      "regions": [
        [
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        [
          3,
          0,
          1,
          1,
          1,
          1,
          1,
          2
        ],
        [
          3,
          3,
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          1,
          1,
          1,
          1,
          2,
          2
        ],
        [
          3,
          3,
          4,
          7,
          7,
          7,
          2,
          2
        ],
        [
          3,
          3,
          7,
          7,
          7,
          7,
          7,
          5
        ],
        [
          3,
          7,
          7,
          7,
          7,
          6,
          6,
          5
        ],
        [
          3,
          7,
          7,
          7,
          7,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,1;1,4;2,6;3,0;4,2;5,7;6,5;7,3",
      "acceptedAnswers": [
        "0,1;1,4;2,6;3,0;4,2;5,7;6,5;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0446",
    "title": "QUEENS (8×8) // STAR BATTLE #0446",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0446",
      "size": 8,
      "regions": [
        [
          3,
          0,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          3,
          3,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          3,
          3,
          3,
          2,
          0,
          0,
          1,
          1
        ],
        [
          3,
          3,
          3,
          3,
          6,
          0,
          1,
          1
        ],
        [
          3,
          6,
          4,
          4,
          6,
          6,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          5,
          5,
          5
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          7,
          7
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,7;2,3;3,0;4,2;5,5;6,1;7,6",
      "acceptedAnswers": [
        "0,4;1,7;2,3;3,0;4,2;5,5;6,1;7,6",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0447",
    "title": "QUEENS (8×8) // STAR BATTLE #0447",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0447",
      "size": 8,
      "regions": [
        [
          3,
          1,
          1,
          5,
          5,
          0,
          0,
          2
        ],
        [
          3,
          1,
          1,
          5,
          5,
          5,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          5,
          5,
          2,
          2
        ],
        [
          3,
          3,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          3,
          3,
          4,
          5,
          5,
          5,
          5,
          5
        ],
        [
          3,
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        [
          3,
          5,
          5,
          5,
          5,
          5,
          5,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          5,
          5,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,5;1,1;2,6;3,0;4,2;5,4;6,7;7,3",
      "acceptedAnswers": [
        "0,5;1,1;2,6;3,0;4,2;5,4;6,7;7,3",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0448",
    "title": "QUEENS (8×8) // STAR BATTLE #0448",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0448",
      "size": 8,
      "regions": [
        [
          1,
          1,
          0,
          0,
          2,
          2,
          2,
          4
        ],
        [
          1,
          1,
          1,
          3,
          3,
          3,
          2,
          4
        ],
        [
          1,
          3,
          3,
          3,
          3,
          3,
          2,
          4
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          4
        ],
        [
          3,
          3,
          3,
          3,
          3,
          3,
          4,
          4
        ],
        [
          5,
          5,
          6,
          6,
          6,
          3,
          4,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          6,
          7,
          4
        ],
        [
          6,
          6,
          6,
          6,
          6,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,2;1,0;2,6;3,4;4,7;5,1;6,3;7,5",
      "acceptedAnswers": [
        "0,2;1,0;2,6;3,4;4,7;5,1;6,3;7,5",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0449",
    "title": "QUEENS (8×8) // STAR BATTLE #0449",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0449",
      "size": 8,
      "regions": [
        [
          0,
          0,
          3,
          3,
          3,
          4,
          4,
          2
        ],
        [
          0,
          3,
          3,
          3,
          3,
          1,
          4,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          4,
          2
        ],
        [
          3,
          3,
          3,
          3,
          3,
          4,
          4,
          4
        ],
        [
          3,
          3,
          3,
          3,
          4,
          4,
          4,
          4
        ],
        [
          6,
          6,
          3,
          5,
          5,
          4,
          4,
          4
        ],
        [
          6,
          6,
          6,
          5,
          7,
          7,
          4,
          7
        ],
        [
          6,
          6,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
      "acceptedAnswers": [
        "0,0;1,5;2,7;3,2;4,6;5,3;6,1;7,4",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  },
  {
    "challengeId": "CHG-QUN-0450",
    "title": "QUEENS (8×8) // STAR BATTLE #0450",
    "category": "LOGIC",
    "description": "Place exactly 8 Queens on the 8×8 board so that no two Queens share a row, column, diagonal, or colored region (0 given).",
    "difficulty": "EXTREME",
    "risk": "AGGRESSIVE",
    "cost": 600,
    "reward": 1800,
    "penalty": 450,
    "timeLimit": 160,
    "gameType": "queens",
    "gameConfig": {
      "sector": "SECTOR-23 // CROWN",
      "artworkKey": "LOGIC",
      "secondaryArtworkKey": "MONOLITH_GATE",
      "maxHints": 2,
      "clearanceCode": "NX-QUN-0450",
      "size": 8,
      "regions": [
        [
          2,
          2,
          2,
          2,
          0,
          2,
          2,
          1
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          1,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          3,
          3,
          2,
          2,
          2,
          1,
          1,
          1
        ],
        [
          3,
          2,
          2,
          2,
          2,
          2,
          4,
          1
        ],
        [
          5,
          5,
          7,
          2,
          2,
          6,
          4,
          4
        ],
        [
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6
        ],
        [
          7,
          7,
          7,
          7,
          7,
          6,
          6,
          6
        ]
      ],
      "givenQueens": []
    },
    "solutionConfig": {
      "expectedAnswer": "0,4;1,7;2,3;3,0;4,6;5,1;6,5;7,2",
      "acceptedAnswers": [
        "0,4;1,7;2,3;3,0;4,6;5,1;6,5;7,2",
        "QUEENS:8X8:SOLVED"
      ],
      "hints": [
        "HINT 01 // Find the region with the smallest cell count; its constrained footprint severely restricts candidate queen positions.",
        "HINT 02 // Track boundary overlap: observe where a colored region occupies only two squares in a row, eliminating that entire row for other regions."
      ]
    },
    "enabled": true,
    "available": true
  }
];
