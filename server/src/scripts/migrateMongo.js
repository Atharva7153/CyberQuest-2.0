/**
 * One-command MongoDB Data Migration Script (No mongodump required!)
 *
 * Copies Teams, Challenges, Attempts, Transactions, and Event/Admin state
 * from SOURCE_MONGO_URI (current Atlas DB) to TARGET_MONGO_URI (new local MongoDB).
 *
 * Usage in Terminal from CyberQuest root:
 *   node server/src/scripts/migrateMongo.js "mongodb://127.0.0.1:27017/nexus"
 *   OR (if MongoDB is on another PC on LAN, e.g. 192.168.1.50):
 *   node server/src/scripts/migrateMongo.js "mongodb://192.168.1.50:27017/nexus"
 */

import mongoose from 'mongoose';

const DEFAULT_SOURCE_URI =
  process.env.SOURCE_MONGO_URI ||
  'mongodb+srv://atharvas7153_db_user:4VnzrL4iVyswdZEh@test.fmbuqw6.mongodb.net';

const TARGET_URI =
  process.argv[2] ||
  process.env.TARGET_MONGO_URI ||
  'mongodb://127.0.0.1:27017/nexus';

async function runMigration() {
  console.log('1. Connecting to Source DB:', DEFAULT_SOURCE_URI.replace(/:[^:@]+@/, ':****@'));
  const sourceConn = await mongoose.createConnection(DEFAULT_SOURCE_URI).asPromise();

  console.log('2. Connecting to Target Local DB:', TARGET_URI);
  const targetConn = await mongoose.createConnection(TARGET_URI).asPromise();

  const collections = await sourceConn.db.listCollections().toArray();
  console.log(`Found ${collections.length} collections to copy...`);

  for (const colInfo of collections) {
    const colName = colInfo.name;
    if (colName.startsWith('system.')) continue;

    const docs = await sourceConn.db.collection(colName).find({}).toArray();
    if (docs.length === 0) {
      console.log(` - [${colName}]: 0 documents (skipped)`);
      continue;
    }

    const targetCol = targetConn.db.collection(colName);
    let upserted = 0;
    for (const doc of docs) {
      await targetCol.replaceOne({ _id: doc._id }, doc, { upsert: true });
      upserted++;
    }
    console.log(` - [${colName}]: Copied ${upserted} documents`);
  }

  await sourceConn.close();
  await targetConn.close();
  console.log('\n✅ Migration complete! All data is now in:', TARGET_URI);
}

runMigration().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
