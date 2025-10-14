'use client';

import { X } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, icon: string, color: string) => void;
  initialData?: {
    name: string;
    icon: string;
    color: string;
  };
  title: string;
}

const iconOptions = [
  'Code', 'Briefcase', 'FileText', 'BarChart', 'Lightbulb',
  'Bookmark', 'Target', 'Zap', 'Star', 'Heart',
  'MessageSquare', 'Image', 'Music', 'Video', 'Database'
];

const colorOptions = [
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Purple', value: 'purple' },
  { name: 'Orange', value: 'orange' },
  { name: 'Pink', value: 'pink' },
  { name: 'Red', value: 'red' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Gray', value: 'gray' },
];

export default function CategoryModal({ isOpen, onClose, onSubmit, initialData, title }: CategoryModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const icon = formData.get('icon') as string;
    const color = formData.get('color') as string;
    onSubmit(name, icon, color);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-[#d2d2d7]/40">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
            {title}
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
            <label htmlFor="name" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
              Category Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={initialData?.name}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none"
              placeholder="e.g. Design"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
              Icon
            </label>
            <select
              id="icon"
              name="icon"
              defaultValue={initialData?.icon || 'Bookmark'}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="color" className="block text-[15px] font-normal text-[#1d1d1f] mb-2">
              Color
            </label>
            <select
              id="color"
              name="color"
              defaultValue={initialData?.color || 'blue'}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7]/40 bg-white text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3] focus:border-[#0071e3] transition-all duration-200 outline-none"
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-normal text-[15px] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-xl font-normal text-[15px] transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
