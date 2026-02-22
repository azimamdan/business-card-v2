"use client";

import { VCardData } from "@/lib/types/database";
import { Mail, Phone, Building2, Briefcase, Download } from "lucide-react";

interface VCardBlockProps {
    data: VCardData;
    blockId: string;
}

export function VCardBlock({ data, blockId }: VCardBlockProps) {
    const handleDownload = () => {
        window.location.href = `/api/vcard/${blockId}`;
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-50 tracking-tight">
                        {data.firstName} {data.lastName}
                    </h2>

                    <div className="flex flex-col space-y-1 mt-4">
                        {data.title && (
                            <div className="flex items-center text-slate-300">
                                <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                                <span>{data.title}</span>
                            </div>
                        )}

                        {data.company && (
                            <div className="flex items-center text-slate-300">
                                <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                                <span>{data.company}</span>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    className="flex items-center justify-center space-x-2 bg-[var(--accent-brand)] hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium transition-opacity w-full md:w-auto shrink-0 shadow-lg shadow-[var(--accent-brand)]/20"
                >
                    <Download className="w-4 h-4" />
                    <span>Add to Contacts</span>
                </button>
            </div>

            {(data.email || data.phone) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-800">
                    {data.email && (
                        <a
                            href={`mailto:${data.email}`}
                            className="flex items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                        >
                            <Mail className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="truncate">{data.email}</span>
                        </a>
                    )}

                    {data.phone && (
                        <a
                            href={`tel:${data.phone}`}
                            className="flex items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                        >
                            <Phone className="w-5 h-5 mr-3 text-slate-400" />
                            <span>{data.phone}</span>
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
