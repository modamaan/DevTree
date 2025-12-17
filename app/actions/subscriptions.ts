'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { subscriptions, features } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Check if user has access to a specific feature
 */
export async function hasFeatureAccess(featureName: string): Promise<boolean> {
    try {
        const { userId } = await auth();

        if (!userId) {
            return false;
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return false;
        }

        // Get feature
        const feature = await db.query.features.findFirst({
            where: eq(features.name, featureName),
        });

        if (!feature) {
            return false;
        }

        // Check if user has active subscription
        const subscription = await db.query.subscriptions.findFirst({
            where: and(
                eq(subscriptions.userId, user.id),
                eq(subscriptions.featureId, feature.id),
                eq(subscriptions.status, 'active')
            ),
        });

        return !!subscription;
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
