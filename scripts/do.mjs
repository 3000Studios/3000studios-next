#!/usr/bin/env zx

const cmd = process.argv.slice(2).join(" ");

if (cmd === "deploy") {
  await $`git add .`;
  await $`git commit -m "deploy"`;
  await $`git push origin main`;
}

if (cmd === "preview") {
  await $`gh pr create --fill`;
}
