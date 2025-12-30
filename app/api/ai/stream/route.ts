import { openai } from '@/lib/openai';
import { streamText } from 'ai';
import { z } from 'zod';
import { logAIEvent } from '@/lib/ai-logger';

const InputSchema = z.object({
  prompt: z.string().min(1).max(4000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = InputSchema.parse(body);
    const model = 'gpt-5-mini';

    const start = Date.now();

    const result = streamText({
      model: openai(model),
      prompt,
      providerOptions: {
        openai: {
          store: false,
          reasoningEffort: 'low',
          textVerbosity: 'medium',
        },
      },
      onFinish({ usage }) {
        logAIEvent({
          model,
          tokens: usage,
          latencyMs: Date.now() - start,
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('AI Stream Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
