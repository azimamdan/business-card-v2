"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { RESERVED_SLUGS } from '@/lib/constants';
import { Profile } from '@/lib/types/database';

export type UpdateProfileInput = {
    display_name: string;
    bio?: string;
    accent_color?: string;
};

export async function createProfile(input: { display_name: string; slug: string }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const slug = input.slug.toLowerCase();

    // Validation
    if (slug.length < 3 || slug.length > 30) return { success: false, error: "Slug must be between 3 and 30 characters" };
    if (!/^[a-z0-9-]+$/.test(slug)) return { success: false, error: "Slug can only contain lowercase letters, numbers, and hyphens" };
    if (RESERVED_SLUGS.includes(slug)) return { success: false, error: "This slug is reserved" };

    // Check uniqueness
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('slug', slug)
        .single();

    if (existing) {
        return { success: false, error: "Slug is already taken" };
    }

    const { error } = await supabase
        .from('profiles')
        .insert({
            id: user.id,
            slug,
            display_name: input.display_name,
            accent_color: 'hsl(250, 100%, 65%)',
            is_published: false,
            updated_at: new Date().toISOString()
        });

    if (error) return { success: false, error: error.message };

    revalidatePath('/dashboard');
    return { success: true };
}

export async function getProfile(): Promise<Profile | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return profile || null;
}

export async function updateProfile(input: UpdateProfileInput) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from('profiles')
        .update({
            display_name: input.display_name,
            bio: input.bio || '',
            accent_color: input.accent_color || 'hsl(250, 100%, 65%)',
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard');
    return { success: true };
}

export async function updateSlug(newSlug: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const slug = newSlug.toLowerCase();

    if (slug.length < 3 || slug.length > 30) return { success: false, error: "Slug must be between 3 and 30 characters" };
    if (!/^[a-z0-9-]+$/.test(slug)) return { success: false, error: "Slug can only contain lowercase letters, numbers, and hyphens" };
    if (RESERVED_SLUGS.includes(slug)) return { success: false, error: "This slug is reserved" };

    // Check uniqueness
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('slug', slug)
        .single();

    if (existing && existing.id !== user.id) {
        return { success: false, error: "Slug is already taken" };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ slug, updated_at: new Date().toISOString() })
        .eq('id', user.id);

    if (error) return { success: false, error: error.message };

    revalidatePath('/dashboard');
    return { success: true };
}

export async function updateAvatar(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const file = formData.get('file') as File;
    if (!file) throw new Error("No file provided");

    const fileExt = file.name.split('.').pop() || 'png';
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    // append timestamp to force refresh cache
    const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlWithTimestamp, updated_at: new Date().toISOString() })
        .eq('id', user.id);

    if (updateError) throw new Error(updateError.message);

    revalidatePath('/dashboard');
    return { url: urlWithTimestamp };
}

export async function togglePublish(isPublished: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from('profiles')
        .update({ is_published: isPublished, updated_at: new Date().toISOString() })
        .eq('id', user.id);

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard');
    return { success: true };
}
