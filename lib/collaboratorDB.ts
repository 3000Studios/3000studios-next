/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import fs from "fs";
import path from "path";
import { Collaborator } from "@/types";

const FILE = path.join(process.cwd(), "shadow", "data", "collaborators.json");

function ensureDirectory(): void {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCollaborators(): Collaborator[] {
  ensureDirectory();
  if (!fs.existsSync(FILE)) {
    return [];
  }
  const data = fs.readFileSync(FILE, "utf8");
  return JSON.parse(data);
}

function writeCollaborators(collaborators: Collaborator[]): void {
  ensureDirectory();
  fs.writeFileSync(FILE, JSON.stringify(collaborators, null, 2));
}

export default {
  getAll(): Collaborator[] {
    return readCollaborators();
  },

  getById(id: number): Collaborator | undefined {
    const collaborators = readCollaborators();
    return collaborators.find((c) => c.id === id);
  },

  add(collaborator: Omit<Collaborator, "id" | "addedAt">): Collaborator {
    const collaborators = readCollaborators();
    
    const newCollaborator: Collaborator = {
      ...collaborator,
      id: Date.now(),
      addedAt: new Date().toISOString(),
    };
    
    collaborators.push(newCollaborator);
    writeCollaborators(collaborators);
    
    return newCollaborator;
  },

  update(id: number, updates: Partial<Omit<Collaborator, "id" | "addedAt">>): Collaborator | null {
    const collaborators = readCollaborators();
    const index = collaborators.findIndex((c) => c.id === id);
    
    if (index === -1) {
      return null;
    }
    
    collaborators[index] = { ...collaborators[index], ...updates };
    writeCollaborators(collaborators);
    
    return collaborators[index];
  },

  remove(id: number): boolean {
    const collaborators = readCollaborators();
    const filtered = collaborators.filter((c) => c.id !== id);
    
    if (filtered.length === collaborators.length) {
      return false;
    }
    
    writeCollaborators(filtered);
    return true;
  },
};
