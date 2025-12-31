import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { slug, title, content } = await req.json();
    const dir = path.join(process.cwd(), 'app', slug);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(
      path.join(dir, 'page.tsx'),
      `export default function Page() {
  return (
    <section className="p-10 min-h-screen">
      <h1 className="text-5xl font-bold gradient-text mb-6">${title}</h1>
      <p className="mt-6 text-gray-400 text-lg">${content}</p>
    </section>
  );
}
`
    );

    return NextResponse.json({ ok: true, slug, created: true });
  } catch (error: any) {
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
