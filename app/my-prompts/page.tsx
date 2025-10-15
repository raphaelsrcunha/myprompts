'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageSquare,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Award,
  Target,
  Clock
} from 'lucide-react';

interface MyPrompt {
  id: number;
  title: string;
  content: string;
  category: string;
  categoryIcon: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  status: 'Published' | 'Draft' | 'Private';
  performance: 'Excellent' | 'Good' | 'Average';
}

const myPrompts: MyPrompt[] = [
  {
    id: 1,
    title: 'Advanced Code Refactoring Assistant',
    content: 'You are an expert software engineer specialized in code refactoring. Analyze the provided code and suggest improvements for readability, performance, and maintainability. Focus on SOLID principles and design patterns.',
    category: 'Development',
    categoryIcon: '💻',
    tags: ['code', 'refactoring', 'software engineering'],
    createdAt: '2025-10-10',
    updatedAt: '2025-10-14',
    views: 1247,
    likes: 89,
    comments: 23,
    status: 'Published',
    performance: 'Excellent'
  },
  {
    id: 2,
    title: 'Creative Marketing Campaign Generator',
    content: 'Generate innovative marketing campaign ideas for [PRODUCT/SERVICE]. Consider target audience demographics, current market trends, and competitive landscape. Include social media strategies, content ideas, and KPIs.',
    category: 'Marketing',
    categoryIcon: '📊',
    tags: ['marketing', 'campaigns', 'social media'],
    createdAt: '2025-10-08',
    updatedAt: '2025-10-13',
    views: 892,
    likes: 67,
    comments: 15,
    status: 'Published',
    performance: 'Good'
  },
  {
    id: 3,
    title: 'AI-Powered Story Writer',
    content: 'Write a compelling short story in the style of [AUTHOR]. The story should be approximately [LENGTH] words, feature [GENRE] elements, and include unexpected plot twists. Focus on character development and vivid descriptions.',
    category: 'Writing',
    categoryIcon: '✍️',
    tags: ['creative writing', 'storytelling', 'fiction'],
    createdAt: '2025-10-05',
    updatedAt: '2025-10-12',
    views: 2103,
    likes: 156,
    comments: 41,
    status: 'Published',
    performance: 'Excellent'
  },
  {
    id: 4,
    title: 'Data Analysis & Visualization Expert',
    content: 'Analyze the following dataset and provide insights using statistical methods. Create visualizations to highlight key trends, patterns, and anomalies. Suggest actionable recommendations based on the data.',
    category: 'Data Science',
    categoryIcon: '📈',
    tags: ['data analysis', 'statistics', 'visualization'],
    createdAt: '2025-10-03',
    updatedAt: '2025-10-03',
    views: 634,
    likes: 42,
    comments: 8,
    status: 'Published',
    performance: 'Good'
  },
  {
    id: 5,
    title: 'UX/UI Design Critique & Improvement',
    content: 'Review this user interface design and provide detailed feedback on usability, accessibility, visual hierarchy, and user experience. Suggest specific improvements with rationale based on UX best practices.',
    category: 'Design',
    categoryIcon: '🎨',
    tags: ['ux', 'ui', 'design review'],
    createdAt: '2025-09-28',
    updatedAt: '2025-10-11',
    views: 1456,
    likes: 98,
    comments: 27,
    status: 'Published',
    performance: 'Excellent'
  },
  {
    id: 6,
    title: 'Business Strategy Consultant',
    content: 'Act as a business strategy consultant. Analyze the current business model, identify growth opportunities, assess market risks, and provide a comprehensive strategic plan for the next 12-24 months.',
    category: 'Business',
    categoryIcon: '💼',
    tags: ['strategy', 'business planning', 'consulting'],
    createdAt: '2025-09-25',
    updatedAt: '2025-09-25',
    views: 543,
    likes: 38,
    comments: 12,
    status: 'Published',
    performance: 'Average'
  },
  {
    id: 7,
    title: 'Advanced SQL Query Optimizer',
    content: 'Review and optimize SQL queries for better performance. Explain indexing strategies, query execution plans, and suggest database schema improvements. Focus on reducing query time and resource consumption.',
    category: 'Development',
    categoryIcon: '💻',
    tags: ['sql', 'database', 'optimization'],
    createdAt: '2025-09-20',
    updatedAt: '2025-10-09',
    views: 789,
    likes: 54,
    comments: 16,
    status: 'Published',
    performance: 'Good'
  },
  {
    id: 8,
    title: 'Email Marketing Copywriter',
    content: 'Write high-converting email marketing copy for [CAMPAIGN TYPE]. Include compelling subject lines, engaging body content, clear CTAs, and personalization elements. Optimize for mobile devices and email clients.',
    category: 'Marketing',
    categoryIcon: '📧',
    tags: ['email', 'copywriting', 'conversion'],
    createdAt: '2025-09-15',
    updatedAt: '2025-09-15',
    views: 412,
    likes: 29,
    comments: 7,
    status: 'Draft',
    performance: 'Average'
  },
  {
    id: 9,
    title: 'Personal Finance Advisor',
    content: 'Provide personalized financial advice based on income, expenses, goals, and risk tolerance. Include budgeting strategies, investment recommendations, and savings plans. Consider tax implications and retirement planning.',
    category: 'Finance',
    categoryIcon: '💰',
    tags: ['finance', 'investing', 'budgeting'],
    createdAt: '2025-09-10',
    updatedAt: '2025-10-08',
    views: 1876,
    likes: 132,
    comments: 34,
    status: 'Published',
    performance: 'Excellent'
  },
  {
    id: 10,
    title: 'AI Prompt Engineering Tutor',
    content: 'Teach best practices for prompt engineering. Explain techniques like chain-of-thought, few-shot learning, role prompting, and context optimization. Provide examples and exercises to improve prompt quality.',
    category: 'Education',
    categoryIcon: '🎓',
    tags: ['prompt engineering', 'ai', 'learning'],
    createdAt: '2025-09-05',
    updatedAt: '2025-09-05',
    views: 298,
    likes: 21,
    comments: 5,
    status: 'Private',
    performance: 'Average'
  }
];

const stats = [
  { label: 'Total Prompts', value: '10', icon: Sparkles, color: 'from-[#0071e3] to-[#005bb5]' },
  { label: 'Total Views', value: '10.2K', icon: Eye, color: 'from-[#34c759] to-[#248a3d]' },
  { label: 'Total Likes', value: '726', icon: Heart, color: 'from-[#ff2d55] to-[#ff375f]' },
  { label: 'Avg. Performance', value: 'Good', icon: TrendingUp, color: 'from-[#af52de] to-[#8e44ad]' }
];

export default function MyPromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Published' | 'Draft' | 'Private'>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'likes'>('recent');

  const statuses: ('All' | 'Published' | 'Draft' | 'Private')[] = ['All', 'Published', 'Draft', 'Private'];
  const categories = ['All', 'Development', 'Marketing', 'Writing', 'Data Science', 'Design', 'Business', 'Finance', 'Education'];

  const filteredPrompts = myPrompts
    .filter(prompt => {
      const matchesSearch = searchQuery === '' || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = selectedStatus === 'All' || prompt.status === selectedStatus;
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'recent':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const getStatusColor = (status: MyPrompt['status']) => {
    switch (status) {
      case 'Published': return 'text-[#34c759] bg-[#34c759]/10';
      case 'Draft': return 'text-[#ff9500] bg-[#ff9500]/10';
      case 'Private': return 'text-[#86868b] bg-[#86868b]/10';
    }
  };

  const getPerformanceColor = (performance: MyPrompt['performance']) => {
    switch (performance) {
      case 'Excellent': return 'text-[#34c759]';
      case 'Good': return 'text-[#0071e3]';
      case 'Average': return 'text-[#ff9500]';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10">
        
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-2">
                My Prompts
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#86868b]">
                Manage and track your created prompts
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#0071e3] text-white rounded-xl font-medium text-sm hover:bg-[#005bb5] transition-all shadow-sm hover:shadow-md whitespace-nowrap">
              <Plus className="w-5 h-5" strokeWidth={2} />
              Create New Prompt
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <p className="text-3xl font-semibold text-[#1d1d1f] mb-1">{stat.value}</p>
              <p className="text-sm text-[#86868b]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm mb-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" />
            <input
              type="text"
              placeholder="Search prompts or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7]/40 rounded-xl text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-[#86868b] mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedStatus === status
                        ? 'bg-[#0071e3] text-white shadow-sm'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-[#86868b] mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f5f7] border border-[#d2d2d7]/40 rounded-xl text-[#1d1d1f] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-[#86868b] mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 bg-[#f5f5f7] border border-[#d2d2d7]/40 rounded-xl text-[#1d1d1f] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prompts List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#1d1d1f]">
              {filteredPrompts.length} {filteredPrompts.length === 1 ? 'Prompt' : 'Prompts'}
            </h2>
          </div>

          <div className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white rounded-2xl border border-[#d2d2d7]/40 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center text-2xl flex-shrink-0">
                        {prompt.categoryIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                            {prompt.title}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(prompt.status)}`}>
                            {prompt.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#86868b] line-clamp-2 mb-3">
                          {prompt.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {prompt.tags.map((tag, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-lg">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="p-2 hover:bg-[#f5f5f7] rounded-lg transition-colors flex-shrink-0">
                      <MoreVertical className="w-5 h-5 text-[#86868b]" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#d2d2d7]/40">
                    <div className="flex items-center gap-6 text-sm text-[#86868b]">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        {prompt.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4" />
                        {prompt.likes}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        {prompt.comments}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(prompt.updatedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Target className="w-4 h-4" />
                        <span className={`font-medium ${getPerformanceColor(prompt.performance)}`}>
                          {prompt.performance}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f7] text-[#1d1d1f] rounded-lg text-sm font-medium hover:bg-[#e8e8ed] transition-all">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f7] text-[#ff3b30] rounded-lg text-sm font-medium hover:bg-[#ff3b30]/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#86868b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">No prompts found</h3>
              <p className="text-[#86868b] mb-6">Try adjusting your filters or search query</p>
              <button className="px-6 py-3 bg-[#0071e3] text-white rounded-xl font-medium hover:bg-[#005bb5] transition-all">
                Create Your First Prompt
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
