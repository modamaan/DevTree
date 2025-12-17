import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, AlertCircle } from 'lucide-react';
import { clerkClient } from '@clerk/nextjs/server';
import RepoManager from '@/components/dashboard/RepoManager';
import { db } from '@/db';

export default async function GitHubPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userProfile = await getUserProfileByClerkId(userId);

    if (!userProfile?.profile) {
        redirect('/');
    }

    const { profile } = userProfile;

    // Check if user has connected GitHub via Clerk
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const githubAccount = clerkUser.externalAccounts.find(
        (account: any) => account.provider === 'oauth_github'
    );
    const isGitHubConnected = !!githubAccount;
    const githubUsername = githubAccount?.username || profile.githubUsername;

    // Debug: Log connection status (remove after testing)
    console.log('GitHub Connection Status:', {
        isGitHubConnected,
        githubUsername,
        hasGithubAccount: !!githubAccount,
        externalAccountsCount: clerkUser.externalAccounts.length,
        allAccounts: clerkUser.externalAccounts.map((acc: any) => ({
            provider: acc.provider,
            username: acc.username,
            verification: acc.verification?.status
        }))
    });

    // Fetch user's GitHub repositories from database
    const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
    });

    const userRepos = isGitHubConnected && dbUser ? await db.query.githubRepos.findMany({
        where: (repos, { eq }) => eq(repos.userId, dbUser.id),
        orderBy: (repos, { desc }) => [desc(repos.stars)],
    }) : [];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} GitHub Integration</h1>
                <p className="text-slate-400">Connect your GitHub account to showcase your repositories</p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                        <Github className="w-6 h-6" />
                        GitHub Connection
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        {isGitHubConnected
                            ? 'Your GitHub account is connected'
                            : 'Connect your GitHub account to display your repositories'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isGitHubConnected ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                                <p className="text-green-400 font-mono">
                                    ✓ Connected as @{githubUsername}
                                </p>
                            </div>

                            <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
                                <h3 className="font-semibold text-white mb-2 font-mono">What's Next?</h3>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Your public repositories are automatically synced</li>
                                    <li>• Pin your best repositories to display on your profile</li>
                                    <li>• Repository data updates daily</li>
                                </ul>
                            </div>

                            <Button
                                variant="outline"
                                className="border-red-700 text-red-400 hover:bg-red-900/20"
                            >
                                Disconnect GitHub
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-6 bg-slate-900/50 border border-slate-600 rounded-lg">
                                <Github className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-3 font-mono text-center">Connect GitHub</h3>
                                <p className="text-slate-400 mb-6 text-center">
                                    Link your GitHub account to showcase your repositories on your DevTree profile
                                </p>

                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-left">
                                    <h4 className="font-semibold text-green-400 mb-3 font-mono">How to Connect:</h4>
                                    <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
                                        <li>Click your <strong>profile avatar</strong> in the top right corner</li>
                                        <li>Select <strong>"Manage account"</strong> from the dropdown</li>
                                        <li>Go to <strong>"Connected accounts"</strong> tab</li>
                                        <li>Click <strong>"Connect"</strong> next to GitHub</li>
                                        <li>Authorize DevTree to access your public repositories</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {isGitHubConnected && (
                <Card className="bg-slate-800/50 border-slate-700 mt-6">
                    <CardHeader>
                        <CardTitle className="text-green-400 font-mono">Repository Management</CardTitle>
                        <CardDescription className="text-slate-400">
                            Pin repositories to display on your public profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RepoManager repos={userRepos} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
