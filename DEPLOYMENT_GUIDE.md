# 🚀 Salon Bliss Deployment Guide

## Overview
Your salon website consists of:
- **Frontend**: React app (salon-bliss-frontend)
- **Backend**: Node.js API (salon-bliss-backend)
- **Database**: MongoDB (already hosted on MongoDB Atlas)

## 🎯 Recommended Deployment: Vercel + Railway

### **Step 1: Deploy Backend to Railway**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # In your salon-bliss-backend folder
   cd salon-bliss-backend
   
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize project
   railway init
   
   # Deploy
   railway up
   ```

3. **Set Environment Variables in Railway**
   - Go to your Railway dashboard
   - Click on your project
   - Go to Variables tab
   - Add these variables:
   ```
   MONGODB_URI=mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   PORT=5000
   ```

4. **Get Your Backend URL**
   - Railway will give you a URL like: `https://your-app-name.railway.app`
   - Save this URL - you'll need it for the frontend

### **Step 2: Deploy Frontend to Vercel**

1. **Update Frontend API URL**
   ```bash
   # In salon-bliss-frontend/src/services/axiosConfig.js
   # Update the baseURL to your Railway backend URL
   ```

2. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Deploy Frontend**
   ```bash
   # In your salon-bliss-frontend folder
   cd salon-bliss-frontend
   
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

## 🔧 Alternative: Netlify + Heroku

### **Backend on Heroku**
1. Create Heroku account
2. Install Heroku CLI
3. Deploy backend to Heroku

### **Frontend on Netlify**
1. Create Netlify account
2. Connect GitHub repository
3. Auto-deploy on push

## 🌐 Alternative: Single Server (VPS)

### **DigitalOcean/Linode Droplet**
- Deploy both frontend and backend on same server
- Use PM2 for process management
- Set up Nginx as reverse proxy
- Cost: ~$5-10/month

## 📋 Pre-Deployment Checklist

### **Backend Preparation**
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection working
- [ ] CORS configured for production domain
- [ ] JWT secret set
- [ ] Error handling in place

### **Frontend Preparation**
- [ ] API base URL updated for production
- [ ] Build process working (`npm run build`)
- [ ] Environment variables set
- [ ] No console.logs in production

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use platform-specific environment variable settings

2. **CORS Configuration**
   - Update CORS to allow your frontend domain
   - Remove localhost from production CORS

3. **Database Security**
   - MongoDB Atlas has built-in security
   - Ensure strong passwords
   - Whitelist IP addresses if needed

## 💰 Cost Breakdown

### **Free Tier (Recommended for Start)**
- **Vercel**: Free (hobby plan)
- **Railway**: Free tier (500 hours/month)
- **MongoDB Atlas**: Free tier (512MB)
- **Total**: $0/month

### **Paid Tier (For Production)**
- **Vercel Pro**: $20/month
- **Railway Pro**: $5/month
- **MongoDB Atlas**: $9/month (M2 cluster)
- **Total**: ~$34/month

## 🚀 Quick Deploy Commands

```bash
# Backend (Railway)
cd salon-bliss-backend
railway login
railway init
railway up

# Frontend (Vercel)
cd salon-bliss-frontend
vercel login
vercel --prod
```

## 📞 Support
If you need help with deployment:
1. Check platform documentation
2. Use platform support channels
3. Community forums for troubleshooting

Your salon website will be live and accessible worldwide! 🌍