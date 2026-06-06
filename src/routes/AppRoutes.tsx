import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import DashboardLayout from '../components/layout/DashboardLayout';

// Pages
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AnalyticsPage from '../pages/analytics/AnalyticsPage';
import ReportsPage from '../pages/reports/ReportsPage';
import ReportDetailsPage from '../pages/reports/ReportDetailsPage';
import SessionExplorerPage from '../pages/sessions/SessionExplorerPage';
import RecommendationsPage from '../pages/recommendations/RecommendationsPage';
import SubscriptionPage from '../pages/subscription/SubscriptionPage';
import SettingsPage from '../pages/settings/SettingsPage';
import AgentChatPage from '../pages/agent/AgentChatPage';
import ProfilePage from '../pages/profile/ProfilePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Guest Only Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:id" element={<ReportDetailsPage />} />
          <Route path="/sessions" element={<SessionExplorerPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/agent" element={<AgentChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Catch-all inner route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* Fallback Catch-All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;
