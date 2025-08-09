import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Request failed:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default instance;
