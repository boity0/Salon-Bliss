import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiCreditCard, FiLock } from 'react-icons/fi';

const PaymentForm = ({ amount, onPaymentSuccess, onCancel }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) return; // Limit to 16 digits + 3 spaces
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) return;
    }
    
    // Limit CVV to 3 digits
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) return;
    }

    setPaymentData({
      ...paymentData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would integrate with a payment processor like Stripe, PayPal, etc.
      const paymentResult = {
        success: true,
        transactionId: 'TXN' + Date.now(),
        amount: amount,
        method: 'Credit Card',
        last4: paymentData.cardNumber.slice(-4)
      };

      toast.success('Payment processed successfully!');
      onPaymentSuccess(paymentResult);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-header">
        <h3><FiCreditCard /> Secure Payment</h3>
        <div className="amount-display">
          <span>Total: R{(amount * 18).toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            value={paymentData.cardholderName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Billing Address</label>
          <textarea
            name="billingAddress"
            value={paymentData.billingAddress}
            onChange={handleChange}
            placeholder="Enter your billing address"
            rows="3"
            required
          />
        </div>

        <div className="security-notice">
          <FiLock />
          <span>Your payment information is encrypted and secure</span>
        </div>

        <div className="payment-actions">
          <button 
            type="button" 
            className="btn-outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay R${(amount * 18).toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;