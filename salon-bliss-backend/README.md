# Salon Bliss Backend

Node.js + Express backend API for the Salon Bliss application.

## Features

- RESTful API endpoints for Services, Products, Appointments, Orders, and Reviews
- Authentication endpoints (login, register, logout)
- Staff management
- Time slot scheduling
- Dashboard statistics
- CORS enabled for frontend integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd salon-bliss-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already created) and configure:
```
PORT=5000
NODE_ENV=development
```

### Running the Server

**Development mode** (with auto-reload using nodemon):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/category/:category` - Get services by category

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/search?q=query` - Search products

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/current-user` - Get current user
- `POST /api/logout` - User logout

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order

### Reviews
- `GET /api/reviews` - Get reviews (with optional filters)
- `POST /api/reviews` - Create review

### Staff
- `GET /api/staff` - Get all staff members
- `GET /api/staff/:id` - Get staff member by ID

### Time Slots
- `GET /api/time-slots?staff_id=1&date=2024-01-20` - Get available time slots

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Next Steps

### To upgrade to a real database:

1. **Install MongoDB or PostgreSQL**
2. **Install database driver**:
   - MongoDB: `npm install mongoose`
   - PostgreSQL: `npm install pg`
3. **Create models/schemas** for Services, Products, Users, Appointments, Orders, Reviews
4. **Replace mock data** in routes with database queries

### To add authentication:

1. Install JWT and bcrypt:
```bash
npm install jsonwebtoken bcryptjs
```

2. Update auth routes to:
   - Hash passwords with bcrypt
   - Generate JWT tokens
   - Verify tokens in protected routes

### To deploy:

Options:
- **Heroku** - Easy Node.js deployment
- **AWS** - EC2 or Lambda
- **DigitalOcean** - Affordable VPS
- **Netlify/Vercel** - Serverless functions

## Project Structure

```
salon-bliss-backend/
├── server.js           # Main server file
├── data.js            # Mock database
├── package.json       # Dependencies
├── .env              # Environment variables
└── routes/
    ├── services.js      # Service endpoints
    ├── products.js      # Product endpoints
    ├── auth.js         # Authentication endpoints
    ├── appointments.js  # Appointment endpoints
    ├── orders.js       # Order endpoints
    ├── reviews.js      # Review endpoints
    ├── staff.js        # Staff endpoints
    ├── time-slots.js   # Time slot endpoints
    └── dashboard.js    # Dashboard endpoints
```

## Notes

- Currently uses in-memory mock data (data will be lost when server restarts)
- Replace with a proper database for production use
- Add proper authentication/authorization for security
- Add input validation and error handling
- Consider adding logging, monitoring, and testing

## License

ISC
