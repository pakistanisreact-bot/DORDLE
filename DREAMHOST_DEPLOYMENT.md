# 🚀 Dreamhost Deployment Guide for Desi Wordle

## Overview
Since Dreamhost is primarily for static hosting, we'll use a hybrid approach:
- **Frontend**: Deploy to Dreamhost (your main website)
- **Backend**: Use Vercel serverless functions (free and secure)

## 🎯 Complete Setup Instructions

### Step 1: Deploy Backend to Vercel (Free)

1. **Create Vercel Account**:
   - Go to [vercel.com](https://vercel.com) and sign up
   - Connect your GitHub account

2. **Create New Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the functions in the `api/` folder

3. **Set Environment Variables**:
   - Go to your project → Settings → Environment Variables
   - Click "Add New"
   - Name: `GEMINI_API_KEY`
   - Value: `your_actual_gemini_api_key_here` (paste your real API key)
   - Environment: Select "Production" (and optionally "Preview" for testing)
   - Click "Save"

4. **Deploy**:
   - Vercel will automatically deploy
   - You'll get a URL like: `https://your-project-name.vercel.app`

### Step 2: Update Frontend Configuration

1. **Update API URL**:
   - Edit `index.html`
   - Replace `https://your-vercel-app.vercel.app` with your actual Vercel URL
   - Save the file

### Step 3: Upload to Dreamhost

1. **Files to Upload**:
   Upload these files to your Dreamhost `public_html` directory:
   - `index.html` (updated with your Vercel URL)
   - `assets/` folder (entire folder)
   - `config.js` (the cleaned version)

2. **Upload Methods**:
   - **FTP**: Use FileZilla or similar FTP client
   - **File Manager**: Use Dreamhost's web-based file manager
   - **SSH**: If you have SSH access

3. **Directory Structure on Dreamhost**:
   ```
   public_html/
   ├── index.html
   ├── config.js
   └── assets/
       └── index-B5Qt9EMX.js
   ```

### Step 4: Test Your Deployment

1. **Test Backend**: Visit `https://your-vercel-url.vercel.app/api/get-word` (should show method not allowed for GET)
2. **Test Frontend**: Visit your Dreamhost domain and play the game
3. **Check Console**: Open browser dev tools to ensure no errors

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Make sure your Vercel URL is correct in `index.html`
   - Check that the API functions are deployed correctly

2. **API Key Issues**:
   - Verify environment variable is set in Vercel
   - Check Vercel function logs for errors
   - If you see "Secret does not exist" error, make sure you set the environment variable in Vercel dashboard, not in vercel.json

3. **Frontend Not Loading**:
   - Check file paths on Dreamhost
   - Ensure all files are uploaded correctly

### Debug Steps:

1. **Check Vercel Function Logs**:
   - Go to Vercel dashboard → Functions tab
   - Look for any error messages

2. **Test API Directly**:
   ```bash
   curl -X POST https://your-vercel-url.vercel.app/api/get-word \
        -H "Content-Type: application/json" \
        -d '{"usedWords":[]}'
   ```

3. **Check Browser Console**:
   - Open dev tools → Console tab
   - Look for any JavaScript errors

## 💰 Cost Breakdown

- **Dreamhost**: Your existing hosting (no additional cost)
- **Vercel**: Free tier includes 100GB bandwidth/month
- **Total Additional Cost**: $0

## 🔒 Security Benefits

- ✅ API key stored securely in Vercel environment variables
- ✅ No sensitive data in your Dreamhost files
- ✅ CORS properly configured
- ✅ Serverless functions scale automatically
- ✅ HTTPS enabled on both frontend and backend

## 📞 Support

If you run into issues:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test the API endpoints directly
4. Check browser console for errors

## 🎉 You're Done!

Once deployed, your Desi Wordle will be:
- Running on your Dreamhost domain
- Using secure serverless backend
- Completely free to operate
- Fully functional and secure!
