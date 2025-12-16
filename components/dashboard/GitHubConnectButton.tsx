'use client';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useState } from 'react';

export default function GitHubConnectButton() {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        // Redirect to Clerk's OAuth connection page for GitHub
        // This will trigger the OAuth flow configured in Clerk Dashboard
        window.location.href = '/api/github/connect';
    };

    return (
        <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-green-600 hover:bg-green-700 text-white font-mono"
        >
            <Github className="w-4 h-4 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect GitHub'}
        </Button>
    );
}
