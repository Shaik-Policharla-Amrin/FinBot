import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bookmark, PenSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Bookmark className="h-8 w-8 text-purple-500" />
              <span className="ml-2 font-bold text-xl text-gray-800">QuizNova</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/quizzes" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/quizzes') ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'}`}>
              Explore Quizzes
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create-quiz" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/create-quiz') ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'}`}>
                  Create Quiz
                </Link>
                <div className="ml-4 flex items-center">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    {user?.name || user?.email}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
          <Link
            to="/quizzes"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/quizzes') ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
            }`}
            onClick={closeMenu}
          >
            Explore Quizzes
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/create-quiz"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/create-quiz') ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  <PenSquare className="h-5 w-5 mr-2" />
                  Create Quiz
                </div>
              </Link>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-700">
                  Signed in as: {user?.name || user?.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Link
                to="/login"
                className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={closeMenu}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600"
                onClick={closeMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;