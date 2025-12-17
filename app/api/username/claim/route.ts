import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { username } = await req.json();

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        // Validate username format
        if (!/^[a-z0-9-_]{3,30}$/.test(username)) {
            return NextResponse.json({
                error: 'Invalid username format'
            }, { status: 400 });
        }

        // Check if username is already taken
        const existing = await db.query.profiles.findFirst({
            where: eq(profiles.username, username),
        });

        if (existing) {
            return NextResponse.json({
                error: 'Username is already taken'
            }, { status: 400 });
        }

        // Get user from database
        const user = await db.query.users.findFirst({
            where: eq(users.clerkId, userId),
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update profile with claimed username
        await db
            .update(profiles)
            .set({
                username,
                updatedAt: new Date(),
            })
            .where(eq(profiles.userId, user.id));

        return NextResponse.json({
            success: true,
            username
        });
    } catch (error: any) {
        console.error('Error claiming username:', error);
        return NextResponse.json(
            { error: 'Failed to claim username' },
            { status: 500 }
        );
    }
}
