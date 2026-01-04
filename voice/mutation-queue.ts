/**
 * VOICE MUTATION QUEUE
 * In-memory queue for voice commands that will be applied to repo
 * Gets picked up by auto-commit task running in Codespace
 */

interface QueuedMutation {
  id: string;
  type: 'UPDATE_TEXT' | 'ADD_SECTION' | 'ADD_MEDIA' | 'CHANGE_STYLE' | 'PUBLISH_BLOG';
  timestamp: string;
  status: 'pending' | 'applied' | 'failed';
  payload: Record<string, unknown>;
  result?: {
    success: boolean;
    message: string;
  };
}

// In production, this would be a Redis queue or database
// For now, we log to a JSON file that the auto-commit script can read
const _QUEUE_FILE = '/tmp/voice-mutations.json';

async function readQueue(): Promise<QueuedMutation[]> {
  try {
    const data = await import('fs').then((fs) => fs.readFileSync(_QUEUE_FILE, 'utf8'));
    const parsed = JSON.parse(data) as unknown;
    return Array.isArray(parsed) ? (parsed as QueuedMutation[]) : [];
  } catch (error: unknown) {
    // Most likely the file doesn't exist yet; start fresh
    return [];
  }
}

async function writeQueue(queue: QueuedMutation[]): Promise<void> {
  await import('fs').then((fs) => fs.writeFileSync(_QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8'));
}

export async function queueMutation(
  mutation: Omit<QueuedMutation, 'id' | 'timestamp' | 'status'>
): Promise<QueuedMutation> {
  const queued: QueuedMutation = {
    ...mutation,
    id: `voice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    status: 'pending',
  };

  try {
    // Log to console for Vercel logs
    console.log(
      `[VOICE MUTATION QUEUED] ${queued.id} - ${queued.type}`,
      JSON.stringify(queued.payload)
    );

    // Persist to queue file so a worker/auto-commit loop can apply the mutation
    const queue = await readQueue();
    queue.push(queued);
    await writeQueue(queue);

    // In production, this would write to database
    // For now, just log and return
    return queued;
  } catch (error: unknown) {
    console.error('[VOICE MUTATION ERROR]', error);
    throw error;
  }
}

/**
 * Get mutation status from queue
 */
export function getMutationStatus(_id: string): QueuedMutation | null {
  const queue = safeReadQueue();
  return queue.find((entry) => entry.id === _id) ?? null;
}

/**
 * List pending mutations
 */
export function getPendingMutations(): QueuedMutation[] {
  const queue = safeReadQueue();
  return queue.filter((entry) => entry.status === 'pending');
}

function safeReadQueue(): QueuedMutation[] {
  try {
    const fs = require('fs');
    if (!fs.existsSync(_QUEUE_FILE)) return [];
    const data = fs.readFileSync(_QUEUE_FILE, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? (parsed as QueuedMutation[]) : [];
  } catch (error: unknown) {
    console.error('[VOICE MUTATION READ ERROR]', error);
    return [];
  }
}
