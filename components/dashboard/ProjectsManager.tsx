'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createProject, updateProject, deleteProject } from '@/app/actions/projects';
import { Pencil, Trash2, Plus, Github, ExternalLink } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string | null;
    techStack: string[] | null;
    githubUrl: string | null;
    liveUrl: string | null;
    imageUrl: string | null;
    order: number;
}

interface ProjectsManagerProps {
    projects: Project[];
}

export default function ProjectsManager({ projects: initialProjects }: ProjectsManagerProps) {
    const [projects, setProjects] = useState(initialProjects);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (confirm('Are you sure you want to delete this project?')) {
            await deleteProject(id);
            setProjects(projects.filter((p) => p.id !== id));
        }
    }

    return (
        <div className="space-y-6">
            {/* Add New Project Button */}
            {!isAdding && (
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-mono"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            )}

            {/* Add Project Form */}
            {isAdding && (
                <ProjectForm
                    onCancel={() => setIsAdding(false)}
                    onSuccess={(newProject) => {
                        setProjects([...projects, newProject]);
                        setIsAdding(false);
                    }}
                />
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-6">
                {projects.map((project) =>
                    editingId === project.id ? (
                        <ProjectForm
                            key={project.id}
                            project={project}
                            onCancel={() => setEditingId(null)}
                            onSuccess={(updated) => {
                                setProjects(projects.map((p) => (p.id === project.id ? { ...p, ...updated } : p)));
                                setEditingId(null);
                            }}
                        />
                    ) : (
                        <Card key={project.id} className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg sm:text-xl text-green-400 font-mono">{project.title}</CardTitle>
                                        {project.description && (
                                            <CardDescription className="text-slate-400 mt-2">
                                                {project.description}
                                            </CardDescription>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingId(project.id)}
                                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(project.id)}
                                            className="border-red-700 text-red-400 hover:bg-red-900/20"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
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
                                <div className="flex gap-3">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-1"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-1"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )
                )}
            </div>

            {projects.length === 0 && !isAdding && (
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="py-12 text-center">
                        <p className="text-slate-400">No projects yet. Add your first project to showcase your work!</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function ProjectForm({
    project,
    onCancel,
    onSuccess,
}: {
    project?: Project;
    onCancel: () => void;
    onSuccess: (project: any) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const result = project
            ? await updateProject(project.id, formData)
            : await createProject(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            const techStackStr = formData.get('techStack') as string;
            const data = {
                id: project?.id || crypto.randomUUID(),
                title: formData.get('title') as string,
                description: formData.get('description') as string || null,
                techStack: techStackStr ? techStackStr.split(',').map(t => t.trim()) : [],
                githubUrl: formData.get('githubUrl') as string || null,
                liveUrl: formData.get('liveUrl') as string || null,
                imageUrl: formData.get('imageUrl') as string || null,
                order: project?.order || 0,
            };
            onSuccess(data);
        }
    }

    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <CardTitle className="text-green-400 font-mono">
                    {project ? 'Edit Project' : 'Add New Project'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={project?.title}
                            required
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="My Awesome Project"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={project?.description || ''}
                            rows={3}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            placeholder="Brief description of your project..."
                        />
                    </div>

                    <div>
                        <label htmlFor="techStack" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Tech Stack (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="techStack"
                            name="techStack"
                            defaultValue={project?.techStack?.join(', ')}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="React, Node.js, PostgreSQL"
                        />
                    </div>

                    <div>
                        <label htmlFor="githubUrl" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            GitHub URL
                        </label>
                        <input
                            type="url"
                            id="githubUrl"
                            name="githubUrl"
                            defaultValue={project?.githubUrl || ''}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://github.com/username/repo"
                        />
                    </div>

                    <div>
                        <label htmlFor="liveUrl" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Live Demo URL
                        </label>
                        <input
                            type="url"
                            id="liveUrl"
                            name="liveUrl"
                            defaultValue={project?.liveUrl || ''}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://myproject.com"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono"
                        >
                            {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
