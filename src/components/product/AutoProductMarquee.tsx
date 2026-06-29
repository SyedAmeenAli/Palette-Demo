"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import InteractiveButton from "@/components/global/InteractiveButton";

interface AutoProductMarqueeProps {
  products: Product[];
}

export default function AutoProductMarquee({ products }: AutoProductMarqueeProps) {
  // To ensure seamless loop, duplicate array twice (3 total)
  const duplicatedProducts = [...products, ...products, ...products];

  // Split into two halves for two rows
  const half = Math.ceil(products.length / 2);
  const row1 = products.slice(0, half);
  const row2 = products.slice(half);

  const loopRow1 = [...row1, ...row1, ...row1];
  const loopRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-24 overflow-hidden border-y border-brand-border-hairline bg-brand-carbon relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-carbon to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-carbon to-transparent z-10 pointer-events-none" />
      
      <div className="text-center mb-16 px-6 relative z-20">
        <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Moving Through The Collection</h2>
        <p className="text-brand-muted editorial text-lg">Explore drops, staples, and statement pieces in motion.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1 - Right to Left */}
        <div 
          className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]"
          data-cursor="drag"
        >
          {loopRow1.map((p, i) => (
            <MarqueeCard key={`${p.id}-${i}`} product={p} />
          ))}
        </div>

        {/* Row 2 - Left to Right */}
        <div 
          className="flex gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused]"
          data-cursor="drag"
        >
          {loopRow2.map((p, i) => (
            <MarqueeCard key={`${p.id}-${i}`} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRouter } from "next/navigation";

function MarqueeCard({ product }: { product: Product }) {
  const router = useRouter();
  
  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleProductClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleProductClick();
      }}
      role="button"
      tabIndex={0}
      className="group relative block w-[280px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#111] flex-shrink-0 border border-brand-border-hairline hover:border-brand-border-strong transition-colors duration-500 focus:outline-none focus:border-white cursor-pointer"
    >
      <Image
        src={product.frontImage}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="font-heading font-semibold text-xl text-white mb-1">{product.name}</h4>
        <div className="flex justify-between items-center text-sm">
          <span className="text-brand-muted">{product.category}</span>
          <span className="text-white font-medium">₹{product.price.toLocaleString("en-IN")}</span>
        </div>
        <div className="mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <InteractiveButton 
            variant="secondary" 
            className="w-full py-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
          >
            View Details
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
}
