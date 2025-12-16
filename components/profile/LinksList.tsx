'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';

interface Link {
    id: string;
    title: string;
    url: string;
    highlighted: boolean | null;
    clicks: number | null;
}

interface LinksListProps {
    links: Link[];
    userId: string;
}

export default function LinksList({ links, userId }: LinksListProps) {
    const [clickedLinks, setClickedLinks] = useState<Set<string>>(new Set());

    const handleLinkClick = async (linkId: string, url: string) => {
        // Track click
        if (!clickedLinks.has(linkId)) {
            setClickedLinks(new Set(clickedLinks).add(linkId));

            fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'link_click',
                    userId,
                    metadata: { linkId },
                }),
            }).catch(console.error);
        }

        // Open link
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="space-y-3">
            {links.map((link) => (
                <Button
                    key={link.id}
                    variant={link.highlighted ? 'default' : 'outline'}
                    className={`w-full h-auto py-3 sm:py-4 px-4 sm:px-6 text-left justify-between group transition-all ${link.highlighted
                        ? 'bg-green-600 hover:bg-green-700 border-green-500 text-white font-semibold shadow-lg shadow-green-500/30'
                        : 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-600 text-slate-200'
                        }`}
                    onClick={() => handleLinkClick(link.id, link.url)}
                >
                    <span className="flex items-center gap-2 sm:gap-3 min-w-0">
                        {link.highlighted && <Star className="w-4 h-4 flex-shrink-0 fill-current" />}
                        <span className="font-mono text-sm sm:text-base truncate">{link.title}</span>
                    </span>
                    <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
            ))}
        </div>
    );
}
