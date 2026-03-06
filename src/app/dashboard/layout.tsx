import { getProfile } from "@/lib/actions/profile";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { IdcvLogo } from "@/components/ui/idcv-logo";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-xl tracking-tight text-foreground flex items-center gap-2 hover:opacity-90 transition-opacity">
                            <IdcvLogo size="sm" />
                            <span className="hidden sm:inline-block">IDCV</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {profile && (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/${profile.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="hidden sm:inline">View Profile</span>
                                </Link>
                            </div>
                        )}
                        <ThemeSwitcher />
                        <div className="h-6 w-px bg-muted hidden sm:block mx-1" />
                        <span className="text-sm text-muted-foreground hidden md:inline truncate max-w-[150px]">
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
