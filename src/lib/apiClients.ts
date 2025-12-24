/**
 * Centralized API Clients
<<<<<<< HEAD
 *
 * This module exports initialized API clients for all external services.
 * All clients read from process.env with safe fallbacks.
 *
 * Import these clients instead of initializing them in individual files.
 */

import Stripe from "stripe";
import { MongoClient } from "mongodb";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
=======
 * 
 * This module exports initialized API clients for all external services.
 * All clients read from process.env with safe fallbacks.
 * 
 * Import these clients instead of initializing them in individual files.
 */

import Stripe from 'stripe';
import { MongoClient } from 'mongodb';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
>>>>>>> origin/copilot/update-main-with-all-branches

// ==========================================
// STRIPE CLIENT
// ==========================================
let stripeClient: Stripe | null = null;

export const getStripeClient = (): Stripe => {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
<<<<<<< HEAD

    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not configured. Set it in your environment variables.",
      );
    }

    stripeClient = new Stripe(secretKey, {
      apiVersion: "2025-11-17.clover",
      typescript: true,
    });
  }

=======
    
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured. Set it in your environment variables.');
    }
    
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    });
  }
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return stripeClient;
};

export const stripe = {
  get client() {
    return getStripeClient();
  },
  isConfigured: () => !!process.env.STRIPE_SECRET_KEY,
};

// ==========================================
// PAYPAL CLIENT
// ==========================================
export const getPayPalClient = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
<<<<<<< HEAD
  const mode = process.env.PAYPAL_MODE || "sandbox";

  if (!clientId || !secret) {
    throw new Error(
      "PayPal credentials not configured. Set PAYPAL_CLIENT_ID and PAYPAL_SECRET.",
    );
  }

=======
  const mode = process.env.PAYPAL_MODE || 'sandbox';
  
  if (!clientId || !secret) {
    throw new Error('PayPal credentials not configured. Set PAYPAL_CLIENT_ID and PAYPAL_SECRET.');
  }
  
>>>>>>> origin/copilot/update-main-with-all-branches
  // PayPal SDK is imported dynamically in API routes
  // This returns the configuration object
  return {
    mode,
    client_id: clientId,
    client_secret: secret,
  };
};

export const paypal = {
  get config() {
    return getPayPalClient();
  },
<<<<<<< HEAD
  isConfigured: () =>
    !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET),
=======
  isConfigured: () => !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET),
>>>>>>> origin/copilot/update-main-with-all-branches
};

// ==========================================
// OPENAI CLIENT
// ==========================================
let openAIClient: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI => {
  if (!openAIClient) {
    const apiKey = process.env.OPENAI_API_KEY;
<<<<<<< HEAD

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not configured. Set it in your environment variables.",
      );
    }

=======
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured. Set it in your environment variables.');
    }
    
>>>>>>> origin/copilot/update-main-with-all-branches
    openAIClient = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID,
    });
  }
<<<<<<< HEAD

=======
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return openAIClient;
};

export const openai = {
  get client() {
    return getOpenAIClient();
  },
  isConfigured: () => !!process.env.OPENAI_API_KEY,
};

// ==========================================
// ANTHROPIC CLAUDE CLIENT
// ==========================================
let anthropicClient: Anthropic | null = null;

export const getAnthropicClient = (): Anthropic => {
  if (!anthropicClient) {
    const apiKey = process.env.CLAUDE_API_KEY;
<<<<<<< HEAD

    if (!apiKey) {
      throw new Error(
        "CLAUDE_API_KEY is not configured. Set it in your environment variables.",
      );
    }

=======
    
    if (!apiKey) {
      throw new Error('CLAUDE_API_KEY is not configured. Set it in your environment variables.');
    }
    
>>>>>>> origin/copilot/update-main-with-all-branches
    anthropicClient = new Anthropic({
      apiKey,
    });
  }
<<<<<<< HEAD

=======
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return anthropicClient;
};

export const anthropic = {
  get client() {
    return getAnthropicClient();
  },
  isConfigured: () => !!process.env.CLAUDE_API_KEY,
};

// ==========================================
// GOOGLE GEMINI CLIENT
// ==========================================
let geminiClient: GoogleGenerativeAI | null = null;

export const getGeminiClient = (): GoogleGenerativeAI => {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
<<<<<<< HEAD

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not configured. Set it in your environment variables.",
      );
    }

    geminiClient = new GoogleGenerativeAI(apiKey);
  }

=======
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured. Set it in your environment variables.');
    }
    
    geminiClient = new GoogleGenerativeAI(apiKey);
  }
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return geminiClient;
};

export const gemini = {
  get client() {
    return getGeminiClient();
  },
<<<<<<< HEAD
  getModel: (model: string = "gemini-pro") => {
=======
  getModel: (model: string = 'gemini-pro') => {
>>>>>>> origin/copilot/update-main-with-all-branches
    return getGeminiClient().getGenerativeModel({ model });
  },
  isConfigured: () => !!process.env.GEMINI_API_KEY,
};

// ==========================================
// MONGODB CLIENT
// ==========================================
let mongoClient: MongoClient | null = null;
let isConnecting = false;

export const getMongoClient = async (): Promise<MongoClient> => {
  const uri = process.env.MONGODB_URI;
<<<<<<< HEAD

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Set it in your environment variables.",
    );
  }

=======
  
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Set it in your environment variables.');
  }
  
>>>>>>> origin/copilot/update-main-with-all-branches
  if (!mongoClient) {
    if (isConnecting) {
      // Wait for existing connection attempt
      while (isConnecting) {
<<<<<<< HEAD
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (mongoClient) return mongoClient;
    }

=======
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (mongoClient) return mongoClient;
    }
    
>>>>>>> origin/copilot/update-main-with-all-branches
    isConnecting = true;
    try {
      mongoClient = new MongoClient(uri, {
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
      });
      await mongoClient.connect();
<<<<<<< HEAD
      console.log("✅ MongoDB connected successfully");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
=======
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
>>>>>>> origin/copilot/update-main-with-all-branches
      throw error;
    } finally {
      isConnecting = false;
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return mongoClient;
};

export const getMongoDb = async () => {
  const client = await getMongoClient();
<<<<<<< HEAD
  const dbName = process.env.MONGODB_DB_NAME || "3000studios";
=======
  const dbName = process.env.MONGODB_DB_NAME || '3000studios';
>>>>>>> origin/copilot/update-main-with-all-branches
  return client.db(dbName);
};

export const mongodb = {
  get client() {
    return getMongoClient();
  },
  get db() {
    return getMongoDb();
  },
  isConfigured: () => !!process.env.MONGODB_URI,
  disconnect: async () => {
    if (mongoClient) {
      await mongoClient.close();
      mongoClient = null;
<<<<<<< HEAD
      console.log("MongoDB disconnected");
=======
      console.log('MongoDB disconnected');
>>>>>>> origin/copilot/update-main-with-all-branches
    }
  },
};

// ==========================================
// ANALYTICS CLIENTS
// ==========================================
export const analytics = {
  google: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    isConfigured: () => !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  vercel: {
    isConfigured: () => !!process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
  },
};

// ==========================================
// TWILIO CLIENT
// ==========================================
export const getTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
<<<<<<< HEAD

  if (!accountSid || !authToken) {
    throw new Error(
      "Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.",
    );
  }

=======
  
  if (!accountSid || !authToken) {
    throw new Error('Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.');
  }
  
>>>>>>> origin/copilot/update-main-with-all-branches
  // Twilio client would be initialized here
  // For now, return config
  return {
    accountSid,
    authToken,
    phoneNumber: process.env.TWILIO_PHONE,
  };
};

export const twilio = {
  get config() {
    return getTwilioClient();
  },
<<<<<<< HEAD
  isConfigured: () =>
    !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
=======
  isConfigured: () => !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
>>>>>>> origin/copilot/update-main-with-all-branches
};

// ==========================================
// WORDPRESS CLIENT
// ==========================================
export const getWordPressClient = () => {
  const url = process.env.WP_URL;
  const user = process.env.WP_USER;
  const pass = process.env.WP_PASS;
<<<<<<< HEAD

  if (!url || !user || !pass) {
    throw new Error(
      "WordPress credentials not configured. Set WP_URL, WP_USER, and WP_PASS.",
    );
  }

=======
  
  if (!url || !user || !pass) {
    throw new Error('WordPress credentials not configured. Set WP_URL, WP_USER, and WP_PASS.');
  }
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return {
    url,
    auth: {
      username: user,
      password: pass,
    },
  };
};

export const wordpress = {
  get config() {
    return getWordPressClient();
  },
<<<<<<< HEAD
  isConfigured: () =>
    !!(process.env.WP_URL && process.env.WP_USER && process.env.WP_PASS),
=======
  isConfigured: () => !!(process.env.WP_URL && process.env.WP_USER && process.env.WP_PASS),
>>>>>>> origin/copilot/update-main-with-all-branches
};

// ==========================================
// WEBRTC / STREAMING CONFIG
// ==========================================
export const webrtc = {
  config: {
    apiKey: process.env.WEBRTC_KEY,
    iceServers: [
      {
<<<<<<< HEAD
        urls: "stun:stun.l.google.com:19302",
      },
      ...(process.env.WEBRTC_TURN_URL
        ? [
            {
              urls: process.env.WEBRTC_TURN_URL,
              username: process.env.WEBRTC_TURN_USER,
              credential: process.env.WEBRTC_TURN_PASS,
            },
          ]
        : []),
=======
        urls: 'stun:stun.l.google.com:19302',
      },
      ...(process.env.WEBRTC_TURN_URL ? [{
        urls: process.env.WEBRTC_TURN_URL,
        username: process.env.WEBRTC_TURN_USER,
        credential: process.env.WEBRTC_TURN_PASS,
      }] : []),
>>>>>>> origin/copilot/update-main-with-all-branches
    ],
  },
  signalServer: process.env.NEXT_PUBLIC_SIGNAL_SERVER,
  isConfigured: () => !!process.env.WEBRTC_KEY,
};

// ==========================================
// GITHUB CLIENT
// ==========================================
export const github = {
  pat: process.env.GITHUB_PAT,
  isConfigured: () => !!process.env.GITHUB_PAT,
};

// ==========================================
// AFFILIATE TRACKING CONFIG
// ==========================================
export const affiliate = {
  secret: process.env.AFFILIATE_SECRET,
<<<<<<< HEAD
  cookieDuration: parseInt(process.env.AFFILIATE_COOKIE_DURATION || "30", 10),
  commissionRate: parseFloat(process.env.AFFILIATE_COMMISSION_RATE || "10"),
=======
  cookieDuration: parseInt(process.env.AFFILIATE_COOKIE_DURATION || '30', 10),
  commissionRate: parseFloat(process.env.AFFILIATE_COMMISSION_RATE || '10'),
>>>>>>> origin/copilot/update-main-with-all-branches
  isConfigured: () => !!process.env.AFFILIATE_SECRET,
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if all required API clients are configured for a feature
 */
export const checkFeatureAvailability = (feature: string): boolean => {
  const featureMap: Record<string, () => boolean> = {
    payments_stripe: stripe.isConfigured,
    payments_paypal: paypal.isConfigured,
    ai_openai: openai.isConfigured,
    ai_claude: anthropic.isConfigured,
    ai_gemini: gemini.isConfigured,
    database: mongodb.isConfigured,
<<<<<<< HEAD
    analytics: () =>
      analytics.google.isConfigured() || analytics.vercel.isConfigured(),
=======
    analytics: () => analytics.google.isConfigured() || analytics.vercel.isConfigured(),
>>>>>>> origin/copilot/update-main-with-all-branches
    communications: twilio.isConfigured,
    cms: wordpress.isConfigured,
    streaming: webrtc.isConfigured,
    affiliate: affiliate.isConfigured,
  };
<<<<<<< HEAD

=======
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return featureMap[feature]?.() ?? false;
};

/**
 * Get a summary of all configured services
 */
export const getConfiguredServices = () => {
  return {
    stripe: stripe.isConfigured(),
    paypal: paypal.isConfigured(),
    openai: openai.isConfigured(),
    anthropic: anthropic.isConfigured(),
    gemini: gemini.isConfigured(),
    mongodb: mongodb.isConfigured(),
    analytics_google: analytics.google.isConfigured(),
    analytics_vercel: analytics.vercel.isConfigured(),
    twilio: twilio.isConfigured(),
    wordpress: wordpress.isConfigured(),
    webrtc: webrtc.isConfigured(),
    github: github.isConfigured(),
    affiliate: affiliate.isConfigured(),
  };
};

// Export all clients as default for convenience
export default {
  stripe,
  paypal,
  openai,
  anthropic,
  gemini,
  mongodb,
  analytics,
  twilio,
  wordpress,
  webrtc,
  github,
  affiliate,
  checkFeatureAvailability,
  getConfiguredServices,
};
