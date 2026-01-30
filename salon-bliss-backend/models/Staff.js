const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide staff name'],
    },
    role: {
      type: String,
      required: [true, 'Please provide staff role'],
    },
    specialization: {
      type: String,
      required: [true, 'Please provide specialization'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    phone: String,
    image: String,
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

module.exports = mongoose.model('Staff', staffSchema);
