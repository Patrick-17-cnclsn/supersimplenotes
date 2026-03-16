import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Platform, 
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import useNotesStore from '@/store/store';
import { useAuth } from '@/core/context/AuthContext';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { CATEGORIES } from '@/core/constants/categories';
import { CategoryChip } from '@/components/CategoryChip';

export default function NoteEditScreen() {
  const params = useLocalSearchParams();
  const isEditing = !!params.id;
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { addNote, updateNote, getNote } = useNotesStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Personnel');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && params.id) {
      const note = getNote(params.id as string);
      if (note) {
        setTitle(note.title);
        setDescription(note.description || '');
        setCategory(note.category);
        setIsFavorite(note.isFavorite);
        setIsLoading(false);
      } else {
        // If not in store, maybe we should fetch it, but our store handles it
        setIsLoading(false);
      }
    }
  }, [params.id]);

  const handleSave = async () => {
    if (!title.trim() && !description.trim()) {
      toast.error('La note ne peut pas être vide');
      return;
    }

    if (!user) return;

    setIsSaving(true);
    try {
      const noteData = {
        title: title.trim(),
        description: description.trim(),
        category,
        isFavorite,
        userId: user.uid,
      };

      if (isEditing && params.id) {
        await updateNote(params.id as string, noteData);
        toast.success('Note mise à jour');
      } else {
        await addNote(noteData);
        toast.success('Note créée');
      }
      router.back();
    } catch (error) {
      toast.error('Impossible d\'enregistrer la note');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View 
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <View 
        className="flex-row items-center justify-between px-4 pb-4"
        style={{ paddingTop: Platform.OS === 'ios' ? 20 : insets.top + 10 }}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 rounded-full"
          style={{ backgroundColor: colors.secondary }}
        >
          <Icon name="X" size={20} color={colors.text} />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity 
            onPress={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full"
            style={{ backgroundColor: isFavorite ? colors.highlight : colors.secondary }}
          >
            <Icon name="Pin" size={20} color={isFavorite ? 'white' : colors.text} />
          </TouchableOpacity>
          
          <Button 
            onPress={handleSave}
            disabled={isSaving}
            loading={isSaving}
            rounded="full"
            title="Enregistrer"
            variant="highlight"
            className="px-6"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titre"
          placeholderTextColor={colors.placeholder}
          className="text-3xl font-bold mb-4"
          style={{ color: colors.text }}
          multiline
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Commencez à écrire..."
          placeholderTextColor={colors.placeholder}
          multiline
          className="text-lg"
          style={{ color: colors.text, textAlignVertical: 'top', minHeight: 200 }}
        />
      </ScrollView>

      <View className="p-6" style={{ paddingBottom: insets.bottom + 20 }}>
        <View className="flex-row items-center justify-between mb-4">
          <ThemedText className="text-lg font-bold">Catégorie</ThemedText>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                category={cat}
                isSelected={category === cat}
                onPress={setCategory}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
