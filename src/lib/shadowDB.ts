const shadowDB = {
  getPendingTasks: async () => [],
  saveTask: async (_task: Record<string, unknown>) => ({ id: "task-1" }),
  updateTask: async (_id: string, _updates: Record<string, unknown>) => ({ success: true }),
};
export default shadowDB;
