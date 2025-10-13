'use client';

import { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import * as Icons from 'lucide-react';

interface FeedCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  categoryIcon: string;
  categoryColor: string;
  likes: number;
  dislikes: number;
}

export default function FeedCard({ 
  id,
  title, 
  content, 
  category, 
  author, 
  createdAt,
  categoryIcon,
  categoryColor,
  likes: initialLikes,
  dislikes: initialDislikes
}: FeedCardProps) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    
    try {
      const response = await fetch(`/api/prompts/${id}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedPrompt = await response.json();
        setLikes(updatedPrompt.likes);
      }
    } catch (error) {
      console.error('Error liking prompt:', error);
    } finally {
      setIsLiking(false);
    }
  };
  
  const handleDislike = async () => {
    if (isDisliking) return;
    setIsDisliking(true);
    
    try {
      const response = await fetch(`/api/prompts/${id}/dislike`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedPrompt = await response.json();
        setDislikes(updatedPrompt.dislikes);
      }
    } catch (error) {
      console.error('Error disliking prompt:', error);
    } finally {
      setIsDisliking(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };
  
  const CategoryIcon = (Icons as any)[categoryIcon] || Icons.Bookmark;
  
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    pink: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
  };
  
  const preview = content.length > 150 ? content.substring(0, 150) + '...' : content;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{author}</span>
            <span>•</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title="Copy prompt"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      
      {/* Preview */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {preview}
      </p>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        {/* Category Badge */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${colorClasses[categoryColor] || colorClasses.blue}`}>
          <CategoryIcon className="w-4 h-4" />
          {category}
        </span>
        
        {/* Like/Dislike Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Like this prompt"
          >
            <ThumbsUp className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {likes}
            </span>
          </button>
          
          <button
            onClick={handleDislike}
            disabled={isDisliking}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Dislike this prompt"
          >
            <ThumbsDown className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {dislikes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
