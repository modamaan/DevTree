import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId, syncUserToDatabase } from '@/lib/auth';
import { db } from '@/db';
import { analyticsEvents } from '@/db/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MousePointerClick, Download } from 'lucide-react';
import { unstable_cache } from 'next/cache';

export const dynamic = 'force-dynamic'; // Disable static generation for auth

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    // Try to get user profile with caching
    let userProfile = await getUserProfileByClerkId(userId);

    // If user doesn't exist in database, create them (fallback for when webhooks aren't set up)
    if (!userProfile) {
        const user = await currentUser();
        if (user?.primaryEmailAddress?.emailAddress) {
            await syncUserToDatabase(userId, user.primaryEmailAddress.emailAddress);
            userProfile = await getUserProfileByClerkId(userId);
        }
    }

    if (!userProfile) {
        redirect('/');
    }

    // Get analytics for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const profileViews = await db
        .select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(
            and(
                eq(analyticsEvents.userId, userProfile.id),
                eq(analyticsEvents.eventType, 'profile_view'),
                gte(analyticsEvents.createdAt, thirtyDaysAgo)
            )
        );

    const linkClicks = await db
        .select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(
            and(
                eq(analyticsEvents.userId, userProfile.id),
                eq(analyticsEvents.eventType, 'link_click'),
                gte(analyticsEvents.createdAt, thirtyDaysAgo)
            )
        );

    const resumeDownloads = await db
        .select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(
            and(
                eq(analyticsEvents.userId, userProfile.id),
                eq(analyticsEvents.eventType, 'resume_download'),
                gte(analyticsEvents.createdAt, thirtyDaysAgo)
            )
        );

    return (
        <div>
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Dashboard</h1>
                <p className="text-sm sm:text-base text-slate-400">Welcome back! Here's your profile overview.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <StatCard
                    title="Profile Views"
                    value={profileViews[0]?.count || 0}
                    description="Last 30 days"
                    icon={<Eye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />}
                />
                <StatCard
                    title="Link Clicks"
                    value={linkClicks[0]?.count || 0}
                    description="Last 30 days"
                    icon={<MousePointerClick className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />}
                />
                <StatCard
                    title="Resume Downloads"
                    value={resumeDownloads[0]?.count || 0}
                    description="Last 30 days"
                    icon={<Download className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />}
                />
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-green-400 font-mono">Quick Actions</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-slate-400">
                        Get started by setting up your profile
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <QuickActionCard
                            title="Edit Profile"
                            description="Update your bio, avatar, and badges"
                            href="/dashboard/profile"
                        />
                        <QuickActionCard
                            title="Manage Links"
                            description="Add and organize your important links"
                            href="/dashboard/links"
                        />
                        <QuickActionCard
                            title="Add Projects"
                            description="Showcase your best work"
                            href="/dashboard/projects"
                        />
                        <QuickActionCard
                            title="Connect GitHub"
                            description="Sync your repositories"
                            href="/dashboard/github"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ title, value, description, icon }: { title: string; value: number; description: string; icon: React.ReactNode }) {
    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-white font-mono">{value.toLocaleString()}</div>
                <p className="text-xs text-slate-400 mt-1">{description}</p>
            </CardContent>
        </Card>
    );
}

function QuickActionCard({ title, description, href }: { title: string; description: string; href: string }) {
    return (
        <a
            href={href}
            className="block p-4 rounded-lg border border-slate-700 hover:border-green-500/50 bg-slate-900/50 hover:bg-slate-800/50 transition-all group"
        >
            <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors font-mono">{title}</h3>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
        </a>
    );
}
