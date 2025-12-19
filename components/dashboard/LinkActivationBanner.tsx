'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, ExternalLink, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { activatePublicLink } from '@/app/actions/links';
import { useToast } from '@/hooks/use-toast';

interface LinkActivationBannerProps {
    username: string;
    isActive: boolean;
}

export default function LinkActivationBanner({ username, isActive }: LinkActivationBannerProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    if (isActive) {
        return (
            <Card className="bg-green-900/20 border-green-700">
                <CardContent className="py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm sm:text-base">Your link is live!</h3>
                                <p className="text-green-300 text-xs sm:text-sm break-all">devtree.site/{username}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => window.open(`/u/${username}`, '_blank')}
                            variant="outline"
                            className="border-green-600 text-green-400 hover:bg-green-900/20 w-full sm:w-auto text-sm"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    async function handleActivate() {
        try {
            setLoading(true);
            const result = await activatePublicLink();

            if (result.error) {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Success! 🎉',
                    description: 'Your public link is now active!',
                });
                router.refresh();
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to activate link. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="bg-green-900/20 border-green-700">
            <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-green-400 font-mono flex items-center gap-2 text-base sm:text-lg">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                    Activate Your Public Link
                </CardTitle>
                <CardDescription className="text-green-300 text-sm sm:text-base">
                    Your profile is ready! Activate your public link for free and share it with the world.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <div className="w-full sm:w-auto">
                        <p className="text-slate-300 mb-1 text-sm">Your link will be:</p>
                        <p className="text-white font-mono text-base sm:text-lg break-all">devtree.site/{username}</p>
                    </div>
                    <Button
                        onClick={handleActivate}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white font-mono w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Activating...
                            </>
                        ) : (
                            'Activate for Free'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
