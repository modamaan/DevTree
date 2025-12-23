'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingBag, Calendar, Link as LinkIcon } from 'lucide-react';
import { trackMonetizationClick } from '@/app/actions/monetization';

interface MonetizationLink {
    id: string;
    category: 'product' | 'booking' | 'affiliate';
    title: string;
    description: string | null;
    url: string;
    price: number | null;
    coverImage: string | null;
}

interface MonetizationSectionProps {
    links: {
        product: MonetizationLink[];
        booking: MonetizationLink[];
        affiliate: MonetizationLink[];
    };
}

export function MonetizationSection({ links }: MonetizationSectionProps) {
    const hasAnyLinks = links.product.length > 0 || links.booking.length > 0 || links.affiliate.length > 0;

    if (!hasAnyLinks) {
        return null;
    }

    const handleLinkClick = async (linkId: string) => {
        try {
            await trackMonetizationClick(linkId);
        } catch (error) {
            console.error('Failed to track click:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white font-mono mb-2">💰 Ways to Work With Me</h2>
                <p className="text-slate-400">Support my work or collaborate with me</p>
            </div>

            {/* Digital Products */}
            {links.product.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-green-400" />
                        <h3 className="text-xl font-semibold text-green-400 font-mono">Digital Products</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {links.product.map((product) => (
                            <Card key={product.id} className="bg-slate-800/50 border-slate-700 hover:border-green-500 transition-all overflow-hidden group">
                                {product.coverImage && (
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img
                                            src={product.coverImage}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                )}
                                <CardContent className="p-4 space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-white text-lg">{product.title}</h4>
                                        {product.description && (
                                            <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        {product.price && (
                                            <span className="text-green-400 font-bold text-lg">
                                                ₹{(product.price / 100).toLocaleString()}
                                            </span>
                                        )}
                                        <a
                                            href={product.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleLinkClick(product.id)}
                                            className="ml-auto"
                                        >
                                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                                                Buy Now
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* 1-on-1 Booking */}
            {links.booking.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-semibold text-blue-400 font-mono">Book a Call With Me</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {links.booking.map((booking) => (
                            <Card key={booking.id} className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white text-lg mb-2">{booking.title}</h4>
                                            {booking.description && (
                                                <p className="text-slate-400 text-sm mb-4">
                                                    {booking.description}
                                                </p>
                                            )}
                                            {booking.price && (
                                                <p className="text-blue-400 font-bold text-xl mb-4">
                                                    ₹{(booking.price / 100).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <a
                                        href={booking.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleLinkClick(booking.id)}
                                        className="block"
                                    >
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                            Book Now
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Affiliate Links */}
            {links.affiliate.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-purple-400" />
                        <h3 className="text-xl font-semibold text-purple-400 font-mono">Recommended Tools</h3>
                    </div>
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                {links.affiliate.map((affiliate) => (
                                    <a
                                        key={affiliate.id}
                                        href={affiliate.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleLinkClick(affiliate.id)}
                                        className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                                                {affiliate.title}
                                            </h4>
                                            {affiliate.description && (
                                                <p className="text-slate-400 text-sm mt-1">
                                                    {affiliate.description}
                                                </p>
                                            )}
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors flex-shrink-0 ml-4" />
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
