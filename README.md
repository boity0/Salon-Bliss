# Salon Bliss - Complete Booking & E-commerce Platform

A full-stack salon management system with appointment booking, e-commerce, and staff management.

## Features

### ✨ Core Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Appointment Booking**: Browse services and book appointments with available staff
- **E-commerce Shop**: Browse and purchase salon products
- **Reviews & Ratings**: Leave reviews for services and products
- **User Dashboard**: View appointments, orders, and profile information
- **Admin Dashboard**: Manage services, products, staff, and view statistics

### 🛍️ Services
- Hair Styling & Coloring
- Facial Treatments
- Manicure & Pedicure
- Spa Massage
- Makeup Application
- And more...

### 🛒 Products
- Professional hair care products
- Skincare items
- Nail care products
- Makeup tools and accessories

### 👥 Staff Management
- View available staff members
- Book appointments with preferred stylists
- Staff specializations and availability

## Tech Stack

### Frontend
- **React 19.2.3** - UI framework
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **React Datepicker** - Date/time selection
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime
- **Express 4.18.2** - Web framework
- **MongoDB** - Database
- **Mongoose 7.5.0** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Joi** - Input validation
- **CORS** - Cross-origin requests

### Database
- **MongoDB Atlas** - Cloud database (free tier)
- Connection: Cloud hosted with backup

## Project Structure

```
salon-bliss/
├── salon-bliss-frontend/        # React application
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Auth/            # Login & Register
│   │   │   ├── Layout/          # Navbar & Footer
│   │   │   ├── Products/        # Product listing & cart
│   │   │   └── Services/        # Service listing
│   │   ├── context/             # React Context (Auth, Cart)
│   │   ├── pages/               # Page components
│   │   ├── services/            # API configuration
│   │   └── styles/              # CSS files
│   └── package.json
│
└── salon-bliss-backend/         # Express API
    ├── models/                  # Mongoose schemas
    │   ├── User.js
    │   ├── Service.js
    │   ├── Product.js
    │   ├── Appointment.js
    │   ├── Order.js
    │   ├── Review.js
    │   └── Staff.js
    ├── routes/                  # API endpoints
    │   ├── auth.js              # Auth endpoints
    │   ├── services.js
    │   ├── products.js
    │   ├── appointments.js
    │   ├── orders.js
    │   ├── reviews.js
    │   ├── staff.js
    │   ├── time-slots.js
    │   └── dashboard.js
    ├── middleware/              # Custom middleware
    │   ├── auth.js              # JWT verification
    │   └── validation.js        # Input validation
    ├── config/                  # Configuration
    │   └── database.js          # MongoDB connection
    ├── utils/                   # Utility functions
    │   └── jwt.js               # Token management
    ├── server.js                # Main server file
    ├── seed.js                  # Database seeding
    ├── .env                     # Environment variables
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free)

### Installation

1. **Install Frontend Dependencies**
```bash
cd salon-bliss-frontend
npm install --legacy-peer-deps
```

2. **Install Backend Dependencies**
```bash
cd ../salon-bliss-backend
npm install
```

### Environment Setup

Create `.env` in `salon-bliss-backend/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salon-bliss
JWT_SECRET=your_secure_secret_key_minimum_32_characters
JWT_EXPIRE=7d
```

### Running the Application

1. **Start Backend** (Terminal 1)
```bash
cd salon-bliss-backend
node server.js
# Backend runs on http://localhost:5000
```

2. **Start Frontend** (Terminal 2)
```bash
cd salon-bliss-frontend
npm start
# Frontend runs on http://localhost:3000
```

3. **Seed Database** (Optional - if data is missing)
```bash
cd salon-bliss-backend
node seed.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user

### Services
- `GET /api/services` - Get all services
- `GET /api/services?category=haircare` - Filter by category
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=skincare` - Filter by category
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Appointments
- `GET /api/appointments` - Get user's appointments (protected)
- `POST /api/appointments` - Book appointment (protected)
- `PUT /api/appointments/:id` - Update appointment (protected)
- `DELETE /api/appointments/:id` - Cancel appointment (protected)

### Orders
- `GET /api/orders` - Get user's orders (protected)
- `POST /api/orders` - Create order (protected)
- `PUT /api/orders/:id` - Update order status (admin)

### Reviews
- `GET /api/reviews` - Get reviews (with filtering)
- `POST /api/reviews` - Leave review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected/admin)

### Staff
- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get staff details
- `POST /api/staff` - Add staff (admin)
- `PUT /api/staff/:id` - Update staff (admin)
- `DELETE /api/staff/:id` - Delete staff (admin)

### Time Slots
- `GET /api/time-slots?staff_id=123&date=2024-01-20` - Get available time slots

### Dashboard
- `GET /api/dashboard/stats` - Get statistics (admin/staff)

## Pages & Features

### Public Pages
- **Home** - Landing page with featured services
- **Services** - Browse all salon services
- **Products** - Shop salon products
- **Login** - User authentication
- **Register** - Create new account

### Protected Pages (Login Required)
- **Book Appointment** - Schedule salon services
- **My Profile** - View user details and history
- **My Appointments** - Manage booked appointments
- **My Orders** - View purchased products
- **Reviews** - Leave and view reviews
- **Cart** - Shopping cart for products
- **Dashboard** - Admin statistics and management

## Authentication

The app uses JWT (JSON Web Tokens) for authentication:
1. User registers or logs in
2. Backend returns JWT token
3. Token stored in browser's localStorage
4. Token sent with every API request in Authorization header
5. Token expires after 7 days

## Database Models

### User
- Email, password, name, phone
- Role (user/admin/staff)
- Timestamps

### Service
- Name, description, price, duration
- Category (haircare, skincare, nails, wellness, makeup)
- Image URL, active status

### Product
- Name, description, price
- Category, stock, rating
- Image URL, review count

### Appointment
- User & service references
- Staff assignment
- Date, time, status
- Notes, total price

### Order
- User reference
- Items array with quantities and prices
- Delivery status
- Shipping address

### Review
- User reference
- Service or product reference
- Rating (1-5), comment
- Timestamps

### Staff
- Name, role, specialization
- Email, phone, image
- Active status

## Sample Data

The database is pre-populated with:
- **8 Services** - Hair styling, facials, massages, makeup, etc.
- **10 Products** - Hair care, skincare, nails, makeup products
- **5 Staff Members** - Stylists, estheticians, technicians, etc.

## Deployment

### Frontend Deployment
1. Build the app: `npm run build`
2. Deploy to Netlify, Vercel, or GitHub Pages
3. Update API_URL in axiosConfig.js

### Backend Deployment
Options:
- **Heroku** - Easy deployment with free tier
- **Railway.app** - Modern platform
- **Render** - Free tier available
- **DigitalOcean** - Affordable VPS

See `DEPLOYMENT.md` in backend folder for detailed instructions.

## Testing the App

1. **Register**: Create a new account at `/register`
2. **Login**: Login with your credentials at `/login`
3. **Browse**: Explore services and products
4. **Book**: Schedule an appointment with a stylist
5. **Shop**: Add products to cart and checkout
6. **Review**: Leave ratings for services

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Check connection string in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Login Not Working
- Check browser console for errors
- Verify backend is running
- Check JWT secret in .env matches

### Products/Services Not Showing
- Run seed script: `node seed.js`
- Check MongoDB connection
- Verify API endpoints are responding

## Features Included

✅ User registration and login
✅ JWT authentication
✅ Service browsing and filtering
✅ Product shopping
✅ Appointment booking
✅ Staff management
✅ Review system
✅ Order management
✅ Admin dashboard
✅ Responsive design
✅ Error handling
✅ Input validation
✅ Database seeding

## Future Enhancements

- Payment processing (Stripe/PayPal)
- Email notifications
- SMS reminders
- Real-time notifications
- Advanced search & filters
- User ratings and recommendations
- Loyalty program
- Inventory management
- Analytics dashboard
- Mobile app

## License

MIT License - feel free to use this project

## Support

For issues or questions, check the troubleshooting section or review the deployment guide.

---

**Happy Booking! Enjoy your Salon Bliss experience!** 💅✨
