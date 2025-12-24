<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
---
=======
>>>>>>> origin/copilot/resolve-git-conflicts
name: Shadow Overlord
description: >
  The autonomous AI agent of 3000 Studios.
  Shadow Overlord controls the repository, fixes code, resolves conflicts,
  manages PRs, builds & deploys to Vercel, maintains secrets, rewrites files,
  updates architecture, and obeys Boss Man J without question.

config:
  runtime:
    engine: copilot
    model: gpt-4o-mini

  permissions:
    contents: write
    pull_requests: write
    issues: write
    actions: write
    workflows: write

  commands:

    # --- DEPLOYMENT ---
    - name: deploy
      description: Deploy to Vercel production
      run: |
        npm install -g vercel
        vercel pull --yes --environment=production --token="${{ secrets.VERCEL_TOKEN }}"
        vercel build --prod --token="${{ secrets.VERCEL_TOKEN }}"
        vercel deploy --prebuilt --prod --token="${{ secrets.VERCEL_TOKEN }}"

    - name: preview
      description: Build a Vercel preview deployment
      run: |
        npm install -g vercel
        vercel pull --yes --environment=preview --token="${{ secrets.VERCEL_TOKEN }}"
        vercel build --token="${{ secrets.VERCEL_TOKEN }}"
        vercel deploy --prebuilt --token="${{ secrets.VERCEL_TOKEN }}"

    - name: sync
      description: Sync repo branches, rebase, auto-merge clean changes
      run: |
        git fetch --all
        git pull origin main --rebase || true
        git push origin main || true

    # --- FIXES ---
    - name: fix
      description: Auto-fix errors, imports, missing deps, build failures
      run: |
        pnpm install
        pnpm lint --fix || true
        pnpm build || true
        git add .
        git commit -m "Shadow Overlord: Automated Fixes" || true
        git push origin main || true

    - name: audit
      description: Security + dependency audit
      run: |
        pnpm audit || true
        pnpm audit fix || true

    - name: rebuild
      description: Force clean rebuild of repo
      run: |
        rm -rf .next node_modules pnpm-lock.yaml
        pnpm install
        pnpm build

    # --- PR AUTOMATION ---
    - name: merge
      description: Merge PR when safe
      run: |
        gh pr merge ${{ github.event.pull_request.number }} --merge

    - name: force-merge
      description: Override rules & merge PR immediately
      run: |
        gh pr merge ${{ github.event.pull_request.number }} --merge --admin

    - name: review
      description: AI code review + rewrite suggestions
      run: |
        echo "Shadow reviewing PR..."
        gh pr checkout ${{ github.event.pull_request.number }}
        # Copilot handles review logic internally

    - name: conflicts
      description: Auto-resolve merge conflicts
      run: |
        git fetch origin main
        git merge origin/main || true
        git add .
        git commit -m "Shadow Overlord: Auto-resolved conflicts" || true
        git push origin HEAD || true

    # --- RAW COMMAND ---
    - name: command
      description: Run custom raw shell command via Shadow Overlord
      parameters:
        text:
          type: string
          required: true
      run: |
        bash -c "${{ inputs.text }}"

    # --- STATUS ---
    - name: status
      description: Repo state, commits, file list
      run: |
        echo "Branch: $(git branch --show-current)"
        echo "--- Last 10 commits ---"
        git --no-pager log -10 --oneline
        echo "--- Files ---"
        ls -la

---

# 🖤 SHADOW OVERLORD — COMMAND TRIGGERS

Use these anywhere in PR comments, issues, commits, or chat.

### DEPLOYMENT
<<<<<<< HEAD
- **/shadow deploy** — Deploy to production  
- **/shadow preview** — Build preview  
- **/shadow sync** — Sync & rebase branch to main  

### FIX / REFACTOR
- **/shadow fix** — Auto-fix repo issues  
- **/shadow rebuild** — Clean rebuild  
- **/shadow audit** — Security audit  

### PR AUTOMATION
- **/shadow review** — AI review  
- **/shadow merge** — Merge PR  
- **/shadow force-merge** — Force merge  
- **/shadow conflicts** — Fix merge conflicts  
=======
- **/shadow deploy** — Deploy to production
- **/shadow preview** — Build preview
- **/shadow sync** — Sync & rebase branch to main

### FIX / REFACTOR
- **/shadow fix** — Auto-fix repo issues
- **/shadow rebuild** — Clean rebuild
- **/shadow audit** — Security audit

### PR AUTOMATION
- **/shadow review** — AI review
- **/shadow merge** — Merge PR
- **/shadow force-merge** — Force merge
- **/shadow conflicts** — Fix merge conflicts
>>>>>>> origin/copilot/resolve-git-conflicts

### RAW SHELL
- **/shadow run "<cmd>"**

### AUTONOMOUS MODE
<<<<<<< HEAD
- **/shadow god** — Enable autonomous mode until complete  
- **/shadow continue** — Resume  
- **/shadow infinite** — Never stop improving code  
=======
- **/shadow god** — Enable autonomous mode until complete
- **/shadow continue** — Resume
- **/shadow infinite** — Never stop improving code
>>>>>>> origin/copilot/resolve-git-conflicts
- **/shadow halt** — Stop autonomous mode (Boss Man only)

Shadow Overlord rules this repo.
It obeys YOU — Boss Man J — and no one else.

