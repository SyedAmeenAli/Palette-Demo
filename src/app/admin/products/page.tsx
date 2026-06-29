"use client";

import { useState } from "react";
import { useProductStore } from "@/store/productStore";
import InteractiveButton from "@/components/global/InteractiveButton";

export default function AdminProductsPage() {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Shirts",
    price: "",
    stock: "",
    frontImage: "",
    backImage: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.frontImage || !formData.backImage) {
      alert("Please upload both front and back views.");
      return;
    }

    const newProduct = {
      id: `prod_${Date.now()}`,
      slug: formData.name.toLowerCase().replace(/ /g, "-"),
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      description: "A premium piece by The Pallete.",
      material: "Premium Blend",
      fit: "Relaxed",
      care: "Machine wash cold",
      sizes: ["S", "M", "L"],
      colors: ["Black"],
      stock: parseInt(formData.stock),
      frontImage: formData.frontImage,
      backImage: formData.backImage,
      gallery: [],
      isNew: true,
      isFeatured: false,
      isActive: true,
      soldCount: 0,
      viewCount: 0,
      addToCartCount: 0,
      createdAt: new Date().toISOString(),
    };

    addProduct(newProduct);
    setIsAdding(false);
    setFormData({ name: "", category: "Shirts", price: "", stock: "", frontImage: "", backImage: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-semibold text-white">Products</h1>
        <InteractiveButton variant="admin" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add Product"}
        </InteractiveButton>
      </div>

      {isAdding && (
        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border-hairline mb-8">
          <h2 className="font-heading text-xl text-white mb-6">Add New Product</h2>
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-brand-muted mb-2">Product Name</label>
                <input required type="text" className="w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-2 text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-2">Category</label>
                <select required className="w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-2 text-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  {["Shirts", "T-Shirts", "Hoodies", "Jackets", "Sets", "Pants", "Trousers"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-2">Price (₹)</label>
                <input required type="number" min="3000" className="w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-2 text-white" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-2">Stock</label>
                <input required type="number" className="w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-2 text-white" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-border-hairline">
              <div>
                <label className="block text-sm text-brand-muted mb-2">Front Image URL / Path</label>
                <input required type="text" placeholder="/products/..." className="w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-2 text-white" value={formData.frontImage} onChange={(e) => setFormData({...formData, frontImage: e.target.value})} />
                {formData.frontImage && <img src={formData.frontImage} className="mt-4 h-32 object-cover rounded-lg" alt="Front Preview" />}
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-2">Back Image URL / Path</label>
                <input required type="text" placeholder="/products/..." className="w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-2 text-white" value={formData.backImage} onChange={(e) => setFormData({...formData, backImage: e.target.value})} />
                {formData.backImage && <img src={formData.backImage} className="mt-4 h-32 object-cover rounded-lg" alt="Back Preview" />}
              </div>
            </div>

            <InteractiveButton type="submit" variant="admin">Save Product</InteractiveButton>
          </form>
        </div>
      )}

      <div className="bg-brand-card rounded-2xl border border-brand-border-hairline overflow-hidden">
        <table className="w-full text-left text-sm text-brand-soft-white">
          <thead className="bg-[#111] text-brand-muted border-b border-brand-border-hairline">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-brand-border-hairline last:border-0 hover:bg-[#151515] transition-colors">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img src={product.frontImage} alt={product.name} className="w-12 h-12 rounded object-cover" />
                  <span className="font-medium text-white">{product.name}</span>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => removeProduct(product.id)} className="text-accent-red hover:text-white transition-colors text-xs font-semibold">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
