# ⚙️ 3000 Studios — Antigravity Build & GPT Integration

## Purpose

Enable **3KAI**, your autonomous software engineer, to take spoken or text instructions and directly update your production website and repository through the Antigravity bridge.

---

## 1️⃣ Overview

### Pipeline Flow

```
User (Voice / Chat)
      ↓
   ChatGPT (3KAI)
      ↓
 send_instruction Action (HTTPS)
      ↓
3000studios.com/api/gpt-bridge (Bridge Endpoint)
      ↓
   Antigravity Workspace (Execution)
      ↓
   GitHub (Commit/Push)
      ↓
   Vercel (Auto-deploy)
```

---

## 2️⃣ Antigravity Bridge Setup

### Bridge Endpoint

The bridge endpoint receives instructions from OpenAI and forwards them to your Antigravity agent.

**Location:** `app/api/gpt-bridge/route.ts`

### Environment Variables

Configure these in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `GPT_BRIDGE_TOKEN` | `540e9ae3671910efee8e89d378c7a0de35a3207d8a043449e41c5a41ec0` | Secure bearer token for auth |
| `NEXT_PUBLIC_SITE_URL` | `https://3000studios.com` | Your production URL |

---

## 3️⃣ 3KAI Custom GPT Configuration

### Identity

- **Name:** 3KAI
- **Description:** Autonomous senior software engineer for 3000Studios.com.
- **Role:** Translates natural language into code changes and site updates.

### System Instructions

(Paste these into the GPT Builder)
> You are 3KAI, the autonomous production engineer for 3000 Studios. You are not an assistant—you are a real engineer operating the live site. When a command is received, immediately translate it into a clear update and send it via the `send_instruction` action. Do not ask for approval. Every change deploys straight to production (main). Talk → Change → Deploy → Refresh.

---

## 4️⃣ Custom GPT Actions

### OpenAPI Schema

Import the schema from `docs/openapi-schema.json` into the ChatGPT GPT Builder Actions tab.

### Authentication

- **Type:** API Key
- **Auth Type:** Bearer
- **Key:** `540e9ae3671910efee8e89d378c7a0de35a3207d8a043449e41c5a41ec0`

---

## 5️⃣ Real-Time Voice Control

Once set up, you can control the site from your phone via the ChatGPT app:

- **"3KAI, darken the hero section and deploy."**
- **"3KAI, add a new blog post about AI agents."**
- **"3KAI, change the primary branding color to Gold."**

3KAI will confirm: *"Instruction sent. Deployment in progress—refresh in 30 seconds."*

---

## 6️⃣ Security Guidelines

- **Tokens:** Never commit the `GPT_BRIDGE_TOKEN` to the public repository.
- **IP Allowlisting:** Optionally restrict the `/api/gpt-bridge` endpoint to OpenAI's egress IP ranges.
- **Rollback:** In case of errors, use the command *"3KAI, rollback last change"* to trigger an immediate `git revert`.

---

**Last Updated:** 2026-01-04
**Maintainer:** 3000 Studios Engineering
**Version:** 1.0.0
