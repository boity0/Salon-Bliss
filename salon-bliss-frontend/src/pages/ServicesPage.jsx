import React from 'react';
import ServiceList from '../components/Services/ServiceList';

const ServicesPage = () => {
  return (
    <div className="container mt-3">
      <h1>Our Services</h1>
      <ServiceList />
    </div>
  );
};

export default ServicesPage;