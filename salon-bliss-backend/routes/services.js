const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { validate, validationSchemas } = require('../middleware/validation');
const { protect, authorize } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    const services = await Service.find(query);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create service (admin only)
router.post('/', protect, authorize('admin'), validate(validationSchemas.createServiceSchema), async (req, res) => {
  try {
    const service = await Service.create(req.validatedData);
    res.status(201).json({ message: 'Service created', service });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service updated', service });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted', service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
