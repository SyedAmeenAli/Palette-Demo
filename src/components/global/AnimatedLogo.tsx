"use client";

import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const colors = ["#EF4444", "#3B82F6", "#22C55E", "#8B5CF6", "#F59E0B", "#EC4899"];

export default function AnimatedLogo({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center ${className}`}
    >
      <Link
        href="/"
        className="flex items-center shrink-0 bg-transparent border-none shadow-none p-0 m-0 relative"
      >
        <motion.div
          className="absolute inset-0 z-0 opacity-0 blur-xl pointer-events-none"
          animate={{
            opacity: hovered ? 0.3 : 0,
            backgroundColor: hovered ? "#ffffff" : "transparent",
          }}
          transition={{
            duration: 0.3,
          }}
        />
        <Image
          src="/logo/palette-logo.png"
          alt="Palette Lifestyle"
          width={240}
          height={80}
          className="relative z-10 h-[56px] md:h-[70px] w-auto object-contain bg-transparent border-none shadow-none pointer-events-none"
          priority
        />
      </Link>
    </motion.div>
  );
}
