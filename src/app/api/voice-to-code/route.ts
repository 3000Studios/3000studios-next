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
      { error: 'Failed to process voice command' },
      { status: 500 }
    );
  }
}
