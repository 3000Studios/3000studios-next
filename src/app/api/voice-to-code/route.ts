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
    const body = (await request.json()) as VoiceInput;
    const { transcript, audio, prompt, currentContext, action, patches } = body;

    // --- CASE 1: COMMIT (Apply patches) ---
    if (action === "commit" && patches && patches.length > 0) {
      return await applyPatches(patches);
    }

    // --- CASE 2: PREVIEW (Generate patches) ---
    const userInput = transcript || prompt;
    let finalTranscript = userInput || "";

    // Transcribe if Audio
    if (audio && process.env.OPENAI_API_KEY) {
      try {
        const audioBuffer = Buffer.from(audio, "base64");
        const audioFile = new File([audioBuffer], "audio.webm", {
          type: "audio/webm",
        });
        const openai = await getOpenAI();
        if (openai) {
          const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: "whisper-1",
          });
          finalTranscript = transcription.text;
        }
      } catch (err) {
        console.error("Transcription failed", err);
      }
    }

    if (!finalTranscript) {
      return NextResponse.json({ error: "No input detected" }, { status: 400 });
    }

    // Fallback Demo Response
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        intent: "Demo Mode (No API Key)",
        description:
          "This is a simulation. Add OPENAI_API_KEY to .env for real AI code generation.",
        patches: [
          {
            file: "src/app/page.tsx",
            description: "Mock change: Update homepage title",
            oldCode: 'const title = "Welcome";',
            newCode: 'const title = "Welcome to the Future";',
          },
        ],
        action: "preview",
      });
    }

    // OpenAI Generation
    const openai = await getOpenAI();
    const systemPrompt = `You are an expert Next.js developer. 
    Convert requests into file patches.
    - TARGET ONLY files in 'src/'.
    - RESPOND AS JSON: 
    {
      "intent": "summary",
      "description": "details",
      "patches": [{ "file": "src/path/to/file.tsx", "description": "...", "oldCode": "exact string to find", "newCode": "string to replace with" }]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Request: ${finalTranscript}\nContext: ${
            currentContext || "Next.js App"
          }`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(completion.choices[0].message.content || "{}");

>>>>>>> origin/copilot/update-main-with-all-branches
    return NextResponse.json({
      success: true,
      ...parsed,
      action: "preview",
    });
>>>>>>> origin/copilot/update-main-with-all-branches
  } catch (error) {
    console.error("Voice API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
=======
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
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
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
