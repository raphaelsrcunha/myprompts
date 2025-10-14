'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryCard from '@/components/CategoryCard';
import CategoryModal from '@/components/CategoryModal';
import { Plus } from 'lucide-react';
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

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="max-w-7xl mx-auto">
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

  return (
    <div className="min-h-screen px-16 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
              Categories
            </h1>
            <p className="text-xl text-[#86868b]">
              Browse through categories and find the perfect prompt for your needs
            </p>
          </div>
          
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-normal text-[15px] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            New Category
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {categoriesWithIcons.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon={category.iconComponent}
              count={category.count}
              cor={category.color}
            />
          ))}
        </div>

        {categories.length === 0 && (
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
