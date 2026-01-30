import React, { useState, useEffect, useCallback } from 'react';
import { productsAPI } from '../../api';
import ProductCard from './ProductCard';
import './ProductList.css';

// Import images
import shampooImg from '../../assets/images/Shampoo.jpg';
import conditionerImg from '../../assets/images/Conditioner.jpg';

const mockProducts = [
  {
    id: 1,
    name: 'TEST Premium Hair Shampoo',
    description: 'Sulfate-free shampoo for all hair types',
    price: 28,
    rating: 5,
    reviews: 124,
    image: shampooImg,
  },
  {
    id: 2,
    name: 'Luxury Hair Conditioner',
    description: 'Deep conditioning treatment for silky hair',
    price: 32,
    rating: 5,
    reviews: 98,
    image: conditionerImg,
  },
  {
    id: 3,
    name: 'Hair Styling Gel',
    description: 'Strong hold styling gel for all hair styles',
    price: 18,
    rating: 4,
    reviews: 76,
    image: 'https://picsum.photos/500/400?random=103',
  },
  {
    id: 4,
    name: 'Facial Moisturizer',
    description: 'Hydrating moisturizer with natural ingredients',
    price: 42,
    rating: 5,
    reviews: 156,
    image: 'https://picsum.photos/500/400?random=104',
  },
  {
    id: 5,
    name: 'Nail Polish - Rose Gold',
    description: 'Long-lasting nail polish in beautiful rose gold',
    price: 12,
    rating: 4,
    reviews: 89,
    image: 'https://picsum.photos/500/400?random=105',
  },
  {
    id: 6,
    name: 'Face Mask Treatment',
    description: 'Purifying clay mask for deep cleansing',
    price: 24,
    rating: 5,
    reviews: 142,
    image: 'https://picsum.photos/500/400?random=106',
  },
];

console.log('Shampoo image imported as:', shampooImg);
console.log('Conditioner image imported as:', conditionerImg);

const ProductList = ({ limit = null, category = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];
      
      try {
        console.log('Attempting to fetch products from API...');
        let response;
        if (category) {
          response = await productsAPI.getByCategory(category);
        } else {
          response = await productsAPI.getAll();
        }
        console.log('API response:', response);
        data = response.data || [];
        console.log('Products from API:', data);
      } catch (apiErr) {
        console.log('API not available, using mock data. Error:', apiErr);
        data = mockProducts;
      }
      
      if (limit) {
        data = data.slice(0, limit);
      }
      
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(mockProducts.slice(0, limit));
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="empty-message">No products available at the moment</div>;
  }

  return (
    <div className="product-list grid grid-4">
      {products.map(product => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
