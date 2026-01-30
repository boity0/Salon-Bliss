const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Review = require('./models/Review');
const User = require('./models/User');
const Order = require('./models/Order');
const Appointment = require('./models/Appointment');
const Product = require('./models/Product');
const Service = require('./models/Service');

async function createTestReviews() {
  try {
    // Find the test user
    const user = await User.findOne({ email: { $ne: 'admin@salon.com' } });
    if (!user) {
      console.log('No regular user found');
      return;
    }

    // Check current reviews
    const existingReviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name')
      .populate('service', 'name');
    
    console.log('\n=== EXISTING REVIEWS ===');
    existingReviews.forEach(review => {
      const itemName = review.product?.name || review.service?.name || 'Unknown';
      const itemType = review.product ? 'Product' : 'Service';
      console.log(`Review by ${review.user.email}: ${review.rating}/5 for ${itemType} "${itemName}"`);
    });

    // Check user's purchase history
    const paidOrders = await Order.find({
      user: user._id,
      paymentStatus: 'paid'
    }).populate('items.product', 'name');

    const completedAppointments = await Appointment.find({
      user: user._id,
      status: 'completed',
      paymentStatus: 'paid'
    }).populate('service', 'name');

    console.log('\n=== USER PURCHASE HISTORY ===');
    console.log(`Paid Orders: ${paidOrders.length}`);
    paidOrders.forEach(order => {
      order.items.forEach(item => {
        console.log(`- Product: ${item.product?.name}`);
      });
    });

    console.log(`Completed Appointments: ${completedAppointments.length}`);
    completedAppointments.forEach(apt => {
      console.log(`- Service: ${apt.service?.name}`);
    });

    // Create some sample reviews if user has purchase history but no reviews
    if (existingReviews.length === 0 && (paidOrders.length > 0 || completedAppointments.length > 0)) {
      console.log('\n=== CREATING SAMPLE REVIEWS ===');
      
      // Review for a product if available
      if (paidOrders.length > 0 && paidOrders[0].items.length > 0) {
        const productItem = paidOrders[0].items[0];
        if (productItem.product) {
          const productReview = await Review.create({
            user: user._id,
            product: productItem.product._id,
            rating: 5,
            comment: "Amazing product! Really helped improve my hair texture and shine. Highly recommend!"
          });
          console.log(`Created product review for: ${productItem.product.name}`);
        }
      }

      // Review for a service if available
      if (completedAppointments.length > 0) {
        const serviceAppointment = completedAppointments[0];
        if (serviceAppointment.service) {
          const serviceReview = await Review.create({
            user: user._id,
            service: serviceAppointment.service._id,
            rating: 4,
            comment: "Great service! The staff was professional and the results exceeded my expectations. Will definitely book again."
          });
          console.log(`Created service review for: ${serviceAppointment.service.name}`);
        }
      }
    }

    // Show final review status
    const allReviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name')
      .populate('service', 'name')
      .sort({ createdAt: -1 });
    
    console.log('\n=== ALL REVIEWS ===');
    allReviews.forEach(review => {
      const itemName = review.product?.name || review.service?.name || 'Unknown';
      const itemType = review.product ? 'Product' : 'Service';
      console.log(`${review.rating}/5 stars - ${itemType}: ${itemName}`);
      console.log(`By: ${review.user.email}`);
      if (review.comment) {
        console.log(`Comment: "${review.comment}"`);
      }
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestReviews();