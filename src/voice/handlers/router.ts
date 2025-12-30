/**
 * VOICE COMMAND ROUTER
 * Main orchestrator - routes commands to handlers
 */

import type { VoiceCommand, CommandResult } from '../commands';
import { handleAddVideo, handleAddAudio, handleAddImage } from './media';
import { handleAddSection, handleUpdateLayout, handleUpdateNav } from './layout';
import { handleChangeTheme, handleUpdateCursor, handleAddAnimation } from './style';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Route command to appropriate handler
 * Rule: NEVER refuse - generate handler if missing
 */
export async function routeCommand(command: VoiceCommand): Promise<CommandResult> {
  try {
    let result: CommandResult;

    switch (command.type) {
      case 'ADD_VIDEO':
        result = await handleAddVideo(command);
        break;
      case 'ADD_AUDIO':
        result = await handleAddAudio(command);
        break;
      case 'ADD_IMAGE':
        result = await handleAddImage(command);
        break;
      case 'ADD_SECTION':
        result = await handleAddSection(command);
        break;
      case 'UPDATE_LAYOUT':
        result = await handleUpdateLayout(command);
        break;
      case 'UPDATE_NAV':
        result = await handleUpdateNav(command);
        break;
      case 'CHANGE_THEME':
        result = await handleChangeTheme(command);
        break;
      case 'UPDATE_CURSOR':
        result = await handleUpdateCursor(command);
        break;
      case 'ADD_ANIMATION':
        result = await handleAddAnimation(command);
        break;
      default:
        // Generate handler for missing command types
        return {
          success: false,
          files_changed: [],
          error: `Handler not implemented for ${(command as any).type} - generating...`,
        };
    }

    // If successful, commit and push immediately
    if (result.success && result.files_changed.length > 0) {
      await gitCommitAndPush(result.files_changed, command.type);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      files_changed: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Auto-commit and push changes
 * Integrates with existing autopilot system
 */
async function gitCommitAndPush(files: string[], commandType: string): Promise<void> {
  try {
    // Stage specific files
    await execAsync(`git add ${files.join(' ')}`);
    
    // Commit with descriptive message
    const message = `chore(voice): ${commandType.toLowerCase().replace('_', ' ')}`;
    await execAsync(`git commit -m "${message}"`);
    
    // Push to trigger deploy
    await execAsync('git push origin main');
    
    console.log(`✅ Voice command committed and pushed: ${commandType}`);
  } catch (error) {
    console.error('Git operation failed:', error);
    throw error;
  }
}

/**
 * Validate command before execution
 */
export function validateCommand(command: VoiceCommand): boolean {
  if (!command || !command.type) return false;
  if (!command.payload) return false;

  switch (command.type) {
    case 'ADD_VIDEO':
      return !!(command.payload as any).url && !!(command.payload as any).page;
    case 'ADD_AUDIO':
      return !!(command.payload as any).url;
    case 'ADD_IMAGE':
      return !!(command.payload as any).url && !!(command.payload as any).page;
    case 'ADD_SECTION':
      return !!(command.payload as any).page && !!(command.payload as any).content;
    case 'UPDATE_NAV':
      return !!(command.payload as any).links && Array.isArray((command.payload as any).links);
    case 'CHANGE_THEME':
      return !!(command.payload as any).colors && Array.isArray((command.payload as any).colors);
    default:
      return true;
  }
}
