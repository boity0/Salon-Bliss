const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { validate, validationSchemas } = require('../middleware/validation');

// Get all orders (users see their own, admins see all)
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'user') {
      query.user = req.user.id;
    }
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price image');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (req.user.role === 'user' && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    console.log('Order creation request received');
    console.log('User:', req.user);
    console.log('Request body:', req.body);
    
    const { items, totalPrice, shippingAddress } = req.body;
    
    if (!items || items.length === 0) {
      console.log('Error: No items in order');
      return res.status(400).json({ message: 'Order must contain items' });
    }
    
    console.log('Creating order with data:', {
      user: req.user.id,
      items,
      totalPrice,
      shippingAddress,
    });
    
    const order = await Order.create({
      user: req.user.id,
      items,
      totalPrice,
      shippingAddress,
    });
    
    console.log('Order created successfully:', order._id);
    
    const populated = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.product');
    
    res.status(201).json({ message: 'Order created', order: populated });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update order status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).populate('user', 'name email').populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Process payment for confirmed order
router.post('/:id/payment', async (req, res) => {
  try {
    const { transactionId, method, last4 } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order
    if (req.user.role === 'user' && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if order is confirmed and unpaid
    if (order.status !== 'confirmed') {
      return res.status(400).json({ message: 'Order must be confirmed before payment' });
    }
    
    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Order already paid' });
    }
    
    // Update payment information
    order.paymentStatus = 'paid';
    order.paymentInfo = {
      transactionId,
      method,
      paidAt: new Date()
    };
    order.status = 'processing'; // Move to processing after payment
    
    await order.save();
    
    const populated = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.product');
    
    res.json({ message: 'Payment processed successfully', order: populated });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
