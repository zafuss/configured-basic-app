import axios, { AxiosError } from 'axios';

// Base URL for the API
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Axios instance configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
});

// Interceptors for request
apiClient.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or other headers here
    if (__DEV__) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptors for response
apiClient.interceptors.response.use(
  (response) => {
    // Log response (development only)
    if (__DEV__) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('❌ Bad Request:', data);
          break;
        case 401:
          console.error('❌ Unauthorized:', data);
          break;
        case 403:
          console.error('❌ Forbidden:', data);
          break;
        case 404:
          console.error('❌ Not Found:', data);
          break;
        case 500:
          console.error('❌ Internal Server Error:', data);
          break;
        default:
          console.error(`❌ Error ${status}:`, data);
      }
    } else if (error.request) {
      console.error('❌ No response received:', error.request);
    } else {
      console.error('❌ API Error:', error.message);
    }

    return Promise.reject(error);
  }
);
