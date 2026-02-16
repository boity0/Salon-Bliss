const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { protect, authorize } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://salon-bliss-project.netlify.app',
  'https://salon-bliss-production.up.railway.app',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/products', require('./routes/products'));
app.use('/api/appointments', protect, require('./routes/appointments'));
app.use('/api/orders', protect, require('./routes/orders'));
app.use('/api/reviews', protect, require('./routes/reviews'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/time-slots', require('./routes/time-slots'));
app.use('/api/dashboard', protect, authorize('admin', 'staff'), require('./routes/dashboard'));

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Salon Bliss API', 
    status: 'online',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Salon Bliss Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
});
