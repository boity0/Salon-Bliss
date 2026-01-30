const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Order = require('../models/Order');
const Appointment = require('../models/Appointment');
const { validate, validationSchemas } = require('../middleware/validation');

// Get reviews
router.get('/', async (req, res) => {
  try {
    const { service, product } = req.query;
    const query = {};
    
    if (service) {
      query.service = service;
    }
    if (product) {
      query.product = product;
    }
    
    const reviews = await Review.find(query)
      .populate('user', 'name')
      .populate('service', 'name')
      .populate('product', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's eligible items for review (purchased products and completed services)
router.get('/eligible', async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get paid orders with products
    const paidOrders = await Order.find({
      user: userId,
      paymentStatus: 'paid'
    }).populate('items.product', 'name image price');
    
    // Get completed appointments with services
    const completedAppointments = await Appointment.find({
      user: userId,
      status: 'completed',
      paymentStatus: 'paid'
    }).populate('service', 'name image price');
    
    // Get existing reviews to filter out already reviewed items
    const existingReviews = await Review.find({ user: userId });
    const reviewedProducts = existingReviews.filter(r => r.product).map(r => r.product.toString());
    const reviewedServices = existingReviews.filter(r => r.service).map(r => r.service.toString());
    
    // Extract eligible products (not yet reviewed)
    const eligibleProducts = [];
    paidOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.product && !reviewedProducts.includes(item.product._id.toString())) {
          eligibleProducts.push({
            type: 'product',
            id: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            orderDate: order.createdAt
          });
        }
      });
    });
    
    // Extract eligible services (not yet reviewed)
    const eligibleServices = completedAppointments
      .filter(apt => apt.service && !reviewedServices.includes(apt.service._id.toString()))
      .map(apt => ({
        type: 'service',
        id: apt.service._id,
        name: apt.service.name,
        image: apt.service.image,
        price: apt.service.price,
        appointmentDate: apt.date
      }));
    
    res.json({
      products: eligibleProducts,
      services: eligibleServices
    });
  } catch (error) {
    console.error('Error fetching eligible items:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create review
router.post('/', validate(validationSchemas.createReviewSchema), async (req, res) => {
  try {
    const { service, product, rating, comment } = req.validatedData;
    const userId = req.user.id;
    
    // Check that either service or product is provided
    if (!service && !product) {
      return res.status(400).json({ message: 'Either service or product is required' });
    }
    
    // Verify user has purchased the product or used the service
    let hasAccess = false;
    
    if (product) {
      // Check if user has a paid order containing this product
      const paidOrder = await Order.findOne({
        user: userId,
        paymentStatus: 'paid',
        'items.product': product
      });
      hasAccess = !!paidOrder;
    }
    
    if (service) {
      // Check if user has a completed and paid appointment for this service
      const completedAppointment = await Appointment.findOne({
        user: userId,
        service: service,
        status: 'completed',
        paymentStatus: 'paid'
      });
      hasAccess = !!completedAppointment;
    }
    
    if (!hasAccess) {
      return res.status(403).json({ 
        message: 'You can only review products you have purchased or services you have used' 
      });
    }
    
    // Check if user has already reviewed this item
    const existingReview = await Review.findOne({
      user: userId,
      ...(product ? { product } : { service })
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this item' });
    }
    
    const review = await Review.create({
      user: userId,
      service,
      product,
      rating,
      comment
    });
    
    const populated = await Review.findById(review._id)
      .populate('user', 'name')
      .populate('service', 'name')
      .populate('product', 'name');
    
    res.status(201).json({ message: 'Review created successfully', review: populated });
  } catch (error) {
    console.error('Review creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete review (user can delete their own, admin can delete any)
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    if (req.user.role === 'user' && review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
