import { useState, useEffect } from 'react';
import { PlusCircle, DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import StatCard from '../components/StatCard';
import ChartContainer from '../components/ChartContainer';
import TransactionForm from '../components/TransactionForm';
import { useTransactionStore } from '../stores/transactionStore';

const Dashboard = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  
  const { 
    getTransactionSummary, 
    getFilteredTransactions, 
    getCategoryChartData,
    getMonthlyChartData
  } = useTransactionStore();
  
  const summary = getTransactionSummary();
  const recentTransactions = getFilteredTransactions().slice(0, 5);
  const categoryChartData = getCategoryChartData();
  const monthlyChartData = getMonthlyChartData();
  
  // Simulate chart loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddSuccess = () => {
    setShowAddTransaction(false);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Current Balance"
          value={formatCurrency(summary.balance)}
          icon={<DollarSign className="h-5 w-5" />}
          change={{ value: 12.5, type: 'increase' }}
        />
        
        <StatCard
          title="Total Income"
          value={formatCurrency(summary.totalIncome)}
          icon={<TrendingUp className="h-5 w-5" />}
          change={{ value: 8.2, type: 'increase' }}
        />
        
        <StatCard
          title="Total Expenses"
          value={formatCurrency(summary.totalExpense)}
          icon={<TrendingDown className="h-5 w-5" />}
          change={{ value: 3.1, type: 'decrease' }}
        />
      </div>
      
      {/* Charts and Transaction Form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Charts */}
        <div className="space-y-6 lg:col-span-2">
          {/* Monthly Income/Expense Chart */}
          <ChartContainer
            type="bar"
            data={monthlyChartData}
            title="Income vs. Expenses (Last 6 Months)"
            loading={chartLoading}
            height={280}
          />
          
          {/* Expense Categories Chart */}
          <ChartContainer
            type="pie"
            data={categoryChartData}
            title="Expense Breakdown by Category"
            loading={chartLoading}
            height={280}
          />
        </div>
        
        {/* Add Transaction Form or Recent Transactions */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {showAddTransaction ? 'Add Transaction' : 'Quick Actions'}
              </h2>
              
              {!showAddTransaction && (
                <button
                  className="btn-primary"
                  onClick={() => setShowAddTransaction(true)}
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Add Transaction
                </button>
              )}
            </div>
            
            {showAddTransaction ? (
              <TransactionForm
                onSuccess={handleAddSuccess}
                onCancel={() => setShowAddTransaction(false)}
              />
            ) : (
              <div className="space-y-4">
                <button className="w-full btn-secondary">
                  <PieChart className="mr-2 h-4 w-4" />
                  View Spending Insights
                </button>
                
                {/* Recent Transactions */}
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Recent Transactions
                  </h3>
                  
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-2">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700/20"
                        >
                          <div className="flex items-center">
                            <div
                              className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                                transaction.type === 'income'
                                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                                  : 'bg-error-100 text-error-700 dark:bg-error-900/20 dark:text-error-400'
                              }`}
                            >
                              {transaction.type === 'income' ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                {transaction.description}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`text-sm font-medium ${
                              transaction.type === 'income'
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-error-600 dark:text-error-400'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                      No recent transactions.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;