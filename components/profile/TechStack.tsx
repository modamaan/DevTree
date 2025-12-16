'use client';

import { Badge } from '@/components/ui/badge';

interface TechStackItem {
    id: string;
    technology: string;
    category: string;
}

interface TechStackProps {
    techStack: TechStackItem[];
}

const categoryColors: Record<string, string> = {
    frontend: 'bg-blue-600 hover:bg-blue-700',
    backend: 'bg-green-600 hover:bg-green-700',
    database: 'bg-purple-600 hover:bg-purple-700',
    devops: 'bg-orange-600 hover:bg-orange-700',
    mobile: 'bg-pink-600 hover:bg-pink-700',
    other: 'bg-slate-600 hover:bg-slate-700',
};

export default function TechStack({ techStack }: TechStackProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
                <Badge
                    key={tech.id}
                    className={`${categoryColors[tech.category] || categoryColors.other
                        } text-white font-mono px-4 py-2 text-sm transition-all hover:scale-105`}
                >
                    {tech.technology}
                </Badge>
            ))}
        </div>
    );
}
