"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAdminStore } from "@/store/adminStore";
import { useProductStore } from "@/store/productStore";
import InteractiveButton from "@/components/global/InteractiveButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, Banknote, Landmark } from "lucide-react";

const InputField = ({ label, name, type = "text", value, onChange, required = true, placeholder = "" }: any) => (
  <div className="relative group">
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#111] border border-brand-border-strong rounded-xl px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-white focus:bg-[#151515] transition-all peer"
    />
    <label
      htmlFor={name}
      className="absolute left-4 top-2 text-[10px] uppercase tracking-widest text-brand-muted peer-focus:text-white transition-colors"
    >
      {label}
    </label>
    <div className="absolute inset-0 rounded-xl border border-white/0 peer-focus:border-white/20 peer-focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] pointer-events-none transition-all duration-500" />
  </div>
);

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const addOrder = useAdminStore((state) => state.addOrder);
  const trackSale = useProductStore((state) => state.trackSale);
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Card"
  });

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Success burst animation */}
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 1] }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-8 text-white relative"
        >
          <div className="absolute inset-0 bg-white blur-[100px] opacity-30 rounded-full" />
          <CheckCircle2 size={100} className="relative z-10" />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Order Placed</h1>
          <p className="text-brand-muted text-xl md:text-2xl editorial mb-12">Your fit is being prepared.</p>
          <InteractiveButton variant="primary" className="px-10 py-4 text-base" onClick={() => window.location.href = "/shop"}>
            Continue Shopping
          </InteractiveButton>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-heading text-3xl font-medium mb-6">Your cart is empty</h1>
        <InteractiveButton variant="ghost" onClick={() => window.location.href = "/shop"}>
          Return to Shop
        </InteractiveButton>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        items: [...items],
        subtotal,
        shipping,
        total,
        status: "Pending" as const,
        createdAt: new Date().toISOString()
      };

      addOrder(newOrder);
      items.forEach(item => trackSale(item.productId, item.quantity));
      clearCart();
      setIsSuccess(true);
    }, 1500); // Fake delay for animation
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setPayment = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-white mb-16">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center space-x-4 mb-6 border-b border-brand-border-hairline pb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-bold">1</span>
                <h2 className="font-heading text-2xl font-medium text-white">Contact Details</h2>
              </div>
              <div className="space-y-4">
                <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="flex items-center space-x-4 mb-6 border-b border-brand-border-hairline pb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-bold">2</span>
                <h2 className="font-heading text-2xl font-medium text-white">Delivery Address</h2>
              </div>
              <div className="space-y-4">
                <InputField label="Complete Address" name="address" value={formData.address} onChange={handleInputChange} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
                  <InputField label="State" name="state" value={formData.state} onChange={handleInputChange} />
                  <InputField label="PIN Code" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="flex items-center space-x-4 mb-6 border-b border-brand-border-hairline pb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-bold">3</span>
                <h2 className="font-heading text-2xl font-medium text-white">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "Card", icon: CreditCard, label: "Card" },
                  { id: "UPI", icon: Landmark, label: "UPI" },
                  { id: "Cash on Delivery", icon: Banknote, label: "COD" }
                ].map((method) => {
                  const isActive = formData.paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPayment(method.id)}
                      className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
                        isActive 
                          ? "bg-white text-black border-white scale-[1.02] shadow-[0_10px_30px_rgba(255,255,255,0.1)]" 
                          : "bg-[#111] text-brand-muted border-brand-border-hairline hover:border-brand-border-strong hover:text-white"
                      }`}
                    >
                      <method.icon size={24} className="mb-3" />
                      <span className="font-semibold text-sm">{method.label}</span>
                      {isActive && (
                        <motion.div layoutId="payment-active" className="absolute inset-0 rounded-2xl border-2 border-white pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
            
            <div className="pt-8">
              <InteractiveButton type="submit" isLoading={isSubmitting} className="w-full text-lg py-5 tracking-widest">
                {isSubmitting ? "Processing..." : "Place Order"}
              </InteractiveButton>
            </div>
          </form>
        </div>

        {/* Order Summary Sticky */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 bg-brand-carbon border border-brand-border-hairline rounded-[2rem] p-8 md:p-10 shadow-2xl">
            <h2 className="font-heading text-2xl font-medium text-white mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-20 h-24 rounded-lg bg-[#111] relative overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-white font-medium mb-1 line-clamp-1">{item.name}</h4>
                    <p className="text-brand-muted text-sm mb-2">Size: {item.size} • Qty: {item.quantity}</p>
                    <p className="text-white font-semibold tracking-wide">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-sm mb-6 border-t border-brand-border-hairline pt-8">
              <div className="flex justify-between">
                <span className="text-brand-muted uppercase tracking-widest text-xs font-semibold">Subtotal</span>
                <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted uppercase tracking-widest text-xs font-semibold">Shipping</span>
                <span className="text-white">{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
              </div>
            </div>
            
            <div className="border-t border-brand-border-hairline pt-6 flex justify-between items-end">
              <span className="font-heading font-medium text-brand-muted">Total</span>
              <span className="text-3xl font-bold text-white tracking-tight">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
