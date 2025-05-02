export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  publishedDate: string;
  pageCount: number;
  categories: string[];
  language: string;
  previewLink: string;
  averageRating?: number;
  ratingsCount?: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface BookShelf {
  reading: Book[];
  saved: Book[];
  completed: Book[];
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastRead: Date;
  bookmarks: number[];
  highlights: Highlight[];
}

export interface Highlight {
  id: string;
  text: string;
  pageNumber: number;
  color: string;
  note?: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  rating: number;
  text: string;
  createdAt: Date;
}