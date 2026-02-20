
import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Showcase } from './pages/Showcase';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle hash routing
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'about', 'services', 'showcase', 'blog', 'contact'].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Loading simulation
    const timer = setTimeout(() => setIsLoading(false), 1200);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      clearTimeout(timer);
    };
  }, []);

  const setPage = (page: Page) => {
    window.location.hash = page;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-center items-center justify-center z-[9999]">
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setPage={setPage} />;
      case 'about': return <About />;
      case 'services': return <Services setPage={setPage} />;
      case 'showcase': return <Showcase />;
      case 'blog': return <Blog />;
      case 'contact': return <Contact />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setPage={setPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setPage} />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <ScrollProgress />
      </div>
    </div>
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
