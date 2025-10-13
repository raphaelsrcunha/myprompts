import { NextResponse } from 'next/server';
import { likePrompt, getPromptById } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const promptId = parseInt(params.id);
    
    likePrompt(promptId);
    const updatedPrompt = getPromptById(promptId);
    
    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error('Error liking prompt:', error);
    return NextResponse.json({ error: 'Failed to like prompt' }, { status: 500 });
  }
}
