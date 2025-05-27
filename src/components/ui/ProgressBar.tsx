import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  showLabel = false,
  className = '',
  size = 'md',
  color = 'primary',
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };
  
  const colorClasses = {
    primary: 'bg-purple-500',
    secondary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600 flex justify-between">
          <span>{value} of {max} completed</span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  );
};