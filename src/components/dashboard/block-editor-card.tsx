"use client";

import { useState } from "react";
import { Block } from "@/lib/types/database";
import { Target, Contact, FolderOutput, FileText, ChevronDown, Trash2, GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { deleteBlock, toggleBlockVisibility } from "@/lib/actions/blocks";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { HeroForm } from "./block-forms/hero-form";
import { VCardForm } from "./block-forms/vcard-form";
import { ProjectForm } from "./block-forms/project-form";
import { MarkdownForm } from "./block-forms/markdown-form";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BlockEditorCardProps {
    block: Block;
    isFirst: boolean;
    isLast: boolean;
}

export function BlockEditorCard({ block }: BlockEditorCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
        position: 'relative' as const,
    };

    const handleToggleVisibility = async (checked: boolean) => {
        await toggleBlockVisibility(block.id, checked);
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
        <div
            ref={setNodeRef}
            style={style}
            className={`border border-slate-800 bg-slate-900/70 rounded-xl overflow-hidden transition-all ${!block.is_visible ? 'opacity-60 grayscale-[30%]' : ''} ${isDragging ? 'shadow-2xl scale-[1.02] border-accent-brand/50 ring-2 ring-accent-brand/20' : ''}`}
        >
            {/* Header / Toolbar */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div
                    className="flex items-center gap-3 cursor-pointer select-none flex-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div
                        {...attributes}
                        {...listeners}
                        className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing hover:bg-slate-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GripVertical className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="w-8 h-8 rounded bg-slate-900/50 flex items-center justify-center shrink-0">
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
                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                    {block.type === 'hero' && <HeroForm blockId={block.id} initialData={block.data as any} />}
                    {block.type === 'vcard' && <VCardForm blockId={block.id} initialData={block.data as any} />}
                    {block.type === 'project' && <ProjectForm blockId={block.id} initialData={block.data as any} />}
                    {block.type === 'markdown' && <MarkdownForm blockId={block.id} initialData={block.data as any} />}
                    {/* eslint-enable @typescript-eslint/no-explicit-any */}
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
