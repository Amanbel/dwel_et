import { SubscriptionPlan } from '../types/subscription';
import { delay } from './api';

const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub_base',
    name: 'Base Explorer',
    price: '$0',
    period: 'forever',
    description: 'Essential tools for individual awareness and daily tracking.',
    features: [
      'Daily Wellness Reports',
      '7-Day Historical Data Access',
      'Basic Focus Metrics'
    ],
    isPopular: false,
    buttonText: 'Current Plan'
  },
  {
    id: 'sub_pro',
    name: 'Lab Professional',
    price: '$24',
    period: 'month',
    description: 'Deep analytical tools and unlimited longitudinal data access.',
    features: [
      'Weekly & Monthly Meta-Reports',
      'Unlimited History & Storage',
      'Advanced Predictive Analytics',
      'Comprehensive PDF Exports',
      'Custom Goal Tracking Configurations'
    ],
    isPopular: true,
    buttonText: 'Upgrade to Professional'
  }
];

export const subscriptionService = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    await delay(150);
    return MOCK_PLANS;
  },
  upgrade: async (planId: string): Promise<boolean> => {
    await delay(500);
    console.log(`Mock upgrading user to ${planId}`);
    return true;
  }
};
