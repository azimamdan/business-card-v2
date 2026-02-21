export type BlockType = 'hero' | 'vcard' | 'project' | 'markdown';

export interface HeroData {
    headline: string;
    subheadline?: string;
    avatarUrl?: string;
}

export interface VCardData {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    title?: string;
    company?: string;
}

export interface ProjectData {
    title: string;
    description?: string;
    url?: string;
    imageUrl?: string;
    tags?: string[];
}

export interface MarkdownData {
    content: string;
}

export type BlockData = HeroData | VCardData | ProjectData | MarkdownData;

export interface Profile {
    id: string;
    slug: string;
    display_name: string;
    bio: string | null;
    avatar_url: string | null;
    accent_color: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface Block {
    id: string;
    profile_id: string;
    type: BlockType;
    data: BlockData;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
}
