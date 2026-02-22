"use client";

import { useState, useRef } from "react";
import { Loader2, Camera } from "lucide-react";
import { updateAvatar } from "@/lib/actions/profile";
import { Profile } from "@/lib/types/database";
import Image from "next/image";

export function AvatarUpload({ profile }: { profile: Profile }) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(profile.avatar_url);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError("Image size should be less than 2MB.");
            return;
        }

        setError(null);
        setPreviewUrl(URL.createObjectURL(file));
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            await updateAvatar(formData);
        } catch (err: any) {
            setError(err.message || "Failed to upload avatar");
            setPreviewUrl(profile.avatar_url); // Revert
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex items-center gap-6">
            <div className="relative group">
                <div
                    className="w-20 h-20 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer shadow-glow transition-all"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ borderColor: profile.accent_color || 'var(--accent-color)' }}
                >
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt="Avatar"
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized={previewUrl.startsWith('blob:')}
                        />
                    ) : (
                        <span className="text-2xl font-bold text-slate-400">
                            {profile.display_name.charAt(0)}
                        </span>
                    )}

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                        <Camera className="w-6 h-6 mb-1" />
                    </div>

                    {isUploading && (
                        <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-accent-brand" />
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                />
            </div>

            <div className="space-y-1">
                <h3 className="font-medium text-slate-200">Profile Picture</h3>
                <p className="text-xs text-slate-400">JPG, PNG or WEBP. Max 2MB.</p>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
        </div>
    );
}
