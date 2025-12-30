/**
 * VOICE COMMAND ROUTER
 * Deterministic command → file mapping
 * Every voice command MUST produce a code diff
 */

export type VoiceCommand =
  | { type: 'ADD_SECTION'; payload: { page: string; section: string; content: string } }
  | { type: 'UPDATE_TEXT'; payload: { page: string; selector: string; text: string } }
  | {
      type: 'ADD_VIDEO';
      payload: { page: string; url: string; position: 'hero' | 'section' | 'background' };
    }
  | { type: 'ADD_IMAGE'; payload: { page: string; url: string; alt: string } }
  | { type: 'ADD_AUDIO'; payload: { url: string; autoplay: boolean; loop: boolean } }
  | { type: 'CHANGE_THEME'; payload: { colors: string[]; variant: 'dark' | 'light' | 'custom' } }
  | { type: 'UPDATE_NAV'; payload: { action: 'add' | 'remove' | 'reorder'; links: string[] } }
  | { type: 'PUBLISH_BLOG'; payload: { title: string; content: string; tags: string[] } }
  | {
      type: 'UPDATE_LAYOUT';
      payload: { page: string; layout: 'grid' | 'flex' | 'columns'; columns?: number };
    }
  | { type: 'ADD_CTA'; payload: { text: string; link: string; style: 'primary' | 'secondary' } }
  | { type: 'UPDATE_CURSOR'; payload: { default: string; hover: string } }
  | { type: 'ADD_ANIMATION'; payload: { target: string; animation: string } }
  | { type: 'TOGGLE_FEATURE'; payload: { feature: string; enabled: boolean } };

export interface CommandResult {
  success: boolean;
  files_changed: string[];
  commit_sha?: string;
  error?: string;
}

export interface CommandHandler {
  execute: (command: VoiceCommand) => Promise<CommandResult>;
  validate: (command: VoiceCommand) => boolean;
}

/**
 * Command Registry
 * Maps command types to file paths and handlers
 */
export const COMMAND_TARGETS: Record<string, string[]> = {
  ADD_SECTION: ['src/app/[page]/page.tsx', 'components/sections/'],
  UPDATE_TEXT: ['src/app/[page]/page.tsx'],
  ADD_VIDEO: ['src/app/[page]/page.tsx', 'components/VideoBackground.tsx'],
  ADD_IMAGE: ['src/app/[page]/page.tsx', 'public/images/'],
  ADD_AUDIO: ['app/layout.tsx', 'components/AudioBackground.tsx'],
  CHANGE_THEME: ['tailwind.config.ts', 'src/app/globals.css'],
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
