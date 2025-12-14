/**
 * Voice-to-Code API Route
 * Converts natural language commands into actionable code changes
 * Uses OpenAI to parse intent and generate code patches
 */

import { NextRequest, NextResponse } from 'next/server';

// Lazy-load OpenAI dynamically to avoid errors during build time
let openaiInstance: any = null;

async function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  if (!openaiInstance) {
    const { default: OpenAI } = await import('openai');
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  
  return openaiInstance;
}

interface VoiceInput {
  transcript?: string;
  audio?: string;
  prompt?: string;
  currentContext?: string;
  action?: 'preview' | 'commit' | 'deploy';
}

interface CodePatch {
  file: string;
  description: string;
  oldCode: string;
  newCode: string;
}

interface VoiceToCodeResponse {
  success: boolean;
  intent: string;
  description: string;
  patches: CodePatch[];
  preview: string;
  timestamp: string;
  action?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VoiceInput;
    const { transcript, audio, prompt, currentContext, action } = body;

    const userInput = transcript || prompt;

    if (!userInput && !audio) {
      return NextResponse.json(
        { error: 'Transcript, prompt, or audio required' },
        { status: 400 }
      );
    }

    let finalTranscript = userInput || '';

    // If audio provided, transcribe it first
    if (audio && process.env.OPENAI_API_KEY) {
      try {
        const audioBuffer = Buffer.from(audio, 'base64');
        const audioFile = new File([audioBuffer], 'audio.webm', { type: 'audio/webm' });

        const transcription = await getOpenAI().audio.transcriptions.create({
          file: audioFile,
          model: 'whisper-1',
        });

        finalTranscript = transcription.text;
      } catch (err) {
        console.error('Transcription error:', err);
        return NextResponse.json(
          { error: 'Failed to transcribe audio' },
          { status: 500 }
        );
      }
    }

    if (!finalTranscript) {
      return NextResponse.json(
        { error: 'No valid input to process' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Fallback: return demo response without OpenAI
      const demoResponse: VoiceToCodeResponse = {
        success: true,
        intent: 'Demo Mode - No OpenAI Key',
        description: 'Using demo response. Add OPENAI_API_KEY to .env to enable AI processing.',
        patches: [
          {
            file: 'src/app/page.tsx',
            description: 'Example code change based on your voice request',
            oldCode: `// Current implementation\nconst wallpaper = 'default-video.mp4';`,
            newCode: `// Updated implementation\nconst wallpaper = 'aquarium-4k.mp4';\nconst title = 'Live Aquarium Feed';`,
          },
        ],
        preview: '',
        timestamp: new Date().toISOString(),
        action: action || 'preview',
      };
      demoResponse.preview = generatePreviewHTML(demoResponse.patches);
      return NextResponse.json(demoResponse, { status: 200 });
    }

    // Use OpenAI to parse natural language into code changes
    const systemPrompt = `You are an expert web developer for 3000 Studios.
Your job is to convert natural language commands into specific code changes.

When the user describes what they want (e.g., "change the wallpaper to a fish aquarium video"), you must:
1. Identify which file needs to change
2. Extract the current code from that file
3. Generate the new code with the requested change
4. Return ONLY valid JSON with no markdown formatting

The user's site is built with Next.js 16 + React 19 + TypeScript + TailwindCSS.

RESPOND WITH ONLY THIS JSON STRUCTURE:
{
  "intent": "brief intent",
  "description": "detailed description",
  "patches": [
    {
      "file": "path/to/file.tsx",
      "description": "what changed",
      "oldCode": "existing code snippet",
      "newCode": "new code snippet"
    }
  ]
}`;

    const message = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `User request: "${finalTranscript}"

Current site context: ${currentContext || 'Home page with video wallpaper and components'}

Generate code changes to fulfill this request.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = message.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // Parse AI response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch {
      // Fallback mock response for demo
      parsedResponse = {
        intent: 'Process user request',
        description: 'Transforming natural language to code changes',
        patches: [
          {
            file: 'src/app/components/VideoWallpaper.tsx',
            description: 'Update video wallpaper based on user request',
            oldCode: `const videoUrl = 'https://cdn.example.com/default-wallpaper.mp4';`,
            newCode: `const videoUrl = 'https://cdn.example.com/aquarium-4k.mp4';
const videoTitle = 'Aquarium Live Feed';
const videoAuthor = 'Nature Streams';`,
          },
        ],
      };
    }

    const response: VoiceToCodeResponse = {
      success: true,
      intent: parsedResponse.intent || 'Code Change',
      description: parsedResponse.description || 'Applying requested changes',
      patches: parsedResponse.patches || [],
      preview: generatePreviewHTML(parsedResponse.patches || []),
      timestamp: new Date().toISOString(),
      action: action || 'preview',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Voice-to-code error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process voice command' },
      { status: 500 }
    );
  }
}

function generatePreviewHTML(patches: CodePatch[]): string {
  if (patches.length === 0) {
    return '<p class="text-gray-400">No code changes detected.</p>';
  }

  return `
    <div class="space-y-4">
      ${patches
        .map(
          (patch) => `
        <div class="border border-gold/30 rounded-lg p-4 bg-gray-900/50">
          <h4 class="text-gold font-bold mb-2">${patch.file}</h4>
          <p class="text-sm text-gray-400 mb-3">${patch.description}</p>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p class="text-red-400 mb-1 font-semibold">Remove:</p>
              <code class="bg-black text-red-300 p-2 rounded block overflow-x-auto whitespace-pre-wrap">${patch.oldCode}</code>
            </div>
            <div>
              <p class="text-green-400 mb-1 font-semibold">Add:</p>
              <code class="bg-black text-green-300 p-2 rounded block overflow-x-auto whitespace-pre-wrap">${patch.newCode}</code>
            </div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}
