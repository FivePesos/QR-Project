import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Match your backend PORT

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => api.get('/products');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/orders');
export const updatePaymentStatus = (orderId, paymentStatus) => 
  api.put(`/orders/${orderId}/payment`, { payment_status: paymentStatus });

export default api;