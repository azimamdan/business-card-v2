"use client";

import { useState } from "react";
import { Plus, Target, Contact, FolderOutput, FileText, Loader2, X } from "lucide-react";
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
import { useEffect } from "react";

export function AddBlockMenu() {
    const [isAdding, setIsAdding] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showSheet, setShowSheet] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock body scroll when sheet is open
    useEffect(() => {
        if (showSheet) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showSheet]);

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
            setIsOpen(false);
            setShowSheet(false);
        } catch (error) {
            console.error("Failed to add block", error);
        } finally {
            setIsAdding(false);
        }
    };

    const triggerButton = (
        <motion.div variants={scaleOnHover} initial="rest" whileHover="hover" whileTap="tap">
            <Button
                variant="outline"
                className="w-full h-auto py-6 border-2 border-dashed border-input hover:border-accent-brand hover:text-white bg-card/50 hover:bg-card/80 rounded-2xl flex flex-col gap-2 transition-all duration-300 group"
                disabled={isAdding}
                onClick={isMobile ? () => setShowSheet(true) : undefined}
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
    );

    const blockTypeItems = [
        { type: 'hero' as BlockType, label: 'Hero Block', description: 'Visual headline with introduction', icon: <Target className="h-4 w-4 text-accent-brand" /> },
        { type: 'vcard' as BlockType, label: 'V-Card Block', description: 'Contact details with save button', icon: <Contact className="h-4 w-4 text-emerald-400" /> },
        { type: 'project' as BlockType, label: 'Project Block', description: 'Showcase a portfolio piece', icon: <FolderOutput className="h-4 w-4 text-sky-400" /> },
        { type: 'markdown' as BlockType, label: 'Markdown Block', description: 'Free-form text, lists, and stories', icon: <FileText className="h-4 w-4 text-purple-400" /> },
    ];

    if (isMobile) {
        return (
            <>
                {triggerButton}

                {/* Custom Bottom Sheet */}
                {showSheet && (
                    <div className="fixed inset-0 z-[100]">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowSheet(false)}
                        />

                        {/* Sheet Content */}
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-[32px] animate-in slide-in-from-bottom duration-300"
                            style={{ maxHeight: '85vh' }}
                        >
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-4" />
                            <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 40px)' }}>
                                <div className="flex items-center justify-between mb-1">
                                    <h2 className="text-xl font-bold">Add New Block</h2>
                                    <Button variant="ghost" size="icon" onClick={() => setShowSheet(false)}>
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Choose a block type to add to your canvas.
                                </p>

                                <div className="space-y-4">
                                    {blockTypeItems.map((item) => (
                                        <button
                                            key={item.type}
                                            onClick={() => handleAdd(item.type)}
                                            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors text-left border border-transparent hover:border-border"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{item.label}</p>
                                                <p className="text-xs text-muted-foreground">{item.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="h-10" /> {/* Spacer */}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {triggerButton}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[300px] bg-card border-border text-foreground">
                <DropdownMenuLabel className="text-muted-foreground font-normal text-xs uppercase tracking-wider">Choose Block Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-muted" />

                {blockTypeItems.map((item) => (
                    <DropdownMenuItem
                        key={item.type}
                        onClick={() => handleAdd(item.type)}
                        className="gap-3 p-3 cursor-pointer focus:bg-muted focus:text-white"
                    >
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
