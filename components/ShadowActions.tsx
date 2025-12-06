"use client";
import shadowClient from "@/lib/shadowClient";

export default function ShadowActions() {
  async function push() {
    await shadowClient.push();
    alert("Pushed to GitHub.");
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-bold mb-2">Quick Actions</h2>

      <button
        onClick={push}
        className="w-full bg-blue-700 hover:bg-blue-800 px-4 py-3 rounded mb-2"
      >
        Git Push
      </button>
    </div>
  );
}
