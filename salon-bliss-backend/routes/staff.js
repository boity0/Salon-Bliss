const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const { protect, authorize } = require('../middleware/auth');

// Get all staff
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find({ isActive: true });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get staff by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Staff.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create staff (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json({ message: 'Staff member created', staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update staff (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json({ message: 'Staff member updated', staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete staff (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json({ message: 'Staff member deleted', staff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
