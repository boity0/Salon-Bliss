import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [liked, setLiked] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Multiple fallback images for each product
  const getProductImages = (productId, productName) => {
    const fallbackImages = [
      product.image, // Your imported image
      `https://picsum.photos/500/400?random=${productId + 100}`, // Picsum fallback
      `https://via.placeholder.com/500x400/667eea/ffffff?text=${encodeURIComponent(productName.split(' ')[0])}`, // Placeholder
    ];
    console.log(`Product ${productName} trying to load image:`, product.image);
    return fallbackImages.filter(img => img); // Remove any null/undefined
  };

  const productImages = getProductImages(product.id, product.name);

  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: productImages[currentImageIndex],
    });
  };

  const handleImageError = () => {
    console.log(`Image failed to load for ${product.name}:`, productImages[currentImageIndex]);
    if (currentImageIndex < productImages.length - 1) {
      console.log(`Trying fallback image ${currentImageIndex + 1} for ${product.name}`);
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      console.log(`All images failed for ${product.name}, using final fallback`);
    }
  };

  return (
    <div className="product-card card">
      <div className="product-image">
        <img 
          src={productImages[currentImageIndex]} 
          alt={product.name}
          onError={handleImageError}
          onLoad={() => console.log(`Image loaded successfully for ${product.name}:`, productImages[currentImageIndex])}
        />
        <button 
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <FiHeart />
        </button>
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <span>{'⭐'.repeat(Math.round(product.rating || 4))}</span>
          <span className="rating-count">({product.reviews || 0})</span>
        </div>
        <div className="product-footer">
          <span className="product-price">R{(product.price || 0) * 18}</span>
          <button 
            className="btn-add-cart"
            onClick={handleAddToCart}
          >
            <FiShoppingCart /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
