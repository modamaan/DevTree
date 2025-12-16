'use client';

import { UserButton } from '@clerk/nextjs';

export default function ClerkUserButton() {
    return (
        <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements: {
                    userButtonAvatarBox: "w-10 h-10 border-2 border-green-500",
                    userButtonPopoverCard: "bg-slate-800 border border-slate-700",
                    userButtonPopoverActionButton: "text-slate-300 hover:bg-slate-700",
                    userButtonPopoverActionButtonText: "text-slate-300",
                }
            }}
        />
    );
}
