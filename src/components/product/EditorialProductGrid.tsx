"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import InteractiveButton from "../global/InteractiveButton";

import { useRouter } from "next/navigation";

interface EditorialProductGridProps {
  products: Product[];
}

export default function EditorialProductGrid({ products }: EditorialProductGridProps) {
  const router = useRouter();
  
  // We'll map the first 5 products into an asymmetric masonry grid
  const items = products.slice(0, 5);

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
      
      {/* 1. Large Feature - Spans 8 cols, 2 rows */}
      {items[0] && (
        <div 
          onClick={() => handleProductClick(items[0].id)}
          onKeyDown={(e) => { if (e.key === "Enter") handleProductClick(items[0].id) }}
          role="button"
          tabIndex={0}
          className="md:col-span-8 row-span-2 group relative rounded-3xl bg-brand-card overflow-hidden border border-brand-border-hairline hover:border-brand-border-strong transition-colors duration-500 focus:outline-none focus:border-white cursor-pointer"
        >
          <Image
            src={items[0].frontImage}
            alt={items[0].name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute bottom-8 left-8 z-20 max-w-lg">
            <span className="px-3 py-1 bg-white/10 backdrop-blur border border-white/20 text-white text-xs tracking-widest uppercase rounded-full mb-4 inline-block">
              {items[0].category}
            </span>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {items[0].name}
            </h3>
            <InteractiveButton 
              variant="secondary" 
              onClick={(e) => { e.stopPropagation(); handleProductClick(items[0].id); }}
            >
              View Drop
            </InteractiveButton>
          </div>
        </div>
      )}

      {/* 2. Tall Side Card - Spans 4 cols, 2 rows */}
      {items[1] && (
        <div 
          onClick={() => handleProductClick(items[1].id)}
          onKeyDown={(e) => { if (e.key === "Enter") handleProductClick(items[1].id) }}
          role="button"
          tabIndex={0}
          className="md:col-span-4 row-span-2 group relative rounded-3xl bg-brand-card overflow-hidden border border-brand-border-hairline hover:border-brand-border-strong transition-colors duration-500 focus:outline-none focus:border-white cursor-pointer"
        >
          <Image
            src={items[1].frontImage}
            alt={items[1].name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-x-6 bottom-8 z-20 flex flex-col items-center text-center">
            <h4 className="font-heading text-2xl font-semibold text-white mb-2">{items[1].name}</h4>
            <span className="text-brand-muted mb-4">₹{items[1].price.toLocaleString("en-IN")}</span>
            <InteractiveButton 
              variant="ghost" 
              className="w-full border border-white/30" 
              onClick={(e) => { e.stopPropagation(); handleProductClick(items[1].id); }}
            >
              Explore
            </InteractiveButton>
          </div>
        </div>
      )}

      {/* 3. Small Square Card - Spans 4 cols, 1 row */}
      {items[2] && (
        <div 
          onClick={() => router.push('/shop')}
          onKeyDown={(e) => { if (e.key === "Enter") router.push('/shop') }}
          role="button"
          tabIndex={0}
          className="md:col-span-4 row-span-1 group relative rounded-3xl bg-[#111] overflow-hidden border border-brand-border-hairline flex items-center justify-center p-6 text-center hover:border-brand-border-strong transition-colors duration-500 focus:outline-none focus:border-white cursor-pointer"
        >
           {/* Placeholder abstract style for variety */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
           <div className="relative z-20 pointer-events-none">
             <h4 className="font-editorial text-2xl italic text-white mb-2">Curated Essentials</h4>
             <p className="text-xs text-brand-muted uppercase tracking-widest">Shop Collection</p>
           </div>
        </div>
      )}

      {/* 4. Wide Card - Spans 8 cols, 1 row */}
      {items[3] && (
        <div 
          onClick={() => handleProductClick(items[3].id)}
          onKeyDown={(e) => { if (e.key === "Enter") handleProductClick(items[3].id) }}
          role="button"
          tabIndex={0}
          className="md:col-span-8 row-span-1 group relative rounded-3xl bg-brand-card overflow-hidden border border-brand-border-hairline hover:border-brand-border-strong transition-colors duration-500 flex flex-col md:flex-row focus:outline-none focus:border-white cursor-pointer"
        >
          <div className="relative w-full md:w-1/2 h-48 md:h-full">
            <Image
              src={items[3].frontImage}
              alt={items[3].name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-center bg-brand-carbon relative z-20 pointer-events-none">
            <h4 className="font-heading text-3xl font-bold text-white mb-2">{items[3].name}</h4>
            <p className="text-brand-muted mb-6">Monochrome focus.</p>
            <InteractiveButton 
              variant="primary" 
              className="self-start text-xs pointer-events-auto" 
              onClick={(e) => { e.stopPropagation(); handleProductClick(items[3].id); }}
            >
              Quick View
            </InteractiveButton>
          </div>
        </div>
      )}

    </div>
  );
}
