/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import fs from "fs";
import { exec } from "child_process";
import fetch from "node-fetch";

let LOGFILE = "./shadow/logs/daemon.log";

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  
  // Ensure log directory exists
  const logDir = "./shadow/logs";
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.appendFileSync(LOGFILE, line);
  console.log(line);
}

async function runTask(task) {
  log(`TASK RECEIVED → ${JSON.stringify(task)}`);

  if (task.type === "deploy") {
    exec("git pull && npm install && npm run build", (err, out) => {
      if (err) log(`DEPLOY ERROR: ${err}`);
      else log(`DEPLOY COMPLETE`);
    });
  }

  if (task.type === "heal") {
    exec("pm2 restart all", () => {});
    log("SELF-HEAL: PM2 restart executed");
  }

  if (task.type === "run") {
    exec(task.command, (err, out) => {
      if (err) log(`CMD ERROR: ${err}`);
      else log(`CMD OUT: ${out}`);
    });
  }
}

async function checkAPI() {
  try {
    const res = await fetch("http://localhost:3000/api/shadow/health");
    if (!res.ok) throw new Error("Shadow API unreachable");
  } catch (e) {
    log("HEALTH FAIL — TRIGGER SELF-HEAL");
    runTask({ type: "heal" });
  }
}

async function pollTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/shadow/tasks");
    const data = await res.json();

    for (const t of data.pending) {
      await runTask(t);
    }
  } catch (e) {
    log(`POLL ERROR: ${e.message}`);
  }
}

async function loop() {
  await pollTasks();
  await checkAPI();
  setTimeout(loop, 5000);
}

log("SHADOW AUTOPILOT DAEMON STARTED");
loop();
