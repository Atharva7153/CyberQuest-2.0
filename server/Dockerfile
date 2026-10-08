# ==============================================================================
# NEXUS — THE LAST CHANCE (Cyber Quest)
# Server Multi-Stage Dockerfile (Node.js + Express + Socket.IO + Mongoose)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Install All Dependencies
# ------------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

# ------------------------------------------------------------------------------
# Stage 2: Development Runtime (Node Watch Mode)
# ------------------------------------------------------------------------------
FROM deps AS development
WORKDIR /app

COPY . .

EXPOSE 5050
CMD ["npm", "run", "dev"]

# ------------------------------------------------------------------------------
# Stage 3: Production Dependencies Only
# ------------------------------------------------------------------------------
FROM node:22-alpine AS production-deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# ------------------------------------------------------------------------------
# Stage 4: Production Runtime
# ------------------------------------------------------------------------------
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5050

COPY --from=production-deps /app/package*.json ./
COPY --from=production-deps /app/node_modules ./node_modules
COPY server.js ./server.js
COPY src ./src

EXPOSE 5050

HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 \
  CMD wget -qO- http://127.0.0.1:${PORT:-5050}/api/health > /dev/null || exit 1

CMD ["node", "server.js"]
