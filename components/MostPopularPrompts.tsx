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
      <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40">
        <h3 className="text-lg font-medium tracking-tight text-[#1d1d1f] mb-4">
          Most Popular Prompts
        </h3>
        <p className="text-[15px] text-[#86868b]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-5 h-5 text-[#ff9500]" strokeWidth={1.5} />
        <h3 className="text-lg font-medium tracking-tight text-[#1d1d1f]">
          Most Popular Prompts
        </h3>
      </div>
      
      {popularPrompts.length === 0 ? (
        <p className="text-[15px] text-[#86868b]">No prompts yet</p>
      ) : (
        <div className="space-y-2">
          {popularPrompts.map((prompt, index) => (
            <div
              key={prompt.id}
              className="p-3 rounded-lg hover:bg-[#f5f5f7] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#fff3e0] text-[#ff9500] font-medium text-sm flex-shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-normal text-[#1d1d1f] truncate mb-1">
                    {prompt.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#86868b]">
                    <span>{prompt.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.5} />
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
