import React from "react";
import { cn } from "@/lib/utils";

interface IdcvLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function IdcvLogo({ className, size = "md" }: IdcvLogoProps) {
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-sm",
        lg: "w-16 h-16 text-base",
    };

    return (
        <div
            className={cn(
                "font-mono font-bold tracking-tighter flex items-center justify-center rounded-lg bg-accent-brand text-primary-foreground shadow-glow transition-all duration-300",
                sizeClasses[size],
                className
            )}
        >
            [ID]
        </div>
    );
}

export default IdcvLogo;
