/**
 * Environment Configuration Validator
 * Validates required environment variables at runtime
 * Helps catch configuration issues before deployment
 */

export interface EnvConfig {
  // Core Settings
  nodeEnv: 'development' | 'production' | 'test';
  baseUrl: string;
  
  // Admin Credentials
  adminEmail?: string;
  adminPassword?: string;
  
  // AI Services (optional)
  openaiApiKey?: string;
  claudeApiKey?: string;
  geminiApiKey?: string;
  
  // Payment Processing (optional)
  paypalClientId?: string;
  paypalSecret?: string;
  stripePublicKey?: string;
  stripeSecretKey?: string;
  
  // Database (optional)
  mongoPublicKey?: string;
  mongoPrivateKey?: string;
  mongoIp?: string;
  
  // Other Services (optional)
  vercelToken?: string;
  githubPat?: string;
}

class EnvironmentValidator {
  private static instance: EnvironmentValidator;
  private config: EnvConfig;
  
  private constructor() {
    this.config = this.loadConfig();
  }
  
  public static getInstance(): EnvironmentValidator {
    if (!EnvironmentValidator.instance) {
      EnvironmentValidator.instance = new EnvironmentValidator();
    }
    return EnvironmentValidator.instance;
  }
  
  private loadConfig(): EnvConfig {
    return {
      nodeEnv: (process.env.NODE_ENV as any) || 'development',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      
      // Admin
      adminEmail: process.env.ADMIN_EMAIL,
      adminPassword: process.env.ADMIN_PASSWORD,
      
      // AI Services
      openaiApiKey: process.env.OPENAI_API_KEY,
      claudeApiKey: process.env.CLAUDE_API_KEY,
      geminiApiKey: process.env.GEMINI_API_KEY,
      
      // Payments
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
      paypalSecret: process.env.PAYPAL_SECRET,
      stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      
      // Database
      mongoPublicKey: process.env.MONGO_PUBLIC_KEY,
      mongoPrivateKey: process.env.MONGO_PRIVATE_KEY,
      mongoIp: process.env.MONGO_IP,
      
      // Other
      vercelToken: process.env.VERCEL_TOKEN,
      githubPat: process.env.GITHUB_PAT,
    };
  }
  
  public getConfig(): EnvConfig {
    return { ...this.config };
  }
  
  public validateRequiredVars(requiredVars: (keyof EnvConfig)[]): void {
    const missing = requiredVars.filter(key => !this.config[key]);
    
    if (missing.length > 0) {
      const message = `Missing required environment variables: ${missing.join(', ')}`;
      
      if (this.config.nodeEnv === 'production') {
        throw new Error(message);
      } else {
        console.warn(`⚠️  ${message}`);
      }
    }
  }
  
  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }
  
  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }
  
  public hasFeature(feature: 'ai' | 'payments' | 'database' | 'streaming'): boolean {
    switch (feature) {
      case 'ai':
        return !!(this.config.openaiApiKey || this.config.claudeApiKey || this.config.geminiApiKey);
      case 'payments':
        return !!(this.config.paypalClientId || this.config.stripePublicKey);
      case 'database':
        return !!this.config.mongoPublicKey;
      default:
        return false;
    }
  }
}

export const env = EnvironmentValidator.getInstance();

// Validate critical variables on import (only in production)
if (env.isProduction()) {
  env.validateRequiredVars(['baseUrl']);
}
