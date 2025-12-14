# 💻 VS Code Workspace Integration Guide

**Project**: 3000 Studios  
**Purpose**: Configure VS Code for optimal development experience with GitHub and Vercel

---

## 📋 Overview

This guide ensures your VS Code workspace is perfectly configured to work with the 3000 Studios project, maintaining seamless integration with GitHub and Vercel.

---

## 🏗️ Workspace Architecture

### Workspace File

**File**: `3000studios-next.code-workspace`

This file contains all workspace-specific settings, ensuring consistent configuration across all development sessions.

**Key Features**:
- ✅ Format on save enabled
- ✅ ESLint auto-fix on save
- ✅ Auto-save after 1 second
- ✅ Git integration configured
- ✅ Recommended extensions specified
- ✅ File exclusions for performance

---

## 🎯 Opening the Project

### Option 1: Workspace File (Recommended)

```powershell
# Open workspace file directly
code 3000studios-next.code-workspace
```

**Benefits**:
- All settings automatically applied
- Extension recommendations shown
- Consistent configuration

### Option 2: Folder

```powershell
# Open as folder
code .
```

**Note**: Workspace settings won't be applied. Use Option 1 for best experience.

---

## 🔌 Required Extensions

### Essential Extensions (Install These)

1. **GitHub Copilot** (`github.copilot`)
   - AI-powered code completion
   - Suggests entire lines and functions
   - Context-aware recommendations

2. **GitHub Copilot Chat** (`github.copilot-chat`)
   - Chat interface for Copilot
   - Ask questions about code
   - Generate code from natural language

3. **ESLint** (`dbaeumer.vscode-eslint`)
   - JavaScript/TypeScript linting
   - Auto-fix on save
   - Real-time error detection

4. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting
   - Consistent style across project
   - Format on save enabled

5. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Autocomplete for Tailwind classes
   - Hover previews of styles
   - Syntax highlighting

### Install All at Once

```powershell
# Install all required extensions
code --install-extension github.copilot
code --install-extension github.copilot-chat
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

### Verify Installation

```powershell
# List installed extensions
code --list-extensions
```

**Expected Output**:
```
bradlc.vscode-tailwindcss
dbaeumer.vscode-eslint
esbenp.prettier-vscode
github.copilot
github.copilot-chat
```

---

## ⚙️ VS Code Settings

### Workspace Settings

**File**: `.vscode/settings.json`

**Current Configuration**:
```json
{
  // Git Integration
  "git.autofetch": true,
  "git.confirmSync": false,
  
  // Formatting & Linting
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  
  // TypeScript
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  // Files
  "files.eol": "\n",
  "files.exclude": {
    "**/.git": true,
    "**/.next": true,
    "**/node_modules": true
  },
  
  // Editor
  "editor.tabSize": 2,
  "editor.detectIndentation": false
}
```

### What Each Setting Does

**Git Integration**:
- `git.autofetch: true` - Automatically fetch remote changes
- `git.confirmSync: false` - Skip sync confirmation prompts

**Formatting**:
- `editor.formatOnSave: true` - Format code when saving
- `editor.defaultFormatter` - Use Prettier for formatting
- `source.fixAll.eslint` - Auto-fix ESLint errors on save
- `source.organizeImports` - Sort and clean imports on save

**TypeScript**:
- `typescript.tsdk` - Use workspace TypeScript version
- `typescript.updateImportsOnFileMove` - Auto-update imports when moving files

**Files**:
- `files.eol: "\n"` - Use Unix line endings
- `files.exclude` - Hide build artifacts from file explorer
- `editor.tabSize: 2` - Use 2 spaces for indentation

---

## 🖥️ Integrated Terminal

### Default Shell Configuration

**Windows**: PowerShell (configured in workspace)

```json
{
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

### Common Terminal Commands

```powershell
# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm typecheck

# Git status
git status

# Git commit
git add . && git commit -m "message"

# Git push
git push origin main
```

### Multiple Terminals

VS Code allows multiple terminal instances:

**Recommended Setup**:
1. **Terminal 1**: Dev server (`pnpm dev`)
2. **Terminal 2**: Git commands
3. **Terminal 3**: Build/test commands

**Keyboard Shortcuts**:
- `Ctrl + `` ` `` - Toggle terminal
- `Ctrl + Shift + `` ` `` - New terminal
- `Ctrl + Shift + 5` - Split terminal

---

## 🔄 Git Integration in VS Code

### Source Control Panel

**Access**: Click Source Control icon in left sidebar or press `Ctrl+Shift+G`

**Features**:
- View changed files
- Stage/unstage files
- Commit with message
- Push/pull changes
- View commit history
- Resolve merge conflicts

### Visual Git Operations

**Stage Changes**:
1. Open Source Control panel
2. Hover over changed file
3. Click `+` to stage

**Commit**:
1. Stage desired files
2. Enter commit message in text box
3. Press `Ctrl+Enter` or click ✓ checkmark

**Push**:
1. Click `...` (More Actions) in Source Control panel
2. Select "Push"

**Pull**:
1. Click `...` in Source Control panel
2. Select "Pull"

### Git Graph Extension (Optional)

For visual commit history:

```powershell
code --install-extension mhutchie.git-graph
```

**Benefits**:
- Visual branch tree
- Click to view commits
- Easy branch switching
- Merge conflict visualization

---

## 🐛 Debugging Configuration

### Debug Configuration

**File**: `.vscode/launch.json` (create if needed)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["dev"],
      "port": 9229,
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["dev"],
      "port": 9229,
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

### Using the Debugger

1. Set breakpoints by clicking left of line numbers
2. Press `F5` or go to Run and Debug panel
3. Select configuration from dropdown
4. Click green play button
5. Debug panel opens with variables, call stack, etc.

---

## ⌨️ Tasks Automation

### Tasks Configuration

**File**: `.vscode/tasks.json`

**Current Tasks**:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "dev",
      "type": "shell",
      "command": "pnpm dev",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "build",
      "type": "shell",
      "command": "pnpm build",
      "group": "build"
    },
    {
      "label": "lint",
      "type": "shell",
      "command": "pnpm lint",
      "group": "test"
    }
  ]
}
```

### Running Tasks

**Keyboard Shortcut**: `Ctrl+Shift+B` (runs default build task)

**Via Command Palette**:
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select desired task

---

## 🎨 Snippets for Faster Development

### React/Next.js Snippets

Create custom snippets for common patterns:

**File**: `.vscode/snippets.code-snippets` (create if needed)

```json
{
  "Next.js Page Component": {
    "prefix": "npage",
    "body": [
      "export default function ${1:PageName}() {",
      "  return (",
      "    <div className=\"min-h-screen bg-gray-900 text-white\">",
      "      <h1 className=\"text-4xl font-bold\">${1:PageName}</h1>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "Next.js page component template"
  },
  "React Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export default function ${1:ComponentName}({ $3 }: ${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "React function component with TypeScript"
  }
}
```

### Using Snippets

1. Start typing snippet prefix (e.g., `npage`)
2. Press `Tab` when suggestion appears
3. Fill in placeholders
4. Press `Tab` to move to next placeholder

---

## 🔍 Search and Navigation

### File Navigation

**Quick Open**: `Ctrl+P`
- Type filename to open
- Use `@` for symbols in file
- Use `#` for symbols in workspace
- Use `:` for line number

**Go to Definition**: `F12`
- Jump to where function/variable is defined

**Go to Type Definition**: `Ctrl+F12`
- Jump to type definition

**Find All References**: `Shift+F12`
- See all places where symbol is used

**Peek Definition**: `Alt+F12`
- View definition inline without switching files

### Search in Files

**Find in Files**: `Ctrl+Shift+F`
- Search across entire project
- Use regex patterns
- Replace across multiple files

**Search & Replace**:
1. Press `Ctrl+Shift+F`
2. Enter search term
3. Click arrow next to search box to show replace field
4. Enter replacement text
5. Replace all or selectively

---

## 📊 Status Bar Information

### Git Branch

Bottom left shows current branch:
- Click to switch branches
- Shows sync status (↑↓ arrows with numbers)

### TypeScript/ESLint Errors

Bottom right shows:
- Error count (❌)
- Warning count (⚠️)
- Click to view problems panel

### Auto-Save Indicator

When auto-save is active, unsaved changes indicator disappears quickly.

---

## 🚀 GitHub Copilot Tips

### Getting Better Suggestions

**Write Descriptive Comments**:
```typescript
// Function to fetch user data from API and cache it locally
// Returns user object or null if not found
```
Copilot will generate function based on comment.

**Accept Suggestions**:
- `Tab` - Accept entire suggestion
- `Ctrl+→` - Accept word by word

**View Alternative Suggestions**:
- `Alt+]` - Next suggestion
- `Alt+[` - Previous suggestion

**Open Copilot Chat**:
- `Ctrl+Shift+I` - Open chat panel
- Ask questions about code
- Generate entire components

### Copilot Chat Commands

```
/explain - Explain selected code
/fix - Suggest fixes for errors
/tests - Generate unit tests
/doc - Generate documentation
```

---

## 🔄 Syncing VS Code Settings

### Settings Sync

Enable Settings Sync to use same configuration across machines:

**Enable Sync**:
1. Click gear icon (⚙️) in bottom left
2. Select "Turn on Settings Sync"
3. Sign in with GitHub account
4. Select what to sync (settings, extensions, keybindings)

**What Gets Synced**:
- ✅ User settings
- ✅ Extensions
- ✅ Keyboard shortcuts
- ✅ UI state
- ❌ Workspace settings (use workspace file instead)

**Use Workspace File** for project-specific settings to ensure all team members have same configuration.

---

## 🛠️ Performance Optimization

### Exclude Unnecessary Files

Already configured in workspace settings:

```json
{
  "files.exclude": {
    "**/.git": true,
    "**/.next": true,
    "**/node_modules": true
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.next/**": true,
    "**/node_modules/**": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  }
}
```

**Benefits**:
- Faster file searching
- Reduced memory usage
- Faster workspace load time
- Better performance with large projects

### Disable Unused Extensions

```powershell
# List all extensions
code --list-extensions

# Uninstall unused extension
code --uninstall-extension extension-id
```

Only keep extensions you actually use.

---

## 📝 Recommended Workspace Layout

### Optimal Layout for This Project

**Left Sidebar**:
- Explorer (file tree)
- Source Control
- Extensions

**Editor Area**:
- Main file in center
- Split vertically for components + styles
- Split horizontally for code + terminal

**Right Sidebar** (optional):
- Copilot Chat
- Outline view

**Bottom Panel**:
- Integrated Terminal
- Problems (errors/warnings)
- Output (build logs)

### Save Custom Layout

1. Arrange panels as desired
2. File → Save Workspace As
3. Or just keep using `3000studios-next.code-workspace`

---

## 🚨 Troubleshooting

### Extensions Not Working

```powershell
# Reload window
Ctrl+Shift+P → "Developer: Reload Window"

# Check extension is enabled
Ctrl+Shift+X → Search extension → Verify "Enabled"

# Reinstall extension
code --uninstall-extension extension-id
code --install-extension extension-id
```

### Format on Save Not Working

1. Check Prettier is installed
2. Verify settings.json has `editor.formatOnSave: true`
3. Check file type is supported (`.ts`, `.tsx`, `.js`, `.jsx`)
4. Ensure no other formatter conflicts

### Git Integration Issues

```powershell
# Verify Git is installed
git --version

# Reload VS Code window
Ctrl+Shift+P → "Developer: Reload Window"

# Check GitHub CLI authentication
gh auth status
```

### TypeScript Errors Not Showing

1. Check TypeScript version: `npx tsc --version`
2. Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Verify `tsconfig.json` exists in project root

### Terminal Not Opening

1. Close VS Code completely
2. Reopen workspace file
3. If persists, check Windows Terminal settings
4. Reset terminal: `Ctrl+Shift+P` → "Terminal: Kill All Terminals"

---

## ✅ Verification Checklist

### Your VS Code is Properly Configured When:

- [x] Workspace file opens correctly
- [x] All 5 required extensions installed
- [x] Format on save works (save a file, see formatting)
- [x] ESLint auto-fix works (save file with lint errors)
- [x] Git integration shows in sidebar
- [x] Terminal opens and runs commands
- [x] Can commit and push from VS Code UI
- [x] Copilot provides suggestions
- [x] TypeScript errors appear in problems panel
- [x] File search is fast (`Ctrl+P`)
- [x] Go to definition works (`F12`)

---

## 🎯 Quick Tips

### Daily VS Code Workflow

1. **Open workspace**: `code 3000studios-next.code-workspace`
2. **Pull latest**: `Ctrl+Shift+G` → Click sync icon
3. **Start dev server**: `Ctrl+`` ` `` → `pnpm dev`
4. **Make changes**: Edit files (auto-save enabled)
5. **Review changes**: `Ctrl+Shift+G` to see diffs
6. **Commit**: Enter message, press `Ctrl+Enter`
7. **Push**: Click sync icon or `...` → Push

### Keyboard Shortcuts to Remember

```
Ctrl+P         - Quick open file
Ctrl+Shift+P   - Command palette
Ctrl+`         - Toggle terminal
Ctrl+B         - Toggle sidebar
Ctrl+Shift+F   - Search in files
Ctrl+/         - Toggle line comment
Ctrl+Shift+G   - Source control
F2             - Rename symbol
F12            - Go to definition
Alt+↑/↓        - Move line up/down
Ctrl+D         - Select next occurrence
```

---

## 📚 Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [VS Code Tips & Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Next.js with VS Code](https://nextjs.org/docs/editor-setup)

---

## 🎉 You're Ready to Code!

Your VS Code is now perfectly configured for the 3000 Studios project. Everything is integrated with Git and ready for seamless development.

**Happy Coding!** 🚀

---

**Last Updated**: December 14, 2025  
**Maintained By**: 3000 Studios Development Team
