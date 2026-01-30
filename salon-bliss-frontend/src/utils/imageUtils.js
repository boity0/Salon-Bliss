// Utility functions for handling images

// Fallback image sources in order of preference
const IMAGE_SOURCES = {
  // Primary: Unsplash Source API (more reliable)
  unsplash: (width = 500, height = 400, keywords = 'beauty,salon') => 
    `https://source.unsplash.com/${width}x${height}/?${keywords}`,
  
  // Secondary: Picsum (Lorem Picsum) - very reliable
  picsum: (width = 500, height = 400, id = null) => 
    id ? `https://picsum.photos/id/${id}/${width}/${height}` : `https://picsum.photos/${width}/${height}`,
  
  // Tertiary: Placeholder service
  placeholder: (width = 500, height = 400, text = 'Image') => 
    `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(text)}`,
};

// Product-specific image mappings
export const getProductImage = (productName, productId) => {
  const keywords = getProductKeywords(productName);
  return [
    IMAGE_SOURCES.unsplash(500, 400, keywords),
    IMAGE_SOURCES.picsum(500, 400, (productId % 100) + 100), // Use ID for consistent images
    IMAGE_SOURCES.placeholder(500, 400, productName.split(' ')[0])
  ];
};

// Service-specific image mappings
export const getServiceImage = (serviceName, serviceId) => {
  const keywords = getServiceKeywords(serviceName);
  return [
    IMAGE_SOURCES.unsplash(500, 400, keywords),
    IMAGE_SOURCES.picsum(500, 400, (serviceId % 100) + 200), // Use ID for consistent images
    IMAGE_SOURCES.placeholder(500, 400, serviceName.split(' ')[0])
  ];
};

// Helper function to get relevant keywords for products
const getProductKeywords = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes('shampoo')) return 'shampoo,hair-care,beauty';
  if (name.includes('conditioner')) return 'conditioner,hair-treatment,beauty';
  if (name.includes('gel') || name.includes('styling')) return 'hair-gel,styling,beauty';
  if (name.includes('moisturizer') || name.includes('facial')) return 'moisturizer,skincare,beauty';
  if (name.includes('nail') || name.includes('polish')) return 'nail-polish,beauty,cosmetics';
  if (name.includes('mask')) return 'face-mask,skincare,beauty';
  return 'beauty,cosmetics,salon';
};

// Helper function to get relevant keywords for services
const getServiceKeywords = (serviceName) => {
  const name = serviceName.toLowerCase();
  if (name.includes('haircut') || name.includes('hair')) return 'haircut,salon,beauty';
  if (name.includes('color')) return 'hair-color,salon,beauty';
  if (name.includes('facial')) return 'facial,spa,skincare';
  if (name.includes('massage')) return 'massage,spa,relaxation';
  if (name.includes('manicure') || name.includes('nail')) return 'manicure,nails,beauty';
  if (name.includes('eyebrow')) return 'eyebrows,beauty,salon';
  return 'salon,spa,beauty';
};

// Component for handling multiple fallback images
export const createImageWithFallbacks = (imageSources) => {
  return {
    primary: imageSources[0],
    secondary: imageSources[1],
    fallback: imageSources[2]
  };
};