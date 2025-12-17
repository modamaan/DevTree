import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    console.log('[API] Username check called');

    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        console.log('[API] Checking username:', username);

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        // Validate username format
        if (!/^[a-z0-9-_]{3,30}$/.test(username)) {
            console.log('[API] Invalid format');
            return NextResponse.json({
                available: false,
                error: 'Invalid username format'
            }, { status: 400 });
        }

        // Check if username exists
        const existing = await db.query.profiles.findFirst({
            where: eq(profiles.username, username),
        });

        console.log('[API] Username available:', !existing);

        return NextResponse.json({
            available: !existing,
            username
        });
    } catch (error: any) {
        console.error('[API] Error checking username:', error);
        return NextResponse.json(
            { error: 'Failed to check username availability' },
            { status: 500 }
        );
    }
}
