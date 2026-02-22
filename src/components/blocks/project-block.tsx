"use client";

import { ProjectData } from "@/lib/types/database";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleOnHover } from "@/lib/motion-variants";

interface ProjectBlockProps {
    data: ProjectData;
    blockId: string;
}

export function ProjectBlock({ data, blockId }: ProjectBlockProps) {
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
                    <h3 className="text-xl font-bold text-slate-50 tracking-tight">
                        {data.title}
                    </h3>
                    {data.url && (
                        <ExternalLink className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                    )}
                </div>

                {data.description && (
                    <p className="text-slate-400 leading-relaxed">
                        {data.description}
                    </p>
                )}

                {data.tags && data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {data.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

    const containerClasses = "block rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-colors duration-300";

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
                className={`${containerClasses} hover:bg-slate-800/50 hover:border-slate-700`}
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
