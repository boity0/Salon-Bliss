import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiStar, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image_url || '/placeholder-product.jpg'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        {product.stock_quantity === 0 && (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-brand">
            <FiTag /> {product.brand}
          </span>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-category">
          {product.category}
        </div>
        
        <div className="product-footer">
          <div className="product-price">
            <span className="price">${product.price}</span>
            {product.old_price && (
              <span className="old-price">${product.old_price}</span>
            )}
          </div>
          
          <div className="product-stock">
            {product.stock_quantity > 0 ? (
              <span className="in-stock">{product.stock_quantity} in stock</span>
            ) : (
              <span className="no-stock">Out of stock</span>
            )}
          </div>
        </div>
        
        <div className="product-actions">
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
          >
            <FiShoppingCart /> Add to Cart
          </button>
          
          <button className="view-details-btn">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;