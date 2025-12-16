import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code, Github, Sparkles, BarChart3, Link as LinkIcon } from 'lucide-react';

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Terminal grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              <span className="text-xl sm:text-2xl font-bold font-mono text-green-400">DevTree</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Link href="/sign-in">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-200 hover:bg-slate-800 text-xs sm:text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-mono leading-tight">
            Your Developer Profile,
            <br />
            Elevated
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            A Linktree alternative built for developers. Showcase your GitHub, projects, tech stack, and resume in one beautiful, recruiter-friendly page.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 font-mono">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Create Your DevTree
            </Button>
          </Link>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <FeatureCard
              icon={<Github className="w-8 h-8 text-green-400" />}
              title="GitHub Integration"
              description="Auto-sync your repositories, pin your best work, and showcase your contributions"
            />
            <FeatureCard
              icon={<LinkIcon className="w-8 h-8 text-blue-400" />}
              title="Smart Links"
              description="Manage all your links with drag-and-drop reordering and click tracking"
            />
            <FeatureCard
              icon={<Code className="w-8 h-8 text-purple-400" />}
              title="Tech Stack"
              description="Display your technologies with beautiful icons and categorization"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-orange-400" />}
              title="Analytics"
              description="Track profile views, link clicks, and resume downloads"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-24">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-500 font-mono">
            <p>Built for developers, by developers</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-green-500/50 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2 font-mono">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
