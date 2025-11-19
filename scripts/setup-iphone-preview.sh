#!/bin/bash
# Quick setup script for iPhone preview

echo "📱 iPhone 13 Preview Setup"
echo "=========================="
echo ""
echo "Step 1: Starting dev server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Installing dependencies first..."
    npm install
fi

echo ""
echo "✅ Dev server starting on port 5173"
echo ""
echo "📋 Next steps:"
echo "1. Look for the 'Ports' panel in Cursor (bottom of screen)"
echo "2. Find port 5173 in the list"
echo "3. Right-click → Port Visibility → Public"
echo "4. Copy the URL that appears"
echo "5. Open that URL in Safari on your iPhone 13"
echo ""
echo "🚀 Starting server now..."
echo ""

npm run dev
