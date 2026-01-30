const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide service name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide service description'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide service duration in minutes'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide service price'],
    },
    category: {
      type: String,
      required: [true, 'Please provide service category'],
      enum: ['haircare', 'skincare', 'nails', 'wellness', 'makeup'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200?text=Service',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
