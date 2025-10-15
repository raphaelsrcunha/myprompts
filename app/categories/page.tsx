'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import CategoryModal from '@/components/CategoryModal';
import { Plus, Grid, List, ChevronRight, Tag, Search } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

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

type ViewMode = 'grid' | 'list';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, promptsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/prompts/all')
      ]);
      
      const categoriesData = await categoriesRes.json();
      const promptsData = await promptsRes.json();
      
      setCategories(categoriesData);
      setPrompts(promptsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateCategory = async (name: string, icon: string, color: string) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon, color }),
      });

      if (response.ok) {
        await fetchCategories();
        setIsModalOpen(false);
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Error creating category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    }
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Bookmark;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center py-20">
            <p className="text-xl text-[#86868b]">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const categoriesWithIcons = categories.map(category => {
    const IconComponent = getIconComponent(category.icon);
    const count = prompts.filter(prompt => prompt.category === category.name).length;
    return {
      ...category,
      iconComponent: IconComponent,
      count: count
    };
  });

  // Filter categories by search query
  const filteredCategories = categoriesWithIcons.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16 py-8 lg:py-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 lg:mb-12 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
              Categories
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#86868b]">
              Browse through categories and find the perfect prompt for your needs
            </p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-[#f5f5f7] p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0071e3] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0071e3] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-normal text-sm sm:text-[15px] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <Plus className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden sm:inline">New Category</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories by name..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] placeholder-[#86868b] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none text-sm sm:text-base shadow-sm"
            />
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-[#86868b]">
              Found {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
            </p>
          )}
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                icon={category.iconComponent}
                count={category.count}
                cor={category.color}
              />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-2xl border border-[#d2d2d7]/40 shadow-sm overflow-hidden">
            <div className="divide-y divide-[#d2d2d7]/30">
              {filteredCategories.map((category) => {
                const IconComponent = category.iconComponent;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${encodeURIComponent(category.name)}`}
                    className="block p-4 sm:p-5 hover:bg-[#f5f5f7]/50 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Category Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 from-${category.color}-100 to-${category.color}-200`}>
                        <IconComponent className={`w-6 h-6 text-${category.color}-600`} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Tag className="w-3.5 h-3.5 text-[#86868b]" strokeWidth={2} />
                          <p className="text-sm text-[#86868b]">
                            {category.count} {category.count === 1 ? 'prompt' : 'prompts'}
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight 
                        className="w-5 h-5 text-[#86868b] flex-shrink-0 group-hover:text-[#0071e3] transition-colors" 
                        strokeWidth={2}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-12 lg:py-20 bg-white rounded-2xl border border-[#d2d2d7]/40">
            <Search className="w-16 h-16 text-[#86868b] mx-auto mb-4 opacity-40" strokeWidth={1.5} />
            <p className="text-lg lg:text-xl text-[#86868b] mb-2">
              No categories found matching "{searchQuery}"
            </p>
            <p className="text-sm text-[#86868b]">
              Try a different search term
            </p>
          </div>
        )}

        {/* Empty State */}
        {categories.length === 0 && !searchQuery && (
          <div className="text-center py-20">
            <p className="text-xl text-[#86868b] mb-6">
              No categories registered yet.
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-normal text-[15px] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" strokeWidth={1.5} />
              Create First Category
            </button>
          </div>
        )}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateCategory}
        title="New Category"
      />
    </div>
  );
}
