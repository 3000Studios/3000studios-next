/**
 * VOICE COMMAND TYPES
 * Deterministic command → file editing
 * Every voice command maps to a known file operation
 * No generative AI. No freestyle. Single truth.
 */

export type VoiceCommand =
  | {
      type: 'UPDATE_TEXT';
      text?: string;
      file?: string;
      search?: string;
      replace?: string;
    }
  | {
      type: 'ADD_SECTION';
      title?: string;
      content?: string;
      page?: string;
    }
  | {
      type: 'ADD_MEDIA';
      url?: string;
      mediaType?: 'video' | 'image' | 'audio';
      page?: string;
    }
  | {
      type: 'CHANGE_STYLE';
      property?: string;
      value?: string;
      target?: string;
    }
  | {
      type: 'PUBLISH_BLOG';
      title?: string;
      body?: string;
      slug?: string;
      topic?: string;
    };

/**
 * Rule: If handler is missing, generate it
 */
const COMMAND_TARGETS: Record<string, unknown> = {};

export function ensureHandler(commandType: string): void {
  if (!COMMAND_TARGETS[commandType]) {
    throw new Error(`Handler missing for ${commandType} - generating...`);
  }
}
