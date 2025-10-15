'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Copy, Check, ThumbsUp, User, Calendar, Tag, ChevronRight, Layers } from 'lucide-react';
import * as Icons from 'lucide-react';

interface PageProps {
  params: {
    name: string;
  };
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
  tags?: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  const categoryName = decodeURIComponent(params.name);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  const fetchData = async () => {
    try {
      const [promptsRes, categoriesRes] = await Promise.all([
        fetch('/api/prompts/all'),
        fetch('/api/categories')
      ]);
      
      const allPrompts = await promptsRes.json();
      const allCategories = await categoriesRes.json();
      
      // Filter prompts by category
      const categoryPrompts = allPrompts.filter(
        (p: Prompt) => p.category === categoryName
      );
      
      // Find category info
      const categoryInfo = allCategories.find(
        (c: Category) => c.name === categoryName
      );
      
      setPrompts(categoryPrompts);
      setCategory(categoryInfo || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
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

  const getCategoryIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Layers;
  };

  const CategoryIcon = category ? getCategoryIcon(category.icon) : Layers;

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
        {/* Header with Back Button */}
        <div className="mb-8 lg:mb-12">
          <Link 
            href="/categories"
            className="inline-flex items-center gap-2 text-[#0071e3] hover:text-[#0077ed] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
            <span className="text-[15px] font-medium">Back to Categories</span>
          </Link>

          <div className="flex items-start gap-4 mb-4">
            {/* Category Icon */}
            {category && (
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg flex-shrink-0 from-${category.color}-100 to-${category.color}-200`}>
                <CategoryIcon className={`w-8 h-8 text-${category.color}-600`} strokeWidth={2} />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
                {categoryName}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#86868b]">
                Explore prompts from the {categoryName} category
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#d2d2d7]/40 shadow-sm">
              <FileText className="w-4 h-4 text-[#0071e3]" strokeWidth={2} />
              <span className="text-sm font-medium text-[#1d1d1f]">
                {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'}
              </span>
            </div>
            {prompts.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#d2d2d7]/40 shadow-sm">
                <ThumbsUp className="w-4 h-4 text-[#34c759]" strokeWidth={2} />
                <span className="text-sm font-medium text-[#1d1d1f]">
                  {prompts.reduce((sum, p) => sum + p.likes, 0)} total likes
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Prompts List */}
        {prompts.length > 0 ? (
          <div className="bg-white rounded-2xl border border-[#d2d2d7]/40 shadow-sm overflow-hidden">
            <div className="divide-y divide-[#d2d2d7]/30">
              {prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="p-4 sm:p-5 hover:bg-[#f5f5f7]/50 transition-colors duration-150 cursor-pointer group"
                  onClick={() => setSelectedPrompt(selectedPrompt === prompt.id ? null : prompt.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Prompt Icon */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5856d6] to-[#5e5ce6] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
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

                      {/* Preview Text - First 150 chars */}
                      {selectedPrompt !== prompt.id && (
                        <p className="text-sm text-[#86868b] line-clamp-2">
                          {prompt.content.substring(0, 150)}
                          {prompt.content.length > 150 && '...'}
                        </p>
                      )}

                      {/* Expanded Content */}
                      {selectedPrompt === prompt.id && (
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
                        selectedPrompt === prompt.id ? 'rotate-90' : ''
                      }`} 
                      strokeWidth={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 lg:py-20 bg-white rounded-2xl border border-[#d2d2d7]/40">
            <FileText className="w-16 h-16 text-[#86868b] mx-auto mb-4 opacity-40" strokeWidth={1.5} />
            <p className="text-lg lg:text-xl text-[#86868b] mb-2">
              No prompts in this category yet
            </p>
            <p className="text-sm text-[#86868b] mb-6">
              Be the first to create a prompt in {categoryName}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-normal text-[15px] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FileText className="w-5 h-5" strokeWidth={1.5} />
              Create Prompt
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
