import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Link as LinkIcon, FolderGit2, Code, FileText, Github, BarChart3, User, Palette, Briefcase, DollarSign } from 'lucide-react';
import MobileNav from '@/components/dashboard/MobileNav';
import LogoutButton from '@/components/dashboard/LogoutButton';
import ClerkUserButton from '@/components/dashboard/ClerkUserButton';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userProfile = await getUserProfileByClerkId(userId);

    if (!userProfile?.profile) {
        redirect('/');
    }

    const { profile } = userProfile;

    const navLinks = [
        { href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
        { href: '/dashboard/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
        { href: '/dashboard/design', icon: <Palette className="w-5 h-5" />, label: 'Design' },
        { href: '/dashboard/links', icon: <LinkIcon className="w-5 h-5" />, label: 'Links' },
        { href: '/dashboard/projects', icon: <FolderGit2 className="w-5 h-5" />, label: 'Projects' },
        { href: '/dashboard/experience', icon: <Briefcase className="w-5 h-5" />, label: 'Experience' },
        { href: '/dashboard/tech-stack', icon: <Code className="w-5 h-5" />, label: 'Tech Stack' },
        { href: '/dashboard/github', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
        { href: '/dashboard/resume', icon: <FileText className="w-5 h-5" />, label: 'Resume' },
        { href: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
        { href: '/dashboard/earn', icon: <DollarSign className="w-5 h-5" />, label: 'Earn 💰' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative flex">
                {/* Desktop Sidebar - Hidden on mobile */}
                <aside className="hidden md:block w-64 min-h-screen border-r border-slate-700 bg-slate-900/50 backdrop-blur-sm p-6">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold font-mono text-green-400 mb-2">DevTree</h2>
                                <p className="text-sm text-slate-400 font-mono">@{profile.username}</p>
                            </div>
                            <ClerkUserButton />
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href} icon={link.icon}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-slate-700 space-y-3 flex flex-col gap-1 ">
                        <Link href={`/u/${profile.username}`} target="_blank">
                            <Button variant="outline" className="w-full border-green-600 text-green-400 hover:bg-green-600/10 font-mono text-sm">
                                View Public Profile
                            </Button>
                        </Link>
                        <LogoutButton className="w-full border-red-600 text-red-400 hover:bg-red-600/10 font-mono text-sm" />
                    </div>
                </aside>

                {/* Mobile Navigation */}
                <MobileNav username={profile.username} navLinks={navLinks} />

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-green-400 transition-all font-mono"
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
}
