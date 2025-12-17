import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code, Github, Zap } from 'lucide-react';
import UsernameClaimForm from '@/components/landing/UsernameClaimForm';

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Terminal theme styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                <span className="text-xl sm:text-2xl font-bold font-mono text-green-400">DevTree</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-slate-300 hover:text-green-400 font-mono text-sm sm:text-base px-3 sm:px-4">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-mono text-sm sm:text-base px-3 sm:px-4">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 font-mono leading-tight">
              <span className="text-green-400">{'>'}</span>{' '}
              <span className="text-white">One Link for</span>
              <br />
              <span className="text-blue-400">Everything You Build</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              One link to showcase your projects, tech stack, GitHub repos, and everything you build.
              Built for developers, by developers.
            </p>

            {/* Username Claim Form */}
            <div className="mb-8 sm:mb-12">
              <UsernameClaimForm />
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono">Developer First</h3>
              <p className="text-sm sm:text-base text-slate-400">
                Showcase your GitHub repos, tech stack, and projects in a beautiful terminal-inspired design.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <Github className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono">GitHub Integration</h3>
              <p className="text-sm sm:text-base text-slate-400">
                Connect your GitHub account and automatically sync your repositories and contributions.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 backdrop-blur-sm hover:bg-slate-800/70 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-slate-400">
                Built with Next.js 14 for blazing fast performance and optimal SEO.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-12 sm:mt-16 lg:mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <p className="text-center text-slate-500 font-mono text-sm sm:text-base">
              Built for developers, by developers
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
