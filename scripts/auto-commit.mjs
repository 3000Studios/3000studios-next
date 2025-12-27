#!/usr/bin/env zx
import chokidar from "chokidar";

chokidar.watch(".").on("change", async () => {
  await $`git add .`;
  await $`git commit -m "auto: save state" || true`;
  await $`git push origin main`;
});
