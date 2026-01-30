import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiStar, FiUsers } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Salon Bliss</h1>
            <p>Your premier destination for beauty and wellness services</p>
            <div className="hero-buttons">
              <Link to="/book" className="btn-primary btn-large">
                Book Appointment
              </Link>
              <Link to="/services" className="btn-outline btn-large">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose Salon Bliss?</h2>
            <p>Experience luxury and professionalism at its finest</p>
          </div>

          <div className="grid grid-4">
            <div className="card text-center">
              <FiCheckCircle className="feature-icon" />
              <h3>Expert Stylists</h3>
              <p>Professional hair stylists with years of experience</p>
            </div>
            <div className="card text-center">
              <FiClock className="feature-icon" />
              <h3>Flexible Hours</h3>
              <p>Open late for your convenience</p>
            </div>
            <div className="card text-center">
              <FiStar className="feature-icon" />
              <h3>Premium Products</h3>
              <p>Only the best products for your hair and skin</p>
            </div>
            <div className="card text-center">
              <FiUsers className="feature-icon" />
              <h3>Personalized Service</h3>
              <p>Tailored treatments for your unique needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready for Your Transformation?</h2>
            <p>Book your appointment today and experience the Salon Bliss difference</p>
            <div className="cta-buttons">
              <Link to="/book" className="btn-primary btn-large">
                Book Now
              </Link>
              <Link to="/services" className="btn-outline btn-large">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;