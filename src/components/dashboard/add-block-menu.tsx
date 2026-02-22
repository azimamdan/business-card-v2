"use client";

import { useState } from "react";
import { Plus, Target, Contact, FolderOutput, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addBlock } from "@/lib/actions/blocks";
import { BlockType, BlockData } from "@/lib/types/database";
import { motion } from "framer-motion";
import { scaleOnHover } from "@/lib/motion-variants";

export function AddBlockMenu() {
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async (type: BlockType) => {
        setIsAdding(true);
        try {
            let defaultData = {};
            switch (type) {
                case 'hero':
                    defaultData = { headline: "Your Name", subheadline: "Your tagline" };
                    break;
                case 'vcard':
                    defaultData = { firstName: "First", lastName: "Last" };
                    break;
                case 'project':
                    defaultData = { title: "My Project", description: "" };
                    break;
                case 'markdown':
                    defaultData = { content: "# Hello\nStart writing..." };
                    break;
            }
            await addBlock(type, defaultData as BlockData);
        } catch (error) {
            console.error("Failed to add block", error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.div variants={scaleOnHover} initial="rest" whileHover="hover" whileTap="tap">
                    <Button
                        variant="outline"
                        className="w-full h-auto py-6 border-2 border-dashed border-slate-700 hover:border-accent-brand hover:text-white bg-slate-900/50 hover:bg-slate-900/80 rounded-2xl flex flex-col gap-2 transition-all duration-300 group"
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-accent-brand/20 transition-colors">
                                    <Plus className="h-5 w-5 group-hover:text-accent-brand" />
                                </div>
                                <span className="font-medium text-slate-300 group-hover:text-white">Add New Block</span>
                            </>
                        )}
                    </Button>
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[300px] bg-slate-900 border-slate-800 text-slate-50">
                <DropdownMenuLabel className="text-slate-400 font-normal text-xs uppercase tracking-wider">Choose Block Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />

                <DropdownMenuItem onClick={() => handleAdd('hero')} className="gap-3 p-3 cursor-pointer focus:bg-slate-800 focus:text-white">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        <Target className="h-4 w-4 text-accent-brand" />
                    </div>
                    <div>
                        <p className="font-medium">Hero Block</p>
                        <p className="text-xs text-slate-400">Visual headline with introduction</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleAdd('vcard')} className="gap-3 p-3 cursor-pointer focus:bg-slate-800 focus:text-white">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        <Contact className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="font-medium">V-Card Block</p>
                        <p className="text-xs text-slate-400">Contact details with save button</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleAdd('project')} className="gap-3 p-3 cursor-pointer focus:bg-slate-800 focus:text-white">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        <FolderOutput className="h-4 w-4 text-sky-400" />
                    </div>
                    <div>
                        <p className="font-medium">Project Block</p>
                        <p className="text-xs text-slate-400">Showcase a portfolio piece</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleAdd('markdown')} className="gap-3 p-3 cursor-pointer focus:bg-slate-800 focus:text-white">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                        <p className="font-medium">Markdown Block</p>
                        <p className="text-xs text-slate-400">Free-form text, lists, and stories</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
