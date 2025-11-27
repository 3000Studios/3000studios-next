// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const AvatarClient = dynamic(() => import("./AvatarClient"), { ssr: false });

export default function AvatarPage() {
  return <AvatarClient />;
}
