import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Bookmark className="h-6 w-6 text-purple-500" />
              <span className="ml-2 font-bold text-lg text-gray-800">QuizNova</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Create, share, and take interactive quizzes with our modern platform.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/quizzes" className="text-base text-gray-600 hover:text-purple-500">
                  Explore Quizzes
                </Link>
              </li>
              <li>
                <Link to="/create-quiz" className="text-base text-gray-600 hover:text-purple-500">
                  Create Quiz
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  Features
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-purple-500">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} QuizNova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;