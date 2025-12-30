# 🔌 VOICE API SPECIFICATION

**Endpoint:** `POST /api/voice`  
**Base URL:** http://localhost:3001 (dev) | https://3000studios.com (prod)  
**Content-Type:** application/json

---

## REQUEST FORMAT

### Generic Structure
```json
{
  "type": "COMMAND_TYPE",
  "payload": { /* command-specific data */ }
}
```

---

## COMMAND TYPES & PAYLOADS

### 1. UPDATE_TEXT
**Purpose:** Search and replace text in any file

**Payload:**
```json
{
  "type": "UPDATE_TEXT",
  "payload": {
    "file": "app/page.tsx",
    "search": "Current text to find",
    "replace": "New replacement text"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/voice \
  -H "Content-Type: application/json" \
  -d '{
    "type": "UPDATE_TEXT",
    "payload": {
      "file": "app/page.tsx",
      "search": "Welcome to 3000 Studios",
      "replace": "Welcome to Voice-Controlled 3000 Studios"
    }
  }'
```

**Response:**
```json
{ "status": "ok" }
```

**Error (search string not found):**
```json
{ "error": "Search string not found in app/page.tsx" }
```

---

### 2. ADD_SECTION
**Purpose:** Add a new section (component) to a page

**Payload:**
```json
{
  "type": "ADD_SECTION",
  "payload": {
    "page": "home",
    "component": "Features"
  }
}
```

**Generates:**
```jsx
<section className="py-24 px-4 bg-black">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">Features</h2>
    <div className="text-lg text-gray-300">[Content for Features]</div>
  </div>
</section>
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/voice \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ADD_SECTION",
    "payload": {
      "page": "home",
      "component": "Testimonials"
    }
  }'
```

**Note:** Section is injected before `</main>` tag in `app/home/page.tsx` or similar

---

### 3. ADD_MEDIA
**Purpose:** Add video, image, or audio to a page

**Payload:**
```json
{
  "type": "ADD_MEDIA",
  "payload": {
    "page": "home",
    "url": "https://example.com/video.mp4",
    "kind": "video"
  }
}
```

**Supported Kinds:**
- `video` — Generates: `<video autoPlay loop muted playsInline>`
- `image` — Generates: `<img src="" alt="Added media">`
- `audio` — Generates: `<audio autoPlay loop>`

**Full Video Example:**
```jsx
<video autoPlay loop muted playsInline className="w-full h-auto">
  <source src="https://example.com/video.mp4" type="video/mp4" />
</video>
```

**Example Request:**
```bash
curl -X POST http://localhost:3001/api/voice \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ADD_MEDIA",
    "payload": {
      "page": "home",
      "url": "https://cdn.example.com/hero-video.mp4",
      "kind": "video"
    }
  }'
```

---

### 4. CHANGE_STYLE
**Purpose:** Update CSS variables or Tailwind configuration

**Payload:**
```json
{
  "type": "CHANGE_STYLE",
  "payload": {
    "target": "--primary-color",
    "value": "#00FFFF"
  }
}
```

**Two Modes:**

#### A. CSS Variable (target starts with `--`)
```json
{
  "type": "CHANGE_STYLE",
  "payload": {
    "target": "--primary-color",
    "value": "#FF6B35"
  }
}
```
**File Modified:** `app/globals.css`  
**Result:** Updates or creates `--primary-color: #FF6B35;` in `:root` block

#### B. Tailwind Config (target without `--`)
```json
{
  "type": "CHANGE_STYLE",
  "payload": {
    "target": "fontFamily",
    "value": "Inter"
  }
}
```
**File Modified:** `tailwind.config.ts`  
**Result:** Updates Tailwind config entry

**Example:**
```bash
curl -X POST http://localhost:3001/api/voice \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CHANGE_STYLE",
    "payload": {
      "target": "--accent-color",
      "value": "#FFFF00"
    }
  }'
```

---

### 5. PUBLISH_BLOG
**Purpose:** Auto-generate and publish a blog post

**Payload:**
```json
{
  "type": "PUBLISH_BLOG",
  "payload": {
    "topic": "How to build voice-controlled websites"
  }
}
```

**Generates File:** `app/blog/how-to-build-voice-controlled-websites.md`

**Content:**
```markdown
---
title: "How to build voice-controlled websites"
date: "2025-12-30"
author: "Admin"
published: true
---

# How to build voice-controlled websites

This is a blog post about How to build voice-controlled websites.

## Summary
[Add your content here]

---
Published: 2025-12-30
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/voice \
  -H "Content-Type: application/json" \
  -d '{
    "type": "PUBLISH_BLOG",
    "payload": {
      "topic": "The future of AI-powered web design"
    }
  }'
```

**Auto-Generated Filename:** Slugified topic name with `.md` extension  
**Auto-Generated Location:** `/app/blog/`

---

## RESPONSE FORMATS

### Success
```json
{ "status": "ok" }
```
- HTTP Status: `200`
- Body: Indicates successful execution

### Error
```json
{ "error": "Detailed error message" }
```
- HTTP Status: `400`
- Body: Contains error description
- Common causes:
  - Search string not found (UPDATE_TEXT)
  - File not found (ADD_SECTION, ADD_MEDIA)
  - Invalid command type
  - Missing required payload fields

---

## AUTO-COMMIT BEHAVIOR

After each successful voice command:

1. **File is written to disk**
2. **Auto-commit.sh detects change** (within 45 seconds)
3. **Git add** (stages all changes)
4. **Git commit** (timestamp: `voice-edit-2025-12-30T20:45:00Z`)
5. **Git push** (to origin/main)
6. **Vercel detects push** (auto-deploys in ~1-2 minutes)

---

## ERROR HANDLING

### Handler Validation
If no handler exists for a command type:
```json
{ "error": "No handler registered for command type: INVALID_COMMAND" }
```

### File Operations
If file operations fail:
```json
{ "error": "Handler error for UPDATE_TEXT: Search string not found in app/page.tsx" }
```

### Payload Validation
If required fields are missing:
```json
{ "error": "Handler error for ADD_MEDIA: Cannot read property 'page' of undefined" }
```

---

## TESTING CHECKLIST

- [ ] Update text in a page (`UPDATE_TEXT`)
- [ ] Add a section to home page (`ADD_SECTION`)
- [ ] Add a video to a page (`ADD_MEDIA` with kind=video)
- [ ] Add an image to a page (`ADD_MEDIA` with kind=image)
- [ ] Change a CSS variable (`CHANGE_STYLE` with target starting with `--`)
- [ ] Publish a blog post (`PUBLISH_BLOG`)
- [ ] Verify git commit appears: `git log --oneline | head -5`
- [ ] Verify Vercel deployment triggers
- [ ] Verify website reflects changes (live)

---

## NEXT: VOICE CAPTURE

This API is ready for a voice frontend:

```javascript
// Pseudocode: Phone app listens to mic
async function listenAndExecute() {
  const transcript = await captureVoice(); // "Add a video..."
  const command = parseVoiceToCommand(transcript); // → VoiceCommand object
  const response = await fetch('/api/voice', {
    method: 'POST',
    body: JSON.stringify(command)
  });
  
  if (response.ok) {
    announce("Done! Website updated."); // Voice feedback
  } else {
    announce("Error. Try again."); // Error feedback
  }
}
```

The backend API is production-ready now.
