import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import useNotesStore from '@/store/store';

export default function NoteDetailScreen() {
  const params = useLocalSearchParams();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { getNote, updateNote } = useNotesStore();

  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const data = getNote(params.id as string);
      setNote(data || null);
      setIsLoading(false);
    }
  }, [params.id]);

  const handleEdit = () => {
    router.push({
      pathname: '/screens/note-edit',
      params: { id: params.id },
    });
  };

  const handlePinToggle = async () => {
    if (!note) return;
    const newPinned = !note.isFavorite;
    await updateNote(note.id, { isFavorite: newPinned });
    setNote({ ...note, isFavorite: newPinned });
    toast.success(newPinned ? 'Note épinglée' : 'Note désépinglée');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!note) {
    return (
      <View className="flex-1 bg-background items-center justify-center" style={{ backgroundColor: colors.background }}>
        <Icon name="X" size={48} color={colors.text} />
        <ThemedText className="text-lg mt-4">Note introuvable</ThemedText>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 px-6 py-2 bg-secondary rounded-full">
          <ThemedText>Retour</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View 
        className="flex-row items-center justify-between px-6 pb-4"
        style={{ paddingTop: Platform.OS === 'ios' ? 20 : insets.top + 10 }}
      >
        <Icon 
          name="X" 
          variant="contained" 
          onPress={() => router.back()} 
        />

        <View className="flex-row items-center gap-2">
          <Icon 
            name="Pin" 
            variant="contained" 
            onPress={handlePinToggle}
            color={note.isFavorite ? 'white' : colors.text}
            className={note.isFavorite ? 'bg-highlight' : ''}
          />
          
          <Icon 
            name="Pencil" 
            variant="contained" 
            onPress={handleEdit} 
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-8">
        <View className="flex-row items-center gap-3 mb-6">
          {note.category && (
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: colors.secondary }}>
              <ThemedText className="text-xs font-bold opacity-70">{note.category}</ThemedText>
            </View>
          )}
          <ThemedText className="text-sm opacity-50">{formatDate(note.updatedAt || Date.now())}</ThemedText>
        </View>

        {note.title && (
          <ThemedText className="text-4xl font-bold mb-6">{note.title}</ThemedText>
        )}

        {note.description && (
          <ThemedText className="text-lg leading-relaxed opacity-80">
            {note.description}
          </ThemedText>
        )}
      </ScrollView>
    </View>
  );
}
