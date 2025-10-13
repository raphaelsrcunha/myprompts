import { NextResponse } from 'next/server';
import { getAllCategories, addCategory } from '@/lib/db';

export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, icon, color } = body;

    if (!name || !icon || !color) {
      return NextResponse.json(
        { error: 'Name, icon, and color are required' },
        { status: 400 }
      );
    }

    const category = addCategory(name, icon, color);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
