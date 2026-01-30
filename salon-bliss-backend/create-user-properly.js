require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const createUserProperly = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Delete existing test user if exists
    await User.deleteOne({ email: 'test@salon.com' });
    console.log('Deleted existing test user');

    // Create new user using new User() and save() to trigger middleware
    const testUser = new User({
      name: 'Test User',
      email: 'test@salon.com',
      password: 'password123', // This will be hashed by the pre-save middleware
      role: 'user'
    });

    await testUser.save();

    console.log('✓ Test user created successfully with proper password hashing!');
    console.log('Email: test@salon.com');
    console.log('Password: password123');
    console.log('You can now login and place orders!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createUserProperly();