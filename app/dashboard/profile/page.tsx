import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import ProfileForm from '@/components/dashboard/ProfileForm';
import CurrentActivitiesWrapper from '@/components/dashboard/CurrentActivitiesWrapper';
import { db } from '@/db';
import { currentActivities } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hasFeatureAccess } from '@/app/actions/subscriptions';

export default async function ProfilePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userProfile = await getUserProfileByClerkId(userId);

    if (!userProfile?.profile) {
        redirect('/');
    }

    // Fetch current activities
    const activities = await db.query.currentActivities.findMany({
        where: eq(currentActivities.userId, userProfile.id),
        orderBy: (currentActivities, { desc }) => [desc(currentActivities.createdAt)],
    });

    // Check feature access
    const hasAccess = await hasFeatureAccess('current_activities');

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Edit Profile</h1>
                <p className="text-slate-400">Update your public profile information</p>
            </div>

            <ProfileForm profile={userProfile.profile} />

            <CurrentActivitiesWrapper activities={activities as any} hasAccess={hasAccess} />
        </div>
    );
}

