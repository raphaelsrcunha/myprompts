'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function PromptModal({ isOpen, onClose, onSuccess }: PromptModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

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

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
        body: JSON.stringify({ title, content, category, author, tags: tags.join(',') }),
      });

      if (response.ok) {
        // Reset form
        setTitle('');
        setContent('');
        setAuthor('');
        setTags([]);
        setTagInput('');
        setCategory(categories[0]?.name || '');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-[#d2d2d7]/40">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
            New Prompt
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#f5f5f7] transition-colors"
          >
            <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                You need to create a category first.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="tags" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none"
              placeholder="Type and press Enter to add tags"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f4fd] text-[#0071e3] rounded-lg text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-[#ff3b30] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </span>
                ))}
              </div>
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
              rows={10}
              className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none resize-none"
              placeholder="Enter your prompt here..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-[#d2d2d7]/40 text-[#1d1d1f] font-normal hover:bg-[#f5f5f7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || categories.length === 0}
              className="flex-1 px-6 py-3 rounded-xl bg-[#0071e3] text-white font-normal hover:bg-[#0077ed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Prompt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
