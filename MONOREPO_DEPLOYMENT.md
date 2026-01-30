# 🚀 Salon Bliss Monorepo Deployment Guide

## 📁 Repository Structure
Your project is now organized as a monorepo with both frontend and backend in a single repository:

```
Salon-Bliss/
├── salon-bliss-frontend/    # React frontend
├── salon-bliss-backend/     # Node.js backend
├── package.json            # Root package.json with scripts
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation
```

## 🎯 Deployment Strategy: Vercel + Railway

### **Step 1: Push to GitHub**

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial monorepo setup for Salon Bliss"

# Push to your GitHub repository
git push -u origin main
```

### **Step 2: Deploy Frontend to Vercel**

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your `Salon-Bliss` repository

2. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Root Directory**: `salon-bliss-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

3. **Environment Variables** (if needed)
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

### **Step 3: Deploy Backend to Railway**

1. **Create New Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Salon-Bliss` repository

2. **Configure Railway Settings**
   - **Root Directory**: `salon-bliss-backend`
   - **Start Command**: `npm start`
   - **Build Command**: `npm install`

3. **Set Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   PORT=5000
   ```

### **Step 4: Connect Frontend to Backend**

1. **Update API Configuration**
   - Edit `salon-bliss-frontend/src/services/axiosConfig.js`
   - Replace the baseURL with your Railway backend URL

2. **Update CORS Settings**
   - Edit `salon-bliss-backend/server.js`
   - Add your Vercel frontend URL to CORS origins

## 🔧 Local Development

### **Quick Start Commands**
```bash
# Install all dependencies
npm run install:all

# Start backend (Terminal 1)
npm run dev:backend

# Start frontend (Terminal 2)
npm run dev:frontend
```

### **Individual Commands**
```bash
# Backend only
cd salon-bliss-backend
npm install
npm run dev

# Frontend only
cd salon-bliss-frontend
npm install
npm start
```

## 🌐 Production URLs

After deployment, you'll have:
- **Frontend**: `https://salon-bliss.vercel.app`
- **Backend**: `https://salon-bliss-backend.railway.app`
- **Admin Dashboard**: `https://salon-bliss.vercel.app/admin`

## 🔒 Security Checklist

- [ ] Environment variables set in both platforms
- [ ] CORS configured for production domains
- [ ] MongoDB Atlas IP whitelist updated
- [ ] JWT secrets are secure and different from development
- [ ] No sensitive data in repository

## 📋 Post-Deployment Steps

1. **Test the Application**
   - Visit your frontend URL
   - Test user registration/login
   - Test booking appointments
   - Test product purchases
   - Test admin dashboard

2. **Update DNS (Optional)**
   - Point your custom domain to Vercel
   - Update backend URL in frontend if using custom domain

3. **Monitor Performance**
   - Check Vercel analytics
   - Monitor Railway logs
   - Set up error tracking if needed

## 🚨 Troubleshooting

### **Common Issues:**

1. **Frontend can't connect to backend**
   - Check API URL in axiosConfig.js
   - Verify CORS settings in backend
   - Check Railway backend is running

2. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

3. **Database connection issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure environment variables are set

## 💡 Tips for Success

- Always test locally before deploying
- Use environment variables for all configuration
- Monitor deployment logs for errors
- Keep your GitHub repository updated
- Use meaningful commit messages

Your salon website is now ready for professional deployment! 🎉