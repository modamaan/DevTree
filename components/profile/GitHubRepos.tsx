'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, ExternalLink } from 'lucide-react';

interface GitHubRepo {
    id: string;
    name: string;
    description: string | null;
    url: string;
    stars: number | null;
    forks: number | null;
    language: string | null;
}

interface GitHubReposProps {
    repos: GitHubRepo[];
}

export default function GitHubRepos({ repos }: GitHubReposProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
                <Card
                    key={repo.id}
                    className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all cursor-pointer group"
                    onClick={() => window.open(repo.url, '_blank', 'noopener,noreferrer')}
                >
                    <CardHeader>
                        <CardTitle className="text-lg font-mono text-green-400 flex items-center justify-between">
                            <span className="truncate">{repo.name}</span>
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </CardTitle>
                        {repo.description && (
                            <CardDescription className="text-slate-400 line-clamp-2">
                                {repo.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            {repo.language && (
                                <Badge variant="outline" className="border-slate-600 text-slate-300 font-mono">
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
            ))}
        </div>
    );
}
