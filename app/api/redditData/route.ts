import { NextResponse } from 'next/server';
import { getRedditData } from '@/components/redditapi/redditApi'; // Reddit veri almak için import ettik

export async function GET() {
  try {
    // Reddit verilerini al
    const posts = await getRedditData();
    
    // Veriyi başarılı bir şekilde döndür
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Reddit verisi alınırken bir hata oluştu:', error);
    return NextResponse.json({ error: 'Reddit verisi alınırken bir hata oluştu' }, { status: 500 });
  }
}
