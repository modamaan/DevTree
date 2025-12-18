'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { MapPin, Briefcase, Code, Share2, Check } from 'lucide-react';

interface ProfileHeaderProps {
    profile: {
        username: string;
        displayName: string | null;
        bio: string | null;
        avatar: string | null;
        location: string | null;
        openToWork: boolean | null;
        freelanceAvailable: boolean | null;
        githubUsername: string | null;
    };
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    const [copied, setCopied] = useState(false);

    const initials = (profile.displayName || profile.username)
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleShare = async () => {
        const profileUrl = `${window.location.origin}/u/${profile.username}`;

        try {
            // Try native share API first (mobile)
            if (navigator.share) {
                await navigator.share({
                    title: `${profile.displayName || profile.username} - DevTree`,
                    text: `Check out ${profile.displayName || profile.username}'s developer profile!`,
                    url: profileUrl,
                });
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(profileUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (error) {
            // If share fails, copy to clipboard
            try {
                await navigator.clipboard.writeText(profileUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (clipboardError) {
                console.error('Failed to copy:', clipboardError);
            }
        }
    };

    return (
        <div className="relative">
            {/* Terminal window header */}
            <div className="bg-slate-800 rounded-t-lg border border-slate-700 px-3 sm:px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 sm:gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-400 font-mono ml-2 sm:ml-4">
                        ~/{profile.username}
                    </span>
                </div>

                {/* Share Button */}
                <Button
                    onClick={handleShare}
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 sm:px-3 text-slate-400 hover:text-green-400 hover:bg-slate-700/50 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-1.5" />
                            <span className="hidden sm:inline text-xs">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-1.5" />
                            <span className="hidden sm:inline text-xs">Share</span>
                        </>
                    )}
                </Button>
            </div>

            {/* Profile content */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 border-t-0 rounded-b-lg p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
                    {/* Avatar */}
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-green-500/50 shadow-lg shadow-green-500/20">
                        <AvatarImage src={profile.avatar || undefined} alt={profile.displayName || profile.username} />
                        <AvatarFallback className="bg-slate-800 text-green-400 text-xl sm:text-2xl font-mono">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            {profile.displayName || profile.username}
                        </h1>
                        <p className="text-green-400 font-mono mb-3 sm:mb-4 text-sm sm:text-base">@{profile.username}</p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3 sm:mb-4">
                            {profile.openToWork && (
                                <Badge variant="success" className="font-mono text-xs sm:text-sm">
                                    <Briefcase className="w-3 h-3 mr-1" />
                                    Open to Work
                                </Badge>
                            )}
                            {profile.freelanceAvailable && (
                                <Badge variant="default" className="font-mono bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                                    <Code className="w-3 h-3 mr-1" />
                                    Freelance Available
                                </Badge>
                            )}
                            {profile.location && (
                                <Badge variant="outline" className="font-mono border-slate-600 text-slate-300 text-xs sm:text-sm">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {profile.location}
                                </Badge>
                            )}
                        </div>

                        {/* Bio */}
                        {profile.bio && (
                            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed text-sm sm:text-base">
                                <ReactMarkdown>
                                    {profile.bio}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
