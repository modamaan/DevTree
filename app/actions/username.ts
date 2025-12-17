'use server';

import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function checkUsernameAvailability(username: string) {
    try {
        // Validate username format
        if (!username || username.length < 3 || username.length > 30) {
            return { available: false, error: 'Invalid username length' };
        }

        if (!/^[a-z0-9-_]{3,30}$/.test(username)) {
            return { available: false, error: 'Invalid username format' };
        }

        // Check if username exists
        const existing = await db.query.profiles.findFirst({
            where: eq(profiles.username, username),
        });

        return {
            available: !existing,
            username
        };
    } catch (error: any) {
        console.error('Error checking username:', error);
        return { available: false, error: 'Failed to check username' };
    }
}
