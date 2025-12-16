'use client';

import { useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ className }: { className?: string }) {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <Button
            onClick={handleLogout}
            variant="outline"
            className={className}
        >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
        </Button>
    );
}
