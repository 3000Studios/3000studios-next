/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import { useState } from "react";
import shadowClient from "@/lib/shadowClient";

export default function ShadowTerminal() {
  const [cmd, setCmd] = useState("");
  const [output, setOutput] = useState("");

  async function run() {
    const res = await shadowClient.exec(cmd);
    setOutput(JSON.stringify(res, null, 2));
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-bold mb-2">Terminal</h2>

      <input
        className="w-full p-2 bg-black border border-zinc-700 rounded"
        placeholder="Enter command…"
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
      />

      <button
        onClick={run}
        className="mt-3 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded"
      >
        Run
      </button>

      <pre className="bg-black mt-4 p-3 text-sm rounded border border-zinc-700 overflow-auto max-h-80">
        {output}
      </pre>
    </div>
  );
}
