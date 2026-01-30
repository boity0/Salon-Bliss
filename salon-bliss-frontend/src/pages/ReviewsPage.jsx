import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { reviewsAPI } from '../api';
import { toast } from 'react-hot-toast';
import { FiStar, FiPlus, FiX, FiUser, FiCalendar, FiShoppingBag, FiScissors } from 'react-icons/fi';
import './ReviewsPage.css';

const ReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [eligibleItems, setEligibleItems] = useState({ products: [], services: [] });
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
    if (user) {
      fetchEligibleItems();
    }
  }, [user]);

  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getAll();
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const fetchEligibleItems = async () => {
    try {
      const response = await reviewsAPI.getEligible();
      setEligibleItems(response.data || { products: [], services: [] });
    } catch (error) {
      console.error('Error fetching eligible items:', error);
    }
  };

  const handleWriteReview = (item) => {
    setSelectedItem(item);
    setShowReviewForm(true);
    setReviewForm({ rating: 5, comment: '' });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    try {
      const reviewData = {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        [selectedItem.type]: selectedItem.id
      };

      await reviewsAPI.create(reviewData);
      toast.success('Review submitted successfully!');
      
      setShowReviewForm(false);
      setSelectedItem(null);
      fetchReviews();
      fetchEligibleItems(); // Refresh eligible items
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <FiStar
            key={star}
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mt-3">
        <div className="loading-spinner">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="reviews-header">
          <h1>Customer Reviews</h1>
          <p>See what our customers are saying about our products and services</p>
        </div>

        {/* Write Review Section - Only for logged in users */}
        {user && (
          <div className="write-review-section">
            <h2>Write a Review</h2>
            {eligibleItems.products.length > 0 || eligibleItems.services.length > 0 ? (
              <div className="eligible-items">
                <p>You can review the following items you've purchased or used:</p>
                
                {eligibleItems.products.length > 0 && (
                  <div className="eligible-category">
                    <h3><FiShoppingBag /> Products</h3>
                    <div className="eligible-grid">
                      {eligibleItems.products.map(product => (
                        <div key={product.id} className="eligible-item">
                          <div className="item-info">
                            <h4>{product.name}</h4>
                            <p>Purchased: {formatDate(product.orderDate)}</p>
                            <p className="price">R{(product.price * 18).toFixed(2)}</p>
                          </div>
                          <button 
                            className="btn-primary"
                            onClick={() => handleWriteReview(product)}
                          >
                            <FiPlus /> Write Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {eligibleItems.services.length > 0 && (
                  <div className="eligible-category">
                    <h3><FiScissors /> Services</h3>
                    <div className="eligible-grid">
                      {eligibleItems.services.map(service => (
                        <div key={service.id} className="eligible-item">
                          <div className="item-info">
                            <h4>{service.name}</h4>
                            <p>Completed: {formatDate(service.appointmentDate)}</p>
                            <p className="price">R{(service.price * 18).toFixed(2)}</p>
                          </div>
                          <button 
                            className="btn-primary"
                            onClick={() => handleWriteReview(service)}
                          >
                            <FiPlus /> Write Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-eligible-items">
                <p>You need to purchase products or complete services to write reviews.</p>
                <p>Visit our <a href="/products">Products</a> or <a href="/services">Services</a> page to get started!</p>
              </div>
            )}
          </div>
        )}

        {/* All Reviews Section */}
        <div className="all-reviews-section">
          <h2>All Reviews ({reviews.length})</h2>
          
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map(review => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <FiUser className="user-icon" />
                      <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                    </div>
                    <div className="review-date">
                      <FiCalendar />
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="review-item">
                    {review.product && (
                      <div className="item-badge product">
                        <FiShoppingBag />
                        <span>{review.product.name}</span>
                      </div>
                    )}
                    {review.service && (
                      <div className="item-badge service">
                        <FiScissors />
                        <span>{review.service.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="rating-text">({review.rating}/5)</span>
                  </div>

                  {review.comment && (
                    <div className="review-comment">
                      <p>"{review.comment}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && selectedItem && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h3>Write Review for {selectedItem.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowReviewForm(false)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {renderStars(reviewForm.rating, true, (rating) => 
                    setReviewForm({ ...reviewForm, rating })
                  )}
                  <span className="rating-text">({reviewForm.rating}/5)</span>
                </div>
              </div>

              <div className="form-group">
                <label>Comment (Optional)</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience with this product/service..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;