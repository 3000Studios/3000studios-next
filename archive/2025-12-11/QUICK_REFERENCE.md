# 🎯 Shadow Development System - Quick Reference Card

## 🚀 Start Here (First Time)

```powershell
# Step 1: Setup credentials (one-time)
C:\3000Studios\shadow\setup.ps1

# Step 2: Start development
C:\3000Studios\shadow\shadow-dev.ps1

# Step 3: Open browser
# http://localhost:3000
```

---

## ⌨️ VS Code Shortcuts (Daily Use)

<<<<<<< HEAD
| Shortcut       | Action                               |
| -------------- | ------------------------------------ |
| `Ctrl+Shift+B` | Start Dev Server (secrets + Next.js) |
| `Ctrl+Shift+P` | Open command palette                 |
| `Ctrl+S`       | Save (auto-format + reload)          |
| `Ctrl+``       | Open terminal                        |
=======
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+B` | Start Dev Server (secrets + Next.js) |
| `Ctrl+Shift+P` | Open command palette |
| `Ctrl+S` | Save (auto-format + reload) |
| `Ctrl+`` | Open terminal |
>>>>>>> origin/copilot/update-main-with-all-branches

---

## 📚 Available VS Code Tasks

Press `Ctrl+Shift+B`:

```
🚀 Shadow: Start Dev Server     → Load secrets + start dev
🔑 Shadow: Store API Key        → Add/update credential
📋 Shadow: List Stored Keys     → See all stored secrets
🗑️  Shadow: Clear API Key        → Delete a credential
✅ Git: Sync & Push             → Stage, commit, push
```

---

## 🔑 Credential Management

### Store a Key
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
# Interactive: Ctrl+Shift+B → "🔑 Store API Key"
# Or command line:
cmdkey /generic:OPENAI_API_KEY /user:dev /pass:YOUR_KEY
```

### List All Keys
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
# Ctrl+Shift+B → "📋 List Stored Keys"
# Or: cmdkey /list
```

### Delete a Key
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
# Ctrl+Shift+B → "🗑️ Clear API Key"
# Or: cmdkey /delete:OPENAI_API_KEY
```

---

## 💻 Daily Commands

### Start Development
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
# Option A: VS Code Ctrl+Shift+B
# Option B: Terminal command:
C:\3000Studios\shadow\shadow-dev.ps1
```

### Edit Code
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```
1. VS Code automatically saves
2. Dev server auto-reloads
3. See changes at http://localhost:3000
```

### Commit & Deploy
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
git add .
git commit -m "feat: your change"
git push origin main

# GitHub automatically deploys to Vercel
# Watch: https://github.com/3000Studios/3000studios-next/actions
```

---

## 🔐 Security Overview

```
Windows Credential Manager (encrypted)
        ↓
shadow-secrets.ps1 (load into memory)
        ↓
PowerShell $env: variables (session only)
        ↓
Next.js process.env (never to disk)
        ↓
Your app uses credentials securely
```

**Key principle:** Secrets in memory, never on disk.

---

## 📊 File Locations

<<<<<<< HEAD
| What               | Where                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| **Shadow Scripts** | `C:\3000Studios\shadow\`                                               |
| **Project Root**   | `C:\Users\MrJws\OneDrive\WorkSpaces\3000studios-next\3000studios-next` |
| **VS Code Config** | `.vscode\` (in project)                                                |
| **Documentation**  | `.md` files (in project)                                               |
=======
| What | Where |
|------|-------|
| **Shadow Scripts** | `C:\3000Studios\shadow\` |
| **Project Root** | `C:\Users\MrJws\OneDrive\WorkSpaces\3000studios-next\3000studios-next` |
| **VS Code Config** | `.vscode\` (in project) |
| **Documentation** | `.md` files (in project) |
>>>>>>> origin/copilot/update-main-with-all-branches

---

## 🚀 Deployment Pipeline

```
git push
    ↓
GitHub detects
    ↓
Actions workflow runs
    ↓
Vercel builds & deploys
    ↓
Website is live ✨
```

**Time:** 5-7 minutes  
**Manual steps:** 0  
**Your involvement:** Just push!

---

## 📱 Example Workflow

### Adding a Feature

```powershell
# 1. Start dev
C:\3000Studios\shadow\shadow-dev.ps1

# 2. Edit file (e.g., src/app/page.tsx)
# (Dev server auto-reloads)

# 3. Test at http://localhost:3000

# 4. Commit when ready
git add .
git commit -m "feat: add new feature"

# 5. Push (automation takes over)
git push origin main

# 6. Check progress
# https://github.com/3000Studios/3000studios-next/actions

# 7. See live site
# https://3000studios.com
```

---

## 🛠️ Troubleshooting

### Dev won't start
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
pnpm install
pnpm dev
```

### API keys not working
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
# Check stored: cmdkey /list
# Update: cmdkey /delete:KEY && cmdkey /generic:KEY /user:dev /pass:VALUE
# Restart: C:\3000Studios\shadow\shadow-dev.ps1
```

### GitHub Actions failing
<<<<<<< HEAD

Check: https://github.com/3000Studios/3000studios-next/actions

### Vercel deployment stuck

=======
Check: https://github.com/3000Studios/3000studios-next/actions

### Vercel deployment stuck
>>>>>>> origin/copilot/update-main-with-all-branches
Check: https://vercel.com/3000studios

---

## 🎯 Success Checklist

- [ ] Ran setup.ps1
- [ ] All keys stored in Credential Manager
- [ ] Dev server starts with `shadow-dev.ps1`
- [ ] Can see changes at http://localhost:3000
- [ ] Can push to GitHub successfully
- [ ] GitHub Actions runs automatically
- [ ] Vercel deploys automatically
- [ ] Website is live

---

## 📖 Documentation Files

<<<<<<< HEAD
| File                       | Read When                 |
| -------------------------- | ------------------------- |
| `SHADOW_COMPLETE_SETUP.md` | Want full setup details   |
| `SHADOW_SECURE_DEV.md`     | Need security deep-dive   |
| `SECURE_WORKFLOW.md`       | Want daily workflow guide |
| `QUICK_START.md`           | Need quick overview       |
| `README.md`                | Want project info         |
=======
| File | Read When |
|------|-----------|
| `SHADOW_COMPLETE_SETUP.md` | Want full setup details |
| `SHADOW_SECURE_DEV.md` | Need security deep-dive |
| `SECURE_WORKFLOW.md` | Want daily workflow guide |
| `QUICK_START.md` | Need quick overview |
| `README.md` | Want project info |
>>>>>>> origin/copilot/update-main-with-all-branches

---

## 💡 Pro Tips

✅ **Do:**
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
- Use VS Code tasks (Ctrl+Shift+B)
- Let automation handle deployment
- Keep credentials in Credential Manager
- Test locally before pushing
- Check GitHub Actions status

❌ **Don't:**
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
- Store secrets in code
- Commit `.env.local`
- Push untested code
- Share credentials
- Run auto-commit scripts

---

## 🚀 You're Ready!

**Just run:**
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```powershell
C:\3000Studios\shadow\shadow-dev.ps1
```

**Then visit:**
<<<<<<< HEAD

=======
>>>>>>> origin/copilot/update-main-with-all-branches
```
http://localhost:3000
```

**Edit, save, push, and watch it deploy!** 🎉

---

**Last Updated:** December 10, 2025  
**Status:** ✅ Production Ready  
**Keep this card handy!**
