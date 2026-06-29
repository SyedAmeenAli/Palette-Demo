"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/product/ProductCard";
import ScrollRevealWrapper from "@/components/global/ScrollRevealWrapper";
import GlobalTextureLayer from "@/components/global/GlobalTextureLayer";
import GraffitiAccentLayer from "@/components/global/GraffitiAccentLayer";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSort = searchParams.get("sort") || "Newest";

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [sizeFilter, setSizeFilter] = useState("All");

  const products = useProductStore((state) => state.products);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (sizeFilter !== "All") {
      result = result.filter((p) => p.sizes.includes(sizeFilter));
    }

    if (sort === "Newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === "Price Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Price High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "Popular") {
      result.sort((a, b) => b.soldCount - a.soldCount);
    }

    return result;
  }, [products, category, sort, sizeFilter]);

  const categories = ["All", "Shirts", "T-Shirts", "Hoodies", "Jackets", "Sets", "Pants", "Trousers"];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL"];
  const sortOptions = ["Newest", "Popular", "Price Low to High", "Price High to Low"];

  return (
    <div className="min-h-screen bg-brand-rich-black relative">
      <GlobalTextureLayer opacity={0.05} />
      
      {/* Header */}
      <div className="w-full bg-brand-charcoal-light border-b border-white/5 py-24 relative overflow-hidden">
        <GraffitiAccentLayer variant="spray" color="rgba(255,255,255,0.02)" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <ScrollRevealWrapper>
            <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-white">
              Archive <br className="md:hidden" /> Collection
            </h1>
            <p className="text-brand-muted text-lg editorial max-w-2xl mx-auto">
              Unisex essentials, statement layers, and premium everyday pieces crafted for the modern uniform.
            </p>
          </ScrollRevealWrapper>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col xl:flex-row gap-12 relative z-10">
        {/* Filters Sidebar */}
        <ScrollRevealWrapper animation="slide-right" className="w-full xl:w-72 flex-shrink-0 space-y-12">
          
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Category</h3>
            <div className="flex flex-wrap xl:flex-col gap-2 xl:gap-0 xl:space-y-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-left text-sm uppercase tracking-widest transition-all px-4 py-2 xl:px-0 xl:py-2 rounded-full xl:rounded-none border xl:border-none ${
                    category === c 
                      ? "text-black bg-white xl:bg-transparent xl:text-white font-bold xl:border-l-2 xl:border-graffiti-red xl:pl-4" 
                      : "text-brand-muted border-white/10 hover:text-white xl:hover:pl-2"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSizeFilter(s)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                    sizeFilter === s
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "bg-transparent text-brand-muted border-brand-border-strong hover:border-white hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Sort By</h3>
            <div className="flex flex-col space-y-3">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSort(opt)}
                  className={`text-left text-sm uppercase tracking-widest transition-all ${
                    sort === opt ? "text-white font-bold flex items-center before:content-['>'] before:mr-2 before:text-graffiti-red" : "text-brand-muted hover:text-white hover:translate-x-1"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </ScrollRevealWrapper>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-32 text-center flex flex-col items-center justify-center">
              <GraffitiAccentLayer variant="scribble" className="static mb-8 w-24 h-24 mx-auto" />
              <h2 className="text-4xl font-heading font-black uppercase text-white mb-4">Void</h2>
              <p className="text-brand-muted editorial text-lg">No products match your criteria. Try resetting filters.</p>
              <button 
                onClick={() => { setCategory("All"); setSizeFilter("All"); setSort("Newest"); }}
                className="mt-8 px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <ScrollRevealWrapper key={product.id} delay={(i % 3) * 0.1}>
                  <ProductCard product={product} />
                </ScrollRevealWrapper>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white font-heading text-2xl animate-pulse tracking-widest">LOADING...</div>}>
      <ShopContent />
    </Suspense>
  );
}
