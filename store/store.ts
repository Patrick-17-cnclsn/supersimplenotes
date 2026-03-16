import { create } from 'zustand';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/core/config/firebase';

interface NotesListStoreInterface {
  notes: Note[];
  loading: boolean;
  searchQuery: string;
  selectedCategory: Category | 'Tous';
  sortBy: 'date' | 'title';
  showFavoritesOnly: boolean;
  setNotes: (notes: Note[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | 'Tous') => void;
  setSortBy: (sortBy: 'date' | 'title') => void;
  setShowFavoritesOnly: (show: boolean) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNote: (id: string) => Note | undefined;
  getFilteredNotes: () => Note[];
  subscribeToNotes: (userId: string) => () => void;
}

const useNotesStore = create<NotesListStoreInterface>((set, get) => ({
  notes: [],
  loading: false,
  searchQuery: '',
  selectedCategory: 'Tous',
  sortBy: 'date',
  showFavoritesOnly: false,

  setNotes: (notes) => set({ notes }),
  setLoading: (loading) => set({ loading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setShowFavoritesOnly: (showFavoritesOnly) => set({ showFavoritesOnly }),

  addNote: async (noteData) => {
    try {
      const now = Date.now();
      const newNote = {
        ...noteData,
        createdAt: now,
        updatedAt: now,
      };
      await addDoc(collection(db, 'notes'), newNote);
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, {
        ...noteData,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  getNote: (id) => {
    const { notes } = get();
    return notes.find((n) => n.id === id);
  },

  getFilteredNotes: () => {
    const { notes, searchQuery, selectedCategory, sortBy, showFavoritesOnly } = get();

    let filtered = [...notes];

    // Filtre par favoris
    if (showFavoritesOnly) {
      filtered = filtered.filter((note) => note.isFavorite);
    }

    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter((note) => note.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.description?.toLowerCase().includes(query)
      );
    }

    // Tri
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return b.updatedAt - a.updatedAt;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  },

  subscribeToNotes: (userId: string) => {
    // Requête simple sans orderBy pour éviter de créer un index Firebase
    // Le tri est fait côté client dans getFilteredNotes()
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notes: Note[] = [];
        snapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() } as Note);
        });
        set({ notes, loading: false });
      },
      (error) => {
        console.error('Error fetching notes:', error);
        set({ loading: false });
      }
    );

    return unsubscribe;
  },
}));

export default useNotesStore;