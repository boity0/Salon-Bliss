require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const updateProductsAndServices = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update Products
    await Product.findOneAndUpdate(
      { name: 'Face Moisturizer' },
      { image: 'http://localhost:5000/images/Face moisturizer.jpeg' }
    );
    console.log('✓ Updated Face Moisturizer');

    await Product.findOneAndUpdate(
      { name: 'Facial Cleanser' },
      { image: 'http://localhost:5000/images/facial cleanser.jpg' }
    );
    console.log('✓ Updated Facial Cleanser');

    await Product.findOneAndUpdate(
      { name: 'Nail Polish' },
      { image: 'http://localhost:5000/images/nail polish.jpg' }
    );
    console.log('✓ Updated Nail Polish');

    // Update Services
    await Service.findOneAndUpdate(
      { name: 'Hair Styling' },
      { image: 'http://localhost:5000/images/hair dryer.jpg' }
    );
    console.log('✓ Updated Hair Styling service');

    await Service.findOneAndUpdate(
      { name: 'Makeup Application' },
      { image: 'http://localhost:5000/images/make up brushes set.jpg' }
    );
    console.log('✓ Updated Makeup Application service');

    // Check if there are products that could use hair oil or nail gel
    const products = await Product.find({});
    console.log('Available products:', products.map(p => p.name));

    console.log('✓ Products and services updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
};

updateProductsAndServices();