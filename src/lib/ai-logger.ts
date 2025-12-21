export function logAIEvent(event: {
  model: string;
  tokens?: any;
  latencyMs: number;
  error?: string;
}) {
  console.log("[AI EVENT]", {
    ...event,
    timestamp: new Date().toISOString(),
  });
}
