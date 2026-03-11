"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { createProfile } from "@/lib/actions/profile";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const setupSchema = z.object({
    display_name: z.string().min(1, "Display name is required").max(50),
    slug: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30)
        .regex(/^[a-z0-9-]+$/, "Username can only contain lowercase letters, numbers, and hyphens")
});

type SetupFormData = z.infer<typeof setupSchema>;

export function SetupForm() {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<SetupFormData>({
        resolver: zodResolver(setupSchema),
        defaultValues: {
            display_name: "",
            slug: "",
        }
    });

    const onSubmit = async (data: SetupFormData) => {
        setIsSaving(true);
        setError(null);
        try {
            const result = await createProfile(data);
            if (!result.success) {
                setError(result.error || "Failed to create profile");
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="border-border bg-card shadow-2xl">
            <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent-brand/20 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-accent-brand" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Claim your space</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Set up your [ IDCV ] Identity Canvas in seconds.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="display_name">Public Name</Label>
                        <Input
                            id="display_name"
                            placeholder="Alex Rivera"
                            {...register("display_name")}
                            className="border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                        />
                        {errors.display_name && (
                            <p className="text-sm text-red-500">{errors.display_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Username / URL</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">idcv.me/</span>
                            <Input
                                id="slug"
                                placeholder="alex"
                                {...register("slug")}
                                className="pl-[82px] border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                            />
                        </div>
                        {errors.slug && (
                            <p className="text-sm text-red-500">{errors.slug.message}</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-accent-brand hover:bg-accent-brand/90 text-white font-semibold h-11"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {isSaving ? "Creating Profile..." : "Complete Setup"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
