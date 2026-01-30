require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const fixMassage = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update Massage Therapy with correct image name
    await Service.findOneAndUpdate(
      { name: 'Massage Therapy' },
      { image: 'http://localhost:5000/images/spa Massage.jpg' }
    );
    console.log('✓ Updated Massage Therapy with correct image');

    console.log('✓ Massage image fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing massage image:', error);
    process.exit(1);
  }
};

fixMassage();