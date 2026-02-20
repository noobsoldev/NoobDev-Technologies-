
import React from 'react';
import { Link } from 'react-router-dom';
import { BraceWrap } from '../components/Layout';
import { SERVICES } from '../constants';
import { Terminal, CodeSnippet } from '../components/Terminal';

export const Services = () => {
  return (
    <div className="page-transition pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our <BraceWrap>Expertise</BraceWrap></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">From AI workflows to custom web development, we provide the technical foundation your business needs to scale without the friction of traditional coding.</p>
        </div>

        {/* Services Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {SERVICES.map((s) => (
            <a 
              key={s.id}
              href={`#service-${s.id}`} 
              className="bg-white p-8 border border-gray-100 hover:border-[#FF0000] transition-all group"
            >
              <div className="text-2xl font-mono text-[#FF0000] mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{s.description}</p>
            </a>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-32">
          {SERVICES.map((s, idx) => (
            <section key={s.id} id={`service-${s.id}`} className={`flex flex-col lg:flex-row gap-16 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className="text-sm font-mono text-[#FF0000] mb-4 uppercase tracking-[0.2em]">Service Details</div>
                <h2 className="text-4xl font-bold mb-8">
                  <BraceWrap>{s.title}</BraceWrap>
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {s.detailedDescription || s.description}
                </p>
                
                {s.features && (
                  <div className="mb-8">
                    <h4 className="font-bold mb-4 text-sm font-mono text-gray-400">KEY FEATURES:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center text-gray-600 text-sm">
                          <span className="text-[#FF0000] mr-2 font-mono">{"{"}✔{"}"}</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
                    {s.pricing && (
                        <div>
                            <div className="text-xs font-mono text-gray-400 uppercase mb-1">Starts at</div>
                            <div className="text-2xl font-bold text-black">{s.pricing}</div>
                        </div>
                    )}
                    {s.timeline && (
                        <div>
                            <div className="text-xs font-mono text-gray-400 uppercase mb-1">Timeline</div>
                            <div className="text-2xl font-bold text-black">{s.timeline}</div>
                        </div>
                    )}
                </div>

                <Link 
                  to="/contact"
                  className="mt-10 inline-block bg-black text-white px-8 py-4 font-bold hover:bg-[#FF0000] transition-colors"
                >
                  Start Your {s.title} →
                </Link>
              </div>

              <div className="lg:w-1/2 w-full">
                <Terminal title={`${s.id.replace('-', '_')}.config`}>
                   <CodeSnippet code={`{
  "service": "${s.title}",
  "capabilities": [
    ${(s.features || ['Custom Integration', 'No-code logic', 'API connection']).map(f => `"${f}"`).join(',\n    ')}
  ],
  "status": "Ready to Build"
}`} />
                </Terminal>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
