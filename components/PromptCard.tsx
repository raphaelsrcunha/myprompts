'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PromptCardProps {
  title: string;
  content: string;
  category: string;
  tags?: string;
}

export default function PromptCard({ title, content, category, tags }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 hover:border-[#d2d2d7] transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium tracking-tight text-[#1d1d1f] mb-2">
            {title}
          </h3>
          <span className="inline-block px-3 py-1 text-xs font-normal bg-[#f5f5f7] text-[#1d1d1f] rounded-full">
            {category}
          </span>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-[#f5f5f7] transition-colors duration-200"
          title="Copy prompt"
        >
          {copied ? (
            <Check className="w-5 h-5 text-[#34c759]" />
          ) : (
            <Copy className="w-5 h-5 text-[#86868b]" />
          )}
        </button>
      </div>
      
      <p className="text-[15px] text-[#86868b] leading-relaxed whitespace-pre-wrap mb-4">
        {content}
      </p>

      {/* Tags */}
      {tags && tags.trim() !== '' && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#d2d2d7]/30">
          {tags.split(',').map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 bg-[#f5f5f7] text-[#86868b] rounded-lg text-sm"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
