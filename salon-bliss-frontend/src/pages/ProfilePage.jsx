import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, appointmentsAPI } from '../api';
import { toast } from 'react-hot-toast';
import PaymentForm from '../components/Payment/PaymentForm';
import '../styles/ProfilePage.css';
import '../components/Payment/PaymentForm.css';

const ProfilePage = ({ tab = 'appointments' }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(tab);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (activeTab === 'orders') {
        const response = await ordersAPI.getAll();
        setOrders(response.data || []);
      } else {
        console.log('Fetching appointments...');
        const response = await appointmentsAPI.getAll();
        console.log('Appointments response:', response);
        setAppointments(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePaymentSuccess = async (paymentResult, orderId, type = 'order') => {
    try {
      if (type === 'order') {
        await ordersAPI.processPayment(orderId, {
          transactionId: paymentResult.transactionId,
          method: paymentResult.method,
          last4: paymentResult.last4
        });
        toast.success('Payment successful! Your order is now being processed.');
      } else {
        await appointmentsAPI.processPayment(orderId, {
          transactionId: paymentResult.transactionId,
          method: paymentResult.method,
          last4: paymentResult.last4
        });
        toast.success('Payment successful! Your appointment is confirmed and paid.');
      }
      
      setShowPayment(null);
      fetchData(); // Refresh data to show updated status
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa500';
      case 'confirmed': return '#007bff';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#6f42c1';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#28a745';
      case 'unpaid': return '#dc3545';
      case 'refunded': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="container mt-3">
      <h1>My Profile</h1>
      
      {user && (
        <div className="profile-info">
          <div className="profile-card card">
            <h3>Profile Information</h3>
            <p><strong>Name:</strong> {user.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          </div>
        </div>
      )}

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          My Appointments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : activeTab === 'appointments' ? (
        <div className="appointments-section">
          <h2>My Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            <div className="items-list">
              {appointments.map(apt => (
                <div key={apt._id || apt.id} className="item-card card">
                  <h3>{apt.service?.name || apt.serviceName || 'Service'}</h3>
                  <p><strong>Date:</strong> {new Date(apt.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {apt.time}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span 
                      className="status" 
                      style={{ color: getStatusColor(apt.status) }}
                    >
                      {apt.status || 'Pending'}
                    </span>
                  </p>
                  <p>
                    <strong>Payment:</strong> 
                    <span 
                      className="payment-status" 
                      style={{ color: getPaymentStatusColor(apt.paymentStatus) }}
                    >
                      {apt.paymentStatus || 'Unpaid'}
                    </span>
                  </p>
                  {apt.service?.price && (
                    <p><strong>Price:</strong> R{(apt.service.price * 18).toFixed(2)}</p>
                  )}
                  {apt.notes && <p><strong>Notes:</strong> {apt.notes}</p>}
                  
                  {/* Show payment button for confirmed appointments that are unpaid */}
                  {apt.status === 'confirmed' && apt.paymentStatus === 'unpaid' && (
                    <div className="payment-section">
                      <p className="payment-notice">
                        ✅ Your appointment has been confirmed! Please proceed with payment.
                      </p>
                      <button 
                        className="btn-primary pay-now-btn"
                        onClick={() => setShowPayment({...apt, type: 'appointment', totalPrice: apt.service?.price || apt.totalPrice})}
                      >
                        Pay Now - R{((apt.service?.price || apt.totalPrice || 0) * 18).toFixed(2)}
                      </button>
                    </div>
                  )}
                  
                  {/* Show payment info for paid appointments */}
                  {apt.paymentStatus === 'paid' && apt.paymentInfo && (
                    <div className="payment-info">
                      <p><strong>Payment Method:</strong> {apt.paymentInfo.method}</p>
                      <p><strong>Transaction ID:</strong> {apt.paymentInfo.transactionId}</p>
                      <p><strong>Paid At:</strong> {new Date(apt.paymentInfo.paidAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="orders-section">
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p>No orders placed yet.</p>
          ) : (
            <div className="items-list">
              {orders.map(order => (
                <div key={order._id || order.id} className="item-card card">
                  <h3>Order #{order._id ? order._id.slice(-6) : order.id}</h3>
                  <p><strong>Date:</strong> {new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> R{(order.totalPrice * 18).toFixed(2)}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span 
                      className="status" 
                      style={{ color: getStatusColor(order.status) }}
                    >
                      {order.status || 'Processing'}
                    </span>
                  </p>
                  <p>
                    <strong>Payment:</strong> 
                    <span 
                      className="payment-status" 
                      style={{ color: getPaymentStatusColor(order.paymentStatus) }}
                    >
                      {order.paymentStatus || 'Unpaid'}
                    </span>
                  </p>
                  
                  {order.items && (
                    <div className="order-items">
                      <strong>Items:</strong>
                      {order.items.map((item, idx) => (
                        <p key={idx}>- {item.product?.name || item.name} x{item.quantity}</p>
                      ))}
                    </div>
                  )}
                  
                  {/* Show payment button for confirmed orders that are unpaid */}
                  {order.status === 'confirmed' && order.paymentStatus === 'unpaid' && (
                    <div className="payment-section">
                      <p className="payment-notice">
                        ✅ Your order has been confirmed! Please proceed with payment.
                      </p>
                      <button 
                        className="btn-primary pay-now-btn"
                        onClick={() => setShowPayment(order)}
                      >
                        Pay Now - R{(order.totalPrice * 18).toFixed(2)}
                      </button>
                    </div>
                  )}
                  
                  {/* Show payment info for paid orders */}
                  {order.paymentStatus === 'paid' && order.paymentInfo && (
                    <div className="payment-info">
                      <p><strong>Payment Method:</strong> {order.paymentInfo.method}</p>
                      <p><strong>Transaction ID:</strong> {order.paymentInfo.transactionId}</p>
                      <p><strong>Paid At:</strong> {new Date(order.paymentInfo.paidAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Payment Modal */}
      {showPayment && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <PaymentForm
              amount={showPayment.totalPrice}
              onPaymentSuccess={(result) => handlePaymentSuccess(result, showPayment._id, showPayment.type || 'order')}
              onCancel={() => setShowPayment(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;