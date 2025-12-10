/**
 * Voice-to-Code API Route
 * Converts voice commands to code changes
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateCode, transcribeAudio } from '@/lib/services/openai';
import { createCommit } from '@/lib/services/github';
import { triggerDeployment } from '@/lib/services/vercel';

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
        // Commit code to GitHub
        const filePath = body.filePath || 'src/app/generated.tsx';
        const commitSha = await createCommit([
          {
            path: filePath,
            content: codeResult.code,
            message: `Voice command: ${textPrompt.substring(0, 50)}...`,
          },
        ]);

        return NextResponse.json({
          success: true,
          commitSha,
          code: codeResult.code,
          explanation: codeResult.explanation,
          message: 'Code committed to GitHub',
        });

      case 'deploy':
        // Commit and deploy
        const deployFilePath = body.filePath || 'src/app/generated.tsx';
        const deployCommitSha = await createCommit([
          {
            path: deployFilePath,
            content: codeResult.code,
            message: `Voice deployment: ${textPrompt.substring(0, 50)}...`,
          },
        ]);

        // Trigger Vercel deployment
        const deployment = await triggerDeployment();

        return NextResponse.json({
          success: true,
          commitSha: deployCommitSha,
          deploymentId: deployment.id,
          deploymentUrl: deployment.url,
          code: codeResult.code,
          explanation: codeResult.explanation,
          message: 'Code deployed successfully',
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
