/**
 * VOICE COMMAND MUTATIONS
 * Direct file system writes that trigger git auto-commit → Vercel deploy
 */

import { promises as fs } from 'fs';
import path from 'path';

interface MutationResult {
  success: boolean;
  message: string;
  file?: string;
  changed?: boolean;
}

/**
 * UPDATE_TEXT: Change homepage headline
 * Writes to app/page.tsx
 */
export async function handleUpdateText(newText: string): Promise<MutationResult> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'page.tsx');
    let content = await fs.readFile(filePath, 'utf-8');

    // Replace the main headline
    const oldHeadline = 'AI-Powered Tools, Content, and Automations';
    const newHeadline = newText || oldHeadline;

    if (content.includes(oldHeadline)) {
      content = content.replace(oldHeadline, newHeadline);
      await fs.writeFile(filePath, content, 'utf-8');
      return {
        success: true,
        message: `Homepage headline updated to: "${newHeadline}"`,
        file: 'app/page.tsx',
        changed: true,
      };
    }

    return {
      success: false,
      message: 'Headline not found in homepage',
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update text: ${error}`,
    };
  }
}

/**
 * ADD_SECTION: Inject new content section
 * Appends to app/page.tsx before the footer
 */
export async function handleAddSection(
  sectionTitle: string,
  sectionContent: string
): Promise<MutationResult> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'page.tsx');
    let content = await fs.readFile(filePath, 'utf-8');

    // Create a new section component
    const newSection = `
      {/* Voice-Added Section */}
      <section className="py-16 px-4" style={{background: '#13131b'}}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">${sectionTitle}</h2>
          <p className="text-gray-400 mb-4">${sectionContent}</p>
          <p className="text-xs text-gray-500">[Voice-Added on ${new Date().toISOString()}]</p>
        </div>
      </section>
    `;

    // Insert before </main> tag
    if (content.includes('</main>')) {
      content = content.replace('</main>', `${newSection}\n      </main>`);
      await fs.writeFile(filePath, content, 'utf-8');
      return {
        success: true,
        message: `Section added: "${sectionTitle}"`,
        file: 'app/page.tsx',
        changed: true,
      };
    }

    return {
      success: false,
      message: 'Could not find insertion point for section',
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add section: ${error}`,
    };
  }
}

/**
 * ADD_MEDIA: Inject video/image
 * Adds media embed to page.tsx
 */
export async function handleAddMedia(
  mediaUrl: string,
  type: 'video' | 'image' = 'image'
): Promise<MutationResult> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'page.tsx');
    let content = await fs.readFile(filePath, 'utf-8');

    const mediaHtml =
      type === 'video'
        ? `<video src="${mediaUrl}" controls className="w-full rounded-lg" />`
        : `<img src="${mediaUrl}" alt="Voice-added media" className="w-full rounded-lg" />`;

    const mediaSection = `
      {/* Voice-Added Media */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        ${mediaHtml}
      </section>
    `;

    if (content.includes('</main>')) {
      content = content.replace('</main>', `${mediaSection}\n      </main>`);
      await fs.writeFile(filePath, content, 'utf-8');
      return {
        success: true,
        message: `${type} media added`,
        file: 'app/page.tsx',
        changed: true,
      };
    }

    return {
      success: false,
      message: 'Could not add media',
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add media: ${error}`,
    };
  }
}

/**
 * CHANGE_STYLE: Update CSS variables
 * Modifies tailwind.config.ts or globals.css
 */
export async function handleChangeStyle(
  cssVariable: string,
  value: string
): Promise<MutationResult> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'globals.css');
    let content = await fs.readFile(filePath, 'utf-8');

    // Add/update CSS variable in :root
    const rootSelector = ':root {';
    if (content.includes(rootSelector)) {
      const insertion = `  --voice-custom-${cssVariable}: ${value};\n`;
      content = content.replace(rootSelector, `${rootSelector}\n${insertion}`);
      await fs.writeFile(filePath, content, 'utf-8');
      return {
        success: true,
        message: `CSS variable updated: --voice-custom-${cssVariable} = ${value}`,
        file: 'app/globals.css',
        changed: true,
      };
    }

    return {
      success: false,
      message: 'Could not find CSS root selector',
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to change style: ${error}`,
    };
  }
}

/**
 * PUBLISH_BLOG: Generate markdown blog post
 * Creates file in /posts directory and links from blog page
 */
export async function handlePublishBlog(
  title: string,
  content: string,
  slug?: string
): Promise<MutationResult> {
  try {
    const blogSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
    const postsDir = path.join(process.cwd(), 'posts');

    // Ensure /posts directory exists
    try {
      await fs.mkdir(postsDir, { recursive: true });
    } catch (e) {
      // Directory may already exist
    }

    // Create markdown file
    const filePath = path.join(postsDir, `${blogSlug}.md`);
    const markdown = `---
title: "${title}"
date: "${new Date().toISOString()}"
slug: "${blogSlug}"
author: "Voice System"
status: "published"
---

# ${title}

${content}

---
*Published via Voice Command on ${new Date().toLocaleString()}*
`;

    await fs.writeFile(filePath, markdown, 'utf-8');

    return {
      success: true,
      message: `Blog post published: "${title}" → /posts/${blogSlug}.md`,
      file: `posts/${blogSlug}.md`,
      changed: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to publish blog: ${error}`,
    };
  }
}
