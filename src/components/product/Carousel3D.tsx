"use client";

"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

export default function Carousel3D({ products }: { products: Product[] }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const rotationRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const startX = useRef(0);
  const currentRot = useRef(0);
  const containerRef = useRef<HTMLElement>(null);

  // Use the specific 8 cutout products provided
  const displayProducts = useMemo(() => {
    return [
      { id: "palette-cutout-1", slug: "palette-cutout-1", name: "Palette Studded Jersey", category: "T-Shirts", price: 3499, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (10)-Photoroom.png" },
      { id: "palette-cutout-2", slug: "palette-cutout-2", name: "Black Wave Denim Pants", category: "Pants", price: 4999, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (7)-Photoroom.png" },
      { id: "palette-cutout-3", slug: "palette-cutout-3", name: "Washed Grey Denim Pants", category: "Pants", price: 4499, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (5)-Photoroom.png" },
      { id: "palette-cutout-4", slug: "palette-cutout-4", name: "Sand Distressed Pants", category: "Pants", price: 4699, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (6)-Photoroom.png" },
      { id: "palette-cutout-5", slug: "palette-cutout-5", name: "Paint Splash Black Tee", category: "T-Shirts", price: 3299, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (4)-Photoroom.png" },
      { id: "palette-cutout-6", slug: "palette-cutout-6", name: "Astra Grey Tee", category: "T-Shirts", price: 3499, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (9)-Photoroom.png" },
      { id: "palette-cutout-7", slug: "palette-cutout-7", name: "Red Flame Tee", category: "T-Shirts", price: 3499, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292318 (8)-Photoroom.png" },
      { id: "palette-cutout-8", slug: "palette-cutout-8", name: "Graphic Character Tee", category: "T-Shirts", price: 3799, cutoutImage: "/products/cutouts/Remove_the_background_from_this_202606292319-Photoroom.png" },
    ].map((item, index) => {
      const realProduct = products[index % (products.length || 1)];
      return { ...item, realId: realProduct ? realProduct.id : item.id, slug: realProduct ? realProduct.slug : item.slug };
    });
  }, [products]);

  const total = displayProducts.length;
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 420;

  // Intersection Observer for performance pausing
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Highly optimized animation loop
  useEffect(() => {
    const animate = () => {
      if (isVisible) {
        if (!isHovered && !isDragging) {
          rotationRef.current -= 0.15; // Slow, smooth auto-rotation
        }
        
        // Direct DOM update (no React re-renders)
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `translateZ(-${radius}px) rotateY(${rotationRef.current}deg)`;
        }

        // Calculate active index for React state (only updates when it changes)
        const normalized = ((rotationRef.current % 360) + 360) % 360;
        const newActive = Math.round((360 - normalized) / (360 / total)) % total;
        
        if (newActive !== activeIndex) {
          setActiveIndex(newActive);
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isHovered, isDragging, isVisible, activeIndex, total, radius]);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    currentRot.current = rotationRef.current;
    if (wrapperRef.current) wrapperRef.current.style.transition = 'none'; // Instant drag
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX.current;
    rotationRef.current = currentRot.current + diff * 0.4;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Button handlers (smooth jump)
  const rotateBy = (deg: number) => {
    rotationRef.current += deg;
    // We let the rAF loop pick it up immediately
  };

  return (
    <>
      <section ref={containerRef} className="relative w-full h-full text-white bg-transparent">
      {/* 1. Perspective floor grid (lightweight) */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none opacity-20 perspective-grid mix-blend-screen" />
      
      {/* 2. Soft radial spotlight (reactive) */}
      <div className="absolute inset-0 pointer-events-none reactive-spotlight opacity-40 mix-blend-screen" />

      {/* 3. Side light streaks for runway depth */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/[0.03] to-transparent pointer-events-none transform -skew-x-12" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none transform skew-x-12" />

      {/* 4. Noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen noise-layer" />

      {/* 3D Carousel Container */}
      <div 
        className="relative z-10 w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing pb-10 md:pb-0"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: "1000px" }}
      >
        <div 
          ref={wrapperRef}
          className="relative w-full flex-1 flex items-center justify-center transform-gpu will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {displayProducts.map((product, i) => {
            const angle = (i * 360) / total;
            
            // Calculate distance in indices (0 = active, 1 = side, 2 = far side, etc.)
            let distIndex = Math.abs(i - activeIndex);
            if (distIndex > total / 2) distIndex = total - distIndex;
            
            const isActive = distIndex === 0;
            const isVisible = distIndex <= 2; // Only render front 5 items
            
            // Performance: completely hide far items to reduce rendering cost
            if (!isVisible) {
              return (
                <div 
                  key={product.id} 
                  className="absolute hidden" 
                  style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }} 
                />
              );
            }

            // Determine styles based on distance
            let opacityClass = "opacity-0";
            let scaleClass = "scale-75";
            let blurClass = "blur-md";
            
            if (isActive) {
              opacityClass = "opacity-100";
              scaleClass = "scale-100";
              blurClass = "blur-0";
            } else if (distIndex === 1) {
              opacityClass = "opacity-60";
              scaleClass = "scale-90";
              blurClass = "blur-sm";
            } else if (distIndex === 2) {
              opacityClass = "opacity-20";
              scaleClass = "scale-75";
              blurClass = "blur-md";
            }

            return (
              <div 
                key={product.id}
                className={`absolute flex flex-col items-center justify-center transition-all duration-500 transform-gpu will-change-transform ${isActive ? 'pointer-events-auto z-50' : 'pointer-events-none z-0'} ${opacityClass}`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div 
                  className="relative group flex items-center justify-center"
                  onClick={(e) => {
                    if (isDragging || !isActive) return;
                    e.stopPropagation();
                    router.push(`/product/${product.realId}`);
                  }}
                >
                  <Image
                    src={product.cutoutImage || ""}
                    alt={product.name}
                    width={480}
                    height={580}
                    priority={isActive} // Only prioritize the active image
                    sizes="(max-width: 768px) 300px, 480px"
                    className={`w-auto object-contain transition-all duration-500 transform-gpu group-hover:scale-[1.04] ${scaleClass} ${blurClass} drop-shadow-[0_25px_45px_rgba(255,255,255,0.10)]`}
                    style={{
                      height: isActive ? 'min(480px, 50vh)' : 'min(300px, 35vh)'
                    }}
                    draggable={false}
                  />
                </div>

                {/* Product Info - Positioned cleanly below the image area */}
                <div 
                  className={`absolute -bottom-24 w-64 text-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base font-semibold text-white mb-1 whitespace-nowrap overflow-hidden text-ellipsis px-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-3">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  
                  <button 
                    onClick={(e) => {
                      if (isDragging || !isActive) return;
                      e.stopPropagation();
                      router.push(`/product/${product.realId}`);
                    }}
                    className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-widest text-white hover:bg-white/15 transition-colors"
                  >
                    View Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Floating Controls Desktop */}
        <button 
          className="hidden md:flex absolute left-8 top-1/2 z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"
          onClick={() => rotateBy(360/total)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <button 
          className="hidden md:flex absolute right-8 top-1/2 z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"
          onClick={() => rotateBy(-360/total)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      </section>

      {/* Floating Controls Mobile (Completely separated from carousel section) */}
      <div className="md:hidden mt-8 flex items-center justify-center gap-8 z-20 pointer-events-auto">
        <button 
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"
          onClick={() => rotateBy(360/total)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <button 
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"
          onClick={() => rotateBy(-360/total)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

    </>
  );
}
