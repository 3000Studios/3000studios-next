// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import { useLLMFusionCore } from "@/brain/llmFusionCore";

export default function ShadowSubtitle() {
  const { history } = useLLMFusionCore();
  const last = history[history.length - 1];
  if (!last || last.role !== "assistant") return null;

  return (
    <div className="absolute bottom-6 w-full flex justify-center">
      <div className="bg-black/60 text-white px-4 py-2 rounded-xl text-lg">
        {last.content}
      </div>
    </div>
  );
}