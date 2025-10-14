'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = 'Select...', className = '' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 pr-10 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] font-normal text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none hover:bg-[#f5f5f7]/50 shadow-sm text-left"
      >
        <span className={!value ? 'text-[#86868b]' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </button>
      
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <ChevronDown 
          className={`w-5 h-5 text-[#86868b] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-[#d2d2d7]/40 shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              disabled={option.value === ''}
              className={`w-full px-4 py-3 text-left text-[15px] font-normal transition-colors ${
                option.value === value
                  ? 'bg-[#0071e3] text-white'
                  : option.value === ''
                  ? 'text-[#86868b] cursor-not-allowed'
                  : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
