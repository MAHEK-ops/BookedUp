import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book as BookIcon, Bookmark, Share2, Star, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { Book } from '../types';
import { getBookById } from '../lib/api';
import { useUserStore } from '../store/userStore';

export const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-primary-600 dark:border-primary-400 border-solid rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <BookIcon size={48} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          Book Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find the book you're looking for.
        </p>
        <Button onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.button
          onClick={() => window.history.back()}
          className="flex items-center text-primary-600 dark:text-primary-400 mb-6 hover:underline"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Results
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Book Cover */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 p-2">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-3">
              <Button className="w-full">
                Start Reading
              </Button>
              
              <Button variant="outline" className="w-full" icon={<Bookmark size={18} />}>
                Save to Shelf
              </Button>
              
              <Button variant="ghost" className="w-full" icon={<Share2 size={18} />}>
                Share
              </Button>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              by {book.authors.join(', ')}
            </p>

            {book.averageRating && (
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.round(book.averageRating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {book.averageRating.toFixed(1)} ({book.ratingsCount} ratings)
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Pages</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {book.pageCount || 'Unknown'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Published</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {book.publishedDate || 'Unknown'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Language</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {book.language.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
                About this book
              </h2>
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            </div>

            {book.categories && book.categories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!user && (
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 mt-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Want to save this book to your shelf?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sign in to add books to your shelf, track your reading progress, and more.
                </p>
                <Button variant="primary" size="sm" className="mx-auto">
                  Sign In
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;