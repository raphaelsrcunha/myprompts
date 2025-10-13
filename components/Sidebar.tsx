'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, FileText, TrendingUp, Bookmark, Star } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
      {/* Navigation */}
      <nav className="space-y-2">
        <Link 
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/') 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </Link>
        
        <Link 
          href="/categories"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/categories') 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="font-medium">Categories</span>
        </Link>
        
        <Link 
          href="/prompts"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/prompts') 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Prompts</span>
        </Link>
        
        <Link 
          href="/top-rated"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/top-rated') 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium">Top Rated</span>
        </Link>
        
        <Link 
          href="/favorites"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/favorites') 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Star className="w-5 h-5" />
          <span className="font-medium">Favorites</span>
        </Link>
        
        <Link 
          href="/my-prompts"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/my-prompts') 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="font-medium">My Prompts</span>
        </Link>
      </nav>
    </aside>
  );
}
