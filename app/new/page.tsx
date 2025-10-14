'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function NewPrompt() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setCategory(data[0].name);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, category, author }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-16 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            New Prompt
          </h1>
          <p className="text-xl text-[#86868b]">
            Create a new prompt to add to your collection
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#d2d2d7]/40">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="title" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none"
                placeholder="e.g. Refactor code"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
                Author Name
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={isLoading || categories.length === 0}
                className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <option>Loading...</option>
                ) : categories.length === 0 ? (
                  <option>No categories available</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
              {categories.length === 0 && !isLoading && (
                <p className="mt-2 text-[15px] text-[#ff9500]">
                  You need to create a category first. <a href="/categories" className="underline">Click here</a> to manage categories.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
                Prompt Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none resize-none"
                placeholder="Paste or write your prompt here..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] disabled:bg-[#86868b] text-white rounded-xl font-normal text-[15px] transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Prompt'}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-xl font-normal text-[15px] transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
