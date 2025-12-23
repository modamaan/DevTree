'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addExperience, updateExperience, deleteExperience } from '@/app/actions/experience';
import { Pencil, Trash2, Plus, Briefcase, MapPin, Calendar } from 'lucide-react';

interface Experience {
    id: string;
    company: string;
    role: string;
    employmentType: string;
    startDate: string;
    endDate: string | null;
    description: string | null;
    location: string | null;
    order: number;
}

interface ExperienceManagerProps {
    experiences: Experience[];
}

export default function ExperienceManager({ experiences: initialExperiences }: ExperienceManagerProps) {
    const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this experience?')) return;

        const result = await deleteExperience(id);
        if (!result.error) {
            setExperiences(experiences.filter((exp) => exp.id !== id));
        }
    }

    function formatDate(dateStr: string | null): string {
        if (!dateStr) return 'Present';

        const parts = dateStr.split('-');
        if (parts.length === 1) {
            // Year only
            return parts[0];
        } else {
            // Year-Month
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const year = parts[0];
            const month = parseInt(parts[1]) - 1;
            return `${months[month]} ${year}`;
        }
    }

    function calculateDuration(start: string, end: string | null): string {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();

        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) {
            return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        } else if (remainingMonths === 0) {
            return `${years} ${years === 1 ? 'year' : 'years'}`;
        } else {
            return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        }
    }

    function getEmploymentTypeColor(type: string): string {
        switch (type) {
            case 'full-time':
                return 'bg-green-600';
            case 'freelance':
                return 'bg-purple-600';
            case 'contract':
                return 'bg-blue-600';
            case 'internship':
                return 'bg-orange-600';
            case 'part-time':
                return 'bg-yellow-600';
            default:
                return 'bg-slate-600';
        }
    }

    return (
        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                            <Briefcase className="w-5 h-5" />
                            Experience
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Showcase your work history and professional experience
                        </CardDescription>
                    </div>
                    <Button
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white font-mono w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add Form */}
                {showAddForm && (
                    <ExperienceForm
                        onCancel={() => setShowAddForm(false)}
                        onSuccess={(newExp) => {
                            setExperiences([newExp, ...experiences]);
                            setShowAddForm(false);
                        }}
                    />
                )}

                {/* Experience List */}
                {experiences.length === 0 && !showAddForm ? (
                    <div className="text-center py-12 text-slate-400">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-mono">No experience added yet</p>
                        <p className="text-sm mt-2">Add your work history, freelance projects, or internships</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {experiences.map((exp) => (
                            <div key={exp.id}>
                                {editingId === exp.id ? (
                                    <ExperienceForm
                                        experience={exp}
                                        onCancel={() => setEditingId(null)}
                                        onSuccess={(updated) => {
                                            setExperiences(
                                                experiences.map((e) => (e.id === exp.id ? updated : e))
                                            );
                                            setEditingId(null);
                                        }}
                                    />
                                ) : (
                                    <Card className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-colors">
                                        <CardContent className="p-4 sm:p-6">
                                            <div className="space-y-4">
                                                {/* Header with Actions */}
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-green-400 font-mono text-sm sm:text-base flex items-center gap-2 mt-1">
                                                            <Briefcase className="w-4 h-4 flex-shrink-0" />
                                                            <span className="truncate">{exp.company}</span>
                                                        </p>
                                                    </div>

                                                    {/* Action Buttons - More Prominent */}
                                                    <div className="flex gap-2 flex-shrink-0">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setEditingId(exp.id)}
                                                            className="border-slate-600 text-slate-300 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                                                            title="Edit experience"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                            <span className="hidden sm:inline ml-2">Edit</span>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(exp.id)}
                                                            className="border-slate-600 text-slate-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                                                            title="Delete experience"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="hidden sm:inline ml-2">Delete</span>
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Meta Info */}
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge className={`${getEmploymentTypeColor(exp.employmentType)} text-white font-mono text-xs`}>
                                                        {exp.employmentType.split('-').map(word =>
                                                            word.charAt(0).toUpperCase() + word.slice(1)
                                                        ).join(' ')}
                                                    </Badge>
                                                    <Badge variant="outline" className="border-slate-600 text-slate-300 font-mono text-xs">
                                                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                                                        <span className="truncate">
                                                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                                        </span>
                                                        <span className="ml-1 text-slate-500 hidden sm:inline">
                                                            ({calculateDuration(exp.startDate, exp.endDate)})
                                                        </span>
                                                    </Badge>
                                                    {exp.location && (
                                                        <Badge variant="outline" className="border-slate-600 text-slate-300 font-mono text-xs">
                                                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                                            <span className="truncate">{exp.location}</span>
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Duration on mobile (below badges) */}
                                                <div className="sm:hidden text-xs text-slate-500 font-mono">
                                                    Duration: {calculateDuration(exp.startDate, exp.endDate)}
                                                </div>

                                                {/* Description */}
                                                {exp.description && (
                                                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                                        {exp.description}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Experience Form Component
function ExperienceForm({
    experience,
    onCancel,
    onSuccess,
}: {
    experience?: Experience;
    onCancel: () => void;
    onSuccess: (experience: any) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPresent, setIsPresent] = useState(!experience?.endDate);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // If "Present" is checked, don't send end date
        if (isPresent) {
            formData.delete('endDate');
        }

        const result = experience
            ? await updateExperience(experience.id, formData)
            : await addExperience(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            // Reload the page to get fresh data from server
            window.location.reload();
        }
    }

    return (
        <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Company *
                        </label>
                        <input
                            type="text"
                            name="company"
                            defaultValue={experience?.company}
                            required
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Acme Inc. or Freelance"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Role/Position *
                        </label>
                        <input
                            type="text"
                            name="role"
                            defaultValue={experience?.role}
                            required
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Full Stack Developer"
                        />
                    </div>

                    {/* Employment Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Employment Type *
                        </label>
                        <select
                            name="employmentType"
                            defaultValue={experience?.employmentType || 'full-time'}
                            required
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="freelance">Freelance</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                                Start Date *
                            </label>
                            <input
                                type="month"
                                name="startDate"
                                defaultValue={experience?.startDate}
                                required
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Format: YYYY-MM</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                                End Date
                            </label>
                            <input
                                type="month"
                                name="endDate"
                                defaultValue={experience?.endDate || ''}
                                disabled={isPresent}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                            />
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="isPresent"
                                    checked={isPresent}
                                    onChange={(e) => setIsPresent(e.target.checked)}
                                    className="w-4 h-4 bg-slate-800 border-slate-600 rounded focus:ring-2 focus:ring-green-500"
                                />
                                <label htmlFor="isPresent" className="text-xs text-slate-400">
                                    Currently working here
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={experience?.location || ''}
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Remote, San Francisco, CA, etc."
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={experience?.description || ''}
                            rows={5}
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono text-sm"
                            placeholder="• Built full-stack apps using Next.js + PostgreSQL&#10;• Integrated Clerk auth & GitHub OAuth&#10;• Deployed to Vercel with CI/CD"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Max 1000 characters. Use bullet points (•) for responsibilities.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono"
                        >
                            {loading ? 'Saving...' : experience ? 'Update' : 'Add Experience'}
                        </Button>
                        <Button
                            type="button"
                            onClick={onCancel}
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
