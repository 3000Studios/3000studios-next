const shadowClient = {
  deploy: async () => ({ success: true }),
  rollback: async () => ({ success: true }),
  status: async () => ({ running: true }),
};
export default shadowClient;
