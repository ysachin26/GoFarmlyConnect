# Vercel Deployment & Security Guide

## 🚨 CRITICAL SECURITY ACTIONS REQUIRED

### 1. **Immediately Revoke Exposed Credentials**
Your MongoDB and Cloudinary credentials were exposed in `.env.local`. You **MUST** take these actions:

#### MongoDB:
```bash
# 1. Change your MongoDB password immediately
# Go to: https://cloud.mongodb.com/v2 > Security > Database Access
# Change the password for user "StayConnect"

# 2. Create a new connection string
# Copy the new connection string

# 3. Update in Vercel dashboard
# See step 5 below
```

#### Cloudinary:
```bash
# 1. Regenerate API Key and Secret
# Go to: https://console.cloudinary.com/console/c-dashboard/settings/security
# Generate new API credentials

# 2. Regenerate keys immediately
```

### 2. **Never Commit `.env.local`**
✅ Already configured in `.gitignore` but verify:
```bash
git rm --cached .env.local  # If it was already committed
```

### 3. **Set Environment Variables in Vercel**

Go to your **Vercel Dashboard** → **Settings** → **Environment Variables**

Add these variables:
```
MONGODB_URI = your_new_mongodb_connection_string
DB_NAME = stayconnect
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_new_api_key
CLOUDINARY_API_SECRET = your_new_api_secret
NEXTAUTH_SECRET = $(openssl rand -base64 32)
NEXTAUTH_URL = https://yourdomain.com
```

Generate NEXTAUTH_SECRET:
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows PowerShell:
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 4. **Update Local Development**

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your **NEW** credentials:
```
MONGODB_URI=mongodb+srv://StayConnect:NEW_PASSWORD@cluster0.nn6bly5.mongodb.net/stayconnect
DB_NAME=stayconnect
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_new_api_key
CLOUDINARY_API_SECRET=your_new_api_secret
```

3. **NEVER** commit `.env.local`

## ✅ Changes Made for Vercel Deployment

### 1. **Fixed Dependency Versions** ✅
- Changed all `"latest"` to specific versions
- Prevents unexpected breaking changes
- Better security (no auto-update to vulnerable versions)

### 2. **Enabled TypeScript Strict Mode** ✅
- `strict: true` in `tsconfig.json`
- Catches type errors at compile time
- Required for production

### 3. **Enabled Proper Linting** ✅
- `ignoreDuringBuilds: false` in `next.config.mjs`
- Catches errors before deployment
- Build will fail if there are errors

### 4. **Added Security Headers** ✅
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 5. **Optimized Images for Vercel** ✅
- `unoptimized: false` enables Vercel Image Optimization
- Added Cloudinary as remote pattern
- Reduces bandwidth and improves performance

### 6. **Created Vercel Configuration** ✅
- `vercel.json` - Vercel deployment settings
- `.env.example` - Template for environment variables

### 7. **Updated Target to ES2020** ✅
- Better performance and modern JavaScript support

## 📋 Pre-Deployment Checklist

- [ ] Revoke old MongoDB password
- [ ] Regenerate Cloudinary API credentials
- [ ] Set all environment variables in Vercel dashboard
- [ ] Update `.env.local` with new credentials
- [ ] Run `npm install` to update dependencies
- [ ] Run `npm run build` locally and verify no errors
- [ ] Commit changes (but NOT `.env.local`)
- [ ] Push to GitHub
- [ ] Connect repository to Vercel
- [ ] Vercel will automatically deploy

## 🚀 Deploy to Vercel

### Option 1: Git Push (Recommended)
```bash
# Make sure .env.local is NOT staged
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin main

# Vercel will automatically detect and deploy
```

### Option 2: Manual Deploy
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables
5. Click "Deploy"

## 📊 Monitoring After Deployment

Your app has a health check endpoint:
```
GET /api/health
```

This endpoint:
- ✅ Tests MongoDB connection
- ✅ Verifies database operations
- ✅ Reports query performance
- ✅ Shows uptime metrics

Monitor it in production using Vercel Analytics.

## 🔒 Additional Security Recommendations

1. **Enable HTTPS Redirect**
   - Vercel handles this automatically
   - All traffic is encrypted

2. **Regular Dependency Updates**
   ```bash
   npm outdated  # Check for updates
   npm update    # Update to latest compatible versions
   ```

3. **Environment Secrets Rotation**
   - Rotate Cloudinary keys every 6 months
   - Rotate MongoDB password quarterly

4. **Monitor Vercel Logs**
   - Watch for errors in Vercel dashboard
   - Set up error alerts

## ❓ Troubleshooting

### Build fails with TypeScript errors:
```bash
npm run build  # Run locally to debug
```

### Environment variables not working:
1. Verify they're set in Vercel dashboard
2. Redeploy after setting variables
3. Check variable names match exactly

### MongoDB connection timeout:
1. Check MongoDB connection string is correct
2. Verify IP whitelist in MongoDB Atlas allows Vercel IPs
3. In MongoDB Atlas: Security → Network Access → Add IP Address
4. For Vercel, use `0.0.0.0/0` (open to all) or add Vercel's IP ranges

### Images not loading:
1. Verify Cloudinary credentials are correct
2. Check that `.cloudinary.com` is not blocked
3. Verify image URLs in database

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Cloudinary Docs: https://cloudinary.com/documentation
