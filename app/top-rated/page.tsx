'use client';

import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Award, Crown } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import TopCreators from '@/components/TopCreators';

interface Prompt {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  tags?: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function TopRatedPage() {
  const [topPrompts, setTopPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [promptsRes, categoriesRes] = await Promise.all([
        fetch('/api/prompts/all'),
        fetch('/api/categories')
      ]);
      
      const promptsData = await promptsRes.json();
      const categoriesData = await categoriesRes.json();
      
      // Sort by likes (descending) and get top prompts
      const sortedPrompts = promptsData.sort((a: Prompt, b: Prompt) => {
        const scoreA = a.likes - a.dislikes;
        const scoreB = b.likes - b.dislikes;
        return scoreB - scoreA;
      });
      
      setTopPrompts(sortedPrompts);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryByName = (name: string) => {
    return categories.find(cat => cat.name === name);
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-[#FFD700]" strokeWidth={2} />;
      case 1:
        return <Award className="w-5 h-5 text-[#C0C0C0]" strokeWidth={2} />;
      case 2:
        return <Award className="w-5 h-5 text-[#CD7F32]" strokeWidth={2} />;
      default:
        return <span className="text-lg font-semibold text-[#86868b]">#{index + 1}</span>;
    }
  };

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-br from-[#FFD700] to-[#FFA500]';
      case 1:
        return 'bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8]';
      case 2:
        return 'bg-gradient-to-br from-[#CD7F32] to-[#B8860B]';
      default:
        return 'bg-[#f5f5f7]';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#86868b] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16 py-8 lg:py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Layout em Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          {/* Conteúdo Principal */}
          <div className="min-w-0">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                Top Rated Prompts
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#86868b]">
                Discover the most liked prompts by the community
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 lg:mb-10">
              <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm">
                <p className="text-sm text-[#86868b] mb-2">Total Prompts</p>
                <p className="text-3xl font-semibold text-[#1d1d1f]">{topPrompts.length}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm">
                <p className="text-sm text-[#86868b] mb-2">Top Rated</p>
                <p className="text-3xl font-semibold text-[#1d1d1f]">
                  {topPrompts.length > 0 ? topPrompts[0].likes : 0}
                  <span className="text-sm text-[#86868b] ml-2">likes</span>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm">
                <p className="text-sm text-[#86868b] mb-2">Categories</p>
                <p className="text-3xl font-semibold text-[#1d1d1f]">{categories.length}</p>
              </div>
            </div>

            {/* Prompts List with Rankings */}
            <div className="space-y-4 lg:space-y-5">
              {topPrompts.length > 0 ? (
                topPrompts.map((prompt, index) => {
                  const category = getCategoryByName(prompt.category);
                  return (
                    <div key={prompt.id} className="relative">
                      {/* Rank Badge */}
                      <div className="absolute -left-3 top-6 z-10">
                        <div className={`w-10 h-10 ${getRankBadgeColor(index)} rounded-xl flex items-center justify-center shadow-md`}>
                          {getRankIcon(index)}
                        </div>
                      </div>
                      
                      {/* Prompt Card with left margin for badge */}
                      <div className="ml-5">
                        <FeedCard
                          id={prompt.id}
                          title={prompt.title}
                          content={prompt.content}
                          category={prompt.category}
                          author={prompt.author}
                          createdAt={prompt.createdAt}
                          categoryIcon={category?.icon || 'Bookmark'}
                          categoryColor={category?.color || 'blue'}
                          likes={prompt.likes}
                          dislikes={prompt.dislikes}
                          tags={prompt.tags}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 lg:py-20 bg-white rounded-2xl border border-[#d2d2d7]/40">
                  <Trophy className="w-16 h-16 text-[#86868b] mx-auto mb-4 opacity-40" strokeWidth={1.5} />
                  <p className="text-lg lg:text-xl text-[#86868b]">
                    No prompts yet. Be the first to create one!
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar com Top Creators */}
          <aside className="space-y-4 lg:space-y-5 xl:sticky xl:top-24 xl:self-start">
            <TopCreators />
            
            {/* Legend Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40">
              <h3 className="text-lg font-medium tracking-tight text-[#1d1d1f] mb-4">
                Rankings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-[#FFD700]" strokeWidth={2} />
                  <span className="text-[15px] text-[#1d1d1f]">1st Place - Gold</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#C0C0C0]" strokeWidth={2} />
                  <span className="text-[15px] text-[#1d1d1f]">2nd Place - Silver</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#CD7F32]" strokeWidth={2} />
                  <span className="text-[15px] text-[#1d1d1f]">3rd Place - Bronze</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
