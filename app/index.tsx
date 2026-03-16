import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/home/header';
import Note from '@/components/home/note';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import useNotesStore from '@/store/store';
import { useAuth } from '@/core/context/AuthContext';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import QuickEditNoteSheet from '@/components/QuickEditNoteSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import React from 'react';

export default function Home() {
  const { user } = useAuth();
  const { getFilteredNotes, subscribeToNotes, loading } = useNotesStore();
  const [quickEditNote, setQuickEditNote] = useState<Note | null>(null);
  const quickEditSheetRef = React.useRef<ActionSheetRef>(null);
  const colors = useThemeColors();

  const filteredNotes = getFilteredNotes();

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToNotes(user.uid);
      return () => unsubscribe();
    }
  }, [user]);

  const openAddNote = () => {
    router.push('/screens/note-edit');
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.highlight} />
          </View>
        ) : filteredNotes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="List" size={64} color={colors.border} />
            <ThemedText className="text-xl font-semibold mt-4">Aucune note</ThemedText>
            <ThemedText style={{ color: colors.placeholder }} className="mt-2">Appuyez sur + pour créer une note</ThemedText>
          </View>
        ) : (
          <FlatList
            data={filteredNotes}
            renderItem={({ item, index }) => (
              <View style={[styles.gridItem, index % 2 === 0 ? styles.gridItemLeft : styles.gridItemRight]}>
                <Note 
                  item={item} 
                  onQuickEdit={(note) => {
                    setQuickEditNote(note);
                    quickEditSheetRef.current?.show();
                  }}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>

      <QuickEditNoteSheet 
        ref={quickEditSheetRef} 
        note={quickEditNote} 
        onClose={() => setQuickEditNote(null)} 
      />

      {/* Bouton  */}
      <TouchableOpacity
        className="absolute right-6 bottom-10 h-16 w-16 rounded-full items-center justify-center shadow-lg elevation-8"
        style={{ backgroundColor: colors.highlight }}
        onPress={openAddNote}
        activeOpacity={0.8}>
        <Icon name="Plus" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  safeAreaContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
  row: {
    gap: 12,
    marginBottom: 4,
  },
  gridItem: {
    flex: 1,
    maxWidth: '50%',
  },
  gridItemLeft: {
    paddingRight: 6,
  },
  gridItemRight: {
    paddingLeft: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
};
