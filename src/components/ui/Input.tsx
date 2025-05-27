import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400';
    const statusStyles = error
      ? 'border-red-300 text-red-800 bg-red-50 focus:border-red-500'
      : 'border-gray-300 focus:border-purple-500';
      
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-gray-700 font-medium mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${statusStyles} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';