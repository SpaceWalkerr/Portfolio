import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * The site's single reveal gesture: fade + 12px rise, nothing else (brief §3).
 * No scale, no rotate. `delay` staggers grouped items.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const common = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12%" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
    className,
  };

  if (as === "li") return <motion.li {...common}>{children}</motion.li>;
  if (as === "span")
    return (
      <motion.span {...common} className={`inline-block ${className ?? ""}`}>
        {children}
      </motion.span>
    );
  return <motion.div {...common}>{children}</motion.div>;
}
