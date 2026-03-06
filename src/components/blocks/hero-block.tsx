"use client";

import { HeroData } from "@/lib/types/database";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleOnHover } from "@/lib/motion-variants";

interface HeroBlockProps {
  data: HeroData;
}

export function HeroBlock({ data }: HeroBlockProps) {
  return (
    <motion.div
      variants={scaleOnHover}
      initial="rest"
      whileHover="hover"
      className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 flex flex-col items-center text-center space-y-6"
    >
      {data.avatarUrl && (
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-[var(--accent-brand)] shadow-lg shadow-[var(--accent-brand)]/20">
          <Image
            src={data.avatarUrl}
            alt={data.headline}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      )}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {data.subheadline}
          </p>
        )}
      </div>
    </motion.div>
  );
}
