import React, { forwardRef } from 'react';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import Icon from './Icon';

interface ActionSheetThemedProps extends ActionSheetProps {
  children?: React.ReactNode;
}

const ActionSheetThemed = forwardRef<ActionSheetRef, ActionSheetThemedProps>(({ containerStyle, children, ...props }, ref) => {
    const colors = useThemeColors();
    const insets = useSafeAreaInsets();
    
    return (
        <ActionSheet
            {...props}
            ref={ref}
            gestureEnabled={true}
            indicatorStyle={{
              backgroundColor: colors.border,
              width: 40,
            }}
            containerStyle={{
                backgroundColor: colors.secondary,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingBottom: insets.bottom || 20,
                ...containerStyle
            }}
        >
            <View style={styles.content}>
                {children}
            </View>
        </ActionSheet>
    );
});

export const ActionSheetItem = ({ title, onPress, icon, color }: { title: string, onPress: () => void, icon: string, color?: string }) => {
    const colors = useThemeColors();
    return (
        <Pressable 
          onPress={onPress} 
          style={({ pressed }) => [
            styles.item,
            { backgroundColor: pressed ? colors.background : 'transparent' }
          ]}
        >
            <Icon name={icon} size={22} color={color || colors.text} />
            <ThemedText style={[styles.itemText, { color: color || colors.text }]}>{title}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default ActionSheetThemed;
