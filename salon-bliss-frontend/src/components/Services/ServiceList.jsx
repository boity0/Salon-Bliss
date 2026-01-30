import React, { useState, useEffect, useCallback } from 'react';
import { servicesAPI } from '../../api';
import ServiceCard from './ServiceCard';
import './ServiceList.css';

const mockServices = [
  {
    id: 1,
    name: 'Haircut & Style',
    description: 'Professional haircut with styling consultation',
    duration: 60,
    price: 45,
    image: 'https://picsum.photos/500/400?random=201',
  },
  {
    id: 2,
    name: 'Hair Coloring',
    description: 'Full hair color treatment with premium dyes',
    duration: 120,
    price: 80,
    image: 'https://picsum.photos/500/400?random=202',
  },
  {
    id: 3,
    name: 'Facial Treatment',
    description: 'Rejuvenating facial with skincare products',
    duration: 60,
    price: 65,
    image: 'https://picsum.photos/500/400?random=203',
  },
  {
    id: 4,
    name: 'Massage Therapy',
    description: 'Relaxing full body massage treatment',
    duration: 90,
    price: 75,
    image: 'https://picsum.photos/500/400?random=204',
  },
  {
    id: 5,
    name: 'Manicure & Pedicure',
    description: 'Complete nail care and polish service',
    duration: 75,
    price: 55,
    image: 'https://picsum.photos/500/400?random=205',
  },
  {
    id: 6,
    name: 'Eyebrow Threading',
    description: 'Precise eyebrow shaping and threading',
    duration: 30,
    price: 25,
    image: 'https://picsum.photos/500/400?random=206',
  },
];

const ServiceList = ({ limit = null, category = null }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];
      
      try {
        let response;
        if (category) {
          response = await servicesAPI.getByCategory(category);
        } else {
          response = await servicesAPI.getAll();
        }
        data = response.data || [];
      } catch (apiErr) {
        console.log('API not available, using mock data');
        data = mockServices;
      }
      
      if (limit) {
        data = data.slice(0, limit);
      }
      
      setServices(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setServices(mockServices.slice(0, limit));
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!services || services.length === 0) {
    return <div className="empty-message">No services available at the moment</div>;
  }

  return (
    <div className="service-list grid grid-4">
      {services.map(service => (
        <ServiceCard key={service._id || service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
