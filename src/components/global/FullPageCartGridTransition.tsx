"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function triggerAddToCartEffect(e: React.MouseEvent) {
  // We don't strictly need x, y anymore but we can pass it anyway
  const event = new CustomEvent("add-to-cart-effect", {
    detail: { x: e.clientX, y: e.clientY },
  });
  window.dispatchEvent(event);
}

interface Tile {
  id: string;
  startX: number;
  startY: number;
  width: number;
  height: number;
  targetX: number;
  targetY: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
  opacity: number;
  isOutlined: boolean;
  shiftX: number;
  shiftY: number;
}

interface ActiveEffect {
  id: number;
  tiles: Tile[];
}

export default function FullPageCartGridTransition() {
  const [activeEffects, setActiveEffects] = useState<ActiveEffect[]>([]);

  useEffect(() => {
    const handleTrigger = () => {
      // Get cart icon position
      const cartIcon = document.getElementById("global-cart-icon");
      let targetX = window.innerWidth - 60; // Fallback top right
      let targetY = 40;
      
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      }

      // Generate full page grid tiles
      const isMobile = window.innerWidth < 768;
      const cols = isMobile ? 4 : 8;
      const rows = isMobile ? 6 : 5;
      const tileWidth = window.innerWidth / cols;
      const tileHeight = window.innerHeight / rows;
      
      const newTiles: Tile[] = [];
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tileCenterX = c * tileWidth + tileWidth / 2;
          const tileCenterY = r * tileHeight + tileHeight / 2;
          
          // Distance from cart icon to determine delay/speed
          const distToCart = Math.sqrt(Math.pow(targetX - tileCenterX, 2) + Math.pow(targetY - tileCenterY, 2));
          const maxDist = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
          const distRatio = distToCart / maxDist;

          newTiles.push({
            id: `tile-${Date.now()}-${r}-${c}`,
            startX: tileCenterX,
            startY: tileCenterY,
            width: tileWidth,
            height: tileHeight,
            targetX,
            targetY,
            // Delay based on distance so further tiles move later, creating a wave
            delay: distRatio * 0.4, 
            duration: 1.2, // Smooth, slow duration
            rotation: 0, // No chaotic rotation
            scale: 1, 
            opacity: 1,
            isOutlined: true,
            shiftX: 0,
            shiftY: 0,
          });
        }
      }

      const effectId = Date.now();
      setActiveEffects((prev) => [...prev, { id: effectId, tiles: newTiles }]);
      
      // Trigger cart pulse just before tiles arrive
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("cart-icon-pulse"));
      }, 1400);

      // Clean up the effect completely after 2.5 seconds
      setTimeout(() => {
        setActiveEffects((prev) => prev.filter((effect) => effect.id !== effectId));
      }, 2500);
    };

    window.addEventListener("add-to-cart-effect", handleTrigger);
    return () => window.removeEventListener("add-to-cart-effect", handleTrigger);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {activeEffects.map((effect) => (
          <div key={effect.id} className="absolute inset-0">
            {/* Smooth background overlay to darken everything nicely before grid pulls away */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, times: [0, 0.1, 0.4, 1], ease: "easeInOut" }}
              className="absolute inset-0 bg-black/40"
            />

            {/* The scattering full-page grid tiles */}
            {effect.tiles.map((tile) => (
              <motion.div
                key={tile.id}
                initial={{ 
                  opacity: 0, 
                  x: tile.startX, 
                  y: tile.startY, 
                  scale: 1
                }}
                animate={{ 
                  // 0%: Start hidden
                  // 10%: Appear as grid
                  // 40%: Hold position
                  // 100%: Move to cart
                  opacity: [0, 1, 1, 0], 
                  x: [tile.startX, tile.startX, tile.startX, tile.targetX], 
                  y: [tile.startY, tile.startY, tile.startY, tile.targetY], 
                  scale: [1, 1, 1, 0.1]
                }}
                transition={{ 
                  duration: 1.6, 
                  delay: tile.delay,
                  times: [0, 0.1, 0.4, 1], 
                  ease: [0.76, 0, 0.24, 1] // Premium smooth easing
                }}
                className="absolute flex items-center justify-center bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                style={{ 
                  width: tile.width,
                  height: tile.height,
                  transformOrigin: "center",
                  marginLeft: -(tile.width / 2),
                  marginTop: -(tile.height / 2)
                }}
              >
                {/* Subtle inner grid lines for tech feel */}
                <div className="absolute inset-0 border border-white/5 m-2" />
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
