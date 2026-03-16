/**
 * useThemeColors - Hook pour obtenir les couleurs du thème actuel
 * 
 * Pour le BTS SIO SLAM :
 * - Hook personnalisé React qui retourne les couleurs selon le thème
 * - Simplifie l'utilisation des couleurs dans les composants
 * - Inspiré de Noty pour une architecture propre
 */

import { useTheme } from '../context/ThemeContext';
import { THEME } from '../theme/theme';

export const useThemeColors = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? THEME.dark : THEME.light;

  return {
    ...colors,
    isDark,
  };
};

export default useThemeColors;

