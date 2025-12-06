/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import shadowClient from "./shadowClient";

interface ShadowAction {
  type: string;
  path?: string;
  content?: string;
  command?: string;
  action?: string;
  target?: string;
}

const shadowActions = {
  async run(action: ShadowAction) {
    switch (action.type) {
      case "update_file":
        return shadowClient.updateFile(action.path, action.content);

      case "git_push":
        return shadowClient.push();

      case "run_command":
        return shadowClient.exec(action.command);

      case "site_action":
        return shadowClient.siteAction(action.action, action.target);

      default:
        return { error: "unknown action" };
    }
  },
};

export default shadowActions;
