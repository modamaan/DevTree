'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, LogOut } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import ClerkUserButton from './ClerkUserButton';

interface NavLink {
    href: string;
    icon: React.ReactNode;
    label: string;
}

interface MobileNavProps {
    username: string;
    navLinks: NavLink[];
}

export default function MobileNav({ username, navLinks }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <>
            {/* Mobile Header - Visible only on mobile */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Code className="w-6 h-6 text-green-400" />
                        <span className="text-lg font-bold font-mono text-green-400">DevTree</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ClerkUserButton />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-300 hover:text-green-400 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Add padding to main content on mobile to account for fixed header */}
            <div className="md:hidden h-14" />

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside
                className={`md:hidden fixed top-0 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-700 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold font-mono text-green-400 mb-2">DevTree</h2>
                            <p className="text-sm text-slate-400 font-mono">@{username}</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-green-400 transition-all font-mono"
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-slate-700 space-y-3 flex flex-col gap-1">
                        <Link href={`/u/${username}`} target="_blank" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full border-green-600 text-green-400 hover:bg-green-600/10 font-mono text-sm">
                                View Public Profile
                            </Button>
                        </Link>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full border-red-600 text-red-400 hover:bg-red-600/10 font-mono text-sm"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
