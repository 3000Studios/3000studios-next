/**
 * Products API Route
 * Returns products from MongoDB
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const products = await getProducts();
<<<<<<< HEAD
=======
=======
>>>>>>> origin/copilot/update-main-with-all-branches
    const dbProducts = await prisma.product.findMany();

    // Map Prisma 'id' to 'productId' for frontend compatibility
    const products = dbProducts.map((p: { id: string; [key: string]: unknown }) => ({
      ...p,
      productId: p.id,
    }));
<<<<<<< HEAD
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
>>>>>>> origin/copilot/update-main-with-all-branches

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Products API error:", error);

    // Return fallback products if database fails (keeping failover logic as requested for resilience)
    return NextResponse.json({
      success: true,
      products: [
        {
          id: "1", // Corrected from productId to id to match schema
          name: "Premium Digital Asset Pack",
          description: "High-quality digital assets for your creative projects",
          price: 99.99,
          category: "Digital",
          inStock: true,
        },
        {
          id: "2",
          name: "Creative Template Bundle",
          description: "Professional templates for web and design",
          price: 49.99,
          category: "Templates",
          inStock: true,
        },
      ],
      count: 2,
      fallback: true,
    });
  }
}
