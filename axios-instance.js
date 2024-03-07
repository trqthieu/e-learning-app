// axios-instance.js
import axios from 'axios';
import { getToken } from './storage';

const instance = axios.create({
  baseURL: 'https://nest-e-learning.onrender.com',
  // baseURL: 'http://localhost:8086',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token in the request headers
instance.interceptors.request.use(
  async config => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5NzExNjQzLCJleHAiOjE3MDk3OTgwNDN9.DiBSCc8JB7WqMG7hySC0DYkQm8T4hOLkNJ75u511ZoA';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
