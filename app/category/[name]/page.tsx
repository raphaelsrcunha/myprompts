import Header from '@/components/Header';
import PromptCard from '@/components/PromptCard';
import { getPromptsByCategory } from '@/lib/db';

interface PageProps {
  params: {
    name: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = decodeURIComponent(params.name);
  const prompts = getPromptsByCategory(categoryName);

  return (
    <div className="min-h-screen">
      <Header title={categoryName} showBackButton />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {prompts.length} {prompts.length === 1 ? 'prompt found' : 'prompts found'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore prompts from the {categoryName} category
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              content={prompt.content}
              category={prompt.category}
            />
          ))}
        </div>

        {prompts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No prompts found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
