import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BookMarked, CheckSquare } from 'lucide-react';
import BookCard from '../components/ui/BookCard';
import { useUserStore } from '../store/userStore';

const emptyShelfImage = "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg";

export const BookShelf: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reading' | 'saved' | 'completed'>('reading');
  const { user, bookshelf } = useUserStore();

  // Placeholder content for demo purposes
  const placeholderBooks = {
    reading: [
      {
        id: 'reading-1',
        title: 'The Great Gatsby',
        authors: ['F. Scott Fitzgerald'],
        description: 'A tragic love story set in the Jazz Age',
        thumbnail: 'https://images.pexels.com/photos/3747279/pexels-photo-3747279.jpeg',
        publishedDate: '1925',
        pageCount: 180,
        categories: ['Fiction', 'Classic'],
        language: 'en',
        previewLink: '',
        averageRating: 4.2,
        ratingsCount: 3200,
      },
      {
        id: 'reading-2',
        title: 'To Kill a Mockingbird',
        authors: ['Harper Lee'],
        description: 'The story of racial injustice in the American South',
        thumbnail: 'https://images.pexels.com/photos/3747512/pexels-photo-3747512.jpeg',
        publishedDate: '1960',
        pageCount: 281,
        categories: ['Fiction', 'Classic'],
        language: 'en',
        previewLink: '',
        averageRating: 4.5,
        ratingsCount: 4100,
      }
    ],
    saved: [
      {
        id: 'saved-1',
        title: '1984',
        authors: ['George Orwell'],
        description: 'A dystopian novel set in a totalitarian state',
        thumbnail: 'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg',
        publishedDate: '1949',
        pageCount: 328,
        categories: ['Fiction', 'Dystopian'],
        language: 'en',
        previewLink: '',
        averageRating: 4.3,
        ratingsCount: 3800,
      },
      {
        id: 'saved-2',
        title: 'Pride and Prejudice',
        authors: ['Jane Austen'],
        description: 'A romantic novel about the Bennet family',
        thumbnail: 'https://images.pexels.com/photos/3747446/pexels-photo-3747446.jpeg',
        publishedDate: '1813',
        pageCount: 279,
        categories: ['Fiction', 'Classic', 'Romance'],
        language: 'en',
        previewLink: '',
        averageRating: 4.4,
        ratingsCount: 3500,
      }
    ],
    completed: [
      {
        id: 'completed-1',
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien'],
        description: 'A fantasy novel about Bilbo Baggins',
        thumbnail: 'https://images.pexels.com/photos/3747482/pexels-photo-3747482.jpeg',
        publishedDate: '1937',
        pageCount: 310,
        categories: ['Fiction', 'Fantasy'],
        language: 'en',
        previewLink: '',
        averageRating: 4.6,
        ratingsCount: 4200,
      }
    ]
  };

  // For demo purposes, use the placeholders
  const booksToShow = placeholderBooks[activeTab] || [];
  
  const tabs = [
    { id: 'reading', label: 'Currently Reading', icon: <BookOpen size={18} /> },
    { id: 'saved', label: 'Want to Read', icon: <BookMarked size={18} /> },
    { id: 'completed', label: 'Completed', icon: <CheckSquare size={18} /> }
  ];

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Sign in to view your bookshelf
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Keep track of books you're reading, want to read, and have completed.
          </p>
          <a
            href="/login"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-primary-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            My Bookshelf
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your reading journey and manage your personal library
          </p>
        </header>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Book grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {booksToShow.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {booksToShow.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => {
                      window.location.href = `/book/${book.id}`;
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <img
                  src={emptyShelfImage}
                  alt="Empty bookshelf"
                  className="w-64 h-64 object-cover rounded-lg mx-auto mb-8 opacity-60"
                />
                <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
                  {activeTab === 'reading'
                    ? "You're not reading any books yet"
                    : activeTab === 'saved'
                    ? "No books saved for later"
                    : "You haven't completed any books yet"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                  {activeTab === 'reading'
                    ? "Explore our library and start your reading journey today."
                    : activeTab === 'saved'
                    ? "Save books you're interested in reading later."
                    : "Complete books to build your reading history."}
                </p>
                <a
                  href="/explore"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-primary-700 transition-colors"
                >
                  Explore Books
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookShelf;