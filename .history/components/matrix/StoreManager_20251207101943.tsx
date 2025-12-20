"use client";

import { useState } from "react";

export default function StoreManager() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const text = await file.text();
      const products = JSON.parse(text);

      const res = await fetch("/api/store/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      if (res.ok) {
        alert("Products imported successfully!");
      } else {
        alert("Import failed");
      }
    } catch (error) {
      alert("Error: " + String(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-yellow-500/30 p-6 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-yellow-500 mb-4">Store Manager</h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Import Products (JSON)
        </label>
        <input
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
        />
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? "IMPORTING..." : "IMPORT PRODUCTS"}
      </button>

      <div className="mt-4 p-4 bg-black/50 rounded-lg border border-gray-700">