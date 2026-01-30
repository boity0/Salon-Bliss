const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://boitumeloxaba:Boitumelo123@cluster0.teqypfu.mongodb.net/salon-bliss?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Appointment = require('./models/Appointment');
const User = require('./models/User');
const Service = require('./models/Service');

async function createTestAppointments() {
  try {
    // Find a test user
    const user = await User.findOne({ email: { $ne: 'admin@salon.com' } });
    if (!user) {
      console.log('No regular user found');
      return;
    }

    // Find some services
    const services = await Service.find().limit(3);
    if (services.length === 0) {
      console.log('No services found');
      return;
    }

    // Check existing appointments
    const existingAppointments = await Appointment.find()
      .populate('user', 'name email')
      .populate('service', 'name price');
    
    console.log('\n=== EXISTING APPOINTMENTS ===');
    existingAppointments.forEach(apt => {
      console.log(`Appointment ${apt._id.toString().slice(-6)}: ${apt.status} | Payment: ${apt.paymentStatus || 'unpaid'} | Service: ${apt.service?.name} | User: ${apt.user.email}`);
    });

    // Create test appointments if needed
    if (existingAppointments.length < 3) {
      console.log('\n=== CREATING TEST APPOINTMENTS ===');
      
      // Create a pending appointment
      const pendingApt = await Appointment.create({
        user: user._id,
        service: services[0]._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        time: '10:00 AM',
        notes: 'First appointment - needs admin confirmation',
        status: 'pending',
        paymentStatus: 'unpaid',
        totalPrice: services[0].price
      });
      console.log(`Created pending appointment: ${pendingApt._id.toString().slice(-6)}`);
      
      // Create a confirmed appointment (ready for payment)
      const confirmedApt = await Appointment.create({
        user: user._id,
        service: services[1]._id,
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        time: '2:00 PM',
        notes: 'Confirmed appointment - ready for payment',
        status: 'confirmed',
        paymentStatus: 'unpaid',
        totalPrice: services[1].price
      });
      console.log(`Created confirmed appointment: ${confirmedApt._id.toString().slice(-6)}`);
    }
    
    // Show final status
    const allAppointments = await Appointment.find()
      .populate('user', 'name email')
      .populate('service', 'name price')
      .sort({ createdAt: -1 });
    
    console.log('\n=== ALL APPOINTMENTS ===');
    allAppointments.forEach(apt => {
      console.log(`Appointment ${apt._id.toString().slice(-6)}: ${apt.status} | Payment: ${apt.paymentStatus || 'unpaid'} | Service: ${apt.service?.name} | User: ${apt.user.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestAppointments();