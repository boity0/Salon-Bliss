require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/database');

const createTestUser = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@salon.com' });
    if (existingUser) {
      console.log('Test user already exists');
      console.log('Email: test@salon.com');
      console.log('Password: password123');
      process.exit(0);
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@salon.com',
      password: hashedPassword,
      role: 'user'
    });

    console.log('✓ Test user created successfully!');
    console.log('Email: test@salon.com');
    console.log('Password: password123');
    console.log('You can now login and place orders!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();