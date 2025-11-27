/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export function readFile(relativePath: string): string {
  const fullPath = join(process.cwd(), relativePath);
  
  if (!existsSync(fullPath)) {
    throw new Error(`File not found: ${relativePath}`);
  }
  
  return readFileSync(fullPath, "utf8");
}

export function writeFile(relativePath: string, content: string): void {
  const fullPath = join(process.cwd(), relativePath);
  writeFileSync(fullPath, content, "utf8");
}

export function fileExists(relativePath: string): boolean {
  const fullPath = join(process.cwd(), relativePath);
  return existsSync(fullPath);
}
