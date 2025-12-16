import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import ProfileForm from '@/components/dashboard/ProfileForm';

export default async function ProfilePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userProfile = await getUserProfileByClerkId(userId);

    if (!userProfile?.profile) {
        redirect('/');
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Edit Profile</h1>
                <p className="text-slate-400">Update your public profile information</p>
            </div>

            <ProfileForm profile={userProfile.profile} />
        </div>
    );
}
