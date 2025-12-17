import { db } from '@/db';
import { users, profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Generate a unique username for new users
 */
export async function generateUniqueUsername(): Promise<string> {
    const prefix = 'dev';
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const username = `${prefix}-${randomSuffix}`;

    // Check if username already exists
    const existing = await db.query.profiles.findFirst({
        where: eq(profiles.username, username),
    });

    // If exists, recursively try again
    if (existing) {
        return generateUniqueUsername();
    }

    return username;
}

/**
 * Sync Clerk user to database
 */
export async function syncUserToDatabase(clerkId: string, email: string, claimedUsername?: string) {
    try {
        // Check if user already exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
        });

        if (existingUser) {
            return existingUser;
        }

        // Create new user
        const [newUser] = await db
            .insert(users)
            .values({
                clerkId,
                email,
            })
            .returning();

        // Use claimed username or generate a unique one
        const username = claimedUsername || await generateUniqueUsername();

        // Create profile
        await db.insert(profiles).values({
            userId: newUser.id,
            username,
            displayName: email.split('@')[0], // Use email prefix as initial display name
        });

        return newUser;
    } catch (error) {
        console.error('Error syncing user to database:', error);
        throw error;
    }
}

/**
 * Get user profile by Clerk ID
 */
export async function getUserProfileByClerkId(clerkId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
        with: {
            profile: true,
        },
    });

    return user;
}

/**
 * Get public profile by username
 * Returns null if profile doesn't exist OR if link is not activated (unpaid)
 */
export async function getPublicProfile(username: string) {
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.username, username),
        with: {
            user: {
                with: {
                    links: {
                        where: (links, { eq }) => eq(links.enabled, true),
                        orderBy: (links, { asc }) => [asc(links.order)],
                    },
                    projects: {
                        orderBy: (projects, { asc }) => [asc(projects.order)],
                    },
                    techStack: {
                        orderBy: (techStack, { asc }) => [asc(techStack.order)],
                    },
                    githubRepos: {
                        where: (repos, { eq }) => eq(repos.pinned, true),
                        orderBy: (repos, { desc }) => [desc(repos.stars)],
                    },
                    currentActivities: {
                        orderBy: (currentActivities, { desc }) => [desc(currentActivities.createdAt)],
                    },
                },
            },
        },
    });

    // SECURITY: Block access if link is not activated (user hasn't paid)
    if (!profile || !profile.isPublicLinkActive) {
        return null;
    }

    return profile;
}
