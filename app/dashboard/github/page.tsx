import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, AlertCircle } from 'lucide-react';

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
                        {profile.githubConnected
                            ? 'Your GitHub account is connected'
                            : 'Connect your GitHub account to display your repositories'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {profile.githubConnected ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                                <p className="text-green-400 font-mono">
                                    ✓ Connected as @{profile.githubUsername}
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

                            <Button
                                disabled
                                className="bg-slate-700 text-slate-400 cursor-not-allowed"
                            >
                                <Github className="w-4 h-4 mr-2" />
                                Connect GitHub (Setup Required)
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {profile.githubConnected && (
                <Card className="bg-slate-800/50 border-slate-700 mt-6">
                    <CardHeader>
                        <CardTitle className="text-green-400 font-mono">Repository Management</CardTitle>
                        <CardDescription className="text-slate-400">
                            Pin repositories to display on your public profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-400 text-center py-8">
                            Repository management will be available once GitHub OAuth is fully configured.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
