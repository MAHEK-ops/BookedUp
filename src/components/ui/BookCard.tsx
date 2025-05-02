import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BookCardProps {
  book: Book;
  className?: string;
  onClick?: () => void;
  showRating?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  className,
  onClick,
  showRating = true,
}) => {
  return (
    <motion.div
      className={cn(
        "relative group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform perspective-1000",
        className
      )}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 10
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-bold line-clamp-2">{book.title}</h3>
            <p className="text-sm opacity-80">{book.authors.join(', ')}</p>
            
            {showRating && book.averageRating && (
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        "mr-1",
                        i < Math.round(book.averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      )}
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm">
                  ({book.ratingsCount || 0})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{book.authors.join(', ')}</p>
        
        {book.categories && book.categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {book.categories.slice(0, 2).map((category, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;