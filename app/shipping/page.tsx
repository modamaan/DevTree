import Link from 'next/link';

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-green-400 hover:text-green-300 font-mono text-sm mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white font-mono mb-2">Shipping Policy</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Digital Service - No Physical Shipping</h2>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree is a <strong className="text-white">100% digital service</strong>. We do not sell or ship any physical products. All features and services are delivered electronically and instantly upon payment confirmation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">What You Receive</h2>
                            <p className="text-slate-300 leading-relaxed mb-2">When you make a payment on DevTree, you receive:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li><strong className="text-white">Instant Digital Access</strong> - Your public profile link is activated immediately</li>
                                <li><strong className="text-white">Premium Features</strong> - All features unlock instantly in your dashboard</li>
                                <li><strong className="text-white">No Waiting</strong> - No shipping time, no delivery delays</li>
                                <li><strong className="text-white">Lifetime Access</strong> - One-time payment, permanent access</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Delivery Method</h2>
                            <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Instant Digital Delivery</h3>
                                <p className="text-slate-300 text-sm mb-2">
                                    Upon successful payment:
                                </p>
                                <ol className="list-decimal list-inside text-slate-300 text-sm space-y-1 ml-4">
                                    <li>Payment is processed through Razorpay</li>
                                    <li>Your account is automatically upgraded</li>
                                    <li>Public profile link activates instantly</li>
                                    <li>All premium features unlock immediately</li>
                                    <li>You can start using everything right away</li>
                                </ol>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">No Shipping Charges</h2>
                            <p className="text-slate-300 leading-relaxed">
                                Since DevTree is a digital service:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>❌ No shipping fees</li>
                                <li>❌ No handling charges</li>
                                <li>❌ No delivery delays</li>
                                <li>❌ No customs or import duties</li>
                                <li>✅ Just pay ₹20 once and get instant access</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Access & Availability</h2>
                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Immediate Access</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Your DevTree premium features are available 24/7 from anywhere in the world. Access your dashboard and public profile instantly from any device with an internet connection.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Global Availability</h3>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree is accessible worldwide. No geographic restrictions or shipping limitations apply.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Payment Confirmation</h2>
                            <p className="text-slate-300 leading-relaxed">
                                After successful payment, you will receive:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>Payment confirmation from Razorpay</li>
                                <li>Instant activation of your public profile link</li>
                                <li>Access to all premium features in your dashboard</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Technical Issues</h2>
                            <p className="text-slate-300 leading-relaxed">
                                If you experience any issues accessing your premium features after payment:
                            </p>
                            <ol className="list-decimal list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>Refresh your browser and log in again</li>
                                <li>Check your payment confirmation email</li>
                                <li>Contact support at <span className="text-green-400 font-mono">amaanprogramming@gmail.com</span></li>
                            </ol>
                            <p className="text-slate-300 leading-relaxed mt-2">
                                We will resolve any access issues within 24 hours.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Refund Policy</h2>
                            <p className="text-slate-300 leading-relaxed">
                                For information about refunds for digital services, please refer to our <Link href="/refund-policy" className="text-green-400 hover:text-green-300 underline">Refund & Cancellation Policy</Link>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Contact Us</h2>
                            <p className="text-slate-300 leading-relaxed">
                                For questions about service delivery or access:
                            </p>
                            <div className="bg-slate-900/50 border border-slate-600 rounded p-4 mt-2">
                                <p className="text-green-400 font-mono mb-2">Email: amaanprogramming@gmail.com</p>
                                <p className="text-slate-400 text-sm">Response time: Within 48 hours</p>
                            </div>
                        </section>

                        <section className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">💡 Summary</h3>
                            <p className="text-slate-300 text-sm">
                                DevTree is a digital service with instant delivery. No physical products are shipped. Your premium features activate immediately upon payment, and you can start using them right away!
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
