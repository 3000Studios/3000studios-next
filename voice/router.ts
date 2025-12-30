/**
 * VOICE COMMAND ROUTER
 * Maps VoiceCommand → Handler execution
 * Single route, deterministic behavior
 */

import { VoiceCommand } from './commands';
import { handlers } from './handlers';

export async function routeVoiceCommand(cmd: VoiceCommand): Promise<{ status: string }> {
  const handler = handlers[cmd.type];

  if (!handler) {
    throw new Error(`No handler registered for command type: ${cmd.type}`);
  }

  try {
    await handler(cmd);
    return { status: 'ok' };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Handler error for ${cmd.type}: ${message}`);
  }
}
