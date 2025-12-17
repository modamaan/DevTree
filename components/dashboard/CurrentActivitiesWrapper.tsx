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
                    featureName="current_activities"
                    featureDisplayName="Current Activities"
                    description="Showcase what you're currently building and learning on your developer profile"
                    price={20}
                    onUnlock={() => setShowPayment(true)}
                />
                {showPayment && (
                    <PaymentModal
                        featureName="current_activities"
                        featureDisplayName="Current Activities"
                        featureDescription="Showcase what you're currently building and learning on your developer profile"
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
