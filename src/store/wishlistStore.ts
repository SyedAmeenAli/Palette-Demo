import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[]; // array of product IDs
  toggleItem: (id: string) => void;
  hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) =>
        set((state) => {
          const isLiked = state.items.includes(id);
          if (isLiked) {
            return { items: state.items.filter((item) => item !== id) };
          }
          return { items: [...state.items, id] };
        }),
      hasItem: (id) => get().items.includes(id),
    }),
    {
      name: "palette-wishlist-storage",
    }
  )
);
