
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center font-bold tracking-tight select-none ${className}`}>
    <span className="text-black">Noob</span>
    <span className="text-[#FF0000] font-mono mx-0.5">{"{"}</span>
    <span className="text-black">dev</span>
    <span className="text-[#FF0000] font-mono mx-0.5">{"}"}</span>
  </div>
);

// Fix: Make children optional to resolve "Property 'children' is missing in type '{}' but required" errors in JSX
export const BraceWrap = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={className}>
    <span className="text-[#FF0000] font-mono">{"{"}</span>
    {children}
    <span className="text-[#FF0000] font-mono">{"}"}</span>
  </span>
);

export const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Services', value: 'services' },
    { label: 'Showcase', value: 'showcase' },
    { label: 'Blog', value: 'blog' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => setPage('home')} className="cursor-pointer">
          <Logo className="text-2xl" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setPage(link.value)}
              className={`text-sm font-medium transition-colors hover:text-[#FF0000] ${
                currentPage === link.value ? 'text-[#FF0000] border-b-2 border-[#FF0000]' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setPage('contact')}
            className="bg-[#FF0000] text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-black transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => { setPage(link.value); setIsMenuOpen(false); }}
              className={`text-left text-lg font-bold ${currentPage === link.value ? 'text-[#FF0000]' : 'text-gray-900'}`}
            >
              {currentPage === link.value ? `{${link.label}}` : link.label}
            </button>
          ))}
          <button 
            onClick={() => { setPage('contact'); setIsMenuOpen(false); }}
            className="bg-[#FF0000] text-white py-4 font-bold"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div>
            <Logo className="text-xl mb-4" />
            <p className="text-sm font-bold text-black mb-1">NO-CODE AUTOMATION STUDIO</p>
            <p className="text-xs text-gray-500 font-mono mb-4">estd 2025</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Democratizing automation for businesses worldwide. Built by developers, designed for everyone.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-6 font-mono text-sm underline decoration-[#FF0000]">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Showcase', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <button onClick={() => setPage(item.toLowerCase() as Page)} className="text-gray-600 hover:text-[#FF0000] text-sm transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-6 font-mono text-sm underline decoration-[#FF0000]">Services</h3>
            <ul className="space-y-3">
              {['AI Automation', 'Web Development', 'SEO Services', 'CRM Solutions'].map((item) => (
                <li key={item}>
                  <button onClick={() => setPage('services')} className="text-gray-600 hover:text-[#FF0000] text-sm transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-6 font-mono text-sm underline decoration-[#FF0000]">Connect</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4 font-mono leading-none">Subscribe to weekly tips:</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  aria-label="Email address for newsletter"
                  className="bg-gray-50 border border-gray-200 px-4 py-2 text-sm w-full focus:outline-none focus:border-[#FF0000]" 
                />
                <button aria-label="Subscribe" className="bg-[#FF0000] text-white px-4 py-2 hover:bg-black transition-colors">
                  →
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <button title="X (Twitter)" aria-label="X (Twitter)" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </button>
              <button title="Instagram" aria-label="Instagram" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.617 6.76 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.357-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441-.645 1.441-1.44s-.645-1.44-1.441-1.44-1.44.645-1.44 1.44.645 1.44 1.44 1.44z"></path></svg>
              </button>
              <button title="YouTube" aria-label="YouTube" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2025 Noobdev. All rights reserved.</p>
          <div className="flex space-x-6">
            <button className="hover:text-[#FF0000]">Privacy</button>
            <button className="hover:text-[#FF0000]">Terms</button>
            <button className="hover:text-[#FF0000]">Cookies</button>
          </div>
          <p>Made with <span className="text-[#FF0000]">{"{❤️}"}</span> by Noobdev</p>
        </div>
      </div>
    </footer>
  );
};
