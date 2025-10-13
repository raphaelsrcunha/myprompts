'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Prompt {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export default function MostPopularPrompts() {
  const [popularPrompts, setPopularPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPopularPrompts();
  }, []);

  const fetchPopularPrompts = async () => {
    try {
      const response = await fetch('/api/prompts/all');
      const prompts = await response.json();
      
      // Sort by likes and get top 5
      const topPrompts = prompts
        .sort((a: Prompt, b: Prompt) => b.likes - a.likes)
        .slice(0, 5);
      
      setPopularPrompts(topPrompts);
    } catch (error) {
      console.error('Error fetching popular prompts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Most Popular Prompts
        </h3>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Most Popular Prompts
        </h3>
      </div>
      
      {popularPrompts.length === 0 ? (
        <p className="text-sm text-gray-500">No prompts yet</p>
      ) : (
        <div className="space-y-3">
          {popularPrompts.map((prompt, index) => (
            <div
              key={prompt.id}
              className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
                    {prompt.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{prompt.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{prompt.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
