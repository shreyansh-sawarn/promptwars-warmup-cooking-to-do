import { NextResponse } from 'next/server';
import { generateMealPlan } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic input validation
    if (!body || !body.budget || !body.dayDescription) {
      return NextResponse.json(
        { error: 'Missing required fields (budget, dayDescription)' },
        { status: 400 }
      );
    }

    const mealPlan = await generateMealPlan(body);

    return NextResponse.json(mealPlan, { status: 200 });
  } catch (error: unknown) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
