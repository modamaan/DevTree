'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface ResumeSectionProps {
    resumeUrl: string;
    userId: string;
}

export default function ResumeSection({ resumeUrl, userId }: ResumeSectionProps) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);

        // Track download
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventType: 'resume_download',
                userId,
                metadata: { resumeUrl },
            }),
        }).catch(console.error);

        // Open resume in new tab
        window.open(resumeUrl, '_blank', 'noopener,noreferrer');

        setTimeout(() => setDownloading(false), 1000);
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-green-400 font-mono mb-4">
                {'>'} Resume
            </h3>
            <p className="text-slate-400 mb-6">
                Download my resume to learn more about my experience and skills
            </p>
            <Button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-green-600 hover:bg-green-700 text-white font-mono shadow-lg shadow-green-500/30"
            >
                <Download className="w-4 h-4 mr-2" />
                {downloading ? 'Opening...' : 'Download Resume'}
            </Button>
        </div>
    );
}
