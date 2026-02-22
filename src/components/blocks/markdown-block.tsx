"use client";

import { MarkdownData } from "@/lib/types/database";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownBlockProps {
    data: MarkdownData;
}

export function MarkdownBlock({ data }: MarkdownBlockProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8">
            <div className="prose-canvas">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => <h1 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-xl font-bold text-slate-50 mt-8 mb-4 tracking-tight" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-lg font-bold text-slate-50 mt-6 mb-3 tracking-tight" {...props} />,
                        p: ({ ...props }) => <p className="text-slate-300 leading-relaxed mb-4 last:mb-0" {...props} />,
                        a: ({ ...props }) => <a className="text-[var(--accent-brand)] hover:underline decoration-[var(--accent-brand)]/30 underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-outside ml-5 text-slate-300 mb-4 space-y-2" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-outside ml-5 text-slate-300 mb-4 space-y-2" {...props} />,
                        li: ({ ...props }) => <li className="pl-1" {...props} />,
                        code: ({ ...props }) => {
                            const { inline, ...rest } = props as { inline?: boolean };
                            return inline ?
                                <code className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono" {...rest} /> :
                                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto mb-4"><code className="text-slate-200 text-sm font-mono" {...rest} /></pre>
                        },
                        blockquote: ({ ...props }) => <blockquote className="border-l-2 border-[var(--accent-brand)] pl-4 italic text-slate-400 my-6" {...props} />
                    }}
                >
                    {data.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
