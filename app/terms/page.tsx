import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-green-400 hover:text-green-300 font-mono text-sm mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white font-mono mb-2">Terms & Conditions</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">1. Acceptance of Terms</h2>
                            <p className="text-slate-300 leading-relaxed">
                                By accessing and using DevTree, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">2. Service Description</h2>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree is a developer portfolio platform that allows you to:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                                <li>Create and customize your developer profile</li>
                                <li>Showcase projects, experience, and tech stack</li>
                                <li>Share links and connect with GitHub</li>
                                <li>Track profile analytics</li>
                                <li>Activate a public profile link (₹20 one-time payment)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">3. User Accounts</h2>
                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.1 Registration</h3>
                            <p className="text-slate-300 leading-relaxed">
                                You must provide accurate information when creating your account. You are responsible for maintaining the security of your account credentials.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">3.2 Username</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Usernames are unique and cannot be changed once claimed. Choose carefully.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">4. Payment Terms</h2>
                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.1 Public Link Activation</h3>
                            <p className="text-slate-300 leading-relaxed">
                                A one-time payment of ₹20 is required to activate your public profile link and unlock all premium features.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.2 Payment Processing</h3>
                            <p className="text-slate-300 leading-relaxed">
                                All payments are processed securely through Razorpay. We do not store your payment card information.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.3 Non-Refundable</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Payments are generally non-refundable except as described in our Refund Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">5. Content Guidelines</h2>
                            <p className="text-slate-300 leading-relaxed mb-2">You agree NOT to post content that:</p>
                            <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                                <li>Violates any laws or regulations</li>
                                <li>Infringes on intellectual property rights</li>
                                <li>Contains malicious code or spam</li>
                                <li>Is offensive, discriminatory, or harmful</li>
                                <li>Impersonates others or misrepresents your identity</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">6. Intellectual Property</h2>
                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">6.1 Your Content</h3>
                            <p className="text-slate-300 leading-relaxed">
                                You retain ownership of all content you post. By using DevTree, you grant us a license to display and distribute your content as part of the service.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-4 mb-2">6.2 Our Platform</h3>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree's design, code, and branding are protected by intellectual property laws. You may not copy or reproduce them without permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">7. Service Availability</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We strive for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance or updates that temporarily affect availability.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">8. Account Termination</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from your dashboard.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">9. Limitation of Liability</h2>
                            <p className="text-slate-300 leading-relaxed">
                                DevTree is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">10. Changes to Terms</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We may update these Terms from time to time. Continued use of DevTree after changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">11. Contact</h2>
                            <p className="text-slate-300 leading-relaxed">
                                For questions about these Terms, contact us at:
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
