/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

export function isSafeCommand(command: string): boolean {
  if (!command || typeof command !== "string") {
    return false;
  }

  if (command.trim().length < 3) {
    return false;
  }

  // Check for malicious patterns
  const dangerousPatterns = [
    /rm\s+-rf/i,
    /;\s*rm\s+/i,
    /\$\(/,
    /`/,
    /eval\(/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      return false;
    }
  }

  return true;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML
    .replace(/[;`$()]/g, "") // Remove shell injection chars
    .trim();
}
