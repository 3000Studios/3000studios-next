/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { gitCommitAndPush } from "../helpers/git";

export async function deploySite(): Promise<string> {
  try {
    // Push to GitHub (triggers Vercel auto-deploy via GitHub Actions)
    await gitCommitAndPush("Shadow AI: Deploy trigger");

    return "Deployment triggered via GitHub Actions → Vercel";
  } catch (err: any) {
    throw new Error(`Deploy failed: ${err.message}`);
  }
}
