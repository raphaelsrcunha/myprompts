'use client';

import Logo from './Logo';
import UserMenu from './UserMenu';

export default function Header() {
  // Mock user data
  const userName = 'Raphael';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-[#d2d2d7]/50 px-8 flex items-center justify-between z-50">
      {/* App Name */}
      <div className="flex items-center gap-3">
        <Logo className="w-8 h-8" />
        <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
          myPrompts
        </h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Welcome Message */}
        <p className="hidden md:block text-sm text-[#86868b]">
          Welcome, <span className="font-medium text-[#1d1d1f]">{userName}</span>
        </p>

        {/* User Menu with Avatar */}
        <UserMenu userName={userName} userInitial={userInitial} />
      </div>
    </header>
  );
}
