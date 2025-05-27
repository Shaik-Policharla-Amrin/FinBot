import { User } from '../types';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  pageTitle: string;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  pageTitle,
  user
}) => {
  const { theme, setTheme } = useThemeStore();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm dark:bg-slate-800">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger and Page Title */}
        <div className="flex items-center">
          <button
            className="mr-4 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            {pageTitle}
          </h1>
        </div>
        
        {/* Right: User Profile and Settings */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          {/* Notifications */}
          <button
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="User menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                {user?.name.charAt(0) || 'U'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;