# 🚀 Deploy Your Salon Website to Netlify

## 🎯 Method 1: GitHub Integration (Recommended)

### Step 1: Push to GitHub
```bash
# Make sure your code is on GitHub
git add .
git commit -m "Ready for Netlify deployment"
git push origin master
```

### Step 2: Deploy on Netlify
1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login** with GitHub
3. **Click "New site from Git"**
4. **Choose GitHub** as your Git provider
5. **Select your repository** (salon-bliss-frontend)
6. **Configure build settings**:
   - **Branch to deploy**: `master` (or `main`)
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
7. **Click "Deploy site"**

### Step 3: Add Environment Variables
1. **Go to Site settings** → **Environment variables**
2. **Add variable**:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-backend-url.railway.app/api`
3. **Save** and **trigger redeploy**

## 🎯 Method 2: Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build and Deploy
```bash
# Go to frontend folder
cd salon-bliss-frontend

# Build the project
npm run build

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

## 🎯 Method 3: Drag & Drop

### Step 1: Build Locally
```bash
cd salon-bliss-frontend
npm run build
```

### Step 2: Deploy
1. **Go to [netlify.com](https://netlify.com)**
2. **Drag the `build` folder** to the deploy area
3. **Site will be live instantly!**

## 🔧 Netlify Configuration Files

### Create `netlify.toml` in your frontend root:
```toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Create `_redirects` file in `public` folder:
```
/*    /index.html   200
```

## 🌟 Netlify Advantages

### ✅ **Free Tier Includes:**
- **100GB bandwidth/month**
- **Custom domain support**
- **HTTPS certificates**
- **Form handling**
- **Deploy previews**

### ✅ **Features:**
- **Instant deployments**
- **Branch previews**
- **Rollback capability**
- **Edge functions**
- **Analytics**

## 🔗 After Deployment

### Your URLs will be:
- **Live site**: `https://your-site-name.netlify.app`
- **Admin dashboard**: `https://your-site-name.netlify.app/admin`

### Update Backend CORS:
In Railway, add environment variable:
- **Key**: `CORS_ORIGIN`
- **Value**: `https://your-site-name.netlify.app`

## 🚨 Common Issues & Solutions

### Build Fails:
- **Check Node version**: Use Node 18+
- **Clear cache**: Delete `node_modules` and `package-lock.json`, then `npm install`
- **Environment variables**: Make sure `REACT_APP_API_URL` is set

### Site Loads but API Doesn't Work:
- **Check environment variable** in Netlify
- **Verify backend URL** is correct
- **Update CORS** in Railway backend

### 404 Errors on Refresh:
- **Add `_redirects` file** to `public` folder
- **Or use `netlify.toml`** configuration

## 🎉 Success Checklist

After deployment, test:
- [ ] **Homepage loads** correctly
- [ ] **Login/Register** works
- [ ] **Services page** displays
- [ ] **Products page** displays
- [ ] **Booking system** works
- [ ] **Admin dashboard** accessible
- [ ] **Mobile responsive** design

## 💡 Pro Tips

### Custom Domain:
1. **Buy domain** (e.g., salonbliss.co.za)
2. **In Netlify**: Site settings → Domain management
3. **Add custom domain**
4. **Update DNS** records

### Performance:
- **Enable asset optimization** in Netlify
- **Use Netlify Analytics** to track visitors
- **Set up form handling** for contact forms

### Security:
- **HTTPS enabled** automatically
- **Environment variables** are secure
- **Deploy keys** for GitHub integration

## 🚀 Your Salon Website Will Be Live!

Netlify will give you:
- ✅ **Lightning-fast loading**
- ✅ **Global CDN**
- ✅ **Automatic HTTPS**
- ✅ **Easy updates** via Git
- ✅ **Professional URL**

**Choose your preferred method and let's get your salon online!** 🌟