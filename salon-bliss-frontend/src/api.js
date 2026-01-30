import axiosInstance from './services/axiosConfig';

// Services API
export const servicesAPI = {
  getAll: () => axiosInstance.get('/services'),
  getById: (id) => axiosInstance.get(`/services/${id}`),
  getByCategory: (category) => axiosInstance.get('/services', { params: { category } }),
  create: (data) => axiosInstance.post('/services', data),
  update: (id, data) => axiosInstance.put(`/services/${id}`, data),
  delete: (id) => axiosInstance.delete(`/services/${id}`),
};

// Products API
export const productsAPI = {
  getAll: () => axiosInstance.get('/products'),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  getByCategory: (category) => axiosInstance.get('/products', { params: { category } }),
  create: (data) => axiosInstance.post('/products', data),
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => axiosInstance.get('/orders'),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  create: (data) => axiosInstance.post('/orders', data),
  update: (id, data) => axiosInstance.put(`/orders/${id}`, data),
  delete: (id) => axiosInstance.delete(`/orders/${id}`),
  processPayment: (id, paymentData) => axiosInstance.post(`/orders/${id}/payment`, paymentData),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => axiosInstance.get('/appointments'),
  getById: (id) => axiosInstance.get(`/appointments/${id}`),
  create: (data) => axiosInstance.post('/appointments', data),
  update: (id, data) => axiosInstance.put(`/appointments/${id}`, data),
  delete: (id) => axiosInstance.delete(`/appointments/${id}`),
  processPayment: (id, paymentData) => axiosInstance.post(`/appointments/${id}/payment`, paymentData),
};

// Auth API
export const authAPI = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => axiosInstance.get('/auth/me'),
};

// Reviews API
export const reviewsAPI = {
  getAll: () => axiosInstance.get('/reviews'),
  getById: (id) => axiosInstance.get(`/reviews/${id}`),
  getEligible: () => axiosInstance.get('/reviews/eligible'),
  create: (data) => axiosInstance.post('/reviews', data),
  update: (id, data) => axiosInstance.put(`/reviews/${id}`, data),
  delete: (id) => axiosInstance.delete(`/reviews/${id}`),
};

// Time Slots API
export const timeSlotsAPI = {
  getAvailable: (date, serviceId) => axiosInstance.get('/time-slots', {
    params: { date, serviceId }
  }),
};

export default axiosInstance;
