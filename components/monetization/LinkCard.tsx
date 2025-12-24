'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { deleteMonetizationLink, updateMonetizationLink } from '@/app/actions/monetization';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LinkCardProps {
    link: {
        id: string;
        category: 'product' | 'booking' | 'affiliate';
        title: string;
        description: string | null;
        url: string;
        price: number | null;
        coverImage: string | null;
        clicks: number | null;
        isActive: boolean;
    };
}

export function LinkCard({ link }: LinkCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTogglingActive, setIsTogglingActive] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this link?')) return;

        setIsDeleting(true);
        const result = await deleteMonetizationLink(link.id);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Link deleted successfully');
            router.refresh();
        }
        setIsDeleting(false);
    };

    const handleToggleActive = async () => {
        setIsTogglingActive(true);
        const result = await updateMonetizationLink(link.id, {
            isActive: !link.isActive,
        });

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(link.isActive ? 'Link hidden' : 'Link activated');
            router.refresh();
        }
        setIsTogglingActive(false);
    };

    const getCategoryColor = () => {
        switch (link.category) {
            case 'product':
                return 'border-green-500 bg-green-500/10';
            case 'booking':
                return 'border-blue-500 bg-blue-500/10';
            case 'affiliate':
                return 'border-purple-500 bg-purple-500/10';
        }
    };

    const getCategoryIcon = () => {
        switch (link.category) {
            case 'product':
                return '📦';
            case 'booking':
                return '📞';
            case 'affiliate':
                return '🔗';
        }
    };

    return (
        <Card className={`bg-slate-900 border-l-4 ${getCategoryColor()}`}>
            <CardContent className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    {/* Cover Image (for products) */}
                    {link.coverImage && (
                        <div className="flex-shrink-0 w-full sm:w-auto">
                            <img
                                src={link.coverImage}
                                alt={link.title}
                                className="w-full sm:w-16 md:w-20 h-32 sm:h-16 md:h-20 object-cover rounded"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-lg md:text-xl">{getCategoryIcon()}</span>
                                    <h3 className="text-base md:text-lg font-semibold text-white truncate">
                                        {link.title}
                                    </h3>
                                    {!link.isActive && (
                                        <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                                            Hidden
                                        </span>
                                    )}
                                </div>
                                {link.description && (
                                    <p className="text-slate-400 text-xs md:text-sm mt-1 line-clamp-2">
                                        {link.description}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-xs md:text-sm">
                                    {link.price && (
                                        <span className="text-green-400 font-semibold">
                                            ₹{(link.price / 100).toLocaleString()}
                                        </span>
                                    )}
                                    <span className="text-slate-500">
                                        {link.clicks || 0} clicks
                                    </span>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        <span className="hidden sm:inline">View Link</span>
                                        <span className="sm:hidden">View</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col items-center gap-1 md:gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleToggleActive}
                                    disabled={isTogglingActive}
                                    className="text-slate-400 hover:text-white"
                                >
                                    {link.isActive ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-400 hover:text-white"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
