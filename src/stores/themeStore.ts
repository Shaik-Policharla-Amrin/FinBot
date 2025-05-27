import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeType } from '../types';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'finbot-theme',
    }
  )
);