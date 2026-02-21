import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-brand/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            Canvas
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium tracking-tight max-w-md mx-auto">
            Your Digital Identity, Reimagined.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" className="px-8 h-12 bg-white text-black hover:bg-slate-200 transition-all duration-300 rounded-full font-bold text-lg shadow-xl shadow-white/5">
            <Link href="/signup">Get Started</Link>
          </Button>

          <Link href="/login" className="text-sm text-slate-500 hover:text-white transition-colors">
            Already have an account? Log in
          </Link>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 text-[10px] uppercase tracking-[0.2em] text-slate-700 font-bold">
        © 2026 Digital Identity Platform
      </div>
    </main>
  );
}
