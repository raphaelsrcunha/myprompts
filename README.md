# AI Prompts Repository

Web application built with Next.js 14 (App Router) and Tailwind CSS for managing and organizing AI prompts.

## Features

- 📚 Organize prompts by categories
- ✨ Create, edit, and delete custom categories
- 📝 Add new prompts with title, content, and category
- 📋 Copy prompts to clipboard with one click
- 🎨 Choose from 15 icons and 5 colors for categories
- 🔍 Filter prompts by category
- 💾 Local SQLite database

## Tech Stack

- **Next.js 14** - App Router with server and client components
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **SQLite** - Local database with better-sqlite3
- **Lucide Icons** - Beautiful icon library

## Project Structure

```
my-prompt-repo/
├── app/
│   ├── api/
│   │   ├── categories/         # Category CRUD API
│   │   │   ├── route.ts        # GET (all) and POST
│   │   │   └── [id]/route.ts   # GET, PUT, DELETE by ID
│   │   └── prompts/
│   │       └── route.ts        # POST new prompt
│   ├── category/[name]/
│   │   └── page.tsx           # Category detail page
│   ├── categories/
│   │   └── page.tsx           # Category management page
│   ├── new/
│   │   └── page.tsx           # New prompt form
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── CategoryCard.tsx       # Category card component
│   ├── CategoryModal.tsx      # Category create/edit modal
│   ├── Header.tsx             # Navigation header
│   └── PromptCard.tsx         # Prompt display card
├── lib/
│   └── db.ts                  # SQLite database layer
└── prompts.db                 # SQLite database file
```

## Routes

- `/` - Home page with category grid
- `/new` - Create new prompt
- `/categories` - Manage categories (create, edit, delete)
- `/category/[name]` - View all prompts in a category

## Database Schema

### Categories Table

```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL
)
```

### Prompts Table

```sql
CREATE TABLE prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL
)
```

## Design Philosophy

The application follows an Apple-inspired minimalist design with:

- Generous spacing and refined typography
- Rounded cards with subtle shadows
- Smooth animations and light transitions
- Clean, distraction-free interface
- Intuitive navigation

## Available Icons

- Bookmark, Code, FileText, Lightbulb, MessageSquare
- Zap, Target, TrendingUp, Star, Heart
- Music, Camera, Palette, Coffee, Sparkles

## Available Colors

- Blue (#3b82f6)
- Purple (#8b5cf6)
- Green (#10b981)
- Orange (#f59e0b)
- Pink (#ec4899)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Categories

The application comes with 5 pre-configured categories:

- **Code** - Programming and development prompts
- **Productivity** - Efficiency and organization prompts
- **Writing** - Content creation and editing prompts
- **Analysis** - Data analysis and research prompts
- **Creativity** - Creative and brainstorming prompts

## License

MIT
