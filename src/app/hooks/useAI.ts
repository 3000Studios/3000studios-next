"use client";

// Note: AI SDK v5 removed React hooks - this needs to be refactored
// import { useCompletion } from "ai/react";

export function useAI() {
  // Temporary stub until AI SDK React hooks are properly configured
  return {
    completion: '',
    complete: async (_prompt: string) => {},
    isLoading: false,
    error: null,
  };
  
  /* Original implementation - needs AI SDK v4 or separate @ai-sdk/react package
  return useCompletion({
    api: "/api/ai/stream",
    onFinish: ({ usage }: { usage: any }) => {
      console.log("Tokens used:", usage);
    },
  });
  */
}
