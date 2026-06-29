"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveButton from "@/components/global/InteractiveButton";
import GlobalTextureLayer from "@/components/global/GlobalTextureLayer";
import GraffitiAccentLayer from "@/components/global/GraffitiAccentLayer";
import ScrollRevealWrapper from "@/components/global/ScrollRevealWrapper";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-rich-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <GlobalTextureLayer opacity={0.05} />
        <GraffitiAccentLayer variant="spray" className="opacity-50" />
        <GraffitiAccentLayer variant="scribble" color="rgba(255,255,255,0.1)" className="w-64 h-64 absolute" />
        
        <ScrollRevealWrapper className="relative z-10 flex flex-col items-center">
          <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">Void</h1>
          <p className="text-brand-disabled text-lg tracking-[0.2em] uppercase font-bold mb-10 border-b border-white/20 pb-4">Your Cart is Empty</p>
          <InteractiveButton onClick={() => window.location.href = "/shop"} className="!py-4 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-gray-200">
            Enter Shop
          </InteractiveButton>
        </ScrollRevealWrapper>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 250; // Free shipping over 5000

  return (
    <div className="min-h-screen bg-brand-rich-black relative">
      <GlobalTextureLayer opacity={0.05} />
      
      <div className="max-w-[1400px] mx-auto px-6 py-32 relative z-10">
        <ScrollRevealWrapper>
          <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-16">Archive</h1>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-6 p-4 rounded-none bg-brand-charcoal-dark border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="relative w-28 h-36 md:w-36 md:h-48 flex-shrink-0 bg-brand-rich-black border border-white/5 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2 relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-2">{item.name}</h3>
                        <p className="text-brand-disabled text-xs font-bold tracking-widest uppercase">Size: {item.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-brand-muted hover:text-graffiti-red transition-colors p-2">
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center space-x-4 border border-white/20 px-4 py-2 bg-black/20">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-brand-muted hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <motion.span 
                          key={item.quantity}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm font-bold w-4 text-center text-white"
                        >
                          {item.quantity}
                        </motion.span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-brand-muted hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-medium tracking-widest text-white text-lg">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 relative">
            <GraffitiAccentLayer variant="spray" color="rgba(255,255,255,0.02)" className="-top-20" />
            
            <ScrollRevealWrapper animation="slide-up">
              <div className="bg-brand-charcoal-dark border border-white/5 p-10 sticky top-32 backdrop-blur-md">
                <h2 className="font-heading text-3xl font-black uppercase tracking-tighter text-white mb-8 border-b border-white/10 pb-6">Summary</h2>
                
                <div className="space-y-6 mb-8 text-sm font-medium tracking-widest">
                  <div className="flex justify-between">
                    <span className="text-brand-muted uppercase">Subtotal</span>
                    <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted uppercase">Shipping</span>
                    <span className="text-white">{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-8 mb-10 flex justify-between items-end">
                  <span className="font-heading font-black text-2xl uppercase text-white">Total</span>
                  <span className="text-3xl font-medium tracking-widest text-white">₹{(subtotal + shipping).toLocaleString("en-IN")}</span>
                </div>
                
                <InteractiveButton className="w-full !py-6 text-sm font-bold tracking-[0.2em] bg-white text-black uppercase hover:bg-gray-200" onClick={() => window.location.href = "/checkout"}>
                  Proceed
                </InteractiveButton>
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
