import 'react-native-get-random-values';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import '../global.css';

import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Toaster } from 'sonner-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SheetProvider } from 'react-native-actions-sheet';

import { useThemeConfig } from '@/core/theme/use-theme-config';
import { AuthProvider, useAuth } from '@/core/context/AuthContext';
import { ThemeProvider } from '@/core/context/ThemeContext';
import { useThemeColors } from '@/core/hooks/useThemeColors';

/**
 * MainLayout - Gère l'affichage principal sous les contextes.
 * C'est ici que l'on peut utiliser les hooks de thème en toute sécurité.
 */
const MainLayout = ({ children }: { children: ReactNode }) => {
  const colors = useThemeColors();
  const theme = useThemeConfig();

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationThemeProvider value={theme}>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </NavigationThemeProvider>
    </GestureHandlerRootView>
  );
};

/**
 * RootLayoutNav - Gère la navigation et les redirections d'authentification.
 */
function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colors = useThemeColors();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/note-edit" options={{ presentation: 'modal' }} />
      <Stack.Screen name="screens/note-detail" options={{ presentation: 'modal' }} />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
    </Stack>
  );
}

/**
 * App - Point d'entrée avec tous les Providers ordonnés proprement.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <SheetProvider>
            <MainLayout>
              <RootLayoutNav />
            </MainLayout>
          </SheetProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
