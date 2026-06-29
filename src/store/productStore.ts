import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { initialProducts } from '@/data/products';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  trackView: (id: string) => void;
  trackAddToCart: (id: string) => void;
  trackSale: (id: string, quantity: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedFields) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      trackView: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, viewCount: (p.viewCount || 0) + 1 } : p
          ),
        })),
      trackAddToCart: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, addToCartCount: (p.addToCartCount || 0) + 1 } : p
          ),
        })),
      trackSale: (id, quantity) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, soldCount: (p.soldCount || 0) + quantity, stock: Math.max(0, p.stock - quantity) } : p
          ),
        })),
    }),
    {
      name: 'the-pallete-products',
    }
  )
);
