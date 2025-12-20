#!/bin/bash
set -e

echo "🚀 Deploying 3000 Studios to Vercel Production"
echo "=============================================="
echo ""

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ Error: VERCEL_TOKEN environment variable is not set"
  echo "Please set VERCEL_TOKEN to deploy to Vercel"
  exit 1
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --token "$VERCEL_TOKEN" --prod --yes

echo ""
echo "✅ Deployment complete!"
echo "Visit your deployment at the URL shown above"
