"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Block, BlockType, BlockData } from '@/lib/types/database';

export async function getBlocks(): Promise<Block[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: blocks } = await supabase
        .from('blocks')
        .select('*')
        .eq('profile_id', user.id)
        .order('sort_order', { ascending: true });

    return (blocks as Block[]) || [];
}

export async function addBlock(type: BlockType, data: BlockData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Get max sort_order
    const { data: existingBlocks } = await supabase
        .from('blocks')
        .select('sort_order')
        .eq('profile_id', user.id)
        .order('sort_order', { ascending: false })
        .limit(1);

    const nextSortOrder = existingBlocks && existingBlocks.length > 0 ? existingBlocks[0].sort_order + 1 : 0;

    const { data: newBlock, error } = await supabase
        .from('blocks')
        .insert({
            profile_id: user.id,
            type,
            data,
            sort_order: nextSortOrder,
            is_visible: true
        })
        .select()
        .single();

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard');
    return newBlock as Block;
}

export async function updateBlock(blockId: string, data: BlockData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from('blocks')
        .update({ data, updated_at: new Date().toISOString() })
        .eq('id', blockId)
        .eq('profile_id', user.id);

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard');
    return { success: true };
}

export async function deleteBlock(blockId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from('blocks')
        .delete()
        .eq('id', blockId)
        .eq('profile_id', user.id);

    if (error) throw new Error(error.message);

    // Renumber remaining
    const { data: blocks } = await supabase
        .from('blocks')
        .select('id, sort_order')
        .eq('profile_id', user.id)
        .order('sort_order', { ascending: true });

    if (blocks) {
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].sort_order !== i) {
                await supabase
                    .from('blocks')
                    .update({ sort_order: i })
                    .eq('id', blocks[i].id);
            }
        }
    }

    revalidatePath('/dashboard');
    return { success: true };
}

export async function reorderBlock(blockId: string, direction: 'up' | 'down') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: blocks } = await supabase
        .from('blocks')
        .select('id, sort_order')
        .eq('profile_id', user.id)
        .order('sort_order', { ascending: true });

    if (!blocks) return { success: false };

    const currentIndex = blocks.findIndex(b => b.id === blockId);
    if (currentIndex === -1) return { success: false };

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= blocks.length) return { success: false };

    const currentBlock = blocks[currentIndex];
    const targetBlock = blocks[targetIndex];

    await Promise.all([
        supabase.from('blocks').update({ sort_order: targetBlock.sort_order }).eq('id', currentBlock.id),
        supabase.from('blocks').update({ sort_order: currentBlock.sort_order }).eq('id', targetBlock.id)
    ]);

    revalidatePath('/dashboard');
    return { success: true };
}

export async function toggleBlockVisibility(blockId: string, isVisible: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from('blocks')
        .update({ is_visible: isVisible, updated_at: new Date().toISOString() })
        .eq('id', blockId)
        .eq('profile_id', user.id);

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard');
    return { success: true };
}
