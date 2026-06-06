import React, { createContext, useContext, useState, useEffect } from 'react';
import { Report } from '../types/report';
import { reportsService } from '../services/reportsService';

interface ReportContextType {
  reports: Report[];
  selectedType: 'daily' | 'weekly' | 'monthly';
  setSelectedType: (type: 'daily' | 'weekly' | 'monthly') => void;
  activeReport: Report | null;
  loadReportDetails: (id: string) => Promise<void>;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedType, setSelectedType] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const data = await reportsService.getReports(selectedType);
      setReports(data);
      // Auto-set the first report as active
      if (data.length > 0) {
        setActiveReport(data[0]);
      } else {
        setActiveReport(null);
      }
    } catch (error) {
      console.error('Failed to load reports', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadReportDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const report = await reportsService.getReportById(id);
      setActiveReport(report);
    } catch (error) {
      console.error(`Failed to load report details for ID: ${id}`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [selectedType]);

  return (
    <ReportContext.Provider
      value={{
        reports,
        selectedType,
        setSelectedType,
        activeReport,
        loadReportDetails,
        isLoading,
        refresh: loadReports
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};
