import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Category, TransactionSummary, ChartData, TimeRange } from '../types';
import { format, subDays, subMonths, subYears, parseISO, isAfter } from 'date-fns';

// Default categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Salary', color: '#10B981', icon: 'briefcase', type: 'income' },
  { id: '2', name: 'Freelance', color: '#6366F1', icon: 'laptop', type: 'income' },
  { id: '3', name: 'Investments', color: '#F59E0B', icon: 'trending-up', type: 'income' },
  { id: '4', name: 'Food', color: '#EF4444', icon: 'utensils', type: 'expense' },
  { id: '5', name: 'Housing', color: '#8B5CF6', icon: 'home', type: 'expense' },
  { id: '6', name: 'Transportation', color: '#3B82F6', icon: 'car', type: 'expense' },
  { id: '7', name: 'Entertainment', color: '#EC4899', icon: 'film', type: 'expense' },
  { id: '8', name: 'Shopping', color: '#F97316', icon: 'shopping-bag', type: 'expense' },
  { id: '9', name: 'Health', color: '#14B8A6', icon: 'activity', type: 'expense' },
  { id: '10', name: 'Other', color: '#6B7280', icon: 'more-horizontal', type: 'both' },
];

// Sample transactions for demo
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 3500,
    description: 'Monthly Salary',
    category: '1',
    date: '2025-01-01',
    type: 'income',
    createdAt: '2025-01-01T10:00:00Z',
  },
  {
    id: '2',
    amount: 800,
    description: 'Freelance Project',
    category: '2',
    date: '2025-01-15',
    type: 'income',
    createdAt: '2025-01-15T14:30:00Z',
  },
  {
    id: '3',
    amount: 1200,
    description: 'Rent Payment',
    category: '5',
    date: '2025-01-05',
    type: 'expense',
    createdAt: '2025-01-05T09:15:00Z',
  },
  {
    id: '4',
    amount: 85,
    description: 'Grocery Shopping',
    category: '4',
    date: '2025-01-10',
    type: 'expense',
    createdAt: '2025-01-10T18:45:00Z',
  },
  {
    id: '5',
    amount: 150,
    description: 'Concert Tickets',
    category: '7',
    date: '2025-01-20',
    type: 'expense',
    createdAt: '2025-01-20T20:00:00Z',
  },
];

interface TransactionState {
  transactions: Transaction[];
  categories: Category[];
  filter: {
    type: 'all' | 'income' | 'expense';
    category: string | null;
    timeRange: TimeRange;
    search: string;
  };
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  setFilter: (filter: Partial<TransactionState['filter']>) => void;
  getFilteredTransactions: () => Transaction[];
  getTransactionSummary: () => TransactionSummary;
  getCategoryChartData: () => ChartData;
  getMonthlyChartData: () => ChartData;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: sampleTransactions,
      categories: defaultCategories,
      filter: {
        type: 'all',
        category: null,
        timeRange: 'month',
        search: '',
      },
      
      // Add transaction
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },
      
      // Delete transaction
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      
      // Update transaction
      updateTransaction: (id, data) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        }));
      },
      
      // Add category
      addCategory: (category) => {
        const newCategory: Category = {
          ...category,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },
      
      // Set filter
      setFilter: (filter) => {
        set((state) => ({
          filter: { ...state.filter, ...filter },
        }));
      },
      
      // Get filtered transactions
      getFilteredTransactions: () => {
        const { transactions, filter, categories } = get();
        const now = new Date();
        
        // Filter by date range
        let filteredByDate = [...transactions];
        if (filter.timeRange !== 'all') {
          let startDate;
          
          switch (filter.timeRange) {
            case 'week':
              startDate = subDays(now, 7);
              break;
            case 'month':
              startDate = subMonths(now, 1);
              break;
            case 'year':
              startDate = subYears(now, 1);
              break;
          }
          
          filteredByDate = transactions.filter((t) =>
            isAfter(parseISO(t.date), startDate)
          );
        }
        
        // Filter by type
        let filtered = filteredByDate;
        if (filter.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filter.type);
        }
        
        // Filter by category
        if (filter.category) {
          filtered = filtered.filter((t) => t.category === filter.category);
        }
        
        // Filter by search term
        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(searchLower) ||
              categories.find((c) => c.id === t.category)?.name.toLowerCase().includes(searchLower)
          );
        }
        
        // Sort by date (newest first)
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      
      // Get transaction summary
      getTransactionSummary: () => {
        const transactions = get().getFilteredTransactions();
        
        const totalIncome = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const totalExpense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
          
        return {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        };
      },
      
      // Get category chart data
      getCategoryChartData: () => {
        const transactions = get().getFilteredTransactions();
        const { categories } = get();
        
        // Only expenses for the pie chart
        const expenseTransactions = transactions.filter((t) => t.type === 'expense');
        
        // Group by category
        const categoryTotals: Record<string, number> = {};
        
        expenseTransactions.forEach((t) => {
          if (categoryTotals[t.category]) {
            categoryTotals[t.category] += t.amount;
          } else {
            categoryTotals[t.category] = t.amount;
          }
        });
        
        // Prepare chart data
        const labels: string[] = [];
        const data: number[] = [];
        const backgroundColors: string[] = [];
        
        Object.entries(categoryTotals).forEach(([categoryId, amount]) => {
          const category = categories.find((c) => c.id === categoryId);
          if (category) {
            labels.push(category.name);
            data.push(amount);
            backgroundColors.push(category.color);
          }
        });
        
        return {
          labels,
          datasets: [
            {
              label: 'Expenses by Category',
              data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        };
      },
      
      // Get monthly chart data
      getMonthlyChartData: () => {
        const transactions = get().getFilteredTransactions();
        
        // Get last 6 months
        const months: string[] = [];
        const incomeData: number[] = [];
        const expenseData: number[] = [];
        
        for (let i = 5; i >= 0; i--) {
          const date = subMonths(new Date(), i);
          const monthYear = format(date, 'MMM yyyy');
          months.push(monthYear);
          
          const monthTransactions = transactions.filter((t) => {
            const transactionDate = parseISO(t.date);
            return (
              format(transactionDate, 'M yyyy') === format(date, 'M yyyy')
            );
          });
          
          const monthlyIncome = monthTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
            
          const monthlyExpense = monthTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
            
          incomeData.push(monthlyIncome);
          expenseData.push(monthlyExpense);
        }
        
        return {
          labels: months,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              backgroundColor: 'rgba(16, 185, 129, 0.5)',
              borderColor: '#10B981',
              borderWidth: 2,
            },
            {
              label: 'Expenses',
              data: expenseData,
              backgroundColor: 'rgba(239, 68, 68, 0.5)',
              borderColor: '#EF4444',
              borderWidth: 2,
            },
          ],
        };
      },
    }),
    {
      name: 'finbot-transactions',
      partialize: (state) => ({
        transactions: state.transactions,
        categories: state.categories,
      }),
    }
  )
);