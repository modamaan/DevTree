import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-green-400 hover:text-green-300 font-mono text-sm mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white font-mono mb-2">Privacy Policy</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">1. Introduction</h2>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our developer portfolio platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 Personal Information</h3>
                            <p className="text-slate-300 leading-relaxed mb-2">We collect the following personal information:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>Email address (via Clerk authentication)</li>
                                <li>Username and display name</li>
                                <li>Profile information (bio, location, avatar)</li>
                                <li>GitHub username and public repository data (if connected)</li>
                                <li>Payment information (processed securely by Razorpay)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.2 Usage Data</h3>
                            <p className="text-slate-300 leading-relaxed mb-2">We automatically collect:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>IP address and browser information</li>
                                <li>Profile view analytics</li>
                                <li>Link click data</li>
                                <li>Resume download statistics</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">3. How We Use Your Information</h2>
                            <p className="text-slate-300 leading-relaxed mb-2">We use your information to:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>Provide and maintain your developer profile</li>
                                <li>Process payments for premium features</li>
                                <li>Display your public portfolio to visitors</li>
                                <li>Provide analytics about your profile engagement</li>
                                <li>Send important service updates</li>
                                <li>Improve our platform and user experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">4. How We Store Your Data</h2>
                            <p className="text-slate-300 leading-relaxed">
                                Your data is stored securely in our PostgreSQL database hosted on Neon. We implement industry-standard security measures including:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>Encrypted database connections</li>
                                <li>Secure authentication via Clerk</li>
                                <li>Regular security updates</li>
                                <li>Access controls and monitoring</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">5. Data Sharing</h2>
                            <p className="text-slate-300 leading-relaxed mb-2">We share your data with:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li><strong>Clerk:</strong> For authentication services</li>
                                <li><strong>Razorpay:</strong> For payment processing (they have their own privacy policy)</li>
                                <li><strong>Vercel:</strong> For hosting and deployment</li>
                                <li><strong>Public visitors:</strong> Your profile information is publicly visible when you activate your public link</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-2">
                                We do NOT sell your personal information to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">6. Your Rights</h2>
                            <p className="text-slate-300 leading-relaxed mb-2">You have the right to:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>Access your personal data</li>
                                <li>Update or correct your information</li>
                                <li>Delete your account and data</li>
                                <li>Export your data</li>
                                <li>Opt-out of analytics tracking</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">7. Cookies</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We use essential cookies for authentication and session management. We do not use third-party advertising cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">8. Children's Privacy</h2>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree is not intended for users under 13 years of age. We do not knowingly collect information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">9. Changes to This Policy</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">10. Contact Us</h2>
                            <p className="text-slate-300 leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="bg-slate-900/50 border border-slate-600 rounded p-4 mt-2">
                                <p className="text-green-400 font-mono">Email: amaanprogramming@gmail.com</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
