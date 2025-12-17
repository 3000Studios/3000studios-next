import { openai } from '@/lib/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await generateText({
    model: openai('gpt-5-mini'),
    prompt,
    providerOptions: {
      openai: {
        textVerbosity: 'medium',
        reasoningEffort: 'low',
        store: false,
      },
    },
  });

  return Response.json({
    text: result.text,
  });
}
