import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../utils/cn';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        "relative rounded-full bg-gray-200 dark:bg-gray-700 p-1 w-12 h-6 transition-colors duration-300",
        className
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        layout
        initial={false}
        animate={{
          x: isDarkMode ? 24 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
        className="w-4 h-4 rounded-full flex items-center justify-center"
      >
        {isDarkMode ? (
          <Moon size={12} className="text-yellow-300" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeSwitcher;