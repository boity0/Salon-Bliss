const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');

async function testOrderFlow() {
  try {
    // Find a test user
    const user = await User.findOne({ email: { $ne: 'admin@salon.com' } });
    if (!user) {
      console.log('No regular user found');
      return;
    }

    // Find some products
    const products = await Product.find().limit(2);
    if (products.length === 0) {
      console.log('No products found');
      return;
    }

    // Check existing orders
    const existingOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price');
    
    console.log('\n=== EXISTING ORDERS ===');
    existingOrders.forEach(order => {
      console.log(`Order ${order._id.toString().slice(-6)}: ${order.status} | Payment: ${order.paymentStatus} | User: ${order.user.email}`);
    });

    // Create a test order if none exist
    if (existingOrders.length === 0) {
      console.log('\n=== CREATING TEST ORDER ===');
      const testOrder = await Order.create({
        user: user._id,
        items: products.map(product => ({
          product: product._id,
          quantity: 1,
          price: product.price
        })),
        totalPrice: products.reduce((sum, p) => sum + p.price, 0),
        shippingAddress: '123 Test Street, Test City'
      });
      
      console.log(`Created test order: ${testOrder._id.toString().slice(-6)}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testOrderFlow();