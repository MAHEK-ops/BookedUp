import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-noise-pattern opacity-[0.03] mix-blend-soft-light pointer-events-none" />
      
      <div className="container max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image section */}
            <motion.div 
              className="hidden md:block bg-primary-600 dark:bg-primary-700 text-white relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg" 
                  alt="Books on shelves" 
                  className="w-full h-full object-cover opacity-50 transition-transform duration-15000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700/90 to-primary-900/90" />
              </div>
              
              <div className="relative p-12 flex flex-col h-full justify-between">
                <div>
                  <Link to="/" className="text-white text-2xl font-serif font-bold">
                    BookedUp
                  </Link>
                  
                  <h2 className="mt-16 text-3xl font-serif font-bold">
                    Welcome back, reader!
                  </h2>
                  
                  <p className="mt-4 text-primary-100">
                    Your personal library awaits with all your books and reading progress saved just as you left them.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <p className="italic text-primary-200">
                    "A reader lives a thousand lives before he dies. The man who never reads lives only one."
                  </p>
                  <p className="mt-2 text-primary-300">
                    - George R.R. Martin
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Form section */}
            <div className="p-6 sm:p-12 md:py-16">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;