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
    // Default to preview action
    return NextResponse.json({
      success: true,
      preview: codeResult.preview || codeResult.code,
      code: codeResult.code,
      explanation: codeResult.explanation,
      transcription: audio ? textPrompt : undefined,
      action: action || "preview",
    });
  } catch (error) {
    console.error('Voice-to-code API error:', error);
    return NextResponse.json(
      { error: 'Failed to process voice command' },
      { status: 500 }
    );
  }
}

// Helper function to transcribe audio
async function transcribeAudio(audioBase64: string): Promise<string> {
  const openai = await getOpenAI();
  if (!openai) {
    throw new Error('OpenAI not configured');
  }
  
  // Convert base64 to buffer
  const audioBuffer = Buffer.from(audioBase64, 'base64');
  
  // Create a file-like object for OpenAI
  const file = new File([audioBuffer], 'audio.webm', { type: 'audio/webm' });
  
  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: 'whisper-1',
  });
  
  return transcription.text;
}

// Helper function to generate code
async function generateCode(params: {
  prompt: string;
  language?: string;
  context?: string;
}): Promise<{
  code: string;
  preview?: string;
  explanation: string;
}> {
  const openai = await getOpenAI();
  if (!openai) {
    throw new Error('OpenAI not configured');
  }
  
  const systemPrompt = `You are a code generation assistant. Generate clean, production-ready code based on the user's natural language request.
${params.language ? `Programming language: ${params.language}` : ''}
${params.context ? `Current context:\n${params.context}` : ''}

Respond with a JSON object containing:
- code: the generated code
- explanation: a brief explanation of what the code does`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: params.prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  
  return {
    code: result.code || '',
    explanation: result.explanation || 'Code generated successfully',
    preview: result.code || ''
  };
}
