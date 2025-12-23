'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { markSharePopupAsSeen } from '@/app/actions/share';

interface SharePopupProps {
    hasSeenPopup: boolean;
}

export default function SharePopup({ hasSeenPopup }: SharePopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Show popup on mount if user hasn't seen it
    useEffect(() => {
        if (!hasSeenPopup) {
            setIsOpen(true);
        }
    }, [hasSeenPopup]);

    const handleDismiss = async () => {
        setIsOpen(false);
        await markSharePopupAsSeen();
    };

    const shareUrl = 'https://devtree.app'; // Update with your actual domain
    const shareText = 'Check out DevTree - A developer-first Linktree alternative! 🚀';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };

    const handleTwitterShare = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    };

    const handleLinkedInShare = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(linkedInUrl, '_blank', 'width=550,height=420');
    };

    const handleWhatsAppShare = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleDismiss()}>
            <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-green-500/10 p-3 rounded-full">
                            <Share2 className="w-8 h-8 text-green-400" />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center text-green-400 font-mono">
                        Share DevTree! 🚀
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-300 text-base mt-2">
                        Help us grow by sharing DevTree with your 2 friends who code!
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Copy Link Button */}
                    <Button
                        onClick={handleCopyLink}
                        className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-mono"
                        size="lg"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5 mr-2" />
                                Copy Link
                            </>
                        )}
                    </Button>

                    {/* Social Media Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <Button
                            onClick={handleTwitterShare}
                            className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-mono"
                            size="lg"
                        >
                            <Twitter className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={handleLinkedInShare}
                            className="bg-[#0A66C2] hover:bg-[#084d94] text-white font-mono"
                            size="lg"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={handleWhatsAppShare}
                            className="bg-[#25D366] hover:bg-[#1fb855] text-white font-mono"
                            size="lg"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Dismiss Button */}
                    <Button
                        onClick={handleDismiss}
                        variant="ghost"
                        className="w-full text-slate-400 hover:text-slate-300 hover:bg-slate-800 font-mono"
                    >
                        Maybe Later
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
