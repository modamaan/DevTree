import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { analyticsEvents } from '@/db/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MousePointerClick, Download, TrendingUp } from 'lucide-react';

export default async function AnalyticsPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
    });

    if (!user) {
        redirect('/');
    }

    // Get analytics for different time periods
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Last 30 days
    const stats30Days = await getStats(user.id, thirtyDaysAgo);

    // Last 7 days
    const stats7Days = await getStats(user.id, sevenDaysAgo);

    // All time
    const statsAllTime = await getStats(user.id, new Date(0));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Analytics</h1>
                <p className="text-slate-400">Track your profile performance and engagement</p>
            </div>

            {/* Last 30 Days */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 font-mono">Last 30 Days</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Profile Views"
                        value={stats30Days.profileViews}
                        icon={<Eye className="w-8 h-8 text-blue-400" />}
                        trend={calculateTrend(stats30Days.profileViews, stats7Days.profileViews)}
                    />
                    <StatCard
                        title="Link Clicks"
                        value={stats30Days.linkClicks}
                        icon={<MousePointerClick className="w-8 h-8 text-green-400" />}
                        trend={calculateTrend(stats30Days.linkClicks, stats7Days.linkClicks)}
                    />
                    <StatCard
                        title="Resume Downloads"
                        value={stats30Days.resumeDownloads}
                        icon={<Download className="w-8 h-8 text-purple-400" />}
                        trend={calculateTrend(stats30Days.resumeDownloads, stats7Days.resumeDownloads)}
                    />
                </div>
            </div>

            {/* Last 7 Days */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 font-mono">Last 7 Days</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MiniStatCard title="Profile Views" value={stats7Days.profileViews} />
                    <MiniStatCard title="Link Clicks" value={stats7Days.linkClicks} />
                    <MiniStatCard title="Resume Downloads" value={stats7Days.resumeDownloads} />
                </div>
            </div>

            {/* All Time */}
            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-green-400 font-mono">All Time Stats</CardTitle>
                    <CardDescription className="text-slate-400">
                        Total engagement since you created your profile
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white font-mono">{statsAllTime.profileViews.toLocaleString()}</p>
                            <p className="text-sm text-slate-400 mt-1">Profile Views</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white font-mono">{statsAllTime.linkClicks.toLocaleString()}</p>
                            <p className="text-sm text-slate-400 mt-1">Link Clicks</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white font-mono">{statsAllTime.resumeDownloads.toLocaleString()}</p>
                            <p className="text-sm text-slate-400 mt-1">Resume Downloads</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

async function getStats(userId: string, since: Date) {
    const profileViews = await db
        .select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(
            and(
                eq(analyticsEvents.userId, userId),
                eq(analyticsEvents.eventType, 'profile_view'),
                gte(analyticsEvents.createdAt, since)
            )
        );

    const linkClicks = await db
        .select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(
            and(
                eq(analyticsEvents.userId, userId),
                eq(analyticsEvents.eventType, 'link_click'),
                gte(analyticsEvents.createdAt, since)
            )
        );

    const resumeDownloads = await db
        .select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(
            and(
                eq(analyticsEvents.userId, userId),
                eq(analyticsEvents.eventType, 'resume_download'),
                gte(analyticsEvents.createdAt, since)
            )
        );

    return {
        profileViews: Number(profileViews[0]?.count || 0),
        linkClicks: Number(linkClicks[0]?.count || 0),
        resumeDownloads: Number(resumeDownloads[0]?.count || 0),
    };
}

function calculateTrend(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

function StatCard({
    title,
    value,
    icon,
    trend,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    trend: number;
}) {
    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-white font-mono">{value.toLocaleString()}</div>
                <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                    <p className={`text-xs ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend >= 0 ? '+' : ''}{trend}% from last week
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function MiniStatCard({ title, value }: { title: string; value: number }) {
    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
                <p className="text-2xl font-bold text-white font-mono">{value.toLocaleString()}</p>
                <p className="text-sm text-slate-400 mt-1">{title}</p>
            </CardContent>
        </Card>
    );
}
