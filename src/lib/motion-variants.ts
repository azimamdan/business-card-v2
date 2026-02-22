import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const scaleOnHover: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } },
    tap: { scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 25 } },
};

export const springToggle = {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
};
