#!/bin/bash
# Helper script to start dev server for mobile preview

echo "=========================================="
echo "🚀 Starting Dev Server for Mobile Preview"
echo "=========================================="
echo ""
echo "Starting Vite dev server on port 5173..."
echo ""
echo "📱 To preview on mobile:"
echo ""
echo "1. Check the 'Ports' panel in Cursor/Codespaces"
echo "2. Find port 5173 and set visibility to 'Public'"
echo "3. Copy the public URL and open it on your phone"
echo ""
echo "Or use ngrok:"
echo "  npm install -g ngrok"
echo "  ngrok http 5173"
echo ""
echo "=========================================="
echo ""

# Start the dev server
npm run dev
