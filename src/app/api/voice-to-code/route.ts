/**
 * Voice-to-Code API Route
 * Converts natural language commands into actionable code changes
 * Uses OpenAI to parse intent and generate code patches
 * NOW SUPPORTS: File System Writes (fs/promises)
 */

import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// Lazy-load OpenAI dynamically
let openaiInstance: any = null;

async function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiInstance) {
    try {
      const { default: OpenAI } = await import("openai");
      openaiInstance = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    } catch {
      return null;
    }
  }
  return openaiInstance;
}

interface VoiceInput {
  transcript?: string;
  audio?: string;
  prompt?: string;
  currentContext?: string;
  action?: "preview" | "commit" | "deploy";
  patches?: CodePatch[]; // For commit action
}

interface CodePatch {
  file: string;
  description: string;
  oldCode: string; // Used for fuzzy matching verification
  newCode: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { audio, prompt, action, context, language } = body;

    // Step 1: Transcribe audio if provided
    let textPrompt = prompt;
    if (audio) {
      textPrompt = await transcribeAudio(audio);
    }

    if (!textPrompt) {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400 }
      );
    }

    // Step 2: Generate code from prompt
    const codeResult = await generateCode({
      prompt: textPrompt,
      language,
      context,
    });

    // Step 3: Handle different actions
    switch (action) {
      case 'preview':
        // Return code for preview only
        return NextResponse.json({
          success: true,
          preview: codeResult.preview,
          code: codeResult.code,
          explanation: codeResult.explanation,
          transcription: audio ? textPrompt : undefined,
        });

    return NextResponse.json({
      success: true,
      ...parsed,
      action: "preview",
    });
  } catch (error) {
    console.error('Voice-to-code API error:', error);
    return NextResponse.json(
<<<<<<< HEAD
      { error: 'Failed to process voice command' },
=======
      { error: "Internal Server Error" },
>>>>>>> origin/copilot/resolve-git-conflicts
      { status: 500 }
    );
  }
}
<<<<<<< HEAD
=======

async function applyPatches(patches: CodePatch[]) {
  const results = [];

  for (const patch of patches) {
    try {
      // Safety Check: Only allow writes to src/
      const cleanPath = path
        .normalize(patch.file)
        .replace(/^(\.\.(\/|\\|$))+/, "");
      if (!cleanPath.startsWith("src/") && !cleanPath.startsWith("src\\")) {
        throw new Error("Invalid file path. Must be in src/");
      }

      const activePath = path.join(process.cwd(), cleanPath);

      // Check if file exists
      try {
        await fs.access(activePath);
      } catch {
        throw new Error(`File not found: ${cleanPath}`);
      }

      const currentContent = await fs.readFile(activePath, "utf8");

      // Replace Strategy: Simple string replace (could be improved with fuzzy match or AST)
      // We use replaceAll to handle multiple occurrences if intended, or just first.
      // For safety, let's assume unique code blocks or simple replace.

      if (!currentContent.includes(patch.oldCode)) {
        // Try relaxed matching (trim whitespace)
        // This is a naive implementation; a real system would use a better patcher.
        throw new Error(
          `Target code not found in ${cleanPath}. Content matching failed.`
        );
      }

      const newContent = currentContent.replace(patch.oldCode, patch.newCode);
      await fs.writeFile(activePath, newContent, "utf8");
      results.push({ file: cleanPath, status: "success" });
    } catch (err: any) {
      results.push({ file: patch.file, status: "error", error: err.message });
    }
  }

  return NextResponse.json({
    success: true,
    action: "commit",
    results,
  });
}
>>>>>>> origin/copilot/resolve-git-conflicts
