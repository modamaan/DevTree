import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { analyticsEvents, links } from '@/db/schema';
import { analyticsEventSchema } from '@/lib/validation';
import { eq, sql } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = analyticsEventSchema.parse(body);

        const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        const userAgent = req.headers.get('user-agent') || 'unknown';

        // Insert analytics event
        await db.insert(analyticsEvents).values({
            userId: parsed.userId || undefined,
            eventType: parsed.eventType,
            metadata: parsed.metadata || {},
            ipAddress,
            userAgent,
        });

        // If it's a link click, increment the click count
        if (parsed.eventType === 'link_click' && parsed.metadata?.linkId) {
            await db
                .update(links)
                .set({ clicks: sql`COALESCE(${links.clicks}, 0) + 1` })
                .where(eq(links.id, parsed.metadata.linkId));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking event:', error);
        return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
    }
}
