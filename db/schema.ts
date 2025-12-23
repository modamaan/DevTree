import { pgTable, text, timestamp, uuid, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - synced from Clerk
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkId: text('clerk_id').notNull().unique(),
    email: text('email').notNull(),
    hasSeenSharePopup: boolean('has_seen_share_popup').default(false),
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
    isPublicLinkActive: boolean('is_public_link_active').default(false), // Requires ₹20 payment
    // Design customization fields
    themeId: text('theme_id').default('terminal'), // Theme identifier
    wallpaperType: text('wallpaper_type').default('gradient'), // 'solid' | 'gradient' | 'blur' | 'pattern'
    wallpaperValue: text('wallpaper_value'), // Color hex, gradient string, or pattern name
    buttonStyle: text('button_style').default('rounded'), // 'rounded' | 'pill' | 'square' | 'outline'
    buttonColor: text('button_color').default('#22c55e'), // Primary button color
    fontFamily: text('font_family').default('mono'), // 'mono' | 'sans' | 'serif'
    headerStyle: text('header_style').default('terminal'), // 'terminal' | 'minimal' | 'card' | 'centered' | 'split'
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

// Experiences table - work history and professional experience
export const experiences = pgTable('experiences', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    company: text('company').notNull(), // Company name or "Freelance"
    role: text('role').notNull(), // Job title/position
    employmentType: text('employment_type').notNull(), // 'full-time', 'part-time', 'freelance', 'contract', 'internship'
    startDate: text('start_date').notNull(), // Format: "YYYY-MM" or "YYYY"
    endDate: text('end_date'), // null = "Present"
    description: text('description'), // Markdown supported, responsibilities/achievements
    location: text('location'), // "Remote", "San Francisco, CA", etc.
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

// Current Activities table - what user is building/learning
export const currentActivities = pgTable('current_activities', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    type: text('type').notNull(), // 'building' | 'learning'
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Features table - premium features catalog
export const features = pgTable('features', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull().unique(), // 'current_activities', 'advanced_analytics', etc.
    displayName: text('display_name').notNull(),
    description: text('description'),
    price: integer('price').notNull(), // Price in paise (₹20 = 2000 paise)
    currency: text('currency').notNull().default('INR'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Subscriptions table - user subscription tracking
export const subscriptions = pgTable('subscriptions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    featureId: uuid('feature_id').notNull().references(() => features.id),
    status: text('status').notNull().default('active'), // 'active', 'expired', 'cancelled'
    startDate: timestamp('start_date').defaultNow().notNull(),
    endDate: timestamp('end_date'), // null for lifetime access
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Payments table - transaction records
export const payments = pgTable('payments', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    featureId: uuid('feature_id').notNull().references(() => features.id),
    subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
    amount: integer('amount').notNull(), // Amount in paise
    currency: text('currency').notNull().default('INR'),
    razorpayOrderId: text('razorpay_order_id').notNull(),
    razorpayPaymentId: text('razorpay_payment_id'),
    razorpaySignature: text('razorpay_signature'),
    status: text('status').notNull().default('pending'), // 'pending', 'success', 'failed'
    metadata: jsonb('metadata').$type<Record<string, any>>().default({}),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
    profile: one(profiles, {
        fields: [users.id],
        references: [profiles.userId],
    }),
    links: many(links),
    projects: many(projects),
    experiences: many(experiences),
    techStack: many(techStack),
    githubRepos: many(githubRepos),
    analyticsEvents: many(analyticsEvents),
    currentActivities: many(currentActivities),
    subscriptions: many(subscriptions),
    payments: many(payments),
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

export const experiencesRelations = relations(experiences, ({ one }) => ({
    user: one(users, {
        fields: [experiences.userId],
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

export const currentActivitiesRelations = relations(currentActivities, ({ one }) => ({
    user: one(users, {
        fields: [currentActivities.userId],
        references: [users.id],
    }),
}));

export const featuresRelations = relations(features, ({ many }) => ({
    subscriptions: many(subscriptions),
    payments: many(payments),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
    user: one(users, {
        fields: [subscriptions.userId],
        references: [users.id],
    }),
    feature: one(features, {
        fields: [subscriptions.featureId],
        references: [features.id],
    }),
    payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
    user: one(users, {
        fields: [payments.userId],
        references: [users.id],
    }),
    feature: one(features, {
        fields: [payments.featureId],
        references: [features.id],
    }),
    subscription: one(subscriptions, {
        fields: [payments.subscriptionId],
        references: [subscriptions.id],
    }),
}));
