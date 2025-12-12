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
    console.error('Voice-to-code API error:', error);
    return NextResponse.json(
      { error: 'Failed to process voice command' },
      { status: 500 }
    );
  }
}
