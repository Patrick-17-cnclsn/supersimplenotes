/**
 * Header - Composant d'en-tête avec recherche et filtres
 *
 * Pour le BTS SIO SLAM :
 * - Utilise useThemeColors pour s'adapter au thème clair/sombre
 * - Gestion de la recherche et des filtres par catégorie
 * - Design inspiré de Noty avec catégories compactes
 */

import { Text, View, TextInput, ScrollView } from 'react-native';
import useNotesStore from '@/store/store';
import { CATEGORIES } from '@/core/constants/categories';
import { useAuth } from '@/core/context/AuthContext';
import { router } from 'expo-router';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import { useTheme } from '@/core/context/ThemeContext';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { CategoryChip } from '@/components/CategoryChip';

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useNotesStore();
  const { logout } = useAuth();
  const colors = useThemeColors();
  const { toggleTheme, theme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  return (
    <View className="pt-3 pb-3" style={{ backgroundColor: colors.background }}>
      {/* Header style Noty */}
      <View className="flex-row justify-between items-center mb-4 px-global">
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>
          noty<Text className="text-highlight">.</Text>
        </Text>
        <View className="flex-row gap-2">
          <Icon 
            name={theme === 'dark' ? 'Sun' : 'Moon'} 
            variant="contained" 
            onPress={toggleTheme} 
          />
          <Icon 
            name="LogOut" 
            variant="contained" 
            onPress={handleLogout} 
          />
        </View>
      </View>

      {/* Barre de recherche */}
      <View className="flex-row items-center rounded-2xl px-4 mb-3 mx-global" style={{ backgroundColor: colors.secondary }}>
        <Icon name="Search" size={18} color={colors.placeholder} className="mr-2" />
        <TextInput
          className="flex-1 h-12 text-base"
          style={{ color: colors.text }}
          placeholder="Rechercher..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Icon name="X" size={18} color={colors.placeholder} onPress={() => setSearchQuery('')} />
        )}
      </View>

      {/* Filtres par catégorie (chips style Noty) */}
      <View className="mb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}>
          <CategoryChip 
            category="Tous" 
            isSelected={selectedCategory === 'Tous'} 
            onPress={setSelectedCategory} 
          />
          {CATEGORIES.map((category) => (
            <CategoryChip
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={setSelectedCategory}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Header;