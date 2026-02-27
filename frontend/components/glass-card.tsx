import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Reusable glass-morphism card component.
 * Apple-inspired frosted glass design with subtle borders and glow.
 */
export function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-3xl border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-xl shadow-black/10
        ${hover
          ? "transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1"
          : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
