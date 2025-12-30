/**
 * MEDIA HANDLERS
 * Add/replace videos, music, images
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { VoiceCommand, CommandResult } from '../commands';

export async function handleAddVideo(command: Extract<VoiceCommand, { type: 'ADD_VIDEO' }>): Promise<CommandResult> {
  const { page, url, position } = command.payload;
  const targetFile = `src/app/${page}/page.tsx`;

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const videoComponent = `
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="${url}" type="video/mp4" />
        </video>
      </div>
    `;

    if (position === 'hero') {
      content = content.replace(
        /(<main[^>]*>)/,
        `$1\n${videoComponent}`
      );
    } else if (position === 'background') {
      content = content.replace(
        /(<div[^>]*className="[^"]*hero[^"]*"[^>]*>)/,
        `<div className="relative">\n${videoComponent}\n$1`
      );
    }

    await fs.writeFile(targetFile, content, 'utf-8');

    return {
      success: true,
      files_changed: [targetFile],
    };
  } catch (error) {
    return {
      success: false,
      files_changed: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function handleAddAudio(command: Extract<VoiceCommand, { type: 'ADD_AUDIO' }>): Promise<CommandResult> {
  const { url, autoplay, loop } = command.payload;
  const targetFile = 'app/layout.tsx';

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const audioComponent = `
      <audio ${autoplay ? 'autoPlay' : ''} ${loop ? 'loop' : ''} className="hidden">
        <source src="${url}" type="audio/mpeg" />
      </audio>
    `;

    content = content.replace(
      /(<body[^>]*>)/,
      `$1\n${audioComponent}`
    );

    await fs.writeFile(targetFile, content, 'utf-8');

    return {
      success: true,
      files_changed: [targetFile],
    };
  } catch (error) {
    return {
      success: false,
      files_changed: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function handleAddImage(command: Extract<VoiceCommand, { type: 'ADD_IMAGE' }>): Promise<CommandResult> {
  const { page, url, alt } = command.payload;
  const targetFile = `src/app/${page}/page.tsx`;

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const imageComponent = `
      <Image
        src="${url}"
        alt="${alt}"
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
    `;

    content = content.replace(
      /(<section[^>]*>)/,
      `$1\n${imageComponent}`
    );

    await fs.writeFile(targetFile, content, 'utf-8');

    return {
      success: true,
      files_changed: [targetFile],
    };
  } catch (error) {
    return {
      success: false,
      files_changed: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
