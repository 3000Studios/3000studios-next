/**
 * STYLE HANDLERS
 * Colors, fonts, animations, cursors
 */

import { promises as fs } from 'fs';
import type { VoiceCommand, CommandResult } from '../commands';

export async function handleChangeTheme(command: Extract<VoiceCommand, { type: 'CHANGE_THEME' }>): Promise<CommandResult> {
  const { colors, variant } = command.payload;
  const targetFile = 'src/app/globals.css';

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const cssVariables = colors.map((color, index) => 
      `--color-primary-${index + 1}: ${color};`
    ).join('\n    ');

    const themeBlock = `
  :root {
    ${cssVariables}
  }

  ${variant === 'dark' ? `
  body {
    background-color: #000000;
    color: #ffffff;
  }
  ` : ''}
`;

    content = content.replace(
      /(:root\s*{[^}]*})/s,
      themeBlock
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

export async function handleUpdateCursor(command: Extract<VoiceCommand, { type: 'UPDATE_CURSOR' }>): Promise<CommandResult> {
  const { default: defaultCursor, hover: hoverCursor } = command.payload;
  const targetFile = 'src/app/globals.css';

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const cursorCSS = `
* {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='${defaultCursor}'><circle cx='16' cy='16' r='8'/></svg>") 16 16, auto;
}

a:hover,
button:hover,
[role='button']:hover {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='${hoverCursor}'><circle cx='16' cy='16' r='10'/></svg>") 16 16, pointer;
}
`;

    content = content.replace(
      /\/\* Custom cursor \*\/[\s\S]*?(?=\n\n|$)/,
      `/* Custom cursor */\n${cursorCSS}`
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

export async function handleAddAnimation(command: Extract<VoiceCommand, { type: 'ADD_ANIMATION' }>): Promise<CommandResult> {
  const { target, animation } = command.payload;
  const targetFile = 'src/app/globals.css';

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const animationCSS = `
@keyframes ${animation} {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.animate-${animation} {
  animation: ${animation} 3s ease-in-out infinite;
}
`;

    content += `\n${animationCSS}`;
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
