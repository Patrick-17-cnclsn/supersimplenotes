// Système de thème inspiré de Noty - Version ultra-simple pour BTS
export const THEME = {
  light: {
    primary: '#000000',
    invert: '#ffffff',
    secondary: '#ffffff',
    background: '#F6F6F6',
    darker: '#F4F4F5',
    text: '#000000',
    textSecondary: 'rgba(0,0,0,0.5)',
    highlight: '#00A6F4',
    border: 'rgba(0, 0, 0, 0.15)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    inputBg: '#F6F6F6',
    placeholder: 'rgba(0,0,0,0.4)',
    pinned: '#FCD34D',
  },
  dark: {
    primary: '#ffffff',
    invert: '#000000',
    secondary: '#313031',
    background: '#141414',
    darker: '#000000',
    text: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.5)',
    highlight: '#00A6F4',
    border: 'rgba(255, 255, 255, 0.15)',
    shadow: 'rgba(0, 0, 0, 0.5)',
    inputBg: '#262626',
    placeholder: 'rgba(255,255,255,0.4)',
    pinned: '#FCD34D',
  },
};

// Couleurs pour les catégories (style Noty)
export const CATEGORY_THEME = {
  Personnel: '#00A6F4',  // Bleu
  Travail: '#10B981',    // Vert
  Idées: '#F59E0B',      // Orange
  Urgent: '#EF4444',     // Rouge
};

// Couleur pour les notes épinglées (style Noty)
export const PINNED_COLOR = '#FCD34D'; // Amber-300

