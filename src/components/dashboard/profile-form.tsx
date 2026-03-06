"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { profileSchema, ProfileFormData } from "@/lib/schemas/profile";
import { updateProfile } from "@/lib/actions/profile";
import { Profile } from "@/lib/types/database";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileForm({ profile }: { profile: Profile }) {
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            display_name: profile.display_name,
            bio: profile.bio || "",
            accent_color: profile.accent_color || "hsl(250, 100%, 65%)",
        }
    });

    const onSubmit = async (data: ProfileFormData) => {
        setIsSaving(true);
        setMessage(null);
        try {
            await updateProfile(data);
            setMessage({ text: "Profile updated successfully.", type: "success" });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update profile";
            setMessage({ text: message, type: "error" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                    id="display_name"
                    {...register("display_name")}
                    className="border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                />
                {errors.display_name && (
                    <p className="text-sm text-red-500">{errors.display_name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    {...register("bio")}
                    rows={4}
                    className="border-input bg-muted text-foreground focus-visible:ring-accent-brand resize-none"
                    placeholder="A short intro about yourself..."
                />
                <div className="flex justify-between">
                    {errors.bio ? (
                        <p className="text-sm text-red-500">{errors.bio.message}</p>
                    ) : (
                        <p className="text-xs text-muted-foreground">Max 300 characters</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="accent_color">Accent Color</Label>
                <div className="flex items-center gap-4">
                    <Input
                        id="accent_color"
                        type="color"
                        {...register("accent_color")}
                        className="w-16 h-12 p-1 border border-input bg-muted rounded cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground">Choose a brand color</span>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
                <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-accent-brand hover:bg-accent-brand/90 text-white min-w-[100px]"
                >
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                {message && (
                    <span className={`text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                        {message.text}
                    </span>
                )}
            </div>
        </form>
    );
}
