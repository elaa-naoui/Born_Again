# GitHub Hosting Setup Guide

## Frontend - GitHub Pages (Free)

Your frontend is now automatically deployed to GitHub Pages!

### ✅ What's configured:
- **GitHub Actions workflow** automatically builds and deploys on every push to `main`
- **Base path** set to `/Born_Again/` in Vite config
- **Live URL:** `https://elaa-naoui.github.io/Born_Again/`

### To enable GitHub Pages:
1. Go to your repository: https://github.com/elaa-naoui/Born_Again
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
   - This is already configured! The workflow will run automatically

### Automatic deployments:
- Every time you push to `main`, GitHub Actions will:
  1. Build your project with `pnpm build`
  2. Deploy the `dist/` folder to GitHub Pages
  3. Your site will be live in ~2-3 minutes

---

## Backend - Vercel (Recommended for Express)

Deploy your Express backend for FREE on Vercel!

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize access to your repositories

### Step 2: Deploy Backend
1. In Vercel dashboard, click **"Add New..." → "Project"**
2. Select your **Born_Again** repository
3. Configure:
   - **Framework Preset:** Node.js
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Output Directory:** Leave blank
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables
In Vercel project settings, go to **Environment Variables** and add:
```
NODE_ENV=production
FRONTEND_URL=https://elaa-naoui.github.io/Born_Again
ALLOWED_ORIGINS=https://elaa-naoui.github.io/Born_Again
PORT=3000
```

### Step 4: Deploy
1. Click **Deploy**
2. Wait for build to complete (~1-2 minutes)
3. Your API will be at: `https://your-project-name.vercel.app/api/`

### Update Frontend API Calls
In your React components, update API endpoints:
```typescript
// Before
const API_BASE = 'http://localhost:3001'

// After (add this to .env)
VITE_API_URL=https://your-project-name.vercel.app
```

---

## Alternative: Backend on Render (Also Free)

If you prefer another service:

### Step 1: Deploy on Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your Born_Again repository
5. Configure:
   - **Name:** born-again-api
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `node backend/server.js`
   - **Root Directory:** (leave blank)

### Step 2: Add Environment Variables
```
NODE_ENV=production
FRONTEND_URL=https://elaa-naoui.github.io/Born_Again
ALLOWED_ORIGINS=https://elaa-naoui.github.io/Born_Again
PORT=3000
```

### Step 3: Deploy
Backend will be at: `https://born-again-api.onrender.com`

---

## Deployment Status

### Frontend ✅
- **Platform:** GitHub Pages
- **URL:** https://elaa-naoui.github.io/Born_Again/
- **Updates:** Automatic on push to main
- **Cost:** Free

### Backend ⏳ (Choose one)
- **Option 1:** Vercel (Recommended)
  - Cost: Free tier (100GB bandwidth/month)
  - URL: `https://your-project.vercel.app`
  
- **Option 2:** Render
  - Cost: Free tier with auto-sleep
  - URL: `https://your-project.onrender.com`

---

## Next Steps

1. **Deploy Frontend:**
   - Go to https://github.com/elaa-naoui/Born_Again/actions
   - Check the deploy workflow status
   - Once complete, visit: https://elaa-naoui.github.io/Born_Again/

2. **Deploy Backend:**
   - Choose Vercel or Render
   - Follow the steps above for your choice
   - Update `.env` with production URL

3. **Connect Frontend ↔ Backend:**
   - Create `.env` file in project root:
     ```
     VITE_API_URL=https://your-backend-url.vercel.app
     ```
   - Update API calls in components
   - Push changes to trigger redeploy

4. **Monitor Deployments:**
   - Frontend: https://github.com/elaa-naoui/Born_Again/actions
   - Backend: Vercel/Render dashboard

---

## Troubleshooting

### GitHub Pages shows blank page
- Clear browser cache (Ctrl+Shift+Delete)
- Check workflow status: Settings → Actions
- Check vite.config.ts has `base: '/Born_Again/'`

### API calls fail
- Check CORS is enabled in backend
- Verify ALLOWED_ORIGINS includes your frontend URL
- Check environment variables on hosting platform

### Large file warning
- Some video files are >50MB
- Consider using GitHub LFS or hosting media on CDN
- Or compress videos before committing

---

## Useful Links

- **GitHub Actions Status:** https://github.com/elaa-naoui/Born_Again/actions
- **GitHub Pages Settings:** https://github.com/elaa-naoui/Born_Again/settings/pages
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Render Dashboard:** https://dashboard.render.com

Happy hosting! 🚀
