'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function UsernameClaimHandler() {
    const { isLoaded, isSignedIn } = useUser();
    const [claiming, setClaiming] = useState(false);

    useEffect(() => {
        async function claimUsername() {
            // Only run if user is signed in and Clerk is loaded
            if (!isLoaded || !isSignedIn) return;

            // Check if there's a claimed username in sessionStorage
            const claimedUsername = sessionStorage.getItem('claimedUsername');

            if (!claimedUsername) {
                // No claimed username, nothing to do
                return;
            }

            // Already claiming, don't run again
            if (claiming) return;

            setClaiming(true);

            try {
                // Claim the username via API
                const response = await fetch('/api/username/claim', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: claimedUsername }),
                });

                if (response.ok) {
                    console.log('✓ Username claimed successfully:', claimedUsername);
                } else {
                    console.error('Failed to claim username');
                }
            } catch (error) {
                console.error('Error claiming username:', error);
            } finally {
                // Always clear the claimed username from storage
                sessionStorage.removeItem('claimedUsername');
                setClaiming(false);

                // Refresh the page to show updated username
                window.location.reload();
            }
        }

        claimUsername();
    }, [isLoaded, isSignedIn, claiming]);

    // Don't render anything - this component works silently in the background
    return null;
}
