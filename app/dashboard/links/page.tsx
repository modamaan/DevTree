import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import LinksManager from '@/components/dashboard/LinksManager';

export default async function LinksPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
        with: {
            links: {
                orderBy: (links, { asc }) => [asc(links.order)],
            },
        },
    });

    if (!user) {
        redirect('/');
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Manage Links</h1>
                <p className="text-slate-400">Add, edit, and organize your links</p>
            </div>

            <LinksManager links={user.links} />
        </div>
    );
}
