import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiScissors, FiShoppingBag, FiCalendar, FiStar } from 'react-icons/fi';
import { FaSpa } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FaSpa className="brand-icon" />
          <span>Salon Bliss</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FiUser /> Home
          </Link>
          <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FiScissors /> Services
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FiShoppingBag /> Products
          </Link>
          <Link to="/book" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FiCalendar /> Book Now
          </Link>
          <Link to="/reviews" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FiStar /> Reviews
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <FiShoppingCart />
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>

          <div className="user-menu-container">
            <button 
              className="user-icon" 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <FiUser />
            </button>
            
            {isUserMenuOpen && (
              <div className="user-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="user-info">
                      <p className="user-name">Welcome, {user?.name}</p>
                      <small className="user-email">{user?.email}</small>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiUser /> My Profile
                    </Link>
                    <Link 
                      to="/my-appointments" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiCalendar /> My Appointments
                    </Link>
                    <Link 
                      to="/my-orders" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiShoppingBag /> My Orders
                    </Link>
                    {user?.user_type === 'admin' && (
                      <Link 
                        to="/dashboard" 
                        className="dropdown-item"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiUser /> Admin Dashboard
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;