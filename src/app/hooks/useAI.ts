"use client";

import { useStreamText } from "ai/react";

export function useAI() {
  return useStreamText({
    api: "/api/ai/stream",
    onFinish: ({ usage }: { usage: any }) => {
      console.log("Tokens used:", usage);
    },
  });
}
