import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  count: number;
  cor?: string;
}

const colorGradients: Record<string, { from: string; to: string; icon: string; overlay: string }> = {
  blue: { from: 'from-blue-50', to: 'to-indigo-50', icon: 'text-blue-600', overlay: 'group-hover:from-blue-500/5 group-hover:to-indigo-500/5' },
  green: { from: 'from-green-50', to: 'to-emerald-50', icon: 'text-green-600', overlay: 'group-hover:from-green-500/5 group-hover:to-emerald-500/5' },
  purple: { from: 'from-purple-50', to: 'to-violet-50', icon: 'text-purple-600', overlay: 'group-hover:from-purple-500/5 group-hover:to-violet-500/5' },
  orange: { from: 'from-orange-50', to: 'to-amber-50', icon: 'text-orange-600', overlay: 'group-hover:from-orange-500/5 group-hover:to-amber-500/5' },
  pink: { from: 'from-pink-50', to: 'to-rose-50', icon: 'text-pink-600', overlay: 'group-hover:from-pink-500/5 group-hover:to-rose-500/5' },
  red: { from: 'from-red-50', to: 'to-rose-50', icon: 'text-red-600', overlay: 'group-hover:from-red-500/5 group-hover:to-rose-500/5' },
  yellow: { from: 'from-yellow-50', to: 'to-amber-50', icon: 'text-yellow-600', overlay: 'group-hover:from-yellow-500/5 group-hover:to-amber-500/5' },
  cyan: { from: 'from-cyan-50', to: 'to-teal-50', icon: 'text-cyan-600', overlay: 'group-hover:from-cyan-500/5 group-hover:to-teal-500/5' },
  indigo: { from: 'from-indigo-50', to: 'to-blue-50', icon: 'text-indigo-600', overlay: 'group-hover:from-indigo-500/5 group-hover:to-blue-500/5' },
  gray: { from: 'from-gray-50', to: 'to-slate-50', icon: 'text-gray-600', overlay: 'group-hover:from-gray-500/5 group-hover:to-slate-500/5' },
};

const darkColorGradients: Record<string, { from: string; to: string; icon: string }> = {
  blue: { from: 'dark:from-blue-900/20', to: 'dark:to-indigo-900/20', icon: 'dark:text-blue-400' },
  green: { from: 'dark:from-green-900/20', to: 'dark:to-emerald-900/20', icon: 'dark:text-green-400' },
  purple: { from: 'dark:from-purple-900/20', to: 'dark:to-violet-900/20', icon: 'dark:text-purple-400' },
  orange: { from: 'dark:from-orange-900/20', to: 'dark:to-amber-900/20', icon: 'dark:text-orange-400' },
  pink: { from: 'dark:from-pink-900/20', to: 'dark:to-rose-900/20', icon: 'dark:text-pink-400' },
  red: { from: 'dark:from-red-900/20', to: 'dark:to-rose-900/20', icon: 'dark:text-red-400' },
  yellow: { from: 'dark:from-yellow-900/20', to: 'dark:to-amber-900/20', icon: 'dark:text-yellow-400' },
  cyan: { from: 'dark:from-cyan-900/20', to: 'dark:to-teal-900/20', icon: 'dark:text-cyan-400' },
  indigo: { from: 'dark:from-indigo-900/20', to: 'dark:to-blue-900/20', icon: 'dark:text-indigo-400' },
  gray: { from: 'dark:from-gray-900/20', to: 'dark:to-slate-900/20', icon: 'dark:text-gray-400' },
};

export default function CategoryCard({ name, icon: Icon, count, cor = 'blue' }: CategoryCardProps) {
  const colors = colorGradients[cor] || colorGradients.blue;
  const darkColors = darkColorGradients[cor] || darkColorGradients.blue;

  return (
    <Link href={`/category/${encodeURIComponent(name)}`}>
      <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:scale-105 cursor-pointer animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 bg-gradient-to-br ${colors.from} ${colors.to} ${darkColors.from} ${darkColors.to} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-10 h-10 ${colors.icon} ${darkColors.icon}`} strokeWidth={1.5} />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {count} {count === 1 ? 'prompt' : 'prompts'}
            </p>
          </div>
        </div>
        
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 ${colors.overlay} transition-all duration-300`} />
      </div>
    </Link>
  );
}
