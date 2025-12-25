# VS Code Extension Purge List

To optimize for maximum autonomy and performance in the `3000studios-next` workspace, we recommend removing the following types of extensions.

## 1. Snippet Extensions
**Examples:** `ES7+ React/Redux/React-Native snippets`, `JavaScript (ES6) code snippets`
**Reason:** GitHub Copilot provides context-aware code generation that is far superior to static snippets. Snippet extensions clutter the intellisense and can lead to outdated code patterns.

## 2. Cosmetic / Theme Extensions (Excessive)
**Examples:** `Material Icon Theme`, `Peacock`, `Bracket Pair Colorizer` (Built-in now)
**Reason:** While a good theme is fine, having multiple icon packs or bracket colorizers (which are now native to VS Code) consumes memory and startup time. Stick to one simple theme or the default.

## 3. Redundant Formatters/Linters
**Examples:** `Beautify`, `TSLint` (Deprecated)
**Reason:** We strictly use `Prettier` for formatting and `ESLint` for linting. Having others installed causes conflicts and "fighting" over file saves.

## 4. Heavy UI Extensions
**Examples:** `GitLens` (Free version is fine, but disable heavy features), `Todo Tree` (If not actively used)
**Reason:** These extensions often run heavy file watchers or git operations in the background, slowing down the editor responsiveness.

## 5. Language Packs for Unused Languages
**Examples:** `Python`, `C#`, `Java` (If you are only working on the Next.js app)
**Reason:** The language servers for these consume significant memory even if you only open one file by mistake.

## 6. "Helper" Extensions
**Examples:** `Auto Close Tag`, `Auto Rename Tag` (VS Code has these built-in now)
**Reason:** VS Code's native HTML/JSX support has improved significantly. These extensions are often redundant and can cause double-typing issues.
