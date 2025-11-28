// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import fetch from "node-fetch";

const shadowClient = {
  async api(endpoint, data) {
    const res = await fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deploy() {
    return this.api("/api/shadow/tasks", { type: "deploy" });
  },

  async heal() {
    return this.api("/api/shadow/tasks", { type: "heal" });
  },

  async run(command) {
    return this.api("/api/shadow/tasks", { type: "run", command });
  },
};

export default shadowClient;
