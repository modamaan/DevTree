'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, Pin, Loader2 } from 'lucide-react';
import { syncGitHubRepos, togglePinRepo } from '@/app/actions/github';

interface GitHubRepo {
    id: string;
    name: string;
    description: string | null;
    url: string;
    stars: number | null;
    forks: number | null;
    language: string | null;
    pinned: boolean | null;
}

interface RepoManagerProps {
    repos: GitHubRepo[];
}

export default function RepoManager({ repos: initialRepos }: RepoManagerProps) {
    const [repos, setRepos] = useState(initialRepos);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncMessage('');

        const result = await syncGitHubRepos();

        if (result.success) {
            setSyncMessage(`✓ Synced ${result.count} repositories`);
            // Refresh the page to show new repos
            window.location.reload();
        } else {
            setSyncMessage(`✗ Error: ${result.error}`);
        }

        setIsSyncing(false);
    };

    const handleTogglePin = async (repoId: string) => {
        const result = await togglePinRepo(repoId);

        if (result.success) {
            setRepos(repos.map(repo =>
                repo.id === repoId ? { ...repo, pinned: result.pinned ?? null } : repo
            ));
        }
    };

    const pinnedRepos = repos.filter(r => r.pinned);
    const unpinnedRepos = repos.filter(r => !r.pinned);

    return (
        <div className="space-y-6">
            {/* Sync Button */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400">
                        {repos.length} repositories • {pinnedRepos.length} pinned
                    </p>
                </div>
                <Button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="bg-green-600 hover:bg-green-700 text-white font-mono"
                >
                    {isSyncing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Syncing...
                        </>
                    ) : (
                        'Sync Repositories'
                    )}
                </Button>
            </div>

            {syncMessage && (
                <div className={`p-3 rounded-lg text-sm font-mono ${syncMessage.startsWith('✓')
                    ? 'bg-green-900/20 border border-green-700 text-green-400'
                    : 'bg-red-900/20 border border-red-700 text-red-400'
                    }`}>
                    {syncMessage}
                </div>
            )}

            {repos.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-400 mb-4">No repositories found</p>
                    <Button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="bg-green-600 hover:bg-green-700 text-white font-mono"
                    >
                        Sync Your Repositories
                    </Button>
                </div>
            ) : (
                <>
                    {/* Pinned Repos */}
                    {pinnedRepos.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-300 mb-3 font-mono">
                                Pinned (Shown on Profile)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pinnedRepos.map((repo) => (
                                    <RepoCard
                                        key={repo.id}
                                        repo={repo}
                                        onTogglePin={handleTogglePin}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Unpinned Repos */}
                    {unpinnedRepos.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-300 mb-3 font-mono">
                                All Repositories
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {unpinnedRepos.map((repo) => (
                                    <RepoCard
                                        key={repo.id}
                                        repo={repo}
                                        onTogglePin={handleTogglePin}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function RepoCard({ repo, onTogglePin }: { repo: GitHubRepo; onTogglePin: (id: string) => void }) {
    return (
        <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all group">
            <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-mono text-green-400 truncate flex-1">
                        {repo.name}
                    </h4>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTogglePin(repo.id)}
                        className={`ml-2 ${repo.pinned ? 'text-yellow-400' : 'text-slate-400'}`}
                    >
                        <Pin className={`w-4 h-4 ${repo.pinned ? 'fill-current' : ''}`} />
                    </Button>
                </div>

                {repo.description && (
                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {repo.description}
                    </p>
                )}

                <div className="flex items-center gap-4 text-sm text-slate-400">
                    {repo.language && (
                        <Badge variant="outline" className="border-slate-600 text-slate-300 font-mono text-xs">
                            {repo.language}
                        </Badge>
                    )}
                    {repo.stars !== null && repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            {repo.stars}
                        </span>
                    )}
                    {repo.forks !== null && repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            {repo.forks}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
