'use client';

import { useState, useEffect } from 'react';
import { FileText, Search, Filter, ChevronRight, Copy, Check, ThumbsUp, User, Calendar, Tag } from 'lucide-react';
import * as Icons from 'lucide-react';

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

type SortBy = 'recent' | 'alphabetical' | 'mostLiked' | 'category';

export default function PromptsPage() {
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

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
      
      setAllPrompts(promptsData);
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

  const getCategoryIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.FileText;
  };

  const getFilteredAndSortedPrompts = () => {
    let filtered = [...allPrompts];

    // Filter by search
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.author.toLowerCase().includes(searchQuery.toLowerCase())
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
      case 'mostLiked':
        filtered.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
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

  const handleCopy = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.content);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const filteredPrompts = getFilteredAndSortedPrompts();
  const categoryCounts = allPrompts.reduce((acc, prompt) => {
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
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
                All Prompts
              </h1>
            </div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-[#86868b]">
            Browse all available prompts in the platform
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <FileText className="w-5 h-5 text-[#5856d6] mb-2" strokeWidth={2} />
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{allPrompts.length}</p>
            <p className="text-sm text-[#86868b]">Total Prompts</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <Filter className="w-5 h-5 text-[#ff9500] mb-2" strokeWidth={2} />
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{Object.keys(categoryCounts).length}</p>
            <p className="text-sm text-[#86868b]">Categories</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <ThumbsUp className="w-5 h-5 text-[#34c759] mb-2" strokeWidth={2} />
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">
              {allPrompts.reduce((sum, p) => sum + p.likes, 0)}
            </p>
            <p className="text-sm text-[#86868b]">Total Likes</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#d2d2d7]/40 shadow-sm">
            <Search className="w-5 h-5 text-[#5ac8fa] mb-2" strokeWidth={2} />
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-1">{filteredPrompts.length}</p>
            <p className="text-sm text-[#86868b]">Showing</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2d2d7]/40 shadow-sm mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts by title, content, or author..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] text-sm focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] outline-none transition-all cursor-pointer"
            >
              <option value="all">All Categories ({allPrompts.length})</option>
              {Object.keys(categoryCounts)
                .sort()
                .map(category => (
                  <option key={category} value={category}>
                    {category} ({categoryCounts[category]})
                  </option>
                ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-4 py-2 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] text-sm focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] outline-none transition-all cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="alphabetical">A-Z</option>
              <option value="mostLiked">Most Liked</option>
              <option value="category">By Category</option>
            </select>
          </div>
        </div>

        {/* Prompts List - Compact Table Style */}
        <div className="bg-white rounded-2xl border border-[#d2d2d7]/40 shadow-sm overflow-hidden">
          {filteredPrompts.length > 0 ? (
            <div className="divide-y divide-[#d2d2d7]/30">
              {filteredPrompts.map((prompt) => {
                const category = getCategoryByName(prompt.category);
                const CategoryIcon = category ? getCategoryIcon(category.icon) : FileText;
                
                return (
                  <div
                    key={prompt.id}
                    className="p-4 sm:p-5 hover:bg-[#f5f5f7]/50 transition-colors duration-150 cursor-pointer group"
                    onClick={() => setSelectedPrompt(selectedPrompt?.id === prompt.id ? null : prompt)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Category Icon */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 ${
                        category ? `from-${category.color}-100 to-${category.color}-200` : 'from-gray-100 to-gray-200'
                      }`}>
                        <CategoryIcon className={`w-5 h-5 text-${category?.color || 'gray'}-600`} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-base sm:text-lg font-medium text-[#1d1d1f] truncate group-hover:text-[#0071e3] transition-colors">
                            {prompt.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(prompt);
                            }}
                            className="p-2 rounded-lg hover:bg-white transition-colors flex-shrink-0"
                            title="Copy prompt"
                          >
                            {copiedId === prompt.id ? (
                              <Check className="w-4 h-4 text-[#34c759]" strokeWidth={2} />
                            ) : (
                              <Copy className="w-4 h-4 text-[#86868b]" strokeWidth={2} />
                            )}
                          </button>
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#86868b] mb-2">
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" strokeWidth={2} />
                            <span>{prompt.category}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" strokeWidth={2} />
                            <span>{prompt.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                            <span>{formatDate(prompt.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ThumbsUp className="w-3.5 h-3.5" strokeWidth={2} />
                            <span>{prompt.likes} likes</span>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {selectedPrompt?.id === prompt.id && (
                          <div className="mt-4 pt-4 border-t border-[#d2d2d7]/30 animate-in fade-in slide-in-from-top-2 duration-200">
                            <p className="text-sm text-[#1d1d1f] leading-relaxed whitespace-pre-wrap bg-[#f5f5f7] rounded-xl p-4">
                              {prompt.content}
                            </p>
                            {prompt.tags && prompt.tags.trim() !== '' && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {prompt.tags.split(',').map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-1 bg-white border border-[#d2d2d7]/40 text-[#86868b] rounded-lg text-xs"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Expand Indicator */}
                      <ChevronRight 
                        className={`w-5 h-5 text-[#86868b] flex-shrink-0 transition-transform duration-200 ${
                          selectedPrompt?.id === prompt.id ? 'rotate-90' : ''
                        }`} 
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 lg:py-20">
              <FileText className="w-16 h-16 text-[#86868b] mx-auto mb-4 opacity-40" strokeWidth={1.5} />
              <p className="text-lg lg:text-xl text-[#86868b] mb-2">
                {searchQuery || selectedCategory !== 'all'
                  ? 'No prompts match your filters'
                  : 'No prompts yet'}
              </p>
              <p className="text-sm text-[#86868b]">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to create a prompt!'}
              </p>
            </div>
          )}
        </div>

        {/* Results Count Footer */}
        {filteredPrompts.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[#86868b]">
              Showing {filteredPrompts.length} of {allPrompts.length} prompts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
