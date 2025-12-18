'use client';

import { useState } from 'react';
import CurrentActivitiesManager from './CurrentActivitiesManager';
import FeatureLockedCard from '@/components/payment/FeatureLockedCard';
import PaymentModal from '@/components/payment/PaymentModal';
import { useRouter } from 'next/navigation';

interface Activity {
    id: string;
    name: string;
    type: 'building' | 'learning';
    createdAt: Date;
}

interface CurrentActivitiesWrapperProps {
    activities: Activity[];
    hasAccess: boolean;
}

export default function CurrentActivitiesWrapper({ activities, hasAccess }: CurrentActivitiesWrapperProps) {
    const [showPayment, setShowPayment] = useState(false);
    const router = useRouter();

    if (!hasAccess) {
        return (
            <>
                <FeatureLockedCard
                    featureName="premium_features"
                    featureDisplayName="Premium Features"
                    description="Activate your public link to unlock ALL premium features including Current Activities, Design Customization, and more"
                    price={20}
                    onUnlock={() => setShowPayment(true)}
                />
                {showPayment && (
                    <PaymentModal
                        featureName="public_link"
                        featureDisplayName="Premium Features"
                        featureDescription="Activate your public link and unlock ALL premium features: Current Activities, Design Customization, and more!"
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

    return <CurrentActivitiesManager activities={activities} />;
}
