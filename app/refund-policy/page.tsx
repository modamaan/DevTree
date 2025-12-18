import Link from 'next/link';

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-green-400 hover:text-green-300 font-mono text-sm mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white font-mono mb-2">Refund & Cancellation Policy</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">1. Overview</h2>
                            <p className="text-slate-300 leading-relaxed">
                                This Refund & Cancellation Policy outlines the terms for refunds and cancellations for DevTree's premium features.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">2. Public Link Activation (₹20)</h2>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 What You Get</h3>
                            <p className="text-slate-300 leading-relaxed mb-2">The ₹20 payment unlocks:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>Public profile link activation (devtree.site/u/username)</li>
                                <li>Current Activities feature</li>
                                <li>Design customization</li>
                                <li>All premium features</li>
                                <li>Lifetime access (one-time payment)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.2 Refund Eligibility</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Refunds are available within <strong className="text-green-400">7 days</strong> of payment if:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>Technical issues prevent you from using the service</li>
                                <li>Payment was charged incorrectly or duplicated</li>
                                <li>Service was not delivered as described</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.3 Non-Refundable Cases</h3>
                            <p className="text-slate-300 leading-relaxed mb-2">Refunds will NOT be provided if:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>You simply changed your mind after activation</li>
                                <li>You violated our Terms & Conditions</li>
                                <li>More than 7 days have passed since payment</li>
                                <li>You've actively used the premium features</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">3. Cancellation Policy</h2>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.1 Account Deletion</h3>
                            <p className="text-slate-300 leading-relaxed">
                                You can delete your DevTree account at any time from your dashboard. This will:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>Permanently delete all your data</li>
                                <li>Deactivate your public profile link</li>
                                <li>Remove all content and analytics</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-2">
                                <strong className="text-yellow-400">Note:</strong> Account deletion does NOT automatically trigger a refund. Refund requests must be made separately.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.2 Service Cancellation</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Since the ₹20 payment is a one-time fee (not a subscription), there is no recurring billing to cancel. Your access continues indefinitely.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">4. Refund Process</h2>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.1 How to Request</h3>
                            <p className="text-slate-300 leading-relaxed mb-2">To request a refund:</p>
                            <ol className="list-decimal list-inside text-slate-300 space-y-2 ml-4">
                                <li>Email us at <span className="text-green-400 font-mono">amaanprogramming@gmail.com</span></li>
                                <li>Include your username and payment transaction ID</li>
                                <li>Explain the reason for your refund request</li>
                                <li>Provide any relevant screenshots or details</li>
                            </ol>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.2 Processing Time</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Approved refunds will be processed within <strong className="text-green-400">5-7 business days</strong>. The refund will be credited to your original payment method via Razorpay.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.3 Review Period</h3>
                            <p className="text-slate-300 leading-relaxed">
                                We will review your refund request within <strong className="text-green-400">48 hours</strong> and notify you of our decision via email.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">5. Payment Disputes</h2>
                            <p className="text-slate-300 leading-relaxed">
                                If you have a payment dispute or unauthorized charge, please contact us immediately at <span className="text-green-400 font-mono">amaanprogramming@gmail.com</span> before initiating a chargeback with your bank.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">6. Technical Issues</h2>
                            <p className="text-slate-300 leading-relaxed">
                                If you experience technical issues preventing you from using the service, please contact support first. We will work to resolve the issue before considering a refund.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">7. Contact for Refunds</h2>
                            <p className="text-slate-300 leading-relaxed">
                                For all refund and cancellation inquiries:
                            </p>
                            <div className="bg-slate-900/50 border border-slate-600 rounded p-4 mt-2">
                                <p className="text-green-400 font-mono mb-2">Email: amaanprogramming@gmail.com</p>
                                <p className="text-slate-400 text-sm">Response time: Within 48 hours</p>
                            </div>
                        </section>

                        <section className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">💡 Important Note</h3>
                            <p className="text-slate-300 text-sm">
                                We want you to be satisfied with DevTree. If you're experiencing any issues or have concerns, please reach out to us before requesting a refund. We're here to help!
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
