"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center"
      >
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white mb-10">Our Philosophy</h1>
        <p className="text-xl md:text-3xl text-brand-soft-white editorial leading-relaxed">
          "The Pallete is a unisex clothing label curating modern everyday fits with a clean, bold, and confident style language. Built around monochrome tones, sharp silhouettes, and versatile pieces, The Pallete creates clothing that moves across college, street, work, evenings, and everyday life."
        </p>
      </motion.div>

      <div className="space-y-32">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="aspect-square bg-[#111] rounded-3xl overflow-hidden border border-brand-border-hairline relative">
             <img src="/products/product-1-back.jpg" alt="Our Approach" className="object-cover w-full h-full grayscale opacity-80" />
          </div>
          <div>
            <h2 className="font-heading text-4xl font-semibold text-white mb-6">Our Approach</h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              We design with intention. Every piece is crafted to transcend seasons, offering premium comfort without compromising on structural presence. Our unisex approach ensures that fit and form are universal.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1">
            <h2 className="font-heading text-4xl font-semibold text-white mb-6">Why Monochrome</h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              Black and white are not limitations; they are a canvas. Monochrome styling allows the focus to shift towards silhouette, texture, and movement. It is effortless, powerful, and always relevant.
            </p>
          </div>
          <div className="order-1 md:order-2 aspect-square bg-[#111] rounded-3xl overflow-hidden border border-brand-border-hairline relative">
             <img src="/products/product-10-front.jpg" alt="Monochrome" className="object-cover w-full h-full grayscale opacity-80" />
          </div>
        </motion.section>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-32 pt-16 border-t border-brand-border-hairline text-center"
      >
        <p className="font-heading text-xl uppercase tracking-widest text-brand-muted mb-2">Based in</p>
        <h3 className="font-heading text-4xl text-white">Guntur | Hyderabad</h3>
      </motion.div>
    </div>
  );
}
