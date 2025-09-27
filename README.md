# Desi Wordle - Secure Backend Setup

This project has been updated to use a secure backend proxy to protect your Gemini API key from public exposure.

## 🔒 Security Fix

**Problem**: The original setup exposed your Gemini API key in the `config.js` file, making it visible to anyone who visited your website.

**Solution**: Created a Node.js backend that acts as a proxy between your frontend and the Gemini API, keeping your API key secure on the server side.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3001
   ```

### 3. Start the Backend Server

```bash
# For development
npm run dev

# For production
npm start
```

The backend will run on `http://localhost:3001` by default.

### 4. Serve Your Frontend

Your frontend files (`index.html`, `assets/`, etc.) can be served from any static file server. The frontend will automatically connect to the backend API.

## 📁 Project Structure

```
├── server.js              # Backend API server
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (your API key)
├── .gitignore            # Git ignore file
├── index.html            # Frontend application
├── config.js             # No longer contains API key
└── assets/               # Frontend assets
```

## 🔧 API Endpoints

- `POST /api/get-word` - Generate a new Desi word
- `POST /api/get-clue` - Get a clue for a word
- `GET /api/health` - Health check endpoint

## 🚀 Deployment

### For Production Deployment:

1. **Backend**: Deploy the Node.js server to a hosting service (Heroku, Railway, DigitalOcean, etc.)
2. **Frontend**: Deploy your static files to any web hosting service
3. **Environment**: Set the `GEMINI_API_KEY` environment variable on your hosting platform

### Environment Variables for Production:
- `GEMINI_API_KEY`: Your actual Gemini API key
- `PORT`: Port number (usually set automatically by hosting platform)

## 🔒 Security Benefits

- ✅ API key is never exposed to the browser
- ✅ API key is stored securely in environment variables
- ✅ Backend validates and sanitizes all requests
- ✅ CORS protection enabled
- ✅ No sensitive data in client-side code

## 🛠️ Development

- The frontend automatically detects if it's running on localhost and connects to `http://localhost:3001`
- In production, it uses the same origin as the frontend
- Use `npm run dev` for development with auto-restart on file changes

## 📝 Notes

- The original `config.js` file has been cleaned of the exposed API key
- All Gemini API calls now go through the secure backend proxy
- The frontend no longer needs the Google Generative AI library
