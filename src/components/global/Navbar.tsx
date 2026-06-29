"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence, useAnimation, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const navLinks = [
  { name: "New Drops", href: "/shop?sort=new" },
  { name: "Shirts", href: "/shop?category=Shirts" },
  { name: "T-Shirts", href: "/shop?category=T-Shirts" },
  { name: "Hoodies", href: "/shop?category=Hoodies" },
  { name: "Jackets", href: "/shop?category=Jackets" },
  { name: "Sets", href: "/shop?category=Sets" },
  { name: "Pants", href: "/shop?category=Pants" },
  { name: "Trousers", href: "/shop?category=Trousers" },
  { name: "Lookbook", href: "/lookbook" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Smooth scroll blending values
  const bgOpacity = useTransform(scrollY, [0, 150], [0, 0.75]);
  const backgroundColor = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;
  
  const blurValue = useTransform(scrollY, [0, 150], [0, 16]);
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;
  
  const borderOpacity = useTransform(scrollY, [0, 150], [0, 0.1]);
  const borderBottomColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;

  useEffect(() => {
    const handleCartPulse = () => {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.4, ease: "easeOut" }
      });
    };

    window.addEventListener("cart-icon-pulse", handleCartPulse);
    return () => {
      window.removeEventListener("cart-icon-pulse", handleCartPulse);
    };
  }, [controls]);

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          borderBottomWidth: "1px",
          borderBottomColor,
          borderBottomStyle: "solid",
        }}
        className="fixed top-0 left-0 w-full z-50 h-[80px] md:h-[96px] flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex-shrink-0">
            <AnimatedLogo />
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-muted hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-5">
            <motion.button 
              className="text-brand-soft-white hover:text-white transition-colors hidden sm:block"
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/shop')}
            >
              <Search size={20} />
            </motion.button>
            <motion.div id="global-cart-icon" animate={controls} whileTap={{ scale: 0.9 }}>
              <Link href="/cart" className="relative text-brand-soft-white hover:text-white transition-colors block">
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount} // Re-animates when count changes
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-2 -right-2 bg-graffiti-red text-white text-[10px] font-bold min-w-4 h-4 px-1 flex items-center justify-center rounded-none"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
            <button
              className="lg:hidden text-brand-soft-white hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-brand-carbon flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-border-hairline">
              <AnimatedLogo />
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-heading font-medium text-white hover:text-accent-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="p-8 border-t border-brand-border-hairline">
              <p className="text-brand-muted text-sm mb-4">Instagram: @palette.lifestyle_</p>
              <div className="flex space-x-4">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm underline">About Us</Link>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm text-brand-disabled">Admin Login</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
