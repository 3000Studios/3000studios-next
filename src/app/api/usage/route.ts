import { Client } from "pg";

const connectionString = process.env.DATABASE_URL;

export async function GET() {
  if (!connectionString) {
    return Response.json({ error: "Database not configured" }, { status: 500 });
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();
    const { rows } = await client.query(`
      SELECT
        model,
        SUM(tokens) as tokens,
        AVG(latency_ms)::int as avg_latency
      FROM ai_usage
      GROUP BY model
    `);

    await client.end();
    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch usage stats" },
      { status: 500 }
    );
  }
}
