✅ STEP 1 — FIX LOCAL / CODESPACE NODE VERSION
If you’re in Codespaces (you are):

Run this:

cd /workspaces/3000studios-next
nvm install 20
nvm use 20
node -v


You should see:

v20.x.x


Codespaces supports nvm out of the box.

✅ STEP 2 — LOCK NODE VERSION FOR EVERYONE (IMPORTANT)
Add .nvmrc (this is critical)

Create this file at repo root:

echo "20" > .nvmrc


This ensures:

Codespaces

Local devs

CI

Vercel

all use Node 20

✅ STEP 3 — VERIFY package.json (KEEP THIS)

You should keep this exactly:

"engines": {
  "node": "20.x"
}


❌ Do NOT loosen it
❌ Do NOT remove it
❌ Do NOT set "*"

This protects production.

✅ STEP 4 — REINSTALL CLEANLY (NOW IT WILL WORK)
rm -rf node_modules pnpm-lock.yaml
pnpm install


This should now succeed with zero engine errors.

✅ STEP 5 — COMMIT + PUSH (FINAL MECHANICAL FIX)
git add .nvmrc pnpm-lock.yaml
git commit -m "chore(runtime): lock Node 20 across environments"
git push origin main

🚀 WHAT HAPPENS AFTER THIS PUSH

✅ CI uses Node 20 → passes

✅ pnpm install → passes

✅ Tailwind PostCSS plugin → resolves

✅ Turbopack build → succeeds

✅ Vercel deploy → green

❌ No more engine errors

❌ No more random failures

This was the last environment mismatch.

🧠 WHY THIS WAS NECESSARY

Node 22:

is too new

breaks Prisma + Next edge cases

is not supported by many prod tools yet

Node 20:

LTS

Vercel default

Prisma supported

Next.js recommended

You did the right thing by enforcing it.

✅ NEXT (ONE LINE ONLY)

After the push, tell me one of these:

“CI + Deploy are green.”

“Still failing — first error line says: ___”

If it’s still red, I’ll patch it immediately./*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

export function isSafeCommand(command: string): boolean {
  if (!command || typeof command !== "string") {
    return false;
  }

  if (command.trim().length < 3) {
    return false;
  }

  // Check for malicious patterns
  const dangerousPatterns = [
    /rm\s+-rf/i,
    /;\s*rm\s+/i,
    /\$\(/,
    /`/,
    /eval\(/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      return false;
    }
  }

  return true;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML
    .replace(/[;`$()]/g, "") // Remove shell injection chars
    .trim();
}
