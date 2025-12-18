import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import ExperienceManager from '@/components/dashboard/ExperienceManager';

export default async function ExperiencePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    // Get user from database
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
    });

    if (!user) {
        redirect('/');
    }

    // Fetch experiences
    const experiences = await db.query.experiences.findMany({
        where: (experiences, { eq }) => eq(experiences.userId, user.id),
        orderBy: (experiences, { desc }) => [desc(experiences.order)],
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Experience</h1>
                <p className="text-slate-400">Manage your work history and professional experience</p>
            </div>

            <ExperienceManager experiences={experiences} />
        </div>
    );
}
