'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addTechnology, removeTechnology } from '@/app/actions/tech-stack';
import { X, Plus } from 'lucide-react';

interface TechStackItem {
    id: string;
    technology: string;
    category: string;
}

interface TechStackManagerProps {
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

const popularTechnologies = {
    frontend: ['React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Java', 'Go', 'Ruby', 'PHP', 'C#', '.NET'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Linux'],
    mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android'],
    other: ['Git', 'GraphQL', 'REST API', 'WebSockets', 'Testing'],
};

export default function TechStackManager({ techStack: initialTechStack }: TechStackManagerProps) {
    const [techStack, setTechStack] = useState(initialTechStack);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof popularTechnologies>('frontend');

    async function handleRemove(id: string) {
        await removeTechnology(id);
        setTechStack(techStack.filter((t) => t.id !== id));
    }

    async function handleAdd(technology: string, category: string) {
        // Check if already added
        if (techStack.some((t) => t.technology.toLowerCase() === technology.toLowerCase())) {
            return;
        }

        const formData = new FormData();
        formData.append('technology', technology);
        formData.append('category', category);

        const result = await addTechnology(formData);

        if (result.success) {
            setTechStack([
                ...techStack,
                {
                    id: crypto.randomUUID(),
                    technology,
                    category,
                },
            ]);
        }
    }

    const groupedByCategory = techStack.reduce((acc, tech) => {
        if (!acc[tech.category]) {
            acc[tech.category] = [];
        }
        acc[tech.category].push(tech);
        return acc;
    }, {} as Record<string, TechStackItem[]>);

    return (
        <div className="space-y-6 w-full max-w-full">
            {/* Current Tech Stack */}
            <Card className="bg-slate-800/50 border-slate-700 overflow-x-hidden">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-green-400 font-mono">Your Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                    {techStack.length === 0 ? (
                        <p className="text-sm sm:text-base text-slate-400 text-center py-6 sm:py-8">
                            No technologies added yet. Add your first technology below!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {Object.entries(groupedByCategory).map(([category, techs]) => (
                                <div key={category}>
                                    <h3 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 capitalize">{category}</h3>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {techs.map((tech) => (
                                            <Badge
                                                key={tech.id}
                                                className={`${categoryColors[tech.category] || categoryColors.other
                                                    } text-white font-mono px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2`}
                                            >
                                                {tech.technology}
                                                <button
                                                    onClick={() => handleRemove(tech.id)}
                                                    className="hover:text-red-300 transition-colors p-0.5 -mr-1"
                                                    aria-label="Remove technology"
                                                >
                                                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Technology */}
            <Card className="bg-slate-800/50 border-slate-700 overflow-x-hidden">
                <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg sm:text-xl text-green-400 font-mono">Add Technology</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsAdding(!isAdding)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs sm:text-sm"
                        >
                            {isAdding ? 'Cancel' : <><Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> <span className="hidden xs:inline">Custom</span><span className="xs:hidden">+</span></>}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isAdding ? (
                        <CustomTechForm
                            onAdd={(tech, category) => {
                                handleAdd(tech, category);
                                setIsAdding(false);
                            }}
                            onCancel={() => setIsAdding(false)}
                        />
                    ) : (
                        <>
                            {/* Category Tabs */}
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                                {Object.keys(popularTechnologies).map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category as keyof typeof popularTechnologies)}
                                        className={
                                            selectedCategory === category
                                                ? 'bg-green-600 hover:bg-green-700 text-white font-mono whitespace-nowrap text-xs sm:text-sm'
                                                : 'border-slate-600 text-slate-300 hover:bg-slate-700 font-mono whitespace-nowrap text-xs sm:text-sm'
                                        }
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </Button>
                                ))}
                            </div>

                            {/* Popular Technologies */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {popularTechnologies[selectedCategory].map((tech) => {
                                    const isAdded = techStack.some((t) => t.technology.toLowerCase() === tech.toLowerCase());
                                    return (
                                        <Button
                                            key={tech}
                                            variant="outline"
                                            size="sm"
                                            disabled={isAdded}
                                            onClick={() => handleAdd(tech, selectedCategory)}
                                            className={`border-slate-600 text-slate-300 hover:bg-slate-700 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 ${isAdded ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isAdded ? '✓ ' : '+ '}
                                            {tech}
                                        </Button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function CustomTechForm({
    onAdd,
    onCancel,
}: {
    onAdd: (technology: string, category: string) => void;
    onCancel: () => void;
}) {
    const [technology, setTechnology] = useState('');
    const [category, setCategory] = useState<string>('other');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (technology.trim()) {
            onAdd(technology.trim(), category);
            setTechnology('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="technology" className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 font-mono">
                    Technology Name
                </label>
                <input
                    type="text"
                    id="technology"
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Rust, Svelte, etc."
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 font-mono">
                    Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="devops">DevOps</option>
                    <option value="mobile">Mobile</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono text-sm sm:text-base py-2 sm:py-2.5">
                    Add Technology
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 text-sm sm:text-base py-2 sm:py-2.5"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
