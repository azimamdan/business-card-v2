"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { RESERVED_SLUGS } from "@/lib/constants";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion-variants";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [slug, setSlug] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
            setError("This username is reserved. Please choose another one.");
            setLoading(false);
            return;
        }

        if (!/^[a-z0-9-]+$/.test(slug)) {
            setError("Username can only contain lowercase letters, numbers, and hyphens.");
            setLoading(false);
            return;
        }

        // 1. Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: displayName,
                    slug: slug.toLowerCase(),
                }
            }
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if (authData.user) {
            // 2. Create the profile
            const { error: profileError } = await supabase.from("profiles").insert({
                id: authData.user.id,
                slug: slug.toLowerCase(),
                display_name: displayName,
                is_published: false,
            });

            if (profileError) {
                setError("Account created but profile setup failed: " + profileError.message);
                setLoading(false);
                return;
            }

            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="w-full max-w-md">
                <Card className="w-full border-border bg-card text-foreground shadow-2xl shadow-purple-500/10">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Start building your digital identity canvas today
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    placeholder="John Doe"
                                    required
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Username / Slug</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">canvas.to/</span>
                                    <Input
                                        id="slug"
                                        placeholder="username"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        className="pl-[74px] border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="border-input bg-muted text-foreground focus-visible:ring-accent-brand"
                                    />
                                </div>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="border-red-900/50 bg-red-900/20 text-red-200">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-brand hover:bg-accent-brand/90 text-white transition-all duration-200"
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center text-sm text-muted-foreground w-full">
                            Already have an account?{" "}
                            <Link href="/login" className="text-accent-brand hover:underline font-medium">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
