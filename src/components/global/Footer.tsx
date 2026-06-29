"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { useAdminStore } from "@/store/adminStore";

export default function Footer() {
  const settings = useAdminStore((state) => state.settings);

  return (
    <footer className="bg-brand-carbon border-t border-brand-border-hairline pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <AnimatedLogo className="mb-6" />
          <p className="text-brand-muted text-lg max-w-sm mb-8 editorial">
            {settings.footerText}
          </p>
          <div className="flex flex-col space-y-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-soft-white hover:text-white transition-colors group w-max">
              Instagram: {settings.instagramHandle}
              <ArrowUpRight size={16} className="ml-1 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
            </a>
            <p className="text-brand-muted">{settings.locationText}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-heading font-medium text-white mb-6">Shop</h4>
          <ul className="space-y-4">
            <li><Link href="/shop?sort=new" className="text-brand-muted hover:text-white transition-colors">New Drops</Link></li>
            <li><Link href="/shop?category=Shirts" className="text-brand-muted hover:text-white transition-colors">Shirts</Link></li>
            <li><Link href="/shop?category=Hoodies" className="text-brand-muted hover:text-white transition-colors">Hoodies</Link></li>
            <li><Link href="/shop?category=Sets" className="text-brand-muted hover:text-white transition-colors">Sets</Link></li>
            <li><Link href="/shop" className="text-brand-muted hover:text-white transition-colors">View All</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-medium text-white mb-6">Brand</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-brand-muted hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/lookbook" className="text-brand-muted hover:text-white transition-colors">Lookbook</Link></li>
            <li><Link href="/contact" className="text-brand-muted hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/shipping" className="text-brand-muted hover:text-white transition-colors">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-border-hairline flex flex-col md:flex-row justify-between items-center text-sm text-brand-disabled">
        <p>&copy; {new Date().getFullYear()} {settings.storeName}. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-brand-muted transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-muted transition-colors">Terms of Service</Link>
          {/* Discreet Admin Login */}
          <Link href="/admin" className="hover:text-white transition-colors ml-4">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
