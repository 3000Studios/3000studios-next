import { pruneMemory } from "@/lib/memory-pruner";
<<<<<<< HEAD
=======
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
>>>>>>> origin/copilot/update-main-with-all-branches

export async function GET() {
  await pruneMemory();
  return Response.json({ status: "memory pruned" });
}
