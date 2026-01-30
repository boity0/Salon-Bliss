const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Order = require('../models/Order');
const Review = require('../models/Review');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      totalAppointments: await Appointment.countDocuments(),
      totalOrders: await Order.countDocuments(),
      totalReviews: await Review.countDocuments(),
      revenue: await Order.aggregate([
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),
      pendingAppointments: await Appointment.countDocuments({ status: 'pending' }),
      pendingOrders: await Order.countDocuments({ status: 'pending' }),
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
