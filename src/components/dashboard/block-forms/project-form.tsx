"use client";

import { useState } from "react";
import { updateBlock } from "@/lib/actions/blocks";
import { ProjectData } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadWidget } from "../image-upload-widget";
import { Loader2 } from "lucide-react";

export function ProjectForm({ blockId, initialData }: { blockId: string, initialData: ProjectData }) {
    const [data, setData] = useState<ProjectData>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [tagsInput, setTagsInput] = useState(initialData.tags?.join(", ") || "");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const parsedTags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
            const dataToSave = { ...data, tags: parsedTags.length > 0 ? parsedTags : undefined };
            await updateBlock(blockId, dataToSave);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                    value={data.title}
                    onChange={e => setData({ ...data, title: e.target.value })}
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                    value={data.description}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand resize-none"
                    rows={3}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Project URL (Optional)</Label>
                    <Input
                        value={data.url || ""}
                        onChange={e => setData({ ...data, url: e.target.value })}
                        placeholder="https://..."
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    />
                </div>
            </div>

            <ImageUploadWidget
                label="Project Thumbnail"
                value={data.imageUrl}
                onChange={url => setData({ ...data, imageUrl: url })}
            />

            <div className="space-y-2">
                <Label>Tags (Comma separated)</Label>
                <Input
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    placeholder="React, Next.js, Tailwind..."
                    className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                />
            </div>

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSaving} size="sm" className="bg-muted hover:bg-accent-brand/20 text-white border border-input">
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Project
                </Button>
            </div>
        </form>
    );
}
