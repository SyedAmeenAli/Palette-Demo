import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import LoadingScreen from "@/components/global/LoadingScreen";
import CustomCursor from "@/components/global/CustomCursor";
import PageTransition from "@/components/global/PageTransition";
import FullPageCartGridTransition from "@/components/global/FullPageCartGridTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Pallete | Unisex Premium Clothing",
  description: "Curated silhouettes for modern everyday expression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} antialiased bg-brand-rich-black text-brand-soft-white selection:bg-white selection:text-black`}
      >
        <Toaster 
          position="bottom-right" 
          theme="dark" 
          toastOptions={{ 
            duration: 2000,
            style: { 
              background: 'rgba(17, 17, 17, 0.8)', 
              backdropFilter: 'blur(10px)',
              color: '#fff', 
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              borderRadius: '8px'
            } 
          }} 
        />
        <FullPageCartGridTransition />
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <PageTransition>
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
