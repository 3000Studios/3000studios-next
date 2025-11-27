import { writeFileSync } from "fs";
import { join } from "path";
import { gitCommitAndPush } from "../helpers/git";

export async function createPage(command: string): Promise<string> {
  try {
    // Extract page name from command
    const match = command.match(/create.*page\s+(\w+)/i);
    const pageName = match ? match[1].toLowerCase() : "newpage";
    
    const pageContent = `// Copyright (c) 2025 3000 Studios.
// All rights reserved.

"use client";

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 glow-text">
          ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}
        </h1>
        <p className="text-xl text-center text-gray-300">
          This page was created by Shadow AI
        </p>
      </div>
    </div>
  );
}
`;

    const filePath = join(process.cwd(), `app/${pageName}/page.tsx`);
    writeFileSync(filePath, pageContent, "utf8");
    
    await gitCommitAndPush(`Shadow AI: Created ${pageName} page`);
    
    return `Page created: /app/${pageName}/page.tsx`;
  } catch (err: any) {
    throw new Error(`Page creation failed: ${err.message}`);
  }
}
