"use client";

// TODO: Migrate to AI SDK v5 compatible hooks or install @ai-sdk/react package
// Timeline: Q1 2025 - AI SDK v5 removed React hooks from the core package
// The hooks are now in a separate @ai-sdk/react package or use the streamText API directly
// See: https://sdk.vercel.ai/docs/migration

export function useAI() {
  // Temporary stub until AI SDK React hooks are properly configured
  return {
    completion: '',
    complete: async (_prompt: string) => {},
    isLoading: false,
    error: null,
  };
  
  /* Original implementation - requires @ai-sdk/react package
  import { useCompletion } from "@ai-sdk/react";
  
  return useCompletion({
    api: "/api/ai/stream",
    onFinish: ({ usage }: { usage: any }) => {
      console.log("Tokens used:", usage);
    },
  });
  */
}
