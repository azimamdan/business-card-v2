"use client";

import { useState, useRef } from "react";
import { Loader2, Camera, X } from "lucide-react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { uploadBlockImage } from "@/lib/actions/blocks";
import { Button } from "@/components/ui/button";

interface ImageUploadWidgetProps {
    value?: string;
    onChange: (url: string) => void;
    label: string;
}

export function ImageUploadWidget({ value, onChange, label }: ImageUploadWidgetProps) {
    const [isUploading, setIsUploading] = useState(false);
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

        setError(null);
        setIsUploading(true);

        try {
            // Compression options
            const options = {
                maxSizeMB: 0.2, // 200KB
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);
            
            const formData = new FormData();
            formData.append("file", compressedFile, file.name);

            const { url } = await uploadBlockImage(formData);
            onChange(url);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to upload image";
            setError(message);
            console.error(err);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
    };

    return (
        <div className="space-y-2">
            <span className="text-sm font-medium text-foreground/70">{label}</span>
            <div 
                className="relative group w-full h-40 rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-all flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
            >
                {value ? (
                    <>
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleRemove}
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Camera className="w-8 h-8" />
                        <span className="text-xs">Click to upload (Max 200KB)</span>
                    </div>
                )}

                {isUploading && (
                    <div className="absolute inset-0 bg-card/80 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-accent-brand" />
                    </div>
                )}
            </div>
            
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
