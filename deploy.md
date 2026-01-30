# 🚀 Quick Deployment Steps

## Step 1: Deploy Backend (Railway)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Go to backend folder
cd salon-bliss-backend

# 3. Login to Railway
railway login

# 4. Create new project
railway init

# 5. Deploy
railway up
```

**Set Environment Variables in Railway Dashboard:**
- `MONGODB_URI`: mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority
- `JWT_SECRET`: your-super-secret-jwt-key-here
- `NODE_ENV`: production
- `PORT`: 5000

## Step 2: Deploy Frontend (Vercel)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Go to frontend folder
cd salon-bliss-frontend

# 3. Create .env.local file
echo "REACT_APP_API_URL=https://your-railway-url.railway.app/api" > .env.local

# 4. Login to Vercel
vercel login

# 5. Deploy
vercel --prod
```

## Step 3: Update CORS

After deployment, update your backend CORS_ORIGIN environment variable in Railway to your Vercel URL.

## 🎉 Your Salon Website is Live!

- **Frontend**: https://your-salon.vercel.app
- **Backend**: https://your-backend.railway.app
- **Admin**: https://your-salon.vercel.app/login (admin@salon.com / admin123)

## 💡 Tips

1. **Custom Domain**: You can add a custom domain in Vercel settings
2. **SSL**: Both platforms provide free SSL certificates
3. **Monitoring**: Check Railway and Vercel dashboards for logs
4. **Updates**: Push to GitHub and redeploy automatically

## 🔧 Troubleshooting

- **CORS Errors**: Update CORS_ORIGIN in Railway
- **API Not Found**: Check REACT_APP_API_URL in Vercel
- **Database Issues**: Verify MongoDB Atlas connection
- **Build Errors**: Check build logs in platform dashboards