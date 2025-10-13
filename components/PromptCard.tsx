'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PromptCardProps {
  title: string;
  content: string;
  category: string;
}

export default function PromptCard({ title, content, category }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
            {category}
          </span>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          title="Copy prompt"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          )}
        </button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
