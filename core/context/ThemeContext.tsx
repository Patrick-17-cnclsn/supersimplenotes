/**
 * ThemeContext - Gestion du thème clair/sombre
 *
 * Pour le BTS SIO SLAM :
 * - Context API React pour partager l'état du thème dans toute l'app
 * - Toggle entre 'light' et 'dark'
 * - Utilise le thème système par défaut
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { colorScheme } from 'nativewind';
import { themes } from '../theme/color-theme';
import { StatusBar } from 'expo-status-bar';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>(systemTheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    if (systemTheme) {
      setThemeState(systemTheme);
      colorScheme.set(systemTheme);
    }
  }, [systemTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    colorScheme.set(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <View style={themes[theme]} className="flex-1 bg-background">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider');
  }
  return context;
};

