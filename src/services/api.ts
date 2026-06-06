import axios from 'axios';

export const ACCESS_TOKEN_KEY = 'dwel_access_token';
export const REFRESH_TOKEN_KEY = 'dwel_refresh_token';
export const USER_KEY = 'dwel_user';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (error.response?.status === 401 && refreshToken && !original?._retry) {
      original._retry = true;
      const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    }

    return Promise.reject(error);
  },
);

export const setSession = (payload: { accessToken: string; refreshToken: string; user: unknown }) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
};

export const clearSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const delay = (ms: number = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
