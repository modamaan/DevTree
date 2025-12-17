import { db } from '../db';
import { features } from '../db/schema';
import { eq } from 'drizzle-orm';

async function seedFeatures() {
    console.log('Seeding features...');

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

    for (const feature of featuresToSeed) {
        const existing = await db.query.features.findFirst({
            where: eq(features.name, feature.name),
        });

        if (existing) {
            console.log(`Feature "${feature.name}" already exists`);
            continue;
        }

        await db.insert(features).values({
            ...feature,
            currency: 'INR',
            isActive: true,
        });

        console.log(`✓ Feature "${feature.name}" created successfully`);
    }
}

seedFeatures()
    .then(() => {
        console.log('Seeding completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error seeding features:', error);
        process.exit(1);
    });
