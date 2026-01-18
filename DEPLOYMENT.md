# 🌐 Deployment Guide

## Option 1: Appwrite Sites (Recommended - Free)

### Step 1: Create Appwrite Account
1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Sign up / Sign in

### Step 2: Create Project
1. Click "Create Project"
2. Name it (e.g., "My Portfolio")
3. Note your **Project ID** from Settings

### Step 3: Enable GitHub OAuth
1. Go to **Auth** → **Settings** → **OAuth2 Providers**
2. Enable **GitHub**
3. Go to [GitHub Developer Settings](https://github.com/settings/developers)
4. Create new OAuth App:
   - Homepage URL: `https://your-site.appwrite.network`
   - Callback URL: Copy from Appwrite console
5. Paste Client ID & Secret into Appwrite

### Step 4: Add Web Platform
1. Console → **Overview** → **Platforms**
2. Add **Web** platform
3. Hostname: `your-site.appwrite.network` (get after deployment)
4. Also add: `localhost` for local development

### Step 5: Deploy Site
1. Go to **Sites** → **Create Site**
2. Connect GitHub → Select your repo
3. Framework: Next.js (auto-detected)
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL=your.email@gmail.com
   ```
5. Click Deploy!

### Step 6: Update Platform Hostname
After deployment, add your actual site URL to Web Platforms.

---

## Option 2: Vercel (Alternative - Free)

### Step 1: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import Git Repository
3. Select your portfolio repo

### Step 2: Configure Environment
Add the same environment variables as above.

### Step 3: Deploy
Click Deploy. Done!

### Step 4: Update GitHub OAuth
Update callback URL in GitHub OAuth App to:
```
https://your-site.vercel.app/api/auth/callback/github
```

---

## 🔧 Troubleshooting

### "Invalid URI" Error
→ Add your domain to Appwrite Web Platforms

### "Project not accessible in this region"
→ Use correct endpoint for your project region (sgp, fra, etc.)

### "Runtime timeout"
→ First load may be slow (cold start). Refresh the page.

---

## 📧 Need Help?
Contact the seller for setup assistance!
