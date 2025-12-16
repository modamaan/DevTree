'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { techStack } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { techStackSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function addTechnology(formData: FormData) {
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
            technology: formData.get('technology') as string,
            category: formData.get('category') as 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other',
        };

        const validated = techStackSchema.parse(data);

        // Get current max order
        const maxOrderResult = await db.query.techStack.findMany({
            where: eq(techStack.userId, user.id),
            orderBy: (techStack, { desc }) => [desc(techStack.order)],
            limit: 1,
        });

        const newOrder = maxOrderResult[0]?.order !== undefined ? maxOrderResult[0].order + 1 : 0;

        await db.insert(techStack).values({
            userId: user.id,
            ...validated,
            order: newOrder,
        });

        revalidatePath('/dashboard/tech-stack');
        return { success: true };
    } catch (error: any) {
        console.error('Error adding technology:', error);
        return { error: error.message || 'Failed to add technology' };
    }
}

export async function removeTechnology(techId: string) {
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

        await db.delete(techStack).where(and(eq(techStack.id, techId), eq(techStack.userId, user.id)));

        revalidatePath('/dashboard/tech-stack');
        return { success: true };
    } catch (error: any) {
        console.error('Error removing technology:', error);
        return { error: error.message || 'Failed to remove technology' };
    }
}
