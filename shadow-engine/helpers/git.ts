/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { execSync } from "child_process";

export async function gitCommitAndPush(message: string): Promise<void> {
  try {
    // Add all changes
    execSync("git add .", { stdio: "inherit" });

    // Commit with message
    execSync(`git commit -m "${message}"`, { stdio: "inherit" });

    // Push to main
    execSync("git push origin main", { stdio: "inherit" });
  } catch (err: any) {
    // Ignore errors if nothing to commit
    if (!err.message.includes("nothing to commit")) {
      throw new Error(`Git operation failed: ${err.message}`);
    }
  }
}

export async function getGitStatus(): Promise<string> {
  try {
    const status = execSync("git status --short", { encoding: "utf8" });
    return status || "Working tree clean";
  } catch (err: any) {
    throw new Error(`Failed to get git status: ${err.message}`);
  }
}
