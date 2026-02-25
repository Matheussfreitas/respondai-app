import axios from 'axios'
import { getToken } from './getToken';

export const api = axios.create({
  baseURL: 'https://api.example.com',
})

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
