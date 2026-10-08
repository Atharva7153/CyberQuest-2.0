# ==============================================================================
# NEXUS — THE LAST CHANCE (Cyber Quest)
# Unified Single-Container Dockerfile (Frontend + Backend + Socket.IO)
# Ideal for one-click deployment on Render as a single Web Service.
# ==============================================================================

# Stage 1: Build React (Vite) Frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Install Backend Production Dependencies
FROM node:20-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Stage 3: Unified Production Runtime (Express serves API + Socket.IO + React SPA)
FROM node:20-alpine AS production
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

CMD ["node", "server.js"]
