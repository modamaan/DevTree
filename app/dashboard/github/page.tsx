import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, AlertCircle } from 'lucide-react';
import { clerkClient } from '@clerk/nextjs/server';
import GitHubConnectButton from '@/components/dashboard/GitHubConnectButton';
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
                            <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-300">
                                    <p className="font-semibold mb-1">GitHub OAuth Setup Required</p>
                                    <p>
                                        To enable GitHub integration, you need to configure GitHub OAuth in your Clerk dashboard.
                                        Once configured, users will be able to connect their GitHub accounts.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
                                <h3 className="font-semibold text-white mb-2 font-mono">Setup Instructions:</h3>
                                <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                                    <li>Go to your Clerk Dashboard → Social Connections</li>
                                    <li>Enable GitHub OAuth provider</li>
                                    <li>Add required scopes: <code className="text-green-400">public_repo, read:user</code></li>
                                    <li>Save and return here to connect</li>
                                </ol>
                            </div>

                            <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                                <p className="text-yellow-400 text-sm font-mono mb-2">
                                    ⚠️ After completing setup above:
                                </p>
                                <ol className="text-sm text-yellow-300 space-y-1 list-decimal list-inside">
                                    <li>Click your profile avatar (top right)</li>
                                    <li>Select "Connected accounts"</li>
                                    <li>Click "Connect" next to GitHub</li>
                                </ol>
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
