# Salon Bliss Backend - Deployment Guide

Your backend is now production-ready with MongoDB, authentication, and validation!

## Prerequisites for Deployment

1. **MongoDB Database**
   - Option 1: Use MongoDB Atlas (Cloud) - Free tier available at https://www.mongodb.com/cloud/atlas
   - Option 2: Local MongoDB Server

2. **Node.js Hosting**
   - Heroku (Easy, free tier available)
   - Railway.app (Modern, easy)
   - DigitalOcean (Affordable)
   - AWS (Scalable)
   - Render (Free tier available)

## Step 1: Set Up MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/salon-bliss`)
5. Update `.env` with this URL

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salon-bliss
JWT_SECRET=your_secure_random_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
```

## Step 2: Deploy to Heroku (Free Option)

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

2. **Create Heroku app**:
```bash
heroku login
heroku create your-salon-bliss-backend
```

3. **Set environment variables**:
```bash
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set NODE_ENV=production
```

4. **Deploy**:
```bash
git push heroku main
```

5. **View logs**:
```bash
heroku logs --tail
```

## Step 2 Alternative: Deploy to Railway.app

1. Go to https://railway.app
2. Connect your GitHub repo
3. Add MongoDB plugin
4. Set environment variables in dashboard
5. Deploy with one click

## Step 2 Alternative: Deploy to Render

1. Go to https://render.com
2. Create new "Web Service"
3. Connect GitHub
4. Add MongoDB connection string
5. Deploy

## Update Frontend API URL

After deployment, update frontend `api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://your-deployed-backend.herokuapp.com/api';
```

## Testing Deployed Backend

```bash
# Test health endpoint
curl https://your-deployed-backend.herokuapp.com/health

# Register user
curl -X POST https://your-deployed-backend.herokuapp.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Get services
curl https://your-deployed-backend.herokuapp.com/api/services
```

## Production Checklist

- ✅ Environment variables set securely
- ✅ MongoDB Atlas cluster created
- ✅ JWT secret changed from default
- ✅ CORS origins updated if needed
- ✅ Error logging configured
- ✅ Database backups enabled
- ✅ API rate limiting (optional)
- ✅ HTTPS enabled (automatic with hosting)

## Database Models Created

- User (with password hashing & JWT)
- Service
- Product
- Appointment (with relationships)
- Order (with item tracking)
- Review
- Staff

## API Features

✅ **Authentication**
- User registration with validation
- Login with JWT tokens
- Password hashing with bcrypt
- Role-based access (user/admin/staff)

✅ **Validation**
- Input validation with Joi
- Error messages for all endpoints
- Data type checking

✅ **Authorization**
- Protected routes with middleware
- User-specific data access
- Admin-only operations

✅ **Database**
- Relationships between models
- MongoDB with Mongoose
- Automatic timestamps
- Data validation at schema level

## Next Steps After Deployment

1. **Add Admin Dashboard** - Create admin panel for managing services/products
2. **Add Email Notifications** - Send appointment confirmations
3. **Add Payment Processing** - Integrate Stripe for products
4. **Add Search/Filtering** - Advanced search capabilities
5. **Add Analytics** - Track user behavior
6. **Add Caching** - Redis for performance
7. **Add Logging** - Winston or similar for debugging
8. **Add Testing** - Jest/Mocha for unit tests

## Troubleshooting

**MongoDB Connection Error**
```
Check connection string format
Check firewall/whitelist IP in MongoDB Atlas
Ensure credentials are correct
```

**JWT Token Issues**
```
Verify JWT_SECRET is set
Check token expiration
Verify Authorization header format: "Bearer token"
```

**CORS Errors**
```
Update CORS origin in server.js with deployed frontend URL
Ensure credentials: true if needed
```

## Security Tips

1. Never commit `.env` file
2. Use strong JWT secret (minimum 32 characters)
3. Enable HTTPS (automatic with Heroku/Railway)
4. Set strong MongoDB password
5. Regularly update dependencies
6. Add rate limiting for APIs
7. Validate all user inputs
8. Use HTTPS for API calls

## Support & Resources

- MongoDB Docs: https://docs.mongodb.com
- Express Guide: https://expressjs.com
- Heroku Docs: https://devcenter.heroku.com
- JWT Guide: https://jwt.io

---

**Backend is now production-ready!** 🚀
