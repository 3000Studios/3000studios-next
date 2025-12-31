import { NextResponse } from "next/server";
import { uiRegistry, updateRegistry } from "@/lib/uiRegistry";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.target || !data.action) {
      return NextResponse.json({ error: "Invalid command" }, { status: 400 });
    }

    // 🔥 Live site mutation
    if (data.action === "update") {
      updateRegistry(data.target as keyof typeof uiRegistry, data.payload);
    }

    return NextResponse.json({ 
      success: true, 
      registry: uiRegistry 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ registry: uiRegistry });
}
