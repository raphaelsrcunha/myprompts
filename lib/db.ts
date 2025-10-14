import Database from 'better-sqlite3';
import path from 'path';

export interface Prompt {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  tags?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

let db: Database.Database;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'prompts.db');
    db = new Database(dbPath);
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        icon TEXT NOT NULL,
        color TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER NOT NULL DEFAULT 0,
        dislikes INTEGER NOT NULL DEFAULT 0,
        tags TEXT
      );
    `);
    
    // Add tags column if it doesn't exist (migration for existing databases)
    try {
      const columns = db.prepare("PRAGMA table_info(prompts)").all() as any[];
      const hasTagsColumn = columns.some(col => col.name === 'tags');
      if (!hasTagsColumn) {
        db.exec('ALTER TABLE prompts ADD COLUMN tags TEXT');
        console.log('Added tags column to prompts table');
      }
    } catch (error) {
      console.error('Error checking/adding tags column:', error);
    }
    
    // Check if categories exist
    const catCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
    
    // Populate default categories if empty
    if (catCount.count === 0) {
      const insertCat = db.prepare('INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)');
      
      const defaultCategories = [
        { name: 'Code', icon: 'Code', color: 'blue' },
        { name: 'Productivity', icon: 'Briefcase', color: 'green' },
        { name: 'Writing', icon: 'FileText', color: 'purple' },
        { name: 'Analysis', icon: 'BarChart', color: 'orange' },
        { name: 'Creativity', icon: 'Lightbulb', color: 'pink' },
      ];
      
      for (const cat of defaultCategories) {
        insertCat.run(cat.name, cat.icon, cat.color);
      }
    }
    
    // Check if prompts exist
    const count = db.prepare('SELECT COUNT(*) as count FROM prompts').get() as { count: number };
    
    // Populate with mock data if empty
    if (count.count === 0) {
      const insert = db.prepare('INSERT INTO prompts (title, content, category, author, createdAt, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?)');
      
      const mockPrompts = [
        {
          title: 'Refactor code',
          content: 'Analyze the code below and suggest improvements for readability, performance, and best practices:\n\n[PASTE YOUR CODE HERE]',
          category: 'Code',
          author: 'John Doe',
          createdAt: '2025-10-01T10:00:00.000Z',
          likes: 45,
          dislikes: 3
        },
        {
          title: 'Create unit tests',
          content: 'Create complete unit tests for the following function, including success cases, error cases, and edge cases:\n\n[PASTE YOUR FUNCTION HERE]',
          category: 'Code',
          author: 'Sarah Smith',
          createdAt: '2025-10-02T14:30:00.000Z',
          likes: 38,
          dislikes: 2
        },
        {
          title: 'Explain technical concept',
          content: 'Explain the concept of [CONCEPT] in a clear and didactic way, with practical examples and simple analogies.',
          category: 'Code',
          author: 'Mike Johnson',
          createdAt: '2025-10-03T09:15:00.000Z',
          likes: 52,
          dislikes: 1
        },
        {
          title: 'Summarize meeting',
          content: 'Analyze the meeting transcript below and create an executive summary with:\n- Main topics discussed\n- Decisions made\n- Action items and assignees\n- Next steps\n\n[PASTE TRANSCRIPT HERE]',
          category: 'Productivity',
          author: 'Emma Wilson',
          createdAt: '2025-10-04T11:20:00.000Z',
          likes: 67,
          dislikes: 4
        },
        {
          title: 'Create project checklist',
          content: 'Create a detailed checklist to manage a [PROJECT TYPE] project, including all phases from planning to delivery.',
          category: 'Productivity',
          author: 'David Brown',
          createdAt: '2025-10-05T16:45:00.000Z',
          likes: 41,
          dislikes: 2
        },
        {
          title: 'Write professional email',
          content: 'Write a professional email to [RECIPIENT] about [SUBJECT], maintaining a [FORMAL/CASUAL] and objective tone.',
          category: 'Productivity',
          author: 'Lisa Anderson',
          createdAt: '2025-10-06T08:00:00.000Z',
          likes: 89,
          dislikes: 5
        },
        {
          title: 'Translate technical text',
          content: 'Translate the technical text below from [SOURCE LANGUAGE] to [TARGET LANGUAGE], maintaining accuracy of technical terms:\n\n[PASTE TEXT HERE]',
          category: 'Writing',
          author: 'Carlos Martinez',
          createdAt: '2025-10-07T13:30:00.000Z',
          likes: 33,
          dislikes: 1
        },
        {
          title: 'Improve writing',
          content: 'Analyze the text below and suggest improvements in clarity, cohesion, and grammar without changing the original meaning:\n\n[PASTE YOUR TEXT HERE]',
          category: 'Writing',
          author: 'Anna Taylor',
          createdAt: '2025-10-08T10:10:00.000Z',
          likes: 76,
          dislikes: 3
        },
        {
          title: 'Create social media content',
          content: 'Create 5 posts for [SOCIAL MEDIA] about [TOPIC], with a [CASUAL/PROFESSIONAL] tone and including relevant hashtags.',
          category: 'Writing',
          author: 'Tom Harris',
          createdAt: '2025-10-09T15:25:00.000Z',
          likes: 94,
          dislikes: 6
        },
        {
          title: 'Data analysis',
          content: 'Analyze the data below and provide insights, identified patterns, and strategic recommendations:\n\n[PASTE DATA HERE]',
          category: 'Analysis',
          author: 'Rachel Green',
          createdAt: '2025-10-10T12:00:00.000Z',
          likes: 58,
          dislikes: 2
        },
        {
          title: 'Compare alternatives',
          content: 'Compare the following alternatives [OPTION A] vs [OPTION B] considering criteria such as cost, benefits, risks, and recommend the best choice.',
          category: 'Analysis',
          author: 'James Lee',
          createdAt: '2025-10-11T09:40:00.000Z',
          likes: 44,
          dislikes: 1
        },
        {
          title: 'Brainstorm ideas',
          content: 'Generate 10 creative and innovative ideas for [PROBLEM/OBJECTIVE], exploring different angles and approaches.',
          category: 'Creativity',
          author: 'Sophie Chen',
          createdAt: '2025-10-12T14:15:00.000Z',
          likes: 71,
          dislikes: 3
        },
        {
          title: 'Create storytelling',
          content: 'Create an engaging narrative about [TOPIC] that emotionally connects with the audience and conveys [MESSAGE].',
          category: 'Creativity',
          author: 'Oliver White',
          createdAt: '2025-10-13T11:50:00.000Z',
          likes: 103,
          dislikes: 7
        }
      ];
      
      for (const prompt of mockPrompts) {
        insert.run(prompt.title, prompt.content, prompt.category, prompt.author, prompt.createdAt, prompt.likes, prompt.dislikes);
      }
    }
  }
  
  return db;
}

export function getAllPrompts(): Prompt[] {
  const db = getDatabase();
  return db.prepare('SELECT * FROM prompts ORDER BY category, title').all() as Prompt[];
}

export function getPromptsByCategory(category: string): Prompt[] {
  const db = getDatabase();
  return db.prepare('SELECT * FROM prompts WHERE category = ? ORDER BY title').all(category) as Prompt[];
}

export function getCategories(): string[] {
  const db = getDatabase();
  const result = db.prepare('SELECT DISTINCT category FROM prompts ORDER BY category').all() as { category: string }[];
  return result.map(r => r.category);
}

export function addPrompt(title: string, content: string, category: string, author: string, tags?: string): Prompt {
  const db = getDatabase();
  const createdAt = new Date().toISOString();
  const result = db.prepare('INSERT INTO prompts (title, content, category, author, createdAt, likes, dislikes, tags) VALUES (?, ?, ?, ?, ?, 0, 0, ?)').run(title, content, category, author, createdAt, tags || null);
  return { id: result.lastInsertRowid as number, title, content, category, author, createdAt, likes: 0, dislikes: 0, tags };
}

// ========== Category CRUD ==========

export function getAllCategories(): Category[] {
  const db = getDatabase();
  return db.prepare('SELECT * FROM categories ORDER BY name').all() as Category[];
}

export function getCategoryById(id: number): Category | undefined {
  const db = getDatabase();
  return db.prepare('SELECT * FROM categories WHERE id = ?').get(id) as Category | undefined;
}

export function getCategoryByName(name: string): Category | undefined {
  const db = getDatabase();
  return db.prepare('SELECT * FROM categories WHERE name = ?').get(name) as Category | undefined;
}

export function addCategory(name: string, icon: string, color: string): Category {
  const db = getDatabase();
  const result = db.prepare('INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)').run(name, icon, color);
  return { id: result.lastInsertRowid as number, name, icon, color };
}

export function updateCategory(id: number, name: string, icon: string, color: string): void {
  const db = getDatabase();
  // Get old category
  const oldCategory = getCategoryById(id);
  
  // Update category
  db.prepare('UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?').run(name, icon, color, id);
  
  // Update prompts that use this category (if name changed)
  if (oldCategory && oldCategory.name !== name) {
    db.prepare('UPDATE prompts SET category = ? WHERE category = ?').run(name, oldCategory.name);
  }
}

export function deleteCategory(id: number): void {
  const db = getDatabase();
  const category = getCategoryById(id);
  
  if (category) {
    // Delete prompts in this category
    db.prepare('DELETE FROM prompts WHERE category = ?').run(category.name);
    // Delete category
    db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  }
}

export function getCategoriesWithCount(): Array<Category & { count: number }> {
  const db = getDatabase();
  const result = db.prepare(`
    SELECT c.*, COUNT(p.id) as count
    FROM categories c
    LEFT JOIN prompts p ON c.name = p.category
    GROUP BY c.id
    ORDER BY c.name
  `).all() as Array<Category & { count: number }>;
  
  return result;
}

// ========== Like/Dislike ==========

export function likePrompt(id: number): void {
  const db = getDatabase();
  db.prepare('UPDATE prompts SET likes = likes + 1 WHERE id = ?').run(id);
}

export function dislikePrompt(id: number): void {
  const db = getDatabase();
  db.prepare('UPDATE prompts SET dislikes = dislikes + 1 WHERE id = ?').run(id);
}

export function getPromptById(id: number): Prompt | undefined {
  const db = getDatabase();
  return db.prepare('SELECT * FROM prompts WHERE id = ?').get(id) as Prompt | undefined;
}
