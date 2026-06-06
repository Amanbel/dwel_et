import { Report } from '../types/report';
import { api } from './api';

export const reportsService = {
  getReports: async (type?: 'daily' | 'weekly' | 'monthly'): Promise<Report[]> => {
    const { data } = await api.get<Report[]>('/reports', { params: { type } });
    if (data.length || !type) {
      return data;
    }

    const generated = await api.post<Report>('/reports/generate', { type });
    return [generated.data];
  },
  getReportById: async (id: string): Promise<Report | null> => {
    const { data } = await api.get<Report>(`/reports/${id}`);
    return data;
  }
};
