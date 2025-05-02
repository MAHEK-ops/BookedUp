import { Book } from '../types';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || '';

export async function searchBooks(query: string, maxResults = 20): Promise<Book[]> {
  try {
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    const data = await response.json();
    
    if (!data.items) {
      return [];
    }
    
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      publishedDate: item.volumeInfo.publishedDate || 'Unknown',
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || [],
      language: item.volumeInfo.language || 'en',
      previewLink: item.volumeInfo.previewLink || '',
      averageRating: item.volumeInfo.averageRating || 0,
      ratingsCount: item.volumeInfo.ratingsCount || 0,
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    
    const item = await response.json();
    
    return {
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      publishedDate: item.volumeInfo.publishedDate || 'Unknown',
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || [],
      language: item.volumeInfo.language || 'en',
      previewLink: item.volumeInfo.previewLink || '',
      averageRating: item.volumeInfo.averageRating || 0,
      ratingsCount: item.volumeInfo.ratingsCount || 0,
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}

export async function getBooksByCategory(category: string, maxResults = 10): Promise<Book[]> {
  return searchBooks(`subject:${category}`, maxResults);
}

export async function getTopBooks(maxResults = 10): Promise<Book[]> {
  try {
    const response = await fetch(
      `${API_URL}?q=subject:fiction&orderBy=relevance&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch top books');
    }
    
    const data = await response.json();
    
    if (!data.items) {
      return [];
    }
    
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      publishedDate: item.volumeInfo.publishedDate || 'Unknown',
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || [],
      language: item.volumeInfo.language || 'en',
      previewLink: item.volumeInfo.previewLink || '',
      averageRating: item.volumeInfo.averageRating || 0,
      ratingsCount: item.volumeInfo.ratingsCount || 0,
    }));
  } catch (error) {
    console.error('Error fetching top books:', error);
    return [];
  }
}