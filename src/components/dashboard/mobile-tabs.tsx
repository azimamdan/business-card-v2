"use client";

import { Profile, Block } from "@/lib/types/database";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { LivePreview } from "@/components/dashboard/live-preview";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DashboardMobileTabsProps {
    profile: Profile;
    blocks: Block[];
    editorContent: React.ReactNode;
}

export function DashboardMobileTabs({ profile, blocks, editorContent }: DashboardMobileTabsProps) {
    const [activeTab, setActiveTab] = useState("edit");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-6 sticky top-16 z-40 bg-slate-950 py-2">
                <TabsList className="grid w-full grid-cols-2 bg-slate-900 border border-slate-800">
                    <TabsTrigger value="edit" className="data-[state=active]:bg-slate-800 data-[state=active]:text-slate-50 text-slate-400">Edit Profile</TabsTrigger>
                    <TabsTrigger value="preview" className="data-[state=active]:bg-slate-800 data-[state=active]:text-slate-50 text-slate-400">Live Preview</TabsTrigger>
                </TabsList>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    {activeTab === "edit" ? (
                        <motion.div
                            key="edit"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TabsContent value="edit" className="mt-0 outline-none" forceMount>
                                {editorContent}
                            </TabsContent>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TabsContent value="preview" className="mt-0 outline-none" forceMount>
                                <div className="mb-4">
                                    {profile.is_published && <CopyLinkButton slug={profile.slug} />}
                                </div>
                                <LivePreview profile={profile} blocks={blocks} />
                            </TabsContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Tabs>
    );
}
