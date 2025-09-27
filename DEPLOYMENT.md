# 🚀 Deployment Guide for Desi Wordle

## Overview
Your Desi Wordle now has two parts that need to be deployed:
1. **Backend Server** (Node.js) - Handles API calls securely
2. **Frontend** (Static files) - The game interface

## 🎯 Deployment Options

### Option 1: Railway (Recommended - Easy & Free)
Railway is perfect for Node.js backends and offers a generous free tier.

#### Backend Deployment (Railway):
1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Create project**: Click "New Project" → "Deploy from GitHub repo"
3. **Connect your repo**: Link your GitHub repository
4. **Set environment variables**:
   - `GEMINI_API_KEY` = your actual Gemini API key
   - `PORT` = 3001 (Railway will override this automatically)
5. **Deploy**: Railway will automatically build and deploy

#### Frontend Deployment (Netlify/Vercel):
1. **Netlify**: Go to [netlify.com](https://netlify.com) → "New site from Git" → Connect repo
2. **Vercel**: Go to [vercel.com](https://vercel.com) → "Import Project" → Connect repo

### Option 2: Heroku (Classic Choice)
#### Backend Deployment:
1. **Install Heroku CLI**: Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Set environment variables**:
   ```bash
   heroku config:set GEMINI_API_KEY=your_actual_api_key
   ```
5. **Deploy**: `git push heroku main`

### Option 3: DigitalOcean App Platform
1. **Create app**: Go to DigitalOcean → Apps → Create App
2. **Connect GitHub**: Link your repository
3. **Configure**: Set environment variables in the dashboard
4. **Deploy**: Automatic deployment on git push

## 🔧 Quick Setup Steps

### Step 1: Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with secure backend"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/desi-wordle.git
git push -u origin main
```

### Step 2: Deploy Backend
Choose one of the options above. Railway is recommended for beginners.

### Step 3: Update Frontend Configuration
After your backend is deployed, you'll get a URL like:
- Railway: `https://your-app-name.railway.app`
- Heroku: `https://your-app-name.herokuapp.com`

Update the frontend to use your backend URL:

```javascript
// In index.html, update this line:
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : 'https://your-backend-url.railway.app'; // Replace with your actual backend URL
```

### Step 4: Deploy Frontend
Deploy your static files to any hosting service:
- **Netlify**: Drag & drop your `index.html` and `assets/` folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages**: Enable in repository settings
- **Your existing hosting**: Upload files via FTP/cPanel

## 🔍 Testing Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.railway.app/api/health`
2. **Frontend**: Visit your frontend URL and try playing the game
3. **Check Console**: Open browser dev tools to ensure no errors

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend URL is correct in the frontend
2. **API Key Not Working**: Verify environment variables are set correctly
3. **Frontend Can't Connect**: Check that backend is running and accessible

### Debug Commands:
```bash
# Check if backend is running
curl https://your-backend-url.railway.app/api/health

# Check environment variables (Railway)
railway variables

# Check logs (Railway)
railway logs
```

## 💰 Cost Considerations

- **Railway**: Free tier includes 500 hours/month
- **Netlify**: Free tier for static sites
- **Vercel**: Free tier for personal projects
- **Heroku**: No longer has free tier, but cheap paid options

## 🔒 Security Checklist

- ✅ API key stored in environment variables
- ✅ Backend validates all requests
- ✅ CORS properly configured
- ✅ No sensitive data in frontend code
- ✅ HTTPS enabled (automatic on most platforms)

## 📞 Need Help?

If you run into issues:
1. Check the platform's documentation
2. Look at the deployment logs
3. Test the backend API directly
4. Verify environment variables are set correctly
