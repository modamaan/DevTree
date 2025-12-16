import { auth, currentUser } from '@clerk/nextjs/server';
import { getUserProfileByClerkId, syncUserToDatabase } from '@/lib/auth';

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return Response.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Check if user exists
        let userProfile = await getUserProfileByClerkId(userId);

        if (!userProfile) {
            // Try to create user
            const user = await currentUser();
            if (user?.primaryEmailAddress?.emailAddress) {
                await syncUserToDatabase(userId, user.primaryEmailAddress.emailAddress);
                userProfile = await getUserProfileByClerkId(userId);
            }
        }

        return Response.json({
            userId,
            userProfile,
            hasProfile: !!userProfile,
        });
    } catch (error) {
        console.error('Test endpoint error:', error);
        return Response.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
