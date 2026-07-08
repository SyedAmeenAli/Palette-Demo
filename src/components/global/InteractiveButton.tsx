"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "admin";

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDrag" | "onDragStart" | "onDragEnd"
>;

interface InteractiveButtonProps extends NativeButtonProps {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function InteractiveButton({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  leftIcon,
  rightIcon,
  onClick,
  ...props
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Magnetic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  
  // Text movement values
  const textX = useTransform(springX, [-20, 20], [-5, 5]);
  const textY = useTransform(springY, [-20, 20], [-5, 5]);

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || props.disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.disabled || isLoading) return;
    
    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;
    
    const newRipple = { x: rippleX, y: rippleY, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const variants = {
    primary: "bg-white text-black border border-white hover:border-brand-soft-white group",
    secondary: "bg-black/50 backdrop-blur-md text-white border border-brand-border-strong hover:border-white hover:bg-white hover:text-black group",
    ghost: "bg-transparent text-white hover:bg-white/10 border border-transparent group",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white group",
    admin: "bg-brand-card text-white border border-brand-border-strong hover:border-brand-soft-white group",
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={!props.disabled ? { scale: 1.03 } : {}}
      whileTap={!props.disabled ? { scale: 0.96 } : {}}
      data-cursor="button"
      className={`relative overflow-hidden flex items-center justify-center rounded-full font-sans font-semibold text-sm tracking-wide transition-colors duration-300 ${variants[variant]} ${
        props.disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      {...props}
    >
      {/* Dynamic Background Fill */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-brand-soft-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
      )}
      
      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "200%",
            paddingBottom: "200%",
            transform: "translate(-50%, -50%) scale(0)",
          }}
        />
      ))}

      <motion.span 
        style={{ x: textX, y: textY }}
        className="relative z-20 flex items-center gap-2 px-6 py-3"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="transform group-hover:-translate-x-1 transition-transform">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="transform group-hover:translate-x-1 transition-transform">{rightIcon}</span>}
          </>
        )}
      </motion.span>
    </motion.button>
  );
}
