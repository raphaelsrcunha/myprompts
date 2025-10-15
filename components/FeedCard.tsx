'use client';

import { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, MessageCircle, Star } from 'lucide-react';
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
  tags?: string;
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
  dislikes: initialDislikes,
  tags
}: FeedCardProps) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
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
    blue: 'bg-[#e8f4fd] text-[#0071e3]',
    green: 'bg-[#e8f8ed] text-[#34c759]',
    purple: 'bg-[#f3e8fd] text-[#bf5af2]',
    orange: 'bg-[#fff3e0] text-[#ff9500]',
    pink: 'bg-[#ffe8ed] text-[#ff2d55]',
  };
  
  const preview = content.length > 150 ? content.substring(0, 150) + '...' : content;
  
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 hover:border-[#d2d2d7] hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
      {/* Header - Author First */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Author Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#0071e3] flex items-center justify-center">
            <span className="text-white font-medium text-base">
              {getInitial(author)}
            </span>
          </div>
          
          {/* Author Info */}
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#1d1d1f]">{author}</span>
            <span className="text-sm text-[#86868b]">{formatDate(createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleFavorite}
            className="p-2 hover:bg-[#f5f5f7] rounded-lg transition-colors"
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Star 
              className={`w-5 h-5 transition-colors ${
                isFavorited 
                  ? 'fill-[#ff9500] text-[#ff9500]' 
                  : 'text-[#86868b]'
              }`}
              strokeWidth={1.5}
            />
          </button>
          
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-[#f5f5f7] rounded-lg transition-colors"
            title="Copy prompt"
          >
            {copied ? (
              <Check className="w-5 h-5 text-[#34c759]" />
            ) : (
              <Copy className="w-5 h-5 text-[#86868b]" />
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f] mb-3">
        {title}
      </h3>
      
      {/* Preview */}
      <p className="text-[15px] text-[#86868b] mb-5 leading-relaxed">
        {preview}
      </p>

      {/* Tags */}
      {tags && tags.trim() !== '' && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.split(',').map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 bg-[#f5f5f7] text-[#86868b] rounded-lg text-sm"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d2d2d7]/30">
        {/* Category Badge */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-normal ${colorClasses[categoryColor] || colorClasses.blue}`}>
          <CategoryIcon className="w-4 h-4" strokeWidth={1.5} />
          {category}
        </span>
        
        {/* Like/Dislike/Comments Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Like this prompt"
          >
            <ThumbsUp className="w-4 h-4 text-[#86868b] group-hover:text-[#34c759] transition-colors" strokeWidth={1.5} />
            <span className="text-sm font-normal text-[#86868b] group-hover:text-[#34c759] transition-colors">
              {likes}
            </span>
          </button>
          
          <button
            onClick={handleDislike}
            disabled={isDisliking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Dislike this prompt"
          >
            <ThumbsDown className="w-4 h-4 text-[#86868b] group-hover:text-[#ff3b30] transition-colors" strokeWidth={1.5} />
            <span className="text-sm font-normal text-[#86868b] group-hover:text-[#ff3b30] transition-colors">
              {dislikes}
            </span>
          </button>
          
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors group"
            title="Comments"
          >
            <MessageCircle className="w-4 h-4 text-[#86868b] group-hover:text-[#0071e3] transition-colors" strokeWidth={1.5} />
            <span className="text-sm font-normal text-[#86868b] group-hover:text-[#0071e3] transition-colors">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
