'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface FeatureLockedCardProps {
    featureName: string;
    featureDisplayName: string;
    description: string;
    price: number; // in rupees
    onUnlock: () => void;
}

export default function FeatureLockedCard({
    featureName,
    featureDisplayName,
    description,
    price,
    onUnlock,
}: FeatureLockedCardProps) {
    return (
        <Card className="bg-slate-800/50 border-slate-700 relative overflow-hidden">
            {/* Lock Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center space-y-4 p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600">
                        <Lock className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white font-mono mb-2">
                            Premium Feature
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 max-w-xs">
                            {description}
                        </p>
                        <Button
                            onClick={onUnlock}
                            className="bg-green-600 hover:bg-green-700 text-white font-mono"
                        >
                            Unlock for ₹{price}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Blurred Content Preview */}
            <CardHeader>
                <CardTitle className="text-green-400 font-mono">{featureDisplayName}</CardTitle>
                <CardDescription className="text-slate-400">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="h-10 bg-slate-700/50 rounded animate-pulse" />
                    <div className="h-10 bg-slate-700/50 rounded animate-pulse" />
                    <div className="h-10 bg-slate-700/50 rounded animate-pulse" />
                </div>
            </CardContent>
        </Card>
    );
}
