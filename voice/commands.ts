/**
 * VOICE COMMAND TYPES
 * Deterministic command → file editing
 * Every voice command maps to a known file operation
 * No generative AI. No freestyle. Single truth.
 */

export type VoiceCommand =
  | { type: 'UPDATE_TEXT'; payload: { file: string; search: string; replace: string } }
  | { type: 'ADD_SECTION'; payload: { page: string; component: string } }
  | { type: 'ADD_MEDIA'; payload: { page: string; url: string; kind: 'video' | 'image' | 'audio' } }
  | { type: 'CHANGE_STYLE'; payload: { target: string; value: string } }
  | { type: 'PUBLISH_BLOG'; payload: { topic: string } };
  UPDATE_NAV: ['src/app/components/Navigation.tsx'],
  PUBLISH_BLOG: ['app/blog/posts/', 'data/blog/'],
  UPDATE_LAYOUT: ['src/app/[page]/page.tsx'],
  ADD_CTA: ['components/CTA.tsx', 'src/app/[page]/page.tsx'],
  UPDATE_CURSOR: ['src/app/globals.css'],
  ADD_ANIMATION: ['src/app/globals.css', 'components/animations/'],
  TOGGLE_FEATURE: ['src/app/[page]/page.tsx', 'lib/features.ts'],
};

/**
 * Rule: If handler is missing, generate it
 */
export function ensureHandler(commandType: string): void {
  if (!COMMAND_TARGETS[commandType]) {
    throw new Error(`Handler missing for ${commandType} - generating...`);
  }
}
