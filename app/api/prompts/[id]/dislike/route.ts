import { NextResponse } from 'next/server';
import { dislikePrompt, getPromptById } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const promptId = parseInt(params.id);
    
    dislikePrompt(promptId);
    const updatedPrompt = getPromptById(promptId);
    
    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error('Error disliking prompt:', error);
    return NextResponse.json({ error: 'Failed to dislike prompt' }, { status: 500 });
  }
}
