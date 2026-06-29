"use client";

interface AnimatedMarqueeTextProps {
  text: string;
  theme?: "dark" | "light";
  className?: string;
  speed?: "fast" | "normal" | "slow";
}

export default function AnimatedMarqueeText({ 
  text, 
  theme = "dark", 
  className = "",
  speed = "normal"
}: AnimatedMarqueeTextProps) {
  
  const speedClass = speed === "fast" ? "duration-[20s]" : speed === "slow" ? "duration-[60s]" : "duration-[40s]";
  const bgClass = theme === "dark" ? "bg-brand-charcoal-dark text-white border-y border-white/10" : "bg-brand-off-white text-black border-y border-black/10";
  
  // Create an array of 4 to ensure seamless looping on ultra-wide screens
  const items = Array(4).fill(text);

  return (
    <div className={`relative w-full overflow-hidden flex items-center py-4 ${bgClass} ${className} group`}>
      <div className={`flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] ${speedClass}`}>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center mx-4">
            <span className="font-heading text-xl md:text-3xl uppercase tracking-widest font-semibold px-4">
              {item}
            </span>
            {/* Dot separator */}
            <span className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-graffiti-red" : "bg-black"} mx-4`} />
          </div>
        ))}
      </div>
    </div>
  );
}
