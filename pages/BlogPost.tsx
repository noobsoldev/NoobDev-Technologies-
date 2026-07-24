import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BraceWrap } from '../components/Layout';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newsletterState, setNewsletterState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    document.title = "Blog Post | Noob{Dev} Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Read the full article on Noobdev's blog.");
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterState('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mgollgzq", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setNewsletterState('success');
        form.reset();
      } else {
        setNewsletterState('idle');
      }
    } catch (error) {
      setNewsletterState('idle');
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/blog/${slug}.html`);
        if (!response.ok) throw new Error('Post not found');
        const html = await response.text();
        
        // Extract content between <body> tags or just the .content div if it exists
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Try to get the .content div first, otherwise get body
        const mainContent = doc.querySelector('.content') || doc.body;
        
        // Remove the back link if it exists in the source HTML as we'll provide our own
        const backLink = mainContent.querySelector('.back-link');
        if (backLink) backLink.remove();

        // Remove the header if it exists in the source HTML
        const header = mainContent.querySelector('.header');
        if (header) header.remove();

        setContent(mainContent.innerHTML);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-mono text-[#FF0000]">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-8">404: Article Not Found</h1>
          <Link to="/blog" className="text-[#FF0000] font-mono font-bold">← Return to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/blog" className="inline-block mb-12 text-xs font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-[#FF0000] transition-colors">
          ← Back to Blog
        </Link>

        <article className="prose prose-lg prose-red max-w-none">
          <div 
            className="blog-content-wrapper"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </article>

        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              <BraceWrap>Subscribe</BraceWrap> to Weekly Automation Tips
            </h2>
            <p className="text-gray-600 mb-8 text-sm">Join 5,000+ forward-thinking business owners getting expert tips every Tuesday.</p>
            
            {newsletterState === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-lg mx-auto">
                <p className="text-lg font-bold text-green-800 mb-1">Thanks for subscribing! 🚀</p>
                <p className="text-green-700 text-sm">Check your inbox for your first tip.</p>
                <button 
                  onClick={() => setNewsletterState('idle')}
                  className="mt-3 text-xs font-bold text-green-800 underline hover:text-green-900"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  aria-label="Email address for newsletter"
                  className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#FF0000] transition-colors rounded-lg" 
                />
                <button 
                  type="submit"
                  disabled={newsletterState === 'submitting'}
                  className="bg-[#FF0000] text-white px-6 py-3 text-sm font-bold hover:bg-black transition-all disabled:bg-gray-400 rounded-lg"
                >
                  {newsletterState === 'submitting' ? 'Joining...' : 'Join Now'}
                </button>
              </form>
            )}
            
            {newsletterState !== 'success' && (
              <p className="mt-4 text-[10px] font-mono text-gray-500">0% Spam. 100% Value. Unsubscribe anytime.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
