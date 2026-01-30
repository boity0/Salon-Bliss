import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpa } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <FaSpa className="footer-icon" />
              <h3>Salon Bliss</h3>
            </div>
            <p>Your premier destination for beauty and wellness services. Experience luxury and care in every treatment.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><FiFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><FiInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link"><FiTwitter /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/book">Book Now</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Hair Styling</li>
              <li>Facial Treatments</li>
              <li>Manicure & Pedicure</li>
              <li>Massage Therapy</li>
              <li>Makeup Services</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>📍 10 Dorset Street</li>
              <li>📞 079 478 1068</li>
              <li>✉️ info@salonbliss.com</li>
              <li>🕒 Mon-Sat: 9AM-8PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Salon Bliss. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;