/**
 * Content Generation - Product Descriptions API Route
 * AI-powered product description generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateProductDescription } from '@/lib/services/openai';
import { updateProduct } from '@/lib/services/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, features, productId, autoSave } = body;

    if (!productName) {
      return NextResponse.json(
<<<<<<< HEAD
<<<<<<< HEAD
        { error: 'Product name required' },
=======
        { error: "Product name required" },
>>>>>>> origin/copilot/resolve-git-conflicts
=======
        { error: 'Product name required' },
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
        { status: 400 }
      );
    }

    // Generate product description using AI
    const description = await generateProductDescription(
      productName,
      features || []
    );

    // Auto-save to database if requested
    if (autoSave && productId) {
      try {
        await updateProduct(productId, { description });
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue even if save fails
      }
    }

    return NextResponse.json({
      success: true,
      description,
      productName,
      saved: autoSave && productId,
    });
  } catch (error) {
    console.error('Product description API error:', error);
    return NextResponse.json(
<<<<<<< HEAD
      { error: 'Failed to generate product description' },
<<<<<<< HEAD
=======
      { error: "Failed to generate product description" },
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
      { status: 500 }
    );
  }
}
