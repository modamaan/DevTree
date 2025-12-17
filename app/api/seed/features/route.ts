import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { features } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function seedFeatures() {
    const featuresToSeed = [
        {
            name: 'link_activation',
            displayName: 'Public Link Activation',
            description: 'Activate your public DevTree link and share your profile with the world',
            price: 2000, // ₹20 in paise
        },
        {
            name: 'current_activities',
            displayName: 'Current Activities',
            description: 'Showcase what you\'re currently building and learning on your developer profile',
            price: 2000, // ₹20 in paise
        },
    ];

    const results = [];

    for (const feature of featuresToSeed) {
        const existing = await db.query.features.findFirst({
            where: eq(features.name, feature.name),
        });

        if (existing) {
            results.push({ feature: feature.name, status: 'already exists' });
            continue;
        }

        await db.insert(features).values({
            ...feature,
            currency: 'INR',
            isActive: true,
        });

        results.push({ feature: feature.name, status: 'created' });
    }

    return results;
}

export async function GET(req: NextRequest) {
    try {
        const results = await seedFeatures();

        return NextResponse.json({
            success: true,
            message: 'Features seeded successfully',
            results,
        });
    } catch (error: any) {
        console.error('Error seeding features:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to seed features' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const results = await seedFeatures();

        return NextResponse.json({
            success: true,
            message: 'Features seeded successfully',
            results,
        });
    } catch (error: any) {
        console.error('Error seeding features:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to seed features' },
            { status: 500 }
        );
    }
}
