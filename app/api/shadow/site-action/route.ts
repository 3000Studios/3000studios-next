/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function POST(req: Request): Promise<Response> {
  const { action, target, content } = await req.json();

  try {
    // Action: Update any file in this repo
    if (action === "update_file") {
      const absolute = path.join(process.cwd(), target);

      fs.mkdirSync(path.dirname(absolute), { recursive: true });
      fs.writeFileSync(absolute, content);

      return NextResponse.json({
        success: true,
        action,
        target,
      });
    }

    // Action: Trigger Git Push
    if (action === "push") {
      const repo = process.cwd();

      const commands = [
        `cd ${repo}`,
        "git add .",
        `git commit -m \"Shadow Commit $(date +%s)\"`,
        "git push origin main",
      ].join(" && ");

      return new Promise<Response>((resolve) => {
        exec(commands, (err, stdout, stderr) => {
          resolve(
            NextResponse.json({
              success: !err,
              action: "push",
              stdout,
              stderr,
            })
          );
        });
      });
    }

    // Unknown action
    return NextResponse.json({
      success: false,
      error: "Invalid action type",
    });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      error: e.message,
    });
  }
}
