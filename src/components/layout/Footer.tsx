import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <BookOpen size={28} className="text-primary-600 dark:text-primary-400 mr-2" />
              <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                BookedUp
              </span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
              Your cozy virtual book club where you can discover, read, and discuss your favorite books.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links section */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/popular" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Popular Reads
                </Link>
              </li>
              <li>
                <Link to="/new" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/shelf" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  My Shelf
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Help & Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} BookedUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;