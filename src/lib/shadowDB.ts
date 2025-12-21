const shadowDB = {
  getPendingTasks: async () => [],
  saveTask: async (task: any) => ({ id: "task-1" }),
  updateTask: async (id: string, updates: any) => ({ success: true })
};
export default shadowDB;
