import { Session, SessionFilters } from '../types/session';
import { delay } from './api';

const MOCK_SESSIONS: Session[] = [
  {
    id: 'ses_1',
    timestamp: new Date().toISOString(), // Today
    appName: 'VS Code',
    icon: 'code',
    iconColor: 'text-tertiary',
    context: 'Developing authentication module for new client portal. High focus period detected.',
    category: 'Development',
    sentiment: 'Deep Work',
    impactScore: 92
  },
  {
    id: 'ses_2',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2 hours ago
    appName: 'YouTube',
    icon: 'play_circle',
    iconColor: 'text-error',
    context: '"Advanced CSS Grid Techniques" - Educational content consumption.',
    category: 'Education',
    sentiment: 'Positive',
    impactScore: 78
  },
  {
    id: 'ses_3',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5 hours ago
    appName: 'Gmail',
    icon: 'mail',
    iconColor: 'text-primary',
    context: 'Processing daily inbox. High volume of short context switches.',
    category: 'Communication',
    sentiment: 'Neutral',
    impactScore: 50
  },
  {
    id: 'ses_4',
    timestamp: new Date(Date.now() - 7 * 3600 * 1000).toISOString(), // 7 hours ago
    appName: 'Instagram',
    icon: 'photo_camera',
    iconColor: 'text-error',
    context: 'Algorithmic timeline scrolling. Low active engagement detected.',
    category: 'Entertainment',
    sentiment: 'Negative',
    impactScore: 15
  },
  {
    id: 'ses_5',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // Yesterday
    appName: 'Notion',
    icon: 'notes',
    iconColor: 'text-on-surface',
    context: 'Financial planning and budget reconciliation document editing.',
    category: 'Productivity',
    sentiment: 'Positive',
    impactScore: 84
  }
];

export const sessionService = {
  getSessions: async (filters: Partial<SessionFilters>): Promise<Session[]> => {
    await delay(250);
    let filtered = [...MOCK_SESSIONS];
    
    if (filters.application && filters.application !== 'All Apps') {
      filtered = filtered.filter(s => s.appName === filters.application);
    }
    
    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(s => s.category === filters.category);
    }
    
    if (filters.sentiment && filters.sentiment !== 'Any Sentiment') {
      filtered = filtered.filter(s => s.sentiment === filters.sentiment);
    }
    
    return filtered;
  }
};
