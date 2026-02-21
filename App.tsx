
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Showcase } from './pages/Showcase';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading simulation
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
        <div className="flex items-center text-4xl font-bold animate-pulse">
          <span>Noob</span>
          <span className="text-[#FF0000] font-mono mx-1">{"{"}</span>
          <span className="animate-bounce">...</span>
          <span className="text-[#FF0000] font-mono mx-1">{"}"}</span>
          <span>dev</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <ScrollProgress />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      setWidth(percent);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div 
      className="h-full bg-[#FF0000] transition-all duration-150 ease-out" 
      style={{ width: `${width}%` }}
    />
  );
};

export default App;
