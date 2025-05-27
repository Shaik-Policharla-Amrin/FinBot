import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  initAuth: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Initialize auth from localStorage
  initAuth: () => {
    const storedUser = localStorage.getItem('finbot_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
      } catch (error) {
        localStorage.removeItem('finbot_user');
      }
    }
  },
  
  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in a real app this would be an API call
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
        };
        
        localStorage.setItem('finbot_user', JSON.stringify(user));
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ error: 'Invalid email or password', isLoading: false });
      }
    } catch (error) {
      set({ error: 'An error occurred during login', isLoading: false });
    }
  },
  
  // Register
  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      localStorage.setItem('finbot_user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: 'An error occurred during registration', isLoading: false });
    }
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('finbot_user');
    set({ user: null, isAuthenticated: false });
  },
  
  // Update profile
  updateProfile: (userData) => {
    set(state => {
      if (!state.user) return state;
      
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('finbot_user', JSON.stringify(updatedUser));
      
      return { user: updatedUser };
    });
  },
}));