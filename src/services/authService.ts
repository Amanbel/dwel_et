import { User } from '../types/user';
import { delay } from './api';

const STORAGE_KEY = 'dwel_user';

const MOCK_USER: User = {
  id: 'usr_123',
  name: 'Dr. A. Researcher',
  email: 'researcher@dwel.lab',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt2eN1IxWZfFjKQiYY1LA8pJsntzUjrd0LqZMWILzfX4-xJo7RkI8Y-syX6bI3NZfnhXRu5ak99I_2Kps8g5JjBhCJcQfrkuGRO8UX4cqmANP40HJYRws9-SlWDEmaK0_RVzAwkY3AybMLyqpMsBxqwJdsyQXjWDuNk4TP_lkbxZmjvxvR_me5J5SZo8tyIKa90HmSHz_MgDuavaaa5VOStwD0hRzdC5clW1aJUnJidIMY9ob_A3v52S8DebAZROca-yQimXuZOzjb',
  role: 'Senior Digital Wellness Specialist'
};

export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    await delay(200);
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  login: async (email: string, _: string): Promise<User> => {
    await delay(500);
    const user = { ...MOCK_USER, email, name: email.split('@')[0] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  register: async (name: string, email: string, _: string): Promise<User> => {
    await delay(500);
    const user: User = {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      avatarUrl: MOCK_USER.avatarUrl,
      role: 'Standard Lab User'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    await delay(200);
    localStorage.removeItem(STORAGE_KEY);
  }
};
