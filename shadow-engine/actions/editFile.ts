/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { gitCommitAndPush } from "../helpers/git";

export async function editFile(
  filePath: string,
  find: string | RegExp,
  replace: string,
): Promise<boolean> {
  try {
    const fullPath = join(process.cwd(), filePath);

    // Read file
    let content = readFileSync(fullPath, "utf8");

    // Replace content
    const updated = content.replace(find, replace);

    // Write back
    writeFileSync(fullPath, updated, "utf8");

    // Auto-commit
    await gitCommitAndPush(`Shadow AI: Updated ${filePath}`);

    return true;
  } catch (err: any) {
    throw new Error(`Failed to edit ${filePath}: ${err.message}`);
  }
}
