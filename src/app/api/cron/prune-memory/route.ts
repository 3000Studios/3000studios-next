import { pruneMemory } from "@/lib/memory-pruner";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  await pruneMemory();
  return Response.json({ status: "memory pruned" });
}
