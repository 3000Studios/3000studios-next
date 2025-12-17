import { Client } from "pg";

const connectionString = process.env.DATABASE_URL;

let client: Client | null = null;

async function getClient() {
  if (!client) {
    if (!connectionString) return null;
    client = new Client({ connectionString });
    await client.connect();
  }
  return client;
}

export async function pruneMemory() {
  const db = await getClient();
  if (!db) return;

  await db.query(`
    DELETE FROM ai_memory
    WHERE
      created_at < now() - interval '30 days'
      AND access_count < 2
  `);
}
