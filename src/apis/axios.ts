import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/Endpoints';

let accessToken: string | null = localStorage.getItem('accessToken');

export const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => accessToken;

const config = {
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiClient = axios.create(config);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh Token을 통해 Access Token 재발급 함수
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await axios.get(API_ENDPOINTS.AUTH.REFRESH, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      refreshToken: ` ${refreshToken}`,
    },
  });

  const newAccessToken = response.data.data.accessToken;
  setAccessToken(newAccessToken);
  localStorage.setItem('refreshToken', response.data.data.refreshToken);

  return newAccessToken;
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.data?.code === 'EXPIRED_ACCESS_TOKEN') {
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed or expired.', refreshError);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
