import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { QuizCard } from '../components/ui/QuizCard';
import { useQuiz } from '../context/QuizContext';
import { Quiz } from '../types';

const QuizListingPage: React.FC = () => {
  const { quizzes, searchQuizzes } = useQuiz();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(quizzes);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    if (searchQuery.trim() === '' && selectedFilter === 'all') {
      setFilteredQuizzes(quizzes);
    } else {
      let results = searchQuery.trim() ? searchQuizzes(searchQuery) : quizzes;
      
      // Apply category filter if not 'all'
      if (selectedFilter !== 'all') {
        results = results.filter(quiz => 
          quiz.title.toLowerCase().includes(selectedFilter.toLowerCase()) || 
          quiz.description.toLowerCase().includes(selectedFilter.toLowerCase())
        );
      }
      
      setFilteredQuizzes(results);
    }
  }, [searchQuery, quizzes, searchQuizzes, selectedFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const categories = [
    { id: 'all', name: 'All Quizzes' },
    { id: 'web', name: 'Web Development' },
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'math', name: 'Mathematics' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Quizzes</h1>
          <p className="mt-2 text-gray-600">
            Discover and take quizzes created by our community
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative rounded-md shadow-sm max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      
      {/* Filter section */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <div className="flex items-center mr-2 text-gray-700">
          <Filter className="h-5 w-5 mr-1" />
          <span>Filter:</span>
        </div>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleFilterChange(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === category.id
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {filteredQuizzes.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredQuizzes.map(quiz => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuizCard quiz={quiz} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900">No quizzes found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default QuizListingPage;