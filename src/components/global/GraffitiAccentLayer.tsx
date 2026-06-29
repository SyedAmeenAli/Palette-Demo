"use client";

import { motion } from "framer-motion";

interface GraffitiAccentLayerProps {
  variant?: "spray" | "stroke" | "scribble" | "tape";
  className?: string;
  color?: string;
}

export default function GraffitiAccentLayer({ variant = "spray", className = "", color = "rgba(255,255,255,0.05)" }: GraffitiAccentLayerProps) {
  
  const getAccent = () => {
    switch (variant) {
      case "spray":
        return (
          <div className="absolute inset-0 pointer-events-none graffiti-spray opacity-20">
            {/* Soft dispersed radial gradients simulating spray paint */}
            <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] rounded-full blur-[80px]" style={{ background: color }} />
            <div className="absolute bottom-[20%] right-[10%] w-[20vw] h-[20vw] rounded-full blur-[60px]" style={{ background: color }} />
          </div>
        );
      case "stroke":
        return (
          <motion.svg 
            viewBox="0 0 100 20" 
            className="absolute pointer-events-none w-full h-auto opacity-30"
            preserveAspectRatio="none"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10%" }}
          >
            <path d="M0,10 Q25,2 50,15 T100,5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M2,12 Q30,5 60,18 T98,8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </motion.svg>
        );
      case "scribble":
        return (
          <svg className="absolute pointer-events-none opacity-40 w-32 h-32" viewBox="0 0 100 100">
            <path d="M10,50 Q20,20 40,60 T70,30 T90,70" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "tape":
        return (
          <div 
            className="absolute pointer-events-none w-32 h-8 bg-[#EBEBEB] opacity-80 mix-blend-luminosity transform -rotate-2"
            style={{
              clipPath: "polygon(2% 5%, 98% 0%, 96% 95%, 4% 100%)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              filter: "contrast(1.2) sepia(0.1)"
            }}
          />
        );
    }
  };

  return (
    <div className={`absolute pointer-events-none z-0 ${className}`} aria-hidden="true">
      {getAccent()}
    </div>
  );
}
