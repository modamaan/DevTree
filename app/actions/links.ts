'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { linkSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function createLink(formData: FormData) {
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
            title: formData.get('title') as string,
            url: formData.get('url') as string,
            enabled: formData.get('enabled') === 'true',
            highlighted: formData.get('highlighted') === 'true',
        };

        const validated = linkSchema.parse(data);

        // Get current max order
        const maxOrderResult = await db.query.links.findMany({
            where: eq(links.userId, user.id),
            orderBy: (links, { desc }) => [desc(links.order)],
            limit: 1,
        });

        const newOrder = maxOrderResult[0]?.order !== undefined ? maxOrderResult[0].order + 1 : 0;

        await db.insert(links).values({
            userId: user.id,
            ...validated,
            order: newOrder,
        });

        revalidatePath('/dashboard/links');
        return { success: true };
    } catch (error: any) {
        console.error('Error creating link:', error);
        return { error: error.message || 'Failed to create link' };
    }
}

export async function updateLink(linkId: string, formData: FormData) {
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
            title: formData.get('title') as string,
            url: formData.get('url') as string,
            enabled: formData.get('enabled') === 'true',
            highlighted: formData.get('highlighted') === 'true',
        };

        const validated = linkSchema.parse(data);

        await db
            .update(links)
            .set(validated)
            .where(and(eq(links.id, linkId), eq(links.userId, user.id)));

        revalidatePath('/dashboard/links');
        return { success: true };
    } catch (error: any) {
        console.error('Error updating link:', error);
        return { error: error.message || 'Failed to update link' };
    }
}

export async function deleteLink(linkId: string) {
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

        await db.delete(links).where(and(eq(links.id, linkId), eq(links.userId, user.id)));

        revalidatePath('/dashboard/links');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting link:', error);
        return { error: error.message || 'Failed to delete link' };
    }
}

export async function reorderLinks(linkOrders: { id: string; order: number }[]) {
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

        // Update each link's order
        for (const { id, order } of linkOrders) {
            await db
                .update(links)
                .set({ order })
                .where(and(eq(links.id, id), eq(links.userId, user.id)));
        }

        revalidatePath('/dashboard/links');
        return { success: true };
    } catch (error: any) {
        console.error('Error reordering links:', error);
        return { error: error.message || 'Failed to reorder links' };
    }
}
