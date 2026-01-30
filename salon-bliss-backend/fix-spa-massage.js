require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const fixSpaMassage = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update "Spa Massage" service (not "Massage Therapy")
    await Service.findOneAndUpdate(
      { name: 'Spa Massage' },
      { image: 'http://localhost:5000/images/spa Massage.jpg' }
    );
    console.log('✓ Updated Spa Massage with correct image');

    console.log('✓ Spa Massage image fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing spa massage image:', error);
    process.exit(1);
  }
};

fixSpaMassage();