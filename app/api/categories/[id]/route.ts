import { NextResponse } from 'next/server';
import { getCategoryById, updateCategory, deleteCategory } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = getCategoryById(parseInt(params.id));
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, icon, color } = body;

    if (!name || !icon || !color) {
      return NextResponse.json(
        { error: 'Name, icon, and color are required' },
        { status: 400 }
      );
    }

    updateCategory(parseInt(params.id), name, icon, color);
    return NextResponse.json({ message: 'Category updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    deleteCategory(parseInt(params.id));
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
