import { useReportContext } from '../store/reportStore';

export const useReports = () => {
  const {
    reports,
    selectedType,
    setSelectedType,
    activeReport,
    loadReportDetails,
    isLoading,
    refresh
  } = useReportContext();

  return {
    reports,
    selectedType,
    setSelectedType,
    activeReport,
    loadReportDetails,
    isLoading,
    refresh
  };
};
