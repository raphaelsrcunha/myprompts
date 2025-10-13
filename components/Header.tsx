'use client';

export default function Header() {
  // Mock user data
  const userName = 'Raphael';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 flex items-center justify-between z-10">
      {/* App Name */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          myPrompts
        </h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Welcome Message */}
        <p className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
          Welcome back, <span className="font-semibold text-gray-900 dark:text-white">{userName}</span>
        </p>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
          {userInitial}
        </div>
      </div>
    </header>
  );
}
