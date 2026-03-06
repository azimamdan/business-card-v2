import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { BlockRenderer } from "@/components/canvas";
import { Block } from "@/lib/types/database";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { AnimatedSection } from "@/components/ui/animated-section";
import Image from "next/image";

interface ProfilePageProps {
    params: Promise<{
        username: string;
    }>;
}

export async function generateMetadata({
    params,
}: ProfilePageProps): Promise<Metadata> {
    const { username } = await params;
    const supabase = await createClient();

    const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, bio")
        .eq("slug", username)
        .single();

    if (!profile) return { title: "Profile Not Found" };

    return {
        title: `${profile.display_name} | IDCV`,
        description: profile.bio,
    };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { username } = await params;
    const supabase = await createClient();

    // 1. Fetch Profile
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("slug", username)
        .single();

    if (profileError || !profile) {
        notFound();
    }

    // 2. Fetch Blocks
    const { data: blocks } = await supabase
        .from("blocks")
        .select("*")
        .eq("profile_id", profile.id)
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });

    const accentColor = profile.accent_color || "hsl(250, 100%, 65%)";

    return (
        <main
            className="min-h-screen bg-slate-950 text-slate-50"
            style={{ "--accent-brand": accentColor } as React.CSSProperties}
        >
            <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 space-y-12">
                {/* Profile Header */}
                <AnimatedSection delay={0.1} className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto flex items-center justify-center border-2 border-[var(--accent-brand)] overflow-hidden shadow-glow transition-all duration-500 relative">
                        {profile.avatar_url ? (
                            <Image
                                src={profile.avatar_url}
                                alt={profile.display_name}
                                fill
                                sizes="96px"
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <span className="text-3xl font-bold text-[var(--accent-brand)]">
                                {profile.display_name.charAt(0)}
                            </span>
                        )}
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{profile.display_name}</h1>
                        <p className="text-slate-400 max-w-sm mx-auto">{profile.bio}</p>
                    </div>
                </AnimatedSection>

                {/* Blocks Area */}
                <section className="space-y-6">
                    {blocks && blocks.length > 0 ? (
                        (blocks as Block[]).map((block, index) => (
                            <AnimatedSection key={block.id} delay={0.2 + (index * 0.1)}>
                                <BlockRenderer block={block} />
                            </AnimatedSection>
                        ))
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500">
                            No blocks added to this canvas yet.
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="pt-12 pb-6 text-center space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-accent-brand transition-colors">
                        <div className="w-2 h-2 rounded-full bg-slate-800" />
                        Created with IDCV
                    </Link>
                    <div className="flex justify-center">
                        <ThemeSwitcher variant="compact" />
                    </div>
                </footer>
            </div>
        </main>
    );
}
