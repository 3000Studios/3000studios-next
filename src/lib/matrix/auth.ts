export const authenticateUser = async (_credentials: any) => ({
  success: true,
  user: {},
});
export const validateSession = async (sessionId: string) => {
  // Stub implementation - returns email or null
  return sessionId ? "user@example.com" : null;
};
