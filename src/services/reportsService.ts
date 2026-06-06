import { Report } from '../types/report';
import { delay } from './api';

const MOCK_REPORTS: Report[] = [
  {
    id: 'rep_weekly_1',
    type: 'weekly',
    title: 'Weekly Executive Summary',
    dateRange: 'Oct 15 - Oct 21',
    summary: 'Your digital wellness score improved by 8% this week. Focus sessions were more sustained, and late-night screen time decreased significantly. The primary detractor remains context switching during peak productivity hours.',
    score: 84,
    deepWorkHours: 14,
    fatigueRisk: 'Low',
    focusPercentage: 65,
    disruptionPercentage: 35,
    calmPercentage: 42,
    stressPercentage: 18,
    neutralPercentage: 40,
    recommendations: [
      { id: 'rec_1', title: 'Implement a 10-min Evening Wind-down', description: 'Data shows continued device usage right up to sleep time. Creating a buffer zone will improve sleep quality metrics.' },
      { id: 'rec_2', title: 'Batch Email Checking', description: 'You switched contexts to email 47 times during focus blocks. Try batching to 3 specific times daily.' }
    ]
  },
  {
    id: 'rep_weekly_2',
    type: 'weekly',
    title: 'Weekly Baseline Summary',
    dateRange: 'Oct 08 - Oct 14',
    summary: 'Higher levels of notification disruptions were recorded. Screen time peaked during late evenings, leading to standard fatigue indicators. Deep work intervals were interrupted every 12 minutes on average.',
    score: 76,
    deepWorkHours: 9,
    fatigueRisk: 'Medium',
    focusPercentage: 50,
    disruptionPercentage: 50,
    calmPercentage: 30,
    stressPercentage: 35,
    neutralPercentage: 35,
    recommendations: [
      { id: 'rec_3', title: 'Silence Social Notifications', description: 'Active distraction points occurred during high concentration blocks. Block non-essential notifications.' }
    ]
  }
];

export const reportsService = {
  getReports: async (type?: 'daily' | 'weekly' | 'monthly'): Promise<Report[]> => {
    await delay(200);
    if (type) {
      return MOCK_REPORTS.filter((r) => r.type === type);
    }
    return MOCK_REPORTS;
  },
  getReportById: async (id: string): Promise<Report | null> => {
    await delay(150);
    return MOCK_REPORTS.find((r) => r.id === id) || null;
  }
};
