"use client";

import { useState } from "react";
import { updateBlock } from "@/lib/actions/blocks";
import { VCardData } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function VCardForm({ blockId, initialData }: { blockId: string, initialData: VCardData }) {
    const [data, setData] = useState<VCardData>(initialData);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                        value={data.firstName}
                        onChange={e => setData({ ...data, firstName: e.target.value })}
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                        value={data.lastName}
                        onChange={e => setData({ ...data, lastName: e.target.value })}
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                        value={data.title || ""}
                        onChange={e => setData({ ...data, title: e.target.value })}
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                        value={data.company || ""}
                        onChange={e => setData({ ...data, company: e.target.value })}
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={data.email || ""}
                        onChange={e => setData({ ...data, email: e.target.value })}
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                        type="tel"
                        value={data.phone || ""}
                        onChange={e => setData({ ...data, phone: e.target.value })}
                        className="bg-muted border-input text-foreground focus-visible:ring-accent-brand"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSaving} size="sm" className="bg-muted hover:bg-accent-brand/20 text-white border border-input">
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save V-Card
                </Button>
            </div>
        </form>
    );
}
