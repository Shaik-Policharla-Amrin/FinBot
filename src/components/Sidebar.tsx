import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  User,
  Settings,
  LogOut,
  X,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuthStore();
  
  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-50 transition-opacity duration-200 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white p-4 shadow-lg transition-transform duration-200 dark:bg-slate-800 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="mb-8 flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <Wallet className="mr-2 h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-slate-800 dark:text-white">FinBot</span>
          </NavLink>
          
          <button
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mb-auto space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-700/50 dark:hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-700/50 dark:hover:text-white'
              }`
            }
          >
            <CreditCard className="mr-3 h-5 w-5" />
            Transactions
          </NavLink>
          
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-700/50 dark:hover:text-white'
              }`
            }
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </NavLink>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-slate-700">
          <button
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;