"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className = "" }: WishlistButtonProps) {
  const { hasItem, toggleItem } = useWishlistStore();
  const isLiked = hasItem(productId);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleItem(productId);
    
    if (!isLiked) {
      setIsAnimating(true);
      toast.success("Added to wishlist", {
        description: "This item has been saved to your collection.",
      });
      setTimeout(() => setIsAnimating(false), 1000);
    } else {
      toast("Removed from wishlist");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-cursor="button"
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/60 transition-colors z-20 ${className}`}
    >
      <Heart 
        size={18} 
        className={`transition-colors duration-300 ${isLiked ? "fill-white text-white" : "text-white"}`} 
      />
      
      {/* Particle burst animation */}
      <AnimatePresence>
        {isAnimating && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: Math.random() * 0.5 + 0.5,
                  x: (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 60
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
              />
            ))}
            <motion.div 
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-full border border-white pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
