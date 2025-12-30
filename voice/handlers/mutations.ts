/**
 * VOICE COMMAND MUTATIONS
 * File system writes via GitHub API (for production serverless)
 * Triggers git auto-commit → Vercel auto-deploy
 */

import { getFileFromGithub, updateFileOnGithub, createFileOnGithub } from '@/voice/github-client';

interface MutationResult {
  success: boolean;
  message: string;
  file?: string;
  changed?: boolean;
  sha?: string;
  url?: string;
}

/**
 * UPDATE_TEXT: Change homepage headline via GitHub API
 */
export async function handleUpdateText(newText: string): Promise<MutationResult> {
  try {
    let content = await getFileFromGithub('app/page.tsx');

    const oldHeadline = 'AI-Powered Tools, Content, and Automations';
    const newHeadline = newText || oldHeadline;

    if (content.includes(oldHeadline)) {
      content = content.replace(oldHeadline, newHeadline);

      const result = await updateFileOnGithub(
        'app/page.tsx',
        content,
        `voice: update headline to "${newHeadline}"`
      );

      return {
        ...result,
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
 * ADD_SECTION: Inject new content section via GitHub API
 */
export async function handleAddSection(
  sectionTitle: string,
  sectionContent: string
): Promise<MutationResult> {
  try {
    let content = await getFileFromGithub('app/page.tsx');

    const newSection = `
      {/* Voice-Added Section - ${new Date().toISOString()} */}
      <section className="py-16 px-4" style={{background: '#13131b'}}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">${sectionTitle}</h2>
          <p className="text-gray-400 mb-4">${sectionContent}</p>
          <p className="text-xs text-gray-500">[Voice-Added: ${new Date().toISOString()}]</p>
        </div>
      </section>
    `;

    if (content.includes('</main>')) {
      content = content.replace('</main>', `${newSection}\n      </main>`);

      const result = await updateFileOnGithub(
        'app/page.tsx',
        content,
        `voice: add section "${sectionTitle}"`
      );

      return {
        ...result,
        file: 'app/page.tsx',
        changed: true,
      };
    }

    return {
      success: false,
      message: 'Could not find insertion point',
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add section: ${error}`,
    };
  }
}

/**
 * ADD_MEDIA: Inject video/image via GitHub API
 */
export async function handleAddMedia(
  mediaUrl: string,
  type: 'video' | 'image' = 'image'
): Promise<MutationResult> {
  try {
    let content = await getFileFromGithub('app/page.tsx');

    const mediaHtml =
      type === 'video'
        ? `<video src="${mediaUrl}" controls className="w-full rounded-lg" />`
        : `<img src="${mediaUrl}" alt="Voice-added media" className="w-full rounded-lg" />`;

    const mediaSection = `
      {/* Voice-Added Media - ${new Date().toISOString()} */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        ${mediaHtml}
      </section>
    `;

    if (content.includes('</main>')) {
      content = content.replace('</main>', `${mediaSection}\n      </main>`);

      const result = await updateFileOnGithub('app/page.tsx', content, `voice: add ${type} media`);

      return {
        ...result,
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
 * CHANGE_STYLE: Update CSS variables via GitHub API
 */
export async function handleChangeStyle(
  cssVariable: string,
  value: string
): Promise<MutationResult> {
  try {
    let content = await getFileFromGithub('app/globals.css');

    const rootSelector = ':root {';
    if (content.includes(rootSelector)) {
      const insertion = `  --voice-custom-${cssVariable}: ${value};\n`;
      content = content.replace(rootSelector, `${rootSelector}\n${insertion}`);

      const result = await updateFileOnGithub(
        'app/globals.css',
        content,
        `voice: update css var --voice-custom-${cssVariable}`
      );

      return {
        ...result,
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
 * PUBLISH_BLOG: Generate markdown blog post via GitHub API
 */
export async function handlePublishBlog(
  title: string,
  content: string,
  slug?: string
): Promise<MutationResult> {
  try {
    const blogSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

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

    const result = await createFileOnGithub(
      `posts/${blogSlug}.md`,
      markdown,
      `voice: publish blog post "${title}"`
    );

    return {
      ...result,
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
