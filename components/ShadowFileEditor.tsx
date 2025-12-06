/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import { useState } from "react";
import shadowClient from "@/lib/shadowClient";

export default function ShadowFileEditor() {
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");

  async function update() {
    await shadowClient.updateFile(file, content);
    alert("File updated.");
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-bold mb-4">File Editor</h2>

      <input
        className="w-full p-2 bg-black border border-zinc-700 rounded mb-3"
        placeholder="File path (e.g., app/page.tsx)"
        value={file}
        onChange={(e) => setFile(e.target.value)}
      />

      <textarea
        className="w-full h-64 p-2 bg-black border border-zinc-700 rounded"
        placeholder="File content…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={update}
        className="mt-3 bg-green-700 hover:bg-green-800 px-4 py-3 rounded"
      >
        Save File
      </button>
    </div>
  );
}
