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
import ExperienceSection from '@/components/profile/ExperienceSection';
import ResumeSection from '@/components/profile/ResumeSection';
import ThemedProfileWrapper from '@/components/profile/ThemedProfileWrapper';
import { getThemeById } from '@/lib/themes';
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

    // Get theme settings with fallbacks
    const themeId = profile.themeId || 'terminal';
    const theme = getThemeById(themeId);
    const wallpaperType = profile.wallpaperType || 'gradient';
    const wallpaperValue = profile.wallpaperValue;
    const fontFamily = profile.fontFamily || 'mono';

    // Get heading color class from theme
    const headingColor = theme.styles.heading;

    return (
        <ThemedProfileWrapper
            themeId={themeId}
            wallpaperType={wallpaperType}
            wallpaperValue={wallpaperValue}
            fontFamily={fontFamily}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Profile Header */}
                <ProfileHeader profile={profile} />

                {/* Links Section */}
                {user.links && user.links.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <LinksList links={user.links} userId={profile.userId} />
                    </div>
                )}

                {/* Experience */}
                {user.experiences && user.experiences.length > 0 && (
                    <div className="mt-6 sm:mt-8">
                        <ExperienceSection
                            experiences={user.experiences}
                            themeStyles={theme.styles}
                        />
                    </div>
                )}

                {/* Current Activities */}
                {user.currentActivities && user.currentActivities.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${headingColor} font-mono`}>
                            {'>'} Current Activities
                        </h2>
                        <CurrentActivities activities={user.currentActivities} />
                    </div>
                )}

                {/* GitHub Repos */}
                {user.githubRepos && user.githubRepos.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${headingColor} font-mono`}>
                            {'>'} Featured Projects
                        </h2>
                        <GitHubRepos repos={user.githubRepos} />
                    </div>
                )}

                {/* Tech Stack */}
                {user.techStack && user.techStack.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${headingColor} font-mono`}>
                            {'>'} Tech Stack
                        </h2>
                        <TechStack techStack={user.techStack} />
                    </div>
                )}

                {/* Projects */}
                {user.projects && user.projects.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${headingColor} font-mono`}>
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
                <div className={`mt-12 sm:mt-16 text-center text-xs sm:text-sm ${theme.styles.textMuted} font-mono`}>
                    <a
                        href="https://www.devtree.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition-colors"
                    >
                        Powered by DevTree
                    </a>
                </div>
            </div>
        </ThemedProfileWrapper >
    );
}
