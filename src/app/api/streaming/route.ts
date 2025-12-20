import { prisma } from "@/lib/prisma";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const getMuxClient = () => {
    if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
        throw new Error("Missing Mux credentials");
    }
    return new Mux({
        tokenId: process.env.MUX_TOKEN_ID,
        tokenSecret: process.env.MUX_TOKEN_SECRET,
    });
};

export async function POST(_request: Request) {
  try {
    // 1. Create a new Live Stream in Mux
    const { video } = getMuxClient();
    const stream = await video.liveStreams.create({
      playback_policy: ["public"],
      new_asset_settings: { playback_policy: ["public"] },
    });

    // 2. Save stream details to DB
    const dbStream = await prisma.stream.create({
      data: {
        playbackId: stream.playback_ids?.[0]?.id,
        streamKey: stream.stream_key,
        isLive: true,
        startedAt: new Date(),
      },
    });

    return NextResponse.json(dbStream);
  } catch (error) {
    console.error("Error creating stream:", error);
    return NextResponse.json(
      { error: "Failed to create stream" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get the most recent active stream
    const stream = await prisma.stream.findFirst({
      orderBy: { id: "desc" },
      where: { isLive: true },
    });

    return NextResponse.json(stream || { isLive: false });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stream" },
      { status: 500 }
    );
  }
}
