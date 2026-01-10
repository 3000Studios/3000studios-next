'use client';

import { useCallback, useState } from 'react';

interface UseCompletionResponse {
  completion: string;
  isLoading: boolean;
  complete: (prompt: string) => Promise<string | null>;
  error: Error | null;
}

/**
 * AI Completion Hook
 * Provides streaming AI completion functionality
 * TODO: Update to use latest Vercel AI SDK when available
 */
export function useAI(): UseCompletionResponse {
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const complete = useCallback(async (prompt: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const result = data.completion || data.text || '';
      setCompletion(result);

      if (process.env.NODE_ENV === 'development') {
        console.log('Tokens used:', data.usage);
      }
      return result;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error("", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    completion,
    isLoading,
    complete,
    error,
  };
}

