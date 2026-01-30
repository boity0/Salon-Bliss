const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Order = require('./models/Order');
const User = require('./models/User');

async function fixOrderStatus() {
  try {
    // Update all processing orders to confirmed so customers can pay
    const result = await Order.updateMany(
      { status: 'processing' },
      { status: 'confirmed' }
    );
    
    console.log(`Updated ${result.modifiedCount} orders from processing to confirmed`);
    
    // Show current order status
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('\n=== CURRENT ORDER STATUS ===');
    orders.forEach(order => {
      console.log(`Order ${order._id.toString().slice(-6)}: ${order.status} | Payment: ${order.paymentStatus} | User: ${order.user.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixOrderStatus();