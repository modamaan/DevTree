'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Github, Linkedin, Twitter, Globe, Share2, Check, FileCode, GitBranch, Hash, Terminal as TerminalIcon, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProfileHeaderProps {
    profile: {
        username: string;
        displayName: string | null;
        bio: string | null;
        avatar: string | null;
        location: string | null;
        githubUrl?: string | null;
        linkedinUrl?: string | null;
        twitterUrl?: string | null;
        websiteUrl?: string | null;
        [key: string]: any; // Allow additional properties from the full profile object
    };
    headerStyle?: string;
}

// Shared Profile Content Component
function ProfileContent({ profile }: { profile: ProfileHeaderProps['profile'] }) {
    return (
        <>
            {profile.bio && (
                <div className="text-slate-300 leading-relaxed">
                    <ReactMarkdown>{profile.bio}</ReactMarkdown>
                </div>
            )}

            {profile.location && (
                <div className="flex items-center justify-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                </div>
            )}

            {(profile.githubUrl || profile.linkedinUrl || profile.twitterUrl || profile.websiteUrl) && (
                <div className="flex flex-wrap gap-3 justify-center">
                    {profile.githubUrl && (
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-green-400 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                    {profile.linkedinUrl && (
                        <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-green-400 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    )}
                    {profile.twitterUrl && (
                        <a
                            href={profile.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-green-400 transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                    )}
                    {profile.websiteUrl && (
                        <a
                            href={profile.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-green-400 transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                        </a>
                    )}
                </div>
            )}
        </>
    );
}

// Terminal Header (existing)
function TerminalHeader({ profile, initials, handleShare, copied }: any) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-slate-400 text-sm font-mono ml-2">~/profile</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-slate-400 hover:text-green-400 hover:bg-slate-700"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </Button>
            </div>

            <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 items-center text-center">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-green-500">
                        <AvatarImage src={profile.avatar || undefined} alt={profile.displayName || profile.username} />
                        <AvatarFallback className="bg-slate-700 text-green-400 text-2xl font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="w-full space-y-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 font-mono">
                                {profile.displayName || profile.username}
                            </h1>
                            <p className="text-slate-400 font-mono">@{profile.username}</p>
                        </div>

                        <ProfileContent profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Code Editor Header
function CodeEditorHeader({ profile, initials, handleShare, copied }: any) {
    return (
        <div className="bg-[#1e1e1e] border border-slate-700 rounded-lg overflow-hidden font-mono">
            {/* Tab Bar */}
            <div className="bg-[#252526] border-b border-slate-700 flex items-center justify-between px-2">
                <div className="flex items-center">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] border-r border-slate-700">
                        <FileCode className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">{profile.username}.tsx</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-slate-400 hover:text-green-400 hover:bg-slate-700"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </Button>
            </div>

            {/* Editor Content */}
            <div className="p-6 sm:p-8">
                <div className="flex gap-4">
                    {/* Line Numbers */}
                    <div className="text-slate-600 text-right select-none hidden sm:block">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-500">
                                <AvatarImage src={profile.avatar || undefined} alt={profile.displayName || profile.username} />
                                <AvatarFallback className="bg-slate-700 text-blue-400 text-xl font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-3">
                                <div>
                                    <div className="text-purple-400">const</div>
                                    <span className="text-blue-300 text-xl sm:text-2xl font-semibold"> developer </span>
                                    <span className="text-slate-400">= {`{`}</span>
                                </div>
                                <div className="pl-4 space-y-2 text-sm sm:text-base">
                                    <div>
                                        <span className="text-blue-300">name</span>
                                        <span className="text-slate-400">: </span>
                                        <span className="text-orange-400">&quot;{profile.displayName || profile.username}&quot;</span>
                                        <span className="text-slate-400">,</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-300">username</span>
                                        <span className="text-slate-400">: </span>
                                        <span className="text-orange-400">&quot;@{profile.username}&quot;</span>
                                        <span className="text-slate-400">,</span>
                                    </div>
                                    {profile.location && (
                                        <div>
                                            <span className="text-blue-300">location</span>
                                            <span className="text-slate-400">: </span>
                                            <span className="text-orange-400">&quot;{profile.location}&quot;</span>
                                            <span className="text-slate-400">,</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-slate-400">{`}`}</div>

                                {profile.bio && (
                                    <div className="pt-2 text-slate-400 text-sm border-t border-slate-700">
                                        <span className="text-green-600">// </span>
                                        <ReactMarkdown>{profile.bio}</ReactMarkdown>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {profile.githubUrl && (
                                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {profile.linkedinUrl && (
                                        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    )}
                                    {profile.twitterUrl && (
                                        <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    )}
                                    {profile.websiteUrl && (
                                        <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Globe className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-4">
                    <span>UTF-8</span>
                    <span>TypeScript React</span>
                </div>
                <span>Ln 1, Col 1</span>
            </div>
        </div>
    );
}

// Git Commit Header
function GitCommitHeader({ profile, initials, handleShare, copied }: any) {
    // Generate a pseudo commit hash from username
    const commitHash = profile.username.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0).toString(16).padStart(7, '0').substring(0, 7);
    const currentDate = new Date().toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });

    return (
        <div className="bg-slate-900 border-l-4 border-green-500 rounded overflow-hidden font-mono">
            <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-yellow-400 font-semibold">commit {commitHash}</span>
                            <Badge className="bg-green-600 hover:bg-green-700 text-white">
                                <GitBranch className="w-3 h-3 mr-1" />
                                main
                            </Badge>
                        </div>

                        <div className="space-y-1 text-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="text-slate-400">Author:</span>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6 border border-green-500">
                                        <AvatarImage src={profile.avatar || undefined} alt={profile.displayName || profile.username} />
                                        <AvatarFallback className="bg-slate-700 text-green-400 text-xs">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-green-400">{profile.displayName || profile.username}</span>
                                    <span className="text-slate-500">&lt;{profile.username}@devtree.dev&gt;</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-400">Date: </span>
                                <span className="text-slate-300" suppressHydrationWarning>{currentDate}</span>
                            </div>
                        </div>

                        <div className="border-l-2 border-slate-700 pl-4 space-y-2">
                            <div className="text-white font-semibold">
                                feat: {profile.displayName || profile.username} profile
                            </div>
                            {profile.bio && (
                                <div className="text-slate-300 text-sm">
                                    <ReactMarkdown>{profile.bio}</ReactMarkdown>
                                </div>
                            )}
                            {profile.location && (
                                <div className="text-slate-400 text-sm flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {profile.location}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {profile.githubUrl && (
                                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors flex items-center gap-1 text-sm">
                                    <Github className="w-4 h-4" />
                                    <span className="hidden sm:inline">GitHub</span>
                                </a>
                            )}
                            {profile.linkedinUrl && (
                                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors flex items-center gap-1 text-sm">
                                    <Linkedin className="w-4 h-4" />
                                    <span className="hidden sm:inline">LinkedIn</span>
                                </a>
                            )}
                            {profile.twitterUrl && (
                                <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors flex items-center gap-1 text-sm">
                                    <Twitter className="w-4 h-4" />
                                    <span className="hidden sm:inline">Twitter</span>
                                </a>
                            )}
                            {profile.websiteUrl && (
                                <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors flex items-center gap-1 text-sm">
                                    <Globe className="w-4 h-4" />
                                    <span className="hidden sm:inline">Website</span>
                                </a>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        className="text-slate-400 hover:text-green-400 hover:bg-slate-800"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// README.md Header
function ReadmeHeader({ profile, initials, handleShare, copied }: any) {
    return (
        <div className="bg-white/5 border border-slate-700 rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8 space-y-6 font-mono">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-green-500">
                                <AvatarImage src={profile.avatar || undefined} alt={profile.displayName || profile.username} />
                                <AvatarFallback className="bg-slate-700 text-green-400 text-xl font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    <Hash className="inline w-6 h-6 text-slate-600 mr-2" />
                                    {profile.displayName || profile.username}
                                </h1>
                                <p className="text-slate-400 mt-1">@{profile.username}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-green-600 hover:bg-green-700 text-white">
                                <span className="text-xs">STATUS: AVAILABLE</span>
                            </Badge>
                            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                                <span className="text-xs">ROLE: DEVELOPER</span>
                            </Badge>
                        </div>

                        {profile.bio && (
                            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/10">
                                <div className="text-slate-300">
                                    <ReactMarkdown>{profile.bio}</ReactMarkdown>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 text-sm">
                            {profile.location && (
                                <div className="flex items-center gap-2 text-slate-300">
                                    <MapPin className="w-4 h-4 text-green-400" />
                                    <span>{profile.location}</span>
                                </div>
                            )}

                            {(profile.githubUrl || profile.linkedinUrl || profile.twitterUrl || profile.websiteUrl) && (
                                <div className="flex flex-wrap gap-3 pt-2">
                                    {profile.githubUrl && (
                                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-green-400 transition-colors">
                                            <Github className="w-4 h-4" />
                                            <span>GitHub</span>
                                        </a>
                                    )}
                                    {profile.linkedinUrl && (
                                        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-green-400 transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {profile.twitterUrl && (
                                        <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-green-400 transition-colors">
                                            <Twitter className="w-4 h-4" />
                                            <span>Twitter</span>
                                        </a>
                                    )}
                                    {profile.websiteUrl && (
                                        <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-green-400 transition-colors">
                                            <Globe className="w-4 h-4" />
                                            <span>Website</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        className="text-slate-400 hover:text-green-400 hover:bg-slate-800"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Console Log Header
function ConsoleLogHeader({ profile, initials, handleShare, copied }: any) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const ms = new Date().getMilliseconds().toString().padStart(3, '0');

    return (
        <div className="bg-slate-950 border border-slate-800 rounded overflow-hidden font-mono text-sm">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                    <Code2 className="w-4 h-4" />
                    <span>Console</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-slate-400 hover:text-green-400 hover:bg-slate-800"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </Button>
            </div>

            <div className="p-4 sm:p-6 space-y-2">
                <div className="flex items-start gap-2">
                    <span className="text-slate-600 select-none" suppressHydrationWarning>[{timestamp}.{ms}]</span>
                    <span className="text-blue-400">ℹ️</span>
                    <span className="text-slate-300">console.log(developer)</span>
                </div>

                <div className="pl-8 sm:pl-12 space-y-1">
                    <div className="flex items-start gap-2">
                        <span className="text-slate-600 select-none">▼</span>
                        <div className="flex-1 space-y-1">
                            <div className="text-slate-400">{`{`}</div>

                            <div className="pl-4 space-y-1">
                                <div className="flex items-center gap-4 pb-2">
                                    <Avatar className="w-12 h-12 border border-blue-500">
                                        <AvatarImage src={profile.avatar || undefined} alt={profile.displayName || profile.username} />
                                        <AvatarFallback className="bg-slate-700 text-blue-400 text-sm font-bold">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div>
                                    <span className="text-purple-400">name</span>
                                    <span className="text-slate-500">: </span>
                                    <span className="text-orange-300">&quot;{profile.displayName || profile.username}&quot;</span>
                                    <span className="text-slate-500">,</span>
                                </div>
                                <div>
                                    <span className="text-purple-400">username</span>
                                    <span className="text-slate-500">: </span>
                                    <span className="text-orange-300">&quot;@{profile.username}&quot;</span>
                                    <span className="text-slate-500">,</span>
                                </div>
                                {profile.bio && (
                                    <div>
                                        <span className="text-purple-400">bio</span>
                                        <span className="text-slate-500">: </span>
                                        <span className="text-orange-300">&quot;{profile.bio}&quot;</span>
                                        <span className="text-slate-500">,</span>
                                    </div>
                                )}
                                {profile.location && (
                                    <div>
                                        <span className="text-purple-400">location</span>
                                        <span className="text-slate-500">: </span>
                                        <span className="text-orange-300">&quot;{profile.location}&quot;</span>
                                        <span className="text-slate-500">,</span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-purple-400">links</span>
                                    <span className="text-slate-500">: </span>
                                    <span className="text-slate-400">{`{`}</span>
                                </div>
                                <div className="pl-4 space-y-1">
                                    {profile.githubUrl && (
                                        <div>
                                            <span className="text-purple-400">github</span>
                                            <span className="text-slate-500">: </span>
                                            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                &quot;{profile.githubUrl}&quot;
                                            </a>
                                            <span className="text-slate-500">,</span>
                                        </div>
                                    )}
                                    {profile.linkedinUrl && (
                                        <div>
                                            <span className="text-purple-400">linkedin</span>
                                            <span className="text-slate-500">: </span>
                                            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                &quot;{profile.linkedinUrl}&quot;
                                            </a>
                                            <span className="text-slate-500">,</span>
                                        </div>
                                    )}
                                    {profile.twitterUrl && (
                                        <div>
                                            <span className="text-purple-400">twitter</span>
                                            <span className="text-slate-500">: </span>
                                            <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                &quot;{profile.twitterUrl}&quot;
                                            </a>
                                            <span className="text-slate-500">,</span>
                                        </div>
                                    )}
                                    {profile.websiteUrl && (
                                        <div>
                                            <span className="text-purple-400">website</span>
                                            <span className="text-slate-500">: </span>
                                            <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                &quot;{profile.websiteUrl}&quot;
                                            </a>
                                            <span className="text-slate-500">,</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-slate-400">{`}`}</div>
                            </div>

                            <div className="text-slate-400">{`}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProfileHeader({ profile, headerStyle = 'terminal' }: ProfileHeaderProps) {
    const [copied, setCopied] = useState(false);

    const initials = (profile.displayName || profile.username)
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    const handleShare = async () => {
        const url = `${window.location.origin}/u/${profile.username}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const commonProps = { profile, initials, handleShare, copied };

    // Render different header styles
    switch (headerStyle) {
        case 'code_editor':
            return <CodeEditorHeader {...commonProps} />;
        case 'git_commit':
            return <GitCommitHeader {...commonProps} />;
        case 'readme':
            return <ReadmeHeader {...commonProps} />;
        case 'console_log':
            return <ConsoleLogHeader {...commonProps} />;
        case 'terminal':
        default:
            return <TerminalHeader {...commonProps} />;
    }
}
