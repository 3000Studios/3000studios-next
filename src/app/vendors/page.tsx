"use client";

import { useState } from "react";

export default function VendorsPage() {
  const [form, setForm] = useState({ name: "", email: "", feedUrl: "", model: "affiliate" });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await fetch("/api/vendors/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(data.message || (res.ok ? "Submitted" : "Failed"));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-lg space-y-4 card">
        <div>
          <h1 className="text-2xl font-bold">Vendor Self-Signup</h1>
          <p className="text-sm text-gray-400">Affiliate, listing fee, or dropship — submit your feed and we’ll review.</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Vendor Name</label>
          <input className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Contact Email</label>
          <input className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700" value={form.email} onChange={(e) => update("email", e.target.value)} type="email" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Feed URL</label>
          <input className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700" value={form.feedUrl} onChange={(e) => update("feedUrl", e.target.value)} placeholder="https://.../products.json" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Model</label>
          <select className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700" value={form.model} onChange={(e) => update("model", e.target.value)}>
            <option value="affiliate">Affiliate</option>
            <option value="listing">Listing Fee</option>
            <option value="commission">Commission Override</option>
            <option value="dropship">Dropship</option>
          </select>
        </div>
        <button disabled={loading} className="w-full py-3 rounded bg-[var(--electric-blue)] text-black font-bold hover:opacity-90 disabled:opacity-50">
          {loading ? "Submitting..." : "Submit"}
        </button>
        {status && <div className="text-sm text-[var(--electric-blue)]">{status}</div>}
      </form>
    </div>
  );
}
