/**
 * VOICE COMMAND ROUTER
 * Maps VoiceCommand → Mutation queue → Auto-commit sync
 * Serverless-safe: queues changes for next sync cycle
 */

import { VoiceCommand } from './commands';
import {
  handleUpdateText,
  handleAddSection,
  handleAddMedia,
  handleChangeStyle,
  handlePublishBlog,
} from './handlers/mutations';

export async function routeVoiceCommand(
  cmd: VoiceCommand
): Promise<{ status: string; message?: string; mutationId?: string }> {
  try {
    // Route to appropriate handler based on command type
    switch (cmd.type) {
      case 'UPDATE_TEXT':
        return await handleUpdateText(cmd.text || 'New Headline');

      case 'ADD_SECTION':
        return await handleAddSection(
          cmd.title || 'New Section',
          cmd.content || 'Section content here'
        );

      case 'ADD_MEDIA':
        return await handleAddMedia(
          cmd.url || '/media/sample.mp4',
          cmd.mediaType as 'video' | 'image'
        );

      case 'CHANGE_STYLE':
        return await handleChangeStyle(cmd.property || 'primary-color', cmd.value || '#00ffff');

      case 'PUBLISH_BLOG':
        return await handlePublishBlog(
          cmd.title || 'New Blog Post',
          cmd.body || 'Blog content here',
          cmd.slug
        );

      default:
        return {
          status: 'error',
          message: `No handler for command type: ${cmd.type}`,
        };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: 'error',
      message,
    };
  }
}
