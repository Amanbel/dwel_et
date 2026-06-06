import { User } from '../types/user';
import { api, clearSession, setSession, USER_KEY } from './api';

export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;

    try {
      const { data } = await api.get<User>('/users/me');
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return data;
    } catch {
      return JSON.parse(stored);
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    const { data } = await api.post('/auth/login', { email, password });
    setSession(data);
    return data.user;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    await api.post('/auth/register', { name, email, password });
    return authService.login(email, password);
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearSession();
    }
  }
};
