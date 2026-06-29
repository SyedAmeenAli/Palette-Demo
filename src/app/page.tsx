"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import InteractiveButton from "@/components/global/InteractiveButton";
import ProductCard from "@/components/product/ProductCard";
import Carousel3D from "@/components/product/Carousel3D";
import AutoProductMarquee from "@/components/product/AutoProductMarquee";
import EditorialProductGrid from "@/components/product/EditorialProductGrid";

import ReactiveSectionGlow from "@/components/global/ReactiveSectionGlow";
import GlobalTextureLayer from "@/components/global/GlobalTextureLayer";
import GraffitiAccentLayer from "@/components/global/GraffitiAccentLayer";
import AnimatedMarqueeText from "@/components/global/AnimatedMarqueeText";
import ScrollRevealWrapper from "@/components/global/ScrollRevealWrapper";
import StickerBadge from "@/components/global/StickerBadge";

import { useProductStore } from "@/store/productStore";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const products = useProductStore((state) => state.products);
  const newDrops = products.filter((p) => p.isNew).slice(0, 8);
  const { scrollYProgress } = useScroll();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // GSAP Scroll Animations
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });

    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50 mix-blend-difference"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <ReactiveSectionGlow 
        className="relative h-screen w-full flex items-center justify-center -mt-[80px]"
        innerClassName="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        <GlobalTextureLayer opacity={0.06} />
        <GraffitiAccentLayer variant="spray" color="rgba(255,255,255,0.03)" />
        
        {/* Background Video / Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-rich-black/20 to-brand-rich-black z-10" />
          
          <video
            ref={videoRef}
            className="hidden md:block w-full h-full object-cover pointer-events-none opacity-80"
            autoPlay muted loop playsInline preload="metadata" poster="/logo/palette-logo.png" 
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="block md:hidden w-full h-full bg-[url('/logo/palette-logo.png')] bg-cover bg-center bg-no-repeat opacity-60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 pt-24 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <StickerBadge text="Unisex Streetwear" rotation={-2} className="relative !top-0 !left-0 mx-auto w-fit" />
          </motion.div>
          
          <h1 className="font-heading font-black text-7xl md:text-[160px] leading-[0.85] tracking-tighter mb-8 flex flex-col items-center uppercase">
            <ScrollRevealWrapper animation="slide-up" delay={0.6}>
              <span className="inline-block relative">
                PALETTE
                <GraffitiAccentLayer variant="stroke" color="#EF233C" className="bottom-0 w-[110%] -left-[5%]" />
              </span>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper animation="slide-up" delay={0.8}>
              <span className="inline-block text-transparent stroke-text" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>
                LIFESTYLE
              </span>
            </ScrollRevealWrapper>
          </h1>

          <ScrollRevealWrapper animation="fade" delay={1.2}>
            <p className="text-xl md:text-3xl text-brand-soft-white max-w-3xl mx-auto mb-12 editorial font-light tracking-wide">
              Curated silhouettes for modern expression. <br className="hidden md:block" /> 
              A monochrome universe of elevated streetwear.
            </p>
          </ScrollRevealWrapper>

          <ScrollRevealWrapper animation="slide-up" delay={1.4}>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <InteractiveButton onClick={() => window.location.href = "/shop?sort=new"} className="!px-10 !py-4 text-sm tracking-widest bg-white text-black hover:bg-white/90">
                SHOP NEW DROPS
              </InteractiveButton>
            </div>
          </ScrollRevealWrapper>
        </div>
      </ReactiveSectionGlow>

      {/* Marquee Banner */}
      <AnimatedMarqueeText text="PALETTE LIFESTYLE — CURATED FITS — STREETWEAR ENERGY — MONOCHROME MOOD —" speed="fast" />

      {/* Editorial Split Section */}
      <section className="relative w-full flex flex-col md:flex-row min-h-[70vh] bg-brand-charcoal-dark overflow-hidden">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-brand-off-white text-brand-rich-black relative">
          <GlobalTextureLayer theme="light" opacity={0.06} />
          <GraffitiAccentLayer variant="scribble" color="rgba(0,0,0,0.05)" className="top-10 left-10" />
          
          <ScrollRevealWrapper>
            <h2 className="font-heading text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              Not Just <br/> Clothes. <br/> A Visual <br/> Language.
            </h2>
            <p className="text-lg editorial max-w-md text-brand-disabled mb-8">
              We design uniforms for the creatives, the night owls, and the disruptors. Every stitch is a statement.
            </p>
            <Link href="/about" className="text-sm font-bold tracking-widest border-b-2 border-brand-rich-black pb-1 hover:text-graffiti-red transition-colors inline-block w-fit">
              READ OUR STORY
            </Link>
          </ScrollRevealWrapper>
        </div>
        
        <div className="w-full md:w-1/2 min-h-[50vh] relative bg-brand-charcoal-light flex items-center justify-center p-12">
          <GlobalTextureLayer opacity={0.04} />
          <ScrollRevealWrapper animation="scale" className="w-full h-full relative group">
            {products.length > 0 && (
              <div className="w-full h-full relative aspect-[3/4] overflow-hidden" data-cursor="view">
                <Image 
                  src={products[0].frontImage} 
                  alt={products[0].name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                <StickerBadge text="LIMITED" rotation={4} className="top-6 right-6" />
              </div>
            )}
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <section className="relative overflow-hidden bg-brand-charcoal-dark py-24 text-white border-y border-white/5">
        <GlobalTextureLayer opacity={0.05} />
        
        <div className="relative z-20 mb-10 text-center px-6">
          <ScrollRevealWrapper>
            <h2 className="font-heading text-5xl md:text-8xl font-black tracking-tighter text-white mb-4 uppercase">
              Rotate The Fit
            </h2>
            <p className="text-white/40 tracking-widest text-xs uppercase font-semibold">Interactive Showroom</p>
          </ScrollRevealWrapper>
        </div>
        
        <div className="relative z-10 mx-auto flex min-h-[540px] items-center justify-center overflow-visible md:min-h-[620px]">
          <Carousel3D products={products} />
        </div>
      </section>

      {/* New Drops Section */}
      <section className="relative py-32 px-6 max-w-[1400px] mx-auto">
        <GraffitiAccentLayer variant="spray" className="right-0 top-0" color="rgba(239,35,60,0.03)" />
        
        <ScrollRevealWrapper className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl relative">
            <StickerBadge text="Drop 01" rotation={-2} className="-top-8 -left-4" />
            <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">New <br className="hidden md:block"/> Drops</h2>
          </div>
          <Link href="/shop?sort=new" className="hidden md:inline-flex mt-6 group items-center text-xs font-bold tracking-[0.2em] hover:text-white transition-colors uppercase border-b border-white/20 pb-2">
            View All Collection
          </Link>
        </ScrollRevealWrapper>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {newDrops.map((product, i) => (
            <ScrollRevealWrapper 
              key={product.id} 
              delay={i * 0.1} 
              className={`${i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-2 xl:col-span-2 md:row-span-2' : ''}`}
            >
              <ProductCard product={product} />
            </ScrollRevealWrapper>
          ))}
        </div>
      </section>

      {/* Auto Product Marquee */}
      <AutoProductMarquee products={products} />

      {/* Categories Grid */}
      <section className="relative py-32 bg-brand-charcoal-light border-y border-white/5 overflow-hidden">
        <GlobalTextureLayer opacity={0.06} />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <ScrollRevealWrapper className="mb-20">
            <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-center">Shop <br className="md:hidden"/> The Form</h2>
          </ScrollRevealWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Shirts",
                image: "/categories/Premium_fashion_category_image_for_202606300111 (6).jpeg",
              },
              {
                name: "T-Shirts",
                image: "/categories/Premium_fashion_category_image_for_202606300111 (1).jpeg",
              },
              {
                name: "Hoodies",
                image: "/categories/Premium_fashion_category_image_for_202606300111 (2).jpeg",
              },
              {
                name: "Jackets",
                image: "/categories/Premium_fashion_category_image_for_202606300111 (3).jpeg",
              },
              {
                name: "Sets",
                image: "/categories/Premium_fashion_category_image_for_202606300111 (4).jpeg",
              },
              {
                name: "Trousers",
                image: "/categories/Premium_fashion_category_image_for_202606300111 (5).jpeg",
              },
            ].map((cat, i) => (
              <ScrollRevealWrapper key={cat.name} delay={i * 0.1} className={`${i === 0 || i === 3 ? 'md:col-span-2' : ''}`}>
                <Link 
                  href={`/shop?category=${cat.name}`} 
                  className="group relative block h-[300px] md:h-[400px] overflow-hidden bg-brand-charcoal-dark border border-white/10"
                  data-cursor="view"
                >
                  <Image 
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <GlobalTextureLayer opacity={0.08} />
                  {/* Decorative number */}
                  <span className="absolute top-6 left-6 text-[10px] font-bold text-white/50 tracking-widest z-20 mix-blend-difference drop-shadow-md">0{i + 1} //</span>
                  
                  {/* Title overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-20 bg-black/45 group-hover:bg-black/25 transition-colors duration-500 p-8">
                    <h3 className="font-heading text-5xl md:text-6xl font-black uppercase text-white mb-2 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Preview */}
      <section className="relative py-40 px-6 max-w-7xl mx-auto overflow-hidden">
        <ScrollRevealWrapper className="text-center mb-16">
          <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter">Styled In <br/> Motion</h2>
        </ScrollRevealWrapper>
        <EditorialProductGrid products={products} />
      </section>

    </div>
  );
}
