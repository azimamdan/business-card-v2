"use client";

import { useState } from "react";
import { updateBlock } from "@/lib/actions/blocks";
import { MarkdownData } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export function MarkdownForm({ blockId, initialData }: { blockId: string, initialData: MarkdownData }) {
    const [data, setData] = useState<MarkdownData>(initialData);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateBlock(blockId, data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>Content (Markdown)</Label>
                    <span className="text-xs text-muted-foreground">Supports GFM</span>
                </div>
                <Textarea
                    value={data.content}
                    onChange={e => setData({ ...data, content: e.target.value })}
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand font-mono text-sm leading-relaxed min-h-[250px]"
                    required
                />
            </div>

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSaving} size="sm" className="bg-muted hover:bg-slate-700 text-white border border-input">
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Markdown
                </Button>
            </div>
        </form>
    );
}
