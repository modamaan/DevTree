import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import TechStackManager from '@/components/dashboard/TechStackManager';

export default async function TechStackPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
        with: {
            techStack: {
                orderBy: (techStack, { asc }) => [asc(techStack.order)],
            },
        },
    });

    if (!user) {
        redirect('/');
    }

    return (
        <div>
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Tech Stack</h1>
                <p className="text-sm sm:text-base text-slate-400">Select the technologies you work with</p>
            </div>

            <TechStackManager techStack={user.techStack} />
        </div>
    );
}
