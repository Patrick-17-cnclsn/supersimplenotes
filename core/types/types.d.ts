type Category = 'Personnel' | 'Travail' | 'Idées' | 'Urgent';

type Note = {
  id: string;
  title: string;
  description?: string;
  category: Category;
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
  userId: string;
}

type User = {
  uid: string;
  email: string | null;
}
