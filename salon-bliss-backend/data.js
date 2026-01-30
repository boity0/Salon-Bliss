// Mock database - replace with real database later

let users = [
  {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    password: 'hashed_password_here',
    phone: '+1234567890',
    createdAt: new Date()
  }
];

let services = [
  {
    id: 1,
    name: 'Haircut & Style',
    description: 'Professional haircut with styling consultation',
    duration: 60,
    price: 45,
    category: 'haircare',
    image: 'https://wallpapers.com/images/hd/haircut-pictures-az2rne5l3zg21to1.jpg',
  },
  {
    id: 2,
    name: 'Hair Coloring',
    description: 'Full hair color treatment with premium dyes',
    duration: 60,
    price: 65,
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Facial Treatment',
    description: 'Rejuvenating facial with skincare products',
    duration: 60,
    price: 65,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    name: 'Massage Therapy',
    description: 'Relaxing full body massage treatment',
    duration: 90,
    price: 75,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1599447488558-94b79e104912?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    name: 'Manicure & Pedicure',
    description: 'Complete nail care and polish service',
    duration: 75,
    price: 55,
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 6,
    name: 'Eyebrow Threading',
    description: 'Precise eyebrow shaping and threading',
    duration: 30,
    price: 25,
    category: 'skincare',
    image: 'https://nearme.com.sg/wp-content/uploads/2020/02/beautrim-care.jpg',
  },
];

let products = [
  {
    id: 1,
    name: 'TEST Premium Hair Shampoo',
    description: 'Sulfate-free shampoo for all hair types',
    price: 28,
    rating: 5,
    reviews: 124,
    stock: 50,
    category: 'haircare',
    image: 'http://localhost:5000/images/Shampoo.jpg',
  },
  {
    id: 2,
    name: 'Luxury Hair Conditioner',
    description: 'Deep conditioning treatment for silky hair',
    price: 32,
    rating: 5,
    reviews: 98,
    stock: 45,
    category: 'haircare',
    image: 'http://localhost:5000/images/Conditioner.jpg',
  },
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1597833712309-4e24e1e80fea?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Hair Styling Gel',
    description: 'Strong hold styling gel for all hair styles',
    price: 18,
    rating: 4,
    reviews: 76,
    stock: 60,
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1633654246169-ec7203bc24fa?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    name: 'Facial Moisturizer',
    description: 'Hydrating moisturizer with natural ingredients',
    price: 42,
    rating: 5,
    reviews: 156,
    stock: 35,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    name: 'Nail Polish - Rose Gold',
    description: 'Long-lasting nail polish in beautiful rose gold',
    price: 12,
    rating: 4,
    reviews: 89,
    stock: 100,
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 6,
    name: 'Face Mask Treatment',
    description: 'Purifying clay mask for deep cleansing',
    price: 24,
    rating: 5,
    reviews: 142,
    stock: 55,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=60',
  },
];

let appointments = [];
let orders = [];
let reviews = [];

let staff = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Stylist',
    specialization: 'Hair Coloring',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Emma Davis',
    role: 'Beautician',
    specialization: 'Facial Treatment',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Massage Therapist',
    specialization: 'Massage Therapy',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=60',
  },
];

module.exports = {
  users,
  services,
  products,
  appointments,
  orders,
  reviews,
  staff
};
