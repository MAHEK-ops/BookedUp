import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface AnimatedTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  words, 
  className,
  interval = 2000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={cn("relative h-16 w-full overflow-hidden", className)}>
      {words.map((word, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            y: currentIndex === index ? 0 : 40,
          }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.5 },
          }}
        >
          <span className="text-center">{word}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedText;