import axios, { AxiosError } from 'axios';

import { getToken } from './getToken';

const baseURL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'http://10.0.2.2:80';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || 'Erro inesperado na API';

    return Promise.reject(new Error(message));
  },
);
