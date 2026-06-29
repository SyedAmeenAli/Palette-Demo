"use client";

import { useEffect, useState } from "react";

interface GlobalTextureLayerProps {
  theme?: "dark" | "light";
  opacity?: number;
}

export default function GlobalTextureLayer({ theme = "dark", opacity = 0.03 }: GlobalTextureLayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none noise-layer ${
        theme === "dark" ? "mix-blend-screen" : "mix-blend-multiply"
      }`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
