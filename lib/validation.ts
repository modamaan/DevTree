import { z } from 'zod';

// Profile validation
export const profileSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be less than 30 characters')
        .regex(/^[a-z0-9-_]+$/, 'Username can only contain lowercase letters, numbers, hyphens, and underscores'),
    displayName: z.string().min(1, 'Display name is required').max(100),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    location: z.string().max(100).optional(),
    openToWork: z.boolean().default(false),
    freelanceAvailable: z.boolean().default(false),
    theme: z.enum(['terminal', 'vscode']).default('terminal'),
});

// Link validation
export const linkSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    url: z.string().url('Must be a valid URL'),
    enabled: z.boolean().default(true),
    highlighted: z.boolean().default(false),
});

export const linkReorderSchema = z.object({
    linkId: z.string().uuid(),
    newOrder: z.number().int().min(0),
});

// Project validation
export const projectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().max(500).optional(),
    techStack: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional().or(z.literal('')),
    liveUrl: z.string().url().optional().or(z.literal('')),
    imageUrl: z.string().url().optional().or(z.literal('')),
});

// Tech stack validation
export const techStackSchema = z.object({
    technology: z.string().min(1, 'Technology name is required'),
    category: z.enum(['frontend', 'backend', 'database', 'devops', 'mobile', 'other']),
});

// Analytics validation
export const analyticsEventSchema = z.object({
    eventType: z.enum(['profile_view', 'link_click', 'resume_download']),
    userId: z.string().uuid().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
});
