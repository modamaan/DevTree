'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X } from 'lucide-react';
import { checkUsernameAvailability } from '@/app/actions/username';

export default function UsernameClaimForm() {
    const [username, setUsername] = useState('');
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    async function checkAvailability(value: string) {
        if (value.length < 3) {
            setAvailable(null);
            return;
        }

        setChecking(true);
        try {
            // Use Server Action instead of API route
            const result = await checkUsernameAvailability(value);
            setAvailable(result.available);
        } catch (error) {
            console.error('Error checking username:', error);
            setAvailable(null);
        } finally {
            setChecking(false);
        }
    }

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
        setUsername(value);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Reset availability while typing
        setAvailable(null);

        // Debounce check - only check after user stops typing for 500ms
        if (value.length >= 3) {
            debounceTimer.current = setTimeout(() => {
                checkAvailability(value);
            }, 500);
        }
    }

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!username || !available) return;

        setLoading(true);
        try {
            // Store claimed username in sessionStorage
            sessionStorage.setItem('claimedUsername', username);

            // Redirect to sign up
            router.push(`/sign-up`);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* Username Input */}
                <div className="flex-1 relative">
                    <div className="flex items-center bg-white rounded-full border-2 border-slate-300 focus-within:border-slate-900 transition-colors overflow-hidden">
                        <span className="pl-6 pr-2 text-slate-500 font-mono text-lg">
                            devtree.site/u/
                        </span>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="yourname"
                            className="flex-1 py-4 pr-12 text-lg font-mono focus:outline-none bg-transparent text-slate-900"
                            minLength={3}
                            maxLength={30}
                            required
                        />
                        {/* Status Icon */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {checking && <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />}
                            {!checking && available === true && <Check className="w-5 h-5 text-green-600" />}
                            {!checking && available === false && <X className="w-5 h-5 text-red-600" />}
                        </div>
                    </div>
                    {/* Validation Messages */}
                    {username.length > 0 && username.length < 3 && (
                        <p className="text-sm text-slate-700 mt-2 text-left pl-6">
                            Username must be at least 3 characters
                        </p>
                    )}
                    {available === false && (
                        <p className="text-sm text-red-700 mt-2 text-left pl-6">
                            Username is already taken
                        </p>
                    )}
                    {available === true && (
                        <p className="text-sm text-green-700 mt-2 text-left pl-6">
                            Username is available!
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={!available || loading}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        'Claim your DevTree'
                    )}
                </Button>
            </div>
        </form>
    );
}
