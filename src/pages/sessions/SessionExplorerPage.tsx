import React from 'react';
import { useSessions } from '../../hooks/useSessions';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Badge } from '../../components/common/Badge';
import { formatTimestamp } from '../../utils/date';
import { APPLICATIONS, CATEGORIES } from '../../utils/constants';

export const SessionExplorerPage: React.FC = () => {
  const { sessions, isLoading, filters, updateFilter, refresh } = useSessions();

  const handleExport = () => {
    alert('Exporting session records as CSV');
  };

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Session Explorer</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Analyze granular digital activity, sentiment, and impact scores across all tracked applications.
        </p>
      </div>

      {/* Filters Card */}
      <Card hoverable={false} className="p-lg">
        <div className="flex flex-col lg:flex-row gap-lg items-end">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md flex-1 w-full">
            {/* Date Range */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline">Date Range</label>
              <div className="relative">
                <select
                  value={filters.dateRange}
                  onChange={(e) => updateFilter('dateRange', e.target.value)}
                  className="w-full appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                >
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">
                  calendar_today
                </span>
              </div>
            </div>

            {/* Application */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline">Application</label>
              <div className="relative">
                <select
                  value={filters.application}
                  onChange={(e) => updateFilter('application', e.target.value)}
                  className="w-full appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                >
                  <option>All Apps</option>
                  {APPLICATIONS.map((app) => (
                    <option key={app} value={app}>
                      {app}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">
                  apps
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline">Category</label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                >
                  <option>All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">
                  category
                </span>
              </div>
            </div>

            {/* Sentiment */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline">Sentiment</label>
              <div className="relative">
                <select
                  value={filters.sentiment}
                  onChange={(e) => updateFilter('sentiment', e.target.value)}
                  className="w-full appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-body-sm text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                >
                  <option>Any Sentiment</option>
                  <option>Deep Work</option>
                  <option>Positive</option>
                  <option>Neutral</option>
                  <option>Negative</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">
                  mood
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-64">
            <button
              onClick={refresh}
              className="w-full bg-surface-container-highest hover:bg-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg py-2 transition-colors border border-outline-variant flex justify-center items-center gap-2 focus:outline-none"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Apply Filters
            </button>
          </div>
        </div>
      </Card>

      {/* Session Data Table Card */}
      {isLoading ? (
        <Loader />
      ) : (
        <Card hoverable={false} className="overflow-hidden flex flex-col p-0 border border-outline-variant">
          {/* Table Header Actions */}
          <div className="px-md py-sm border-b border-outline-variant bg-surface flex justify-between items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Showing {sessions.length} sessions
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="text-on-surface-variant hover:text-primary transition-colors p-1 focus:outline-none"
                title="Export CSV"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-surface-container-low font-label-sm text-label-sm text-outline border-b border-outline-variant">
                <tr>
                  <th className="py-3 px-4 font-medium w-40">Timestamp</th>
                  <th className="py-3 px-4 font-medium w-48">Application</th>
                  <th className="py-3 px-4 font-medium">Content Context</th>
                  <th className="py-3 px-4 font-medium w-32">Category</th>
                  <th className="py-3 px-4 font-medium w-32">Sentiment</th>
                  <th className="py-3 px-4 font-medium w-48 text-right">Impact Score</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-surface transition-colors group relative">
                    <td className="py-3 px-4 text-on-surface-variant whitespace-nowrap">
                      {formatTimestamp(session.timestamp)}
                    </td>
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-surface-container flex items-center justify-center">
                        <span className={`material-symbols-outlined text-[16px] ${session.iconColor}`}>
                          {session.icon}
                        </span>
                      </div>
                      {session.appName}
                    </td>
                    <td className="py-3 px-4 truncate max-w-xs text-on-surface-variant" title={session.context}>
                      {session.context}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-variant text-on-surface-variant">
                        {session.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        status={
                          session.sentiment === 'Deep Work'
                            ? 'neutral'
                            : session.sentiment === 'Positive'
                            ? 'positive'
                            : session.sentiment === 'Negative'
                            ? 'negative'
                            : 'default'
                        }
                        className="text-[11px]"
                      >
                        {session.sentiment}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span
                          className={`font-label-md text-label-md font-bold ${
                            session.impactScore >= 80
                              ? 'text-secondary'
                              : session.impactScore <= 30
                              ? 'text-error'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {session.impactScore}
                        </span>
                        <div className="w-16 h-1.5 bg-surface-variant rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              session.impactScore >= 80
                                ? 'bg-secondary'
                                : session.impactScore <= 30
                                ? 'bg-error'
                                : 'bg-primary'
                            }`}
                            style={{ width: `${session.impactScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-md py-sm border-t border-outline-variant bg-surface-container-lowest flex justify-between items-center text-body-sm text-outline">
            <span>Showing 1-{sessions.length} of {sessions.length}</span>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <span className="font-label-sm text-label-sm text-on-surface">Page 1 of 1</span>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
export default SessionExplorerPage;
