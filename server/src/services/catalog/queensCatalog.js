/**
 * Auto-reduced Master Catalog (225 Challenges)
 * Balanced difficulty distribution (LOW, MODERATE, HIGH, EXTREME).
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
  }
];
