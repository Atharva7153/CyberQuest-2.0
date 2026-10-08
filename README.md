# NEXUS — THE LAST CHANCE (Cyber Quest)

A story-driven competitive marathon where teams compete inside an AI-controlled system called **NEXUS**.

---

## System Architecture

```text
.
├── client/                        # React + Vite + Tailwind CSS + Framer Motion + GSAP
│   ├── src/
│   │   ├── assets/                # Architectural & challenge artwork
│   │   ├── components/            # Brutalist UI modules, HUDs, Live Feed, Risk Badges
│   │   ├── games/                 # Extensible 11-game Challenge Engine & Registry
│   │   ├── hooks/                 # Real-time Socket.IO & team portal hooks
│   │   ├── layouts/               # Portal shell layouts
│   │   ├── pages/                 # Landing, Login, Dashboard, Challenge, Progress, History, Core, Display, Admin
│   │   ├── services/              # REST API clients
│   │   ├── socket/                # Socket.IO client & event contracts
│   │   └── styles/                # Editorial brutalist theme & typography
│   ├── .dockerignore
│   ├── .env.example
│   └── Dockerfile                 # Multi-stage client Dockerfile (deps -> development -> builder -> production)
├── server/                        # Node.js + Express + Socket.IO + Mongoose (Server-Authoritative)
│   ├── src/
│   │   ├── config/                # Environment, MongoDB connection, Resistance Credits economy config
│   │   ├── controllers/           # Auth, Challenge, Credit, Display, Admin controllers
│   │   ├── middleware/            # JWT auth (Team/Admin scope isolation), Rate Limiters, Error handlers
│   │   ├── models/                # Team, Challenge, ChallengeAttempt, CreditTransaction, Ability, NexusCore, AuditLog
│   │   ├── routes/                # Express API routers
│   │   ├── services/              # Authoritative Team, Challenge, Credit, Ability, Core, Display, Admin, Audit services
│   │   ├── socket/                # Authenticated Socket.IO rooms, channels & live broadcasters
│   │   ├── utils/                 # JWT, password hashing, structured logger
│   │   └── app.js
│   ├── .dockerignore
│   ├── .env.example
│   ├── server.js
│   └── Dockerfile                 # Multi-stage server Dockerfile (deps -> development -> production-deps -> production)
├── .dockerignore
├── .env.example                   # Root environment template (Local & Docker Compose)
├── docker-compose.yml             # Orchestrates client, server, and mongodb with persistent volume
└── package.json
```

---

## 1. Local Development (Without Docker)

Docker is **not** required for local development. You can run the complete application directly on your host machine using Node.js and npm.

### Prerequisites
- **Node.js**: v20+ or v22+
- **npm**: v10+
- **MongoDB**: A local `mongod` server running on port `27017` (or a MongoDB container / Atlas URI).
  - *Note*: The server also includes an automatic in-memory fallback and reconnect loop if local MongoDB is temporarily offline.

### Step 1 — Install Dependencies
From the repository root:
```bash
npm run install:all
```

### Step 2 — Configure Environment Variables
Copy the example environment templates if `.env` files are not already present:
```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Step 3 — Start Local Development Servers
Run both the backend (`http://localhost:5050`) and frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Or run them in separate terminals:
```bash
# Terminal 1 — Backend API & Socket.IO Server (http://localhost:5050)
npm run dev:server

# Terminal 2 — React + Vite Frontend (http://localhost:5173)
npm run dev:client
```

### Default Seeded Credentials
- **Team Operatives (`/login`)**:
  - Team ID: `TEAM-CIPHER` | Password: `NEXUS-2026`
  - Team ID: `TEAM-VANGUARD` | Password: `NEXUS-2026`
- **Admin / Volunteer Control (`/admin`)**:
  - Operator ID: `ADMIN-NEXUS` | Password: `NEXUS-ADMIN-2026` (Role: `ADMIN`)
  - Operator ID: `VOLUNTEER-01` | Password: `NEXUS-VOL-2026` (Role: `VOLUNTEER`)

---

## 2. Docker Development & Production (`docker compose`)

The complete system (`client`, `server`, `mongodb`) is containerized using multi-stage `Dockerfile`s and orchestrated via [`docker-compose.yml`](file:///Users/atharvasharna/Desktop/CyberQuest/docker-compose.yml).

### Start the Complete System
From the repository root:
```bash
# 1. Ensure .env exists (optional — docker-compose.yml also provides sensible defaults)
cp -n .env.example .env

# 2. Build and start React client, Node server, and MongoDB
docker compose up --build
```

Or run in detached background mode:
```bash
docker compose up --build -d
```

### Container Services & Ports
| Service | Container Name | Host URL / Port | Description |
| :--- | :--- | :--- | :--- |
| **`client`** | `nexus-client` | `http://localhost:5173` | Multi-stage React + Vite frontend (`builder` compiles `/app/dist`, `production` serves on `:5173`) |
| **`server`** | `nexus-server` | `http://localhost:5050` | Multi-stage Node.js + Express + Socket.IO authoritative backend (`GET /api/health`) |
| **`mongodb`** | `nexus-mongodb` | `mongodb://127.0.0.1:27017` | MongoDB 7 server backed by persistent Docker volume `nexus_mongodb_data` (`/data/db`) |

### Switch Between Production and Hot-Reload Development Target in Docker
By default, `docker compose up --build` builds the `production` stage of both `/client/Dockerfile` and `/server/Dockerfile`. To run the `development` target inside Docker:
```bash
DOCKER_BUILD_TARGET=development docker compose up --build
```

### Stop Containers (Preserving Database Data)
```bash
docker compose down
```

---

## 3. MongoDB Compass Connection (GUI Database Inspection)

> **Important Distinction**:
> **MongoDB Compass is a desktop GUI (Graphical User Interface) for inspecting and querying MongoDB.**
> **It is NOT the database server itself.**
> The actual MongoDB database server runs either inside the `nexus-mongodb` Docker container (`mongo:7`) or as a local `mongod` service on your machine.

### Connecting MongoDB Compass to the Database
Because [`docker-compose.yml`](file:///Users/atharvasharna/Desktop/CyberQuest/docker-compose.yml) maps host port `27017` to container port `27017` (`"27017:27017"`), you can inspect the live database at any time using **MongoDB Compass**:

1. Ensure the MongoDB server is running (either via `docker compose up` or local `mongod`).
2. Open **MongoDB Compass** on your computer.
3. Paste the following connection URI into the **New Connection** field:
   ```text
   mongodb://127.0.0.1:27017/nexus
   ```
4. Click **Connect**.
5. Expand the **`nexus`** database to inspect the live server-authoritative collections:
   - `teams` — Team state, credits, members, risk telemetry, active sessions, and Core progress
   - `challenges` — Challenge Market definitions, risks, costs, rewards, and `solutionConfig`
   - `challengeAttempts` — Complete attempt ledger (`attemptNumber`, `costPaid`, `rewardPenaltyDelta`, `submission`, `result`, `timestamp`)
   - `creditTransactions` — Immutable ledger of all Resistance Credit transactions
   - `abilities` — Configurable tactical ability definitions
   - `nexusCores` — Authoritative NEXUS Core state (`LOCKED`, `AVAILABLE`, `ACTIVE`, `COMPLETED`) and winner proclamation
   - `auditLogs` — Phase 15 security audit log (`LOGIN`, `PURCHASE`, `START`, `SUBMISSION`, `SUCCESS`, `FAILURE`, `ABILITY`, `HINT`, `EXTRA_TIME`, `ADMIN_ACTION`)

*(Note: While the `server` container inside Docker connects via the internal bridge hostname `mongodb://mongodb:27017/nexus`, MongoDB Compass runs on your host OS and therefore connects via `mongodb://127.0.0.1:27017/nexus`.)*

---

## 4. Environment Variables

Environment templates are provided in:
- [`/.env.example`](file:///Users/atharvasharna/Desktop/CyberQuest/.env.example) (Root / Docker Compose)
- [`/server/.env.example`](file:///Users/atharvasharna/Desktop/CyberQuest/server/.env.example) (Backend Server)
- [`/client/.env.example`](file:///Users/atharvasharna/Desktop/CyberQuest/client/.env.example) (Frontend Client)

| Variable | Local Default | Docker Compose Default | Description |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | `development` | `production` | Runtime environment (`development` or `production`) |
| `PORT` | `5050` | `5050` | Express & Socket.IO server port |
| `CLIENT_PORT` | `5173` | `5173` | Host port mapped to the `client` container |
| `MONGO_PORT` | `27017` | `27017` | Host port mapped to the `mongodb` container |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/nexus` | `mongodb://mongodb:27017/nexus` | MongoDB connection URI used by the backend server |
| `DOCKER_MONGO_URI` | — | `mongodb://mongodb:27017/nexus` | Internal Docker network MongoDB URI for `nexus-server` |
| `DOCKER_BUILD_TARGET` | — | `production` | Multi-stage Dockerfile target (`production` or `development`) |
| `CLIENT_URL` | `http://localhost:5173` | `http://localhost:5173` | Allowed frontend origin for Express & Socket.IO CORS |
| `SOCKET_URL` | `http://localhost:5050` | `http://localhost:5050` | Socket.IO server endpoint |
| `VITE_API_BASE_URL` | `http://localhost:5050` | `http://localhost:5050` | Base URL for frontend REST API calls |
| `VITE_SOCKET_URL` | `http://localhost:5050` | `http://localhost:5050` | Base URL for frontend Socket.IO client connections |
| `DOCKER_API_TARGET` | `http://localhost:5050` | `http://server:5050` | Internal Vite proxy target for `/api` and `/socket.io` |
| `JWT_SECRET` | `nexus_core_authoritative_secret_key_2026` | `nexus_core_authoritative_secret_key_2026` | Secret key used to sign & verify Team and Admin JWTs |
| `JWT_EXPIRES_IN` | `8h` | `8h` | JWT expiration window |
| `STARTING_CREDITS` | `1250` | `1250` | Default starting Resistance Credits for seeded teams |
| `CREDIT_COST_HINT` | `100` | `100` | Default Resistance Credit cost to decrypt a hint |
| `CREDIT_COST_EXTRA_TIME` | `150` | `150` | Default Resistance Credit cost to purchase extra time |
| `CREDIT_REATTEMPT_MULTIPLIER` | `1.25` | `1.25` | Server-calculated cost multiplier for challenge reattempts |

---

## 5. Database Reset Procedures

You can reset the database and arena state to its clean initial baseline in three ways:

### Method A — Via the Admin Control Panel UI (`/admin/settings`)
1. Open `http://localhost:5173/admin/settings` and sign in as `ADMIN-NEXUS` (`NEXUS-ADMIN-2026`).
2. Click **EXECUTE FULL ARENA RESET**.
3. This resets all seeded teams, clears active challenge attempts, resets the NEXUS Core to `LOCKED`, clears rate-limit buckets, and broadcasts the clean state across all connected Socket.IO clients.

### Method B — Via Docker Compose Volume Reset (Full Container + Volume Wipe)
To completely destroy and recreate the persistent `nexus_mongodb_data` Docker volume:
```bash
# Stop containers and remove the persistent MongoDB volume
docker compose down -v

# Or using the root npm script:
npm run docker:reset

# Start fresh (server automatically re-seeds default teams, challenges, abilities, and Core config on boot)
docker compose up --build
```

### Method C — Via MongoDB Compass or `mongosh`
Drop the `nexus` database in MongoDB Compass or run:
```bash
mongosh mongodb://127.0.0.1:27017/nexus --eval "db.dropDatabase()"
```
Then restart the backend server (`npm run dev:server` or `docker compose restart server`) to automatically re-seed baseline data.

---

## 6. Build & Verification Commands

### Frontend Production Build
```bash
# From root directory (compiles client/dist via Vite)
npm run build

# Preview production bundle locally on http://localhost:5173
npm run preview
```

### Docker Image & Compose Builds
```bash
# Validate docker-compose configuration
docker compose config

# Build all multi-stage service images without starting containers
docker compose build

# Build and start all services (client, server, mongodb)
docker compose up --build

# View live container logs
docker compose logs -f
```
