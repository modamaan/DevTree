'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { experiences } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validation schema
const experienceSchema = z.object({
    company: z.string().min(1, 'Company name is required').max(100, 'Company name too long'),
    role: z.string().min(1, 'Role is required').max(100, 'Role too long'),
    employmentType: z.enum(['full-time', 'part-time', 'freelance', 'contract', 'internship'], {
        message: 'Invalid employment type',
    }),
    startDate: z.string().min(1, 'Start date is required').regex(/^\d{4}(-\d{2})?$/, 'Invalid date format (use YYYY or YYYY-MM)'),
    endDate: z.string().regex(/^\d{4}(-\d{2})?$/, 'Invalid date format (use YYYY or YYYY-MM)').optional().nullable(),
    description: z.string().max(1000, 'Description too long (max 1000 characters)').optional().nullable(),
    location: z.string().max(100, 'Location too long').optional().nullable(),
});

// Get all experiences for current user
export async function getExperiences() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { error: 'Unauthorized' };
        }

        const userExperiences = await db.query.experiences.findMany({
            where: (experiences, { eq }) => eq(experiences.userId, userId),
            orderBy: [desc(experiences.order)],
        });

        return { experiences: userExperiences };
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return { error: 'Failed to fetch experiences' };
    }
}

// Add new experience
export async function addExperience(formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        // Parse and validate form data
        const data = {
            company: formData.get('company') as string,
            role: formData.get('role') as string,
            employmentType: formData.get('employmentType') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string | null,
            description: formData.get('description') as string | null,
            location: formData.get('location') as string | null,
        };

        const validated = experienceSchema.parse(data);

        // Validate end date is after start date if provided
        if (validated.endDate) {
            const start = new Date(validated.startDate);
            const end = new Date(validated.endDate);
            if (end < start) {
                return { error: 'End date must be after start date' };
            }
        }

        // Get max order
        const maxOrder = await db.query.experiences.findFirst({
            where: (experiences, { eq }) => eq(experiences.userId, user.id),
            orderBy: (experiences, { desc }) => [desc(experiences.order)],
        });

        const newOrder = (maxOrder?.order ?? -1) + 1;

        // Insert experience
        await db.insert(experiences).values({
            userId: user.id,
            company: validated.company,
            role: validated.role,
            employmentType: validated.employmentType,
            startDate: validated.startDate,
            endDate: validated.endDate || null,
            description: validated.description || null,
            location: validated.location || null,
            order: newOrder,
        });

        revalidatePath('/dashboard/experience');
        revalidatePath('/u/[username]', 'page');

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.issues[0].message };
        }
        console.error('Error adding experience:', error);
        return { error: 'Failed to add experience' };
    }
}

// Update experience
export async function updateExperience(id: string, formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        // Parse and validate form data
        const data = {
            company: formData.get('company') as string,
            role: formData.get('role') as string,
            employmentType: formData.get('employmentType') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string | null,
            description: formData.get('description') as string | null,
            location: formData.get('location') as string | null,
        };

        const validated = experienceSchema.parse(data);

        // Validate end date is after start date if provided
        if (validated.endDate) {
            const start = new Date(validated.startDate);
            const end = new Date(validated.endDate);
            if (end < start) {
                return { error: 'End date must be after start date' };
            }
        }

        // Update experience
        await db
            .update(experiences)
            .set({
                company: validated.company,
                role: validated.role,
                employmentType: validated.employmentType,
                startDate: validated.startDate,
                endDate: validated.endDate || null,
                description: validated.description || null,
                location: validated.location || null,
            })
            .where(and(eq(experiences.id, id), eq(experiences.userId, user.id)));

        revalidatePath('/dashboard/experience');
        revalidatePath('/u/[username]', 'page');

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.issues[0].message };
        }
        console.error('Error updating experience:', error);
        return { error: 'Failed to update experience' };
    }
}

// Delete experience
export async function deleteExperience(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        // Delete experience
        await db
            .delete(experiences)
            .where(and(eq(experiences.id, id), eq(experiences.userId, user.id)));

        revalidatePath('/dashboard/experience');
        revalidatePath('/u/[username]', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error deleting experience:', error);
        return { error: 'Failed to delete experience' };
    }
}

// Reorder experiences
export async function reorderExperiences(items: { id: string; order: number }[]) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return { error: 'User not found' };
        }

        // Update order for each experience
        for (const item of items) {
            await db
                .update(experiences)
                .set({ order: item.order })
                .where(and(eq(experiences.id, item.id), eq(experiences.userId, user.id)));
        }

        revalidatePath('/dashboard/experience');
        revalidatePath('/u/[username]', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error reordering experiences:', error);
        return { error: 'Failed to reorder experiences' };
    }
}
