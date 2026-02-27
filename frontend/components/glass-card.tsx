import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Apple Liquid Glass card.
 * Translucent white with specular highlight, strong blur, and soft shadow.
 */
export function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div className={`glass rounded-3xl ${hover ? "glass-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}
