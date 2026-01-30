require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@salon.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email: admin@salon.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'Salon Admin',
      email: 'admin@salon.com',
      password: 'admin123',
      role: 'admin',
      phone: '+27123456789'
    });

    await admin.save();

    console.log('✓ Admin user created successfully!');
    console.log('Email: admin@salon.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('You can now login as admin to manage orders and appointments!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();