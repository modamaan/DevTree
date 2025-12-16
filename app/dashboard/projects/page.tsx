import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import ProjectsManager from '@/components/dashboard/ProjectsManager';

export default async function ProjectsPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
        with: {
            projects: {
                orderBy: (projects, { asc }) => [asc(projects.order)],
            },
        },
    });

    if (!user) {
        redirect('/');
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Projects</h1>
                <p className="text-slate-400">Showcase your best work and side projects</p>
            </div>

            <ProjectsManager projects={user.projects} />
        </div>
    );
}
