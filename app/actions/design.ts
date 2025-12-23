'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const designSchema = z.object({
    themeId: z.string().min(1),
    wallpaperType: z.enum(['solid', 'gradient', 'blur', 'pattern']),
    wallpaperValue: z.string().optional(),
    buttonStyle: z.enum(['rounded', 'pill', 'square', 'outline']),
    buttonColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    fontFamily: z.enum(['mono', 'sans', 'serif']),
    headerStyle: z.enum(['terminal', 'code_editor', 'git_commit', 'readme', 'console_log']),
});

export async function updateDesign(formData: FormData) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: 'Unauthorized' };
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
            with: {
                profile: true,
            },
        });

        if (!user || !user.profile) {
            return { error: 'User not found' };
        }

        const data = {
            themeId: formData.get('themeId') as string,
            wallpaperType: formData.get('wallpaperType') as string,
            wallpaperValue: formData.get('wallpaperValue') as string || undefined,
            buttonStyle: formData.get('buttonStyle') as string,
            buttonColor: formData.get('buttonColor') as string,
            fontFamily: formData.get('fontFamily') as string,
            headerStyle: formData.get('headerStyle') as string,
        };

        const validated = designSchema.parse(data);

        await db
            .update(profiles)
            .set({
                themeId: validated.themeId,
                wallpaperType: validated.wallpaperType,
                wallpaperValue: validated.wallpaperValue || null,
                buttonStyle: validated.buttonStyle,
                buttonColor: validated.buttonColor,
                fontFamily: validated.fontFamily,
                headerStyle: validated.headerStyle,
                updatedAt: new Date(),
            })
            .where(eq(profiles.id, user.profile.id));

        revalidatePath('/dashboard/design');
        revalidatePath(`/u/${user.profile.username}`);

        return { success: true };
    } catch (error: any) {
        console.error('Error updating design:', error);
        if (error instanceof z.ZodError) {
            return { error: 'Invalid design settings' };
        }
        return { error: error.message || 'Failed to update design' };
    }
}

export async function getDesignSettings() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return null;
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
            with: {
                profile: true,
            },
        });

        if (!user || !user.profile) {
            return null;
        }

        return {
            themeId: user.profile.themeId || 'terminal',
            wallpaperType: user.profile.wallpaperType || 'gradient',
            wallpaperValue: user.profile.wallpaperValue || null,
            buttonStyle: user.profile.buttonStyle || 'rounded',
            buttonColor: user.profile.buttonColor || '#22c55e',
            fontFamily: user.profile.fontFamily || 'mono',
            headerStyle: user.profile.headerStyle || 'terminal',
        };
    } catch (error) {
        console.error('Error getting design settings:', error);
        return null;
    }
}
