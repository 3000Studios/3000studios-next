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

export async function enforceCostLimit(
  userId: string,
  tokensRequested: number
) {
  const db = await getClient();
  if (!db) return; // Fail open if DB is down, or throw? Defaulting to safe behavior for now.

  const { rows } = await db.query(
    `
    SELECT
      monthly_token_limit,
      COALESCE(SUM(tokens), 0) AS used
    FROM ai_cost_limits l
    LEFT JOIN ai_usage u ON u.user_id = l.user_id
    WHERE l.user_id = $1
    GROUP BY monthly_token_limit
    `,
    [userId]
  );

  if (!rows.length) return; // No limit set for user

  const { monthly_token_limit, used } = rows[0];

  if (used + tokensRequested > monthly_token_limit) {
    throw new Error("AI usage limit exceeded");
  }
}
