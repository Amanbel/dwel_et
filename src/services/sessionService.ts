import { Session, SessionFilters } from '../types/session';
import { api } from './api';

export const sessionService = {
  getSessions: async (filters: Partial<SessionFilters>): Promise<Session[]> => {
    const { data } = await api.get<Session[]>('/sessions', { params: filters });
    return data;
  }
};
