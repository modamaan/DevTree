'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Check, Loader2 } from 'lucide-react';
import Script from 'next/script';

interface PaymentModalProps {
    featureName: string;
    featureDisplayName: string;
    featureDescription?: string;
    price: number; // in rupees
    onSuccess: () => void;
    onClose: () => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PaymentModal({
    featureName,
    featureDisplayName,
    featureDescription,
    price,
    onSuccess,
    onClose,
}: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handlePayment() {
        try {
            setLoading(true);
            setError(null);

            // Create order
            const orderResponse = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featureName }),
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok || orderData.error) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // Razorpay options
            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'DevTree',
                description: featureDisplayName,
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        const verifyResponse = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (!verifyResponse.ok || verifyData.error) {
                            throw new Error(verifyData.error || 'Payment verification failed');
                        }

                        // Success!
                        onSuccess();
                    } catch (err: any) {
                        setError(err.message || 'Payment verification failed');
                        setLoading(false);
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                },
                theme: {
                    color: '#22c55e',
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err: any) {
            setError(err.message || 'Failed to initiate payment');
            setLoading(false);
        }
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <Card className="bg-slate-900 border-slate-700 max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Unlock {featureDisplayName}
                        </CardTitle>
                        {featureDescription && (
                            <CardDescription className="text-slate-400">
                                {featureDescription}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Features List */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Lifetime access to {featureDisplayName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Instant activation</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>No recurring charges</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-white font-mono">
                                ₹{price}
                            </div>
                            <div className="text-sm text-slate-400 mt-1">One-time payment</div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                onClick={handlePayment}
                                disabled={loading}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ₹${price}`
                                )}
                            </Button>
                            <Button
                                onClick={onClose}
                                disabled={loading}
                                variant="outline"
                                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                                Cancel
                            </Button>
                        </div>

                        {/* Secure Payment Badge */}
                        <div className="text-center text-xs text-slate-500">
                            🔒 Secured by Razorpay
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
