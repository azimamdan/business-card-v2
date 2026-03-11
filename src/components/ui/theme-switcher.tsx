"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ThemeSwitcherProps {
    variant?: "default" | "compact";
}

export function ThemeSwitcher({ variant = "default" }: ThemeSwitcherProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div
                className={variant === "default"
                    ? "flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50"
                    : "opacity-0"}
                style={{ width: variant === "default" ? "100px" : "44px", height: "44px", opacity: variant === "default" ? 1 : 0 }}
            />
        );
    }

    if (variant === "compact") {
        return (
            <Button
                variant="ghost"
                size="icon-touch"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full text-muted-foreground hover:text-foreground"
                title={`Current theme: ${theme}. Click to change.`}
            >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const themes = [
        { id: "light", icon: Sun },
        { id: "dark", icon: Moon },
    ];

    return (
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50 min-w-[100px] w-fit shrink-0">
            {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;

                return (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 shrink-0 ${isActive
                            ? "bg-accent-brand text-white shadow-glow"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                        title={`${t.id} mode`}
                    >
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{t.id} mode</span>
                    </button>
                );
            })}
        </div>
    );
}
