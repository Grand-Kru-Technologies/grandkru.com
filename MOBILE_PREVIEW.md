# Mobile Preview Guide for Cursor/GitHub Codespaces

## Option 1: Port Forwarding (Built-in) ⭐ Recommended

### For Cursor:
1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Port forwarding happens automatically:**
   - Cursor will detect the dev server on port 5173
   - Look for a notification or check the "Ports" panel in Cursor
   - Right-click on port 5173 → "Port Visibility" → Set to "Public" or "Private"

3. **Get the forwarded URL:**
   - In Cursor, go to the "Ports" tab (usually in the bottom panel)
   - Find port 5173 and copy the public URL (looks like `https://xxxxx.cursor.sh` or similar)
   - Open this URL on your mobile phone's browser

### For GitHub Codespaces:
1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Port forwarding:**
   - GitHub Codespaces automatically forwards ports
   - Click the "Ports" tab at the bottom
   - Find port 5173, right-click → "Port Visibility" → "Public"
   - Copy the public URL (looks like `https://xxxxx-5173.app.github.dev`)

3. **Access on mobile:**
   - Open the public URL on your phone's browser
   - Works from anywhere, not just your local network!

## Option 2: Using ngrok (Works Everywhere)

If port forwarding isn't working, use ngrok:

1. **Install ngrok:**
   ```bash
   # Download from https://ngrok.com/download
   # Or use npm:
   npm install -g ngrok
   ```

2. **Start your dev server:**
   ```bash
   npm run dev
   ```

3. **In another terminal, start ngrok:**
   ```bash
   ngrok http 5173
   ```

4. **Copy the forwarding URL:**
   - ngrok will show a URL like `https://xxxxx.ngrok.io`
   - Open this URL on your mobile phone

## Option 3: Cloudflare Tunnel (Free Alternative)

1. **Install cloudflared:**
   ```bash
   # Download from https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
   ```

2. **Start tunnel:**
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```

3. **Use the provided URL on your phone**

## Option 4: Browser DevTools (Quick Test)

For quick mobile testing without a phone:

1. Open the site in Chrome/Edge
2. Press `F12` (or `Cmd+Option+I` on Mac)
3. Click device toolbar icon (or `Ctrl+Shift+M` / `Cmd+Shift+M`)
4. Select device preset or set custom dimensions

## Troubleshooting

- **Port not accessible?** Make sure port visibility is set to "Public"
- **Connection refused?** Ensure the dev server is running
- **HTTPS required?** Some mobile browsers require HTTPS - use ngrok or Cloudflare Tunnel
- **CORS issues?** The Vite config already has `host: true` which should handle this

## Quick Start Script

Run this to get started quickly:
```bash
npm run dev
```

Then check the Ports panel for the forwarded URL!
