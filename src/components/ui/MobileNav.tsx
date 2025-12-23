"use client";

import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-neutral-800">
      <div className="container flex items-center justify-between py-4">
        <span className="font-semibold">3000 Studios</span>

        <button
          className="rounded-lg border border-neutral-700 px-4 py-2 text-sm"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="container pb-4 flex flex-col gap-3">
          <a className="text-sm" href="/projects">Projects</a>
          <a className="text-sm" href="/store">Store</a>
          <a className="text-sm" href="/login">Login</a>
        </div>
      )}
    </nav>
  );
}
