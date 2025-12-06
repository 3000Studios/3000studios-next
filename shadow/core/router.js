// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import shadowClient from "./shadowClient.js";
import memory from "./memory.js";

export default async function route(prompt) {
  const lower = prompt.toLowerCase();

  if (lower.includes("deploy")) {
    return shadowClient.deploy();
  }

  if (lower.includes("fix") || lower.includes("heal")) {
    return shadowClient.heal();
  }

  if (lower.includes("run")) {
    const cmd = prompt.replace(/.*run/i, "").trim();
    return shadowClient.run(cmd);
  }

  if (lower.includes("remember")) {
    const piece = prompt.split("remember")[1].trim();
    memory.write(Date.now(), piece);
    return { saved: piece };
  }

  if (lower.includes("show memory")) {
    return memory.all();
  }

  return { note: "No direct command found, sending to LLM." };
}
