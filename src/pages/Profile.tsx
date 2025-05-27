import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { User, Mail, Save, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      updateProfile({
        name: formData.name,
      });
      
      setSuccessMessage('Profile updated successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
          Personal Information
        </h2>
        
        {successMessage && (
          <div className="mb-4 rounded-md bg-success-50 p-3 text-sm text-success-600 dark:bg-success-900/20 dark:text-success-400">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                placeholder="Your full name"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                placeholder="Your email address"
                disabled
              />
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your email address is used for login and cannot be changed.
            </p>
          </div>
          
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
      
      <div className="mt-6 card">
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
          Account Security
        </h2>
        
        <div className="form-group">
          <label htmlFor="current-password" className="form-label">
            Change Password
          </label>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Password changes are not available in the demo version.
          </p>
          
          <button className="btn-secondary" disabled>
            Change Password
          </button>
        </div>
      </div>
      
      <div className="mt-6 card">
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
          Data & Privacy
        </h2>
        
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Your data is stored locally in this demo application. In a production app,
          you would have options to download or delete your data.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary">
            Download My Data
          </button>
          
          <button className="btn-danger">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;