/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "shadow", "data", "tasks.json");

export default {
  getPendingTasks() {
    if (!fs.existsSync(FILE)) {
      // Ensure directory exists
      const dir = path.dirname(FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      return [];
    }
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    const pending = data.filter((t: any) => !t.done);
    return pending;
  },

  addTask(task: any) {
    let data: any[] = [];
    
    // Ensure directory exists
    const dir = path.dirname(FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(FILE)) {
      data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    }
    
    task.id = Date.now();
    task.done = false;
    data.push(task);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  },

  markDone(id: number) {
    if (!fs.existsSync(FILE)) return;
    
    let data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    data = data.map((t: any) => (t.id === id ? { ...t, done: true } : t));
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  },
};
