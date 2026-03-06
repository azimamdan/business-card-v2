"use client";

import { ProjectData } from "@/lib/types/database";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleOnHover } from "@/lib/motion-variants";

interface ProjectBlockProps {
    data: ProjectData;
}

export function ProjectBlock({ data }: ProjectBlockProps) {
    const content = (
        <>
            {data.imageUrl && (
                <div className="w-full h-48 md:h-64 overflow-hidden rounded-t-2xl relative">
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 42rem"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            )}

            <div className="p-8 space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                        {data.title}
                    </h3>
                    {data.url && (
                        <ExternalLink className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                    )}
                </div>

                {data.description && (
                    <p className="text-muted-foreground leading-relaxed">
                        {data.description}
                    </p>
                )}

                {data.tags && data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {data.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-muted text-foreground/70 text-xs px-3 py-1 rounded-full border border-input"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

    const containerClasses = "block rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors duration-300";

    if (data.url) {
        return (
            <motion.a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleOnHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className={`${containerClasses} hover:bg-muted/50 hover:border-input`}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.div
            variants={scaleOnHover}
            initial="rest"
            whileHover="hover"
            className={containerClasses}
        >
            {content}
        </motion.div>
    );
}
