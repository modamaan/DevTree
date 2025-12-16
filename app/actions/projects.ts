'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { projectSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
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

        const techStackStr = formData.get('techStack') as string;
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string || undefined,
            techStack: techStackStr ? techStackStr.split(',').map(t => t.trim()) : [],
            githubUrl: formData.get('githubUrl') as string || undefined,
            liveUrl: formData.get('liveUrl') as string || undefined,
            imageUrl: formData.get('imageUrl') as string || undefined,
        };

        const validated = projectSchema.parse(data);

        // Get current max order
        const maxOrderResult = await db.query.projects.findMany({
            where: eq(projects.userId, user.id),
            orderBy: (projects, { desc }) => [desc(projects.order)],
            limit: 1,
        });

        const newOrder = maxOrderResult[0]?.order !== undefined ? maxOrderResult[0].order + 1 : 0;

        await db.insert(projects).values({
            userId: user.id,
            ...validated,
            order: newOrder,
        });

        revalidatePath('/dashboard/projects');
        return { success: true };
    } catch (error: any) {
        console.error('Error creating project:', error);
        return { error: error.message || 'Failed to create project' };
    }
}

export async function updateProject(projectId: string, formData: FormData) {
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

        const techStackStr = formData.get('techStack') as string;
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string || undefined,
            techStack: techStackStr ? techStackStr.split(',').map(t => t.trim()) : [],
            githubUrl: formData.get('githubUrl') as string || undefined,
            liveUrl: formData.get('liveUrl') as string || undefined,
            imageUrl: formData.get('imageUrl') as string || undefined,
        };

        const validated = projectSchema.parse(data);

        await db
            .update(projects)
            .set(validated)
            .where(and(eq(projects.id, projectId), eq(projects.userId, user.id)));

        revalidatePath('/dashboard/projects');
        return { success: true };
    } catch (error: any) {
        console.error('Error updating project:', error);
        return { error: error.message || 'Failed to update project' };
    }
}

export async function deleteProject(projectId: string) {
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

        await db.delete(projects).where(and(eq(projects.id, projectId), eq(projects.userId, user.id)));

        revalidatePath('/dashboard/projects');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting project:', error);
        return { error: error.message || 'Failed to delete project' };
    }
}
