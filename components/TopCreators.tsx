'use client';

import { useEffect, useState } from 'react';
import { User, Trophy } from 'lucide-react';

interface CreatorStats {
  author: string;
  promptCount: number;
}

export default function TopCreators() {
  const [topCreators, setTopCreators] = useState<CreatorStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopCreators();
  }, []);

  const fetchTopCreators = async () => {
    try {
      const response = await fetch('/api/prompts/all');
      const prompts = await response.json();
      
      // Count prompts per author
      const authorCounts: { [key: string]: number } = {};
      prompts.forEach((prompt: any) => {
        authorCounts[prompt.author] = (authorCounts[prompt.author] || 0) + 1;
      });
      
      // Convert to array and sort
      const creators = Object.entries(authorCounts)
        .map(([author, count]) => ({ author, promptCount: count }))
        .sort((a, b) => b.promptCount - a.promptCount)
        .slice(0, 5);
      
      setTopCreators(creators);
    } catch (error) {
      console.error('Error fetching top creators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40">
        <h3 className="text-lg font-medium tracking-tight text-[#1d1d1f] mb-4">
          Top Creators
        </h3>
        <p className="text-[15px] text-[#86868b]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40">
      <h3 className="text-lg font-medium tracking-tight text-[#1d1d1f] mb-5 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
        Top Creators
      </h3>
      
      {topCreators.length === 0 ? (
        <p className="text-[15px] text-[#86868b]">No creators yet</p>
      ) : (
        <div className="space-y-2">
          {topCreators.map((creator, index) => (
            <div
              key={creator.author}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f7] transition-colors"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#e8f4fd] text-[#0071e3] font-medium text-sm">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-normal text-[#1d1d1f] truncate">
                  {creator.author}
                </p>
                <p className="text-sm text-[#86868b]">
                  {creator.promptCount} {creator.promptCount === 1 ? 'prompt' : 'prompts'}
                </p>
              </div>
              
              <User className="w-4 h-4 text-[#86868b]" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
