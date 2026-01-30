const express = require('express');
const router = express.Router();

// Get available time slots
router.get('/', (req, res) => {
  const { staff_id, date } = req.query;
  
  if (!staff_id || !date) {
    return res.status(400).json({ message: 'staff_id and date required' });
  }
  
  // Mock time slots - in production, check appointments table
  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '05:00 PM', available: true },
  ];
  
  res.json({
    staffId: staff_id,
    date,
    slots: timeSlots
  });
});

module.exports = router;
