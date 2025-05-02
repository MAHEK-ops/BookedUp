import { create } from 'zustand';
import { User, BookShelf, ReadingProgress } from '../types';

interface UserState {
  user: User | null;
  isLoading: boolean;
  bookshelf: BookShelf;
  readingProgress: ReadingProgress[];
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  addToBookshelf: (bookId: string, shelf: keyof BookShelf) => void;
  removeFromBookshelf: (bookId: string, shelf: keyof BookShelf) => void;
  updateReadingProgress: (progress: ReadingProgress) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  bookshelf: {
    reading: [],
    saved: [],
    completed: [],
  },
  readingProgress: [],
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  addToBookshelf: (bookId, shelf) => 
    set((state) => {
      // This is a placeholder. In a real app, you'd fetch the book details
      // and add the complete book object to the shelf
      return state;
    }),
  removeFromBookshelf: (bookId, shelf) => 
    set((state) => {
      const updatedShelf = { ...state.bookshelf };
      updatedShelf[shelf] = updatedShelf[shelf].filter(book => book.id !== bookId);
      return { bookshelf: updatedShelf };
    }),
  updateReadingProgress: (progress) => 
    set((state) => {
      const existingIndex = state.readingProgress.findIndex(p => p.bookId === progress.bookId);
      const updatedProgress = [...state.readingProgress];
      
      if (existingIndex >= 0) {
        updatedProgress[existingIndex] = progress;
      } else {
        updatedProgress.push(progress);
      }
      
      return { readingProgress: updatedProgress };
    }),
}));