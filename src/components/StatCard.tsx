import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, className = '' }) => {
  // Format value as INR if it's a number
  const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
    : value;

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <div className="rounded-full p-2 text-primary-500 dark:text-primary-400">{icon}</div>
      </div>
      
      <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">{formattedValue}</p>
      
      {change && (
        <div className="mt-2 flex items-center">
          <span
            className={`text-xs font-medium ${
              change.type === 'increase'
                ? 'text-success-600 dark:text-success-400'
                : change.type === 'decrease'
                ? 'text-error-600 dark:text-error-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {change.type === 'increase' && '+'}
            {change.value}%
          </span>
          <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">from last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;