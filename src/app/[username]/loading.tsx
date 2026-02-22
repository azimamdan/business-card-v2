export default function LoadingProfile() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-[var(--accent-brand)]/30 selection:text-white">
            <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 space-y-12">

                {/* Profile Header Skeleton */}
                <header className="text-center space-y-4 animate-pulse">
                    <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto border-2 border-slate-700"></div>
                    <div className="space-y-3 flex flex-col items-center mt-6">
                        <div className="h-8 w-48 bg-slate-800 rounded-md"></div>
                        <div className="h-4 w-64 bg-slate-800/80 rounded-md pt-2"></div>
                        <div className="h-4 w-56 bg-slate-800/80 rounded-md"></div>
                    </div>
                </header>

                {/* Blocks Area Skeleton */}
                <section className="space-y-6">
                    {/* Placeholder for Link Block */}
                    <div className="h-20 w-full bg-slate-800/50 rounded-2xl animate-pulse"></div>

                    {/* Placeholder for V-Card Block */}
                    <div className="h-32 w-full bg-slate-800/50 rounded-2xl animate-pulse"></div>

                    {/* Placeholder for Project Block */}
                    <div className="h-64 w-full bg-slate-800/50 rounded-2xl animate-pulse"></div>
                </section>

                <footer className="pt-20 pb-8 text-center animate-pulse">
                    <div className="h-4 w-32 bg-slate-800/50 rounded-md mx-auto"></div>
                </footer>
            </div>
        </div>
    );
}
