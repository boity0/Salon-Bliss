const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Order = require('./models/Order');
const Appointment = require('./models/Appointment');
const User = require('./models/User');
const Product = require('./models/Product');
const Service = require('./models/Service');

async function setupReviewData() {
  try {
    // Find the test user
    const user = await User.findOne({ email: { $ne: 'admin@salon.com' } });
    if (!user) {
      console.log('No regular user found');
      return;
    }

    // Update some orders to be paid (so user can review products)
    const paidOrdersUpdate = await Order.updateMany(
      { user: user._id, paymentStatus: 'unpaid' },
      { paymentStatus: 'paid', status: 'delivered' },
      { limit: 2 }
    );
    console.log(`Updated ${paidOrdersUpdate.modifiedCount} orders to paid status`);

    // Update some appointments to be completed and paid (so user can review services)
    const completedAppointmentsUpdate = await Appointment.updateMany(
      { user: user._id, status: 'confirmed', paymentStatus: 'unpaid' },
      { status: 'completed', paymentStatus: 'paid' },
      { limit: 1 }
    );
    console.log(`Updated ${completedAppointmentsUpdate.modifiedCount} appointments to completed status`);

    // Show current status
    const orders = await Order.find({ user: user._id })
      .populate('items.product', 'name')
      .sort({ createdAt: -1 });
    
    const appointments = await Appointment.find({ user: user._id })
      .populate('service', 'name')
      .sort({ createdAt: -1 });

    console.log('\n=== USER ORDER STATUS ===');
    orders.forEach(order => {
      console.log(`Order ${order._id.toString().slice(-6)}: ${order.status} | Payment: ${order.paymentStatus}`);
      order.items.forEach(item => {
        console.log(`  - ${item.product?.name || 'Unknown Product'}`);
      });
    });

    console.log('\n=== USER APPOINTMENT STATUS ===');
    appointments.forEach(apt => {
      console.log(`Appointment ${apt._id.toString().slice(-6)}: ${apt.status} | Payment: ${apt.paymentStatus} | Service: ${apt.service?.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

setupReviewData();