const shadowDB = {
  getPendingTasks: async () => [],
  saveTask: async (_task: any) => ({ id: "task-1" }),
  updateTask: async (_id: string, _updates: any) => ({ success: true }),
};
export default shadowDB;
