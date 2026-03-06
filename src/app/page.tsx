"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/motion-variants";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-brand)]/10 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center space-y-8 px-4"
      >
        <div className="space-y-4">
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground"
          >
            Canvas
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground font-medium tracking-tight max-w-md mx-auto"
          >
            Your Digital Identity, Reimagined.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
          <motion.div variants={scaleOnHover} initial="rest" whileHover="hover" whileTap="tap">
            <Button asChild size="lg" className="px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-full font-bold text-lg shadow-xl shadow-white/5">
              <Link href="/signup">Get Started</Link>
            </Button>
          </motion.div>

          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Already have an account? Log in
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold"
      >
        © 2026 Digital Identity Platform
      </motion.div>
    </main>
  );
}
