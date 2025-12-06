/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";
import { runWordPressUpdate } from "../../../../lib/auth/wp";

export async function POST(req: Request) {
  try {
    const { file, content } = await req.json();
    const result = await runWordPressUpdate(file, content);

    return NextResponse.json({
      ok: true,
      file,
      result,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}
