import { getProfile } from "@/lib/actions/profile";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
                            <div className="w-8 h-8 rounded-lg bg-accent-brand flex items-center justify-center text-sm shadow-glow transition-all duration-300">C</div>
                            <span className="hidden sm:inline-block">Canvas</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {profile && (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/${profile.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-slate-800"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="hidden sm:inline">View Profile</span>
                                </Link>
                            </div>
                        )}
                        <div className="h-6 w-px bg-slate-800 hidden sm:block mx-1" />
                        <span className="text-sm text-slate-400 hidden md:inline truncate max-w-[150px]">
                            {profile?.display_name || 'Welcome'}
                        </span>
                        <SignOutButton />
                    </div>
                </div>
            </header>

            <main className="flex-1 layout-container">
                {children}
            </main>
        </div>
    );
}
