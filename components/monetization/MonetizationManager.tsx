'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ExternalLink, Edit, Trash2, TrendingUp } from 'lucide-react';
import { AddLinkModal } from './AddLinkModal';
import { LinkCard } from './LinkCard';

interface MonetizationLink {
    id: string;
    category: 'product' | 'booking' | 'affiliate';
    title: string;
    description: string | null;
    url: string;
    price: number | null;
    coverImage: string | null;
    clicks: number | null;
    order: number;
    isActive: boolean;
}

interface MonetizationManagerProps {
    initialLinks: {
        product: MonetizationLink[];
        booking: MonetizationLink[];
        affiliate: MonetizationLink[];
    };
    totalClicks: number;
    stats: {
        productClicks: number;
        bookingClicks: number;
        affiliateClicks: number;
    };
}

export function MonetizationManager({ initialLinks, totalClicks, stats }: MonetizationManagerProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'product' | 'booking' | 'affiliate'>('product');

    const handleAddClick = (category: 'product' | 'booking' | 'affiliate') => {
        setSelectedCategory(category);
        setIsAddModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white font-mono">💰 Earn Money</h1>
                <p className="text-slate-400 mt-2">
                    Monetize your skills by adding links to your products, booking page, and affiliate programs
                </p>
            </div>

            {/* Analytics Overview */}
            <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Analytics Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800 p-4 rounded-lg">
                            <div className="text-slate-400 text-sm">Total Clicks</div>
                            <div className="text-2xl font-bold text-white mt-1">{totalClicks}</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg">
                            <div className="text-slate-400 text-sm">Product Clicks</div>
                            <div className="text-2xl font-bold text-green-400 mt-1">{stats.productClicks}</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg">
                            <div className="text-slate-400 text-sm">Booking Clicks</div>
                            <div className="text-2xl font-bold text-blue-400 mt-1">{stats.bookingClicks}</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg">
                            <div className="text-slate-400 text-sm">Affiliate Clicks</div>
                            <div className="text-2xl font-bold text-purple-400 mt-1">{stats.affiliateClicks}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs for Categories */}
            <Tabs defaultValue="product" className="w-full">
                <TabsList className="bg-slate-800 border-slate-700">
                    <TabsTrigger value="product" className="data-[state=active]:bg-green-600">
                        📦 Digital Products ({initialLinks.product.length})
                    </TabsTrigger>
                    <TabsTrigger value="booking" className="data-[state=active]:bg-blue-600">
                        📞 1-on-1 Calls ({initialLinks.booking.length})
                    </TabsTrigger>
                    <TabsTrigger value="affiliate" className="data-[state=active]:bg-purple-600">
                        🔗 Affiliates ({initialLinks.affiliate.length})
                    </TabsTrigger>
                </TabsList>

                {/* Digital Products Tab */}
                <TabsContent value="product" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-slate-400">
                            Add links to your Gumroad products, courses, or any digital products you sell
                        </p>
                        <Button
                            onClick={() => handleAddClick('product')}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    </div>

                    {initialLinks.product.length === 0 ? (
                        <Card className="bg-slate-900 border-slate-700 border-dashed">
                            <CardContent className="py-12 text-center">
                                <p className="text-slate-400">No products added yet</p>
                                <Button
                                    onClick={() => handleAddClick('product')}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Your First Product
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {initialLinks.product.map((link) => (
                                <LinkCard key={link.id} link={link} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Booking Tab */}
                <TabsContent value="booking" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-slate-400">
                            Add links to your Topmate, Cal.com, or Calendly booking page
                        </p>
                        <Button
                            onClick={() => handleAddClick('booking')}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Booking Link
                        </Button>
                    </div>

                    {initialLinks.booking.length === 0 ? (
                        <Card className="bg-slate-900 border-slate-700 border-dashed">
                            <CardContent className="py-12 text-center">
                                <p className="text-slate-400">No booking links added yet</p>
                                <Button
                                    onClick={() => handleAddClick('booking')}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Your Booking Link
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {initialLinks.booking.map((link) => (
                                <LinkCard key={link.id} link={link} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Affiliate Tab */}
                <TabsContent value="affiliate" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-slate-400">
                            Add affiliate links to tools and services you recommend
                        </p>
                        <Button
                            onClick={() => handleAddClick('affiliate')}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Affiliate Link
                        </Button>
                    </div>

                    {initialLinks.affiliate.length === 0 ? (
                        <Card className="bg-slate-900 border-slate-700 border-dashed">
                            <CardContent className="py-12 text-center">
                                <p className="text-slate-400">No affiliate links added yet</p>
                                <Button
                                    onClick={() => handleAddClick('affiliate')}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Your First Affiliate Link
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {initialLinks.affiliate.map((link) => (
                                <LinkCard key={link.id} link={link} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Add Link Modal */}
            <AddLinkModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                category={selectedCategory}
            />
        </div>
    );
}
