import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import { CATEGORY_COLORS } from '@/core/constants/categories';

interface CategoryChipProps {
  category: string;
  isSelected: boolean;
  onPress: (category: any) => void;
  className?: string;
}

export const CategoryChip = ({ 
  category, 
  isSelected, 
  onPress,
  className = ''
}: CategoryChipProps) => {
  const colors = useThemeColors();
  const categoryColor = category !== 'Tous' ? CATEGORY_COLORS[category as Category] : null;

  return (
    <TouchableOpacity
      onPress={() => onPress(category)}
      className={`px-4 py-2 rounded-full border ${className}`}
      style={{ 
        backgroundColor: isSelected ? (categoryColor || colors.highlight) : colors.secondary,
        borderColor: isSelected ? (categoryColor || colors.highlight) : colors.border
      }}
    >
      <ThemedText
        className="text-xs font-bold"
        style={{ color: isSelected ? 'white' : colors.text }}
      >
        {category}
      </ThemedText>
    </TouchableOpacity>
  );
};
