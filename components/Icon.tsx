import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import { View, Pressable, ViewStyle } from 'react-native';

export type IconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: ViewStyle;
  variant?: 'plain' | 'bordered' | 'contained';
  onPress?: () => void;
  disabled?: boolean;
}

// Map Lucide names to Ionicons names for easier porting from Noty
const iconMap: Record<string, IconName> = {
  'Edit': 'pencil',
  'Pencil': 'pencil',
  'Trash': 'trash-outline',
  'Share': 'share-social-outline',
  'Pin': 'pin',
  'Eye': 'eye-outline',
  'Plus': 'add',
  'X': 'close',
  'Close': 'close',
  'ChevronRight': 'chevron-forward',
  'Tag': 'pricetag-outline',
  'Search': 'search-outline',
  'Bell': 'notifications-outline',
  'LayoutGrid': 'grid-outline',
  'List': 'list-outline',
  'Image': 'image-outline',
  'LogOut': 'log-out-outline',
  'Sun': 'sunny-outline',
  'Moon': 'moon-outline',
};

const Icon = ({ 
  name, 
  size = 20, 
  color, 
  style, 
  className = '', 
  variant = 'plain',
  onPress,
  disabled = false,
  ...props 
}: IconProps) => {
  const colors = useThemeColors();
  const iconName = iconMap[name] || (name as IconName);

  const getVariantClass = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-border rounded-full items-center justify-center p-2';
      case 'contained':
        return 'bg-secondary rounded-full items-center justify-center p-2';
      default:
        return '';
    }
  };

  const classes = `${getVariantClass()} ${className}`.trim();

  const content = (
    <View style={style} className={classes}>
      <Ionicons
        name={iconName}
        size={size}
        color={color || colors.text}
        {...props}
      />
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

export default Icon;
