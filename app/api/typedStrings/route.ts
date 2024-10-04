// app/api/typedStrings/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate fetching strings from an external source
  const strings = ["Fast.", "Secure.", "Simple."];
  
  return NextResponse.json(strings);
}
