export const shadowAuth = {
  verify: async (_token: string) => true,
  createSession: async (_user: any) => ({ sessionId: "session-1" }),
};

export const validateShadowSession = async (sessionId: string) => {
  // Stub implementation - returns email or null
  return sessionId ? "shadow@example.com" : null;
};

export const createShadowSession = async (_user: any) => {
  return { sessionId: "shadow-session-1", expiresAt: Date.now() + 3600000 };
};

export const terminateShadowSession = async (_sessionId: string) => {
  return { success: true };
};
