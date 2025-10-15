'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Settings, LogOut } from 'lucide-react';

interface UserMenuProps {
  userName: string;
  userInitial: string;
}

export default function UserMenu({ userName, userInitial }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMyAccount = () => {
    console.log('Navigate to My Account');
    setIsOpen(false);
    // Adicionar navegação aqui
  };

  const handlePreferences = () => {
    console.log('Navigate to Preferences');
    setIsOpen(false);
    // Adicionar navegação aqui
  };

  const handleExit = () => {
    console.log('Logout');
    setIsOpen(false);
    // Adicionar lógica de logout aqui
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0071e3] to-[#0077ed] flex items-center justify-center text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:ring-offset-2"
        aria-label="User menu"
      >
        {userInitial}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-[#d2d2d7]/40 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-[#d2d2d7]/30">
            <p className="text-sm font-semibold text-[#1d1d1f]">{userName}</p>
            <p className="text-xs text-[#86868b] mt-0.5">raphael@example.com</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleMyAccount}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[15px] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
            >
              <User className="w-[18px] h-[18px] text-[#86868b]" strokeWidth={2} />
              <span>My Account</span>
            </button>

            <button
              onClick={handlePreferences}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[15px] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
            >
              <Settings className="w-[18px] h-[18px] text-[#86868b]" strokeWidth={2} />
              <span>Preferences</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#d2d2d7]/30 my-1"></div>

          {/* Exit Button */}
          <div className="py-1">
            <button
              onClick={handleExit}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[15px] text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-colors duration-150 group"
            >
              <LogOut className="w-[18px] h-[18px] text-[#ff3b30] group-hover:text-[#ff3b30]" strokeWidth={2} />
              <span className="font-medium">Exit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
