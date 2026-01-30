require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const Product = require('./models/Product');
const Staff = require('./models/Staff');

const connectDB = require('./config/database');

const services = [
  {
    name: 'Hair Styling',
    description: 'Professional hair styling and cutting service for all hair types',
    duration: 60,
    price: 45,
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1562122176-39e9f1bbd5ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Hair Coloring',
    description: 'Premium hair coloring with quality dyes and treatments',
    duration: 120,
    price: 75,
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1560066169-b763a5585591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Facial Treatment',
    description: 'Deep cleansing facial with premium skincare products',
    duration: 45,
    price: 55,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Manicure',
    description: 'Professional manicure with nail polish and design options',
    duration: 30,
    price: 25,
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Pedicure',
    description: 'Relaxing pedicure with foot massage and nail care',
    duration: 45,
    price: 35,
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Spa Massage',
    description: 'Full body relaxation massage with therapeutic techniques',
    duration: 60,
    price: 65,
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Makeup Application',
    description: 'Professional makeup application for events and occasions',
    duration: 45,
    price: 50,
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1487412912498-71f79aafb91c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Eyebrow Threading',
    description: 'Precise eyebrow shaping with threading technique',
    duration: 20,
    price: 15,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1532746313311-dc54e38a9ce1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  }
];

const products = [
  {
    name: 'Hair Shampoo',
    description: 'Premium moisturizing shampoo for all hair types',
    price: 18,
    category: 'haircare',
    stock: 50,
    rating: 4.5,
    reviews: 25,
    image: 'https://images.unsplash.com/photo-1585428774223-79f6a9f5b51e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Conditioner',
    description: 'Nourishing conditioner to restore hair strength',
    price: 18,
    category: 'haircare',
    stock: 45,
    rating: 4.7,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1585428774223-79f6a9f5b51e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Face Moisturizer',
    description: 'Lightweight moisturizer for daily skincare routine',
    price: 32,
    category: 'skincare',
    stock: 35,
    rating: 4.6,
    reviews: 40,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Facial Cleanser',
    description: 'Gentle cleanser for removing makeup and impurities',
    price: 22,
    category: 'skincare',
    stock: 40,
    rating: 4.4,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Nail Polish',
    description: 'Long-lasting nail polish in various colors',
    price: 8,
    category: 'nails',
    stock: 100,
    rating: 4.3,
    reviews: 50,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Nail Gel',
    description: 'Professional gel for long-lasting manicures',
    price: 15,
    category: 'nails',
    stock: 60,
    rating: 4.8,
    reviews: 35,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Hair Oil',
    description: 'Nourishing oil for deep hair conditioning',
    price: 20,
    category: 'haircare',
    stock: 55,
    rating: 4.6,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1585428774223-79f6a9f5b51e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Makeup Brush Set',
    description: 'Professional makeup brushes for perfect application',
    price: 28,
    category: 'makeup',
    stock: 25,
    rating: 4.7,
    reviews: 20,
    image: 'https://images.unsplash.com/photo-1487412912498-71f79aafb91c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Face Mask',
    description: 'Hydrating clay mask for weekly skincare treatment',
    price: 16,
    category: 'skincare',
    stock: 70,
    rating: 4.5,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    name: 'Hair Dryer',
    description: 'Ionic hair dryer for fast and smooth drying',
    price: 45,
    category: 'haircare',
    stock: 20,
    rating: 4.8,
    reviews: 25,
    image: 'https://images.unsplash.com/photo-1585428774223-79f6a9f5b51e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isActive: true
  }
];

const staff = [
  {
    name: 'Maria Garcia',
    role: 'Stylist',
    specialization: 'Hair Styling & Coloring',
    email: 'maria@salonbliss.com',
    phone: '079 478 1069',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    isActive: true
  },
  {
    name: 'Sarah Johnson',
    role: 'Esthetician',
    specialization: 'Facial & Skincare',
    email: 'sarah@salonbliss.com',
    phone: '079 478 1070',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isActive: true
  },
  {
    name: 'Emily Chen',
    role: 'Nail Technician',
    specialization: 'Manicure & Pedicure',
    email: 'emily@salonbliss.com',
    phone: '079 478 1071',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    isActive: true
  },
  {
    name: 'Jessica Martinez',
    role: 'Makeup Artist',
    specialization: 'Makeup & Beauty',
    email: 'jessica@salonbliss.com',
    phone: '079 478 1072',
    image: 'https://images.unsplash.com/photo-1507539803626-8534436e5b37?w=400',
    isActive: true
  },
  {
    name: 'Amanda Smith',
    role: 'Massage Therapist',
    specialization: 'Spa & Wellness',
    email: 'amanda@salonbliss.com',
    phone: '079 478 1073',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    isActive: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Service.deleteMany({});
    await Product.deleteMany({});
    await Staff.deleteMany({});
    
    // Seed services
    console.log('Seeding services...');
    const createdServices = await Service.insertMany(services);
    console.log(`✓ Created ${createdServices.length} services`);
    
    // Seed products
    console.log('Seeding products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`✓ Created ${createdProducts.length} products`);
    
    // Seed staff
    console.log('Seeding staff...');
    const createdStaff = await Staff.insertMany(staff);
    console.log(`✓ Created ${createdStaff.length} staff members`);
    
    console.log('\n✓ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
