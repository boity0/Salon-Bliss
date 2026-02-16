# Complete Render + Netlify Deployment Guide

## Current Status
- ✅ Frontend deployed on Netlify: https://salon-bliss-project.netlify.app
- ✅ Backend deployed on Render (but needs environment variables)
- ✅ MongoDB connection string is correct in backend `.env` file

## Steps to Complete Deployment

### Step 1: Configure Render Environment Variables

In your Render dashboard for the backend service:

1. Go to your service settings
2. Find "Environment Variables" section
3. Add these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://boitumelochantel04_db_user:7YPVSJhkYH9W6oa0@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Save and wait for Render to redeploy

### Step 2: Get Your Render Backend URL

1. In Render dashboard, find your backend service
2. Copy the URL (should look like: `https://salon-bliss-backend.onrender.com` or similar)
3. Test it by visiting: `https://YOUR-RENDER-URL/health`
   - You should see: `{"status":"Server is running","timestamp":"..."}`

### Step 3: Configure Netlify Environment Variable

1. Go to Netlify dashboard
2. Select your "salon-bliss-project" site
3. Go to: Site settings → Environment variables
4. Add a new variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://YOUR-RENDER-URL/api` (replace with your actual Render URL)
5. Save

### Step 4: Redeploy Frontend

1. In Netlify, go to Deploys tab
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Wait for deployment to complete

### Step 5: Verify Everything Works

Visit https://salon-bliss-project.netlify.app and test:

1. ✅ Homepage loads
2. ✅ Images display (from backend)
3. ✅ Services page shows services
4. ✅ Products page shows products
5. ✅ Login works
6. ✅ Can book appointments
7. ✅ Can add products to cart and place orders
8. ✅ Admin can manage orders/appointments
9. ✅ Payment system works after admin confirmation

## Troubleshooting

### If Render shows "Bad Gateway":
- Check that environment variables are set correctly
- Check Render logs for errors
- Verify MongoDB connection string is correct

### If frontend can't connect to backend:
- Verify `REACT_APP_API_URL` is set in Netlify
- Check browser console for CORS errors
- Verify Render URL is accessible at `/health` endpoint

### If images don't load:
- Backend must be running successfully
- Images are served from: `https://YOUR-RENDER-URL/images/`
- Check that `public/images` folder exists in backend

## MongoDB Atlas IP Whitelist

Already configured to allow connections from anywhere (0.0.0.0/0), so Render can connect.

## CORS Configuration

Backend is already configured to accept requests from:
- http://localhost:3000 (development)
- https://salon-bliss-project.netlify.app (production)

## What's Your Render Backend URL?

Please check your Render dashboard and provide the backend URL so I can help you configure it properly!
