import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { razorpay } from '@/lib/razorpay';
import { db } from '@/db';
import { payments, features } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.clerkId, userId),
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { featureName } = await req.json();

        // Get feature details
        const feature = await db.query.features.findFirst({
            where: eq(features.name, featureName),
        });

        if (!feature || !feature.isActive) {
            return NextResponse.json({ error: 'Feature not found or inactive' }, { status: 404 });
        }

        // Create Razorpay order
        const options = {
            amount: feature.price, // amount in paise
            currency: feature.currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: user.id,
                featureId: feature.id,
                featureName: feature.name,
            },
        };

        const order = await razorpay.orders.create(options);

        // Save payment record
        await db.insert(payments).values({
            userId: user.id,
            featureId: feature.id,
            amount: feature.price,
            currency: feature.currency,
            razorpayOrderId: order.id,
            status: 'pending',
            metadata: {
                featureName: feature.name,
                displayName: feature.displayName,
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: feature.price,
            currency: feature.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
            feature: {
                name: feature.name,
                displayName: feature.displayName,
                description: feature.description,
            },
        });
    } catch (error: any) {
        console.error('Error creating payment order:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
