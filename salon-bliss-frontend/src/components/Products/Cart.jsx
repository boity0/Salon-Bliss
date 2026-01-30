import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { ordersAPI } from '../../api';
import PaymentForm from '../Payment/PaymentForm';
import '../Payment/PaymentForm.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please log in to checkout');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.id,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: getCartTotal()
      };

      await ordersAPI.create(orderData);
      toast.success('Order placed successfully! You can pay once the admin confirms your order.');
      clearCart();
      navigate('/my-orders');
    } catch (err) {
      console.error('Order creation error:', err);
      toast.error('Failed to create order. Please try again.');
    }
  };

  const handlePaymentSuccess = async (paymentResult) => {
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.id,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: getCartTotal(),
        paymentInfo: paymentResult
      };

      await ordersAPI.create(orderData);
      toast.success('Order placed successfully!');
      clearCart();
      setShowPayment(false);
      navigate('/my-orders');
    } catch (err) {
      console.error('Order creation error:', err);
      toast.error('Failed to create order. Please contact support.');
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-3">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item card">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>R{(item.price * 18).toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="btn-outline"
              >
                <FiMinus />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="btn-outline"
              >
                <FiPlus />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn-outline"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: R{(getCartTotal() * 18).toFixed(2)}</h3>
        <button className="btn-primary" onClick={handleCheckout}>Checkout</button>
      </div>
      
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-overlay" onClick={handlePaymentCancel}></div>
          <PaymentForm 
            amount={getCartTotal()}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;