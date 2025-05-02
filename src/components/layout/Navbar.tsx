import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, BookOpen, User, LogIn } from 'lucide-react';
import Button from '../ui/Button';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { useUserStore } from '../../store/userStore';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useUserStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'My Shelf', path: '/shelf' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <BookOpen 
            size={32} 
            className="text-primary-600 dark:text-primary-400 mr-2" 
          />
          <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            BookedUp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 relative group",
                location.pathname === link.path 
                  ? "text-primary-600 dark:text-primary-400" 
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {link.name}
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* User actions and theme switcher */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeSwitcher />
          
          {user ? (
            <Link to="/shelf">
              <Button variant="ghost" size="sm" icon={<User size={18} />}>
                Profile
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm" icon={<LogIn size={18} />}>
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-800 dark:text-white"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "p-2 font-medium",
                location.pathname === link.path
                  ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <ThemeSwitcher />
            
            {user ? (
              <Link to="/shelf">
                <Button variant="ghost" size="sm" icon={<User size={18} />}>
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" icon={<LogIn size={18} />}>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;