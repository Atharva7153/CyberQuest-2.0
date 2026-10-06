# NEXUS — THE LAST CHANCE (Cyber Quest)

A story-driven competitive marathon where teams compete inside an AI-controlled system called **NEXUS**.

---

## Project Architecture

```text
.
├── client/                  # React + Vite + React Router + Tailwind CSS
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── socket/
│   │   └── styles/
│   └── Dockerfile
├── server/                  # Node.js + Express + Socket.IO + Mongoose
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   └── Dockerfile
├── docker-compose.yml       # Container orchestration (client, server, mongodb)
└── .env.example             # Environment variable template
```

---

## 1. Local Development Setup (Without Docker)

Docker is **not** required for local development. You can run the entire stack directly with Node.js and npm.

### Prerequisites
- **Node.js** (v20+ / v22+ recommended)
- **npm** (v10+)
- **MongoDB** (local `mongod` instance or MongoDB Atlas connection URI)

### Install Dependencies
From the root directory:
```bash
npm run install:all
```

### Start Development Servers
Run both the frontend and backend concurrently from the root folder:
```bash
npm run dev
```

Or run each service in separate terminals:
```bash
# Terminal 1 — Backend Server (http://localhost:5050)
npm run dev:server

# Terminal 2 — Frontend Client (http://localhost:5173)
npm run dev:client
```

### Verify Health Check
```bash
curl http://localhost:5050/api/health
```
Expected response includes:
```json
{
  "status": "ok",
  "service": "cyber-quest-server"
}
```

---

## 2. Docker Setup

The repository is fully container-ready with `/client/Dockerfile`, `/server/Dockerfile`, and `/docker-compose.yml`. Once Docker Desktop / Docker Engine is installed, you can spin up `client`, `server`, and `mongodb` (with a persistent volume) using a single command:

```bash
# Copy environment template if .env does not exist
cp .env.example .env

# Build and start all containers (client, server, mongodb)
docker compose up --build
```

To run in detached mode or stop containers:
```bash
docker compose up -d
docker compose down
```

### Services in `docker-compose.yml`
- **`client`**: React + Vite dev server exposed on `http://localhost:5173`
- **`server`**: Express + Socket.IO server exposed on `http://localhost:5050`
- **`mongodb`**: MongoDB 7 instance exposed on `localhost:27017` backed by the persistent `mongodb_data` Docker volume

---

## 3. Environment Variables

Copy `.env.example` to `.env` (and/or `server/.env` and `client/.env` for local runs). **Never commit real `.env` files or credentials.**

| Variable | Default (Local) | Default (Docker Compose) | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `5050` | `5050` | Port for the Express & Socket.IO server |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/nexus` | `mongodb://mongodb:27017/nexus` | MongoDB connection string |
| `CLIENT_URL` | `http://localhost:5173` | `http://localhost:5173` | Frontend origin allowed by Express & Socket.IO CORS |
| `SOCKET_URL` | `http://localhost:5050` | `http://localhost:5050` | Socket.IO server URL consumed by the client |

---

## 4. MongoDB Setup

The backend uses **Mongoose** (`server/src/config/db.js`) to manage the MongoDB connection:
- **Local MongoDB / MongoDB Compass**: Connect Compass to `mongodb://127.0.0.1:27017/nexus`.
- **Resilient Boot**: If MongoDB is temporarily offline when starting local development, the Express and Socket.IO server still boots cleanly and automatically retries the database connection every 10 seconds.
- **Planned Domain Collections** (`server/src/models/index.js`):
  - `teams`
  - `players`
  - `challenges`
  - `challengeAttempts`
  - `teamEvents`

---

## 5. Socket.IO Setup

Real-time bidirectional communication is initialized in `server/src/socket/index.js`, with event contracts in `server/src/socket/socketEvents.js` and room/channel handlers in `server/src/socket/channels.js`.

### Supported Real-Time Event Domains
- **System / Diagnostics**: `nexus:welcome`, `nexus:ping`, `nexus:pong`, `nexus:telemetry`, `nexus:terminals`
- **Team Joining & State**: `team:join`, `team:joined`, `team:leave`, `team:state:update` (scoped to `room:team:<teamId>`)
- **Challenge Updates**: `challenge:update`, `challenge:unlock`, `challenge:status:change`
- **Timer Updates**: `timer:sync`, `timer:update`, `timer:expired`
- **Credits Updates**: `credits:update`, `credits:transaction`
- **Submission Events**: `submission:submit`, `submission:received`, `submission:result`
- **Ability Events**: `ability:activate`, `ability:effect`, `ability:cooldown`
- **Core (AI Overlord) Events**: `core:directive`, `core:broadcast`, `core:anomaly`
- **Leaderboard Events**: `leaderboard:subscribe`, `leaderboard:update`, `leaderboard:snapshot`
