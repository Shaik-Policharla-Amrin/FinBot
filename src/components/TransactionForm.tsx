import { useState, useEffect } from 'react';
import { useTransactionStore } from '../stores/transactionStore';

interface TransactionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: {
    amount: number;
    description: string;
    category: string;
    date: string;
    type: 'income' | 'expense';
  };
  editMode?: boolean;
  transactionId?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSuccess,
  onCancel,
  initialValues,
  editMode = false,
  transactionId,
}) => {
  const { categories, addTransaction, updateTransaction } = useTransactionStore();
  
  const [values, setValues] = useState({
    amount: initialValues?.amount || 0,
    description: initialValues?.description || '',
    category: initialValues?.category || '',
    date: initialValues?.date || new Date().toISOString().split('T')[0],
    type: initialValues?.type || 'expense',
  });
  
  const [errors, setErrors] = useState({
    amount: '',
    description: '',
    category: '',
  });
  
  // Filter categories based on transaction type
  const filteredCategories = categories.filter(
    (category) => category.type === 'both' || category.type === values.type
  );
  
  // Set default category when type changes
  useEffect(() => {
    const defaultCategory = filteredCategories[0]?.id || '';
    if (!filteredCategories.find((c) => c.id === values.category)) {
      setValues((prev) => ({ ...prev, category: defaultCategory }));
    }
  }, [values.type, filteredCategories]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      // Remove non-numeric characters except decimal point
      const sanitizedValue = value.replace(/[^\d.]/g, '');
      setValues({ ...values, [name]: sanitizedValue });
    } else {
      setValues({ ...values, [name]: value });
    }
    
    // Clear error when field is updated
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validate = () => {
    const newErrors = {
      amount: '',
      description: '',
      category: '',
    };
    
    if (!values.amount) {
      newErrors.amount = 'Amount is required';
    }
    
    if (!values.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!values.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some((error) => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const transaction = {
      amount: parseFloat(values.amount.toString()),
      description: values.description,
      category: values.category,
      date: values.date,
      type: values.type,
    };
    
    if (editMode && transactionId) {
      updateTransaction(transactionId, transaction);
    } else {
      addTransaction(transaction);
    }
    
    onSuccess?.();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Transaction Type */}
      <div className="form-group">
        <label className="form-label">Transaction Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={values.type === 'expense'}
              onChange={() => setValues({ ...values, type: 'expense' })}
              className="mr-2 h-4 w-4 text-primary-500 focus:ring-primary-500"
            />
            <span>Expense</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="income"
              checked={values.type === 'income'}
              onChange={() => setValues({ ...values, type: 'income' })}
              className="mr-2 h-4 w-4 text-primary-500 focus:ring-primary-500"
            />
            <span>Income</span>
          </label>
        </div>
      </div>
      
      {/* Amount */}
      <div className="form-group">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500">$</span>
          </div>
          <input
            type="text"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            className={`pl-8 ${errors.amount ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
            placeholder="0.00"
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-error-500">{errors.amount}</p>}
      </div>
      
      {/* Description */}
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          className={errors.description ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
          placeholder="What's this transaction for?"
        />
        {errors.description && <p className="mt-1 text-sm text-error-500">{errors.description}</p>}
      </div>
      
      {/* Category */}
      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          className={errors.category ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
        >
          <option value="">Select a category</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-error-500">{errors.category}</p>}
      </div>
      
      {/* Date */}
      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
        />
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
        
        <button type="submit" className="btn-primary">
          {editMode ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;