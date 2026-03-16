import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { THEME } from './theme';

export const useThemeConfig = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const themeConfig: Theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: THEME[theme].highlight,
      background: THEME[theme].background,
      card: THEME[theme].secondary,
      text: THEME[theme].text,
      border: THEME[theme].border,
      notification: THEME[theme].highlight,
    },
  };

  return themeConfig;
};