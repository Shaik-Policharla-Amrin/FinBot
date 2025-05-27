import { useState } from 'react';
import { Filter, PlusCircle, Search, X } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useTransactionStore } from '../stores/transactionStore';
import { TimeRange } from '../types';

const Transactions = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const { filter, setFilter, categories } = useTransactionStore();
  
  const handleTimeRangeChange = (timeRange: TimeRange) => {
    setFilter({ timeRange });
  };
  
  const handleFilterTypeChange = (type: 'all' | 'income' | 'expense') => {
    setFilter({ type });
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ category: e.target.value || null });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ search: e.target.value });
  };
  
  const clearFilters = () => {
    setFilter({
      type: 'all',
      category: null,
      timeRange: 'month',
      search: '',
    });
  };
  
  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' },
  ];
  
  const handleAddSuccess = () => {
    setShowAddTransaction(false);
  };
  
  const isFiltered =
    filter.type !== 'all' ||
    filter.category !== null ||
    filter.timeRange !== 'month' ||
    filter.search !== '';
    
  return (
    <div className="max-w-7xl mx-auto">
      {showAddTransaction ? (
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Add New Transaction
            </h2>
            <button
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              onClick={() => setShowAddTransaction(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <TransactionForm onSuccess={handleAddSuccess} onCancel={() => setShowAddTransaction(false)} />
        </div>
      ) : (
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Transactions
          </h1>
          
          <button
            className="btn-primary"
            onClick={() => setShowAddTransaction(true)}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Transaction
          </button>
        </div>
      )}
      
      {/* Filters */}
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center">
            <Filter className="mr-2 h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h2 className="text-base font-medium text-slate-800 dark:text-white">
              Filters
            </h2>
            
            {isFiltered && (
              <button
                className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                onClick={clearFilters}
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="flex w-full flex-1 flex-wrap gap-2 md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-auto md:flex-initial">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={filter.search}
                onChange={handleSearchChange}
                className="w-full pl-9 md:w-64"
              />
            </div>
            
            {/* Time Range */}
            <select
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 dark:border-slate-700 dark:bg-slate-800"
              value={filter.timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value as TimeRange)}
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Type Filter */}
            <select
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 dark:border-slate-700 dark:bg-slate-800"
              value={filter.type}
              onChange={(e) => handleFilterTypeChange(e.target.value as 'all' | 'income' | 'expense')}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            
            {/* Category Filter */}
            <select
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 dark:border-slate-700 dark:bg-slate-800"
              value={filter.category || ''}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Transaction List */}
      <TransactionList />
    </div>
  );
};

export default Transactions;