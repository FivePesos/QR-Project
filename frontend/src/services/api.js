import axios from 'axios';

// ⚠️ Fixed: Removed leading space in URL
const API_BASE_URL = 'https://d7ab-113-19-181-82.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

export const getProducts = () => api.get('/products');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/orders');
export const updatePaymentStatus = (orderId, paymentStatus) => 
  api.put(`/orders/${orderId}/payment`, { payment_status: paymentStatus });

export default api;