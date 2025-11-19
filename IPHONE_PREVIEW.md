# Preview on iPhone 13 - No Terminal Required 📱

## Method 1: Cursor Port Forwarding (Easiest) ⭐

### Steps:

1. **In Cursor (on your computer):**
   - Start the dev server: Click the terminal in Cursor and run `npm run dev`
   - Look for the "Ports" panel/tab (usually at the bottom of Cursor)
   - If you don't see it, go to: View → Ports (or press `Cmd+Shift+P` and search "Ports")

2. **Set up port forwarding:**
   - Find port `5173` in the Ports list
   - Right-click on port 5173
   - Select "Port Visibility" → "Public"
   - You'll see a URL appear (like `https://xxxxx.cursor.sh`)

3. **On your iPhone 13:**
   - Open Safari (or any browser)
   - Type or paste the URL from step 2
   - The site should load!

## Method 2: GitHub Codespaces Port Forwarding

### Steps:

1. **In GitHub Codespaces:**
   - Start dev server: Run `npm run dev` in the terminal
   - Click the "Ports" tab at the bottom of the window
   - Find port `5173` in the list

2. **Make it public:**
   - Right-click on port 5173
   - Select "Port Visibility" → "Public"
   - Copy the URL (looks like `https://xxxxx-5173.app.github.dev`)

3. **On your iPhone:**
   - Open Safari
   - Paste the URL
   - Done!

## Method 3: Use a Web-Based Tunnel (No Terminal on iPhone)

If port forwarding isn't working, use a web-based service:

### Option A: LocalTunnel (Web Interface)
1. **On your computer in Cursor:**
   - Run: `npm install -g localtunnel`
   - Start dev server: `npm run dev` (in one terminal)
   - Run: `lt --port 5173` (in another terminal)
   - Copy the URL it gives you (like `https://xxxxx.loca.lt`)

2. **On iPhone:**
   - Open Safari
   - Paste the URL

### Option B: Cloudflare Tunnel (Web Interface)
1. **On your computer:**
   - Download cloudflared from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
   - Run: `cloudflared tunnel --url http://localhost:5173`
   - Copy the URL it provides

2. **On iPhone:**
   - Open Safari
   - Paste the URL

## Method 4: Deploy to Preview URL (Permanent Solution)

If you want a permanent URL you can access anytime:

1. **Build the site:**
   - Run: `npm run build`

2. **Deploy to a free hosting service:**
   - **Vercel**: Connect your GitHub repo, it auto-deploys
   - **Netlify**: Drag and drop the `dist` folder
   - **GitHub Pages**: Push to a `gh-pages` branch

3. **Access on iPhone:**
   - Use the provided URL from the hosting service
   - Works from anywhere, anytime!

## Quick Reference

**Most Common Issue:** Port not set to "Public"
- Solution: Right-click port 5173 → Port Visibility → Public

**Can't find Ports panel?**
- Cursor: View → Ports or `Cmd+Shift+P` → "Ports: Focus on Ports View"
- Codespaces: Look for "Ports" tab at bottom

**URL not working on iPhone?**
- Make sure it starts with `https://` (not `http://`)
- Try clearing Safari cache
- Check that dev server is still running

## Recommended: Use Cursor Port Forwarding

This is the easiest method - just:
1. Run `npm run dev` in Cursor
2. Open Ports panel
3. Make port 5173 public
4. Copy URL to iPhone Safari

No terminal needed on iPhone! 🎉
