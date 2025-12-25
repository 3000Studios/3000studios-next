import { OpenAI } from "openai";
import { Anthropic } from "@anthropic-ai/sdk";

// Initialize OpenAI client
export const openai = {
  client: new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key",
    dangerouslyAllowBrowser: true,
  }),
  isConfigured: () => !!process.env.OPENAI_API_KEY,
};

// Initialize Anthropic client
export const anthropic = {
  client: new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || "dummy-key",
  }),
  isConfigured: () => !!process.env.ANTHROPIC_API_KEY,
};

// Dynamic import for MongoDB to avoid build issues
export const getDbClient = async () => {
  if (typeof window === "undefined") {
    const { MongoClient } = await import("mongodb");
    if (!process.env.DATABASE_URL) return null;
    return new MongoClient(process.env.DATABASE_URL);
  }
  return null;
};
