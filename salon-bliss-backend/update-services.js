require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const connectDB = require('./config/database');

const updateServices = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Update all services with your custom images
    await Service.findOneAndUpdate(
      { name: 'Hair Styling' },
      { image: 'http://localhost:5000/images/Hairstyling.jpg' }
    );
    console.log('✓ Updated Hair Styling');

    await Service.findOneAndUpdate(
      { name: 'Hair Coloring' },
      { image: 'http://localhost:5000/images/Haircolouring.jpg' }
    );
    console.log('✓ Updated Hair Coloring');

    await Service.findOneAndUpdate(
      { name: 'Facial Treatment' },
      { image: 'http://localhost:5000/images/facial treatment.jpg' }
    );
    console.log('✓ Updated Facial Treatment');

    await Service.findOneAndUpdate(
      { name: 'Manicure' },
      { image: 'http://localhost:5000/images/Manicure.jpg' }
    );
    console.log('✓ Updated Manicure');

    await Service.findOneAndUpdate(
      { name: 'Pedicure' },
      { image: 'http://localhost:5000/images/pedicure.jpg' }
    );
    console.log('✓ Updated Pedicure');

    await Service.findOneAndUpdate(
      { name: 'Massage Therapy' },
      { image: 'http://localhost:5000/images/spa treatment.jpg' }
    );
    console.log('✓ Updated Massage Therapy');

    await Service.findOneAndUpdate(
      { name: 'Makeup Application' },
      { image: 'http://localhost:5000/images/Makeup Application.jpg' }
    );
    console.log('✓ Updated Makeup Application');

    await Service.findOneAndUpdate(
      { name: 'Eyebrow Threading' },
      { image: 'http://localhost:5000/images/Eyebrow threading.jpg' }
    );
    console.log('✓ Updated Eyebrow Threading');

    console.log('✓ All services updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
};

updateServices();