#!/bin/bash
# Script to show network URL for mobile preview

echo "=========================================="
echo "Mobile Preview Instructions"
echo "=========================================="
echo ""
echo "1. Make sure your dev server is running: npm run dev"
echo ""
echo "2. Find your local IP address:"
if command -v hostname &> /dev/null; then
    IP=$(hostname -I | awk '{print $1}')
    echo "   Your IP: $IP"
elif command -v ipconfig &> /dev/null; then
    echo "   Run: ipconfig (Windows) or ifconfig (Mac/Linux)"
else
    echo "   Check your network settings"
fi
echo ""
echo "3. On your phone (same WiFi network), open:"
echo "   http://YOUR_IP:5173"
echo ""
echo "4. Or use browser DevTools mobile emulation:"
echo "   - Press F12 in Chrome/Edge"
echo "   - Click device toolbar icon (Ctrl+Shift+M)"
echo "=========================================="
