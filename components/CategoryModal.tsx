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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={initialData?.name}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="e.g. Design"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon
            </label>
            <select
              id="icon"
              name="icon"
              defaultValue={initialData?.icon || 'Bookmark'}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <select
              id="color"
              name="color"
              defaultValue={initialData?.color || 'blue'}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
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
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
