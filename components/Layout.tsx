
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
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (type: 'privacy' | 'terms' | 'cookies') => {
    const contentMap = {
      privacy: {
        title: 'PRIVACY_POLICY.md',
        content: (
          <div className="space-y-4 text-sm font-mono text-gray-300">
            <p># Privacy Policy</p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <br />
            <p>## 1. Data Collection</p>
            <p>We collect minimal data necessary for operation:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Contact information (email, name) provided voluntarily.</li>
              <li>Usage data for analytics (anonymized).</li>
            </ul>
            <br />
            <p>## 2. Usage</p>
            <p>Data is used solely for:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Service delivery and communication.</li>
              <li>Improving our automation tools.</li>
            </ul>
            <br />
            <p>## 3. Protection</p>
            <p>We employ industry-standard encryption. We do not sell data to third parties.</p>
            <br />
            <p>## 4. Contact</p>
            <p>For privacy concerns: privacy@noobdev.tech</p>
          </div>
        )
      },
      terms: {
        title: 'TERMS_OF_SERVICE.js',
        content: (
          <div className="space-y-4 text-sm font-mono text-gray-300">
            <p>/**</p>
            <p> * Terms of Service</p>
            <p> * @version 1.0.0</p>
            <p> */</p>
            <br />
            <p>const Terms = {"{"}</p>
            <div className="pl-4 border-l border-gray-700">
              <p>acceptance: "By using Noobdev, you agree to these terms.",</p>
              <br />
              <p>services: {"{"}</p>
              <p className="pl-4">description: "No-code automation & web development",</p>
              <p className="pl-4">warranty: "Provided 'as is' without warranty",</p>
              <p>{"},"}</p>
              <br />
              <p>liability: "Limited to amount paid for services",</p>
              <br />
              <p>termination: "We reserve right to terminate service for abuse"</p>
            </div>
            <p>{"};"}</p>
            <br />
            <p>export default Terms;</p>
          </div>
        )
      },
      cookies: {
        title: 'COOKIES_CONFIG.json',
        content: (
          <div className="space-y-4 text-sm font-mono text-gray-300">
            <p>{"{"}</p>
            <div className="pl-4">
              <p>"cookie_policy": {"{"}</p>
              <div className="pl-4">
                <p>"essential": true,</p>
                <p>"analytics": "optional",</p>
                <p>"marketing": false,</p>
                <p>"description": "We use cookies to enhance your experience."</p>
              </div>
              <p>{"},"}</p>
              <br />
              <p>"management": "You can disable cookies in browser settings."</p>
            </div>
            <p>{"}"}</p>
          </div>
        )
      }
    };
    setModalContent(contentMap[type]);
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10 relative">
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
              <a href="https://x.com/noobdevtech" target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="X (Twitter)" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              <a href="https://instagram.com/noobdevtech" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.617 6.76 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.357-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441-.645 1.441-1.44s-.645-1.44-1.441-1.44-1.44.645-1.44 1.44.645 1.44 1.44 1.44z"></path></svg>
              </a>
              <a href="https://wa.me/919717358684" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FF0000] hover:text-[#FF0000] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2025 Noobdev. All rights reserved.</p>
          <div className="flex space-x-6">
            <button onClick={() => openModal('privacy')} className="hover:text-[#FF0000]">Privacy</button>
            <button onClick={() => openModal('terms')} className="hover:text-[#FF0000]">Terms</button>
            <button onClick={() => openModal('cookies')} className="hover:text-[#FF0000]">Cookies</button>
          </div>
          <p>Made with <span className="text-[#FF0000]">{"{❤️}"}</span> by Noobdev</p>
        </div>
      </div>

      {/* Terminal Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setModalContent(null)}></div>
          <div className="relative w-full max-w-2xl bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-800 animate-in fade-in zoom-in duration-200">
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-gray-400 flex items-center">
                  <span className="mr-2">~/legal/</span>
                  <span className="text-white">{modalContent.title}</span>
                </div>
              </div>
              <button 
                onClick={() => setModalContent(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
