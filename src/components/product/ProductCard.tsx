"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import WishlistButton from "@/components/global/WishlistButton";
import InteractiveButton from "@/components/global/InteractiveButton";
import { triggerAddToCartEffect } from "@/components/global/FullPageCartGridTransition";

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes.length > 0) {
      setIsAdding(true);
      
      setTimeout(() => {
        addItem({
          id: `${product.id}-${product.sizes[0]}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          size: product.sizes[0],
          color: product.colors[0] || "Default",
          quantity: 1,
          image: product.frontImage,
        });
        triggerAddToCartEffect(e);
        setIsAdding(false);
      }, 400); // 400ms morph loading delay
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      role="group"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      data-cursor="view"
      className="group block relative rounded-3xl bg-brand-card border border-brand-border-hairline overflow-hidden transition-all duration-500 hover:border-brand-border-hover focus:outline-none focus:border-white"
      whileHover={{ y: -8, boxShadow: "var(--shadow-hover-card)" }}
    >
      {/* The main click target that covers the card */}
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-10 focus:outline-none">
        <span className="sr-only">View {product.name}</span>
      </Link>
      
      {/* Wishlist Button */}
      <div 
        className="absolute top-4 right-4 z-30 opacity-100 md:opacity-0 md:-translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <WishlistButton productId={product.id} />
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-brand-charcoal-dark">
        {product.isNew && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-graffiti-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest" style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}>
              New Drop
            </div>
          </div>
        )}
        
        {/* Subtle noise layer for placeholder/background */}
        <div className="absolute inset-0 pointer-events-none noise-layer opacity-[0.05]" />
        
        <Image
          src={product.frontImage}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-1000 ${isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100 filter grayscale-[0.2]"}`}
        />
        <Image
          src={product.backImage || product.frontImage}
          alt={`${product.name} back view`}
          fill
          className={`object-cover transition-all duration-1000 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        />
        
        {/* Quick Add overlay */}
        <div 
          className="absolute bottom-4 left-0 w-full px-4 flex justify-center opacity-100 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <InteractiveButton
            variant="primary"
            onClick={handleQuickAdd}
            isLoading={isAdding}
            className="w-full shadow-lg"
          >
            {isAdding ? "Adding..." : "Quick Add"}
          </InteractiveButton>
        </div>
        
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
      </div>
      
      <div className="p-5 flex flex-col relative z-20 bg-brand-card pointer-events-none">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-lg font-medium text-white group-hover:text-brand-soft-white transition-colors transform group-hover:-translate-y-1 duration-300">
            {product.name}
          </h3>
          <span className="font-sans font-medium text-white whitespace-nowrap ml-4 transform group-hover:-translate-y-1 duration-300">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-brand-muted transform group-hover:translate-y-1 transition-transform duration-300">
          <span>{product.category}</span>
          <div className="flex space-x-1">
            {product.sizes.slice(0, 3).map(s => <span key={s} className="text-xs border border-brand-border-hairline px-1.5 py-0.5 rounded">{s}</span>)}
            {product.sizes.length > 3 && <span className="text-xs px-1.5 py-0.5">+{product.sizes.length - 3}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
