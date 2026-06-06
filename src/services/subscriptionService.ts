import { SubscriptionPlan } from '../types/subscription';
import { api } from './api';

export const subscriptionService = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    const { data } = await api.get<SubscriptionPlan[]>('/subscriptions/plans');
    return data;
  },
  upgrade: async (planId: string): Promise<boolean> => {
    await api.post('/subscriptions/upgrade', { planId });
    return true;
  }
};
