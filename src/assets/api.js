// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.Times_News_API_URL || '/api', // set in .env
});

// add token if present
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('authToken');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
