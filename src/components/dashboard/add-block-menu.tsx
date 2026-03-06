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
                        className="w-full h-auto py-6 border-2 border-dashed border-input hover:border-accent-brand hover:text-white bg-card/50 hover:bg-card/80 rounded-2xl flex flex-col gap-2 transition-all duration-300 group"
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent-brand/20 transition-colors">
                                    <Plus className="h-5 w-5 group-hover:text-accent-brand" />
                                </div>
                                <span className="font-medium text-foreground/70 group-hover:text-white">Add New Block</span>
                            </>
                        )}
                    </Button>
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[300px] bg-card border-border text-foreground">
                <DropdownMenuLabel className="text-muted-foreground font-normal text-xs uppercase tracking-wider">Choose Block Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-muted" />

                <DropdownMenuItem onClick={() => handleAdd('hero')} className="gap-3 p-3 cursor-pointer focus:bg-muted focus:text-white">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                        <Target className="h-4 w-4 text-accent-brand" />
                    </div>
                    <div>
                        <p className="font-medium">Hero Block</p>
                        <p className="text-xs text-muted-foreground">Visual headline with introduction</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleAdd('vcard')} className="gap-3 p-3 cursor-pointer focus:bg-muted focus:text-white">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                        <Contact className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="font-medium">V-Card Block</p>
                        <p className="text-xs text-muted-foreground">Contact details with save button</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleAdd('project')} className="gap-3 p-3 cursor-pointer focus:bg-muted focus:text-white">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                        <FolderOutput className="h-4 w-4 text-sky-400" />
                    </div>
                    <div>
                        <p className="font-medium">Project Block</p>
                        <p className="text-xs text-muted-foreground">Showcase a portfolio piece</p>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleAdd('markdown')} className="gap-3 p-3 cursor-pointer focus:bg-muted focus:text-white">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                        <p className="font-medium">Markdown Block</p>
                        <p className="text-xs text-muted-foreground">Free-form text, lists, and stories</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
