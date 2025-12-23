'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { monetizationLinks, monetizationClicks, users } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Add a new monetization link
export async function addMonetizationLink(data: {
    category: 'product' | 'booking' | 'affiliate';
    title: string;
    description?: string;
    url: string;
    price?: number;
    coverImage?: string;
}) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
        if (!user) {
            return { error: 'User not found' };
        }

        // Get current max order
        const existingLinks = await db
            .select()
            .from(monetizationLinks)
            .where(and(
                eq(monetizationLinks.userId, user.id),
                eq(monetizationLinks.category, data.category)
            ));

        const maxOrder = existingLinks.length > 0
            ? Math.max(...existingLinks.map(l => l.order || 0))
            : -1;

        // Create new link
        const [newLink] = await db.insert(monetizationLinks).values({
            userId: user.id,
            category: data.category,
            title: data.title,
            description: data.description || null,
            url: data.url,
            price: data.price || null,
            coverImage: data.coverImage || null,
            order: maxOrder + 1,
        }).returning();

        revalidatePath('/dashboard/earn');
        revalidatePath(`/u/[username]`, 'page');

        return { success: true, link: newLink };
    } catch (error) {
        console.error('Error adding monetization link:', error);
        return { error: 'Failed to add link' };
    }
}

// Update a monetization link
export async function updateMonetizationLink(
    linkId: string,
    data: Partial<{
        title: string;
        description: string;
        url: string;
        price: number;
        coverImage: string;
        isActive: boolean;
    }>
) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
        if (!user) {
            return { error: 'User not found' };
        }

        // Verify ownership
        const [link] = await db
            .select()
            .from(monetizationLinks)
            .where(eq(monetizationLinks.id, linkId));

        if (!link || link.userId !== user.id) {
            return { error: 'Link not found or unauthorized' };
        }

        // Update link
        const [updatedLink] = await db
            .update(monetizationLinks)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(monetizationLinks.id, linkId))
            .returning();

        revalidatePath('/dashboard/earn');
        revalidatePath(`/u/[username]`, 'page');

        return { success: true, link: updatedLink };
    } catch (error) {
        console.error('Error updating monetization link:', error);
        return { error: 'Failed to update link' };
    }
}

// Delete a monetization link
export async function deleteMonetizationLink(linkId: string) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
        if (!user) {
            return { error: 'User not found' };
        }

        // Verify ownership
        const [link] = await db
            .select()
            .from(monetizationLinks)
            .where(eq(monetizationLinks.id, linkId));

        if (!link || link.userId !== user.id) {
            return { error: 'Link not found or unauthorized' };
        }

        // Delete link
        await db.delete(monetizationLinks).where(eq(monetizationLinks.id, linkId));

        revalidatePath('/dashboard/earn');
        revalidatePath(`/u/[username]`, 'page');

        return { success: true };
    } catch (error) {
        console.error('Error deleting monetization link:', error);
        return { error: 'Failed to delete link' };
    }
}

// Get user's monetization links (for dashboard)
export async function getMyMonetizationLinks() {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
        if (!user) {
            return { error: 'User not found' };
        }

        // Get all links
        const links = await db
            .select()
            .from(monetizationLinks)
            .where(eq(monetizationLinks.userId, user.id))
            .orderBy(monetizationLinks.order);

        // Group by category
        const grouped = {
            product: links.filter(l => l.category === 'product'),
            booking: links.filter(l => l.category === 'booking'),
            affiliate: links.filter(l => l.category === 'affiliate'),
        };

        // Calculate total clicks
        const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

        return {
            success: true,
            links: grouped,
            totalClicks,
            stats: {
                productClicks: grouped.product.reduce((sum, l) => sum + (l.clicks || 0), 0),
                bookingClicks: grouped.booking.reduce((sum, l) => sum + (l.clicks || 0), 0),
                affiliateClicks: grouped.affiliate.reduce((sum, l) => sum + (l.clicks || 0), 0),
            },
        };
    } catch (error) {
        console.error('Error getting monetization links:', error);
        return { error: 'Failed to get links' };
    }
}

// Get public monetization links (for profile page)
export async function getPublicMonetizationLinks(username: string) {
    try {
        // Get user by username
        const [profile] = await db.query.profiles.findMany({
            where: (profiles, { eq }) => eq(profiles.username, username),
            with: {
                user: true,
            },
        });

        if (!profile) {
            return { error: 'User not found' };
        }

        // Get active links only
        const links = await db
            .select()
            .from(monetizationLinks)
            .where(and(
                eq(monetizationLinks.userId, profile.userId),
                eq(monetizationLinks.isActive, true)
            ))
            .orderBy(monetizationLinks.order);

        // Group by category
        const grouped = {
            product: links.filter(l => l.category === 'product'),
            booking: links.filter(l => l.category === 'booking'),
            affiliate: links.filter(l => l.category === 'affiliate'),
        };

        return { success: true, links: grouped };
    } catch (error) {
        console.error('Error getting public monetization links:', error);
        return { error: 'Failed to get links' };
    }
}

// Track a click on a monetization link
export async function trackMonetizationClick(linkId: string, ipAddress?: string, userAgent?: string) {
    try {
        // Increment click counter
        await db
            .update(monetizationLinks)
            .set({
                clicks: sql`${monetizationLinks.clicks} + 1`,
            })
            .where(eq(monetizationLinks.id, linkId));

        // Log click event (optional - for detailed analytics)
        await db.insert(monetizationClicks).values({
            linkId,
            ipAddress: ipAddress || null,
            userAgent: userAgent || null,
        });

        return { success: true };
    } catch (error) {
        console.error('Error tracking click:', error);
        return { error: 'Failed to track click' };
    }
}

// Reorder monetization links
export async function reorderMonetizationLinks(linkIds: string[]) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return { error: 'Unauthorized' };
        }

        // Get user from database
        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
        if (!user) {
            return { error: 'User not found' };
        }

        // Update order for each link
        await Promise.all(
            linkIds.map((linkId, index) =>
                db
                    .update(monetizationLinks)
                    .set({ order: index })
                    .where(and(
                        eq(monetizationLinks.id, linkId),
                        eq(monetizationLinks.userId, user.id)
                    ))
            )
        );

        revalidatePath('/dashboard/earn');
        revalidatePath(`/u/[username]`, 'page');

        return { success: true };
    } catch (error) {
        console.error('Error reordering links:', error);
        return { error: 'Failed to reorder links' };
    }
}
