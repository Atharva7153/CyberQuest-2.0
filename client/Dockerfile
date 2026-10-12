# ==============================================================================
# NEXUS — THE LAST CHANCE (Cyber Quest)
# Client Multi-Stage Dockerfile (React + Vite + Tailwind CSS + GSAP + Socket.IO)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Install Dependencies
# ------------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

# ------------------------------------------------------------------------------
# Stage 2: Development Runtime (Vite Dev Server with HMR)
# ------------------------------------------------------------------------------
FROM deps AS development
WORKDIR /app

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ------------------------------------------------------------------------------
# Stage 3: Production Builder (Compiles Optimized Static Assets into /app/dist)
# ------------------------------------------------------------------------------
FROM deps AS builder
WORKDIR /app

ARG TESTING=false
ARG CLIENT_URL=http://localhost:5173
ARG SOCKET_URL=http://localhost:5050
ARG VITE_API_BASE_URL=http://localhost:5050
ARG VITE_SOCKET_URL=http://localhost:5050
ARG CLOUDFLARE_URL=
ARG CLOUDFLARE_CLIENT_URL=
ARG CLOUDFLARE_API_URL=
ARG CLOUDFLARE_SOCKET_URL=
ARG VITE_CLOUDFLARE_URL=

ENV TESTING=${TESTING}
ENV CLIENT_URL=${CLIENT_URL}
ENV SOCKET_URL=${SOCKET_URL}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}
ENV CLOUDFLARE_URL=${CLOUDFLARE_URL}
ENV CLOUDFLARE_CLIENT_URL=${CLOUDFLARE_CLIENT_URL}
ENV CLOUDFLARE_API_URL=${CLOUDFLARE_API_URL}
ENV CLOUDFLARE_SOCKET_URL=${CLOUDFLARE_SOCKET_URL}
ENV VITE_CLOUDFLARE_URL=${VITE_CLOUDFLARE_URL}

COPY . .
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 4: Production Runtime (Serves Compiled Bundle + API/Socket Proxy on 5173)
# ------------------------------------------------------------------------------
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/vite.config.js ./vite.config.js
COPY --from=builder /app/dist ./dist

EXPOSE 5173

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5173/ > /dev/null || exit 1

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
