"use client";

import { useCompletion } from "ai/react";

export function useAI() {
  return useCompletion({
    api: "/api/ai/stream",
    onFinish: ({ usage }: { usage: any }) => {
      console.log("Tokens used:", usage);
    },
  });
}
