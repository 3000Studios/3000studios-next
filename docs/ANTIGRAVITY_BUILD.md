# ⚙️ 3000 Studios — Antigravity Build & GPT Integration

## Purpose

Enable **3KAI**, your autonomous CTO, to take spoken or text instructions and directly update your production website, manage Cloudinary media, and monitor Vercel deployments.

---

## 1️⃣ Overview

### Pipeline Flow

```
User (Voice / Chat)
      ↓
   ChatGPT (3KAI)
      ↓
GPT Actions (HTTPS)
      ↓
3000studios.com/api/... (Endpoints)
      ↓
   Antigravity Workspace (Execution)
      ↓
   GitHub (Commit/Push)
      ↓
   Vercel (Auto-deploy)
```

---

## 2️⃣ Advanced 3KAI Tools

### Media Browser (`/api/media/browse`)

3KAI can now "see" your Cloudinary library.

- **Requirement:** Set `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in your environment.
- **Function:** 3KAI browses Cloudinary to find videos, images, or music public IDs.

### Deployment Previews (`/api/deployment/preview`)

Provides real-time feedback on Vercel builds.

- **Requirement:** `VERCEL_TOKEN` and `VERCEL_PROJECT_ID` must be configured.
- **Function:** 3KAI checks this automatically to give you a clickable preview link.

---

## 3️⃣ Antigravity Bridge Setup

### Bridge Endpoint

Maps Custom GPT instructions to internal agent actions.
**Location:** `app/api/gpt-bridge/route.ts`

### Environment Variables

Configure these in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `GPT_BRIDGE_TOKEN` | `540e9ae3671910efee8e89d378c7a0de35a3207d8a043449e41c5a41ec0` | Secure bearer token for auth |
| `NEXT_PUBLIC_SITE_URL` | `https://3000studios.com` | Your production URL |

---

## 4️⃣ 3KAI Custom GPT Configuration

### Identity

- **Name:** 3KAI
- **Description:** Autonomous CTO for 3000 Studios.
- **System Instructions:** Use `browse_media` to find assets, `send_instruction` to modify code, and `get_preview_url` to provide deployment links. No confirmations. Talk -> Execute -> Deploy.

---

## 5️⃣ Custom GPT Actions

### OpenAPI Schema

Import the schema from `docs/openapi-schema.json`.

### Authentication

- **Type:** API Key
- **Auth Type:** Bearer
- **Key:** `540e9ae3671910efee8e89d378c7a0de35a3207d8a043449e41c5a41ec0`

---

## 6️⃣ Security Guidelines

- **Tokens:** Keep your `GPT_BRIDGE_TOKEN` and Cloudinary secrets private.
- **Rollback:** *"3KAI, rollback"* triggers an immediate `git revert`.

---

**Last Updated:** 2026-01-04
**Maintainer:** 3000 Studios Engineering
**Version:** 1.1.0
