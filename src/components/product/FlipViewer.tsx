"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Rotate3D, Maximize } from "lucide-react";

export default function FlipViewer({ frontImage, backImage, name }: { frontImage: string, backImage: string, name: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[3/4] perspective-1000">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        animate={{
          rotateY: isFlipped ? 180 : (isHovered ? mousePos.x : 0),
          rotateX: isHovered && !isFlipped ? mousePos.y : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.5,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-[#111] rounded-3xl overflow-hidden border border-brand-border-strong">
          <Image src={frontImage} alt={`${name} Front`} fill className="object-cover" priority />
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 backface-hidden bg-[#111] rounded-3xl overflow-hidden border border-brand-border-strong [transform:rotateY(180deg)]">
          <Image src={backImage || frontImage} alt={`${name} Back`} fill className="object-cover" />
          {!backImage && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">Back View Not Added</span>
            </div>
          )}
        </div>
      </motion.div>

      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute bottom-6 right-6 bg-brand-card/80 backdrop-blur border border-brand-border-strong text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors shadow-lg z-20 flex items-center"
      >
        <Rotate3D size={20} className="mr-2" />
        <span className="text-sm font-medium">Flip Product</span>
      </button>

      <div className="absolute top-6 left-6 flex space-x-2 z-20">
        <button
          onClick={() => setIsFlipped(false)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors backdrop-blur ${!isFlipped ? "bg-white text-black" : "bg-brand-card/50 text-white border border-brand-border-hairline hover:bg-brand-card"}`}
        >
          Front
        </button>
        <button
          onClick={() => setIsFlipped(true)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors backdrop-blur ${isFlipped ? "bg-white text-black" : "bg-brand-card/50 text-white border border-brand-border-hairline hover:bg-brand-card"}`}
        >
          Back
        </button>
      </div>
    </div>
  );
}
