"use client";

import { useState, useTransition } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Block } from "@/lib/types/database";
import { BlockEditorCard } from "./block-editor-card";
import { reorderBlocks } from "@/lib/actions/blocks";

interface BlockListProps {
    blocks: Block[];
}

export function BlockList({ blocks: initialBlocks }: BlockListProps) {
    const [blocks, setBlocks] = useState(initialBlocks);
    const [, startTransition] = useTransition();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Avoid triggering drag on clicks
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);

            const newOrderedBlocks = arrayMove(blocks, oldIndex, newIndex);
            setBlocks(newOrderedBlocks);

            startTransition(async () => {
                try {
                    await reorderBlocks(newOrderedBlocks.map((b) => b.id));
                } catch (error) {
                    console.error("Failed to save block order:", error);
                    alert("Failed to save block order. Changes reverted.");
                    setBlocks(initialBlocks); // Revert on failure
                }
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                    {blocks.map((block, index) => (
                        <BlockEditorCard
                            key={block.id}
                            block={block}
                            isFirst={index === 0}
                            isLast={index === blocks.length - 1}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
