'use client';

import { Badge } from '@/components/ui/badge';
import * as icons from 'simple-icons';

interface TechStackItem {
    id: string;
    technology: string;
    category: string;
}

interface TechStackProps {
    techStack: TechStackItem[];
}

// Category configuration with emojis and colors
const categoryConfig: Record<string, { emoji: string; label: string; color: string }> = {
    'ai-ml': { emoji: '🧠', label: 'AI / ML', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
    frontend: { emoji: '🌐', label: 'Frontend', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
    backend: { emoji: '⚙️', label: 'Backend', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
    database: { emoji: '🗄️', label: 'Database', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
    devops: { emoji: '☁️', label: 'DevOps & Tools', color: 'from-slate-500/20 to-zinc-500/20 border-slate-500/30' },
    mobile: { emoji: '📱', label: 'Mobile', color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30' },
    other: { emoji: '🔧', label: 'Other', color: 'from-gray-500/20 to-slate-500/20 border-gray-500/30' },
};

// Map technology names to Simple Icons slug
const techToIconSlug: Record<string, string> = {
    // AI / ML
    python: 'python',
    tensorflow: 'tensorflow',
    pytorch: 'pytorch',
    langchain: 'langchain',
    openai: 'openai',
    huggingface: 'huggingface',
    jupyter: 'jupyter',
    numpy: 'numpy',
    pandas: 'pandas',
    scikitlearn: 'scikitlearn',
    keras: 'keras',

    // Frontend
    react: 'react',
    'next.js': 'nextdotjs',
    nextjs: 'nextdotjs',
    vue: 'vuedotjs',
    'vue.js': 'vuedotjs',
    angular: 'angular',
    svelte: 'svelte',
    typescript: 'typescript',
    javascript: 'javascript',
    tailwind: 'tailwindcss',
    tailwindcss: 'tailwindcss',
    sass: 'sass',
    css: 'css3',
    html: 'html5',
    vite: 'vite',
    webpack: 'webpack',
    shadcn: 'shadcnui',
    'shadcn/ui': 'shadcnui',

    // Backend
    'node.js': 'nodedotjs',
    nodejs: 'nodedotjs',
    node: 'nodedotjs',
    express: 'express',
    'express.js': 'express',
    fastapi: 'fastapi',
    django: 'django',
    flask: 'flask',
    nestjs: 'nestjs',
    go: 'go',
    golang: 'go',
    rust: 'rust',
    java: 'openjdk',
    kotlin: 'kotlin',
    'c#': 'csharp',
    csharp: 'csharp',
    '.net': 'dotnet',
    dotnet: 'dotnet',
    graphql: 'graphql',
    drizzle: 'drizzle',
    'drizzle orm': 'drizzle',
    prisma: 'prisma',

    // Database
    postgresql: 'postgresql',
    postgres: 'postgresql',
    mysql: 'mysql',
    mongodb: 'mongodb',
    redis: 'redis',
    sqlite: 'sqlite',
    supabase: 'supabase',
    firebase: 'firebase',
    neon: 'neon',
    planetscale: 'planetscale',

    // DevOps & Tools
    docker: 'docker',
    kubernetes: 'kubernetes',
    k8s: 'kubernetes',
    aws: 'amazonwebservices',
    gcp: 'googlecloud',
    azure: 'microsoftazure',
    vercel: 'vercel',
    netlify: 'netlify',
    github: 'github',
    gitlab: 'gitlab',
    git: 'git',
    linux: 'linux',
    nginx: 'nginx',
    terraform: 'terraform',
    jenkins: 'jenkins',
    'github actions': 'githubactions',

    // Mobile
    'react native': 'react',
    reactnative: 'react',
    flutter: 'flutter',
    swift: 'swift',
    android: 'android',
    ios: 'ios',
    expo: 'expo',

    // Other
    websockets: 'socketdotio',
    'socket.io': 'socketdotio',
    stripe: 'stripe',
    twilio: 'twilio',
    clerk: 'clerk',
    auth0: 'auth0',
};

function getIconSvg(technology: string): string | null {
    const slug = techToIconSlug[technology.toLowerCase()];
    if (!slug) return null;

    const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof icons;
    const icon = icons[iconKey];

    if (icon && 'svg' in icon) {
        return icon.svg;
    }
    return null;
}

function getIconColor(technology: string): string {
    const slug = techToIconSlug[technology.toLowerCase()];
    if (!slug) return '#94a3b8'; // slate-400

    const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof icons;
    const icon = icons[iconKey];

    if (icon && 'hex' in icon) {
        return `#${icon.hex}`;
    }
    return '#94a3b8';
}

export default function TechStack({ techStack }: TechStackProps) {
    // Group tech stack by category
    const grouped = techStack.reduce((acc, tech) => {
        const category = tech.category || 'other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tech);
        return acc;
    }, {} as Record<string, TechStackItem[]>);

    // Sort categories in a logical order
    const categoryOrder = ['ai-ml', 'frontend', 'backend', 'database', 'devops', 'mobile', 'other'];
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a);
        const bIndex = categoryOrder.indexOf(b);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

    return (
        <div className="space-y-6">
            {sortedCategories.map((category) => {
                const config = categoryConfig[category] || categoryConfig.other;
                const items = grouped[category];

                return (
                    <div key={category} className="space-y-3">
                        {/* Category Header */}
                        <h3 className="text-sm font-medium text-slate-400 font-mono flex items-center gap-2">
                            <span>{config.emoji}</span>
                            <span>{config.label}</span>
                        </h3>

                        {/* Tech Items */}
                        <div className="flex flex-wrap gap-2">
                            {items.map((tech) => {
                                const iconSvg = getIconSvg(tech.technology);
                                const iconColor = getIconColor(tech.technology);

                                return (
                                    <Badge
                                        key={tech.id}
                                        className={`bg-gradient-to-r ${config.color} border text-white font-mono px-3 py-1.5 text-sm transition-all hover:scale-105 flex items-center gap-2`}
                                    >
                                        {iconSvg ? (
                                            <span
                                                className="w-4 h-4 flex-shrink-0"
                                                style={{ color: iconColor }}
                                                dangerouslySetInnerHTML={{
                                                    __html: iconSvg.replace(
                                                        '<svg',
                                                        '<svg fill="currentColor" width="16" height="16"'
                                                    ),
                                                }}
                                            />
                                        ) : (
                                            <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-xs">
                                                💻
                                            </span>
                                        )}
                                        <span>{tech.technology}</span>
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
