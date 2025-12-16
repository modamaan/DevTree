'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/db';
import { githubRepos, profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function syncGitHubRepos() {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        // Get GitHub access token from Clerk
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const githubAccount = user.externalAccounts.find(
            (account: any) => account.provider === 'oauth_github'
        );

        if (!githubAccount) {
            console.error('GitHub account not found in Clerk');
            return { success: false, error: 'GitHub not connected' };
        }

        // Try to get access token from the account
        let accessToken = (githubAccount as any).accessToken;

        // If not available, try to get it via Clerk's API
        if (!accessToken) {
            try {
                const tokens = await client.users.getUserOauthAccessToken(userId, 'github');
                accessToken = tokens.data[0]?.token;
            } catch (error) {
                console.error('Failed to get OAuth token from Clerk:', error);
            }
        }

        if (!accessToken) {
            console.error('GitHub access token not found. Please enable "Access to OAuth tokens" in Clerk Dashboard → GitHub settings');
            return {
                success: false,
                error: 'GitHub access token not available. Please reconnect GitHub or enable token access in Clerk Dashboard.'
            };
        }

        console.log('Fetching repos for GitHub user:', (githubAccount as any).username);

        // Fetch repositories from GitHub
        const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GitHub API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            return {
                success: false,
                error: `GitHub API error: ${response.status} ${response.statusText}`
            };
        }

        const repos = await response.json();

        // Get user from database
        const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!dbUser) {
            return { success: false, error: 'User not found' };
        }

        // Delete existing repos for this user
        await db.delete(githubRepos).where(eq(githubRepos.userId, dbUser.id));

        // Insert new repos
        const reposToInsert = repos.map((repo: any) => ({
            userId: dbUser.id,
            repoId: repo.id.toString(),
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            pinned: false,
        }));

        if (reposToInsert.length > 0) {
            await db.insert(githubRepos).values(reposToInsert);
        }

        return { success: true, count: reposToInsert.length };
    } catch (error) {
        console.error('Error syncing GitHub repos:', error);
        return { success: false, error: 'Failed to sync repositories' };
    }
}

export async function togglePinRepo(repoId: string) {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!dbUser) {
            return { success: false, error: 'User not found' };
        }

        // Get current repo
        const repo = await db.query.githubRepos.findFirst({
            where: (repos, { and, eq }) =>
                and(eq(repos.id, repoId), eq(repos.userId, dbUser.id)),
        });

        if (!repo) {
            return { success: false, error: 'Repository not found' };
        }

        // Toggle pinned status
        await db
            .update(githubRepos)
            .set({ pinned: !repo.pinned })
            .where(eq(githubRepos.id, repoId));

        return { success: true, pinned: !repo.pinned };
    } catch (error) {
        console.error('Error toggling pin:', error);
        return { success: false, error: 'Failed to toggle pin' };
    }
}

export async function syncGitHubProfile() {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        // Get GitHub access token from Clerk
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const githubAccount = user.externalAccounts.find(
            (account: any) => account.provider === 'oauth_github'
        );

        if (!githubAccount) {
            return { success: false, error: 'GitHub not connected' };
        }

        // Try to get access token
        let accessToken = (githubAccount as any).accessToken;

        if (!accessToken) {
            try {
                const tokens = await client.users.getUserOauthAccessToken(userId, 'github');
                accessToken = tokens.data[0]?.token;
            } catch (error) {
                console.error('Failed to get OAuth token:', error);
            }
        }

        if (!accessToken) {
            return {
                success: false,
                error: 'GitHub access token not available'
            };
        }

        // Fetch GitHub user data
        const response = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            return { success: false, error: 'Failed to fetch GitHub profile' };
        }

        const githubUser = await response.json();

        // Get user from database
        const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!dbUser) {
            return { success: false, error: 'User not found' };
        }

        // Update profile with GitHub data
        await db
            .update(profiles)
            .set({
                githubUsername: githubUser.login,
                avatar: githubUser.avatar_url,
                githubConnected: true,
            })
            .where(eq(profiles.userId, dbUser.id));

        return {
            success: true,
            username: githubUser.login,
            avatar: githubUser.avatar_url,
            displayName: githubUser.name,
            bio: githubUser.bio,
            location: githubUser.location
        };
    } catch (error) {
        console.error('Error syncing GitHub profile:', error);
        return { success: false, error: 'Failed to sync GitHub profile' };
    }
}
