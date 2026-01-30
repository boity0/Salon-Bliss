import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, appointmentsAPI } from '../api';
import { toast } from 'react-hot-toast';
import { FiUsers, FiCalendar, FiShoppingBag, FiDollarSign, FiClock, FiCheck, FiX } from 'react-icons/fi';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'overview') {
        // Fetch both orders and appointments for overview
        const [ordersResponse, appointmentsResponse] = await Promise.all([
          ordersAPI.getAll(),
          appointmentsAPI.getAll()
        ]);
        setOrders(ordersResponse.data || []);
        setAppointments(appointmentsResponse.data || []);
      } else if (activeTab === 'orders') {
        const response = await ordersAPI.getAll();
        setOrders(response.data || []);
      } else if (activeTab === 'appointments') {
        const response = await appointmentsAPI.getAll();
        setAppointments(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      return;
    }
    fetchData();
  }, [user, fetchData]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await ordersAPI.update(orderId, { status });
      toast.success(`Order ${status} successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await appointmentsAPI.update(appointmentId, { status });
      toast.success(`Appointment ${status} successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Failed to update appointment status');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="container mt-3">
        <div className="alert alert-danger">
          <h2>Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiUsers /> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <FiShoppingBag /> Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <FiCalendar /> Appointments
        </button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card card">
                  <div className="stat-icon">
                    <FiShoppingBag />
                  </div>
                  <div className="stat-info">
                    <h3>{orders.length}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="stat-card card">
                  <div className="stat-icon">
                    <FiCalendar />
                  </div>
                  <div className="stat-info">
                    <h3>{appointments.length}</h3>
                    <p>Total Appointments</p>
                  </div>
                </div>
                <div className="stat-card card">
                  <div className="stat-icon">
                    <FiDollarSign />
                  </div>
                  <div className="stat-info">
                    <h3>R{(orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0) * 18).toFixed(2)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                <div className="stat-card card">
                  <div className="stat-icon">
                    <FiClock />
                  </div>
                  <div className="stat-info">
                    <h3>{orders.filter(o => o.status === 'pending').length}</h3>
                    <p>Pending Orders</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>Manage Orders</h2>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="admin-items-list">
                  {orders.map(order => (
                    <div key={order._id} className="admin-item-card card">
                      <div className="item-header">
                        <h3>Order #{order._id.slice(-6)}</h3>
                        <span className={`status-badge ${order.status}`}>
                          {order.status || 'pending'}
                        </span>
                      </div>
                      <div className="item-details">
                        <p><strong>Customer:</strong> {order.user?.name || 'N/A'}</p>
                        <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> R{(order.totalPrice * 18).toFixed(2)}</p>
                        <p>
                          <strong>Payment:</strong> 
                          <span className={`payment-status ${order.paymentStatus || 'unpaid'}`}>
                            {order.paymentStatus || 'Unpaid'}
                          </span>
                        </p>
                        {order.paymentInfo && order.paymentStatus === 'paid' && (
                          <div className="payment-details">
                            <p><strong>Transaction ID:</strong> {order.paymentInfo.transactionId}</p>
                            <p><strong>Payment Method:</strong> {order.paymentInfo.method}</p>
                            <p><strong>Paid At:</strong> {new Date(order.paymentInfo.paidAt).toLocaleDateString()}</p>
                          </div>
                        )}
                        {order.items && (
                          <div className="order-items">
                            <strong>Items:</strong>
                            {order.items.map((item, idx) => (
                              <p key={idx}>- {item.product?.name || item.name} x{item.quantity}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="item-actions">
                        {order.status === 'pending' && (
                          <button 
                            className="btn-primary"
                            onClick={() => updateOrderStatus(order._id, 'confirmed')}
                          >
                            <FiCheck /> Confirm Order
                          </button>
                        )}
                        {(order.status === 'processing' && order.paymentStatus === 'unpaid') && (
                          <button 
                            className="btn-primary"
                            onClick={() => updateOrderStatus(order._id, 'confirmed')}
                          >
                            <FiCheck /> Confirm for Payment
                          </button>
                        )}
                        {order.status === 'confirmed' && order.paymentStatus === 'unpaid' && (
                          <div className="waiting-payment">
                            <span className="waiting-text">⏳ Waiting for customer payment</span>
                          </div>
                        )}
                        {order.status === 'confirmed' && order.paymentStatus === 'paid' && (
                          <button 
                            className="btn-success"
                            onClick={() => updateOrderStatus(order._id, 'processing')}
                          >
                            <FiCheck /> Start Processing
                          </button>
                        )}
                        {order.status === 'processing' && order.paymentStatus === 'paid' && (
                          <button 
                            className="btn-warning"
                            onClick={() => updateOrderStatus(order._id, 'shipped')}
                          >
                            <FiCheck /> Mark as Shipped
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button 
                            className="btn-info"
                            onClick={() => updateOrderStatus(order._id, 'delivered')}
                          >
                            <FiCheck /> Mark as Delivered
                          </button>
                        )}
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <button 
                            className="btn-danger"
                            onClick={() => updateOrderStatus(order._id, 'cancelled')}
                          >
                            <FiX /> Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="appointments-section">
              <h2>Manage Appointments</h2>
              {appointments.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                <div className="admin-items-list">
                  {appointments.map(apt => (
                    <div key={apt._id} className="admin-item-card card">
                      <div className="item-header">
                        <h3>{apt.service?.name || 'Service'}</h3>
                        <span className={`status-badge ${apt.status}`}>
                          {apt.status || 'pending'}
                        </span>
                      </div>
                      <div className="item-details">
                        <p><strong>Customer:</strong> {apt.user?.name || 'N/A'}</p>
                        <p><strong>Email:</strong> {apt.user?.email || 'N/A'}</p>
                        <p><strong>Date:</strong> {new Date(apt.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {apt.time}</p>
                        {apt.service?.price && (
                          <p><strong>Price:</strong> R{(apt.service.price * 18).toFixed(2)}</p>
                        )}
                        <p>
                          <strong>Payment:</strong> 
                          <span className={`payment-status ${apt.paymentStatus || 'unpaid'}`}>
                            {apt.paymentStatus || 'Unpaid'}
                          </span>
                        </p>
                        {apt.paymentInfo && apt.paymentStatus === 'paid' && (
                          <div className="payment-details">
                            <p><strong>Transaction ID:</strong> {apt.paymentInfo.transactionId}</p>
                            <p><strong>Payment Method:</strong> {apt.paymentInfo.method}</p>
                            <p><strong>Paid At:</strong> {new Date(apt.paymentInfo.paidAt).toLocaleDateString()}</p>
                          </div>
                        )}
                        {apt.notes && <p><strong>Notes:</strong> {apt.notes}</p>}
                      </div>
                      <div className="item-actions">
                        {apt.status === 'pending' && (
                          <button 
                            className="btn-primary"
                            onClick={() => updateAppointmentStatus(apt._id, 'confirmed')}
                          >
                            <FiCheck /> Confirm Appointment
                          </button>
                        )}
                        {apt.status === 'confirmed' && apt.paymentStatus === 'unpaid' && (
                          <div className="waiting-payment">
                            <span className="waiting-text">⏳ Waiting for customer payment</span>
                          </div>
                        )}
                        {apt.status === 'confirmed' && apt.paymentStatus === 'paid' && (
                          <button 
                            className="btn-success"
                            onClick={() => updateAppointmentStatus(apt._id, 'completed')}
                          >
                            <FiCheck /> Mark as Completed
                          </button>
                        )}
                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <button 
                            className="btn-danger"
                            onClick={() => updateAppointmentStatus(apt._id, 'cancelled')}
                          >
                            <FiX /> Cancel Appointment
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;