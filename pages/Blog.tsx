import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BraceWrap } from '../components/Layout';
import { Terminal } from '../components/Terminal';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
}

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Automation', 'Web Dev', 'Strategy', 'Case Study', 'Education'];

  useEffect(() => {
    document.title = "Blog | Noob{Dev} Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Deep dives into business automation, no-code architecture, and the future of work.");
    }
  }, []);

  // Static list of posts - update this array when adding new HTML files to /public/blog/
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Business Automation',
      slug: 'future-of-automation',
      date: '2024-02-25',
      category: 'Automation',
      excerpt: 'How no-code tools and AI are reshaping the landscape of modern business operations.',
      readTime: '5 min read',
      image: 'https://picsum.photos/seed/automation/800/400'
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="page-transition pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-[#FF0000]"></div>
            <span className="font-mono text-xs text-[#FF0000] uppercase tracking-widest">The Terminal Blog</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <BraceWrap>Insights</BraceWrap> & Updates
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
            Deep dives into business automation, no-code architecture, and the future of work.
          </p>
        </div>

        {featuredPost && (
          <div className="mb-24">
            <div className="group relative">
              <div className="absolute -inset-1 bg-[#FF0000] opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white border border-gray-100 flex flex-col lg:flex-row items-stretch overflow-hidden rounded-lg">
                <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={`${featuredPost.title} featured post`} 
                    width="600"
                    height="400"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-[#FF0000] text-white px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">Featured</span>
                    <span className="text-gray-500 text-xs font-mono">{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-[#FF0000] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link to={`/blog/${featuredPost.slug}`} className="text-sm font-bold border-b-2 border-[#FF0000] pb-1 hover:text-[#FF0000] transition-colors">
                      Read the Full Article →
                    </Link>
                    <span className="text-gray-500 text-xs font-mono tracking-tighter">[{featuredPost.readTime}]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-16 pb-6 border-b border-gray-100">
          <span className="text-xs font-mono text-gray-500 uppercase mr-4">Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-mono px-4 py-2 transition-all rounded-lg ${
                activeCategory === cat 
                ? 'bg-black text-white' 
                : 'text-gray-500 hover:text-black hover:bg-gray-100'
              }`}
            >
              {activeCategory === cat ? `{${cat}}` : cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {regularPosts.map((post, idx) => (
            <article key={post.id} className="flex flex-col group">
              <div className="relative h-60 mb-8 overflow-hidden bg-gray-100 rounded-lg">
                <img 
                  src={post.image} 
                  alt={`${post.title} blog post`} 
                  width="400"
                  height="240"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute bottom-0 left-0 bg-white px-4 py-2 font-mono text-[10px] font-bold text-[#FF0000] border-t border-r border-gray-100 rounded-tr-lg">
                  {post.category.toUpperCase()}
                </div>
              </div>
              
              <div className="flex-1 flex gap-6">
                <div className="flex flex-col text-[10px] font-mono text-gray-500 pt-1 select-none">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                </div>
                
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()} — {post.readTime}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF0000] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="text-xs font-bold font-mono uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                    View Post <span className="ml-2 text-[#FF0000]">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
