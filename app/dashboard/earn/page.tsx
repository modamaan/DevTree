import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getMyMonetizationLinks } from '@/app/actions/monetization';
import { MonetizationManager } from '@/components/monetization/MonetizationManager';

export default async function EarnPage() {
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const result = await getMyMonetizationLinks();

    if (result.error) {
        return (
            <div className="p-8">
                <div className="text-red-400">Error loading monetization links</div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <MonetizationManager
                initialLinks={result.links as any}
                totalClicks={result.totalClicks!}
                stats={result.stats!}
            />
        </div>
    );
}
