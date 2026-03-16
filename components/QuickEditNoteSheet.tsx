import React, { useState, forwardRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetThemed from './ActionSheetThemed';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import ThemedText from './ThemedText';
import { Button } from './Button';
import useNotesStore from '@/store/store';
import { toast } from 'sonner-native';

interface QuickEditNoteSheetProps {
  note: Note | null;
  onClose: () => void;
}

const QuickEditNoteSheet = forwardRef<ActionSheetRef, QuickEditNoteSheetProps>(({ note, onClose }, ref) => {
  const colors = useThemeColors();
  const { updateNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
    }
  }, [note]);

  const handleSave = async () => {
    if (!note || !title.trim()) return;

    setIsSaving(true);
    try {
      await updateNote(note.id, { title: title.trim() });
      toast.success('Note mise à jour');
      if (typeof ref !== 'function' && ref?.current) {
        ref.current.hide();
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  return (
    <ActionSheetThemed ref={ref} onClose={onClose}>
      <View className="py-2">
        <ThemedText className="text-xl font-bold mb-4">Modifier le titre</ThemedText>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titre de la note"
          placeholderTextColor={colors.placeholder}
          autoFocus
          className="h-16 rounded-2xl px-4 text-xl font-bold mb-5"
          style={{ 
            backgroundColor: colors.secondary, 
            color: colors.text,
          }}
        />
        
        <Button
          title={isSaving ? 'Enregistrement...' : 'Enregistrer'}
          onPress={handleSave}
          disabled={isSaving || !title.trim()}
          loading={isSaving}
          rounded="full"
          variant="highlight"
          size="medium"
        />
      </View>
    </ActionSheetThemed>
  );
});


export default QuickEditNoteSheet;
