import { NextResponse } from 'next/server';
import { addPrompt } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { title, content, category, author } = await request.json();

    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { error: 'Title, content, category, and author are required' },
        { status: 400 }
      );
    }

    const prompt = addPrompt(title, content, category, author);

    return NextResponse.json(prompt, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}
