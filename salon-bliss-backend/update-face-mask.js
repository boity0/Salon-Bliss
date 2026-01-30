require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/database');

const updateFaceMask = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update Face Mask product
    await Product.findOneAndUpdate(
      { name: 'Face Mask' },
      { image: 'http://localhost:5000/images/face mask.jpg' }
    );
    console.log('✓ Updated Face Mask product');

    console.log('✓ Face mask image updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating face mask:', error);
    process.exit(1);
  }
};

updateFaceMask();