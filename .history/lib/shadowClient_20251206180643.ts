/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

const api = async (endpoint: string, body?: Record<string, unknown>) => {
  const res = await fetch(`/api/shadow/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : "{}",
  });

  return res.json();
};

export default {
  exec: (command: string) => api("exec", { command }),
  updateFile: (filePath: string, content: string) =>
    api("update-file", { filePath, content }),
  push: () => api("push"),
  siteAction: (action: string, target?: string, content?: string) =>
    api("site-action", { action, target, content }),

  // Autopilot Daemon Integration
  async dispatch(task: Record<string, unknown>) {
    return await fetch("/api/shadow/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then((r) => r.json());
  },

  deploy() {
    return this.dispatch({ type: "deploy" });
  },

  heal() {
    return this.dispatch({ type: "heal" });
  },

  run(command: string) {
    return this.dispatch({ type: "run", command });
  },
};
