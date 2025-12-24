/**
 * Products API Route
 * Returns products from MongoDB
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/services/mongodb';

export async function GET(request: NextRequest) {
  try {
<<<<<<< HEAD
    const products = await getProducts();
=======
    const dbProducts = await prisma.product.findMany();

    // Map Prisma 'id' to 'productId' for frontend compatibility
    const products = dbProducts.map((p: { id: string; [key: string]: unknown }) => ({
      ...p,
      productId: p.id,
    }));
>>>>>>> origin/copilot/resolve-git-conflicts

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error('Products API error:', error);
    
    // Return fallback products if database fails
    return NextResponse.json({
      success: true,
      products: [
        {
          productId: '1',
          name: 'Premium Digital Asset Pack',
          description: 'High-quality digital assets for your creative projects',
          price: 99.99,
          category: 'Digital',
          inStock: true,
          rating: 4.8,
          reviewCount: 124,
        },
        {
          productId: '2',
          name: 'Creative Template Bundle',
          description: 'Professional templates for web and design',
          price: 49.99,
          category: 'Templates',
          inStock: true,
          rating: 4.9,
          reviewCount: 256,
        },
      ],
      count: 2,
      fallback: true,
    });
  }
}
