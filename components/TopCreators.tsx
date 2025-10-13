'use client';

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

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
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Creators
        </h3>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Creators
      </h3>
      
      {topCreators.length === 0 ? (
        <p className="text-sm text-gray-500">No creators yet</p>
      ) : (
        <div className="space-y-3">
          {topCreators.map((creator, index) => (
            <div
              key={creator.author}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {creator.author}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {creator.promptCount} {creator.promptCount === 1 ? 'prompt' : 'prompts'}
                </p>
              </div>
              
              <User className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
