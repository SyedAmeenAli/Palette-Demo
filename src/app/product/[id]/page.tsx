"use client";

import { useState, use, useEffect } from "react";
import { notFound } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import FlipViewer from "@/components/product/FlipViewer";
import InteractiveButton from "@/components/global/InteractiveButton";
import WishlistButton from "@/components/global/WishlistButton";
import ProductCard from "@/components/product/ProductCard";
import Accordion from "@/components/global/Accordion";
import { triggerAddToCartEffect } from "@/components/global/FullPageCartGridTransition";
import { toast } from "sonner";
import GlobalTextureLayer from "@/components/global/GlobalTextureLayer";
import GraffitiAccentLayer from "@/components/global/GraffitiAccentLayer";
import ReactiveSectionGlow from "@/components/global/ReactiveSectionGlow";
import StickerBadge from "@/components/global/StickerBadge";
import ScrollRevealWrapper from "@/components/global/ScrollRevealWrapper";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const products = useProductStore((state) => state.products);
  const trackView = useProductStore((state) => state.trackView);
  const addItem = useCartStore((state) => state.addItem);
  
  const product = products.find((p) => p.id === resolvedParams.id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (resolvedParams.id) {
      trackView(resolvedParams.id);
    }
  }, [resolvedParams.id, trackView]);

  if (!product) return notFound();

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!selectedSize) {
      toast.error("Select a size", { description: "Please select a size before adding to cart." });
      return;
    }

    setIsAdding(true);
    
    setTimeout(() => {
      addItem({
        id: `${product.id}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: product.colors[0] || "Default",
        quantity: 1,
        image: product.frontImage,
      });
      
      triggerAddToCartEffect(e);
      toast.success("Added to cart", { description: `${product.name} - Size ${selectedSize}` });
      setIsAdding(false);
    }, 400);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-brand-rich-black relative">
      <GlobalTextureLayer opacity={0.06} />
      
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 relative">
          {/* Left: Images */}
          <div className="lg:col-span-7 space-y-8 relative">
            <ReactiveSectionGlow className="relative w-full aspect-[4/5] bg-brand-charcoal-dark overflow-hidden rounded-none border border-white/5 p-4 md:p-12">
              <GraffitiAccentLayer variant="spray" color="rgba(255,255,255,0.03)" />
              {product.isNew && <StickerBadge text="NEW DROP" rotation={-4} className="top-8 left-8" />}
              <FlipViewer frontImage={product.frontImage} backImage={product.backImage} name={product.name} />
            </ReactiveSectionGlow>

            <div className="grid grid-cols-2 gap-4">
              <ScrollRevealWrapper animation="slide-up">
                <div className="aspect-[4/5] bg-brand-charcoal-dark overflow-hidden relative group border border-white/5" data-cursor="view">
                   <img src={product.backImage || product.frontImage} alt="Detail view" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                </div>
              </ScrollRevealWrapper>
              <ScrollRevealWrapper animation="slide-up" delay={0.2}>
                <div className="aspect-[4/5] bg-brand-charcoal-dark overflow-hidden relative group border border-white/5" data-cursor="view">
                   <img src={product.frontImage} alt="Detail view 2" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0" />
                </div>
              </ScrollRevealWrapper>
            </div>
          </div>

          {/* Right: Product Details (Sticky) */}
          <div className="lg:col-span-5 relative">
            <GraffitiAccentLayer variant="tape" className="-top-8 right-10" />
            
            <div className="sticky top-28 bg-brand-rich-black/80 backdrop-blur-xl z-20 pb-10 pt-4 px-6 border-l border-white/10 -ml-6 border-b border-r">
              <ScrollRevealWrapper>
                <div className="mb-10 relative">
                  <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 leading-[0.9]">
                    {product.name}
                  </h1>
                  <GraffitiAccentLayer variant="stroke" color="#EF233C" className="-bottom-2 w-1/2 left-0" />
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-muted">{product.category}</p>
                    <p className="text-3xl font-medium text-white tracking-widest">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="mb-12">
                  <p className="text-brand-disabled editorial text-xl leading-relaxed italic border-l-2 border-white/20 pl-4">{product.description}</p>
                </div>

                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-heading font-bold tracking-[0.2em] text-xs uppercase text-white">Select Size</span>
                    <button className="text-[10px] font-bold tracking-widest uppercase text-brand-muted hover:text-white border-b border-brand-muted hover:border-white transition-all pb-1">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative overflow-hidden px-6 py-3 font-bold text-sm tracking-widest transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            : "bg-brand-charcoal-dark text-brand-soft-white border border-white/10 hover:border-white/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 mb-16 relative">
                  <InteractiveButton 
                    onClick={handleAddToCart} 
                    isLoading={isAdding} 
                    className="flex-1 !py-6 text-sm font-bold uppercase tracking-[0.2em] bg-white text-black border-none hover:bg-gray-200"
                  >
                    {isAdding ? "Adding..." : "Add To Cart"}
                  </InteractiveButton>
                  <WishlistButton productId={product.id} className="w-[72px] h-[72px] bg-brand-charcoal-dark border-white/10 hover:border-white flex-shrink-0" />
                </div>

                <div className="border-t border-white/10 pt-8 space-y-2">
                  <Accordion title="Material & Care" content={product.material + " " + product.care} defaultOpen={true} />
                  <Accordion title="Fit Details" content={product.fit} />
                  <Accordion title="Shipping & Returns" content="Free express shipping on orders over ₹5,000. Easy 14-day returns." />
                </div>
              </ScrollRevealWrapper>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-32 pb-20 border-t border-white/10 relative">
            <GraffitiAccentLayer variant="spray" className="top-20 left-10" />
            <ScrollRevealWrapper className="flex justify-between items-end mb-16">
               <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                 Related <br className="hidden md:block"/> Pieces
               </h2>
            </ScrollRevealWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ScrollRevealWrapper key={p.id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </ScrollRevealWrapper>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
