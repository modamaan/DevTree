import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="relative">
                <SignUp
                    forceRedirectUrl="/dashboard"
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'bg-slate-900 border border-slate-700',
                        },
                    }}
                />
            </div>
        </div>
    );
}
