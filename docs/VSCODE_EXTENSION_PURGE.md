# VS Code Extension Purge List

To ensure maximum performance and autonomy for the `3000studios-next` workspace, the following extensions are considered "bloat" or unnecessary and should be disabled or uninstalled.

## 1. Snippet Packs (e.g., `ES7+ React/Redux/React-Native snippets`)
**Reason:** GitHub Copilot provides context-aware code generation that supersedes static snippets. Snippet extensions consume memory and clutter the suggestion list.

## 2. Heavy UI Themes / Icon Packs (e.g., `Material Icon Theme`)
**Reason:** While aesthetically pleasing, complex icon themes can add slight overhead to file explorer rendering. Default VS Code icons are sufficient and fastest.

## 3. Redundant Linters/Formatters (e.g., `Beautify`, `TSLint`)
**Reason:** We use `ESLint` and `Prettier` exclusively. `TSLint` is deprecated. Multiple formatters cause conflicts and "fighting" on save.

## 4. Git GUIs (e.g., `GitLens` - *if performance is critical*)
**Reason:** VS Code's built-in Git support is robust. Heavy Git extensions index the entire repo history, which can consume significant CPU/RAM on large repos. Use CLI or built-in git view for speed.

## 5. "Import Cost" Extensions
**Reason:** These run `webpack` or similar bundlers in the background on every edit to calculate size. This is a massive performance drain.

## 6. TODO Highlighters (e.g., `Todo Tree`)
**Reason:** Regex scanning of the entire workspace for TODOs can be slow. Use `grep` or search when needed.

## 7. Bracket Pair Colorizers (Old versions)
**Reason:** VS Code has this built-in now (`editor.bracketPairColorization.enabled`). External extensions are obsolete and slower.

## 8. ChatGPT / AI Wrappers (other than Copilot)
**Reason:** We are standardizing on GitHub Copilot. Multiple AI extensions (e.g., `mpociot.bridge`, `genieai.chatgpt-vscode`) compete for resources, keybindings, and screen real estate.
