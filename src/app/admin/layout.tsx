"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import AnimatedLogo from "@/components/global/AnimatedLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-rich-black flex flex-col md:flex-row -mt-[80px]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-carbon border-r border-brand-border-hairline flex-shrink-0 flex flex-col pb-6 relative z-10">
        <div className="flex h-[96px] items-center border-b border-brand-border-hairline px-6 mb-6">
          <Link href="/" className="flex items-center shrink-0 border-none bg-transparent shadow-none">
            <img
              src="/logo/palette-logo.png"
              alt="Palette Lifestyle"
              className="h-[60px] w-auto object-contain bg-transparent border-none shadow-none"
            />
          </Link>
          <span className="ml-3 text-xs text-brand-muted tracking-widest uppercase font-semibold">Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "text-brand-muted hover:bg-brand-card hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-brand-border-hairline">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-brand-muted hover:bg-brand-card hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 pt-24 md:pt-16 z-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
