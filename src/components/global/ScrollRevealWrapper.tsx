"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealWrapperProps {
  children: ReactNode;
  animation?: "slide-up" | "fade" | "scale" | "slide-right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollRevealWrapper({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 0.6,
  className = ""
}: ScrollRevealWrapperProps) {
  
  const getVariants = () => {
    switch (animation) {
      case "slide-up":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 }
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
