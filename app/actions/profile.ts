'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { profileSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
            with: { profile: true },
        });

        if (!user?.profile) {
            return { error: 'Profile not found' };
        }

        // Parse and validate form data
        const data = {
            username: formData.get('username') as string,
            displayName: formData.get('displayName') as string,
            bio: formData.get('bio') as string || undefined,
            location: formData.get('location') as string || undefined,
            openToWork: formData.get('openToWork') === 'true',
            freelanceAvailable: formData.get('freelanceAvailable') === 'true',
            theme: formData.get('theme') as 'terminal' | 'vscode',
        };

        const validated = profileSchema.parse(data);

        // Check if username is already taken (if changed)
        if (validated.username !== user.profile.username) {
            const existingProfile = await db.query.profiles.findFirst({
                where: eq(profiles.username, validated.username),
            });

            if (existingProfile) {
                return { error: 'Username already taken' };
            }
        }

        // Update profile
        await db
            .update(profiles)
            .set({
                ...validated,
                updatedAt: new Date(),
            })
            .where(eq(profiles.id, user.profile.id));

        revalidatePath('/dashboard/profile');
        revalidatePath(`/u/${validated.username}`);

        return { success: true };
    } catch (error: any) {
        console.error('Error updating profile:', error);
        return { error: error.message || 'Failed to update profile' };
    }
}
