import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Edit, Trash2, MoreVertical, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransactionStore } from '../stores/transactionStore';
import TransactionForm from './TransactionForm';
import { Transaction } from '../types';

const TransactionList: React.FC = () => {
  const { getFilteredTransactions, deleteTransaction, categories } = useTransactionStore();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  const transactions = getFilteredTransactions();
  
  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Other';
  };
  
  const getCategoryColor = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.color || '#6B7280';
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };
  
  if (transactions.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          No transactions found. Add your first transaction to get started.
        </p>
      </div>
    );
  }
  
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {editingTransaction ? (
        <div className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Edit Transaction</h3>
          <TransactionForm
            editMode
            transactionId={editingTransaction.id}
            initialValues={{
              amount: editingTransaction.amount,
              description: editingTransaction.description,
              category: editingTransaction.category,
              date: editingTransaction.date,
              type: editingTransaction.type,
            }}
            onSuccess={() => setEditingTransaction(null)}
            onCancel={() => setEditingTransaction(null)}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/30">
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Date
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Description
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Category
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/20"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                    {format(parseISO(transaction.date), 'MMM dd, yyyy')}
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div
                        className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                          transaction.type === 'income' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'bg-error-100 text-error-700 dark:bg-error-900/20 dark:text-error-400'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${getCategoryColor(transaction.category)}20`,
                        color: getCategoryColor(transaction.category),
                      }}
                    >
                      {getCategoryName(transaction.category)}
                    </span>
                  </td>
                  
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === 'income'
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-error-600 dark:text-error-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(transaction.amount)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"
                        onClick={() => setEditingTransaction(transaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        className="rounded p-1 text-slate-400 transition-colors hover:bg-error-100 hover:text-error-600 dark:hover:bg-error-900/20 dark:hover:text-error-400"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;