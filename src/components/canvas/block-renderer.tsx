"use client";

import { Block } from "@/lib/types/database";
import {
    HeroBlock,
    VCardBlock,
    ProjectBlock,
    MarkdownBlock
} from "@/components/blocks";

interface BlockRendererProps {
    block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
    switch (block.type) {
        case "hero":
            return <HeroBlock data={block.data as any} blockId={block.id} />;
        case "vcard":
            return <VCardBlock data={block.data as any} blockId={block.id} />;
        case "project":
            return <ProjectBlock data={block.data as any} blockId={block.id} />;
        case "markdown":
            return <MarkdownBlock data={block.data as any} blockId={block.id} />;
        default:
            return (
                <div className="p-4 rounded-xl border border-dashed border-red-500/50 bg-red-500/10 text-red-400 text-sm text-center">
                    Unsupported block type: {block.type}
                </div>
            );
    }
}
