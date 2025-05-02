import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, Filter, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import BookCard from '../components/ui/BookCard';
import { Book } from '../types';
import { searchBooks, getBooksByCategory, getTopBooks } from '../lib/api';

export const Explore: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'all',
    'fiction',
    'mystery',
    'science fiction',
    'fantasy',
    'biography',
    'history',
    'business',
    'romance',
    'thriller',
    'self-help'
  ];

  useEffect(() => {
    const fetchInitialBooks = async () => {
      setIsLoading(true);
      try {
        const initialBooks = await getTopBooks(20);
        setBooks(initialBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      setBooks(results);
      setSelectedCategory('all');
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    try {
      if (category === 'all') {
        const topBooks = await getTopBooks(20);
        setBooks(topBooks);
      } else {
        const categoryBooks = await getBooksByCategory(category);
        setBooks(categoryBooks);
      }
    } catch (error) {
      console.error('Error fetching category books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="mr-3 text-primary-600 dark:text-primary-400" size={32} />
            Explore Library
          </motion.h1>
          
          <motion.button
            className="md:hidden flex items-center text-gray-600 dark:text-gray-300"
            onClick={() => setShowFilters(!showFilters)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Filter size={20} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <motion.div 
            className={`md:block ${showFilters ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <div className="md:col-span-3">
            {/* Search bar */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSearch} className="flex w-full">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, or ISBN..."
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-l-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <Button type="submit" className="rounded-l-none">
                  Search
                </Button>
              </form>
            </motion.div>

            {/* Books grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div 
                    key={index} 
                    className="aspect-[2/3] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                {books.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      No books found. Try a different search term or category.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCategory + searchQuery}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                      {books.map((book) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BookCard
                            book={book}
                            onClick={() => {
                              // Navigate to book detail page
                              window.location.href = `/book/${book.id}`;
                            }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;