#!/usr/bin/env zx

import chokidar from 'chokidar';
import { $ } from 'zx';

console.log('🚀 3000 STUDIOS: EXTREME AUTO-COMMIT ENGINE ACTIVATED');
console.log('Monitoring all changes in the nexus...');

const watcher = chokidar.watch('.', {
  ignored: [
    /(^|[\/\\])\../, // ignore dotfiles
    'node_modules',
    '.next',
    'dist',
    '.git',
  ],
  persistent: true,
});

let isSyncing = false;

async function syncChanges() {
  if (isSyncing) return;
  isSyncing = true;

  try {
    console.log('🔄 Syncing Nexus State...');

    // Stage all changes
    await $`git add .`;

    // Check if there are changes to commit
    const status = await $`git status --porcelain`;
    if (status.stdout.trim()) {
      const timestamp = new Date().toISOString();
      await $`git commit -m "auto: Nexus sync at ${timestamp}"`;

      // Pull first to avoid conflicts
      console.log('📥 Pulling remote updates...');
      await $`git pull origin main --rebase`;

      // Push to main
      console.log('📤 Pushing to Global Nexus...');
      await $`git push origin main`;

      console.log('✅ Synchronized.');
    } else {
      console.log('💎 No state changes detected.');
    }
  } catch (error) {
    console.error('⚠️ Sync Conflict or Error:', error.message);
    // Force push if necessary or just wait?
    // In extreme mode, we might want to force, but let's try to be safe first.
  } finally {
    isSyncing = false;
  }
}

// Watch for changes and sync
watcher.on('change', (path) => {
  console.log(`📝 Mutation detected: ${path}`);
  syncChanges();
});

// Also sync every 60 seconds just in case
setInterval(syncChanges, 60000);

// Initial sync on start
syncChanges();
