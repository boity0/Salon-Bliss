const Joi = require('joi');

const validationSchemas = {
  // User schemas
  registerSchema: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().optional(),
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Service schemas
  createServiceSchema: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
    price: Joi.number().required(),
    category: Joi.string().valid('haircare', 'skincare', 'nails', 'wellness', 'makeup').required(),
    image: Joi.string().optional(),
  }),

  // Product schemas
  createProductSchema: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().valid('haircare', 'skincare', 'nails', 'makeup', 'tools').required(),
    stock: Joi.number().optional(),
    image: Joi.string().optional(),
  }),

  // Appointment schemas
  createAppointmentSchema: Joi.object({
    service: Joi.string().required(),
    staff: Joi.string().optional(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    notes: Joi.string().allow('').optional(),
  }),

  // Review schemas
  createReviewSchema: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().optional(),
    service: Joi.string().optional(),
    product: Joi.string().optional(),
  }),
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }
    req.validatedData = value;
    next();
  };
};

module.exports = { validationSchemas, validate };
