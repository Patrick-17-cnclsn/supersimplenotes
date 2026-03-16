import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { toast } from 'sonner-native';
import useNotesStore from '@/store/store';
import { PINNED_COLOR } from '@/core/theme/theme';
import { useThemeColors } from '@/core/hooks/useThemeColors';
import ActionSheetThemed, { ActionSheetItem } from '@/components/ActionSheetThemed';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';

type NoteProps = {
  item: Note;
  onQuickEdit?: (note: Note) => void;
};

const Note = ({ item, onQuickEdit }: NoteProps) => {
  const { updateNote, deleteNote } = useNotesStore();
  const colors = useThemeColors();
  const actionSheetRef = React.useRef<ActionSheetRef>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const togglePin = async () => {
    const newPinned = !item.isFavorite;
    await updateNote(item.id, { isFavorite: newPinned });
    toast.success(newPinned ? 'Note épinglée' : 'Note désépinglée');
  };

  const handlePress = () => {
    router.push({
      pathname: '/screens/note-detail',
      params: { id: item.id },
    });
  };

  const handleLongPress = () => {
    actionSheetRef.current?.show();
  };

  const handleEdit = () => {
    actionSheetRef.current?.hide();
    router.push({
      pathname: '/screens/note-edit',
      params: { id: item.id },
    });
  };

  const handleDelete = () => {
    actionSheetRef.current?.hide();
    Alert.alert(
      'Supprimer la note',
      'Voulez-vous vraiment supprimer cette note ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive', 
          onPress: async () => {
            await deleteNote(item.id);
            toast.success('Note supprimée');
          } 
        },
      ]
    );
  };

  // Style Noty : fond amber si épinglé, sinon couleur du thème
  const isPinned = item.isFavorite;
  const backgroundColor = isPinned ? (colors.pinned || PINNED_COLOR) : colors.secondary;
  
  // Pour les notes épinglées (fond jaune), on force un texte sombre pour la lisibilité
  const textColor = isPinned ? '#000000' : colors.text;

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={200}
        activeOpacity={0.8}
        style={[styles.container, { backgroundColor }]}>
        <View style={styles.content}>
          {/* Badge catégorie + Pin */}
          <View style={styles.header}>
            {item.category && (
              <View style={styles.categoryBadge}>
                <ThemedText style={[styles.categoryText, { color: textColor }]}>
                  {item.category}
                </ThemedText>
              </View>
            )}
          </View>
  
          {/* Titre */}
          {item.title && (
            <ThemedText style={[styles.title, { color: textColor }]} numberOfLines={2}>
              {item.title}
            </ThemedText>
          )}
  
          {/* Description */}
          {item.description && (
            <ThemedText style={[styles.description, { color: textColor }]} numberOfLines={2}>
              {item.description}
            </ThemedText>
          )}
  
          {/* Footer : Date + Pin */}
          <View style={styles.footer}>
            {item.updatedAt && (
              <ThemedText style={[styles.date, { color: textColor }]}>
                {formatDate(item.updatedAt)}
              </ThemedText>
            )}
            {isPinned && (
              <View style={[styles.pinIcon, { backgroundColor: 'rgba(0, 0, 0, 0.05)' }]}>
                <Icon name="Pin" size={14} color={textColor} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <ActionSheetThemed ref={actionSheetRef}>
        <View style={{ paddingBottom: 10 }}>
          <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{item.title || 'Note sans titre'}</ThemedText>
          <ThemedText style={{ fontSize: 14, opacity: 0.6, marginBottom: 20 }}>{formatDate(item.updatedAt || Date.now())}</ThemedText>
          
          <ActionSheetItem 
            title={isPinned ? "Désépingler" : "Épingler"} 
            icon="Pin" 
            onPress={() => {
              togglePin();
              actionSheetRef.current?.hide();
            }}
            color={isPinned ? colors.highlight : undefined}
          />
          <ActionSheetItem 
            title="Modifier" 
            icon="Edit" 
            onPress={handleEdit} 
          />
          <ActionSheetItem 
            title="Modification rapide" 
            icon="Pencil" 
            onPress={() => {
              actionSheetRef.current?.hide();
              onQuickEdit?.(item);
            }} 
          />
          <ActionSheetItem 
            title="Supprimer" 
            icon="Trash" 
            onPress={handleDelete} 
            color="#FF3B30"
          />
        </View>
      </ActionSheetThemed>
    </>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    padding: 16,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    flexShrink: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 4,
    flexShrink: 1,
  },
  description: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 8,
    flexShrink: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  date: {
    fontSize: 12,
    opacity: 0.6,
  },
  pinIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    padding: 6,
  },
});
