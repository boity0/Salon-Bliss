require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const fixHairDryer = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update Hair Dryer product (not service)
    await Product.findOneAndUpdate(
      { name: 'Hair Dryer' },
      { image: 'http://localhost:5000/images/hair dryer.jpg' }
    );
    console.log('✓ Updated Hair Dryer product');

    // Reset Hair Styling service back to a default image
    await Service.findOneAndUpdate(
      { name: 'Hair Styling' },
      { image: 'https://images.unsplash.com/photo-1562122176-39e9f1bbd5ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    );
    console.log('✓ Reset Hair Styling service image');

    console.log('✓ Hair dryer moved to products successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing hair dryer:', error);
    process.exit(1);
  }
};

fixHairDryer();