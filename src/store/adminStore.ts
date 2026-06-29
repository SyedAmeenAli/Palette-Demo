import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '@/types';

interface StoreSettings {
  storeName: string;
  instagramHandle: string;
  locationText: string;
  footerText: string;
  announcementText: string;
  accentColor: string;
  enableBackgroundAnimation: boolean;
  enablePageTransition: boolean;
  enable3DCarousel: boolean;
}

const defaultSettings: StoreSettings = {
  storeName: 'The Pallete',
  instagramHandle: '@palette.lifestyle_',
  locationText: 'Guntur | Hyderabad',
  footerText: 'The Pallete — Unisex clothing curated for modern expression.',
  announcementText: 'Free shipping on orders over ₹5,000.',
  accentColor: '#FFFFFF',
  enableBackgroundAnimation: true,
  enablePageTransition: true,
  enable3DCarousel: true,
};

interface AdminState {
  orders: Order[];
  settings: StoreSettings;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      orders: [],
      settings: defaultSettings,
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
    }),
    {
      name: 'the-pallete-admin',
    }
  )
);
