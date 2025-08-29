import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const verifyOtp = (data) => API.post('/auth/verify-otp', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/users/me');
export const updateMe = (data) => API.put('/users/me', data);
export const getTests = () => API.get('/tests');
export const createAppointment = (data) => API.post('/appointments', data);
export const getAppointments = () => API.get('/appointments');
export const updateAppointmentStatus = (id, status) => API.put(`/appointments/${id}/status`, { status });
export const createReferral = (data) => API.post('/referrals', data);
export const getReferrals = () => API.get('/referrals');
export const getReports = () => API.get('/reports');

export default API;
