export const shadowAuth = {
  verify: async (token: string) => true,
  createSession: async (user: any) => ({ sessionId: "session-1" }),
};

export const validateShadowSession = async (sessionId: string) => {
  // Stub implementation - returns email or null
  return sessionId ? "shadow@example.com" : null;
};

export const createShadowSession = async (user: any) => {
  return { sessionId: "shadow-session-1", expiresAt: Date.now() + 3600000 };
};

export const terminateShadowSession = async (sessionId: string) => {
  return { success: true };
};
