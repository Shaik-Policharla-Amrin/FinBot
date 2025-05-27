import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthStore } from '../stores/authStore';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();
  
  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  
  // Create route title mapping
  const routeTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/transactions': 'Transactions',
    '/profile': 'Profile',
  };
  
  const pageTitle = routeTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          pageTitle={pageTitle}
          user={user}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        
        <footer className="border-t border-slate-200 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <p>© 2025 FinBot - Personal Finance Tracker</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;