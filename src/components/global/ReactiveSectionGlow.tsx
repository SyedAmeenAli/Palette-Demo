"use client";

import { useEffect, useRef } from "react";

export default function ReactiveSectionGlow({ 
  children, 
  className = "",
  innerClassName = "relative z-10"
}: { 
  children: React.ReactNode, 
  className?: string,
  innerClassName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update CSS variables directly for 60fps performance without React re-renders
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden group ${className}`}
    >
      {/* The glow layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 hidden md:block"
        style={{
          background: "radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 80%)"
        }}
      />
      
      {/* Content */}
      <div className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
