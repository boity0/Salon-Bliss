const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { validate, validationSchemas } = require('../middleware/validation');
const { authorize } = require('../middleware/auth');

// Get all appointments (admin/staff can see all, users see their own)
router.get('/', async (req, res) => {
  try {
    let query = {};
    // Users see only their appointments
    if (req.user.role === 'user') {
      query.user = req.user.id;
    }
    const appointments = await Appointment.find(query)
      .populate('service')
      .populate('user', 'name email phone')
      .populate('staff', 'name specialization');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('service')
      .populate('user', 'name email phone')
      .populate('staff', 'name specialization');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Users can only see their own appointments
    if (req.user.role === 'user' && appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create appointment
router.post('/', validate(validationSchemas.createAppointmentSchema), async (req, res) => {
  try {
    console.log('Appointment creation request received');
    console.log('User:', req.user);
    console.log('Request body:', req.body);
    console.log('Validated data:', req.validatedData);
    
    const appointment = await Appointment.create({
      ...req.validatedData,
      user: req.user.id,
    });
    
    console.log('Appointment created successfully:', appointment._id);
    
    const populated = await Appointment.findById(appointment._id)
      .populate('service')
      .populate('staff', 'name');
    
    res.status(201).json({ message: 'Appointment created', appointment: populated });
  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Users can only update their own appointments
    if (req.user.role === 'user' && appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('service').populate('staff', 'name');
    
    res.json({ message: 'Appointment updated', appointment: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Users can only cancel their own appointments
    if (req.user.role === 'user' && appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Process payment for confirmed appointment
router.post('/:id/payment', async (req, res) => {
  try {
    const { transactionId, method, last4 } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user owns this appointment
    if (req.user.role === 'user' && appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if appointment is confirmed and unpaid
    if (appointment.status !== 'confirmed') {
      return res.status(400).json({ message: 'Appointment must be confirmed before payment' });
    }
    
    if (appointment.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Appointment already paid' });
    }
    
    // Update payment information
    appointment.paymentStatus = 'paid';
    appointment.paymentInfo = {
      transactionId,
      method,
      paidAt: new Date()
    };
    
    await appointment.save();
    
    const populated = await Appointment.findById(appointment._id)
      .populate('service')
      .populate('user', 'name email')
      .populate('staff', 'name');
    
    res.json({ message: 'Payment processed successfully', appointment: populated });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
