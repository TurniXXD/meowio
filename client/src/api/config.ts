import axios from 'axios';
import { serviceOptions } from './serviceOptions';

export const initAxiosInstance = (token?: string) => {
  const configuredAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000,
    headers: {
      'X-API-KEY': process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  serviceOptions.axios = configuredAxios;
};
