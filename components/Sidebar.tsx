'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, FileText, TrendingUp, Bookmark, Star, GraduationCap, Users, BarChart3, Settings, Lightbulb, Shield } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/90 backdrop-blur-xl px-5 py-6 flex-col overflow-y-auto">
      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        <Link 
          href="/"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Home</span>
        </Link>
        
        <Link 
          href="/categories"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/categories') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Grid className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Categories</span>
        </Link>
        
        <Link 
          href="/prompts"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/prompts') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <FileText className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">All Prompts</span>
        </Link>
        
        <Link 
          href="/top-rated"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/top-rated') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <TrendingUp className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Top Rated</span>
        </Link>
        
        <Link 
          href="/favorites"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/favorites') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Star className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Favorites</span>
        </Link>
        
        <Link 
          href="/my-prompts"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/my-prompts') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Bookmark className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">My Prompts</span>
        </Link>

        <Link 
          href="/ai-training"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/ai-training') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <GraduationCap className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">AI Training</span>
        </Link>

        <Link 
          href="/teams"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/teams') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Users className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">My Teams</span>
        </Link>

        <Link 
          href="/analytics"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/analytics') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <BarChart3 className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Analytics</span>
        </Link>

        <Link 
          href="/best-practices"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/best-practices') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Best Practices</span>
        </Link>

        <Link 
          href="/compliance"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/compliance') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Shield className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Compliance</span>
        </Link>
      </nav>

      {/* Bottom Section - Preferences */}
      <div className="pt-4 border-t border-[#d2d2d7]/30">
        <Link 
          href="/settings"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive('/settings') 
              ? 'bg-[#0071e3] text-white' 
              : 'text-[#86868b] hover:bg-[#0071e3]/10 hover:text-[#0071e3]'
          }`}
        >
          <Settings className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-normal text-[15px]">Preferences</span>
        </Link>
      </div>
    </aside>
  );
}
