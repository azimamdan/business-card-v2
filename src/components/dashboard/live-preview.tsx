"use client";

import { Profile, Block } from "@/lib/types/database";
import { BlockRenderer } from "@/components/canvas/block-renderer";

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
            className="w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative"
            style={themeStyle}
        >
            {/* Browser window mock header */}
            <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500 font-medium truncate px-4">
                    canvas.to/{profile.slug}
                </div>
            </div>

            {/* Preview Body */}
            <div className="min-h-[500px] max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800">
                <div className="scale-100 min-h-full pb-12">

                    {/* Header mirrored from /[username]/page.tsx */}
                    <header className="mb-12 pt-10 flex flex-col items-center text-center px-4">
                        {profile.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt={profile.display_name}
                                className="w-24 h-24 rounded-full border-2 border-accent-brand object-cover mb-6 shadow-glow"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full border-2 border-accent-brand bg-slate-900 flex items-center justify-center mb-6 shadow-glow">
                                <span className="text-3xl font-bold text-accent-brand">
                                    {profile.display_name.charAt(0)}
                                </span>
                            </div>
                        )}
                        <h1 className="text-3xl font-bold text-slate-50 mb-3">{profile.display_name}</h1>
                        {profile.bio && (
                            <p className="text-slate-400 max-w-md mx-auto text-base leading-relaxed">{profile.bio}</p>
                        )}
                    </header>

                    {/* Blocks */}
                    <main className="space-y-6 px-4 max-w-2xl mx-auto">
                        {visibleBlocks.length > 0 ? (
                            visibleBlocks.map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))
                        ) : (
                            <div className="text-center p-8 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
                                No visible blocks. Add some to build your profile!
                            </div>
                        )}
                    </main>

                    {/* Footer */}
                    <footer className="mt-20 pb-8 text-center text-sm text-slate-600">
                        <p>Previewing as <span className="text-accent-brand">{profile.display_name}</span></p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
