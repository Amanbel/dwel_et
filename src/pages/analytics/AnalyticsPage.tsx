import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Badge } from '../../components/common/Badge';
import { formatImpactScore } from '../../utils/formatters';
import { ImpactBarChart } from '../../components/charts/ImpactBarChart';

export const AnalyticsPage: React.FC = () => {
  const { categories, appImpacts, insights, isLoading } = useAnalytics();

  const handleExportCSV = () => {
    alert('Exporting exposure breakdown as CSV');
  };

  const handleExportPDF = () => {
    alert('Generating detailed PDF analytics report');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          Exposure Analytics
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
          Deep dive into digital consumption patterns and cognitive impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Category Breakdown Table (Full Width) */}
        <div className="lg:col-span-12">
          <Card accentColor="primary" className="p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">Content Exposure Breakdown</h3>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-xs text-primary font-label-md text-label-md hover:bg-surface-container py-xs px-sm rounded-lg transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Export CSV</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="py-sm px-sm font-label-md text-label-md text-outline">Category</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline">Exposure Time</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline">Percentage</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline">Impact Score</th>
                    <th className="py-sm px-sm font-label-md text-label-md text-outline">Trend</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm">
                  {categories.map((cat, i) => (
                    <tr key={i} className="border-b border-surface-variant hover:bg-surface transition-colors">
                      <td className="py-sm px-sm font-medium text-on-surface flex items-center">
                        <span
                          className="w-2.5 h-2.5 rounded-full mr-sm shrink-0"
                          style={{ backgroundColor: cat.color }}
                        ></span>
                        {cat.category}
                      </td>
                      <td className="py-sm px-sm text-on-surface-variant">{cat.time}</td>
                      <td className="py-sm px-sm">
                        <div className="flex items-center">
                          <span className="w-8 text-right mr-sm text-on-surface-variant">
                            {cat.percentage}%
                          </span>
                          <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-sm px-sm">
                        <Badge status={cat.impact >= 0 ? 'positive' : 'negative'}>
                          {formatImpactScore(cat.impact)}
                        </Badge>
                      </td>
                      <td className="py-sm px-sm">
                        <span className="material-symbols-outlined text-outline">
                          {cat.trend === 'up'
                            ? 'trending_up'
                            : cat.trend === 'down'
                            ? 'trending_down'
                            : 'trending_flat'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Emotional Analysis (Two Thirds) */}
        <div className="lg:col-span-8">
          <Card accentColor="tertiary" className="p-lg h-full flex flex-col justify-between">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">Emotional Exposure Trends</h3>
              <div className="flex space-x-sm bg-surface-container p-xs rounded-md">
                <span className="font-label-sm text-label-sm px-sm py-xs bg-surface-container-lowest shadow-xs rounded text-on-surface font-semibold">
                  7 Days
                </span>
                <span className="font-label-sm text-label-sm px-sm py-xs text-outline cursor-pointer hover:bg-surface rounded">
                  30 Days
                </span>
              </div>
            </div>
            
            <ImpactBarChart />
            
            <div className="flex justify-center mt-md space-x-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded bg-secondary opacity-80 mr-xs"></span>
                <span className="font-label-sm text-label-sm text-outline">Calm/Focus</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded bg-error opacity-80 mr-xs"></span>
                <span className="font-label-sm text-label-sm text-outline">Stress/Fatigue</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Topic Analysis Cloud (One Third) */}
        <div className="lg:col-span-4">
          <Card className="p-lg flex flex-col h-full justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Semantic Topics</h3>
              <p className="font-body-sm text-body-sm text-outline mb-md leading-relaxed">
                Dominant themes derived from textual and visual exposure during active sessions.
              </p>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-lg border border-surface-variant p-md flex flex-wrap content-center justify-center gap-sm min-h-[160px]">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-bold opacity-90">
                Research Data
              </span>
              <span className="px-2 py-1 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-full text-xs font-medium opacity-85">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full text-xs opacity-75">
                UI Design
              </span>
              <span className="px-2 py-1 bg-error-container text-on-error-container rounded-full text-[10px] opacity-60">
                News Headlines
              </span>
              <span className="px-4 py-2 bg-secondary-fixed text-on-secondary-fixed rounded-full text-base font-bold opacity-100">
                Cognitive Science
              </span>
              <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs opacity-75">
                Email Chains
              </span>
              <span className="px-2 py-1 bg-primary-container text-on-primary-container rounded-full text-[10px] opacity-80">
                System Config
              </span>
            </div>
          </Card>
        </div>

        {/* App Impact Analysis (Half Width) */}
        <div className="lg:col-span-6">
          <Card className="p-lg h-full flex flex-col justify-between">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">App Impact Ranking</h3>
            <div className="space-y-sm">
              {appImpacts.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-lowest transition-colors border border-transparent hover:border-surface-variant"
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-sm text-white"
                      style={{ backgroundColor: app.color }}
                    >
                      <span className="material-symbols-outlined">{app.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">
                        {app.appName}
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline">{app.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-surface font-bold">{app.time}</p>
                    <Badge
                      status={
                        app.impact === 'positive'
                          ? 'positive'
                          : app.impact === 'negative'
                          ? 'negative'
                          : 'neutral'
                      }
                      className="mt-xs text-[10px]"
                    >
                      {app.focusLabel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contextual Insights (Half Width) */}
        <div className="lg:col-span-6">
          <Card className="p-lg bg-gradient-to-br from-surface to-primary-fixed/20 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Lab Insights</h3>
              <div className="space-y-md">
                {insights.map((ins) => (
                  <div key={ins.id} className="flex items-start">
                    <span
                      className={`material-symbols-outlined mr-sm mt-1 shrink-0 ${
                        ins.type === 'warning' ? 'text-error' : 'text-secondary'
                      }`}
                    >
                      {ins.type === 'warning' ? 'warning' : 'lightbulb'}
                    </span>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-bold">
                        {ins.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-relaxed">
                        {ins.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleExportPDF}
              className="mt-lg w-full py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-all hover:scale-[1.01] shadow-sm font-semibold focus:outline-none"
            >
              Generate Detailed PDF Report
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsPage;
