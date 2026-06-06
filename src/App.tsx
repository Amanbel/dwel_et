import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/authStore';
import { AnalyticsProvider } from './store/analyticsStore';
import { ReportProvider } from './store/reportStore';
import AppRoutes from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsProvider>
          <ReportProvider>
            <AppRoutes />
          </ReportProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
