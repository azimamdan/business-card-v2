"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function CopyLinkButton({ slug }: { slug: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            const url = `${window.location.origin}/${slug}`;
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2 bg-muted border-input text-foreground/70 hover:text-white hover:bg-slate-700 h-8"
        >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
        </Button>
    );
}
