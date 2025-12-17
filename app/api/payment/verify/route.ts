import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { payments, subscriptions, profiles } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
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

        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

        // Verify signature
        const body = razorpayOrderId + '|' + razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpaySignature) {
            return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
        }

        // Find payment record
        const payment = await db.query.payments.findFirst({
            where: and(
                eq(payments.razorpayOrderId, razorpayOrderId),
                eq(payments.userId, user.id)
            ),
            with: {
                feature: true,
            },
        });

        if (!payment) {
            return NextResponse.json({ error: 'Payment record not found' }, { status: 404 });
        }

        // Update payment status
        await db
            .update(payments)
            .set({
                razorpayPaymentId,
                razorpaySignature,
                status: 'success',
                updatedAt: new Date(),
            })
            .where(eq(payments.id, payment.id));

        // Create subscription (lifetime access for now)
        const [subscription] = await db
            .insert(subscriptions)
            .values({
                userId: user.id,
                featureId: payment.featureId,
                status: 'active',
                startDate: new Date(),
                endDate: null, // Lifetime access
            })
            .returning();

        // Update payment with subscription ID
        await db
            .update(payments)
            .set({
                subscriptionId: subscription.id,
                updatedAt: new Date(),
            })
            .where(eq(payments.id, payment.id));

        // If this is link_activation, activate the public link
        if (payment.feature?.name === 'link_activation') {
            await db
                .update(profiles)
                .set({
                    isPublicLinkActive: true,
                    updatedAt: new Date(),
                })
                .where(eq(profiles.userId, user.id));
        }

        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
            subscription: {
                id: subscription.id,
                featureName: payment.feature?.name,
                status: subscription.status,
            },
        });
    } catch (error: any) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
