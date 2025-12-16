import { pgTable, text, timestamp, uuid, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - synced from Clerk
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkId: text('clerk_id').notNull().unique(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Profiles table - public developer profile
export const profiles = pgTable('profiles', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    username: text('username').notNull().unique(),
    displayName: text('display_name'),
    bio: text('bio'), // Markdown supported
    avatar: text('avatar'),
    location: text('location'),
    openToWork: boolean('open_to_work').default(false),
    freelanceAvailable: boolean('freelance_available').default(false),
    githubConnected: boolean('github_connected').default(false),
    githubUsername: text('github_username'),
    githubAccessToken: text('github_access_token'), // Encrypted in production
    resumeUrl: text('resume_url'),
    theme: text('theme').default('terminal'), // 'terminal' | 'vscode'
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Links table - Linktree-style links
export const links = pgTable('links', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    url: text('url').notNull(),
    enabled: boolean('enabled').default(true),
    highlighted: boolean('highlighted').default(false), // CTA link
    order: integer('order').notNull().default(0),
    clicks: integer('clicks').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Projects table - showcase projects
export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    description: text('description'),
    techStack: jsonb('tech_stack').$type<string[]>().default([]), // Array of tech names
    githubUrl: text('github_url'),
    liveUrl: text('live_url'),
    imageUrl: text('image_url'),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tech Stack table - technologies user knows
export const techStack = pgTable('tech_stack', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    technology: text('technology').notNull(), // e.g., 'React', 'Node.js'
    category: text('category').notNull(), // 'frontend', 'backend', 'database', 'devops', 'other'
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// GitHub Repositories table - pinned repos
export const githubRepos = pgTable('github_repos', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    repoId: text('repo_id').notNull(), // GitHub repo ID
    name: text('name').notNull(),
    description: text('description'),
    url: text('url').notNull(),
    stars: integer('stars').default(0),
    forks: integer('forks').default(0),
    language: text('language'),
    pinned: boolean('pinned').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Analytics Events table - track user activity
export const analyticsEvents = pgTable('analytics_events', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    eventType: text('event_type').notNull(), // 'profile_view', 'link_click', 'resume_download'
    metadata: jsonb('metadata').$type<Record<string, any>>().default({}),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
    profile: one(profiles, {
        fields: [users.id],
        references: [profiles.userId],
    }),
    links: many(links),
    projects: many(projects),
    techStack: many(techStack),
    githubRepos: many(githubRepos),
    analyticsEvents: many(analyticsEvents),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
    user: one(users, {
        fields: [profiles.userId],
        references: [users.id],
    }),
}));

export const linksRelations = relations(links, ({ one }) => ({
    user: one(users, {
        fields: [links.userId],
        references: [users.id],
    }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
}));

export const techStackRelations = relations(techStack, ({ one }) => ({
    user: one(users, {
        fields: [techStack.userId],
        references: [users.id],
    }),
}));

export const githubReposRelations = relations(githubRepos, ({ one }) => ({
    user: one(users, {
        fields: [githubRepos.userId],
        references: [users.id],
    }),
}));

export const analyticsEventsRelations = relations(analyticsEvents, ({ one }) => ({
    user: one(users, {
        fields: [analyticsEvents.userId],
        references: [users.id],
    }),
}));
