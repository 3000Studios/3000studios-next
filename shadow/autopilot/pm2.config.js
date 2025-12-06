/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

module.exports = {
  apps: [
    {
      name: "shadow-autopilot",
      script: "./daemon.js",
      watch: false,
      autorestart: true,
      max_restarts: 99,
      restart_delay: 1500,
    },
  ],
};
