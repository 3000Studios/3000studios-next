/**
 * MongoDB Service
 * Database connection and analytics data management
 */

import { MongoClient, Db } from "mongodb";

const MONGO_PUBLIC_KEY = process.env.MONGO_PUBLIC_KEY;
const MONGO_PRIVATE_KEY = process.env.MONGO_PRIVATE_KEY;
const MONGO_IP = process.env.MONGO_IP;

// Connection string format for MongoDB Atlas
const uri = `mongodb+srv://${MONGO_PUBLIC_KEY}:${MONGO_PRIVATE_KEY}@${MONGO_IP}/?retryWrites=true&w=majority`;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("3000studios");
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// Analytics Data Models
export interface AnalyticsData {
  totalRevenue: number;
  activeUsers: number;
  storeOrders: number;
  liveViewers: number;
  pageViews: number;
  conversionRate: number;
  timestamp: Date;
}

export interface UserActivity {
  userId: string;
  action: string;
  page: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface User {
  userId: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin" | "elite";
  subscriptionStatus: "free" | "pro" | "elite";
  stripeCustomerId?: string;
  createdAt: Date;
  lastLogin: Date;
}

// User Management
export async function createUser(user: User): Promise<void> {
  const database = await connectToDatabase();
  await database.collection("users").insertOne(user);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const database = await connectToDatabase();
  const user = await database.collection("users").findOne({ email });
  return user as User | null;
}

export async function updateUser(
  userId: string,
<<<<<<< HEAD
  updates: Partial<User>,
=======
  updates: Partial<User>
>>>>>>> origin/pr/50
): Promise<void> {
  const database = await connectToDatabase();
  await database.collection("users").updateOne({ userId }, { $set: updates });
}

export interface Order {
  orderId: string;
  userId?: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "paypal" | "stripe";
  createdAt: Date;
  completedAt?: Date;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  affiliateLink?: string;
  commission?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Functions
export async function getAnalytics(
<<<<<<< HEAD
  timeRange: "day" | "week" | "month" = "day",
=======
  timeRange: "day" | "week" | "month" = "day"
>>>>>>> origin/pr/50
): Promise<AnalyticsData> {
  try {
    const database = await connectToDatabase();
    const analytics = database.collection("analytics");

    const now = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case "day":
        startDate.setDate(now.getDate() - 1);
        break;
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
    }

    const data = await analytics.findOne(
      { timestamp: { $gte: startDate } },
      { sort: { timestamp: -1 } },
    );

    if (!data) {
      // Return default data if none exists
      return {
        totalRevenue: 0,
        activeUsers: 0,
        storeOrders: 0,
        liveViewers: 0,
        pageViews: 0,
        conversionRate: 0,
        timestamp: now,
      };
    }

    return {
      totalRevenue: (data.totalRevenue as number) || 0,
      activeUsers: (data.activeUsers as number) || 0,
      storeOrders: (data.storeOrders as number) || 0,
      liveViewers: (data.liveViewers as number) || 0,
      pageViews: (data.pageViews as number) || 0,
      conversionRate: (data.conversionRate as number) || 0,
      timestamp: (data.timestamp as Date) || now,
    };
  } catch (error) {
    console.error("Get analytics error:", error);
    throw new Error("Failed to fetch analytics");
  }
}

export async function trackUserActivity(activity: UserActivity): Promise<void> {
  try {
    const database = await connectToDatabase();
    const activities = database.collection("user_activities");

    await activities.insertOne(activity);
  } catch (error) {
    console.error("Track activity error:", error);
    throw new Error("Failed to track user activity");
  }
}

export async function saveOrder(order: Order): Promise<void> {
  try {
    const database = await connectToDatabase();
    const orders = database.collection("orders");

    await orders.insertOne(order);
  } catch (error) {
    console.error("Save order error:", error);
    throw new Error("Failed to save order");
  }
}

export async function getOrders(limit: number = 10): Promise<Order[]> {
  try {
    const database = await connectToDatabase();
    const orders = database.collection("orders");

    const results = await orders
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return results.map((doc) => ({
      orderId: doc.orderId as string,
      userId: doc.userId as string | undefined,
      items: doc.items as Array<{
        productId: string;
        name: string;
        price: number;
        quantity: number;
      }>,
      total: doc.total as number,
      status: doc.status as "pending" | "completed" | "failed" | "refunded",
      paymentMethod: doc.paymentMethod as "paypal" | "stripe",
      createdAt: doc.createdAt as Date,
      completedAt: doc.completedAt as Date | undefined,
    }));
  } catch (error) {
    console.error("Get orders error:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const database = await connectToDatabase();
    const products = database.collection("products");

    const results = await products.find({ inStock: true }).toArray();
    return results.map((doc) => ({
      productId: doc.productId as string,
      name: doc.name as string,
      description: doc.description as string,
      price: doc.price as number,
      category: doc.category as string,
      inStock: doc.inStock as boolean,
      rating: doc.rating as number,
      reviewCount: doc.reviewCount as number,
      affiliateLink: doc.affiliateLink as string | undefined,
      commission: doc.commission as number | undefined,
      createdAt: doc.createdAt as Date,
      updatedAt: doc.updatedAt as Date,
    }));
  } catch (error) {
    console.error("Get products error:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function updateProduct(
  productId: string,
<<<<<<< HEAD
  updates: Partial<Product>,
=======
  updates: Partial<Product>
>>>>>>> origin/pr/50
): Promise<void> {
  try {
    const database = await connectToDatabase();
    const products = database.collection("products");

    await products.updateOne(
      { productId },
      { $set: { ...updates, updatedAt: new Date() } },
    );
  } catch (error) {
    console.error("Update product error:", error);
    throw new Error("Failed to update product");
  }
}

export async function getDashboardStats() {
  try {
    const database = await connectToDatabase();

    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);

    // Get current month stats
    const currentStats = await database
      .collection("analytics")
      .findOne({ timestamp: { $gte: lastMonth } }, { sort: { timestamp: -1 } });

    // Get order stats
    const ordersCollection = database.collection("orders");
    const totalOrders = await ordersCollection.countDocuments({
      createdAt: { $gte: lastMonth },
      status: "completed",
    });

    const revenueAgg = await ordersCollection
      .aggregate([
        {
          $match: {
            createdAt: { $gte: lastMonth },
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$total" },
          },
        },
      ])
      .toArray();

    const revenue = revenueAgg[0]?.total || 0;

    return {
      totalRevenue: revenue,
      activeUsers: currentStats?.activeUsers || 0,
      storeOrders: totalOrders,
      liveViewers: currentStats?.liveViewers || 0,
      pageViews: currentStats?.pageViews || 0,
      conversionRate: currentStats?.conversionRate || 0,
    };
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    throw new Error("Failed to fetch dashboard stats");
  }
}
