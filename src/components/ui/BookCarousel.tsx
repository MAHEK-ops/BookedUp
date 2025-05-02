import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookCarouselProps {
  title: string;
  books: Book[];
  onBookClick?: (book: Book) => void;
}

export const BookCarousel: React.FC<BookCarouselProps> = ({
  title,
  books,
  onBookClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === 'left' 
        ? -current.clientWidth / 2 
        : current.clientWidth / 2;
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4 px-4">
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="snap-start w-[200px] flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <BookCard 
                book={book} 
                onClick={() => onBookClick && onBookClick(book)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;