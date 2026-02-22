"use client";

import { HeroData } from "@/lib/types/database";

interface HeroBlockProps {
  data: HeroData;
  blockId: string;
}

export function HeroBlock({ data, blockId }: HeroBlockProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {data.avatarUrl && (
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-[var(--accent-brand)] shadow-lg shadow-[var(--accent-brand)]/20">
          <img
            src={data.avatarUrl}
            alt={data.headline}
            className="object-cover h-full w-full"
          />
        </div>
      )}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50">
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {data.subheadline}
          </p>
        )}
      </div>
    </div>
  );
}
