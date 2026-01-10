# Applying the Admin & Stabilization Patch — Instructions

Prerequisites:

- Node 20.x, pnpm, git
- GitHub CLI (gh) installed and authenticated: `gh auth login`
- Optionally Vercel CLI if you deploy with Vercel: `npm i -g vercel`

1. Copy the provided patch file `0001-fix-stabilize-build.patch` into the repo root (or make your local edits).
2. Export environment variables for seeding the admin user (local use only):
   - Windows PowerShell:
     ```powershell
     $env:ADMIN_EMAIL = 'mr.jwswain@gmail.com'
     $env:ADMIN_PASSWORD = '5555'
     ```
   - macOS / Linux:
     ```bash
     export ADMIN_EMAIL='mr.jwswain@gmail.com'
     export ADMIN_PASSWORD='5555'
     ```

   Note: For production, set these as GitHub repository secrets and do NOT commit credentials to source control.

3. Run the orchestrator script:
   - PowerShell:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\scripts\create-pr-and-deploy.ps1
     ```
   - The script will:
     - create a branch (fix/stabilize-build-0001)
     - apply patch (if present)
     - run pnpm install & build
     - run `node scripts/seed-admin.js` which will seed the admin user in your DB / .data store
     - push the branch to origin
     - open a PR using `gh`

4. Set repository secrets (if desired / required):
   - Using GitHub UI, add:
     - ADMIN_EMAIL
     - ADMIN_PASSWORD
     - DATABASE_URL (if using a remote DB)
     - NEXTAUTH_SECRET
     - VERCEL_TOKEN (if you want the script to trigger Vercel)
   - Or run:
     ```bash
     gh secret set ADMIN_EMAIL --body "mr.jwswain@gmail.com"
     gh secret set ADMIN_PASSWORD --body "5555"
     gh secret set NEXTAUTH_SECRET --body "$(openssl rand -base64 32)"
     ```

5. Review the PR on GitHub, run CI, and merge. CI will run build/type-check; once merged deploys will trigger.

6. After deploy, log in via the admin login page:
   - POST to `/api/auth/login` with JSON { "email":"mr.jwswain@gmail.com", "password":"5555" }
   - Or create a small login form that calls this endpoint.

Notes & Next Steps:

- The seed script attempts to use Prisma if you already have Prisma set up; otherwise it uses a JSON fallback.
- Replace the placeholder avatar image `/images/admin-female-placeholder.jpg` with a real image in `public/images/`.
- Replace the stubbed voice-to-web handler with your full voice router when ready — the stub returns parsed basic examples and is a safe starting point.
- For production hardening, integrate NextAuth, secure cookie flags, HTTPS, rotate secrets, and use a managed DB (Postgres/Prisma).
