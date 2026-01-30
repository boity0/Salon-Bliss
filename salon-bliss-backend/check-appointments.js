require('dotenv').config();
const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
const User = require('./models/User');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const checkAppointments = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Get all appointments
    const appointments = await Appointment.find({})
      .populate('user', 'name email')
      .populate('service', 'name price');
    
    console.log(`Found ${appointments.length} appointments:`);
    appointments.forEach(apt => {
      console.log(`- ID: ${apt._id}`);
      console.log(`  User: ${apt.user?.name} (${apt.user?.email})`);
      console.log(`  Service: ${apt.service?.name}`);
      console.log(`  Date: ${apt.date}`);
      console.log(`  Time: ${apt.time}`);
      console.log(`  Status: ${apt.status}`);
      console.log(`  Created: ${apt.createdAt}`);
      console.log('---');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAppointments();