require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/database');

const updateRemainingProducts = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update remaining products with your images
    await Product.findOneAndUpdate(
      { name: 'Hair Oil' },
      { image: 'http://localhost:5000/images/hair oil.jpg' }
    );
    console.log('✓ Updated Hair Oil');

    await Product.findOneAndUpdate(
      { name: 'Nail Gel' },
      { image: 'http://localhost:5000/images/nail gel.jpg' }
    );
    console.log('✓ Updated Nail Gel');

    await Product.findOneAndUpdate(
      { name: 'Makeup Brush Set' },
      { image: 'http://localhost:5000/images/make up brushes set.jpg' }
    );
    console.log('✓ Updated Makeup Brush Set');

    console.log('✓ All remaining products updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
};

updateRemainingProducts();