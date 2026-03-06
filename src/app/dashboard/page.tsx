import { getProfile } from "@/lib/actions/profile";
import { getBlocks } from "@/lib/actions/blocks";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";

import { ProfileForm } from "@/components/dashboard/profile-form";
import { AvatarUpload } from "@/components/dashboard/avatar-upload";
import { SlugEditor } from "@/components/dashboard/slug-editor";
import { PublishToggle } from "@/components/dashboard/publish-toggle";
import { AddBlockMenu } from "@/components/dashboard/add-block-menu";
import { BlockList } from "@/components/dashboard/block-list";
import { LivePreview } from "@/components/dashboard/live-preview";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { SetupForm } from "@/components/dashboard/setup-form";
import { DashboardMobileTabs } from "@/components/dashboard/mobile-tabs";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const profile = await getProfile();

    if (!profile) {
        return (
            <div className="max-w-md mx-auto mt-20 p-4">
                <SetupForm />
            </div>
        );
    }

    const blocks = await getBlocks();

    const editorContent = (
        <div className="space-y-8 pb-10">
            {/* Identity Settings */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Identity</h2>
                    <p className="text-muted-foreground">Manage your personal brand and public profile URL.</p>
                </div>

                <div className="grid gap-6 p-6 rounded-2xl bg-card border border-border shadow-xl">
                    <AvatarUpload profile={profile} />
                    <Separator className="bg-border" />
                    <SlugEditor profile={profile} />
                    <Separator className="bg-border" />
                    <ProfileForm profile={profile} />
                </div>
            </section>

            {/* Blocks Content Settings */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Blocks</h2>
                        <p className="text-muted-foreground">Build your canvas by adding and ordering components.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <BlockList blocks={blocks} />

                    <div className="pt-4">
                        <AddBlockMenu />
                    </div>
                </div>
            </section>

            {/* Publishing Settings */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Publishing</h2>
                    <p className="text-muted-foreground">Control who can see your canvas.</p>
                </div>
                <PublishToggle profile={profile} />
            </section>
        </div>
    );

    const previewContent = (
        <div className="lg:sticky lg:top-24 mt-8 lg:mt-0 flex flex-col gap-4">
            <div className="flex justify-end hidden lg:flex items-center gap-4">
                {profile.is_published && <CopyLinkButton slug={profile.slug} />}
            </div>
            <LivePreview profile={profile} blocks={blocks} />
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            {/* Desktop Layout (Hidden on Mobile) */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-8 xl:gap-16 items-start">
                <div className="w-full max-w-3xl mx-auto">
                    {editorContent}
                </div>
                <div className="w-full">
                    {previewContent}
                </div>
            </div>

            {/* Mobile Layout (Tabs, Hidden on Desktop) */}
            <div className="lg:hidden">
                <DashboardMobileTabs profile={profile} blocks={blocks} editorContent={editorContent} />
            </div>
        </div>
    );
}

