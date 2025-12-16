'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string | null;
    techStack: string[] | null;
    githubUrl: string | null;
    liveUrl: string | null;
    imageUrl: string | null;
}

interface ProjectsShowcaseProps {
    projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
                <Card
                    key={project.id}
                    className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all"
                >
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl font-mono text-green-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                            <span className="break-words">{project.title}</span>
                            <div className="flex gap-2">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-green-400 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-green-400 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </CardTitle>
                        {project.description && (
                            <CardDescription className="text-slate-400">
                                {project.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-slate-600 text-slate-300 font-mono"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
