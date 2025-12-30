/**
 * LAYOUT HANDLERS
 * Sections, grids, nav, spacing
 */

import { promises as fs } from 'fs';
import type { VoiceCommand, CommandResult } from '../commands';

export async function handleAddSection(command: Extract<VoiceCommand, { type: 'ADD_SECTION' }>): Promise<CommandResult> {
  const { page, section, content } = command.payload;
  const targetFile = `src/app/${page}/page.tsx`;

  try {
    let fileContent = await fs.readFile(targetFile, 'utf-8');

    const sectionComponent = `
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-12">
            ${section}
          </h2>
          <div className="prose prose-invert max-w-none">
            ${content}
          </div>
        </div>
      </section>
    `;

    fileContent = fileContent.replace(
      /(<\/main>)/,
      `${sectionComponent}\n$1`
    );

    await fs.writeFile(targetFile, fileContent, 'utf-8');

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

export async function handleUpdateLayout(command: Extract<VoiceCommand, { type: 'UPDATE_LAYOUT' }>): Promise<CommandResult> {
  const { page, layout, columns } = command.payload;
  const targetFile = `src/app/${page}/page.tsx`;

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    const layoutClass = 
      layout === 'grid' ? `grid grid-cols-1 md:grid-cols-${columns || 3} gap-8` :
      layout === 'flex' ? 'flex flex-wrap gap-8' :
      layout === 'columns' ? `columns-${columns || 3}` :
      'grid grid-cols-1 gap-8';

    content = content.replace(
      /className="([^"]*)(grid|flex|columns)[^"]*"/g,
      `className="$1${layoutClass}"`
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

export async function handleUpdateNav(command: Extract<VoiceCommand, { type: 'UPDATE_NAV' }>): Promise<CommandResult> {
  const { action, links } = command.payload;
  const targetFile = 'src/app/components/Navigation.tsx';

  try {
    let content = await fs.readFile(targetFile, 'utf-8');

    if (action === 'add') {
      const navLinks = links.map(link => `  { name: '${link}', href: '/${link.toLowerCase()}' }`).join(',\n');
      content = content.replace(
        /(const navLinks = \[)/,
        `$1\n${navLinks},`
      );
    } else if (action === 'remove') {
      links.forEach(link => {
        const regex = new RegExp(`\\s*{[^}]*name:\\s*['"]${link}['"][^}]*}[,]?`, 'g');
        content = content.replace(regex, '');
      });
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
