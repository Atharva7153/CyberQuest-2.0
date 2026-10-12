# ==============================================================================
# NEXUS — THE LAST CHANCE (Cyber Quest)
# Unified Single-Container Dockerfile (Frontend + Backend + Socket.IO)
# Ideal for one-click deployment on Render as a single Web Service.
# ==============================================================================

# Stage 1: Build React (Vite) Frontend
FROM node:22-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci || npm install
COPY client/ ./
RUN npm run build

# Stage 2: Install Backend Production Dependencies
FROM node:22-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN (npm ci --omit=dev || npm install --omit=dev) && npm cache clean --force

# Stage 3: Unified Production Runtime (Express serves API + Socket.IO + React SPA)
FROM node:22-alpine AS production
WORKDIR /app/server

ENV NODE_ENV=production
ENV PORT=5050

# Copy built frontend static bundle to /app/client/dist
COPY --from=client-builder /app/client/dist /app/client/dist

# Copy backend node_modules and source code to /app/server
COPY --from=server-deps /app/server/node_modules ./node_modules
COPY server/package*.json ./
COPY server/server.js ./
COPY server/src ./src

EXPOSE 5050

HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 \
  CMD wget -qO- http://127.0.0.1:${PORT:-5050}/api/health > /dev/null || exit 1

CMD ["node", "server.js"]
