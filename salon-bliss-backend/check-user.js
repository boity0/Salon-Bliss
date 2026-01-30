require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const checkUser = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Find the test user (including password field)
    const user = await User.findOne({ email: 'test@salon.com' }).select('+password');
    
    if (user) {
      console.log('✓ Test user found in database:');
      console.log('- ID:', user._id);
      console.log('- Name:', user.name);
      console.log('- Email:', user.email);
      console.log('- Role:', user.role);
      console.log('- Password hash exists:', !!user.password);
    } else {
      console.log('❌ Test user not found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking user:', error);
    process.exit(1);
  }
};

checkUser();