"use client";

import { useState, useCallback } from "react";

export interface UseCompletionResponse {
  completion: string;
  isLoading: boolean;
  error: Error | null;
  complete: (prompt: string) => Promise<string>;
}

export function useAI(): UseCompletionResponse {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const complete = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.completion || data.text || "";
      setCompletion(text);
      return text;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { completion, isLoading, error, complete };
}
