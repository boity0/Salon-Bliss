import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import ServiceList from '../components/Services/ServiceList';
import ProductList from '../components/Products/ProductList';
import { FiArrowRight, FiCheckCircle, FiClock, FiStar, FiUsers } from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Salon Bliss?</h2>
            <p>Experience luxury and professionalism at its finest</p>
          </div>
          
          <Features />
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <h2>Our Premium Services</h2>
            <p>From haircuts to full spa treatments</p>
          </div>
          
          <ServiceList limit={4} />
          
          <div className="text-center">
            <Link to="/services" className="btn-primary">
              View All Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Products Preview */}
      <section className="products-preview">
        <div className="container">
          <div className="section-header">
            <h2>Premium Hair & Beauty Products</h2>
            <p>Professional products for home use</p>
          </div>
          
          <ProductList limit={4} />
          
          <div className="text-center">
            <Link to="/products" className="btn-primary">
              Shop All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
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