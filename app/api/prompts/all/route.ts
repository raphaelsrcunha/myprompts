import { NextResponse } from 'next/server';
import { getAllPrompts } from '@/lib/db';

export async function GET() {
  try {
    const prompts = getAllPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
  }
}
