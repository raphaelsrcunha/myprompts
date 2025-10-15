'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Award, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Play,
  Download,
  Star,
  ChevronRight,
  Sparkles,
  Brain,
  Zap,
  Target,
  Code,
  MessageSquare,
  Image as ImageIcon,
  Search
} from 'lucide-react';

type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type CourseCategory = 'Prompt Engineering' | 'Model Fine-tuning' | 'AI Ethics' | 'Tools & APIs' | 'Computer Vision' | 'NLP';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: CourseLevel;
  category: CourseCategory;
  modules: number;
  students: number;
  rating: number;
  progress?: number;
  thumbnail: string;
  skills: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Mastering Prompt Engineering',
    description: 'Learn advanced techniques to craft effective prompts for AI models. Understand context, tokens, and optimization strategies.',
    instructor: 'Dr. Sarah Chen',
    duration: '6h 30min',
    level: 'Intermediate',
    category: 'Prompt Engineering',
    modules: 12,
    students: 2847,
    rating: 4.9,
    progress: 45,
    thumbnail: '🎯',
    skills: ['Prompt Design', 'Context Management', 'Token Optimization', 'Chain-of-Thought'],
    isFeatured: true
  },
  {
    id: 2,
    title: 'Introduction to Large Language Models',
    description: 'Understand how LLMs work, their architecture, capabilities, and limitations. Perfect for beginners.',
    instructor: 'Prof. Michael Torres',
    duration: '4h 15min',
    level: 'Beginner',
    category: 'Prompt Engineering',
    modules: 8,
    students: 5241,
    rating: 4.8,
    thumbnail: '🧠',
    skills: ['AI Fundamentals', 'LLM Basics', 'Model Selection', 'Use Cases'],
    isNew: true
  },
  {
    id: 3,
    title: 'Fine-tuning GPT Models',
    description: 'Deep dive into model fine-tuning techniques. Learn how to customize AI models for specific tasks and domains.',
    instructor: 'Emily Rodriguez',
    duration: '8h 45min',
    level: 'Advanced',
    category: 'Model Fine-tuning',
    modules: 15,
    students: 1523,
    rating: 4.7,
    thumbnail: '⚙️',
    skills: ['Model Training', 'Dataset Preparation', 'Hyperparameter Tuning', 'Evaluation Metrics']
  },
  {
    id: 4,
    title: 'AI Ethics & Responsible AI',
    description: 'Explore ethical considerations in AI development and deployment. Learn about bias, fairness, and responsible practices.',
    instructor: 'Dr. James Wilson',
    duration: '3h 20min',
    level: 'Beginner',
    category: 'AI Ethics',
    modules: 6,
    students: 3891,
    rating: 4.9,
    thumbnail: '⚖️',
    skills: ['AI Ethics', 'Bias Detection', 'Fair AI', 'Privacy'],
    isFeatured: true
  },
  {
    id: 5,
    title: 'OpenAI API Masterclass',
    description: 'Complete guide to integrating OpenAI APIs in your applications. Build real-world AI-powered features.',
    instructor: 'Alex Kumar',
    duration: '5h 50min',
    level: 'Intermediate',
    category: 'Tools & APIs',
    modules: 10,
    students: 4127,
    rating: 4.8,
    thumbnail: '🔌',
    skills: ['API Integration', 'Authentication', 'Rate Limiting', 'Best Practices'],
    isNew: true
  },
  {
    id: 6,
    title: 'Computer Vision with AI',
    description: 'Learn image recognition, object detection, and visual AI applications using modern frameworks.',
    instructor: 'Dr. Lisa Park',
    duration: '7h 10min',
    level: 'Advanced',
    category: 'Computer Vision',
    modules: 14,
    students: 2156,
    rating: 4.7,
    thumbnail: '👁️',
    skills: ['Image Processing', 'Object Detection', 'CNN', 'Transfer Learning']
  },
  {
    id: 7,
    title: 'Natural Language Processing Essentials',
    description: 'Master NLP techniques including sentiment analysis, named entity recognition, and text classification.',
    instructor: 'Prof. David Zhang',
    duration: '6h 00min',
    level: 'Intermediate',
    category: 'NLP',
    modules: 11,
    students: 3452,
    rating: 4.8,
    thumbnail: '💬',
    skills: ['Text Processing', 'Sentiment Analysis', 'NER', 'Classification']
  },
  {
    id: 8,
    title: 'Building AI Chatbots',
    description: 'Create intelligent conversational agents. Learn dialogue management, intent recognition, and context handling.',
    instructor: 'Maria Santos',
    duration: '5h 30min',
    level: 'Intermediate',
    category: 'Tools & APIs',
    modules: 9,
    students: 2973,
    rating: 4.9,
    thumbnail: '🤖',
    skills: ['Chatbot Design', 'Intent Recognition', 'Dialogue Flow', 'Context Management'],
    isFeatured: true
  }
];

const stats = [
  { label: 'Active Courses', value: '24', icon: BookOpen, color: 'from-[#0071e3] to-[#005bb5]' },
  { label: 'Total Students', value: '26.2K', icon: Users, color: 'from-[#34c759] to-[#248a3d]' },
  { label: 'Hours of Content', value: '156', icon: Video, color: 'from-[#af52de] to-[#8e44ad]' },
  { label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'from-[#ff9500] to-[#ff6b00]' }
];

const learningPaths = [
  {
    name: 'Prompt Engineer',
    courses: 4,
    duration: '18h',
    icon: Target,
    color: 'bg-gradient-to-br from-[#0071e3] to-[#005bb5]'
  },
  {
    name: 'AI Developer',
    courses: 6,
    duration: '32h',
    icon: Code,
    color: 'bg-gradient-to-br from-[#34c759] to-[#248a3d]'
  },
  {
    name: 'ML Specialist',
    courses: 5,
    duration: '28h',
    icon: Brain,
    color: 'bg-gradient-to-br from-[#af52de] to-[#8e44ad]'
  }
];

export default function AITrainingPage() {
  const [selectedLevel, setSelectedLevel] = useState<'All' | CourseLevel>('All');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const levels: ('All' | CourseLevel)[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const categories: ('All' | CourseCategory)[] = ['All', 'Prompt Engineering', 'Model Fine-tuning', 'AI Ethics', 'Tools & APIs', 'Computer Vision', 'NLP'];

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: CourseLevel) => {
    switch (level) {
      case 'Beginner': return 'text-[#34c759] bg-[#34c759]/10';
      case 'Intermediate': return 'text-[#0071e3] bg-[#0071e3]/10';
      case 'Advanced': return 'text-[#af52de] bg-[#af52de]/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10">
        
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
                AI Training
              </h1>
            </div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-[#86868b] max-w-3xl">
            Master artificial intelligence with expert-led courses. From prompt engineering to model fine-tuning, elevate your AI skills.
          </p>
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

        {/* Learning Paths */}
        <div className="mb-8 lg:mb-10">
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningPaths.map((path, index) => (
              <button
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className={`w-12 h-12 rounded-xl ${path.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <path.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{path.name}</h3>
                <div className="flex items-center gap-4 text-sm text-[#86868b]">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.courses} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[#0071e3] font-medium text-sm group-hover:gap-3 transition-all">
                  Start Learning
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/40 shadow-sm mb-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" />
            <input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7]/40 rounded-xl text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
            />
          </div>

          {/* Level Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#86868b] mb-2">Level</label>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-[#0071e3] text-white shadow-sm'
                      : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-[#86868b] mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0071e3] text-white shadow-sm'
                      : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#1d1d1f]">
              {selectedLevel === 'All' && selectedCategory === 'All' && searchQuery === ''
                ? 'All Courses'
                : `${filteredCourses.length} ${filteredCourses.length === 1 ? 'Course' : 'Courses'} Found`}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#d2d2d7]/40 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="p-6">
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center text-3xl">
                        {course.thumbnail}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {course.isNew && (
                            <span className="px-2 py-0.5 bg-[#34c759]/10 text-[#34c759] text-xs font-semibold rounded-full">
                              NEW
                            </span>
                          )}
                          {course.isFeatured && (
                            <span className="px-2 py-0.5 bg-[#ff9500]/10 text-[#ff9500] text-xs font-semibold rounded-full">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                          {course.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#86868b] mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Instructor & Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#86868b]">
                    <span>👨‍🏫 {course.instructor}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#ff9500] fill-[#ff9500]" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="px-3 py-1 bg-[#f5f5f7] text-[#86868b] text-xs font-medium rounded-full">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#d2d2d7]/40">
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1 text-[#86868b]">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[#86868b]">
                        <BookOpen className="w-4 h-4" />
                        {course.modules} modules
                      </span>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0071e3] text-white rounded-full text-sm font-medium hover:bg-[#005bb5] transition-all group/btn">
                      {course.progress ? (
                        <>
                          Continue
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                        </>
                      ) : (
                        <>
                          Start Course
                          <Play className="w-4 h-4" strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Progress Bar (if applicable) */}
                  {course.progress && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#86868b]">Progress</span>
                        <span className="text-xs font-semibold text-[#0071e3]">{course.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#0071e3] to-[#005bb5] rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#86868b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">No courses found</h3>
              <p className="text-[#86868b]">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
