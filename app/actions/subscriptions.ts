'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { subscriptions, features } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Check if user has access to a specific feature
 * Now simplified: if user paid for public link, they get ALL features
 */
export async function hasFeatureAccess(featureName: string): Promise<boolean> {
    try {
        const { userId } = await auth();

        if (!userId) {
            return false;
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
            with: {
                profile: true,
            },
        });

        if (!user?.profile) {
            return false;
        }

        // If public link is active (user paid ₹20), they have access to ALL features
        return user.profile.isPublicLinkActive ?? false;
    } catch (error) {
        console.error('Error checking feature access:', error);
        return false;
    }
}

/**
 * Get user's active subscriptions
 */
export async function getUserSubscriptions() {
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

        const userSubscriptions = await db.query.subscriptions.findMany({
            where: and(
                eq(subscriptions.userId, user.id),
                eq(subscriptions.status, 'active')
            ),
            with: {
                feature: true,
            },
        });

        return { success: true, subscriptions: userSubscriptions };
    } catch (error: any) {
        console.error('Error fetching subscriptions:', error);
        return { error: error.message || 'Failed to fetch subscriptions' };
    }
}

/**
 * Get all available features
 */
export async function getAvailableFeatures() {
    try {
        const allFeatures = await db.query.features.findMany({
            where: eq(features.isActive, true),
        });

        return { success: true, features: allFeatures };
    } catch (error: any) {
        console.error('Error fetching features:', error);
        return { error: error.message || 'Failed to fetch features' };
    }
}
