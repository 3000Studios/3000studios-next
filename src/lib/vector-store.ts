import { Client } from "pg";
import { v4 as uuid } from "uuid";
import { createEmbedding } from "./embeddings";

// Ensure we have a database URL
const connectionString = process.env.DATABASE_URL;

let client: Client | null = null;

async function getClient() {
  if (!client) {
    if (!connectionString) {
      console.warn("DATABASE_URL is not set. Vector store usage will fail.");
      return null;
    }
    client = new Client({ connectionString });
    await client.connect();
  }
  return client;
}

export async function storeMemory(text: string) {
  const db = await getClient();
  if (!db) return;

  const embedding = await createEmbedding(text);

  await db.query(
    `INSERT INTO ai_memory (id, content, embedding)
     VALUES ($1, $2, $3)`,
    [uuid(), text, embedding]
  );
}

export async function recallMemory(query: string) {
  const db = await getClient();
  if (!db) return "";

  const embedding = await createEmbedding(query);

  const { rows } = await db.query(
    `
    SELECT content
    FROM ai_memory
    ORDER BY embedding <-> $1
    LIMIT 5
    `,
    [embedding]
  );

  return rows.map((r) => r.content).join("\n");
}
