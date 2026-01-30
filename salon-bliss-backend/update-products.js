require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/database');

const updateProducts = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update Hair Shampoo
    await Product.findOneAndUpdate(
      { name: 'Hair Shampoo' },
      { 
        name: 'TEST Premium Hair Shampoo',
        image: 'http://localhost:5000/images/Shampoo.jpg' 
      }
    );
    console.log('✓ Updated Hair Shampoo');

    // Update Conditioner
    await Product.findOneAndUpdate(
      { name: 'Conditioner' },
      { 
        name: 'Luxury Hair Conditioner',
        image: 'http://localhost:5000/images/Conditioner.jpg' 
      }
    );
    console.log('✓ Updated Conditioner');

    console.log('✓ Products updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
};

updateProducts();