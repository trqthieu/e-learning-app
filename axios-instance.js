// axios-instance.js
import axios from 'axios';
import { getToken } from './storage';

const instance = axios.create({
  baseURL: 'https://nest-e-learning.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token in the request headers
instance.interceptors.request.use(async (config) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4NTcwOTYwLCJleHAiOjE3MDg2NTczNjB9.py6zRZS8yW6oxMQLt5pQ9EbDNb-GCWDN7DnhKUaOQtg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
