"use client";

import { useState } from "react";
import { Block } from "@/lib/types/database";
import { Target, Contact, FolderOutput, FileText, ChevronDown, ChevronUp, Trash2, GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { deleteBlock, reorderBlock, toggleBlockVisibility } from "@/lib/actions/blocks";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { HeroForm } from "./block-forms/hero-form";
import { VCardForm } from "./block-forms/vcard-form";
import { ProjectForm } from "./block-forms/project-form";
import { MarkdownForm } from "./block-forms/markdown-form";

interface BlockEditorCardProps {
    block: Block;
    isFirst: boolean;
    isLast: boolean;
}

export function BlockEditorCard({ block, isFirst, isLast }: BlockEditorCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleVisibility = async (checked: boolean) => {
        await toggleBlockVisibility(block.id, checked);
    };

    const handleReorder = async (direction: 'up' | 'down') => {
        await reorderBlock(block.id, direction);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteBlock(block.id);
        setIsDeleting(false);
        setShowDeleteConfirm(false);
    };

    const getIcon = () => {
        switch (block.type) {
            case 'hero': return <Target className="h-4 w-4 text-accent-brand" />;
            case 'vcard': return <Contact className="h-4 w-4 text-emerald-400" />;
            case 'project': return <FolderOutput className="h-4 w-4 text-sky-400" />;
            case 'markdown': return <FileText className="h-4 w-4 text-purple-400" />;
            default: return <GripVertical className="h-4 w-4" />;
        }
    };

    const getTitle = () => {
        switch (block.type) {
            case 'hero': return "Hero Area";
            case 'vcard': return "V-Card / Contact";
            case 'project': return "Project Showcase";
            case 'markdown': return "Markdown Content";
            default: return "Unknown Block";
        }
    };

    return (
        <div className={`border border-slate-800 bg-slate-900/70 rounded-xl overflow-hidden transition-all ${!block.is_visible ? 'opacity-60 grayscale-[30%]' : ''}`}>
            {/* Header / Toolbar */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div
                    className="flex items-center gap-3 cursor-pointer select-none flex-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        {getIcon()}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-slate-200 text-sm">{getTitle()}</h4>
                        {!block.is_visible && <span className="text-xs text-slate-500">Hidden from public</span>}
                    </div>
                    <div className="text-slate-500 mr-2">
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>

                <div className="flex items-center gap-2 border-l border-slate-800 pl-4 ml-2">
                    <Switch
                        checked={block.is_visible}
                        onCheckedChange={handleToggleVisibility}
                        className="data-[state=checked]:bg-accent-brand mr-2"
                        title="Toggle visibility"
                    />

                    <div className="flex flex-col gap-0.5">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-6 rounded-sm text-slate-400 hover:text-white"
                            onClick={() => handleReorder('up')}
                            disabled={isFirst}
                        >
                            <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-6 rounded-sm text-slate-400 hover:text-white"
                            onClick={() => handleReorder('down')}
                            disabled={isLast}
                        >
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Collapsible Body */}
            {isOpen && (
                <div className="p-4 border-t border-slate-800/50 bg-slate-900/40">
                    {block.type === 'hero' && <HeroForm blockId={block.id} initialData={block.data as any} />}
                    {block.type === 'vcard' && <VCardForm blockId={block.id} initialData={block.data as any} />}
                    {block.type === 'project' && <ProjectForm blockId={block.id} initialData={block.data as any} />}
                    {block.type === 'markdown' && <MarkdownForm blockId={block.id} initialData={block.data as any} />}
                </div>
            )}

            {/* Delete Confirmation */}
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent className="bg-slate-900 border-slate-800 text-slate-50 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete {getTitle()}?</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Are you sure you want to delete this block? This action cannot be undone.
                            Consider hiding it instead if you want to keep the content.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 mt-4">
                        <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)} className="text-slate-300">
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? "Deleting..." : "Delete block"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
