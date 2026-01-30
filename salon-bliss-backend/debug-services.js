require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const debugServices = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Get all services to see their exact names and images
    const services = await Service.find({});
    console.log('All services in database:');
    services.forEach(service => {
      console.log(`- Name: "${service.name}", Image: "${service.image}"`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

debugServices();