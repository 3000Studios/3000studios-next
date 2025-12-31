import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let posts: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  const post = { ...body, date: new Date().toISOString(), id: Date.now() };
  posts.push(post);
  
  // Generate MDX file for SEO
  const content = `# ${post.title}\n\n${post.body}\n\nPublished: ${post.date}`;
  const blogDir = path.join(process.cwd(), 'app/blog/posts');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  fs.writeFileSync(path.join(blogDir, `${post.id}.mdx`), content);
  
  return NextResponse.json({ ok: true, post });
}

export async function GET() {
  return NextResponse.json(posts);
}
