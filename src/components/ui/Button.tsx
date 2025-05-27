import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-purple-500 hover:bg-purple-600 text-white shadow-sm',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm',
    outline: 'border-2 border-purple-500 text-purple-500 hover:bg-purple-50',
    ghost: 'text-purple-500 hover:bg-purple-50',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };
  
  const loadingStyles = isLoading 
    ? 'opacity-80 cursor-not-allowed' 
    : '';
  
  const disabledStyles = disabled 
    ? 'opacity-60 cursor-not-allowed pointer-events-none' 
    : '';
  
  const combinedStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${loadingStyles} 
    ${disabledStyles} 
    ${className || ''}
  `;

  return (
    <button
      className={combinedStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : children}
    </button>
  );
};