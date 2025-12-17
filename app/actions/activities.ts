'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { currentActivities } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const activitySchema = z.object({
    name: z.string().min(1, 'Activity name is required').max(100, 'Activity name is too long'),
    type: z.enum(['building', 'learning']),
});

export async function getActivities() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: 'Unauthorized' };
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        const activities = await db.query.currentActivities.findMany({
            where: eq(currentActivities.userId, user.id),
            orderBy: (currentActivities, { desc }) => [desc(currentActivities.createdAt)],
        });

        return { success: true, activities };
    } catch (error: any) {
        console.error('Error fetching activities:', error);
        return { error: error.message || 'Failed to fetch activities' };
    }
}

export async function addActivity(formData: FormData) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: 'Unauthorized' };
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        const data = {
            name: formData.get('name') as string,
            type: formData.get('type') as 'building' | 'learning',
        };

        const validated = activitySchema.parse(data);

        await db.insert(currentActivities).values({
            userId: user.id,
            ...validated,
        });

        revalidatePath('/dashboard/profile');
        return { success: true };
    } catch (error: any) {
        console.error('Error adding activity:', error);
        return { error: error.message || 'Failed to add activity' };
    }
}

export async function removeActivity(activityId: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: 'Unauthorized' };
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        await db
            .delete(currentActivities)
            .where(and(eq(currentActivities.id, activityId), eq(currentActivities.userId, user.id)));

        revalidatePath('/dashboard/profile');
        return { success: true };
    } catch (error: any) {
        console.error('Error removing activity:', error);
        return { error: error.message || 'Failed to remove activity' };
    }
}
