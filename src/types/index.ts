export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense' | 'both';
};

export type TransactionSummary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

export type ThemeType = 'light' | 'dark' | 'system';

export type TimeRange = 'week' | 'month' | 'year' | 'all';