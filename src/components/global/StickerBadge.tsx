"use client";

import { motion } from "framer-motion";

interface StickerBadgeProps {
  text: string;
  className?: string;
  rotation?: number;
}

export default function StickerBadge({ text, className = "", rotation = -3 }: StickerBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: rotation > 0 ? rotation + 2 : rotation - 2 }}
      className={`absolute z-20 pointer-events-auto bg-[#EFEBE4] text-black px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold ${className}`}
      style={{
        boxShadow: "2px 4px 10px rgba(0,0,0,0.3), inset 0 0 5px rgba(0,0,0,0.1)",
        clipPath: "polygon(1% 2%, 98% 0%, 99% 98%, 0% 100%)",
        rotate: `${rotation}deg`
      }}
    >
      <div className="absolute inset-0 bg-white/20 pointer-events-none noise-layer opacity-40 mix-blend-multiply" />
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
}
