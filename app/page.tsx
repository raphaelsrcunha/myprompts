'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import TopCreators from '@/components/TopCreators';
import MostPopularPrompts from '@/components/MostPopularPrompts';

type SearchField = 'title' | 'author' | 'category' | '';

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

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function Home() {
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchField, setSearchField] = useState<SearchField>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Sort prompts by creation date (most recent first)
    const sorted = [...allPrompts].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Filter prompts based on search
    if (searchQuery.trim() === '' || searchField === '') {
      setFilteredPrompts(sorted);
    } else {
      const filtered = sorted.filter((prompt) => {
        const query = searchQuery.toLowerCase();
        switch (searchField) {
          case 'title':
            return prompt.title.toLowerCase().includes(query);
          case 'author':
            return prompt.author.toLowerCase().includes(query);
          case 'category':
            return prompt.category.toLowerCase().includes(query);
          default:
            return true;
        }
      });
      setFilteredPrompts(filtered);
    }
  }, [searchQuery, searchField, allPrompts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header with New Prompt Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Recent Prompts
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Discover the latest prompts from the community
            </p>
          </div>
          <a
            href="/new"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200 whitespace-nowrap"
          >
            New Prompt
          </a>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-3">
            {/* Search Field Dropdown */}
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as SearchField)}
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none cursor-pointer"
            >
              <option value="" disabled>Search by</option>
              <option value="title">Prompt Name</option>
              <option value="author">Author Name</option>
              <option value="category">Category</option>
            </select>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchField === '' 
                    ? 'Select a search field first...' 
                    : `Search by ${searchField === 'title' ? 'prompt name' : searchField === 'author' ? 'author name' : 'category'}...`
                }
                disabled={searchField === ''}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Found {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
          </div>
        )}

        {/* Prompts List */}
        <div className="space-y-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt) => {
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
                />
              );
            })
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No prompts found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed Sidebar with Top Creators and Popular Prompts */}
      <aside className="fixed right-8 top-24 w-[320px] space-y-6">
        <TopCreators />
        <MostPopularPrompts />
      </aside>
    </div>
  );
}
