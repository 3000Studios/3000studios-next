/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { executeTask } from "../parser";

interface QueueTask {
  id: string;
  command: string;
  user: string;
  origin: "voice" | "manual";
  timestamp: number;
  status: "queued" | "running" | "completed" | "failed";
  result?: string;
}

// In-memory task queue (use Redis/database in production)
let taskQueue: QueueTask[] = [];
let isProcessing = false;

export async function addTaskToQueue(
  task: Omit<QueueTask, "status">,
): Promise<void> {
  const newTask: QueueTask = {
    ...task,
    status: "queued",
  };

  taskQueue.push(newTask);

  // Start processing if not already running
  if (!isProcessing) {
    processQueue();
  }
}

async function processQueue(): Promise<void> {
  if (isProcessing) return;

  isProcessing = true;

  while (taskQueue.length > 0) {
    const task = taskQueue.find((t) => t.status === "queued");

    if (!task) break;

    // Mark as running
    task.status = "running";

    try {
      // Execute the task
      const result = await executeTask(task.id, task.command);

      // Mark as completed
      task.status = "completed";
      task.result = result;
    } catch (err: any) {
      // Mark as failed
      task.status = "failed";
      task.result = `Error: ${err.message}`;
    }

    // Remove completed/failed tasks after 60 seconds
    setTimeout(() => {
      taskQueue = taskQueue.filter((t) => t.id !== task.id);
    }, 60000);
  }

  isProcessing = false;
}

export async function getQueueStatus(): Promise<{
  total: number;
  queued: number;
  running: number;
  completed: number;
  failed: number;
}> {
  return {
    total: taskQueue.length,
    queued: taskQueue.filter((t) => t.status === "queued").length,
    running: taskQueue.filter((t) => t.status === "running").length,
    completed: taskQueue.filter((t) => t.status === "completed").length,
    failed: taskQueue.filter((t) => t.status === "failed").length,
  };
}

export async function getTaskById(taskId: string): Promise<QueueTask | null> {
  return taskQueue.find((t) => t.id === taskId) || null;
}

export async function getAllTasks(): Promise<QueueTask[]> {
  return [...taskQueue];
}
