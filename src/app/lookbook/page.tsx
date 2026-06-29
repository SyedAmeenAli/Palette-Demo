"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import InteractiveButton from "@/components/global/InteractiveButton";
import LookbookFluidInteraction from "@/components/lookbook/LookbookFluidInteraction";
import GlobalTextureLayer from "@/components/global/GlobalTextureLayer";
import GraffitiAccentLayer from "@/components/global/GraffitiAccentLayer";
import StickerBadge from "@/components/global/StickerBadge";
import ScrollRevealWrapper from "@/components/global/ScrollRevealWrapper";

const looks = [
  { id: 1, name: "Monochrome Layering", image: "/products/product-1-front.jpg" },
  { id: 2, name: "Street In Silence", image: "/products/product-2-front.jpg" },
  { id: 3, name: "Everyday Noir", image: "/products/product-3-front.jpg" },
  { id: 4, name: "White Room Fit", image: "/products/product-4-front.jpg" },
  { id: 5, name: "Campus Minimal", image: "/products/product-5-front.jpg" },
  { id: 6, name: "Night Walk", image: "/products/product-6-front.jpg" },
  { id: 7, name: "Oversized Balance", image: "/products/product-7-front.jpg" },
  { id: 8, name: "Soft Contrast", image: "/products/product-8-front.jpg" },
];

export default function LookbookPage() {
  const router = useRouter();
  
  return (
    <div className="w-full bg-brand-off-white text-brand-rich-black min-h-screen relative overflow-hidden pb-32">
      <GlobalTextureLayer theme="light" opacity={0.07} />
      <GraffitiAccentLayer variant="spray" color="rgba(0,0,0,0.02)" className="top-[20%] left-0" />
      <GraffitiAccentLayer variant="spray" color="rgba(0,0,0,0.02)" className="bottom-[20%] right-0" />
      
      <LookbookFluidInteraction />

      <div className="max-w-[1400px] mx-auto px-6 py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 relative">
          
          {/* Loop over looks with dramatic offset layout */}
          {looks.map((look, i) => {
            // Create a randomized but controlled asymmetrical layout
            let colSpanClass = "md:col-span-6 lg:col-span-5";
            let colStartClass = i % 2 === 0 ? "md:col-start-1 lg:col-start-2" : "md:col-start-6 lg:col-start-7";
            let mtClass = i % 2 !== 0 ? "md:mt-32" : "";
            let rotateClass = i % 3 === 0 ? "rotate-2" : i % 2 === 0 ? "-rotate-2" : "rotate-1";

            return (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative group ${colSpanClass} ${colStartClass} ${mtClass} transform ${rotateClass} hover:rotate-0 transition-transform duration-700`}
              >
                <div 
                  className="relative aspect-[3/4] w-full cursor-pointer focus:outline-none bg-brand-charcoal-light shadow-2xl overflow-hidden"
                  onClick={() => router.push("/shop")}
                  data-cursor="view"
                >
                  <img src={look.image} alt={look.name} className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0" />
                  
                  {/* Subtle noise layer on images */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
                  
                  {i % 4 === 0 && (
                    <StickerBadge text={`ARCHIVE ${i+1}`} rotation={-5} className="top-8 -left-4 shadow-xl" />
                  )}
                  {i % 3 === 0 && (
                    <StickerBadge text="F/W CAMPAIGN" rotation={3} className="bottom-8 -right-4 shadow-xl bg-graffiti-red text-white" />
                  )}
                </div>

                <div className="mt-6 flex flex-col items-start px-2">
                  <h3 className="font-heading text-4xl font-black uppercase tracking-tighter text-black mb-2">{look.name}</h3>
                  <p className="text-sm font-semibold tracking-widest text-brand-disabled uppercase mb-4 border-b border-black/20 pb-2 w-full">Look {String(i+1).padStart(2, '0')}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
