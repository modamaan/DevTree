'use client';

import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Experience {
    id: string;
    company: string;
    role: string;
    employmentType: string;
    startDate: string;
    endDate: string | null;
    description: string | null;
    location: string | null;
}

interface ExperienceSectionProps {
    experiences: Experience[];
    themeStyles: {
        accent: string;
        text: string;
        textMuted: string;
        card: string;
        cardBorder: string;
        heading: string;
    };
}

export default function ExperienceSection({ experiences, themeStyles }: ExperienceSectionProps) {
    if (experiences.length === 0) return null;

    function formatDate(dateStr: string | null): string {
        if (!dateStr) return 'Present';

        const parts = dateStr.split('-');
        if (parts.length === 1) {
            return parts[0];
        } else {
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
            return `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
        } else if (remainingMonths === 0) {
            return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
        } else {
            return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
        }
    }

    function getEmploymentTypeColor(type: string): string {
        switch (type) {
            case 'full-time':
                return 'bg-green-600/80';
            case 'freelance':
                return 'bg-purple-600/80';
            case 'contract':
                return 'bg-blue-600/80';
            case 'internship':
                return 'bg-orange-600/80';
            case 'part-time':
                return 'bg-yellow-600/80';
            default:
                return 'bg-slate-600/80';
        }
    }

    return (
        <section className="mb-8 sm:mb-12">
            <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${themeStyles.heading} font-mono flex items-center gap-2`}>
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                Experience
            </h2>

            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                        {/* Timeline connector */}
                        {index !== experiences.length - 1 && (
                            <div className={`absolute left-[11px] top-12 bottom-0 w-0.5 ${themeStyles.cardBorder} hidden sm:block`} />
                        )}

                        <div className={`${themeStyles.card} backdrop-blur-sm border ${themeStyles.cardBorder} rounded-lg p-4 sm:p-6 relative`}>
                            {/* Timeline dot */}
                            <div className={`absolute left-[-8px] top-6 w-6 h-6 rounded-full ${themeStyles.accent.replace('text-', 'bg-')} border-4 border-slate-900 hidden sm:block`} />

                            <div className="space-y-3">
                                {/* Header */}
                                <div>
                                    <h3 className={`text-lg sm:text-xl font-bold ${themeStyles.text}`}>
                                        {exp.role}
                                    </h3>
                                    <p className={`${themeStyles.accent} font-mono text-sm sm:text-base flex items-center gap-2 mt-1`}>
                                        <Briefcase className="w-4 h-4" />
                                        {exp.company}
                                    </p>
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-2">
                                    <Badge className={`${getEmploymentTypeColor(exp.employmentType)} text-white font-mono text-xs`}>
                                        {exp.employmentType.split('-').map(word =>
                                            word.charAt(0).toUpperCase() + word.slice(1)
                                        ).join(' ')}
                                    </Badge>
                                    <Badge variant="outline" className={`border-slate-600 ${themeStyles.textMuted} font-mono text-xs`}>
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                        <span className="ml-1 opacity-70">
                                            ({calculateDuration(exp.startDate, exp.endDate)})
                                        </span>
                                    </Badge>
                                    {exp.location && (
                                        <Badge variant="outline" className={`border-slate-600 ${themeStyles.textMuted} font-mono text-xs`}>
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {exp.location}
                                        </Badge>
                                    )}
                                </div>

                                {/* Description */}
                                {exp.description && (
                                    <div className={`prose prose-invert prose-sm max-w-none ${themeStyles.text} leading-relaxed`}>
                                        <ReactMarkdown>
                                            {exp.description}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
