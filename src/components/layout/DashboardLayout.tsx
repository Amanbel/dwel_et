import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="page-shell bg-background text-on-surface antialiased flex h-screen overflow-hidden w-full">
      {/* Sidebar Panel */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 h-full overflow-hidden">
        {/* Top Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Scrollable Main Content Frame */}
        <main className="relative flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop bg-background flex flex-col">
          <div className="relative z-[1] max-w-[1280px] w-full mx-auto flex-1 flex flex-col space-y-gutter">
            <Outlet />
          </div>
          <div className="relative z-[1]">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
