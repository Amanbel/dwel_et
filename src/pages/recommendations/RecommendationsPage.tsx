import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const RecommendationsPage: React.FC = () => {
  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          Recommendations
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
          Based on your recent digital footprint, we've identified key areas to optimize your cognitive load and enhance focus. Here are your personalized wellness insights.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Positive Habits Card (Spans 8 cols) */}
        <div className="md:col-span-8">
          <Card accentColor="secondary" className="h-full flex flex-col justify-between p-lg relative overflow-hidden group">
            <div>
              <div className="flex items-start justify-between mb-md">
                <div>
                  <div className="flex items-center space-x-sm mb-xs">
                    <span className="material-symbols-outlined text-secondary">trending_up</span>
                    <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">
                      Positive Trends
                    </h3>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">Focus Blocks Improving</h4>
                </div>
                <Badge status="positive" className="flex items-center space-x-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  <span>15% vs Last Wk</span>
                </Badge>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
                Your deep work sessions between 9 AM and 11 AM are highly effective. You've maintained an average of 90 minutes of uninterrupted focus over the last 4 days.
              </p>
            </div>
            <div className="bg-surface p-md rounded-lg border border-outline-variant flex items-center space-x-md">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-bold">Suggested Action</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-relaxed">
                  Protect this time block. We recommend silencing non-essential notifications from 9 AM to 11 AM daily.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Indicators Card (Spans 4 cols) */}
        <div className="md:col-span-4">
          <Card accentColor="error" className="h-full flex flex-col justify-between p-lg relative overflow-hidden group">
            <div>
              <div className="flex items-center space-x-sm mb-md">
                <span className="material-symbols-outlined text-error">warning</span>
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">
                  Risk Indicator
                </h3>
              </div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-xs">Late-Night Screen Time</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg leading-relaxed">
                Elevated device usage detected past 11 PM for 3 consecutive nights. This directly impacts REM sleep cycles and cognitive recovery.
              </p>
            </div>
            <div className="space-y-sm border-t border-outline-variant pt-md">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant font-medium">Current Avg (post 11PM)</span>
                <span className="text-error font-semibold">1h 45m</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                <div className="bg-error h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant text-right">Target: &lt; 30m</p>
            </div>
          </Card>
        </div>

        {/* Personalized Goals & Progress (Spans 12 cols) */}
        <div className="md:col-span-12">
          <Card accentColor="primary" className="p-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-lg border-b border-outline-variant pb-sm">
              <div className="flex items-center space-x-sm">
                <span className="material-symbols-outlined text-primary">flag</span>
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">
                  Active Wellness Goals
                </h3>
              </div>
              <button className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center focus:outline-none">
                <span>Manage Goals</span>
                <span className="material-symbols-outlined text-[16px] ml-xs">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              {/* Goal 1 */}
              <div className="bg-surface rounded-lg p-md border border-outline-variant">
                <div className="flex justify-between items-start mb-sm">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">
                      Reduce Late-Night Usage
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                      Decrease post-11 PM screen time by 20%
                    </p>
                  </div>
                  <Badge status="neutral">In Progress</Badge>
                </div>
                <div className="mt-md">
                  <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                    <span className="text-primary font-bold">65% Achieved</span>
                    <span className="text-on-surface-variant">4 Days Remaining</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="bg-surface rounded-lg p-md border border-outline-variant">
                <div className="flex justify-between items-start mb-sm">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">
                      Increase Educational Content
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                      Shift 30m of social media to educational apps
                    </p>
                  </div>
                  <Badge status="neutral">In Progress</Badge>
                </div>
                <div className="mt-md">
                  <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                    <span className="text-tertiary font-bold">40% Achieved</span>
                    <span className="text-on-surface-variant">Ongoing</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                    <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default RecommendationsPage;
