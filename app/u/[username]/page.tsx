import { notFound } from 'next/navigation';
import { getPublicProfile } from '@/lib/auth';
import { db } from '@/db';
import { analyticsEvents } from '@/db/schema';
import { headers } from 'next/headers';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LinksList from '@/components/profile/LinksList';
import CurrentActivities from '@/components/profile/CurrentActivities';
import GitHubRepos from '@/components/profile/GitHubRepos';
import TechStack from '@/components/profile/TechStack';
import ProjectsShowcase from '@/components/profile/ProjectsShowcase';
import ResumeSection from '@/components/profile/ResumeSection';
import type { Metadata } from 'next';

interface PageProps {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username } = await params;
    const profile = await getPublicProfile(username);

    if (!profile) {
        return {
            title: 'Profile Not Found - DevTree',
        };
    }

    return {
        title: `${profile.displayName || profile.username} - DevTree`,
        description: profile.bio || `Check out ${profile.displayName || profile.username}'s developer profile`,
        openGraph: {
            title: `${profile.displayName || profile.username} - DevTree`,
            description: profile.bio || `Check out ${profile.displayName || profile.username}'s developer profile`,
            images: profile.avatar ? [profile.avatar] : [],
        },
    };
}

export default async function PublicProfilePage({ params }: PageProps) {
    const { username } = await params;
    const profile = await getPublicProfile(username);

    if (!profile) {
        notFound();
    }

    // Track profile view
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    await db.insert(analyticsEvents).values({
        userId: profile.userId,
        eventType: 'profile_view',
        metadata: { username },
        ipAddress,
        userAgent,
    });

    const { user } = profile;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Terminal theme styling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Profile Header */}
                <ProfileHeader profile={profile} />

                {/* Links Section */}
                {user.links && user.links.length > 0 && (
                    <div className="mt-6 sm:mt-8">
                        <LinksList links={user.links} userId={profile.userId} />
                    </div>
                )}

                {/* Current Activities */}
                {user.currentActivities && user.currentActivities.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400 font-mono">
                            {'>'} Current Activities
                        </h2>
                        <CurrentActivities activities={user.currentActivities} />
                    </div>
                )}

                {/* GitHub Repos */}
                {user.githubRepos && user.githubRepos.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400 font-mono">
                            {'>'} Featured Projects
                        </h2>
                        <GitHubRepos repos={user.githubRepos} />
                    </div>
                )}

                {/* Tech Stack */}
                {user.techStack && user.techStack.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400 font-mono">
                            {'>'} Tech Stack
                        </h2>
                        <TechStack techStack={user.techStack} />
                    </div>
                )}

                {/* Projects */}
                {user.projects && user.projects.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400 font-mono">
                            {'>'} Projects
                        </h2>
                        <ProjectsShowcase projects={user.projects} />
                    </div>
                )}

                {/* Resume */}
                {profile.resumeUrl && (
                    <div className="mt-8 sm:mt-12">
                        <ResumeSection resumeUrl={profile.resumeUrl} userId={profile.userId} />
                    </div>
                )}

                {/* Footer */}
                <div className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-slate-500 font-mono">
                    <p>Powered by DevTree</p>
                </div>
            </div>
        </div>
    );
}
