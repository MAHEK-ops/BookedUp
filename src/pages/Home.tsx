import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Search, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedText from '../components/ui/AnimatedText';
import BookCarousel from '../components/ui/BookCarousel';
import { getTopBooks } from '../lib/api';
import { Book as BookType } from '../types';

export const Home: React.FC = () => {
  const [topBooks, setTopBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getTopBooks();
        setTopBooks(books);
      } catch (error) {
        console.error('Error fetching top books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-soft-light pointer-events-none" />
        <div className="absolute left-0 right-0 top-0 h-1/2 bg-gradient-radial from-amber-100/70 to-transparent dark:from-amber-900/20 dark:to-transparent opacity-70 dark:opacity-40 pointer-events-none" />
        
        {/* Decorative lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/50 dark:via-amber-700/30 to-transparent transform -rotate-2" />
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/30 dark:via-amber-600/20 to-transparent transform rotate-1" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/40 dark:via-amber-700/25 to-transparent transform -rotate-1" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Lamp header effect */}
            <div className="relative">
              <motion.div
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-px h-40 bg-gradient-to-b from-amber-200 to-transparent dark:from-amber-500/30"
                animate={{
                  height: ["160px", "200px", "160px"],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-amber-200/20 to-transparent dark:from-amber-500/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Next Great Adventure <br className="hidden md:inline" /> Awaits{' '}
              <span className="text-amber-700 dark:text-amber-400">Between Pages</span>
            </h1>
            
            <div className="mb-8 text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-serif">
              Fall in love with 
              <AnimatedText 
                words={[" reading", " stories", " characters", " worlds"]} 
                className="inline-block h-8 w-28 mx-1 overflow-hidden"
              />
              again
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              BookedUp is your cozy virtual book club, where discovering new reads, 
              sharing insights, and connecting with fellow book lovers happens in one beautiful space.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/explore">
                <Button 
                  size="lg" 
                  icon={<Search size={20} />}
                  className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700"
                >
                  Explore Library
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon={<Book size={20} />}
                  className="border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/20"
                >
                  Join Book Club
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative floating books */}
        <motion.div 
          className="absolute -bottom-16 -left-16 w-32 h-48 rounded-lg bg-white dark:bg-gray-800 shadow-xl transform rotate-12 hidden lg:block"
          animate={{ y: [0, -10, 0], rotate: [12, 8, 12] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-8 -right-16 w-40 h-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl transform -rotate-6 hidden lg:block"
          animate={{ y: [0, -15, 0], rotate: [-6, -10, -6] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        />
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TrendingUp size={32} className="text-amber-600 dark:text-amber-400 mr-3" />
              Top Picks This Week
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/explore">
                <Button variant="ghost" className="text-amber-700 dark:text-amber-400">
                  View All
                </Button>
              </Link>
            </motion.div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-[2/3] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <BookCarousel 
              title="" 
              books={topBooks} 
              onBookClick={(book) => window.location.href = `/book/${book.id}`}
            />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-amber-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Ultimate Reading Experience
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Discover New Worlds",
                description: "Find your next favorite book with personalized recommendations and curated collections.",
                icon: <Search className="text-amber-600 dark:text-amber-400" />
              },
              {
                title: "Immersive Reading",
                description: "Enjoy beautiful page-turning animations, customizable fonts, and ambient sounds based on genre.",
                icon: <Book className="text-amber-600 dark:text-amber-400" />
              },
              {
                title: "Connect & Share",
                description: "Join discussions, create reading lists, and share highlights with a community of book lovers.",
                icon: <TrendingUp className="text-amber-600 dark:text-amber-400" />
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Ready to start your reading journey?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of readers who have found their perfect book match on BookedUp.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/signup">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700">
                  Get Started — It's Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;