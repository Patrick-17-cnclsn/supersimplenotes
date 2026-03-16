import { CATEGORY_THEME } from '../theme/theme';

export const CATEGORIES: Category[] = ['Personnel', 'Travail', 'Idées', 'Urgent'];

export const CATEGORY_COLORS: Record<Category, string> = CATEGORY_THEME;

export const CATEGORY_ICONS: Record<Category, string> = {
  'Personnel': 'person',
  'Travail': 'briefcase',
  'Idées': 'bulb',
  'Urgent': 'alert-circle',
};

