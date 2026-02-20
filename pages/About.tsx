
import React from 'react';
import { BraceWrap } from '../components/Layout';
import { Terminal, CodeSnippet } from '../components/Terminal';

export const About = () => {
  return (
    <div className="page-transition pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">About <BraceWrap>Noobdev</BraceWrap></h1>
          <p className="text-xl text-gray-600 font-mono italic underline decoration-[#FF0000] decoration-2 underline-offset-8">Making automation accessible to everyone</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                We believe powerful automation shouldn't require a Computer Science degree. Founded in 2025, Noobdev was built to democratize high-end business automation for companies of all sizes.
              </p>
              <p>
                The gap between what modern software can do and how businesses actually use it is massive. Most teams are stuck doing repetitive work that an AI could handle in seconds.
              </p>
              <p>
                That's where we come in. We speak both "developer" and "business owner," translating complex API documentation into simple, effective workflows that actually move the needle.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-2 md:p-8 border border-gray-200">
             <Terminal title="about_us.ts">
                <CodeSnippet code={`function ourMission() {
  return {
    goal: "Make automation accessible",
    approach: "No-code solutions",
    impact: "Save businesses time & money",
    founded: 2025,
    team: "Noob{dev} Experts"
  };
}

// Result
console.log(ourMission().goal); 
// "Make automation accessible"`} />
             </Terminal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { title: 'Simplicity', desc: 'Complex technology, simple user experience. We hide the cables so you just see the results.' },
            { title: 'Results', desc: 'We measure success by your ROI. If you aren\'t saving hours every week, we haven\'t done our job.' },
            { title: 'Transparency', desc: 'Clear pricing, clear communication. You\'ll always know exactly what we\'re building and why.' },
          ].map((v, i) => (
            <div key={i} className="bg-white p-10 border border-gray-100 hover:border-[#FF0000] transition-colors">
              <div className="text-2xl font-bold mb-4">
                <BraceWrap>{v.title}</BraceWrap>
              </div>
              <p className="text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#FF0000] text-white p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-bold mb-4">estd 2025</h3>
                <p className="text-white/80 font-mono">The year no-code changed everything.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:gap-16">
                <div className="text-center">
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-xs font-mono uppercase tracking-widest text-white/70">Automations</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10k+</div>
                    <div className="text-xs font-mono uppercase tracking-widest text-white/70">Hours Saved</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
