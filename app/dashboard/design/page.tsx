import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDesignSettings } from '@/app/actions/design';
import DesignManager from '@/components/dashboard/DesignManager';

export default async function DesignPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const designSettings = await getDesignSettings();

    if (!designSettings) {
        redirect('/');
    }

    return (
        <div>
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Design</h1>
                <p className="text-sm sm:text-base text-slate-400">Customize how your profile looks</p>
            </div>

            <DesignManager initialSettings={designSettings} />
        </div>
    );
}
