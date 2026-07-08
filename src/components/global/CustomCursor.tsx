"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const cursorText = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  
  const cursorGlow = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(true);
  const pathname = usePathname();

  // Mouse position state for interpolation
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsDesktop(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (cursorDot.current) cursorDot.current.style.opacity = "1";
        if (cursorRing.current) cursorRing.current.style.opacity = "1";
      }

      // Check hover states
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorEl) {
        const type = cursorEl.getAttribute("data-cursor");
        if (type === "view") {
          cursorRing.current?.classList.add("cursor-view");
          if (cursorText.current) cursorText.current.textContent = "VIEW";
        } else if (type === "drag") {
          cursorRing.current?.classList.add("cursor-drag");
          if (cursorText.current) cursorText.current.textContent = "DRAG";
        } else if (type === "button") {
          cursorRing.current?.classList.add("cursor-button");
          if (cursorText.current) cursorText.current.textContent = "";
        }
      } else {
        cursorRing.current?.classList.remove("cursor-view", "cursor-drag", "cursor-button");
        if (cursorText.current) cursorText.current.textContent = "";
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (cursorDot.current) cursorDot.current.style.opacity = "0";
      if (cursorRing.current) cursorRing.current.style.opacity = "0";
    };

    const onMouseDown = () => {
      cursorRing.current?.classList.add("scale-90");
    };

    const onMouseUp = () => {
      cursorRing.current?.classList.remove("scale-90");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Animation loop for smooth trailing ring
    const render = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorGlow.current) {
        cursorGlow.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pathname]); // reset or re-bind on route change if needed

  if (!isDesktop) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * {
          cursor: none !important;
        }
        .cursor-view, .cursor-drag {
          width: 80px !important;
          height: 80px !important;
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .cursor-button {
          width: 48px !important;
          height: 48px !important;
          background-color: rgba(255, 255, 255, 0.05);
        }
      `}} />
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference transition-opacity duration-300"
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] opacity-0 transition-all duration-300 ease-out flex items-center justify-center mix-blend-difference"
      >
        <span ref={cursorText} className="text-[10px] font-semibold text-white tracking-widest pointer-events-none" />
      </div>
      
      {/* Subtle background glow attached to the ring */}
      <div 
        ref={cursorGlow}
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none z-[-1] opacity-50"
      />
    </>
  );
}
