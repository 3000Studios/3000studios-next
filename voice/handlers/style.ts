/**
 * STYLE HANDLERS
 * Handle: CHANGE_STYLE
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * CHANGE_STYLE: Update CSS or design tokens
 * Deterministic: target (selector/variable), value (new value)
 */
export async function handleChangeStyle(cmd: any): Promise<void> {
  const { target, value } = cmd.payload;

  // Two cases: CSS variable or CSS class
  if (target.startsWith('--')) {
    // Update CSS variable in globals.css
    const filePath = path.join(process.cwd(), 'app/globals.css');
    let content = await fs.readFile(filePath, 'utf-8');

    // Replace or add CSS variable
    if (content.includes(`${target}:`)) {
      content = content.replace(
        new RegExp(`${target}[^;]*;`),
        `${target}: ${value};`
      );
    } else {
      content = content.replace(
        /(:root\s*{)/,
        `$1\n  ${target}: ${value};`
      );
    }

    await fs.writeFile(filePath, content, 'utf-8');
  } else {
    // Update Tailwind config or component style
    const filePath = path.join(process.cwd(), 'tailwind.config.ts');
    let content = await fs.readFile(filePath, 'utf-8');

    // Simple replacement in config (flexible for various style updates)
    content = content.replace(
      new RegExp(`${target}[^,}]*`),
      `${target}: "${value}"`
    );

    await fs.writeFile(filePath, content, 'utf-8');
  }
}
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function handleUpdateCursor(
  command: Extract<VoiceCommand, { type: 'UPDATE_CURSOR' }>
): Promise<CommandResult> {
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

export async function handleAddAnimation(
  command: Extract<VoiceCommand, { type: 'ADD_ANIMATION' }>
): Promise<CommandResult> {
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
