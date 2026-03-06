"use client";

import { Profile, Block } from "@/lib/types/database";
import { BlockRenderer } from "@/components/canvas/block-renderer";
import Image from "next/image";

interface LivePreviewProps {
    profile: Profile;
    blocks: Block[];
}

export function LivePreview({ profile, blocks }: LivePreviewProps) {
    const visibleBlocks = blocks.filter(b => b.is_visible);

    const themeStyle = {
        '--accent-brand': profile.accent_color || 'hsl(250, 100%, 65%)',
    } as React.CSSProperties;

    return (
        <div
            className="w-full bg-background rounded-2xl border border-border overflow-hidden shadow-2xl relative"
            style={themeStyle}
        >
            {/* Browser window mock header */}
            <div className="h-10 bg-card border-b border-border flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground font-medium truncate px-4">
                    idcv.me/{profile.slug}
                </div>
            </div>

            {/* Preview Body */}
            <div className="min-h-[500px] max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-muted">
                <div className="scale-100 min-h-full pb-12">

                    {/* Header mirrored from /[username]/page.tsx */}
                    <header className="mb-12 pt-10 flex flex-col items-center text-center px-4">
                        {profile.avatar_url ? (
                            <div className="relative w-24 h-24 rounded-full border-2 border-[var(--accent-brand)] overflow-hidden mb-6 shadow-glow">
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.display_name}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full border-2 border-[var(--accent-brand)] bg-card flex items-center justify-center mb-6 shadow-glow">
                                <span className="text-3xl font-bold text-[var(--accent-brand)]">
                                    {profile.display_name.charAt(0)}
                                </span>
                            </div>
                        )}
                        <h1 className="text-3xl font-bold text-foreground mb-3">{profile.display_name}</h1>
                        {profile.bio && (
                            <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">{profile.bio}</p>
                        )}
                    </header>

                    {/* Blocks */}
                    <main className="space-y-6 px-4 max-w-2xl mx-auto">
                        {visibleBlocks.length > 0 ? (
                            visibleBlocks.map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))
                        ) : (
                            <div className="text-center p-8 border-2 border-dashed border-border rounded-xl text-muted-foreground">
                                No visible blocks. Add some to build your profile!
                            </div>
                        )}
                    </main>

                    {/* Footer */}
                    <footer className="mt-20 pb-8 text-center text-sm text-muted-foreground/70">
                        <p>Previewing as <span className="text-accent-brand">{profile.display_name}</span></p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
