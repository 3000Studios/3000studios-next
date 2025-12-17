import { Client } from "pg";

// Ensure we have a database URL
const connectionString = process.env.DATABASE_URL;

let client: Client | null = null;

async function getClient() {
  if (!client) {
    if (!connectionString) {
      console.warn("DATABASE_URL is not set. Metrics logging will fail.");
      return null;
    }
    client = new Client({ connectionString });
    await client.connect();
  }
  return client;
}

export async function logUsage(data: {
  model: string;
  tokens: number;
  latencyMs: number;
}) {
  const db = await getClient();
  if (!db) return;

  await db.query(
    `
    INSERT INTO ai_usage (model, tokens, latency_ms)
    VALUES ($1, $2, $3)
    `,
    [data.model, data.tokens, data.latencyMs]
  );
}
