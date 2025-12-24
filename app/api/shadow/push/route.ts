/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";
import { exec, execFile } from "child_process";

export async function POST(): Promise<Response> {
  const repo = process.cwd();
  const commitMessage = `Shadow Auto-Push ${Date.now()}`;

  return new Promise<Response>((resolve) => {
    let combinedStdout = "";
    let combinedStderr = "";

    const runGitCommand = (
      args: string[],
      callback: (error: Error | null) => void,
    ) => {
      execFile("git", args, { cwd: repo }, (error, stdout, stderr) => {
        if (stdout) {
          combinedStdout += stdout;
        }
        if (stderr) {
          combinedStderr += stderr;
        }
        callback(error);
      });
    };

    runGitCommand(["add", "."], (addError) => {
      if (addError) {
        resolve(
          NextResponse.json({
            success: false,
            stdout: combinedStdout,
            stderr: combinedStderr,
            error: addError.message,
          }),
        );
        return;
      }

      runGitCommand(["commit", "-m", commitMessage], (commitError) => {
        if (commitError) {
          resolve(
            NextResponse.json({
              success: false,
              stdout: combinedStdout,
              stderr: combinedStderr,
              error: commitError.message,
            }),
          );
          return;
        }

        runGitCommand(["push", "origin", "main"], (pushError) => {
          resolve(
            NextResponse.json({
              success: !pushError,
              stdout: combinedStdout,
              stderr: combinedStderr,
              error: pushError ? pushError.message : null,
            }),
          );
        });
      });
    });
  });
}
