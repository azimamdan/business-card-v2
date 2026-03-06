"use client";

import { useState } from "react";
import { updateBlock } from "@/lib/actions/blocks";
import { HeroData } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function HeroForm({ blockId, initialData }: { blockId: string, initialData: HeroData }) {
    const [data, setData] = useState<HeroData>(initialData);
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
                <Label>Headline</Label>
                <Input
                    value={data.headline}
                    onChange={e => setData({ ...data, headline: e.target.value })}
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label>Subheadline</Label>
                <Input
                    value={data.subheadline || ""}
                    onChange={e => setData({ ...data, subheadline: e.target.value })}
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                />
            </div>
            <div className="space-y-2">
                <Label>Avatar URL (Optional)</Label>
                <Input
                    value={data.avatarUrl || ""}
                    onChange={e => setData({ ...data, avatarUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                />
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSaving} size="sm" className="bg-muted hover:bg-slate-700 text-white border border-input">
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Hero
                </Button>
            </div>
        </form>
    );
}
