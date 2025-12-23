/**
 * Voice-to-Code API Route
 * Converts voice commands to code changes with INSTANT deployment
 * Boss Man J edition - changes go LIVE immediately!
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateCode, transcribeAudio } from '@/lib/services/openai';
import { instantSync, quickCommit } from '@/lib/services/realtime-sync';

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

      case 'apply':
        // Quick commit without deploying (for batching changes)
        const filePath = body.filePath || 'src/app/generated.tsx';
        const commitResult = await quickCommit(
          filePath,
          codeResult.code,
          `Voice command: ${textPrompt.substring(0, 50)}...`
        );

        return NextResponse.json({
          success: commitResult.success,
          commitSha: commitResult.commitSha,
          code: codeResult.code,
          explanation: codeResult.explanation,
          message: commitResult.message,
        });

      case 'deploy':
        // INSTANT SYNC - Commit and deploy to LIVE in one flow
        const deployFilePath = body.filePath || 'src/app/generated.tsx';
        const events: any[] = [];
        
        const syncResult = await instantSync(
          deployFilePath,
          codeResult.code,
          `🎤 Voice deployment: ${textPrompt.substring(0, 50)}...`,
          (event) => {
            events.push(event);
          }
        );

        return NextResponse.json({
          success: syncResult.success,
          commitSha: syncResult.commitSha,
          deploymentId: syncResult.deploymentId,
          deploymentUrl: syncResult.deploymentUrl,
          code: codeResult.code,
          explanation: codeResult.explanation,
          message: syncResult.message,
          events: events, // Include deployment events for tracking
          timestamp: syncResult.timestamp,
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: preview, apply, or deploy' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Voice API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

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
          `Target code not found in ${cleanPath}. Content matching failed.`,
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

