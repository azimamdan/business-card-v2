import { z } from "zod";
import { RESERVED_SLUGS } from "@/lib/constants";

export const profileSchema = z.object({
    display_name: z.string().min(1, "Display name is required").max(50, "Display name must be less than 50 characters"),
    bio: z.string().max(300, "Bio must be less than 300 characters").optional().or(z.literal('')),
    accent_color: z.string().optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const slugSchema = z.object({
    slug: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(/^[a-z0-9-]+$/, "Username can only contain lowercase letters, numbers, and hyphens")
        .refine((slug) => !RESERVED_SLUGS.includes(slug), {
            message: "This username is reserved"
        })
});

export type SlugFormData = z.infer<typeof slugSchema>;
