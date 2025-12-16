'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/app/actions/profile';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
    profile: {
        username: string;
        displayName: string | null;
        bio: string | null;
        location: string | null;
        openToWork: boolean | null;
        freelanceAvailable: boolean | null;
        theme: string | null;
    };
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await updateProfile(formData);

        if (result.error) {
            setError(result.error);
        } else {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }

        setLoading(false);
    }

    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <CardTitle className="text-green-400 font-mono">Profile Information</CardTitle>
                <CardDescription className="text-slate-400">
                    This information will be displayed on your public profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Username *
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={profile.username}
                            required
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
                            placeholder="your-username"
                        />
                        <p className="text-xs text-slate-500 mt-1">Your profile will be at: devtree.com/u/{profile.username}</p>
                    </div>

                    {/* Display Name */}
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Display Name *
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            defaultValue={profile.displayName || ''}
                            required
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Bio (Markdown supported)
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            defaultValue={profile.bio || ''}
                            rows={4}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            placeholder="Tell us about yourself..."
                        />
                        <p className="text-xs text-slate-500 mt-1">Max 500 characters. Markdown is supported.</p>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            defaultValue={profile.location || ''}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="San Francisco, CA"
                        />
                    </div>

                    {/* Badges */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-300 font-mono">Badges</label>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="openToWork"
                                name="openToWork"
                                value="true"
                                defaultChecked={profile.openToWork || false}
                                className="w-4 h-4 bg-slate-900 border-slate-600 rounded focus:ring-2 focus:ring-green-500"
                            />
                            <label htmlFor="openToWork" className="text-sm text-slate-300">
                                Open to Work
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="freelanceAvailable"
                                name="freelanceAvailable"
                                value="true"
                                defaultChecked={profile.freelanceAvailable || false}
                                className="w-4 h-4 bg-slate-900 border-slate-600 rounded focus:ring-2 focus:ring-green-500"
                            />
                            <label htmlFor="freelanceAvailable" className="text-sm text-slate-300">
                                Available for Freelance
                            </label>
                        </div>
                    </div>

                    {/* Theme */}
                    <div>
                        <label htmlFor="theme" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Theme
                        </label>
                        <select
                            id="theme"
                            name="theme"
                            defaultValue={profile.theme || 'terminal'}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="terminal">Terminal</option>
                            <option value="vscode">VS Code</option>
                        </select>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 text-sm">
                            Profile updated successfully!
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-mono"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
