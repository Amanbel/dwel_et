import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/authStore';
import { AnalyticsProvider } from './store/analyticsStore';
import { ReportProvider } from './store/reportStore';
import { ThemeProvider } from './store/ThemeContext';
import { LanguageProvider } from './store/LanguageContext';
import AppRoutes from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <AnalyticsProvider>
              <ReportProvider>
                <AppRoutes />
              </ReportProvider>
            </AnalyticsProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};
export default App;
