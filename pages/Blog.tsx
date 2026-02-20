
import React, { useState } from 'react';
import { BraceWrap } from '../components/Layout';
import { BLOG_POSTS } from '../constants';
import { Terminal, CodeSnippet } from '../components/Terminal';

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Automation', 'Web Dev', 'Strategy', 'Case Study', 'Education'];

  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

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
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Deep dives into business automation, no-code architecture, and the future of work.
          </p>
        </div>

        {/* Featured Post - Large Terminal Style */}
        <div className="mb-24">
          <div className="group relative">
            <div className="absolute -inset-1 bg-[#FF0000] opacity-5 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative bg-white border border-gray-100 flex flex-col lg:flex-row items-stretch overflow-hidden">
              <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-[#FF0000] text-white px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">Featured</span>
                  <span className="text-gray-400 text-xs font-mono">{featuredPost.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-[#FF0000] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-sm font-bold border-b-2 border-[#FF0000] pb-1 hover:text-[#FF0000] transition-colors">
                    Read the Full Article →
                  </button>
                  <span className="text-gray-400 text-xs font-mono tracking-tighter">[{featuredPost.readTime}]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-16 pb-6 border-b border-gray-100">
          <span className="text-xs font-mono text-gray-400 uppercase mr-4">Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-mono px-4 py-2 transition-all ${
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
          {/* Mapping regular posts */}
          {BLOG_POSTS.map((post, idx) => (
            <article key={post.id} className="flex flex-col group">
              <div className="relative h-60 mb-8 overflow-hidden bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute bottom-0 left-0 bg-white px-4 py-2 font-mono text-[10px] font-bold text-[#FF0000] border-t border-r border-gray-100">
                  {post.category.toUpperCase()}
                </div>
              </div>
              
              <div className="flex-1 flex gap-6">
                {/* Visual Line Numbers Gutter */}
                <div className="flex flex-col text-[10px] font-mono text-gray-300 pt-1 select-none">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                </div>
                
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-gray-400 mb-2">{post.date} — {post.readTime}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#FF0000] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <button className="text-xs font-bold font-mono uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                    View Post <span className="ml-2 text-[#FF0000]">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* Newsletter Box as a Grid Item */}
          <div className="lg:col-span-1 bg-black text-white p-8 border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="text-[#FF0000] font-mono text-2xl mb-6">{"{ ! }"}</div>
              <h4 className="text-2xl font-bold mb-4">Never miss an <BraceWrap>Update</BraceWrap></h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Weekly automation blueprints, tool reviews, and no-code patterns. Delivered every Tuesday.
              </p>
            </div>
            <div>
              <input 
                type="email" 
                placeholder="terminal@user.dev" 
                className="w-full bg-[#111] border border-gray-800 px-4 py-3 text-sm font-mono mb-4 focus:outline-none focus:border-[#FF0000] text-white" 
              />
              <button className="w-full bg-[#FF0000] text-white py-3 font-bold text-sm hover:bg-white hover:text-black transition-all font-mono">
                $ subscribe --force
              </button>
            </div>
          </div>
        </div>

        {/* Pagination/Load More */}
        <div className="mt-24 text-center">
          <button className="inline-flex items-center px-10 py-4 border-2 border-gray-900 font-bold hover:bg-black hover:text-white transition-all group">
            Load More Articles 
            <span className="ml-3 group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>
      </div>
    </div>
  );
};
