import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Settings, 
  Volume2, 
  VolumeX, 
  X,
  Moon
} from 'lucide-react';
import Button from '../components/ui/Button';
import { getBookById } from '../lib/api';
import { Book } from '../types';
import { cn } from '../utils/cn';

export const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const bookRef = useRef<HTMLDivElement>(null);
  const totalPages = 10; // This would normally be calculated based on content

  // Font options
  const fontOptions = [
    { name: 'Serif', value: "'Playfair Display', Georgia, serif" },
    { name: 'Sans Serif', value: "'Inter', system-ui, sans-serif" },
    { name: 'Monospace', value: "'Courier New', monospace" }
  ];
  
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);

  // Background color options
  const bgOptions = [
    { name: 'White', value: 'bg-white text-gray-900' },
    { name: 'Sepia', value: 'bg-amber-50 text-amber-900' },
    { name: 'Dark', value: 'bg-gray-900 text-white' }
  ];

  const [selectedBg, setSelectedBg] = useState(bgOptions[0].value);

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

  const handleNextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  // Temporary dummy text for the demo
  const dummyText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, 
    nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Nullam auctor, nisl nec ultricies ultricies,
    nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.

    Suspendisse potenti. Donec euismod, nisl eget ultricies ultricies, nisl nisl aliquam nunc, vitae aliquam
    nisl nunc vitae nisl. Nullam auctor, nisl nec ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam
    nisl nunc vitae nisl.

    Fusce varius, nisl eget ultricies ultricies, nisl nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.
    Nullam auctor, nisl nec ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.
  `.repeat(3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-primary-600 dark:border-primary-400 border-solid rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col",
        selectedBg
      )}
      onClick={toggleControls}
    >
      {/* Controls overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`${showControls ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="container mx-auto flex justify-between items-center">
            <button 
              onClick={() => window.history.back()}
              className="text-white hover:text-gray-200 flex items-center"
            >
              <ArrowLeft size={24} className="mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setAudioPlaying(!audioPlaying);
                }}
                className="text-white hover:text-gray-200"
                aria-label={audioPlaying ? "Mute ambient sound" : "Play ambient sound"}
              >
                {audioPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings(!showSettings);
                }}
                className="text-white hover:text-gray-200"
                aria-label="Reading settings"
              >
                <Settings size={24} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="container mx-auto flex justify-between items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPage();
              }}
              className={`text-white p-3 rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="text-white">
              Page {currentPage} of {totalPages}
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleNextPage();
              }}
              className={`text-white p-3 rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Settings panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: showSettings ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
            Reading Settings
          </h3>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close settings"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Font size */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size
            </h4>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="text-gray-700 dark:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <input
                type="range"
                min="12"
                max="32"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mx-4"
              />
              <button
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                className="text-gray-700 dark:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          {/* Font family */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Style
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setSelectedFont(font.value)}
                  className={`py-2 px-3 rounded-lg text-sm ${
                    selectedFont === font.value
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Background
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {bgOptions.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => setSelectedBg(bg.value)}
                  className={`py-2 px-3 rounded-lg text-sm flex items-center justify-center ${
                    selectedBg === bg.value
                      ? 'ring-2 ring-primary-500'
                      : ''
                  } ${bg.name === 'Dark' ? 'bg-gray-900 text-white' : bg.name === 'Sepia' ? 'bg-amber-50 text-amber-900' : 'bg-white text-gray-900 border border-gray-200'}`}
                >
                  {bg.name === 'Dark' && <Moon size={16} className="mr-1" />}
                  {bg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bookmark */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              className="w-full" 
              icon={<Bookmark size={18} />}
            >
              Add Bookmark
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Book content */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          ref={bookRef}
          className={cn(
            "w-full max-w-2xl mx-auto relative perspective-1000",
            isFlipping ? "animate-flipDown" : ""
          )}
        >
          <div 
            className={cn(
              "bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 md:p-16",
              selectedBg
            )}
            style={{ fontFamily: selectedFont }}
          >
            {book && (
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-serif font-bold mb-2">
                  {book.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {book.authors.join(', ')}
                </p>
              </div>
            )}
            
            <div 
              className="prose max-w-none dark:prose-invert"
              style={{ fontSize: `${fontSize}px` }}
            >
              <p>{dummyText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;