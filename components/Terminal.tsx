
import React from 'react';

// Fix: Make children optional to resolve "Property 'children' is missing in type '{}' but required" errors in JSX
export const Terminal = ({ children, title = "automation.js", className = "" }: { children?: React.ReactNode, title?: string, className?: string }) => (
  <div className={`bg-[#1E1E1E] rounded-lg overflow-hidden shadow-2xl border border-gray-800 ${className}`}>
    <div className="bg-[#2D2D2D] px-4 py-2 flex items-center justify-between">
      <div className="flex space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
      </div>
      <div className="text-gray-400 text-xs font-mono">{title}</div>
      <div className="w-10"></div>
    </div>
    <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
      {children}
    </div>
  </div>
);

export const CodeSnippet = ({ code, language = "javascript" }: { code: string, language?: string }) => {
  return (
    <pre className="text-gray-300">
      <code>
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="text-gray-600 w-8 inline-block select-none">{i + 1}</span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </code>
    </pre>
  );
};
