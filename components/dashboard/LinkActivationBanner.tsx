'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, ExternalLink } from 'lucide-react';
import PaymentModal from '@/components/payment/PaymentModal';
import { useRouter } from 'next/navigation';

interface LinkActivationBannerProps {
    username: string;
    isActive: boolean;
}

export default function LinkActivationBanner({ username, isActive }: LinkActivationBannerProps) {
    const [showPayment, setShowPayment] = useState(false);
    const router = useRouter();

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

    return (
        <>
            <Card className="bg-orange-900/20 border-orange-700">
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-orange-400 font-mono flex items-center gap-2 text-base sm:text-lg">
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                        Activate Your Public Link
                    </CardTitle>
                    <CardDescription className="text-orange-300 text-sm sm:text-base">
                        Your profile is ready! Pay ₹20 to activate your public link and share it with the world.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                        <div className="w-full sm:w-auto">
                            <p className="text-slate-300 mb-1 text-sm">Your link will be:</p>
                            <p className="text-white font-mono text-base sm:text-lg break-all">devtree.site/{username}</p>
                        </div>
                        <Button
                            onClick={() => setShowPayment(true)}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-mono w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                        >
                            Activate for ₹20
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {showPayment && (
                <PaymentModal
                    featureName="link_activation"
                    featureDisplayName="Public Link Activation"
                    featureDescription="Activate your public DevTree link and share your profile with the world"
                    price={20}
                    onSuccess={() => {
                        setShowPayment(false);
                        router.refresh();
                    }}
                    onClose={() => setShowPayment(false)}
                />
            )}
        </>
    );
}
