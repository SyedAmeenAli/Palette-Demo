"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LookbookFluidInteraction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for soft organic trailing delay
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.8 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Center of the blob tracks exactly to the cursor
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] flex flex-col items-center justify-center bg-[#f5f5f0] text-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        Fluid Ink Trail 
        - Absolute inside the section
        - Pointer events none so it doesn't block hover
        - Subtle blur and opacity as requested
      */}
      {!isMobile && (
        <motion.div
          style={{ 
            x: springX, 
            y: springY,
            // Offset by half size to center the blob on the cursor
            translateX: "-50%",
            translateY: "-50%"
          }}
          animate={{ 
            scale: isHovered ? [1, 1.1, 1] : 0,
            opacity: isHovered ? 0.25 : 0
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
          className="absolute top-0 left-0 w-[180px] h-[180px] md:w-[220px] md:h-[220px] bg-black rounded-full pointer-events-none z-10 blur-[30px] mix-blend-multiply"
        />
      )}

      {/* Hero Typography */}
      <div className="relative z-20 text-center pointer-events-none px-6">
        <p className="tracking-[0.4em] text-xs md:text-sm uppercase font-semibold text-gray-500 mb-6">
          Lookbook
        </p>
        <h1 className="font-heading text-[clamp(4rem,10vw,10rem)] leading-[0.9] font-black tracking-tighter text-black mb-8">
          STYLE MOVES <br /> WITH YOU
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-base text-gray-600 editorial leading-relaxed">
          Explore Palette Lifestyle through motion, form, and monochrome expression. 
          A constant field of interaction.
        </p>
      </div>
    </section>
  );
}
