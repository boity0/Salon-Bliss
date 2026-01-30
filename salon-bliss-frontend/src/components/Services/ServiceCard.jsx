import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Multiple fallback images for each service
  const getServiceImages = (serviceId, serviceName) => {
    const fallbackImages = [
      service.image, // Original image
      `https://picsum.photos/500/400?random=${serviceId + 200}`, // Picsum fallback
      `https://via.placeholder.com/500x400/667eea/ffffff?text=${encodeURIComponent(serviceName.split(' ')[0])}`, // Placeholder
    ];
    return fallbackImages.filter(img => img); // Remove any null/undefined
  };

  const serviceImages = getServiceImages(service.id, service.name);

  const handleImageError = () => {
    if (currentImageIndex < serviceImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="service-card card">
      <div className="service-image">
        <img 
          src={serviceImages[currentImageIndex]} 
          alt={service.name}
          onError={handleImageError}
        />
      </div>
      <div className="service-content">
        <h3>{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <div className="service-meta">
          <span className="service-duration">⏱️ {service.duration || '60'} min</span>
          <span className="service-price">R{(service.price || 0) * 18}</span>
        </div>
        <Link to={`/services/${service._id || service.id}`} className="service-link">
          View Details <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
