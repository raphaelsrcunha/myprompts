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
      <div className="min-h-screen p-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">Loading...</p>
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
    <div className="min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Categories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse through categories and find the perfect prompt for your needs
            </p>
          </div>
          
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            New Category
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
              No categories registered yet.
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
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
