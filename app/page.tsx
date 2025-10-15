'use client';

import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import TopCreators from '@/components/TopCreators';
import MostPopularPrompts from '@/components/MostPopularPrompts';
import PromptModal from '@/components/PromptModal';
import CustomSelect from '@/components/CustomSelect';

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
  tags?: string;
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
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

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
        <div className="text-[#86868b] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-16 py-12">
      {/* Mudar essa largura se sobrepor */}
      <div className="max-w-4xl mx-auto">
        {/* Header with New Prompt Button */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
              Recent Prompts
            </h1>
            <p className="text-xl text-[#86868b]">
              Discover the latest prompts from the community
            </p>
          </div>
          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-normal text-[15px] transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            Create Prompt
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="flex gap-3">
            {/* Search Field Dropdown */}
            <CustomSelect
              value={searchField}
              onChange={(value) => setSearchField(value as SearchField)}
              options={[
                { value: '', label: 'Search by' },
                { value: 'title', label: 'Prompt Name' },
                { value: 'author', label: 'Author Name' },
                { value: 'category', label: 'Category' },
              ]}
              placeholder="Search by"
              className="w-[180px]"
            />

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
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
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] placeholder-[#86868b] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        {searchQuery && (
          <div className="mb-6 text-[15px] text-[#86868b]">
            Found {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
          </div>
        )}

        {/* Prompts List */}
        <div className="space-y-5">
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
                  tags={prompt.tags}
                />
              );
            })
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#86868b]">
                No prompts found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed Sidebar with Top Creators and Popular Prompts */}
      <aside className="fixed right-12 top-28 w-[320px] space-y-5">
        <TopCreators />
        <MostPopularPrompts />
      </aside>

      {/* Prompt Modal */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}
