'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * Mark the share popup as seen for the current user
 */
export async function markSharePopupAsSeen() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        // Update the user's hasSeenSharePopup field
        await db
            .update(users)
            .set({ hasSeenSharePopup: true })
            .where(eq(users.clerkId, userId));

        // Revalidate the dashboard page to reflect the change
        revalidatePath('/dashboard');

        return { success: true };
    } catch (error) {
        console.error('Error marking share popup as seen:', error);
        return { success: false, error: 'Failed to update popup status' };
    }
}
