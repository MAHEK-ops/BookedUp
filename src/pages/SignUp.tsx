import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignUpForm from '../components/auth/SignUpForm';

export const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-soft-light pointer-events-none" />
      
      <div className="container max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image section */}
            <motion.div 
              className="hidden md:block bg-amber-600 dark:bg-amber-700 text-white relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg" 
                  alt="Cozy reading corner" 
                  className="w-full h-full object-cover opacity-50 transition-transform duration-15000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700/90 to-amber-900/90" />
              </div>
              
              <div className="relative p-12 flex flex-col h-full justify-between">
                <div>
                  <Link to="/" className="text-white text-2xl font-serif font-bold">
                    BookedUp
                  </Link>
                  
                  <h2 className="mt-16 text-3xl font-serif font-bold">
                    Join our reading community
                  </h2>
                  
                  <p className="mt-4 text-amber-100">
                    Create your account to start your reading journey, track your progress, and connect with fellow book lovers.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <p className="italic text-amber-200">
                    "There is no friend as loyal as a book."
                  </p>
                  <p className="mt-2 text-amber-300">
                    - Ernest Hemingway
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Form section */}
            <div className="p-6 sm:p-12 md:py-16">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;