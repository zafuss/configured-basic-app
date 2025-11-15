import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  loadThemeMode: () => Promise<void>;
}

const THEME_STORAGE_KEY = '@app_theme_mode';

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeMode: 'system',

  setThemeMode: async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      set({ themeMode: mode });
    } catch (error) {
      console.error('Error setting theme mode:', error);
    }
  },
  loadThemeMode: async () => {
    try {
      const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (
        storedMode &&
        (storedMode === 'light' ||
          storedMode === 'dark' ||
          storedMode === 'system')
      ) {
        set({ themeMode: storedMode });
      }
    } catch (error) {
      console.error('Error loading theme mode:', error);
    }
  },
}));
