/**
 * Bulk Team Importer from CSV
 *
 * Usage:
 *   node server/src/scripts/importTeams.js [path/to/teams.csv] [--update]
 *
 * Example CSV format:
 *   Team Name,Name,Team_id,Password,Email
 *   Haze.exe,Aiman Fatema Khwaja,haze_exe,vR8yK2mP9x,khwajaaiman@gmail.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Team } from '../models/Team.js';
import { AdminService } from '../services/adminService.js';
import { hashPassword } from '../utils/password.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse CSV text into objects
function parseCSV(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('#'));

  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row.');
  }

  const headerLine = lines[0];
  let delimiter = ',';
  if (headerLine.includes('\t')) delimiter = '\t';
  else if (headerLine.includes(';') && !headerLine.includes(',')) delimiter = ';';

  const splitLine = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const rawHeaders = splitLine(headerLine).map((h) =>
    h.toLowerCase().replace(/[\s_-]+/g, '')
  );

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = splitLine(lines[i]);
    if (values.every((v) => !v)) continue;

    const row = {};
    rawHeaders.forEach((header, idx) => {
      row[header] = values[idx] || '';
    });
    rows.push(row);
  }

  return rows;
}

// Normalize field mapping
function extractTeamData(row) {
  const teamId =
    row.teamid ||
    row['team-id'] ||
    row.team_id ||
    row.team ||
    row.id ||
    '';

  const password =
    row.password ||
    row.pass ||
    row.accesspassword ||
    row.pwd ||
    '';

  const teamName =
    row.teamname ||
    row['team-name'] ||
    row.team_name ||
    '';

  const leadName =
    row.name ||
    row.leadname ||
    row['lead-name'] ||
    row.lead ||
    '';

  const email =
    row.email ||
    row.mail ||
    '';

  const credits =
    row.credits ||
    row.initialcredits ||
    row['initial-credits'] ||
    '';

  const membersRaw =
    row.members ||
    row.players ||
    '';

  let members = [];
  if (membersRaw) {
    members = membersRaw.split(/[;|]/).map((m) => m.trim()).filter(Boolean);
  } else if (leadName) {
    members = [
      { memberId: 'OP-01', name: leadName.toUpperCase(), role: 'LEAD' },
      { memberId: 'OP-02', name: 'PLAYER 2', role: 'OPERATIVE' },
      { memberId: 'OP-03', name: 'PLAYER 3', role: 'OPERATIVE' },
      { memberId: 'OP-04', name: 'PLAYER 4', role: 'OPERATIVE' },
    ];
  }

  return {
    teamId,
    password,
    teamName: teamName || leadName || teamId,
    leadName,
    email,
    credits,
    members,
  };
}

async function run() {
  const args = process.argv.slice(2);
  const allowUpdate = args.includes('--update') || args.includes('-u');
  const fileArg = args.find((a) => !a.startsWith('-'));

  // Search candidate paths
  const candidatePaths = [
    fileArg,
    path.resolve(process.cwd(), 'teams.csv'),
    path.resolve(process.cwd(), 'server/teams.csv'),
    path.resolve(__dirname, '../../../teams.csv'),
  ].filter(Boolean);

  let targetFilePath = null;
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      targetFilePath = p;
      break;
    }
  }

  if (!targetFilePath) {
    console.error('❌ CSV file not found.');
    console.error('Please specify a CSV file path:');
    console.error('   node server/src/scripts/importTeams.js <path/to/teams.csv>');
    console.error('\nExpected header format: Team Name,Name,Team_id,Password,Email');
    process.exit(1);
  }

  console.log(`\n📂 Reading CSV file: ${targetFilePath}`);
  const csvContent = fs.readFileSync(targetFilePath, 'utf8');
  const parsedRows = parseCSV(csvContent);

  if (!parsedRows.length) {
    console.error('❌ No rows found in CSV file.');
    process.exit(1);
  }

  console.log(`🔍 Found ${parsedRows.length} team entries to process.`);

  // Connect to MongoDB
  console.log(`⚡ Connecting to MongoDB...`);
  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log(`✅ MongoDB connected successfully.\n`);

  const results = {
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    details: [],
  };

  for (let idx = 0; idx < parsedRows.length; idx++) {
    const rawRow = parsedRows[idx];
    const { teamId, password, teamName, leadName, email, credits, members } = extractTeamData(rawRow);

    if (!teamId || !password) {
      console.warn(`⚠️ Row ${idx + 1}: Missing team-id or password (teamId: "${teamId}", password: "${password}"). Skipping.`);
      results.failed++;
      results.details.push({
        teamId: teamId || `ROW-${idx + 1}`,
        status: 'FAILED (Missing ID or Password)',
      });
      continue;
    }

    const cleanTeamId = String(teamId).trim().toUpperCase();
    const cleanPassword = String(password).trim();
    const cleanName = teamName ? String(teamName).trim() : cleanTeamId.replace(/^TEAM[-_]/i, '') || cleanTeamId;

    try {
      const existing = await Team.findOne({ teamId: cleanTeamId });

      if (existing) {
        if (allowUpdate) {
          const passHash = await hashPassword(cleanPassword);
          existing.passwordHash = passHash;
          existing.accessPassword = cleanPassword;
          if (cleanName) existing.teamName = cleanName;
          if (leadName) existing.leadName = leadName;
          if (email) existing.email = email;
          if (credits && !isNaN(Number(credits))) {
            existing.credits = Number(credits);
          }
          if (Array.isArray(members) && members.length > 0) {
            existing.members = members;
          }
          await existing.save();
          results.updated++;
          results.details.push({
            teamId: cleanTeamId,
            teamName: existing.teamName,
            status: 'UPDATED (Password/Info refreshed)',
          });
          console.log(`🔄 [UPDATED] Team: ${cleanTeamId} (Password & details updated)`);
        } else {
          results.skipped++;
          results.details.push({
            teamId: cleanTeamId,
            teamName: existing.teamName,
            status: 'SKIPPED (Already exists, pass --update to overwrite)',
          });
          console.log(`⏩ [SKIPPED] Team: ${cleanTeamId} (Already registered)`);
        }
      } else {
        // Register new team via AdminService
        await AdminService.registerTeam(
          {
            teamId: cleanTeamId,
            teamName: cleanName,
            password: cleanPassword,
            leadName,
            email,
            teamSize: 4,
            initialCredits: credits ? Number(credits) : undefined,
            members,
          },
          'CSV_IMPORT'
        );

        results.created++;
        results.details.push({
          teamId: cleanTeamId,
          teamName: cleanName,
          leadName,
          status: 'CREATED',
        });
        console.log(`✨ [CREATED] ${cleanTeamId.padEnd(20)} | Name: ${cleanName.padEnd(24)} | Lead: ${leadName || 'N/A'}`);
      }
    } catch (err) {
      console.error(`❌ Error importing [${cleanTeamId}]:`, err.message);
      results.failed++;
      results.details.push({
        teamId: cleanTeamId,
        status: `FAILED (${err.message})`,
      });
    }
  }

  console.log('\n================ IMPORT SUMMARY ================');
  console.log(` Total Read:    ${parsedRows.length}`);
  console.log(` ✨ Created:     ${results.created}`);
  console.log(` 🔄 Updated:     ${results.updated}`);
  console.log(` ⏩ Skipped:     ${results.skipped}`);
  console.log(` ❌ Failed:      ${results.failed}`);
  console.log('================================================\n');

  await mongoose.disconnect();
  console.log('🔒 Database connection closed. Done!');
}

run().catch((err) => {
  console.error('Fatal import error:', err);
  process.exit(1);
});
