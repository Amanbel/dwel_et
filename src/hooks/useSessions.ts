import { useState, useEffect } from 'react';
import { Session, SessionFilters } from '../types/session';
import { sessionService } from '../services/sessionService';

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<SessionFilters>({
    dateRange: 'Last 7 Days',
    application: 'All Apps',
    category: 'All Categories',
    sentiment: 'Any Sentiment'
  });

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const data = await sessionService.getSessions(filters);
      setSessions(data);
    } catch (error) {
      console.error('Failed to load sessions', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilter = (key: keyof SessionFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    loadSessions();
  }, [filters.application, filters.category, filters.sentiment]);

  return {
    sessions,
    isLoading,
    filters,
    updateFilter,
    refresh: loadSessions
  };
};
