// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import ShadowTerminal from "@/components/ShadowTerminal";
import ShadowFileEditor from "@/components/ShadowFileEditor";
import ShadowActions from "@/components/ShadowActions";
import ShadowNavbar from "@/components/ShadowNavbar";

export default function ShadowPage() {
  return (
    <div className="bg-black min-h-screen text-white w-full max-w-full overflow-x-hidden">
      <ShadowNavbar />

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        <ShadowTerminal />
        <ShadowActions />
        <div className="col-span-2">
          <ShadowFileEditor />
        </div>
      </div>
    </div>
  );
}
