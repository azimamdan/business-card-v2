"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Edit2, X } from "lucide-react";
import { slugSchema, SlugFormData } from "@/lib/schemas/profile";
import { updateSlug } from "@/lib/actions/profile";
import { Profile } from "@/lib/types/database";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SlugEditor({ profile }: { profile: Profile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SlugFormData>({
        resolver: zodResolver(slugSchema),
        defaultValues: { slug: profile.slug }
    });

    const onSubmit = async (data: SlugFormData) => {
        if (data.slug === profile.slug) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);
        setMessage(null);
        try {
            const result = await updateSlug(data.slug);
            if (result.success) {
                setMessage({ text: "Username updated.", type: "success" });
                setIsEditing(false);
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ text: result.error || "Failed to update username", type: "error" });
            }
        } catch (error: any) {
            setMessage({ text: error.message || "An unexpected error occurred", type: "error" });
        } finally {
            setIsSaving(false);
        }
    };

    if (!isEditing) {
        return (
            <div className="space-y-2">
                <Label>Username / URL</Label>
                <div className="flex items-center justify-between p-3 rounded-md bg-slate-800/50 border border-slate-700">
                    <span className="text-slate-300 truncate">canvas.to/<span className="text-slate-50 font-medium">{profile.slug}</span></span>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 px-2 text-slate-400 hover:text-white">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                </div>
                {message && message.type === "success" && (
                    <p className="text-sm text-green-500 mt-2">{message.text}</p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4 rounded-md border border-slate-700 bg-slate-800/30">
            <div className="flex items-center justify-between">
                <Label>Edit Username</Label>
                <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); reset(); }} className="h-6 px-2 text-slate-400">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <Alert className="bg-orange-950/30 border-orange-900/50 text-orange-200 py-2">
                <AlertDescription className="text-xs">
                    ⚠️ Changing your username will immediately break any existing links to your profile.
                </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-sm">canvas.to/</span>
                    <Input
                        {...register("slug")}
                        className="pl-[82px] border-slate-700 bg-slate-800 text-slate-50 focus-visible:ring-accent-brand"
                    />
                </div>
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                {message && message.type === "error" && <p className="text-sm text-red-500">{message.text}</p>}

                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        disabled={isSaving}
                        size="sm"
                        className="bg-accent-brand hover:bg-accent-brand/90 text-white"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {isSaving ? "Saving..." : "Change Username"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
