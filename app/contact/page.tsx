import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-green-400 hover:text-green-300 font-mono text-sm mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white font-mono mb-2">Contact & Support</h1>
                    <p className="text-slate-400">Get in touch with the DevTree team</p>
                </div>

                {/* Content */}
                <div className="grid gap-6">
                    {/* Email Support */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-600/20 p-3 rounded-lg">
                                <Mail className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white font-mono mb-2">Email Support</h2>
                                <p className="text-slate-300 mb-4">
                                    For general inquiries, technical support, refunds, or any questions:
                                </p>
                                <a
                                    href="mailto:amaanprogramming@gmail.com"
                                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-mono px-6 py-3 rounded-lg transition-colors"
                                >
                                    amaanprogramming@gmail.com
                                </a>
                                <p className="text-slate-400 text-sm mt-3">
                                    Response time: Within 48 hours
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What We Can Help With */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">What We Can Help With</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-white font-semibold mb-2">Technical Support</h3>
                                <ul className="text-slate-300 text-sm space-y-1">
                                    <li>• Account issues</li>
                                    <li>• Payment problems</li>
                                    <li>• Profile setup help</li>
                                    <li>• GitHub integration</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-2">Business Inquiries</h3>
                                <ul className="text-slate-300 text-sm space-y-1">
                                    <li>• Refund requests</li>
                                    <li>• Feature requests</li>
                                    <li>• Bug reports</li>
                                    <li>• General questions</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-green-400 font-mono mb-4">Quick Answers</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-white font-semibold mb-1">How do I activate my public link?</h3>
                                <p className="text-slate-300 text-sm">
                                    Go to Dashboard → Overview and click "Activate Public Link" to make a ₹20 payment.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Can I change my username?</h3>
                                <p className="text-slate-300 text-sm">
                                    Usernames cannot be changed once claimed. Choose carefully during signup.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">How do I delete my account?</h3>
                                <p className="text-slate-300 text-sm">
                                    Contact us at amaanprogramming@gmail.com to request account deletion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
