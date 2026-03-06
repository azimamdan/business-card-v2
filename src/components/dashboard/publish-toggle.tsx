"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { togglePublish } from "@/lib/actions/profile";
import { Profile } from "@/lib/types/database";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function PublishToggle({ profile }: { profile: Profile }) {
    const [isPublished, setIsPublished] = useState(profile.is_published);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleToggle = async (checked: boolean) => {
        if (!checked) {
            // Unpublishing requires confirmation
            setShowConfirm(true);
            return;
        }

        // Publishing is immediate
        await executeToggle(true);
    };

    const executeToggle = async (targetState: boolean) => {
        setIsUpdating(true);
        try {
            await togglePublish(targetState);
            setIsPublished(targetState);
            setShowConfirm(false);
        } catch (error) {
            console.error("Failed to toggle publish state", error);
            // Revert optimistically if it failed
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="publish-mode" className="text-base font-medium">Profile Status</Label>
                        <span className="relative flex h-2.5 w-2.5">
                            {isPublished && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                            <motion.span
                                layoutId="status-dot"
                                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPublished ? 'bg-green-500' : 'bg-yellow-500'}`}
                            ></motion.span>
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {isPublished ? "Your profile is live and visible to the public." : "Your profile is a draft and only visible to you."}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {isUpdating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    <Switch
                        id="publish-mode"
                        checked={isPublished}
                        onCheckedChange={handleToggle}
                        disabled={isUpdating}
                        className="data-[state=checked]:bg-accent-brand"
                    />
                </div>
            </div>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Unpublish Profile?</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            This will hide your profile from the public. Anyone trying to visit your URL will see a 404 page until you publish again.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 mt-4">
                        <Button variant="ghost" onClick={() => setShowConfirm(false)} className="text-foreground/70 hover:text-white">
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => executeToggle(false)}
                            disabled={isUpdating}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Yes, unpublish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
