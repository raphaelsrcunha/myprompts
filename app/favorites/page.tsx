'use client';

import { useState, useEffect } from 'react';
import { Star, Heart, Sparkles, Grid, List, Search, Filter } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import PromptCard from '@/components/PromptCard';

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

type ViewMode = 'grid' | 'list';
type SortBy = 'recent' | 'alphabetical' | 'category';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
      
      // Simulando favoritos (na prática, viria de localStorage ou API)
      // Pegando alguns prompts aleatórios como favoritos
      const favoritesData = promptsData.slice(0, Math.min(5, promptsData.length));
      
      setFavorites(favoritesData);
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

  const getFilteredAndSortedPrompts = () => {
    let filtered = [...favorites];

    // Filter by search
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prompt => prompt.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  };

  const filteredPrompts = getFilteredAndSortedPrompts();
  const categoryCounts = favorites.reduce((acc, prompt) => {
    acc[prompt.category] = (acc[prompt.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            My Favorites
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#86868b]">
            Your favorite prompts saved for quick access
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 lg:mb-10">
          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{favorites.length}</p>
            <p className="text-sm text-[#86868b]">Favorites</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{Object.keys(categoryCounts).length}</p>
            <p className="text-sm text-[#86868b]">Categories</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">
              {favorites.reduce((sum, p) => sum + p.likes, 0)}
            </p>
            <p className="text-sm text-[#86868b]">Total Likes</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{filteredPrompts.length}</p>
            <p className="text-sm text-[#86868b]">Showing</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2d2d7]/40 shadow-sm mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in favorites..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] text-sm focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] outline-none transition-all cursor-pointer"
              >
                <option value="all">All Categories</option>
                {Object.keys(categoryCounts).map(category => (
                  <option key={category} value={category}>
                    {category} ({categoryCounts[category]})
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-4 py-2 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] text-sm focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] outline-none transition-all cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="alphabetical">A-Z</option>
                <option value="category">By Category</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-[#f5f5f7] p-1 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0071e3] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <List className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0071e3] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <Grid className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Prompts Display */}
        {filteredPrompts.length > 0 ? (
          viewMode === 'list' ? (
            <div className="space-y-4 lg:space-y-5">
              {filteredPrompts.map((prompt) => {
                const category = getCategoryByName(prompt.category);
                return (
                  <FeedCard
                    key={prompt.id}
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
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
              {filteredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  title={prompt.title}
                  content={prompt.content}
                  category={prompt.category}
                  tags={prompt.tags}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12 lg:py-20 bg-white rounded-2xl border border-[#d2d2d7]/40">
            <Heart className="w-16 h-16 text-[#86868b] mx-auto mb-4 opacity-40" strokeWidth={1.5} />
            <p className="text-lg lg:text-xl text-[#86868b] mb-2">
              {searchQuery || selectedCategory !== 'all'
                ? 'No favorites match your filters'
                : 'No favorites yet'}
            </p>
            <p className="text-sm text-[#86868b]">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Star prompts to add them to your favorites'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
