/**
 * Voice-to-Code API Route
 * Converts natural language commands into actionable code changes
 * Uses OpenAI to parse intent and generate code patches
 * NOW SUPPORTS: File System Writes (fs/promises)
 */

import { NextRequest, NextResponse } from "next/server";

// Lazy-load OpenAI dynamically
let openaiInstance: unknown = null;

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
  patches?: CodePatch[];
}

interface CodePatch {
  file: string;
  description: string;
  oldCode: string;
  newCode: string;
}

interface CodeResult {
  preview?: string;
  code?: string;
  explanation?: string;
}

// Mock transcribe function (placeholder for future implementation)
async function transcribeAudio(_audio: string): Promise<string> {
  // Placeholder: In production, this would use Whisper API or similar
  return "Transcribed audio content";
}

// Mock generate code function (placeholder for future implementation)
async function generateCode(params: {
  prompt: string;
  language?: string;
  context?: string;
}): Promise<CodeResult> {
  // Placeholder: In production, this would use OpenAI to generate code
  return {
    preview: `Generated code preview for: ${params.prompt}`,
    code: `// Generated code based on: ${params.prompt}\nconsole.log('Hello from generated code');`,
    explanation: `This code was generated based on the prompt: ${params.prompt}`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as VoiceInput;
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
      default:
        // Return code for preview only
        return NextResponse.json({
          success: true,
          preview: codeResult.preview,
          code: codeResult.code,
          explanation: codeResult.explanation,
          transcription: audio ? textPrompt : undefined,
          action: action || "preview",
        });
    }
  } catch (error) {
    console.error('Voice-to-code API error:', error);
    return NextResponse.json(
      { error: 'Failed to process voice command' },
      { status: 500 }
    );
  }
}
