import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import BookDetail from './pages/BookDetail';
import Reader from './pages/Reader';
import BookShelf from './pages/BookShelf';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 flex flex-col">
        <Routes>
          {/* Exclude navbar from reader page */}
          <Route path="/read/:id" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/read/:id" element={<Reader />} />
            <Route path="/shelf" element={<BookShelf />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        
        <Routes>
          {/* Exclude footer from reader page */}
          <Route path="/read/:id" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;