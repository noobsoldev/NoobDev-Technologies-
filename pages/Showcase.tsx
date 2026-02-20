
import React, { useState } from 'react';
import { BraceWrap } from '../components/Layout';
import { PROJECTS } from '../constants';

export const Showcase = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Automation', 'Web Dev', 'SEO', 'CRM'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="page-transition pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6"><BraceWrap>Our Work</BraceWrap></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real results for real businesses. Browse our portfolio of automated success stories.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-mono text-sm border-b-2 transition-all ${
                filter === cat ? 'border-[#FF0000] text-[#FF0000] font-bold' : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {filter === cat ? `{${cat}}` : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-mono font-bold text-[#FF0000] border border-[#FF0000]">
                  {project.category.toUpperCase()}
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">{project.industry}</div>
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <div className="bg-gray-50 p-4 border-l-4 border-[#FF0000] mb-6">
                    <div className="text-xs font-mono text-gray-500 mb-1">KEY METRIC</div>
                    <div className="text-lg font-bold text-black">{project.metric}</div>
                </div>
                <button className="text-sm font-bold hover:text-[#FF0000] transition-colors flex items-center">
                    View Details <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
