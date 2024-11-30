import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const { url } = await request.json();

    // Validate the URL input
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Generate a unique shortcode
    const shortCode = nanoid(8);

    // Save to the database
    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
        createdAt: new Date(), // Store as a Date object
      },
    });

    // Return the shortcode
    return NextResponse.json({ shortCode: shortenedUrl.shortCode });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
