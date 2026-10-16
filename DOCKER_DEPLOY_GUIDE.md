# NEXUS (CyberQuest) — Docker Distribution & Execution Guide

This guide explains how to load and run the CyberQuest containerized project using the provided Docker archive.

---

## 📦 What Files Are Provided

1. **`cyberquest-full-bundle.tar`** *(Recommended)*
   - Contains **both** `cyberquest:latest` (unified frontend + backend) and `mongo:7` (database).
   - Completely standalone — works with **zero internet connection required**.
   - Size: ~338 MB.

2. **`cyberquest-app.tar`** *(Lightweight)*
   - Contains only the `cyberquest:latest` image.
   - Ideal if the target system already has MongoDB or internet access to pull `mongo:7`.
   - Size: ~65 MB.

3. **`docker-compose.standalone.yml`**
   - Single command deployment script with persistent volume and automatic healthchecks.

---

## 🚀 Quick Start (Easiest Method: Docker Compose)

### Step 1: Load the Docker Image(s)
Open your terminal in the directory where you received the files and run:

```bash
docker load -i cyberquest-full-bundle.tar
```
*(If you were given `cyberquest-app.tar`, run `docker load -i cyberquest-app.tar` instead).*

### Step 2: Start the System
```bash
docker compose -f docker-compose.standalone.yml up -d
```

### Step 3: Open in Browser
Visit:
👉 **`http://localhost:5050`**

---

## 🛠️ Alternative Method: Pure `docker run` (No Compose Required)

If the recipient does not use `docker compose`, they can run the system using standard Docker commands:

```bash
# 1. Create a bridge network
docker network create nexus-network

# 2. Start the MongoDB database container
docker run -d \
  --name nexus-mongodb \
  --network nexus-network \
  -p 27017:27017 \
  -v nexus_mongodb_data:/data/db \
  mongo:7

# 3. Start the CyberQuest application
docker run -d \
  --name nexus-app \
  --network nexus-network \
  -p 5050:5050 \
  -e MONGO_URI=mongodb://nexus-mongodb:27017/nexus \
  cyberquest:latest

# 4. Open in browser:
# http://localhost:5050
```

---

## 🔑 Default Seeded Credentials

### Team Portals (`/login`)
- **Team CIPHER**: Team ID: `TEAM-CIPHER` | Password: `NEXUS-2026`
- **Team VANGUARD**: Team ID: `TEAM-VANGUARD` | Password: `NEXUS-2026`

### Admin / Volunteer Control (`/admin`)
- **Master Admin**: ID: `ADMIN-NEXUS` | Password: `NEXUS-ADMIN-2026`
- **Volunteer Control**: ID: `VOLUNTEER-01` | Password: `NEXUS-VOL-2026`

---

## 🛑 How to Stop & Manage Containers

### With Docker Compose:
```bash
# Stop containers (preserves database data)
docker compose -f docker-compose.standalone.yml down

# Stop and reset database back to factory clean state
docker compose -f docker-compose.standalone.yml down -v
```

### With Pure Docker:
```bash
# Stop containers
docker stop nexus-app nexus-mongodb

# Remove containers
docker rm nexus-app nexus-mongodb
```
